import fs from 'fs'
import path from 'path'
import { COPY, type Copy } from '@/lib/paywall-copy'
import { REVIEWS, REVIEW_PHOTOS, type Review } from '@/lib/reviews-data'
import { PAYWALL_STORIES, type PaywallStory } from '@/lib/paywall-stories-data'
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

export const VALID_LANGS: LangCode[] = ['en', 'lt', 'lv', 'ro', 'cz', 'dk', 'gr', 'hu', 'hr', 'il', 'jp', 'ru', 'sk', 'tw']

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
    goal_line: callFn(t.goal_line as (...args: unknown[]) => string, '__W__', '__D__', '__U__'),
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
  for (const [k, v] of Object.entries(t.lifestyle)) result[`lifestyle.${k}`] = v
  for (const [k, v] of Object.entries(t.eater)) result[`eater.${k}`] = v
  for (const [k, v] of Object.entries(t.motivation)) result[`motivation.${k}`] = v
  return result
}

function serializeStep(step: QuizStep): Record<string, unknown> {
  const r: Record<string, unknown> = {}
  if (step.question && !step.interstitial) r.question = step.question
  if (step.subtitle) r.subtitle = step.subtitle
  if (step.placeholder) r.placeholder = step.placeholder
  if (step.hintTitle) r.hintTitle = step.hintTitle
  if (step.hint) r.hint = step.hint
  if (step.buttonLabel) r.buttonLabel = step.buttonLabel
  if (step.options?.length) r.options = Object.fromEntries(step.options.map((o) => [o.id, o.label]))
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
  const stories = PAYWALL_STORIES[lang]
  const result: Record<string, string> = {}

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

  result['paywall.discount'] = callFn(copy.discount as (...args: unknown[]) => string, '__V__')
  result['paywall.perDay'] = callFn(copy.perDay as (...args: unknown[]) => string, '__V__')
  result['paywall.consentBody'] = callFn(copy.consentBody as (...args: unknown[]) => string, '__TODAY__', '__RENEW__')
  result['paywall.fitnessAgeValue'] = callFn(copy.fitnessAgeValue as (...args: unknown[]) => string, '__YEARS__')
  result['paywall.personalHeading'] = callFn(copy.personalHeading as (...args: unknown[]) => string, '__NAME__')

  copy.plans.forEach((plan, i) => {
    result[`paywall.plans.${i}.name`] = plan.name
    result[`paywall.plans.${i}.desc`] = plan.desc
    result[`paywall.plans.${i}.badge`] = plan.badge ?? ''
  })
  copy.bullets.forEach((bullet, i) => {
    result[`paywall.bullets.${i}`] = bullet
  })
  copy.features.forEach((feature, i) => {
    result[`paywall.features.${i}.title`] = feature.title
    result[`paywall.features.${i}.desc`] = feature.desc
  })
  Object.entries(copy.goalLabels).forEach(([k, v]) => {
    result[`paywall.goalLabels.${k}`] = v
  })
  Object.entries(copy.sleepLabels).forEach(([k, v]) => {
    result[`paywall.sleepLabels.${k}`] = v
  })
  Object.entries(copy.fitnessLabels).forEach(([k, v]) => {
    result[`paywall.fitnessLabels.${k}`] = v
  })
  Object.entries(copy.bmi).forEach(([k, v]) => {
    result[`paywall.bmi.${k}.title`] = v.title
    result[`paywall.bmi.${k}.text`] = callFn(v.text as (...args: unknown[]) => string, '__BMI__')
  })
  stories.forEach((story, i) => {
    result[`paywall.stories.${i}.name`] = story.name
    result[`paywall.stories.${i}.text`] = story.text
    result[`paywall.stories.${i}.photo`] = story.photo
    result[`paywall.stories.${i}.stars`] = String(story.stars)
  })
  return result
}

