'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import styles from './page.module.css'
import QuizHeader from '@/components/QuizHeader/QuizHeader'
import BMIScale from '@/components/BMIScale/BMIScale'
import { useQuizStore } from '@/lib/quiz-store'
import { calcBMI, getBMICategory } from '@/lib/bmi-utils'
import { useLangStore, type LangCode } from '@/lib/lang-store'
import { localizeBrandValue } from '@/lib/brand'
import { LANGUAGES } from '@/lib/i18n'
import { COPY, EN, type Copy } from '@/lib/paywall-copy'
import { PAYWALL_STORIES } from '@/lib/paywall-stories-data'
import { useTranslationOverrides, applyPaywallOverrides } from '@/lib/use-translation-overrides'

const VALID_LANGS = new Set<string>(LANGUAGES.map((l) => l.code))

const PLANS = [
  { id: '28d', discount: '83%', total: '€8.80', origTotal: '€51.67', perDay: '€0.31' },
  { id: '12w', discount: '75%', total: '€18.08', origTotal: '€72.34', perDay: '€0.21' },
  { id: '24w', discount: '70%', total: '€27.17', origTotal: '€90.58', perDay: '€0.16' },
] as const

function PricingBlock({ copy, selected, onSelect, consent, onConsent, selectedPlan, lang, checkoutSlug = 'checkout' }: { copy: Copy; selected: string; onSelect: (id: string) => void; consent: boolean; onConsent: () => void; selectedPlan: (typeof PLANS)[number]; lang: LangCode; checkoutSlug?: string }) {
  const checkoutUrl = `https://www.taichiwalkingcoach.com/${lang}-tcwalk-${checkoutSlug}-${selected}`
  const [showError, setShowError] = useState(false)

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!consent) {
      e.preventDefault()
      setShowError(true)
      setTimeout(() => setShowError(false), 600)
    }
  }

  return (
    <div className={styles.pricingBlock}>
      {PLANS.map((plan, idx) => {
        const localized = copy.plans[idx]
        return (
          <div key={plan.id}>
            {localized.badge && (
              <div className={styles.planBadgeWrap}>
                <span className={styles.planBadge}>{localized.badge.toUpperCase()}</span>
              </div>
            )}
            <button
              type="button"
              className={`${styles.planCard} ${selected === plan.id ? styles.planCardSelected : ''}`}
              onClick={() => onSelect(plan.id)}
              aria-pressed={selected === plan.id}
            >
              <div className={styles.planRadio}>
                {selected === plan.id && (
                  <svg viewBox="0 0 10 10" width="8" height="8"><circle cx="5" cy="5" r="3" fill="white" /></svg>
                )}
              </div>
              <div className={styles.planInfo}>
                <div className={styles.planNameRow}>
                  <span className={styles.planName}>{localized.name}</span>
                  <span className={styles.planDiscount}>{copy.discount(plan.discount)}</span>
                </div>
                <p className={styles.planDesc}>{localized.desc}</p>
                <div className={styles.planPrices}>
                  <span className={styles.planTotal}>{plan.total}</span>
                  <span className={styles.planOrig}>{plan.origTotal}</span>
                  <span className={styles.planPerDay}>{copy.perDay(plan.perDay)}</span>
                </div>
              </div>
            </button>
          </div>
        )
      })}

      <div className={styles.moneyBackRow}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        <span><strong>{copy.moneyBackRow}</strong></span>
      </div>

      <a
        className={styles.ctaBtn}
        href={checkoutUrl}
        onClick={handleCtaClick}
        aria-disabled={!consent}
      >{copy.cta}</a>

      <div
        className={`${styles.consentRow} ${showError ? styles.consentRowError : ''}`}
        onClick={() => { onConsent(); setShowError(false) }}
        role="checkbox"
        aria-checked={consent}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onConsent(); setShowError(false) } }}
      >
        <div className={`${styles.consentCheck} ${consent ? styles.consentChecked : ''} ${showError ? styles.consentCheckError : ''}`} aria-hidden="true">
          {consent && (
            <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
              <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className={styles.consentText}>
          {copy.consentPrefix}{' '}
          <a href="https://www.taichiwalkingcoach.com/en-tcwalk-terms-of-services" onClick={(e) => e.stopPropagation()}>{copy.terms}</a>,{' '}
          <a href="https://www.taichiwalkingcoach.com/en-tcwalk-privacy-policy" onClick={(e) => e.stopPropagation()}>{copy.privacy}</a>, {copy.consentAnd}{' '}
          <a href="https://www.taichiwalkingcoach.com/en-tcwalk-money-back-guarantee" onClick={(e) => e.stopPropagation()}>{copy.refund}</a>.{' '}
          {copy.consentBody(selectedPlan.total, selectedPlan.origTotal)}{' '}
          <a href="mailto:hello@taichiwalkingcoach.app" onClick={(e) => e.stopPropagation()}>hello@taichiwalkingcoach.app</a>
        </span>
      </div>
      {showError && <p className={styles.consentErrorMsg}>{copy.consentError}</p>}
    </div>
  )
}

