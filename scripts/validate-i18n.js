#!/usr/bin/env node
/**
 * i18n completeness validator — pre-commit hook
 *
 * Checks:
 *   1. lib/paywall-copy.ts   — every language has every top-level field that EN has
 *   2. lib/reviews-data.ts   — every language has a REVIEWS entry with required fields
 *   3. lib/i18n.ts           — every language appears in every translation const block
 *   4. Admin serializer      — serializePaywall covers ALL Copy keys & is called with lang
 *   5. applyPaywallOverrides — handles ALL Copy fields (functions, arrays, nested objects)
 *   6. TypeScript compile    — catches any type-level gaps
 *   7. Hardcoded English     — warns about obvious unhardcoded strings in JSX
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
function topLevelKeys(src) {
  const keys = []
  let depth = 0
  let i = 0
  while (i < src.length && src[i] !== '{') i++
  i++
  depth = 1

  while (i < src.length && depth > 0) {
    const ch = src[i]
    if (ch === '{' || ch === '[') { depth++; i++; continue }
    if (ch === '}' || ch === ']') { depth--; i++; continue }
    if (depth === 1) {
      if (/[\s,]/.test(ch)) { i++; continue }
      if (ch === '/' && src[i+1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue }
      const rest = src.slice(i)
      const m = rest.match(/^(?:'([^']*)'|"([^"]*)"|(`[^`]*`)|([a-zA-Z_$][a-zA-Z0-9_$]*))\s*:/)
      if (m) {
        const key = m[1] ?? m[2] ?? m[3] ?? m[4]
        if (key && !keys.includes(key)) keys.push(key)
        i += m[0].length
        let vDepth = 0
        while (i < src.length) {
          const vc = src[i]
          if (vc === '{' || vc === '[' || vc === '(') { vDepth++; i++; continue }
          if (vc === '}' || vc === ']' || vc === ')') {
            if (vDepth === 0) break
            vDepth--; i++; continue
          }
          if (vc === ',' && vDepth === 0) { i++; break }
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

// ─── Extract brace-balanced block starting at first '{' after startIdx ────────
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

// ─── Extract function body (brace-balanced) for a named function ──────────────
function extractFunctionBody(src, fnSignature) {
  const idx = src.indexOf(fnSignature)
  if (idx === -1) return null
  return extractBraceBlock(src, idx)
}

// ─── 1. lib/paywall-copy.ts ───────────────────────────────────────────────────
function checkPaywall() {
  console.log('  📋  lib/paywall-copy.ts')
  const file = path.join(ROOT, 'lib/paywall-copy.ts')
  if (!fs.existsSync(file)) { err('lib/paywall-copy.ts not found'); return }
  const src = fs.readFileSync(file, 'utf8')

  const enIdx = src.indexOf('export const EN: Copy = {')
  if (enIdx === -1) { err('Cannot find EN object in lib/paywall-copy.ts'); return }
  const enBlock = extractBraceBlock(src, enIdx)
  const enKeys  = topLevelKeys(enBlock)

  if (enKeys.length === 0) { err('Could not extract any keys from EN object'); return }

  for (const lang of LANG_CODES) {
    if (lang === 'en') continue
    const marker   = `  ${lang}: localize(EN,`
    const startIdx = src.indexOf(marker)
    if (startIdx === -1) { err(`paywall-copy: "${lang}" missing from COPY`); continue }
    const block = extractBraceBlock(src, startIdx + marker.length)
    const langKeys = topLevelKeys(block)
    const missing  = enKeys.filter(k => !langKeys.includes(k))
    if (missing.length > 0) err(`paywall-copy [${lang}] missing keys: ${missing.join(', ')}`)
  }
}

// ─── 2. lib/reviews-data.ts ───────────────────────────────────────────────────
function checkReviews() {
  console.log('  🎠  lib/reviews-data.ts')
  const file = path.join(ROOT, 'lib/reviews-data.ts')
  if (!fs.existsSync(file)) { err('lib/reviews-data.ts not found'); return }
  const src = fs.readFileSync(file, 'utf8')

  const reviewsIdx = src.indexOf('export const REVIEWS')
  if (reviewsIdx === -1) { err('Cannot find REVIEWS in lib/reviews-data.ts'); return }
  const block = extractBraceBlock(src, reviewsIdx)

  for (const lang of LANG_CODES) {
    if (!new RegExp(`^\\s+${lang}\\s*:`,'m').test(block))
      err(`reviews-data REVIEWS: language "${lang}" missing`)
  }

  // Verify each review entry has required fields
  const requiredReviewFields = ['photo', 'name', 'text', 'stars']
  for (const lang of LANG_CODES) {
    const langMarker = `  ${lang}: [`
    const langIdx = src.indexOf(langMarker)
    if (langIdx === -1) continue
    // Find the array block for this lang
    let arrStart = langIdx + langMarker.length - 1
    while (arrStart < src.length && src[arrStart] !== '[') arrStart++
    let depth = 0, arrEnd = arrStart
    for (let i = arrStart; i < src.length; i++) {
      if (src[i] === '[') depth++
      else if (src[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break } }
    }
    const arrBlock = src.substring(arrStart, arrEnd + 1)
    for (const field of requiredReviewFields) {
      if (!arrBlock.includes(`${field}:`)) {
        err(`reviews-data [${lang}]: review missing field "${field}"`)
      }
    }
  }
}

// ─── 3. lib/i18n.ts ───────────────────────────────────────────────────────────
function checkI18n() {
  console.log('  📚  lib/i18n.ts')
  const file = path.join(ROOT, 'lib/i18n.ts')
  if (!fs.existsSync(file)) { err('lib/i18n.ts not found'); return }
  const src = fs.readFileSync(file, 'utf8')

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

// ─── 4. Admin serializer coverage ────────────────────────────────────────────
// Verifies that serializePaywall()/serializeAll() in the shared admin source module:
//   a) References every top-level key from the EN Copy object
//   b) Is called with the lang parameter (not zero-arg)
//   c) serializeAll() calls serializePaywall(lang)
function checkAdminSerializer() {
  console.log('  🔧  Admin serializer (shared source module covers all Copy keys)')

  const sourceFile = path.join(ROOT, 'lib/admin/translation-source.ts')
  if (!fs.existsSync(sourceFile)) { err('translation-source.ts not found'); return }
  const routeSrc = fs.readFileSync(sourceFile, 'utf8')

  // Verify serializePaywall accepts lang param
  if (!/function serializePaywall\s*\(\s*lang\s*[,:)]/m.test(routeSrc)) {
    err('serializePaywall must accept a "lang" parameter — found zero-arg or differently-named version')
  }

  // Verify serializeAll calls serializePaywall(lang)
  const serializeAllBody = extractFunctionBody(routeSrc, 'function serializeAll(')
  if (!serializeAllBody) {
    err('serializeAll function not found in translation-source.ts')
  } else if (!/serializePaywall\s*\(\s*lang\s*\)/.test(serializeAllBody)) {
    err('serializeAll does not call serializePaywall(lang) — paywall translations ignore current language')
  }

  // Get EN keys from paywall-copy.ts
  const copyFile = path.join(ROOT, 'lib/paywall-copy.ts')
  if (!fs.existsSync(copyFile)) { err('lib/paywall-copy.ts not found for admin check'); return }
  const copySrc = fs.readFileSync(copyFile, 'utf8')
  const enIdx = copySrc.indexOf('export const EN: Copy = {')
  if (enIdx === -1) { err('Cannot find EN in paywall-copy.ts'); return }
  const enBlock = extractBraceBlock(copySrc, enIdx)
  const enKeys = topLevelKeys(enBlock)

  // Extract serializePaywall function body
  const fnBody = extractFunctionBody(routeSrc, 'function serializePaywall(')
  if (!fnBody) { err('serializePaywall function body not found'); return }

  // Each EN key must appear somewhere in the function body
  // (either as copy.key or as the string key in a 'paywall.key' pattern)
  const missingKeys = enKeys.filter(k => {
    const appearsAsProperty  = fnBody.includes(`copy.${k}`)
    const appearsAsString    = fnBody.includes(`'${k}'`) || fnBody.includes(`"${k}"`)
    const appearsAsVar       = fnBody.includes(`.${k}`)
    return !appearsAsProperty && !appearsAsString && !appearsAsVar
  })
  if (missingKeys.length > 0) {
    err(`serializePaywall does not serialize these Copy keys: ${missingKeys.join(', ')}`)
  }

  // Verify REVIEWS are NOT serialized under paywall.reviews.* (they belong under loading.reviews.*)
  if (/paywall\.reviews\.\$\{i\}/.test(fnBody) || /`paywall\.reviews\./.test(fnBody)) {
    err('serializePaywall serializes reviews under paywall.reviews.* — reviews must be under loading.reviews.* instead')
  }
}

// ─── 4b. serializeAll includes reviews under loading.reviews.* ───────────────
function checkLoadingReviews() {
  console.log('  📦  serializeAll includes reviews under loading.reviews.*')

  const sourceFile = path.join(ROOT, 'lib/admin/translation-source.ts')
  if (!fs.existsSync(sourceFile)) { err('translation-source.ts not found'); return }
  const routeSrc = fs.readFileSync(sourceFile, 'utf8')

  const serializeAllBody = extractFunctionBody(routeSrc, 'function serializeAll(')
  if (!serializeAllBody) { err('serializeAll function not found in translation-source.ts'); return }

  // Must reference REVIEWS and loading.reviews
  if (!serializeAllBody.includes('REVIEWS')) {
    err('serializeAll does not include REVIEWS — reviews will not appear under loading.reviews.*')
  }
  if (!serializeAllBody.includes('loading.reviews.') && !serializeAllBody.includes('`loading.reviews.')) {
    // Could be in a separate variable before, check the whole file
    if (!routeSrc.includes('loading.reviews.')) {
      err('translation-source.ts does not serialize reviews under loading.reviews.* prefix')
    }
  }
}

// ─── 5. applyPaywallOverrides coverage ───────────────────────────────────────
// Verifies the override applicator handles every Copy key
function checkApplyOverrides() {
  console.log('  🔄  applyPaywallOverrides handles all Copy keys')

  const overridesFile = path.join(ROOT, 'lib/use-translation-overrides.ts')
  if (!fs.existsSync(overridesFile)) { err('use-translation-overrides.ts not found'); return }
  const src = fs.readFileSync(overridesFile, 'utf8')

  // Function may have generics: applyPaywallOverrides<T extends ...>(
  const fnBody = extractFunctionBody(src, 'export function applyPaywallOverrides')
  if (!fnBody) { err('applyPaywallOverrides function not found'); return }

  // Get EN keys
  const copyFile = path.join(ROOT, 'lib/paywall-copy.ts')
  if (!fs.existsSync(copyFile)) return
  const copySrc = fs.readFileSync(copyFile, 'utf8')
  const enIdx = copySrc.indexOf('export const EN: Copy = {')
  if (enIdx === -1) return
  const enBlock = extractBraceBlock(copySrc, enIdx)
  const enKeys = topLevelKeys(enBlock)

  // Complex-typed keys (functions, arrays, nested objects) MUST be explicitly handled.
  // Simple string keys can be handled by a catch-all `patch[key] = v` clause.
  const complexKeys = ['discount', 'perDay', 'consentBody', 'fitnessAgeValue', 'personalHeading',
                       'bullets', 'plans', 'features', 'goalLabels', 'sleepLabels', 'fitnessLabels', 'bmi']

  // Complex keys may appear as exact ('bullets') or as prefix ('bullets.')
  const missingComplex = complexKeys.filter(k =>
    !fnBody.includes(`'${k}'`) && !fnBody.includes(`"${k}"`) &&
    !fnBody.includes(`'${k}.'`) && !fnBody.includes(`"${k}."`) &&
    !fnBody.includes(`key.startsWith('${k}`) && !fnBody.includes(`key.startsWith("${k}`)
  )
  if (missingComplex.length > 0) {
    err(`applyPaywallOverrides missing explicit handling for complex keys: ${missingComplex.join(', ')}`)
  }

  // Simple string keys only need explicit handling if there's no catch-all
  const hasCatchAll = /patch\[key\]\s*=\s*v/.test(fnBody)
  if (!hasCatchAll) {
    const simpleKeys = enKeys.filter(k => !complexKeys.includes(k))
    const missingSimpKeys = simpleKeys.filter(k =>
      !fnBody.includes(`'${k}'`) && !fnBody.includes(`"${k}"`)
    )
    if (missingSimpKeys.length > 0) {
      err(`applyPaywallOverrides missing handling for simple keys (and no catch-all found): ${missingSimpKeys.join(', ')}`)
    }
  }
}

// ─── 6. TypeScript type-check ─────────────────────────────────────────────────
function checkTypes() {
  console.log('  🔷  TypeScript type check (tsc --noEmit)')
  try {
    // Run tsc via node directly to avoid PATH/shebang issues
    const nodeExe = process.execPath
    const tscJs = path.join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc')
    execSync(`"${nodeExe}" "${tscJs}" --noEmit`, { cwd: ROOT, stdio: 'pipe' })
  } catch (e) {
    const output = (e.stdout?.toString() || '') + (e.stderr?.toString() || '')
    err(`TypeScript errors found:\n${output.split('\n').slice(0,10).map(l=>'      '+l).join('\n')}`)
  }
}

// ─── 7. Warn about obvious hardcoded English in JSX ──────────────────────────
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
checkAdminSerializer()
checkLoadingReviews()
checkApplyOverrides()
checkTypes()
checkHardcoded()

if (hasErrors) {
  console.error('\n❌  Commit blocked — fix the i18n issues above before committing.\n')
  process.exit(1)
} else {
  console.log('\n✅  All i18n checks passed.\n')
}