export function serializeAll(lang: LangCode): Record<string, string> {
  const intro = useIntroT(lang)
  const ui = useUITranslations(lang)
  const stepPage = useStepPageT(lang)
  const result = useResultT(lang)
  const results28 = useResults28T(lang)
  const wellness = useWellnessT(lang)
  const loading = useLoadingT(lang)
  const email = useEmailT(lang)
  const steps = getTranslatedSteps(lang)

  const introFlat = flatten(intro as unknown as Record<string, unknown>, 'intro')
  const uiFlat = flatten(ui as unknown as Record<string, unknown>, 'ui')
  const stepPageFlat: Record<string, string> = {}
  for (const [k, v] of Object.entries(serializeStepPage(stepPage))) stepPageFlat[`stepPage.${k}`] = v
  const resultFlat: Record<string, string> = {}
  for (const [k, v] of Object.entries(serializeResult(result))) resultFlat[`result.${k}`] = v
  const results28Flat: Record<string, string> = {}
  for (const [k, v] of Object.entries(serializeResults28(results28))) results28Flat[`results28.${k}`] = v
  const wellnessFlat: Record<string, string> = {}
  for (const [k, v] of Object.entries(serializeWellness(wellness))) wellnessFlat[`wellness.${k}`] = v
  const loadingFlat = flatten(loading as unknown as Record<string, unknown>, 'loading')
  const reviews = REVIEWS[lang] ?? REVIEWS.en
  const reviewsFlat: Record<string, string> = {}
  reviews.forEach((review, i) => {
    reviewsFlat[`loading.reviews.${i}.name`] = review.name
    reviewsFlat[`loading.reviews.${i}.text`] = review.text
    reviewsFlat[`loading.reviews.${i}.stars`] = String(review.stars)
    reviewsFlat[`loading.reviews.${i}.photo`] = review.photo
  })
  const emailFlat = flatten(email as unknown as Record<string, unknown>, 'email')
  const stepsFlat: Record<string, string> = {}
  for (const step of steps) Object.assign(stepsFlat, flatten(serializeStep(step), `steps.${step.step}`))
  const paywallFlat = serializePaywall(lang)

  return {
    ...introFlat,
    ...stepsFlat,
    ...stepPageFlat,
    ...loadingFlat,
    ...reviewsFlat,
    ...wellnessFlat,
    ...resultFlat,
    ...emailFlat,
    ...results28Flat,
    ...paywallFlat,
    ...uiFlat,
  }
}

export function getAllSerializedTranslations(): Record<LangCode, Record<string, string>> {
  return Object.fromEntries(VALID_LANGS.map((lang) => [lang, serializeAll(lang)])) as Record<LangCode, Record<string, string>>
}

function quote(v: string): string {
  return JSON.stringify(v)
}

function identOrQuote(key: string): string {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(key) ? key : quote(key)
}

function parsePrefixed(flat: Record<string, string>, prefix: string): Record<string, string> {
  return Object.fromEntries(
    Object.entries(flat)
      .filter(([k]) => k.startsWith(prefix))
      .map(([k, v]) => [k.slice(prefix.length), v])
  )
}

function groupByIndex(prefixMap: Record<string, string>, root: string): Record<number, Record<string, string>> {
  const out: Record<number, Record<string, string>> = {}
  for (const [k, v] of Object.entries(prefixMap)) {
    if (!k.startsWith(root)) continue
    const rest = k.slice(root.length)
    const parts = rest.split('.')
    const idx = Number(parts[0])
    const field = parts.slice(1).join('.')
    if (!Number.isNaN(idx) && field) {
      out[idx] = out[idx] ?? {}
      out[idx][field] = v
    }
  }
  return out
}

function renderTemplateFn(argNames: string[], template: string, placeholders: Array<[string, string]>): string {
  let body = quote(template)
  for (const [token, value] of placeholders) {
    body += `.replace(${quote(token)}, String(${value}))`
  }
  return `(${argNames.join(', ')}) => ${body}`
}

function renderSimpleRecord(record: Record<string, string>): string {
  return `{ ${Object.entries(record).map(([k, v]) => `${identOrQuote(k)}:${quote(v)}`).join(', ')} }`
}

