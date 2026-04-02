'use client'
import styles from './QuizHeader.module.css'
import { useRouter } from 'next/navigation'
import { useQuizStore } from '@/lib/quiz-store'
import { useLangStore } from '@/lib/lang-store'
import { useUITranslations } from '@/lib/i18n'
import { useTranslationOverrides, applyFlatSection } from '@/lib/use-translation-overrides'

interface Props {
  step?: number
  totalSteps?: number
  label?: string
  showBack?: boolean
  progress?: number
  hideProgress?: boolean
  overlay?: boolean
  onBack?: () => void
}

export default function QuizHeader({
  step,
  totalSteps,
  label,
  showBack = true,
  progress,
  hideProgress = false,
  overlay = false,
  onBack,
}: Props) {
  const router = useRouter()
  const setDirection = useQuizStore((s) => s.setDirection)
  const lang = useLangStore((s) => s.lang)
  const ov = useTranslationOverrides(lang)
  const t = applyFlatSection(useUITranslations(lang), ov, 'ui.')

  const pct =
    progress !== undefined
      ? progress
      : step && totalSteps
      ? (step / totalSteps) * 100
      : 100

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }
    setDirection('backward')
    router.back()
  }

  return (
    <header className={overlay ? styles.headerOverlay : styles.header}>
      <div className={styles.headerTop}>
        {showBack ? (
          <button
            className={styles.btnBack}
            onClick={handleBack}
            aria-label={t.go_back}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <div className={styles.headerSpacer} />
        )}
        <span className={styles.stepCounter} aria-live="polite">
          {hideProgress ? '' : (label ?? (step && totalSteps ? `${step} / ${totalSteps}` : ''))}
        </span>
        <div className={styles.headerSpacer} />
      </div>
      {!hideProgress && (
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t.quiz_progress}
        >
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
      )}
    </header>
  )
}
