'use client'
import styles from './QuizFooter.module.css'
import { useLangStore } from '@/lib/lang-store'
import { useUITranslations } from '@/lib/i18n'
import { useTranslationOverrides, applyFlatSection } from '@/lib/use-translation-overrides'

interface Props {
  disabled?: boolean
  onClick?: () => void
  label?: string
  onSkip?: () => void
  skipLabel?: string
  sticky?: boolean
}

export default function QuizFooter({
  disabled = false,
  onClick,
  label,
  onSkip,
  skipLabel,
  sticky = true,
}: Props) {
  const lang = useLangStore((s) => s.lang)
  const ov = useTranslationOverrides(lang)
  const t = applyFlatSection(useUITranslations(lang), ov, 'ui.')

  return (
    <footer className={sticky ? styles.footer : styles.footerInline}>
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