function buildPaywallCopy(flat: Record<string, string>): Copy {
  const paywall = parsePrefixed(flat, 'paywall.')
  const plansByIdx = groupByIndex(paywall, 'plans.')
  const featuresByIdx = groupByIndex(paywall, 'features.')
  const bullets = Object.entries(paywall)
    .filter(([k]) => /^bullets\.\d+$/.test(k))
    .sort((a, b) => Number(a[0].split('.')[1]) - Number(b[0].split('.')[1]))
    .map(([, v]) => v)
  const goalLabels = Object.fromEntries(Object.entries(paywall).filter(([k]) => k.startsWith('goalLabels.')).map(([k, v]) => [k.slice('goalLabels.'.length), v]))
  const sleepLabels = Object.fromEntries(Object.entries(paywall).filter(([k]) => k.startsWith('sleepLabels.')).map(([k, v]) => [k.slice('sleepLabels.'.length), v]))
  const fitnessLabels = Object.fromEntries(Object.entries(paywall).filter(([k]) => k.startsWith('fitnessLabels.')).map(([k, v]) => [k.slice('fitnessLabels.'.length), v]))

  const bmiTitles: Record<string, string> = {}
  const bmiTexts: Record<string, string> = {}
  for (const [k, v] of Object.entries(paywall)) {
    const m = k.match(/^bmi\.([^.]+)\.(title|text)$/)
    if (!m) continue
    const [, cat, field] = m
    if (field === 'title') bmiTitles[cat] = v
    else bmiTexts[cat] = v
  }

  return {
    plans: Object.keys(plansByIdx)
      .map(Number)
      .sort((a, b) => a - b)
      .map((i) => ({
        name: plansByIdx[i].name ?? '',
        desc: plansByIdx[i].desc ?? '',
        badge: plansByIdx[i].badge ? plansByIdx[i].badge : null,
      })),
    pageTitle: paywall.pageTitle ?? '',
    pageSub: paywall.pageSub ?? '',
    discount: (v: string) => (paywall.discount ?? '').replace('__V__', v),
    perDay: (v: string) => (paywall.perDay ?? '').replace('__V__', v),
    moneyBackRow: paywall.moneyBackRow ?? '',
    cta: paywall.cta ?? '',
    consentPrefix: paywall.consentPrefix ?? '',
    terms: paywall.terms ?? '',
    privacy: paywall.privacy ?? '',
    refund: paywall.refund ?? '',
    consentAnd: paywall.consentAnd ?? '',
    consentError: paywall.consentError ?? '',
    consentBody: (today: string, renew: string) => (paywall.consentBody ?? '').replace('__TODAY__', today).replace('__RENEW__', renew),
    yourResults: paywall.yourResults ?? '',
    primaryGoal: paywall.primaryGoal ?? '',
    fitnessLevel: paywall.fitnessLevel ?? '',
    sleepQuality: paywall.sleepQuality ?? '',
    fitnessAge: paywall.fitnessAge ?? '',
    fitnessAgeValue: (years: number) => (paywall.fitnessAgeValue ?? '').replace('__YEARS__', String(years)),
    workoutTitle: paywall.workoutTitle ?? '',
    workoutBadge: paywall.workoutBadge ?? '',
    waterTitle: paywall.waterTitle ?? '',
    waterBadge: paywall.waterBadge ?? '',
    readyHeading: paywall.readyHeading ?? '',
    bulletTitle: paywall.bulletTitle ?? '',
    bullets,
    whatYouGet: paywall.whatYouGet ?? '',
    features: Object.keys(featuresByIdx)
      .map(Number)
      .sort((a, b) => a - b)
      .map((i) => ({ title: featuresByIdx[i].title ?? '', desc: featuresByIdx[i].desc ?? '' })),
    socialText: paywall.socialText ?? '',
    socialSub: paywall.socialSub ?? '',
    socialCta: paywall.socialCta ?? '',
    storiesHeading: paywall.storiesHeading ?? '',
    personalHeading: (name: string) => (paywall.personalHeading ?? '').replace('__NAME__', name),
    guaranteeTitle: paywall.guaranteeTitle ?? '',
    guaranteeBody: paywall.guaranteeBody ?? '',
    footer: paywall.footer ?? '',
    goalLabels,
    sleepLabels,
    fitnessLabels,
    bmi: {
      Normal: { title: bmiTitles.Normal ?? '', text: (bmi: string) => (bmiTexts.Normal ?? '').replace('__BMI__', bmi) },
      Underweight: { title: bmiTitles.Underweight ?? '', text: (bmi: string) => (bmiTexts.Underweight ?? '').replace('__BMI__', bmi) },
      Overweight: { title: bmiTitles.Overweight ?? '', text: (bmi: string) => (bmiTexts.Overweight ?? '').replace('__BMI__', bmi) },
      Obese: { title: bmiTitles.Obese ?? '', text: (bmi: string) => (bmiTexts.Obese ?? '').replace('__BMI__', bmi) },
    },
  }
}

