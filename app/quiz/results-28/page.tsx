'use client'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import QuizHeader from '@/components/QuizHeader/QuizHeader'
import QuizFooter from '@/components/QuizFooter/QuizFooter'
import { useQuizStore } from '@/lib/quiz-store'
import { useLangStore } from '@/lib/lang-store'
import { useResults28T } from '@/lib/i18n'

function WeightCurve({ t }: { t: ReturnType<typeof useResults28T> }) {
  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartLabel}>{t.your_weight}</div>
      <div className={styles.chartInner}>
        <svg
          viewBox="0 0 320 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.chartSvg}
          aria-hidden="true"
        >
          {[30, 60, 90, 120].map((y) => (
            <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#e5e5e5" strokeWidth="1" strokeDasharray="4 4" />
          ))}
          <defs>
            <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b53e5a" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#b53e5a" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E8C44A" />
              <stop offset="100%" stopColor="#b53e5a" />
            </linearGradient>
            <filter id="shadow" x="-10%" y="-20%" width="120%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.12" />
            </filter>
          </defs>

          <path
            className={styles.chartArea}
            d="M 20 20 C 80 20, 120 80, 170 110 C 220 135, 270 148, 300 148 L 300 160 L 20 160 Z"
            fill="url(#curveGrad)"
          />
          <path
            className={styles.chartLine}
            d="M 20 20 C 80 20, 120 80, 170 110 C 220 135, 270 148, 300 148"
            stroke="url(#lineGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <g className={styles.dotNow}>
            <circle cx="20" cy="20" r="6" fill="#E8C44A" />
          </g>
          <g className={styles.dotEnd}>
            <circle cx="300" cy="148" r="8" fill="#b53e5a" stroke="white" strokeWidth="2" />
            <circle cx="300" cy="148" r="3.5" fill="white" />
          </g>

          <g className={styles.lblNow}>
            <rect x="28" y="8" width="42" height="22" rx="4" fill="white" filter="url(#shadow)" />
            <text x="49" y="23" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1a1a1a">{t.now}</text>
          </g>
          <g className={styles.lblEnd}>
            <rect x="210" y="132" width="88" height="22" rx="4" fill="white" filter="url(#shadow)" />
            <text x="254" y="147" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b53e5a">{t.after_4_weeks}</text>
          </g>
        </svg>

        <div className={styles.weekLabels}>
          {[1, 2, 3, 4].map((n) => (
            <span key={n}>{t.week(n)}</span>
          ))}
        </div>
      </div>
      <p className={styles.chartNote}>{t.chart_note}</p>
    </div>
  )
}

export default function Results28Page() {
  const router = useRouter()
  const setDirection = useQuizStore((s) => s.setDirection)
  const lang = useLangStore((s) => s.lang)
  const t = useResults28T(lang)

  const handleContinue = () => {
    setDirection('forward')
    router.push('/quiz/paywall')
  }

  return (
    <>
      <QuizHeader label={t.header_label} showBack={false} hideProgress={true} />
      <main className={styles.main}>
        <div className={styles.content}>
          <WeightCurve t={t} />
          <h1 className={styles.headline}>{t.headline}</h1>
        </div>
      </main>
      <QuizFooter onClick={handleContinue} />
    </>
  )
}