export function PaywallContent({ checkoutSlug = 'checkout' }: { checkoutSlug?: string }) {
  const { answers, _hydrated } = useQuizStore()
  const { lang: storeLang, setLang } = useLangStore()
  const params = useParams()

  // Sync lang from URL param (e.g. /lt/quiz/paywall) → store
  useEffect(() => {
    const urlLang = params?.lang as string | undefined
    if (urlLang && VALID_LANGS.has(urlLang) && urlLang !== storeLang) {
      setLang(urlLang as LangCode)
    }
  }, [params?.lang, storeLang, setLang])

  const lang = (() => {
    const urlLang = params?.lang as string | undefined
    return (urlLang && VALID_LANGS.has(urlLang) ? urlLang : storeLang) as LangCode
  })()

  const overrides = useTranslationOverrides(lang)
  const copy = applyPaywallOverrides(localizeBrandValue(COPY[lang] ?? EN, lang), overrides)

  const stories = PAYWALL_STORIES[lang] ?? PAYWALL_STORIES.en
  const [selected, setSelected] = useState<string>('12w')
  const [consent, setConsent] = useState(false)

  if (!_hydrated) return null

  const name = typeof answers[27] === 'string' ? answers[27].trim() : ''
  const heightCm = Number(answers[23]) || 165
  const weightLbs = Number(answers[24]) || 180
  const sleepKey = typeof answers[18] === 'string' ? answers[18] : '5-6'
  const activityKey = typeof answers[10] === 'string' ? answers[10] : 'intermediate'
  const rawGoals = Array.isArray(answers[3]) ? (answers[3] as string[]) : answers[3] ? [answers[3] as string] : []

  const bmi = calcBMI(weightLbs, heightCm)
  const bmiCat = getBMICategory(bmi)
  const waterL = (weightLbs * 0.453592 * 0.033).toFixed(1)
  const waterCups = Math.min(9, Math.max(1, Math.round(Number(waterL) / 0.25)))

  const fitnessAgeYears = (() => {
    let y = 0
    if (bmiCat === 'Obese') y += 8
    else if (bmiCat === 'Overweight') y += 4
    else if (bmiCat === 'Underweight') y += 2
    if (['sedentary', 'lightly-active', 'light'].includes(activityKey)) y += 4
    else if (['moderate', 'intermediate'].includes(activityKey)) y += 1
    if (['less-than-5', '<5', '5-6'].includes(sleepKey)) y += 2
    return Math.max(2, y)
  })()

  const selectedPlan = PLANS.find((p) => p.id === selected) ?? PLANS[1]
  const primaryGoal = rawGoals.length > 0 ? (copy.goalLabels[rawGoals[0]] ?? rawGoals[0]) : copy.goalLabels['lose-weight']
  const fitnessLevel = copy.fitnessLabels[activityKey] ?? copy.fitnessLabels.intermediate
  const sleepQuality = copy.sleepLabels[sleepKey] ?? copy.sleepLabels['5-6']
  const bmiContent = copy.bmi[bmiCat]

  return (
    <>
      <QuizHeader showBack={false} hideProgress />
      <main className={styles.main}>
        <div className={styles.content}>

          <h1 className={styles.pageTitle}>{copy.pageTitle}</h1>
          <p className={styles.pageSub}>{copy.pageSub}</p>

          <PricingBlock
            copy={copy}
            selected={selected}
            onSelect={setSelected}
            consent={consent}
            onConsent={() => setConsent((v) => !v)}
            selectedPlan={selectedPlan}
            lang={lang}
            checkoutSlug={checkoutSlug}
          />

          <div className={styles.block}>
            <h2 className={styles.heading}>{copy.yourResults}</h2>

            <BMIScale bmi={bmi} />

            <div className={`${styles.bmiCard} ${styles[`bmiCard${bmiCat}`]}`}>
              <div className={styles.bmiCardText}>
                <p className={styles.bmiCardTitle}>{bmiContent.title}</p>
                <p className={styles.bmiCardBody}>{bmiContent.text(bmi.toFixed(1))}</p>
              </div>
              <img
                src="/images/Quiz - 2026-03-19T133642.519.png"
                alt=""
                aria-hidden="true"
                className={styles.bmiCardImg}
              />
            </div>

            <div className={styles.resultStatsList}>
              {[
                { icon: '🎯', label: copy.primaryGoal, value: primaryGoal },
                { icon: '💪', label: copy.fitnessLevel, value: fitnessLevel },
                { icon: '😴', label: copy.sleepQuality, value: sleepQuality },
                { icon: '🧑', label: copy.fitnessAge, value: copy.fitnessAgeValue(fitnessAgeYears) },
              ].map((s) => (
                <div key={s.label} className={styles.resultStatCard}>
                  <div className={styles.resultStatIcon}>{s.icon}</div>
                  <div>
                    <p className={styles.resultStatLabel}>{s.label}</p>
                    <p className={styles.resultStatValue}>{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.statInfoCard}>
            <div className={styles.statInfoCardHeader}>
              <div className={styles.statInfoIcon}>🕐</div>
              <p className={styles.statInfoTitle}>{copy.workoutTitle}</p>
            </div>
            <div className={styles.statInfoCardFooter}>
              <span className={styles.statInfoNum}>7 <span className={styles.statInfoUnit}>min</span></span>
              <span className={styles.statInfoBadge}>{copy.workoutBadge}</span>
            </div>
          </div>

          <div className={styles.statInfoCard}>
            <div className={styles.statInfoCardHeader}>
              <div className={styles.statInfoIcon}>💧</div>
              <p className={styles.statInfoTitle}>{copy.waterTitle}</p>
            </div>
            <div className={styles.waterGlasses} aria-hidden="true">
              {Array.from({ length: waterCups }, (_, i) => (
                <svg key={i} className={styles.waterGlass} viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4 L4 36 Q4 38 6 38 L26 38 Q28 38 28 36 L26 4 Z" fill="#c8dff0" stroke="#8ab4d4" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M6 4 L26 4" stroke="#8ab4d4" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M5 18 Q8 15 16 17 Q24 19 27 16" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                </svg>
              ))}
            </div>
            <div className={styles.statInfoCardFooter}>
              <span className={styles.statInfoNum}>{waterL}</span>
              <span className={styles.statInfoBadge}>{copy.waterBadge}</span>
            </div>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>{copy.readyHeading}</h2>
            <div className={styles.bulletCard}>
              <p className={styles.bulletTitle}>{copy.bulletTitle}</p>
              <ul className={styles.bulletList}>
                {copy.bullets.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>{copy.whatYouGet}</h2>

            {copy.features.map((f, i) => (
              <div key={f.title} className={styles.featureRow}>
                <img src={['/images/A personalized movement system.png', '/images/Simple daily direction.png', '/images/Adaptive guidance that follows you.png', '/images/Support when you need it most.png'][i]} alt="" aria-hidden="true" className={styles.featureImg} />
                <div>
                  <p className={styles.featureTitle}>{f.title}</p>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.socialBlock}>
            <p className={styles.socialText}>{copy.socialText}</p>
            <p className={styles.socialSub}>{copy.socialSub}</p>
            <button className={styles.ctaBtn} type="button">{copy.socialCta}</button>
          </div>

          <div className={styles.block}>
            <h2 className={styles.heading}>{copy.storiesHeading}</h2>

            {stories.map((r, i) => (
              <div key={i} className={styles.reviewCard}>
                <div className={styles.reviewTop}>
                  <div className={styles.reviewer}>
                    <div className={styles.reviewAvatar}>
                      <img src={['/images/stories1.png', '/images/stories2.png', '/images/stories3.png'][i]} alt={r.name} />
                    </div>
                    <div>
                      <p className={styles.reviewName}>{r.name}</p>
                      <span className={styles.reviewStars}>⭐⭐⭐⭐⭐</span>
                    </div>
                  </div>
                </div>
                <p className={styles.reviewText}>
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>
            ))}
          </div>

          <div className={styles.personalHeading}>
            <h2 className={styles.pageTitleAlt}>{copy.personalHeading(name)}</h2>
          </div>

          <PricingBlock
            copy={copy}
            selected={selected}
            onSelect={setSelected}
            consent={consent}
            onConsent={() => setConsent((v) => !v)}
            selectedPlan={selectedPlan}
            lang={lang}
            checkoutSlug={checkoutSlug}
          />

          <div className={styles.guaranteeBlock}>
            <img src="/images/quarantee.png" alt="" aria-hidden="true" className={styles.guaranteeImg} />
            <h2 className={styles.guaranteeTitle}>{copy.guaranteeTitle}</h2>
            <p className={styles.guaranteeBody}>{copy.guaranteeBody}</p>
            <div className={styles.guaranteeLinks}>
              <a href="https://www.taichiwalkingcoach.com/en-tcwalk-terms-of-services">{copy.terms}</a>
              <span>|</span>
              <a href="https://www.taichiwalkingcoach.com/en-tcwalk-privacy-policy">{copy.privacy}</a>
              <span>|</span>
              <a href="https://www.taichiwalkingcoach.com/en-tcwalk-money-back-guarantee">{copy.refund}</a>
            </div>
          </div>

          <footer className={styles.footer}>
            <p className={styles.footerCopy}>{copy.footer}</p>
          </footer>

        </div>
      </main>
    </>
  )
}