function buildReviews(flat: Record<string, string>): Review[] {
  const loading = parsePrefixed(flat, 'loading.')
  const grouped = groupByIndex(loading, 'reviews.')
  return Object.keys(grouped)
    .map(Number)
    .sort((a, b) => a - b)
    .map((i) => ({
      name: grouped[i].name ?? '',
      text: grouped[i].text ?? '',
      photo: grouped[i].photo ?? REVIEW_PHOTOS[i] ?? '',
      stars: Number(grouped[i].stars ?? 5),
    }))
}

function buildStories(flat: Record<string, string>): PaywallStory[] {
  const paywall = parsePrefixed(flat, 'paywall.')
  const grouped = groupByIndex(paywall, 'stories.')
  return Object.keys(grouped)
    .map(Number)
    .sort((a, b) => a - b)
    .map((i) => ({
      name: grouped[i].name ?? '',
      text: grouped[i].text ?? '',
      photo: grouped[i].photo ?? REVIEW_PHOTOS[i] ?? '',
      stars: Number(grouped[i].stars ?? 5),
    }))
}

function buildI18nSections(flat: Record<string, string>) {
  const intro = parsePrefixed(flat, 'intro.')
  const ui = parsePrefixed(flat, 'ui.')
  const stepPage = parsePrefixed(flat, 'stepPage.')
  const result = parsePrefixed(flat, 'result.')
  const results28 = parsePrefixed(flat, 'results28.')
  const wellness = parsePrefixed(flat, 'wellness.')
  const loading = Object.fromEntries(
    Object.entries(parsePrefixed(flat, 'loading.')).filter(([k]) => !k.startsWith('reviews.'))
  )
  const email = parsePrefixed(flat, 'email.')
  const steps = parsePrefixed(flat, 'steps.')
  return { intro, ui, stepPage, result, results28, wellness, loading, email, steps }
}

