'use client'
import { useState, useRef, useEffect } from 'react'
import styles from './LangPicker.module.css'
import { useLangStore, type LangCode } from '@/lib/lang-store'
import { LANGUAGES } from '@/lib/i18n'

interface Props {
  ariaLabel?: string
  /** Override the displayed/active lang (e.g. from URL param). Falls back to store. */
  currentLang?: LangCode
  /** Called when user picks a language. If not provided, updates store directly. */
  onChangeLang?: (lang: LangCode) => void
}

export default function LangPicker({ ariaLabel, currentLang, onChangeLang }: Props) {
  const { lang: storeLang, setLang } = useLangStore()
  const activeLang = currentLang ?? storeLang

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LANGUAGES.find((l) => l.code === activeLang) ?? LANGUAGES[0]

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  const handleSelect = (code: LangCode) => {
    setOpen(false)
    if (onChangeLang) {
      onChangeLang(code)
    } else {
      setLang(code)
    }
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel ?? `Language: ${current.label}`}
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 1C8 1 5.5 4 5.5 8s2.5 7 2.5 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M8 1c0 0 2.5 3 2.5 7S8 15 8 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M1.3 8h13.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span className={styles.triggerLabel}>
          <span className={styles.flag}>{current.flag}</span>
          {current.code.toUpperCase()}
        </span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          className={styles.dropdown}
          role="listbox"
          aria-label="Select language"
        >
          {LANGUAGES.map((l) => (
            <li
              key={l.code}
              role="option"
              aria-selected={l.code === activeLang}
              className={`${styles.option} ${l.code === activeLang ? styles.optionActive : ''}`}
              onClick={() => handleSelect(l.code)}
            >
              <span className={styles.flag}>{l.flag}</span>
              <span className={styles.optionLabel}>{l.label}</span>
              {l.code === activeLang && (
                <svg className={styles.check} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
