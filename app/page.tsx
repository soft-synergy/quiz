'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LANGUAGES } from '@/lib/i18n'
import { useLangStore, type LangCode } from '@/lib/lang-store'

const VALID_LANGS = new Set(LANGUAGES.map((l) => l.code))
const BROWSER_LANG_MAP: Record<string, LangCode> = {
  en: 'en',
  lt: 'lt',
  lv: 'lv',
  ro: 'ro',
  cs: 'cz',
  cz: 'cz',
  da: 'dk',
  dk: 'dk',
  el: 'gr',
  gr: 'gr',
  hu: 'hu',
  hr: 'hr',
  he: 'il',
  il: 'il',
  ja: 'jp',
  jp: 'jp',
  ru: 'ru',
  sk: 'sk',
  zh: 'tw',
  tw: 'tw',
}

export default function RootPage() {
  const router = useRouter()
  const storedLang = useLangStore((s) => s.lang)

  useEffect(() => {
    // 1. use previously selected lang from store
    if (storedLang && VALID_LANGS.has(storedLang)) {
      router.replace(`/${storedLang}`)
      return
    }
    // 2. detect browser language
    const browserLang = navigator.language?.split('-')[0].toLowerCase()
    const mappedLang = browserLang ? BROWSER_LANG_MAP[browserLang] : undefined
    if (mappedLang && VALID_LANGS.has(mappedLang)) {
      router.replace(`/${mappedLang}`)
      return
    }
    // 3. fallback
    router.replace('/en')
  }, [router, storedLang])

  return null
}
