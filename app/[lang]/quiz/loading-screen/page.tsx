'use client'
import { useCallback, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import styles from '@/app/quiz/loading-screen/page.module.css'
import QuizHeader from '@/components/QuizHeader/QuizHeader'
import RingProgress from '@/components/RingProgress/RingProgress'
import ReviewCarousel from '@/components/ReviewCarousel/ReviewCarousel'
import { useQuizStore } from '@/lib/quiz-store'
import type { LangCode } from '@/lib/lang-store'
import { useLoadingT } from '@/lib/i18n'

export default function LoadingPage() {
  const router = useRouter()
  const params = useParams()
  const routeLang = params.lang as LangCode
  const setDirection = useQuizStore((s) => s.setDirection)
  const t = useLoadingT(routeLang)

  const base = `/${routeLang}/quiz`

  useEffect(() => {
    router.prefetch(`${base}/wellness`)
    router.prefetch(`${base}/result`)
  }, [router, base])

  const handleComplete = useCallback(() => {
    setDirection('forward')
    router.push(`${base}/wellness`)
  }, [router, setDirection, base])

  return (
    <>
      <QuizHeader label={t.header_label} showBack={false} hideProgress={true} />
      <main className={styles.main}>
        <div className={styles.content}>
          <RingProgress durationMs={6000} onComplete={handleComplete} />
          <h1 className={styles.planTitle}>{t.title}</h1>
          <ReviewCarousel />
        </div>
      </main>
    </>
  )
}
