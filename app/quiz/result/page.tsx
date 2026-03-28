'use client'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import QuizHeader from '@/components/QuizHeader/QuizHeader'
import QuizFooter from '@/components/QuizFooter/QuizFooter'
import WeightChart from '@/components/WeightChart/WeightChart'
import { useQuizStore } from '@/lib/quiz-store'
import { useLangStore } from '@/lib/lang-store'
import { useResultT } from '@/lib/i18n'
import { getGoalDate } from '@/lib/bmi-utils'

export default function ResultPage() {
  const router = useRouter()
  const { answers, _hydrated } = useQuizStore()
  const lang = useLangStore((s) => s.lang)
  const t = useResultT(lang)

  if (!_hydrated) return null

  const startWeight = Number(answers[24]) || 222
  const goalWeight = Number(answers[25]) || 120
  const goalDate = getGoalDate(startWeight, goalWeight)

  return (
    <>
      <QuizHeader label={t.header_label} showBack={false} hideProgress={true} />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.headline}>{t.headline}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>

          <div className={styles.goalDisplay}>
            <div className={styles.goalWeightLine}>
              {goalWeight} lbs by {goalDate}
            </div>
            <div className={styles.goalTagline}>{t.guide_text}</div>
          </div>

          <WeightChart startWeight={startWeight} goalWeight={goalWeight} goalDate={goalDate} />
        </div>
      </main>
      <QuizFooter label={t.cta} onClick={() => router.push('/quiz/plan-loading')} />
    </>
  )
}
