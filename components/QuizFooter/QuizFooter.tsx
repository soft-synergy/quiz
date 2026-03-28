'use client'
import styles from './QuizFooter.module.css'
import { useLangStore } from '@/lib/lang-store'
import { useUITranslations } from '@/lib/i18n'

interface Props {
  disabled?: boolean
  onClick?: () => void
  label?: string
  onSkip?: () => void
  skipLabel?: string
}

export default function QuizFooter({
  disabled = false,
  onClick,
  label,
  onSkip,
  skipLabel,
}: Props) {
  const lang = useLangStore((s) => s.lang)
  const t = useUITranslations(lang)

  return (
    <footer className={styles.footer}>
      <button
        className={styles.btn}
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        {label ?? t.continue}
      </button>
      {onSkip && (
        <button className={styles.skipBtn} onClick={onSkip} type="button">
          {skipLabel ?? t.skip}
        </button>
      )}
    </footer>
  )
}
