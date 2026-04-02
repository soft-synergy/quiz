import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { COPY } from '@/lib/paywall-copy'
import { REVIEWS } from '@/lib/reviews-data'
import {
  useIntroT,
  useUITranslations,
  useStepPageT,
  useResultT,
  useResults28T,
  useWellnessT,
  useLoadingT,
  useEmailT,
  getTranslatedSteps,
  type StepPageTranslations,
  type ResultTranslations,
  type Results28Translations,
  type WellnessTranslations,
} from '@/lib/i18n'
import type { LangCode } from '@/lib/lang-store'
import type { QuizStep } from '@/lib/quiz-data'

const VALID_LANGS: LangCode[] = ['en', 'lt', 'lv', 'ro', 'cz', 'dk', 'gr', 'hu', 'hr', 'il', 'jp', 'ru', 'sk', 'tw']
const DATA_DIR = path.join(process.cwd(), 'translations-data')

function isAuthed(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin'
  // Check header first (for client-side fetches that can't set httpOnly cookies)
  const authHeader = req.headers.get('x-admin-token')
  if (authHeader === adminPassword) return true
  // Check cookie
  const token = req.cookies.get('admin_token')?.value
  return token === adminPassword
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function callFn(fn: (...args: any[]) => string, ...args: unknown[]): string {
  return fn(...args)
}

function serializeStepPage(t: StepPageTranslations): Record<string, string> {
  return {
    error_range: callFn(t.error_range as (...args: unknown[]) => string, '__MIN__', '__MAX__', '__UNIT__'),
    bmi_checking: t.bmi_checking,
    bmi_underweight: callFn(t.bmi_underweight as (...args: unknown[]) => string, '__BMI__'),
    bmi_underweight_body: t.bmi_underweight_body,
    bmi_normal: callFn(t.bmi_normal as (...args: unknown[]) => string, '__BMI__'),
    bmi_normal_body: t.bmi_normal_body,
    bmi_overweight: callFn(t.bmi_overweight as (...args: unknown[]) => string, '__BMI__'),
    bmi_overweight_body: t.bmi_overweight_body,
    bmi_obese: callFn(t.bmi_obese as (...args: unknown[]) => string, '__BMI__'),
    bmi_obese_body: t.bmi_obese_body,
    goal_placeholder: t.goal_placeholder,
    goal_weight_too_high: t.goal_weight_too_high,
    goal_too_low: t.goal_too_low,
    goal_a_lot: t.goal_a_lot,
    goal_moderate: t.goal_moderate,
    goal_small: t.goal_small,
    consent_text: t.consent_text,
    consent_privacy_link: t.consent_privacy_link,
    char_count: callFn(t.char_count as (...args: unknown[]) => string, '__N__'),
  }
}

function serializeResult(t: ResultTranslations): Record<string, string> {
  return {
    header_label: t.header_label,
    headline: t.headline,
    subtitle: t.subtitle,
    guide_text: t.guide_text,
    goal_line: callFn(t.goal_line as (...args: unknown[]) => string, '__W__', '__D__'),
    cta: t.cta,
  }
}

function serializeResults28(t: Results28Translations): Record<string, string> {
  return {
    header_label: t.header_label,
    your_weight: t.your_weight,
    now: t.now,
    after_4_weeks: t.after_4_weeks,
    week: callFn(t.week as (...args: unknown[]) => string, '__N__'),
    chart_note: t.chart_note,
    headline: t.headline,
  }
}

function serializeWellness(t: WellnessTranslations): Record<string, string> {
  const result: Record<string, string> = {
    header_label: t.header_label,
    headline: t.headline,
    lifestyle_label: t.lifestyle_label,
    eater_label: t.eater_label,
    motivation_label: t.motivation_label,
    img_alt: t.img_alt,
    warning_title: t.warning_title,
    warning_desc: t.warning_desc,
    bmi_normal_msg: t.bmi_normal_msg,
    bmi_overweight_msg: t.bmi_overweight_msg,
    bmi_obese_msg: t.bmi_obese_msg,
  }
  for (const [k, v] of Object.entries(t.lifestyle)) {
    result[`lifestyle.${k}`] = v
  }
  for (const [k, v] of Object.entries(t.eater)) {
    result[`eater.${k}`] = v
  }
  for (const [k, v] of Object.entries(t.motivation)) {
    result[`motivation.${k}`] = v
  }
  return result
}

function serializeStep(step: QuizStep): Record<string, unknown> {
  const r: Record<string, unknown> = {}
  // Skip `question` for interstitial steps — the text lives in interstitial.headline
  if (step.question && !step.interstitial) r.question = step.question
  if (step.subtitle) r.subtitle = step.subtitle
  if (step.placeholder) r.placeholder = step.placeholder
  if (step.hintTitle) r.hintTitle = step.hintTitle
  if (step.hint) r.hint = step.hint
  if (step.buttonLabel) r.buttonLabel = step.buttonLabel
  if (step.options?.length) {
    r.options = Object.fromEntries(step.options.map((o) => [o.id, o.label]))
  }
  if (step.interstitial) {
    r.interstitial = {
      headline: step.interstitial.headline,
      ...(step.interstitial.body ? { body: step.interstitial.body } : {}),
      ...(step.interstitial.note ? { note: step.interstitial.note } : {}),
    }
  }
  return r
}

function flatten(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'string') {
      result[p] = value
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flatten(value as Record<string, unknown>, p))
    }
  }
  return result
}

