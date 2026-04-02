#!/usr/bin/env node
/**
 * i18n completeness validator — pre-commit hook
 *
 * Checks:
 *   1. PaywallContent.tsx  — every language has every top-level field that EN has
 *   2. ReviewCarousel.tsx  — every language has a REVIEWS entry
 *   3. lib/i18n.ts         — every language appears in every translation const block
 *   4. TypeScript compile  — catches any type-level gaps
 */

const fs   = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const ROOT = path.resolve(__dirname, '..')
let hasErrors = false

const LANG_CODES = ['en','lt','lv','ro','cz','dk','gr','hu','hr','il','jp','ru','sk','tw']

function err(msg) { console.error(`  ❌  ${msg}`); hasErrors = true }
function warn(msg) { console.warn (`  ⚠️   ${msg}`) }

// ─── Extract top-level keys only (depth 1) from a JS/TS object literal ───────
// e.g. "{ a: 1, b: { c: 2 } }" → ['a', 'b']  (NOT 'c')
function topLevelKeys(src) {
  const keys = []
  let depth = 0
  let i = 0
  // skip opening brace
  while (i < src.length && src[i] !== '{') i++
  i++ // consume '{'
  depth = 1

  while (i < src.length && depth > 0) {
    const ch = src[i]
    if (ch === '{' || ch === '[') { depth++; i++; continue }
    if (ch === '}' || ch === ']') { depth--; i++; continue }
    // at depth 1, look for a key
    if (depth === 1) {
      // skip whitespace / commas
      if (/[\s,]/.test(ch)) { i++; continue }
      // skip comments
      if (ch === '/' && src[i+1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue }
      // match key: identifier or quoted string, followed by ':'
      const rest = src.slice(i)
      const m = rest.match(/^(?:'([^']*)'|"([^"]*)"|(`[^`]*`)|([a-zA-Z_$][a-zA-Z0-9_$]*))\s*:/)
      if (m) {
        const key = m[1] ?? m[2] ?? m[3] ?? m[4]
        if (key && !keys.includes(key)) keys.push(key)
        // advance past key + colon
        i += m[0].length
        // skip value at depth 1 (fast-forward to next comma at same depth)
        let vDepth = 0
        while (i < src.length) {
          const vc = src[i]
          if (vc === '{' || vc === '[' || vc === '(') { vDepth++; i++; continue }
          if (vc === '}' || vc === ']' || vc === ')') {
            if (vDepth === 0) break // end of parent object
            vDepth--; i++; continue
          }
          if (vc === ',' && vDepth === 0) { i++; break }
          // skip strings to avoid false brace counting
          if (vc === '"' || vc === "'" || vc === '`') {
            const q = vc; i++
            while (i < src.length && src[i] !== q) {
              if (src[i] === '\\') i++
              i++
            }
            i++; continue
          }
          i++
        }
        continue
      }
    }
    i++
  }
  return keys
}

// ─── Extract the brace-balanced substring starting at the first '{' after idx ─
function extractBraceBlock(src, startIdx) {
  let i = startIdx
  while (i < src.length && src[i] !== '{') i++
  if (i >= src.length) return ''
  let depth = 0, start = i
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++
    else if (src[i] === '}') { depth--; if (depth === 0) return src.substring(start, i + 1) }
  }
  return ''
}

// ─── 1. PaywallContent.tsx ────────────────────────────────────────────────────
function checkPaywall() {
  console.log('  📋  PaywallContent.tsx')
  const file = path.join(ROOT, 'app/quiz/paywall/PaywallContent.tsx')
  if (!fs.existsSync(file)) { err('PaywallContent.tsx not found'); return }
  const src = fs.readFileSync(file, 'utf8')

  // Extract EN's top-level keys
  const enIdx = src.indexOf('const EN: Copy = {')
  if (enIdx === -1) { err('Cannot find EN object in PaywallContent.tsx'); return }
  const enBlock = extractBraceBlock(src, enIdx)
  const enKeys  = topLevelKeys(enBlock)

  for (const lang of LANG_CODES) {
    if (lang === 'en') continue
    const marker   = `  ${lang}: localize(EN,`
    const startIdx = src.indexOf(marker)
    if (startIdx === -1) { err(`PaywallContent: "${lang}" missing from COPY`); continue }

    // marker ends right before the overrides object: `  lt: localize(EN, {`
    // so the first `{` after startIdx+marker.length is the overrides block
    const block = extractBraceBlock(src, startIdx + marker.length)
    const langKeys = topLevelKeys(block)
    const missing  = enKeys.filter(k => !langKeys.includes(k))
    if (missing.length > 0) err(`PaywallContent [${lang}] missing: ${missing.join(', ')}`)
  }
}

