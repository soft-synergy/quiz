'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LANGUAGES } from '@/lib/i18n'
import { useLangStore, type LangCode } from '@/lib/lang-store'

const VALID_LANGS = new Set(LANGUAGES.map((l) => l.code))

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
    const browserLang = navigator.language?.split('-')[0] as LangCode
    if (browserLang && VALID_LANGS.has(browserLang)) {
      router.replace(`/${browserLang}`)
      return
    }
    // 3. fallback
    router.replace('/en')
  }, [router, storedLang])

  return null
}