function serializePaywall(lang: LangCode): Record<string, string> {
  const copy = COPY[lang]
  const result: Record<string, string> = {}

  // Simple string fields
  result['paywall.pageTitle'] = copy.pageTitle
  result['paywall.pageSub'] = copy.pageSub
  result['paywall.moneyBackRow'] = copy.moneyBackRow
  result['paywall.cta'] = copy.cta
  result['paywall.consentPrefix'] = copy.consentPrefix
  result['paywall.terms'] = copy.terms
  result['paywall.privacy'] = copy.privacy
  result['paywall.refund'] = copy.refund
  result['paywall.consentAnd'] = copy.consentAnd
  result['paywall.consentError'] = copy.consentError
  result['paywall.yourResults'] = copy.yourResults
  result['paywall.primaryGoal'] = copy.primaryGoal
  result['paywall.fitnessLevel'] = copy.fitnessLevel
  result['paywall.sleepQuality'] = copy.sleepQuality
  result['paywall.fitnessAge'] = copy.fitnessAge
  result['paywall.workoutTitle'] = copy.workoutTitle
  result['paywall.workoutBadge'] = copy.workoutBadge
  result['paywall.waterTitle'] = copy.waterTitle
  result['paywall.waterBadge'] = copy.waterBadge
  result['paywall.readyHeading'] = copy.readyHeading
  result['paywall.bulletTitle'] = copy.bulletTitle
  result['paywall.whatYouGet'] = copy.whatYouGet
  result['paywall.socialText'] = copy.socialText
  result['paywall.socialSub'] = copy.socialSub
  result['paywall.socialCta'] = copy.socialCta
  result['paywall.storiesHeading'] = copy.storiesHeading
  result['paywall.guaranteeTitle'] = copy.guaranteeTitle
  result['paywall.guaranteeBody'] = copy.guaranteeBody
  result['paywall.footer'] = copy.footer

  // Function fields with placeholders
  result['paywall.discount'] = copy.discount('__V__')
  result['paywall.perDay'] = copy.perDay('__V__')
  result['paywall.consentBody'] = copy.consentBody('__TODAY__', '__RENEW__')
  result['paywall.fitnessAgeValue'] = copy.fitnessAgeValue('__YEARS__' as unknown as number)
  result['paywall.personalHeading'] = copy.personalHeading('__NAME__')

  // plans array
  copy.plans.forEach((plan, i) => {
    result[`paywall.plans.${i}.name`] = plan.name
    result[`paywall.plans.${i}.desc`] = plan.desc
    result[`paywall.plans.${i}.badge`] = plan.badge ?? ''
  })

  // bullets array
  copy.bullets.forEach((bullet, i) => {
    result[`paywall.bullets.${i}`] = bullet
  })

  // features array
  copy.features.forEach((feature, i) => {
    result[`paywall.features.${i}.title`] = feature.title
    result[`paywall.features.${i}.desc`] = feature.desc
  })

  // goalLabels
  for (const [k, v] of Object.entries(copy.goalLabels)) {
    result[`paywall.goalLabels.${k}`] = v
  }

  // sleepLabels
  for (const [k, v] of Object.entries(copy.sleepLabels)) {
    result[`paywall.sleepLabels.${k}`] = v
  }

  // fitnessLabels
  for (const [k, v] of Object.entries(copy.fitnessLabels)) {
    result[`paywall.fitnessLabels.${k}`] = v
  }

  // bmi
  const bmiCats = ['Normal', 'Underweight', 'Overweight', 'Obese'] as const
  for (const cat of bmiCats) {
    result[`paywall.bmi.${cat}.title`] = copy.bmi[cat].title
    result[`paywall.bmi.${cat}.text`] = copy.bmi[cat].text('__BMI__')
  }

  return result
}

