'use client'

import { useLayoutEffect } from 'react'
import { useLangStore } from '@/lib/lang-store'
import { useQuizStore } from '@/lib/quiz-store'

/**
 * Rehydrates persisted Zustand stores after SSR markup matches (skipHydration).
 * useLayoutEffect runs before paint so lang/answers sync without a visible EN flash.
 */
export default function StoreHydration() {
  useLayoutEffect(() => {
    void useLangStore.persist.rehydrate()
    void useQuizStore.persist.rehydrate()
  }, [])
  return null
}
