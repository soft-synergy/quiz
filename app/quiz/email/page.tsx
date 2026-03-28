'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import QuizHeader from '@/components/QuizHeader/QuizHeader'
import QuizFooter from '@/components/QuizFooter/QuizFooter'
import { useQuizStore } from '@/lib/quiz-store'
import { useLangStore } from '@/lib/lang-store'
import { useEmailT } from '@/lib/i18n'

export default function EmailPage() {
  const router = useRouter()
  const setDirection = useQuizStore((s) => s.setDirection)
  const lang = useLangStore((s) => s.lang)
  const t = useEmailT(lang)
  const [email, setEmail] = useState('')

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleContinue = () => {
    setDirection('forward')
    router.push('/quiz/results-28')
  }

  const privacyNote = t.privacy_note.replace(
    '{link}',
    `<a href="/privacy-policy" class="${styles.privacyLink}">${t.privacy_link}</a>`
  )

  return (
    <>
      <QuizHeader label={t.header_label} showBack={false} hideProgress={true} />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.headline}>{t.headline}</h1>

          <p className={styles.inputLabel}>{t.email_label}</p>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <input
              className={styles.emailInput}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={t.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            {email && (
              <button className={styles.clearBtn} onClick={() => setEmail('')} type="button" aria-label={t.clear_aria}>
                ✕
              </button>
            )}
          </div>

          <div className={styles.privacyNote}>
            <span className={styles.shieldIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </span>
            <span dangerouslySetInnerHTML={{ __html: privacyNote }} />
          </div>
        </div>
      </main>
      <QuizFooter disabled={!isValid} onClick={handleContinue} />
    </>
  )
}