function renderPaywallObject(copy: Copy): string {
  const renderPlan = (plan: { name: string; desc: string; badge: string | null }) =>
    `{ name: ${quote(plan.name)}, desc: ${quote(plan.desc)}, badge: ${plan.badge === null ? 'null' : quote(plan.badge)} }`
  const renderFeature = (feature: { title: string; desc: string }) =>
    `{ title: ${quote(feature.title)}, desc: ${quote(feature.desc)} }`
  const renderBmi = (cat: keyof Copy['bmi']) =>
    `${cat}: { title: ${quote(copy.bmi[cat].title)}, text: ${renderTemplateFn(['bmi'], callFn(copy.bmi[cat].text as (...args: unknown[]) => string, '__BMI__'), [['__BMI__', 'bmi']])} }`

  return `{
  plans: [
    ${copy.plans.map(renderPlan).join(',\n    ')}
  ],
  pageTitle: ${quote(copy.pageTitle)},
  pageSub: ${quote(copy.pageSub)},
  discount: ${renderTemplateFn(['v'], copy.discount('__V__'), [['__V__', 'v']])},
  perDay: ${renderTemplateFn(['v'], copy.perDay('__V__'), [['__V__', 'v']])},
  moneyBackRow: ${quote(copy.moneyBackRow)},
  cta: ${quote(copy.cta)},
  consentPrefix: ${quote(copy.consentPrefix)},
  terms: ${quote(copy.terms)},
  privacy: ${quote(copy.privacy)},
  refund: ${quote(copy.refund)},
  consentAnd: ${quote(copy.consentAnd)},
  consentError: ${quote(copy.consentError)},
  consentBody: ${renderTemplateFn(['today', 'renew'], copy.consentBody('__TODAY__', '__RENEW__'), [['__TODAY__', 'today'], ['__RENEW__', 'renew']])},
  yourResults: ${quote(copy.yourResults)},
  primaryGoal: ${quote(copy.primaryGoal)},
  fitnessLevel: ${quote(copy.fitnessLevel)},
  sleepQuality: ${quote(copy.sleepQuality)},
  fitnessAge: ${quote(copy.fitnessAge)},
  fitnessAgeValue: ${renderTemplateFn(['years'], callFn(copy.fitnessAgeValue as (...args: unknown[]) => string, '__YEARS__'), [['__YEARS__', 'years']])},
  workoutTitle: ${quote(copy.workoutTitle)},
  workoutBadge: ${quote(copy.workoutBadge)},
  waterTitle: ${quote(copy.waterTitle)},
  waterBadge: ${quote(copy.waterBadge)},
  readyHeading: ${quote(copy.readyHeading)},
  bulletTitle: ${quote(copy.bulletTitle)},
  bullets: [${copy.bullets.map(quote).join(', ')}],
  whatYouGet: ${quote(copy.whatYouGet)},
  features: [
    ${copy.features.map(renderFeature).join(',\n    ')}
  ],
  socialText: ${quote(copy.socialText)},
  socialSub: ${quote(copy.socialSub)},
  socialCta: ${quote(copy.socialCta)},
  storiesHeading: ${quote(copy.storiesHeading)},
  personalHeading: ${renderTemplateFn(['name'], copy.personalHeading('__NAME__'), [['__NAME__', 'name']])},
  guaranteeTitle: ${quote(copy.guaranteeTitle)},
  guaranteeBody: ${quote(copy.guaranteeBody)},
  footer: ${quote(copy.footer)},
  goalLabels: ${renderSimpleRecord(copy.goalLabels)},
  sleepLabels: ${renderSimpleRecord(copy.sleepLabels)},
  fitnessLabels: ${renderSimpleRecord(copy.fitnessLabels)},
  bmi: {
    ${renderBmi('Normal')},
    ${renderBmi('Underweight')},
    ${renderBmi('Overweight')},
    ${renderBmi('Obese')}
  },
}`
}

function renderReviewsObject<T extends Review | PaywallStory>(items: T[]): string {
  return `[
    ${items.map((item) => `{ photo: ${quote(item.photo)}, name: ${quote(item.name)}, text: ${quote(item.text)}, stars: ${item.stars} }`).join(',\n    ')}
  ]`
}

