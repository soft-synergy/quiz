'use client'
import { useEffect } from 'react'
import { create } from 'zustand'
import type { LangCode } from './lang-store'
import type { QuizStep } from './quiz-data'
import type {
  StepPageTranslations,
  ResultTranslations,
  Results28Translations,
  WellnessTranslations,
} from './i18n'

// ─── Zustand store ─────────────────────────────────────────────────────────
// Shared across all components — only one fetch per lang per session.

interface OverrideStore {
  data: Partial<Record<string, Record<string, string>>>
}

const useOverrideStore = create<OverrideStore>(() => ({ data: {} }))

// Module-level guard so we never fire duplicate requests
const started: Partial<Record<string, true>> = {}

function loadLang(lang: string) {
  if (lang in useOverrideStore.getState().data || started[lang]) return
  started[lang] = true
  fetch(`/translations/${lang}.json`, { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : {}))
    .then((ov) => useOverrideStore.setState((s) => ({ data: { ...s.data, [lang]: ov } })))
    .catch(() => useOverrideStore.setState((s) => ({ data: { ...s.data, [lang]: {} } })))
}

/** Triggers the fetch (idempotent) and returns current overrides for `lang`. */
export function useTranslationOverrides(lang: LangCode): Record<string, string> {
  const data = useOverrideStore((s) => s.data)

  useEffect(() => {
    loadLang(lang)
  }, [lang])

  return data[lang] ?? {}
}

// ─── Section helpers ───────────────────────────────────────────────────────

/** Flat string-only sections: intro, ui, loading, email */
export function applyFlatSection<T>(base: T, ov: Record<string, string>, prefix: string): T {
  const entries = Object.entries(ov).filter(([k]) => k.startsWith(prefix))
  if (!entries.length) return base
  return { ...(base as object), ...Object.fromEntries(entries.map(([k, v]) => [k.slice(prefix.length), v])) } as T
}

/** stepPage — has function fields */
export function applyStepPageOverrides(
  t: StepPageTranslations,
  ov: Record<string, string>
): StepPageTranslations {
  const o = (k: string) => ov[`stepPage.${k}`]
  return {
    ...t,
    bmi_checking: o('bmi_checking') ?? t.bmi_checking,
    bmi_underweight_body: o('bmi_underweight_body') ?? t.bmi_underweight_body,
    bmi_normal_body: o('bmi_normal_body') ?? t.bmi_normal_body,
    bmi_overweight_body: o('bmi_overweight_body') ?? t.bmi_overweight_body,
    bmi_obese_body: o('bmi_obese_body') ?? t.bmi_obese_body,
    goal_placeholder: o('goal_placeholder') ?? t.goal_placeholder,
    goal_weight_too_high: o('goal_weight_too_high') ?? t.goal_weight_too_high,
    goal_too_low: o('goal_too_low') ?? t.goal_too_low,
    goal_a_lot: o('goal_a_lot') ?? t.goal_a_lot,
    goal_moderate: o('goal_moderate') ?? t.goal_moderate,
    goal_small: o('goal_small') ?? t.goal_small,
    consent_text: o('consent_text') ?? t.consent_text,
    consent_privacy_link: o('consent_privacy_link') ?? t.consent_privacy_link,
    error_range: o('error_range')
      ? (mn: number, mx: number, u: string) =>
          o('error_range')!.replace('__MIN__', String(mn)).replace('__MAX__', String(mx)).replace('__UNIT__', u).trim()
      : t.error_range,
    bmi_underweight: o('bmi_underweight')
      ? (b: string) => o('bmi_underweight')!.replace('__BMI__', b)
      : t.bmi_underweight,
    bmi_normal: o('bmi_normal')
      ? (b: string) => o('bmi_normal')!.replace('__BMI__', b)
      : t.bmi_normal,
    bmi_overweight: o('bmi_overweight')
      ? (b: string) => o('bmi_overweight')!.replace('__BMI__', b)
      : t.bmi_overweight,
    bmi_obese: o('bmi_obese')
      ? (b: string) => o('bmi_obese')!.replace('__BMI__', b)
      : t.bmi_obese,
    char_count: o('char_count')
      ? (n: number) => o('char_count')!.replace('__N__', String(n))
      : t.char_count,
  }
}

