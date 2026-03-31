import type { LangCode } from './lang-store'

export const LOCALIZED_BRAND_NAME: Record<LangCode, string> = {
  en: 'Tai Chi Coach',
  lt: 'Tai Ci treneris',
  lv: 'Tai Ci treneris',
  ro: 'Antrenorul de Tai Chi',
  cz: 'Tai Chi kouč',
  dk: 'Tai Chi-coach',
  gr: 'Προπονητής Tai Chi',
  hu: 'Tai Chi edző',
  hr: 'Tai Chi trener',
  il: 'מאמן טאי צ׳י',
  jp: '太極拳コーチ',
  ru: 'Тайцзи-тренер',
  sk: 'Tai Chi kouč',
  tw: '太極教練',
}

const BRAND_PATTERNS = [/TAICHI COACH/g, /Tai Chi Coach/g]

function localizeBrandText(text: string, lang: LangCode): string {
  const brandName = LOCALIZED_BRAND_NAME[lang] ?? LOCALIZED_BRAND_NAME.en
  return BRAND_PATTERNS.reduce((acc, pattern) => acc.replace(pattern, brandName), text)
}

export function localizeBrandValue<T>(value: T, lang: LangCode): T {
  if (typeof value === 'string') {
    return localizeBrandText(value, lang) as T
  }

  if (typeof value === 'function') {
    return ((...args: unknown[]) => localizeBrandValue((value as (...innerArgs: unknown[]) => unknown)(...args), lang)) as T
  }

  if (Array.isArray(value)) {
    return value.map((item) => localizeBrandValue(item, lang)) as T
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, localizeBrandValue(item, lang)])
    ) as T
  }

  return value
}