function renderI18nConstants(flatByLang: Record<LangCode, Record<string, string>>): string {
  const sections = Object.fromEntries(VALID_LANGS.map((lang) => [lang, buildI18nSections(flatByLang[lang])])) as Record<LangCode, ReturnType<typeof buildI18nSections>>
  const renderLangRecord = (name: keyof ReturnType<typeof buildI18nSections>, renderValue: (lang: LangCode) => string) =>
    `const ${name}: Record<LangCode, ${name === 'intro' ? 'IntroTranslations' : name === 'ui' ? 'UITranslations' : name === 'stepPage' ? 'StepPageTranslations' : name === 'result' ? 'ResultTranslations' : name === 'results28' ? 'Results28Translations' : name === 'wellness' ? 'WellnessTranslations' : name === 'loading' ? 'LoadingTranslations' : 'EmailTranslations'}> = {\n${VALID_LANGS.map((lang) => `  ${lang}: ${renderValue(lang)}`).join(',\n')}\n}\n`

  const renderStepPage = (lang: LangCode) => {
    const s = sections[lang].stepPage
    return `{
    error_range: ${renderTemplateFn(['mn', 'mx', 'u'], s.error_range ?? '', [['__MIN__', 'mn'], ['__MAX__', 'mx'], ['__UNIT__', 'u']])},
    bmi_checking: ${quote(s.bmi_checking ?? '')},
    bmi_underweight: ${renderTemplateFn(['b'], s.bmi_underweight ?? '', [['__BMI__', 'b']])},
    bmi_underweight_body: ${quote(s.bmi_underweight_body ?? '')},
    bmi_normal: ${renderTemplateFn(['b'], s.bmi_normal ?? '', [['__BMI__', 'b']])},
    bmi_normal_body: ${quote(s.bmi_normal_body ?? '')},
    bmi_overweight: ${renderTemplateFn(['b'], s.bmi_overweight ?? '', [['__BMI__', 'b']])},
    bmi_overweight_body: ${quote(s.bmi_overweight_body ?? '')},
    bmi_obese: ${renderTemplateFn(['b'], s.bmi_obese ?? '', [['__BMI__', 'b']])},
    bmi_obese_body: ${quote(s.bmi_obese_body ?? '')},
    goal_placeholder: ${quote(s.goal_placeholder ?? '')},
    goal_weight_too_high: ${quote(s.goal_weight_too_high ?? '')},
    goal_too_low: ${quote(s.goal_too_low ?? '')},
    goal_a_lot: ${quote(s.goal_a_lot ?? '')},
    goal_moderate: ${quote(s.goal_moderate ?? '')},
    goal_small: ${quote(s.goal_small ?? '')},
    consent_text: ${quote(s.consent_text ?? '')},
    consent_privacy_link: ${quote(s.consent_privacy_link ?? '')},
    char_count: ${renderTemplateFn(['n'], s.char_count ?? '', [['__N__', 'n']])},
  }`
  }
  const renderResult = (lang: LangCode) => {
    const s = sections[lang].result
    return `{
    header_label: ${quote(s.header_label ?? '')},
    headline: ${quote(s.headline ?? '')},
    subtitle: ${quote(s.subtitle ?? '')},
    guide_text: ${quote(s.guide_text ?? '')},
    goal_line: ${renderTemplateFn(['w', 'd', 'u'], s.goal_line ?? '', [['__W__', 'w'], ['__D__', 'd'], ['__U__', 'u']])},
    cta: ${quote(s.cta ?? '')},
  }`
  }
  const renderResults28 = (lang: LangCode) => {
    const s = sections[lang].results28
    return `{
    header_label: ${quote(s.header_label ?? '')},
    your_weight: ${quote(s.your_weight ?? '')},
    now: ${quote(s.now ?? '')},
    after_4_weeks: ${quote(s.after_4_weeks ?? '')},
    week: ${renderTemplateFn(['n'], s.week ?? '', [['__N__', 'n']])},
    chart_note: ${quote(s.chart_note ?? '')},
    headline: ${quote(s.headline ?? '')},
  }`
  }
  const renderWellness = (lang: LangCode) => {
    const s = sections[lang].wellness
    const lifestyle = Object.fromEntries(Object.entries(s).filter(([k]) => k.startsWith('lifestyle.')).map(([k, v]) => [k.slice('lifestyle.'.length), v]))
    const eater = Object.fromEntries(Object.entries(s).filter(([k]) => k.startsWith('eater.')).map(([k, v]) => [k.slice('eater.'.length), v]))
    const motivation = Object.fromEntries(Object.entries(s).filter(([k]) => k.startsWith('motivation.')).map(([k, v]) => [k.slice('motivation.'.length), v]))
    return `{
    header_label: ${quote(s.header_label ?? '')},
    headline: ${quote(s.headline ?? '')},
    lifestyle_label: ${quote(s.lifestyle_label ?? '')},
    eater_label: ${quote(s.eater_label ?? '')},
    motivation_label: ${quote(s.motivation_label ?? '')},
    img_alt: ${quote(s.img_alt ?? '')},
    warning_title: ${quote(s.warning_title ?? '')},
    warning_desc: ${quote(s.warning_desc ?? '')},
    bmi_normal_msg: ${quote(s.bmi_normal_msg ?? '')},
    bmi_overweight_msg: ${quote(s.bmi_overweight_msg ?? '')},
    bmi_obese_msg: ${quote(s.bmi_obese_msg ?? '')},
    lifestyle: ${renderSimpleRecord(lifestyle)},
    eater: ${renderSimpleRecord(eater)},
    motivation: ${renderSimpleRecord(motivation)},
  }`
  }
  const renderQuizStepsLang = (lang: LangCode) => {
    const grouped: Record<number, Record<string, string>> = {}
    for (const [k, v] of Object.entries(sections[lang].steps)) {
      const parts = k.split('.')
      const step = Number(parts[0])
      const field = parts.slice(1).join('.')
      grouped[step] = grouped[step] ?? {}
      grouped[step][field] = v
    }
    const steps = Object.keys(grouped).map(Number).sort((a, b) => a - b)
    const stepStrings = steps.map((step) => {
      const s = grouped[step]
      const fields: string[] = []
      if (s.question) fields.push(`question:${quote(s.question)}`)
      if (s.subtitle) fields.push(`subtitle:${quote(s.subtitle)}`)
      if (s.placeholder) fields.push(`placeholder:${quote(s.placeholder)}`)
      if (s.hintTitle) fields.push(`hintTitle:${quote(s.hintTitle)}`)
      if (s.hint) fields.push(`hint:${quote(s.hint)}`)
      if (s.buttonLabel) fields.push(`buttonLabel:${quote(s.buttonLabel)}`)
      const options = Object.fromEntries(Object.entries(s).filter(([k]) => k.startsWith('options.')).map(([k, v]) => [k.slice('options.'.length), v]))
      if (Object.keys(options).length) fields.push(`options:${renderSimpleRecord(options)}`)
      const interstitial = Object.fromEntries(Object.entries(s).filter(([k]) => k.startsWith('interstitial.')).map(([k, v]) => [k.slice('interstitial.'.length), v]))
      if (Object.keys(interstitial).length) fields.push(`interstitial:${renderSimpleRecord(interstitial)}`)
      return `    ${step}:{ ${fields.join(', ')} }`
    })
    return `{\n${stepStrings.join(',\n')}\n  }`
  }

  return [
    renderLangRecord('intro', (lang) => renderSimpleRecord(sections[lang].intro)),
    renderLangRecord('ui', (lang) => renderSimpleRecord(sections[lang].ui)),
    renderLangRecord('stepPage', renderStepPage),
    renderLangRecord('result', renderResult),
    renderLangRecord('results28', renderResults28),
    renderLangRecord('wellness', renderWellness),
    renderLangRecord('loading', (lang) => renderSimpleRecord(sections[lang].loading)),
    renderLangRecord('email', (lang) => renderSimpleRecord(sections[lang].email)),
    `const quizSteps: Record<LangCode, Record<number, QuizStepT>> = {\n${VALID_LANGS.map((lang) => `  ${lang}: ${renderQuizStepsLang(lang)}`).join(',\n')}\n}\n`,
  ].join('\n')
}

