'use client'
import styles from './page.module.css'
import { useRouter, useParams, notFound } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useQuizStore } from '@/lib/quiz-store'
import { useLangStore, type LangCode } from '@/lib/lang-store'
import { useIntroT, LANGUAGES } from '@/lib/i18n'
import { useTranslationOverrides, applyFlatSection } from '@/lib/use-translation-overrides'
import Image from 'next/image'
import LangPicker from '@/components/LangPicker/LangPicker'

const VALID_LANGS = new Set<string>(LANGUAGES.map((l) => l.code))

export default function IntroLangPage() {
  const router = useRouter()
  const params = useParams()
  const langParam = params.lang as string

  // validate lang param
  if (!VALID_LANGS.has(langParam)) notFound()

  const lang = langParam as LangCode
  const { setLang } = useLangStore()
  const { setAge, setDirection, reset } = useQuizStore()
  const _ov = useTranslationOverrides(lang)
  const t = applyFlatSection(useIntroT(lang), _ov, 'intro.')
  const [consentChecked, setConsentChecked] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [personImgLoaded, setPersonImgLoaded] = useState(false)
  const errorRef = useRef<HTMLDivElement>(null)

  // sync URL lang → store
  useEffect(() => {
    setLang(lang)
  }, [lang, setLang])

  const AGE_OPTIONS = [
    { id: '18-29', label: t.age_18_29 },
    { id: '30-39', label: t.age_30_39 },
    { id: '40-49', label: t.age_40_49 },
    { id: '50+',   label: t.age_50_plus },
  ]

  const handleAge = (age: string) => {
    if (!consentChecked) {
      setConsentError(true)
      setTimeout(() => {
        errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 50)
      return
    }
    reset()
    setAge(age)
    setDirection('forward')
    router.push(`/${lang}/quiz/1`)
  }

  const handleLangChange = (newLang: LangCode) => {
    router.push(`/${newLang}`)
  }

  return (
    <div className={styles.page}>
      <div className={styles.badge} aria-label={t.badge_quiz}>
        <span className={styles.badgeStar} aria-hidden="true">★</span>
        <span className={styles.badgeText}>{t.badge_quiz}</span>
        <span className={styles.badgeDivider} aria-hidden="true" />
        <span className={styles.badgeTag}>{t.badge_tag}</span>
      </div>

      <h1 className={styles.headline}>{t.headline}</h1>

      {/* Center content vertically using flex align-items: center on styles.content */}
      <div className={styles.content} style={{ display: 'flex', alignItems: 'center' }}>
        <div className={styles.personCol}>
          {!personImgLoaded && <div className={styles.personSkeleton} />}
          <Image
            src="/images/person-intro.png"
            alt={t.img_alt}
            width={400}
            height={620}
            priority
            className={personImgLoaded ? styles.personImgLoaded : styles.personImgHidden}
            onLoad={() => setPersonImgLoaded(true)}
            onError={() => setPersonImgLoaded(true)}
          />
        </div>

        {/* Center Age Picker vertically in its column using flex */}
        <nav className={styles.ageCol} aria-label={t.age_group_label} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <p className={styles.ageQuestion}>{t.age_question}</p>
          {AGE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              className={styles.ageBtn}
              onClick={() => handleAge(opt.id)}
              data-age={opt.id}
            >
              <span className={styles.ageBtnLabel}>{opt.label}</span>
              <span className={styles.ageBtnArrow} aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          ))}
        </nav>
      </div>

      <footer className={styles.footer}>
        <LangPicker
          currentLang={lang}
          ariaLabel={t.lang_button_aria}
          onChangeLang={handleLangChange}
        />

        <div className={styles.consentRow} onClick={() => { setConsentChecked((v) => !v); setConsentError(false) }} role="checkbox" aria-checked={consentChecked} tabIndex={0} onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setConsentChecked((v) => !v); setConsentError(false) } }}>
          <div className={`${styles.consentCheck} ${consentChecked ? styles.consentChecked : ''}`} aria-hidden="true">
            {consentChecked && (
              <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
                <path
                  d="M2.5 7L5.5 10L11.5 4"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <p className={styles.consentText}>
            {t.consent_prefix}{' '}
            <a href="https://www.taichiwalkingcoach.com/en-tcwalk-terms-of-services">{t.consent_tos}</a>{t.consent_comma}{' '}
            <a href="https://www.taichiwalkingcoach.com/en-tcwalk-cookie-policy">{t.consent_cookie}</a>{t.consent_comma}{' '}
            {t.consent_and}{' '}
            <a href="https://www.taichiwalkingcoach.com/en-tcwalk-privacy-policy">{t.consent_privacy}</a>.
          </p>
        </div>
        {consentError && (
          <div ref={errorRef} className={styles.consentError} role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {t.consent_error}
          </div>
        )}
      </footer>
    </div>
  )
}
