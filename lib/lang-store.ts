'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LangCode = 'en' | 'pl' | 'de' | 'es' | 'fr' | 'it' | 'pt' | 'ru'

function setCookie(lang: LangCode) {
  if (typeof document !== 'undefined') {
    document.cookie = `lang=${lang};path=/;max-age=31536000;SameSite=Lax`
  }
}

interface LangState {
  lang: LangCode
  setLang: (lang: LangCode) => void
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      // Fixed default so SSR and the first client pass match; real value loads via persist.rehydrate().
      lang: 'en',
      setLang: (lang) => {
        set({ lang })
        setCookie(lang)
      },
    }),
    { name: 'taichi-lang', skipHydration: true }
  )
)
