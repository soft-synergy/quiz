'use client'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import QuizHeader from '@/components/QuizHeader/QuizHeader'
import RingProgress from '@/components/RingProgress/RingProgress'
import ReviewCarousel from '@/components/ReviewCarousel/ReviewCarousel'
import { useQuizStore } from '@/lib/quiz-store'
import { useLangStore } from '@/lib/lang-store'
import { useLoadingT } from '@/lib/i18n'
import { REVIEWS } from '@/lib/reviews-data'
import { useTranslationOverrides, applyLoadingOverrides } from '@/lib/use-translation-overrides'

export default function PlanLoadingPage() {
  const router = useRouter()
  const setDirection = useQuizStore((s) => s.setDirection)
  const lang = useLangStore((s) => s.lang)
  const ov = useTranslationOverrides(lang)
  const { t, reviews: reviewsOverridden } = applyLoadingOverrides(useLoadingT(lang), REVIEWS[lang] ?? REVIEWS.en, ov)

  useEffect(() => {
    router.prefetch('/quiz/email')
  }, [router])

  const handleComplete = useCallback(() => {
    setDirection('forward')
    router.push('/quiz/email')
  }, [router, setDirection])

  return (
    <>
      <QuizHeader label={t.header_label} showBack={false} hideProgress={true} />
      <main className={styles.main}>
        <div className={styles.content}>
          <RingProgress durationMs={6000} onComplete={handleComplete} />
          <h1 className={styles.planTitle}>{t.title}</h1>
        </div>
        <ReviewCarousel reviews={reviewsOverridden} />
      </main>
    </>
  )
}
