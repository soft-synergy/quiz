'use client'
import { useRouter, useParams } from 'next/navigation'
import styles from '@/app/quiz/result/page.module.css'
import QuizHeader from '@/components/QuizHeader/QuizHeader'
import QuizFooter from '@/components/QuizFooter/QuizFooter'
import WeightChart from '@/components/WeightChart/WeightChart'
import { useQuizStore } from '@/lib/quiz-store'
import type { LangCode } from '@/lib/lang-store'
import { useResultT } from '@/lib/i18n'
import { useTranslationOverrides, applyResultOverrides } from '@/lib/use-translation-overrides'
import { getGoalDate, fromCanonical } from '@/lib/bmi-utils'

export default function ResultPage() {
  const router = useRouter()
  const params = useParams()
  const routeLang = params.lang as LangCode
  const { answers, weightUnit, _hydrated } = useQuizStore()
  const ov = useTranslationOverrides(routeLang)
  const t = applyResultOverrides(useResultT(routeLang), ov)

  const base = `/${routeLang}/quiz`

  if (!_hydrated) return null

  const startWeight = Number(answers[24]) || 222
  const goalWeight = Number(answers[25]) || 120
  const goalDate = getGoalDate(startWeight, goalWeight)

  // Convert canonical lbs values to the user's chosen unit for display
  const displayGoal = weightUnit === 'kg'
    ? Math.round(Number(fromCanonical(String(goalWeight), 'kg', 'lbs')))
    : goalWeight

  return (
    <>
      <QuizHeader label={t.header_label} showBack={false} hideProgress={true} />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.headline}>{t.headline}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>

          <div className={styles.goalDisplay}>
            <div className={styles.goalWeightLine}>
              {t.goal_line(displayGoal, goalDate, weightUnit)}
            </div>
            <div className={styles.goalTagline}>{t.guide_text}</div>
          </div>

          <WeightChart startWeight={startWeight} goalWeight={goalWeight} goalDate={goalDate} unit={weightUnit} />
        </div>
      </main>
      <QuizFooter label={t.cta} onClick={() => router.push(`${base}/plan-loading`)} />
    </>
  )
}