function serializeAll(lang: LangCode): Record<string, string> {
  const intro = useIntroT(lang)
  const ui = useUITranslations(lang)
  const stepPage = useStepPageT(lang)
  const result = useResultT(lang)
  const results28 = useResults28T(lang)
  const wellnessT = useWellnessT(lang)
  const loading = useLoadingT(lang)
  const emailT = useEmailT(lang)
  const steps = getTranslatedSteps(lang)

  const introFlat = flatten(intro as unknown as Record<string, unknown>, 'intro')
  const uiFlat = flatten(ui as unknown as Record<string, unknown>, 'ui')
  const stepPageFlat: Record<string, string> = {}
  for (const [k, v] of Object.entries(serializeStepPage(stepPage))) {
    stepPageFlat[`stepPage.${k}`] = v
  }
  const resultFlat: Record<string, string> = {}
  for (const [k, v] of Object.entries(serializeResult(result))) {
    resultFlat[`result.${k}`] = v
  }
  const results28Flat: Record<string, string> = {}
  for (const [k, v] of Object.entries(serializeResults28(results28))) {
    results28Flat[`results28.${k}`] = v
  }
  const wellnessFlat: Record<string, string> = {}
  for (const [k, v] of Object.entries(serializeWellness(wellnessT))) {
    wellnessFlat[`wellness.${k}`] = v
  }
  // loading text keys
  const loadingFlat = flatten(loading as unknown as Record<string, unknown>, 'loading')
  // reviews under loading.reviews.*
  const reviews = REVIEWS[lang] ?? REVIEWS.en
  const reviewsFlat: Record<string, string> = {}
  reviews.forEach((review, i) => {
    reviewsFlat[`loading.reviews.${i}.name`] = review.name
    reviewsFlat[`loading.reviews.${i}.text`] = review.text
    reviewsFlat[`loading.reviews.${i}.stars`] = String(review.stars)
    reviewsFlat[`loading.reviews.${i}.photo`] = review.photo
  })

  const emailFlat = flatten(emailT as unknown as Record<string, unknown>, 'email')

  const stepsFlat: Record<string, string> = {}
  for (const step of steps) {
    const serialized = serializeStep(step)
    const stepFlat = flatten(serialized, `steps.${step.step}`)
    Object.assign(stepsFlat, stepFlat)
  }

  const paywallFlat = serializePaywall(lang)

  // Order: intro, steps, stepPage, loading (incl reviews), result, results28, wellness, email, paywall, ui
  return {
    ...introFlat,
    ...stepsFlat,
    ...stepPageFlat,
    ...loadingFlat,
    ...reviewsFlat,
    ...resultFlat,
    ...results28Flat,
    ...wellnessFlat,
    ...emailFlat,
    ...paywallFlat,
    ...uiFlat,
  }
}

export interface HistoryEntry {
  filename: string
  timestamp: string
  author: string
  changeCount: number
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ lang: string }> }) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { lang } = await params

  if (!VALID_LANGS.includes(lang as LangCode)) {
    return NextResponse.json({ error: 'Invalid language' }, { status: 400 })
  }

  const langCode = lang as LangCode

  const enTranslations = serializeAll('en')
  const currentTranslations = langCode === 'en' ? enTranslations : serializeAll(langCode)

  let overrides: Record<string, string> | null = null
  const overridesPath = path.join(DATA_DIR, `${langCode}.json`)
  if (fs.existsSync(overridesPath)) {
    try {
      overrides = JSON.parse(fs.readFileSync(overridesPath, 'utf-8'))
    } catch {
      overrides = null
    }
  }

  const historyDir = path.join(DATA_DIR, 'history', langCode)
  const history: HistoryEntry[] = []
  if (fs.existsSync(historyDir)) {
    const files = fs.readdirSync(historyDir).filter((f) => f.endsWith('.json')).sort().reverse()
    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(historyDir, file), 'utf-8'))
        history.push({
          filename: file.replace('.json', ''),
          timestamp: data.timestamp ?? file.replace('.json', ''),
          author: data.author ?? 'Unknown',
          changeCount: Array.isArray(data.changes) ? data.changes.length : 0,
        })
      } catch {
        // skip malformed files
      }
    }
  }

  return NextResponse.json({
    en: enTranslations,
    current: currentTranslations,
    overrides,
    history,
  })
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ lang: string }> }) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { lang } = await params

  if (!VALID_LANGS.includes(lang as LangCode)) {
    return NextResponse.json({ error: 'Invalid language' }, { status: 400 })
  }

  const body = await req.json().catch(() => ({}))
  const { overrides, author, changes } = body as {
    overrides: Record<string, string>
    author: string
    changes: Array<{ key: string; oldValue: string; newValue: string }>
  }

  const timestamp = new Date().toISOString()

  // Save overrides (private store for admin)
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(path.join(DATA_DIR, `${lang}.json`), JSON.stringify(overrides, null, 2), 'utf-8')

  // Write public file so the quiz can fetch it at runtime
  const publicDir = path.join(process.cwd(), 'public', 'translations')
  fs.mkdirSync(publicDir, { recursive: true })
  fs.writeFileSync(path.join(publicDir, `${lang}.json`), JSON.stringify(overrides), 'utf-8')

  // Save history snapshot
  const historyDir = path.join(DATA_DIR, 'history', lang)
  fs.mkdirSync(historyDir, { recursive: true })
  const safeTimestamp = timestamp.replace(/[:.]/g, '-')
  fs.writeFileSync(
    path.join(historyDir, `${safeTimestamp}.json`),
    JSON.stringify({ timestamp, author, changes, overrides }, null, 2),
    'utf-8'
  )

  return NextResponse.json({ success: true, timestamp })
}