function replaceBetween(src: string, startMarker: string, endMarker: string, replacement: string): string {
  const start = src.indexOf(startMarker)
  const end = src.indexOf(endMarker)
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`Could not replace block between markers: ${startMarker} / ${endMarker}`)
  }
  return src.slice(0, start) + replacement + '\n\n' + src.slice(end)
}

function replaceFromMarker(src: string, startMarker: string, replacement: string): string {
  const start = src.indexOf(startMarker)
  if (start === -1) {
    throw new Error(`Could not replace block from marker: ${startMarker}`)
  }
  return src.slice(0, start) + replacement + '\n'
}

export function writeTranslationSources(flatByLang: Record<LangCode, Record<string, string>>) {
  const root = process.cwd()

  const i18nPath = path.join(root, 'lib', 'i18n.ts')
  const i18nSrc = fs.readFileSync(i18nPath, 'utf-8')
  const i18nConstants = renderI18nConstants(flatByLang)
  fs.writeFileSync(
    i18nPath,
    replaceBetween(i18nSrc, 'const intro: Record<LangCode, IntroTranslations> = {', 'export function useIntroT', i18nConstants.trim()),
    'utf-8'
  )

  const paywallPath = path.join(root, 'lib', 'paywall-copy.ts')
  const paywallCopies = Object.fromEntries(VALID_LANGS.map((lang) => [lang, buildPaywallCopy(flatByLang[lang])])) as Record<LangCode, Copy>
  const paywallBlock = `export const EN: Copy = ${renderPaywallObject(paywallCopies.en)}\n\nexport function localize(base: Copy, overrides: Partial<Copy>): Copy {\n  return {\n    ...base,\n    ...overrides,\n    plans: overrides.plans ?? base.plans,\n    features: overrides.features ?? base.features,\n    goalLabels: overrides.goalLabels ?? base.goalLabels,\n    sleepLabels: overrides.sleepLabels ?? base.sleepLabels,\n    fitnessLabels: overrides.fitnessLabels ?? base.fitnessLabels,\n    bmi: overrides.bmi ?? base.bmi,\n  }\n}\n\nexport const COPY: Record<LangCode, Copy> = {\n${VALID_LANGS.map((lang) => `  ${lang}: ${lang === 'en' ? 'EN' : renderPaywallObject(paywallCopies[lang])}`).join(',\n')}\n}\n`
  fs.writeFileSync(
    paywallPath,
    replaceFromMarker(fs.readFileSync(paywallPath, 'utf-8'), 'export const EN: Copy = {', paywallBlock.trim()),
    'utf-8'
  )

  const reviewsPath = path.join(root, 'lib', 'reviews-data.ts')
  const reviewsByLang = Object.fromEntries(VALID_LANGS.map((lang) => [lang, buildReviews(flatByLang[lang])])) as Record<LangCode, Review[]>
  const reviewsBlock = `export const REVIEWS: Record<LangCode, Review[]> = {\n${VALID_LANGS.map((lang) => `  ${lang}: ${renderReviewsObject(reviewsByLang[lang])}`).join(',\n')}\n}\n`
  fs.writeFileSync(
    reviewsPath,
    replaceFromMarker(fs.readFileSync(reviewsPath, 'utf-8'), 'export const REVIEWS: Record<LangCode, Review[]> = {', reviewsBlock.trim()),
    'utf-8'
  )

  const storiesPath = path.join(root, 'lib', 'paywall-stories-data.ts')
  const storiesByLang = Object.fromEntries(VALID_LANGS.map((lang) => [lang, buildStories(flatByLang[lang])])) as Record<LangCode, PaywallStory[]>
  const storiesContent = `import type { LangCode } from '@/lib/lang-store'\nimport { REVIEW_PHOTOS } from '@/lib/reviews-data'\n\nexport type PaywallStory = {\n  photo: string\n  name: string\n  text: string\n  stars: number\n}\n\nexport const PAYWALL_STORIES: Record<LangCode, PaywallStory[]> = {\n${VALID_LANGS.map((lang) => `  ${lang}: ${renderReviewsObject(storiesByLang[lang])}`).join(',\n')}\n}\n`
  fs.writeFileSync(storiesPath, storiesContent, 'utf-8')
}