// ─── 2. ReviewCarousel.tsx ────────────────────────────────────────────────────
function checkReviews() {
  console.log('  🎠  ReviewCarousel.tsx')
  const file = path.join(ROOT, 'components/ReviewCarousel/ReviewCarousel.tsx')
  if (!fs.existsSync(file)) { err('ReviewCarousel.tsx not found'); return }
  const src = fs.readFileSync(file, 'utf8')

  const reviewsIdx = src.indexOf('export const REVIEWS')
  if (reviewsIdx === -1) { err('Cannot find REVIEWS in ReviewCarousel.tsx'); return }
  const block = extractBraceBlock(src, reviewsIdx)

  for (const lang of LANG_CODES) {
    if (!new RegExp(`^\\s+${lang}\\s*:`,'m').test(block))
      err(`ReviewCarousel REVIEWS: language "${lang}" missing`)
  }
}

// ─── 3. lib/i18n.ts ───────────────────────────────────────────────────────────
// i18n.ts stores data in `const XXXXX: Record<LangCode,...> = { en:{...}, lt:{...}, ... }`
// TypeScript types enforce key completeness — here we just verify every language is present.
function checkI18n() {
  console.log('  📚  lib/i18n.ts')
  const file = path.join(ROOT, 'lib/i18n.ts')
  if (!fs.existsSync(file)) { err('lib/i18n.ts not found'); return }
  const src = fs.readFileSync(file, 'utf8')

  // Find every `const XYZ: Record<LangCode` block and verify all langs present
  const constRe = /^const (\w+)\s*:\s*Record<LangCode[^=]*=\s*\{/gm
  let m
  while ((m = constRe.exec(src)) !== null) {
    const constName = m[1]
    const block = extractBraceBlock(src, m.index + m[0].length - 1)
    for (const lang of LANG_CODES) {
      if (!new RegExp(`^\\s+${lang}\\s*:`,'m').test(block))
        err(`i18n.ts [${constName}]: language "${lang}" missing`)
    }
  }
}

// ─── 4. TypeScript type-check ─────────────────────────────────────────────────
function checkTypes() {
  console.log('  🔷  TypeScript type check (tsc --noEmit)')
  try {
    execSync('npx tsc --noEmit', { cwd: ROOT, stdio: 'pipe' })
  } catch (e) {
    const output = (e.stdout?.toString() || '') + (e.stderr?.toString() || '')
    err(`TypeScript errors found:\n${output.split('\n').slice(0,10).map(l=>'      '+l).join('\n')}`)
  }
}

// ─── 5. Warn about obvious hardcoded English in JSX ──────────────────────────
function checkHardcoded() {
  console.log('  🔤  Hardcoded English strings (warnings only)')
  const IGNORE = [
    /TAICHI COACH/i, /Tai Chi/i, /Trustpilot/, /BMI/,
    /^min$/, /^L$/, /^©/, /^https?:\/\//, /^mailto:/,
    /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i,
    /^\d/, /^[a-z\-]+$/, /^[A-Z][a-z]+$/, /^\s*$/,
  ]

  const files = [
    'app/quiz/paywall/PaywallContent.tsx',
    'app/quiz/result/page.tsx',
    'app/quiz/wellness/page.tsx',
    'app/quiz/email/page.tsx',
    'app/quiz/loading-screen/page.tsx',
    'app/quiz/plan-loading/page.tsx',
  ]

  for (const rel of files) {
    const fp = path.join(ROOT, rel)
    if (!fs.existsSync(fp)) continue
    const src = fs.readFileSync(fp, 'utf8')
    const found = []
    const re = />([^<>{}\n]{10,})</g
    let m
    while ((m = re.exec(src)) !== null) {
      const t = m[1].trim()
      if (!t || t.startsWith('{') || t.startsWith('//')) continue
      if (IGNORE.some(p => p.test(t))) continue
      if (/[A-Z][a-z]+ [a-zA-Z]/.test(t)) found.push(t.slice(0, 60))
    }
    if (found.length > 0) {
      warn(`Possible hardcoded English in ${rel}:`)
      found.slice(0, 3).forEach(t => console.warn(`       "${t}"`))
      if (found.length > 3) console.warn(`       ... +${found.length - 3} more`)
    }
  }
}

// ─── run ──────────────────────────────────────────────────────────────────────
console.log('\n🌐  Validating i18n completeness...\n')

checkPaywall()
checkReviews()
checkI18n()
checkTypes()
checkHardcoded()

if (hasErrors) {
  console.error('\n❌  Commit blocked — fix the i18n issues above before committing.\n')
  process.exit(1)
} else {
  console.log('\n✅  All i18n checks passed.\n')
}
