'use client'
import { useCallback, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import styles from '@/app/quiz/plan-loading/page.module.css'
import QuizHeader from '@/components/QuizHeader/QuizHeader'
import RingProgress from '@/components/RingProgress/RingProgress'
import ReviewCarousel from '@/components/ReviewCarousel/ReviewCarousel'
import { useQuizStore } from '@/lib/quiz-store'
import type { LangCode } from '@/lib/lang-store'
import { useLoadingT } from '@/lib/i18n'
import { REVIEWS } from '@/lib/reviews-data'
import { useTranslationOverrides, applyLoadingOverrides } from '@/lib/use-translation-overrides'

export default function PlanLoadingPage() {
  const router = useRouter()
  const params = useParams()
  const routeLang = params.lang as LangCode
  const setDirection = useQuizStore((s) => s.setDirection)
  const ov = useTranslationOverrides(routeLang)
  const { t, reviews: reviewsOverridden } = applyLoadingOverrides(useLoadingT(routeLang), REVIEWS[routeLang] ?? REVIEWS.en, ov)

  const base = `/${routeLang}/quiz`

  useEffect(() => {
    router.prefetch(`${base}/email`)
  }, [router, base])

  const handleComplete = useCallback(() => {
    setDirection('forward')
    router.push(`${base}/email`)
  }, [router, setDirection, base])

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
