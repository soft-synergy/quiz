'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import styles from './page.module.css'
import QuizHeader from '@/components/QuizHeader/QuizHeader'
import QuizFooter from '@/components/QuizFooter/QuizFooter'
import BMIScale from '@/components/BMIScale/BMIScale'
import { useQuizStore } from '@/lib/quiz-store'
import { useLangStore } from '@/lib/lang-store'
import { useWellnessT } from '@/lib/i18n'
import { useTranslationOverrides, applyWellnessOverrides } from '@/lib/use-translation-overrides'
import { calcBMI, getBMICategory } from '@/lib/bmi-utils'

export default function WellnessPage() {
  const router = useRouter()
  const { answers, setDirection, _hydrated } = useQuizStore()
  const lang = useLangStore((s) => s.lang)
  const ov = useTranslationOverrides(lang)
  const t = applyWellnessOverrides(useWellnessT(lang), ov)

  useEffect(() => {
    router.prefetch('/quiz/28')
  }, [router])

  if (!_hydrated) return null

  const weightLbs = Number(answers[24]) || 200
  const heightCm = Number(answers[23]) || 165
  const bmi = calcBMI(weightLbs, heightCm)
  const bmiCategory = getBMICategory(bmi)

  const lifestyle = t.lifestyle[answers[17] as string] ?? t.lifestyle[answers[10] as string] ?? t.lifestyle['active']

  const habits = Array.isArray(answers[20]) ? (answers[20] as string[]) : []
  let eaterKey: keyof typeof t.eater = 'balanced'
  if (habits.includes('sugar') || habits.includes('soda')) eaterKey = 'sweet'
  if (habits.includes('salty')) eaterKey = 'salty'
  if (habits.includes('snacker')) eaterKey = 'emotional'
  if (habits.includes('none') || habits.length === 0) eaterKey = 'balanced'
  const eaterType = t.eater[eaterKey]

  const motivationKeyMap: Record<string, keyof typeof t.motivation> = {
    daily: 'high', weekly: 'moderate', monthly: 'low',
  }
  const motivation = t.motivation[motivationKeyMap[answers[12] as string] ?? 'moderate']

  const handleContinue = () => {
    setDirection('forward')
    router.push('/quiz/28')
  }

  return (
    <>
      <QuizHeader label={t.header_label} hideProgress={true} />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.headline}>{t.headline}</h1>

          <BMIScale bmi={bmi} />

          <div className={styles.profileMiddle}>
            <div className={styles.profileAttrs}>
              <div className={styles.attrItem}>
                <div className={styles.attrIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <path d="M17.65 6.35A7.958 7.958 0 0012 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8" />
                    <polyline points="13 9 17 9 17 5" />
                  </svg>
                </div>
                <div>
                  <div className={styles.attrCategory}>{t.lifestyle_label}</div>
                  <div className={styles.attrValue}>{lifestyle}</div>
                </div>
              </div>

              <div className={styles.attrItem}>
                <div className={styles.attrIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
                    <path d="M7 2v20" />
                    <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
                  </svg>
                </div>
                <div>
                  <div className={styles.attrCategory}>{t.eater_label}</div>
                  <div className={styles.attrValue}>{eaterType}</div>
                </div>
              </div>

              <div className={styles.attrItem}>
                <div className={styles.attrIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <path d="M8.5 14.5A2.5 2.5 0 0011 17c0 1.38-1.12 2.5-2.5 2.5S6 18.38 6 17c0-.92.5-1.72 1.24-2.16" />
                    <path d="M12 2C6.5 11 9 13 9 17c0 2.76 2.24 5 5 5s5-2.24 5-5c0-6-4.5-10-7-15z" />
                  </svg>
                </div>
                <div>
                  <div className={styles.attrCategory}>{t.motivation_label}</div>
                  <div className={styles.attrValue}>{motivation}</div>
                </div>
              </div>
            </div>

            <div className={styles.profilePerson} aria-hidden="true">
              <img
                src={
                  bmiCategory === 'Obese'       ? '/images/obese.png' :
                  bmiCategory === 'Overweight'  ? '/images/overweight.png' :
                                                  '/images/normal.png'
                }
                alt={t.img_alt}
                width={160}
                height={200}
              />
            </div>
          </div>

          {(bmiCategory === 'Normal' || bmiCategory === 'Overweight' || bmiCategory === 'Obese') && (
            <div className={styles.warningBanner} role="note">
              <div className={styles.warningDesc}>
                {bmiCategory === 'Normal'     && t.bmi_normal_msg}
                {bmiCategory === 'Overweight' && t.bmi_overweight_msg}
                {bmiCategory === 'Obese'      && t.bmi_obese_msg}
              </div>
            </div>
          )}
        </div>
      </main>
      <QuizFooter onClick={handleContinue} />
    </>
  )
}