/** result — has goal_line function */
export function applyResultOverrides(
  t: ResultTranslations,
  ov: Record<string, string>
): ResultTranslations {
  const o = (k: string) => ov[`result.${k}`]
  return {
    ...t,
    header_label: o('header_label') ?? t.header_label,
    headline: o('headline') ?? t.headline,
    subtitle: o('subtitle') ?? t.subtitle,
    guide_text: o('guide_text') ?? t.guide_text,
    cta: o('cta') ?? t.cta,
    goal_line: o('goal_line')
      ? (w: number, d: string, u?: string) => o('goal_line')!.replace('__W__', String(w)).replace('__D__', d).replace('__U__', u ?? 'kg')
      : t.goal_line,
  }
}

/** results28 — has week function */
export function applyResults28Overrides(
  t: Results28Translations,
  ov: Record<string, string>
): Results28Translations {
  const o = (k: string) => ov[`results28.${k}`]
  return {
    ...t,
    header_label: o('header_label') ?? t.header_label,
    your_weight: o('your_weight') ?? t.your_weight,
    now: o('now') ?? t.now,
    after_4_weeks: o('after_4_weeks') ?? t.after_4_weeks,
    chart_note: o('chart_note') ?? t.chart_note,
    headline: o('headline') ?? t.headline,
    week: o('week')
      ? (n: number) => o('week')!.replace('__N__', String(n))
      : t.week,
  }
}

/** wellness — nested lifestyle/eater/motivation objects */
export function applyWellnessOverrides(
  t: WellnessTranslations,
  ov: Record<string, string>
): WellnessTranslations {
  const o = (k: string) => ov[`wellness.${k}`]
  const lifestyleEntries = Object.entries(ov)
    .filter(([k]) => k.startsWith('wellness.lifestyle.'))
    .map(([k, v]) => [k.slice('wellness.lifestyle.'.length), v])
  return {
    ...t,
    header_label: o('header_label') ?? t.header_label,
    headline: o('headline') ?? t.headline,
    lifestyle_label: o('lifestyle_label') ?? t.lifestyle_label,
    eater_label: o('eater_label') ?? t.eater_label,
    motivation_label: o('motivation_label') ?? t.motivation_label,
    img_alt: o('img_alt') ?? t.img_alt,
    warning_title: o('warning_title') ?? t.warning_title,
    warning_desc: o('warning_desc') ?? t.warning_desc,
    bmi_normal_msg: o('bmi_normal_msg') ?? t.bmi_normal_msg,
    bmi_overweight_msg: o('bmi_overweight_msg') ?? t.bmi_overweight_msg,
    bmi_obese_msg: o('bmi_obese_msg') ?? t.bmi_obese_msg,
    lifestyle: lifestyleEntries.length
      ? { ...t.lifestyle, ...Object.fromEntries(lifestyleEntries) }
      : t.lifestyle,
    eater: {
      balanced: o('eater.balanced') ?? t.eater.balanced,
      sweet: o('eater.sweet') ?? t.eater.sweet,
      salty: o('eater.salty') ?? t.eater.salty,
      emotional: o('eater.emotional') ?? t.eater.emotional,
    },
    motivation: {
      high: o('motivation.high') ?? t.motivation.high,
      moderate: o('motivation.moderate') ?? t.motivation.moderate,
      low: o('motivation.low') ?? t.motivation.low,
    },
  }
}

/** paywall — handles all flat keys including functions, arrays, nested objects */
export function applyPaywallOverrides<T extends Record<string, unknown>>(
  copy: T,
  ov: Record<string, string>
): T {
  const prefix = 'paywall.'
  const entries = Object.entries(ov).filter(([k]) => k.startsWith(prefix))
  if (!entries.length) return copy
  const patch: Record<string, unknown> = {}

  for (const [k, v] of entries) {
    const key = k.slice(prefix.length)

    // Functions with placeholders
    if (key === 'personalHeading') {
      patch[key] = (name: string) =>
        name ? v.replace('__NAME__', name) : v.replace(/^__NAME__[,，、]?\s*/, '')
    } else if (key === 'discount') {
      patch[key] = (val: string) => v.replace('__V__', val)
    } else if (key === 'perDay') {
      patch[key] = (val: string) => v.replace('__V__', val)
    } else if (key === 'consentBody') {
      patch[key] = (today: string, renew: string) => v.replace('__TODAY__', today).replace('__RENEW__', renew)
    } else if (key === 'fitnessAgeValue') {
      patch[key] = (years: number) => v.replace('__YEARS__', String(years))
    }
    // Arrays: bullets.0, bullets.1, etc.
    else if (key.startsWith('bullets.')) {
      const idx = parseInt(key.slice('bullets.'.length))
      const bullets = [...((patch.bullets as string[]) ?? (copy as Record<string, unknown>).bullets as string[])]
      bullets[idx] = v
      patch.bullets = bullets
    }
    // plans.0.name, plans.0.desc, plans.0.badge
    else if (key.startsWith('plans.')) {
      const parts = key.split('.')  // ['plans', '0', 'name']
      const idx = parseInt(parts[1])
      const field = parts[2]
      const plans = [...((patch.plans as { name: string; desc: string; badge: string | null }[]) ?? (copy as Record<string, unknown>).plans as { name: string; desc: string; badge: string | null }[])]
      plans[idx] = { ...plans[idx], [field]: field === 'badge' ? (v || null) : v }
      patch.plans = plans
    }
    // features.0.title, features.0.desc
    else if (key.startsWith('features.')) {
      const parts = key.split('.')
      const idx = parseInt(parts[1])
      const field = parts[2]
      const features = [...((patch.features as { title: string; desc: string }[]) ?? (copy as Record<string, unknown>).features as { title: string; desc: string }[])]
      features[idx] = { ...features[idx], [field]: v }
      patch.features = features
    }
    // goalLabels.lose-weight, etc.
    else if (key.startsWith('goalLabels.')) {
      const labelKey = key.slice('goalLabels.'.length)
      patch.goalLabels = { ...((patch.goalLabels as Record<string, string>) ?? (copy as Record<string, unknown>).goalLabels as Record<string, string>), [labelKey]: v }
    }
    else if (key.startsWith('sleepLabels.')) {
      const labelKey = key.slice('sleepLabels.'.length)
      patch.sleepLabels = { ...((patch.sleepLabels as Record<string, string>) ?? (copy as Record<string, unknown>).sleepLabels as Record<string, string>), [labelKey]: v }
    }
    else if (key.startsWith('fitnessLabels.')) {
      const labelKey = key.slice('fitnessLabels.'.length)
      patch.fitnessLabels = { ...((patch.fitnessLabels as Record<string, string>) ?? (copy as Record<string, unknown>).fitnessLabels as Record<string, string>), [labelKey]: v }
    }
    // bmi.Normal.title, bmi.Normal.text
    else if (key.startsWith('bmi.')) {
      const parts = key.split('.')  // ['bmi', 'Normal', 'title'|'text']
      const cat = parts[1]
      const field = parts[2]
      const bmi = { ...((patch.bmi as Record<string, unknown>) ?? (copy as Record<string, unknown>).bmi as Record<string, unknown>) }
      const catObj = { ...(bmi[cat] as Record<string, unknown> ?? {}) }
      if (field === 'text') {
        catObj.text = (b: string) => v.replace('__BMI__', b)
      } else {
        catObj[field] = v
      }
      bmi[cat] = catObj
      patch.bmi = bmi
    }
    // reviews.0.name, etc. — skip, reviews are read-only in admin
    else if (!key.startsWith('reviews.')) {
      // Simple string fields
      patch[key] = v
    }
  }

  return { ...(copy as object), ...patch } as T
}

/** quiz steps */
export function applyStepOverrides(step: QuizStep, ov: Record<string, string>): QuizStep {
  const pfx = `steps.${step.step}.`
  if (!Object.keys(ov).some((k) => k.startsWith(pfx))) return step
  const g = (key: string) => ov[pfx + key]
  return {
    ...step,
    ...(g('question') ? { question: g('question')! } : {}),
    ...(g('subtitle') ? { subtitle: g('subtitle')! } : {}),
    ...(g('placeholder') ? { placeholder: g('placeholder')! } : {}),
    ...(g('hint') ? { hint: g('hint')! } : {}),
    ...(g('hintTitle') ? { hintTitle: g('hintTitle')! } : {}),
    ...(g('buttonLabel') ? { buttonLabel: g('buttonLabel')! } : {}),
    options: step.options?.map((opt) => ({
      ...opt,
      label: g(`options.${opt.id}`) ?? opt.label,
    })),
    interstitial: step.interstitial
      ? {
          ...step.interstitial,
          headline: g('interstitial.headline') ?? step.interstitial.headline,
          body: g('interstitial.body') ?? step.interstitial.body ?? '',
          ...(step.interstitial.note !== undefined || g('interstitial.note')
            ? { note: g('interstitial.note') ?? step.interstitial.note }
            : {}),
        }
      : undefined,
  }
}
