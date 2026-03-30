'use client'
import { useState, useEffect } from 'react'
import styles from './page.module.css'
import QuizHeader from '@/components/QuizHeader/QuizHeader'
import BMIScale from '@/components/BMIScale/BMIScale'
import { useQuizStore } from '@/lib/quiz-store'
import { calcBMI, getBMICategory } from '@/lib/bmi-utils'

// ── Plans ────────────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: '28d',
    name: '28-day plan',
    discount: '83%',
    desc: 'Good for getting started',
    total: '€8.80',
    origTotal: '€51.67',
    perDay: '€0.31',
    badge: null,
  },
  {
    id: '12w',
    name: '12-week plan',
    discount: '75%',
    desc: 'Best for building a routine',
    total: '€18.08',
    origTotal: '€72.34',
    perDay: '€0.21',
    badge: 'Most popular',
  },
  {
    id: '24w',
    name: '24-week plan',
    discount: '70%',
    desc: 'Best for long-term results',
    total: '€27.17',
    origTotal: '€90.58',
    perDay: '€0.16',
    badge: 'Best value',
  },
] as const

const GOAL_LABELS: Record<string, string> = {
  'lose-weight':   'Lose weight',
  'heart-health':  'Improve heart health',
  'firm-toned':    'Get more toned',
  'lower-bio-age': 'Feel younger & energized',
}

function useCountdown(s: number) {
  const [sec, setSec] = useState(s)
  useEffect(() => {
    const t = setInterval(() => setSec((v) => Math.max(0, v - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  return { m: String(Math.floor(sec / 60)).padStart(2, '0'), s: String(sec % 60).padStart(2, '0') }
}

// ── Pricing block (appears twice on page) ────────────────────────────────────
function PricingBlock({
  selected,
  onSelect,
  consent,
  onConsent,
  onCta,
  selectedPlan,
}: {
  selected: string
  onSelect: (id: string) => void
  consent: boolean
  onConsent: () => void
  onCta: () => void
  selectedPlan: typeof PLANS[number]
}) {
  return (
    <div className={styles.pricingBlock}>
      {PLANS.map((plan) => (
        <div key={plan.id}>
          {plan.badge && (
            <div className={styles.planBadgeWrap}>
              <span className={styles.planBadge}>{plan.badge.toUpperCase()}</span>
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
                <span className={styles.planName}>{plan.name}</span>
                <span className={styles.planDiscount}>with {plan.discount} discount</span>
              </div>
              <p className={styles.planDesc}>{plan.desc}</p>
              <div className={styles.planPrices}>
                <span className={styles.planTotal}>{plan.total}</span>
                <span className={styles.planOrig}>{plan.origTotal}</span>
                <span className={styles.planPerDay}>≈ {plan.perDay} per day</span>
              </div>
            </div>
          </button>
        </div>
      ))}

      <div className={styles.moneyBackRow}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        <span><strong>30-day money-back guarantee</strong> — Try it with no risk. If it&apos;s not right for you, you can get your money back.</span>
      </div>

      <button className={styles.ctaBtn} type="button" onClick={onCta}>Get my Tai Chi Coach</button>

      <div
        className={styles.consentRow}
        onClick={onConsent}
        role="checkbox"
        aria-checked={consent}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onConsent() } }}
      >
        <div className={`${styles.consentCheck} ${consent ? styles.consentChecked : ''}`} aria-hidden="true">
          {consent && (
            <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
              <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className={styles.consentText}>
          By continuing, you agree to our{' '}
          <a href="/terms" onClick={(e) => e.stopPropagation()}>Terms of Use</a>,{' '}
          <a href="/privacy-policy" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>, and{' '}
          <a href="/refund" onClick={(e) => e.stopPropagation()}>Refund Policy</a>.
          {' '}This is a subscription that renews automatically. You will be charged {selectedPlan.total} today.
          After the plan period ends, your plan will renew at {selectedPlan.origTotal}, unless you cancel.
          You can cancel anytime at least 48 hours before renewal by contacting support email:{' '}
          <a href="mailto:hello@taichiwalkingcoach.app" onClick={(e) => e.stopPropagation()}>hello@taichiwalkingcoach.app</a>
        </span>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function PaywallPage() {
  const { answers, _hydrated } = useQuizStore()
  const [selected, setSelected] = useState<string>('12w')
  const [consent, setConsent] = useState(false)
  const cd = useCountdown(10 * 60)

  if (!_hydrated) return null

  const name        = typeof answers[27] === 'string' ? answers[27].trim() : ''
  const heightCm    = Number(answers[23]) || 165
  const weightLbs   = Number(answers[24]) || 180
  const goalLbs     = Number(answers[25]) || 150
  const sleepKey    = typeof answers[18] === 'string' ? answers[18] : '5-6'
  const activityKey = typeof answers[10] === 'string' ? answers[10] : 'intermediate'
  const rawGoals    = Array.isArray(answers[3]) ? (answers[3] as string[]) : answers[3] ? [answers[3] as string] : []

  const bmi    = calcBMI(weightLbs, heightCm)
  const bmiCat = getBMICategory(bmi)
  const goalKg = Math.round(goalLbs * 0.453592)
  const waterL = (weightLbs * 0.453592 * 0.033).toFixed(1)
  const waterCups = Math.min(9, Math.max(1, Math.round(Number(waterL) / 0.25)))

  const SLEEP_QUALITY_LABELS: Record<string, string> = {
    'less-than-5': 'Poor', '<5': 'Poor',
    '5-6': 'Needs improvement',
    '7-8': 'Good', '8-9': 'Good',
    '9+': 'Could be better',
  }
  const FITNESS_LEVEL_LABELS: Record<string, string> = {
    sedentary: 'Low', 'lightly-active': 'Low', light: 'Low',
    moderate: 'Medium', intermediate: 'Medium',
    active: 'High', 'very-active': 'High', advanced: 'High',
  }
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

  const bmiContent = {
    Normal: {
      title: 'Good starting point',
      text: `Your BMI is ${bmi.toFixed(1)}, which is in a normal range. You are on the right track. Your plan will be adjusted to fit your needs and help you keep your progress.`,
    },
    Underweight: {
      title: 'Good starting point',
      text: `Your BMI is ${bmi.toFixed(1)}, which is below the usual range. Your plan will focus on building strength and balanced nutrition.`,
    },
    Overweight: {
      title: 'A good point to make a change',
      text: `Your BMI is ${bmi.toFixed(1)}. With the right routine, you can improve how your body feels. We will guide you step by step with a plan that fits your daily life.`,
    },
    Obese: {
      title: 'A good time to take care of your body',
      text: `Your BMI is ${bmi.toFixed(1)}. With the right plan, you can improve how your body feels and moves. We will guide you with small, simple steps that fit your daily life.`,
    },
  }[bmiCat]

  const selectedPlan = PLANS.find((p) => p.id === selected) ?? PLANS[1]
  const handleCta = () => { /* payment integration */ }
  const toggleConsent = () => setConsent((v) => !v)

  return (
    <>
      <QuizHeader showBack={false} hideProgress />
      <main className={styles.main}>
        <div className={styles.content}>

          {/* ── CHOOSE YOUR PLAN HEADER ── */}
          <h1 className={styles.pageTitle}>Choose your plan with TAICHI COACH</h1>
          <p className={styles.pageSub}>Simple, guided, and made for real life.</p>

          {/* ── PRICING BLOCK #1 ── */}
          <PricingBlock
            selected={selected}
            onSelect={setSelected}
            consent={consent}
            onConsent={toggleConsent}
            onCta={handleCta}
            selectedPlan={selectedPlan}
          />

          {/* ── YOUR RESULTS ── */}
          <div className={styles.block}>
            <h2 className={styles.heading}>Your results</h2>

            <BMIScale bmi={bmi} />

            <div className={`${styles.bmiCard} ${styles[`bmiCard${bmiCat}`]}`}>
              <div className={styles.bmiCardText}>
                <p className={styles.bmiCardTitle}>{bmiContent.title}</p>
                <p className={styles.bmiCardBody}>{bmiContent.text}</p>
              </div>
              <img
                src="/images/Quiz - 2026-03-19T133642.519.png"
                alt=""
                aria-hidden="true"
                className={styles.bmiCardImg}
              />
            </div>

            {/* ── 4 STAT CARDS ── */}
            <div className={styles.resultStatsList}>
              {[
                {
                  icon: '🎯',
                  label: 'PRIMARY GOAL',
                  value: rawGoals.length > 0
                    ? (GOAL_LABELS[rawGoals[0]] ?? rawGoals[0])
                    : 'Lose weight',
                },
                {
                  icon: '💪',
                  label: 'FITNESS LEVEL',
                  value: FITNESS_LEVEL_LABELS[activityKey] ?? 'Medium',
                },
                {
                  icon: '😴',
                  label: 'SLEEP QUALITY',
                  value: SLEEP_QUALITY_LABELS[sleepKey] ?? 'Needs improvement',
                },
                {
                  icon: '🧑',
                  label: 'FITNESS AGE',
                  value: `${fitnessAgeYears} years older than your actual age`,
                },
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

          {/* ── 7 MINUTES ── */}
          <div className={styles.statInfoCard}>
            <div className={styles.statInfoCardHeader}>
              <div className={styles.statInfoIcon}>🕐</div>
              <p className={styles.statInfoTitle}>Personalized Tai Chi Indoor Walking plan</p>
            </div>
            <div className={styles.statInfoCardFooter}>
              <span className={styles.statInfoNum}>7 <span className={styles.statInfoUnit}>min</span></span>
              <span className={styles.statInfoBadge}>RECOMMENDED WORKOUT DURATION</span>
            </div>
          </div>

          {/* ── WATER INTAKE ── */}
          <div className={styles.statInfoCard}>
            <div className={styles.statInfoCardHeader}>
              <div className={styles.statInfoIcon}>💧</div>
              <p className={styles.statInfoTitle}>Water Intake</p>
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
              <span className={styles.statInfoBadge}>RECOMMENDED DAILY WATER INTAKE</span>
            </div>
          </div>

          {/* ── PLAN READY ── */}
          <div className={styles.block}>
            <h2 className={styles.heading}>Your plan with TAICHI COACH is ready!</h2>
            <div className={styles.bulletCard}>
              <p className={styles.bulletTitle}>With TAICHI COACH, you can:</p>
              <ul className={styles.bulletList}>
                <li>Build confidence</li>
                <li>Boost your energy</li>
                <li>Relax and reduce stress</li>
                <li>Support your body over time</li>
              </ul>
            </div>
          </div>

          {/* ── WHAT YOU GET ── */}
          <div className={styles.block}>
            <h2 className={styles.heading}>What you get with TAICHI COACH</h2>

            {[
              {
                img: '/images/A personalized movement system.png',
                title: 'A personalized movement system',
                desc: 'Your plan is built around your body, your energy, and your daily life — not a generic routine.',
              },
              {
                img: '/images/Simple daily direction.png',
                title: 'Simple daily direction',
                desc: 'You always know what to do today, without thinking or planning.',
              },
              {
                img: '/images/Adaptive guidance that follows you.png',
                title: 'Adaptive guidance that follows you',
                desc: 'Your plan adjusts as you go — based on your progress, your energy, and your consistency.',
              },
              {
                img: '/images/Support when you need it most.png',
                title: 'Support when you need it most',
                desc: 'If you feel stuck, tired, or miss a day — your plan helps you get back on track.',
              },
            ].map((f) => (
              <div key={f.title} className={styles.featureRow}>
                <img src={f.img} alt="" aria-hidden="true" className={styles.featureImg} />
                <div>
                  <p className={styles.featureTitle}>{f.title}</p>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── SOCIAL PROOF CTA ── */}
          <div className={styles.socialBlock}>
            <p className={styles.socialText}>Millions of people have already tried simple daily movement routines</p>
            <p className={styles.socialSub}>And many have seen real progress over time.</p>
            <button className={styles.ctaBtn} type="button" onClick={handleCta}>Get started now</button>
          </div>

          {/* ── TESTIMONIALS ── */}
          <div className={styles.block}>
            <h2 className={styles.heading}>Real stories from people using TAICHI COACH</h2>

            {[
              {
                img: '/images/stories1.png',
                name: 'Anna K., 47',
                text: 'I wasn\'t sure this would work for me. I thought I would try it for a short time… but I kept going. After a few weeks, I felt lighter and more active. In 2 months, I lost 6 kg and feel much better in my body.',
                highlight: '6 kg',
              },
              {
                img: '/images/stories2.png',
                name: 'Sophie R., 42',
                text: 'I needed something simple I could do at home. The plan was easy, and I didn\'t feel overwhelmed. After some time, my back pain improved, and daily tasks became easier. I feel stronger and more in control now.',
                highlight: null,
              },
              {
                img: '/images/stories3.png',
                name: 'Carla M., 48',
                text: 'I always struggled with my stomach area. The routine was simple, so I stayed consistent. After a few weeks, I started to see changes and feel more comfortable in my body. Now I feel much more confident.',
                highlight: null,
              },
            ].map((r) => (
              <div key={r.name} className={styles.reviewCard}>
                <div className={styles.reviewTop}>
                  <div className={styles.reviewer}>
                    <div className={styles.reviewAvatar}>
                      <img src={r.img} alt={r.name} />
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

          {/* ── PERSONALIZED CTA HEADING ── */}
          <div className={styles.personalHeading}>
            <h2 className={styles.pageTitleAlt}>
              {name ? `${name}, build` : 'Build'} real results at your own pace
            </h2>
          </div>

          {/* ── PRICING BLOCK #2 ── */}
          <PricingBlock
            selected={selected}
            onSelect={setSelected}
            consent={consent}
            onConsent={toggleConsent}
            onCta={handleCta}
            selectedPlan={selectedPlan}
          />

          {/* ── 28-DAY GUARANTEE ── */}
          <div className={styles.guaranteeBlock}>
            <img src="/images/quarantee.png" alt="" aria-hidden="true" className={styles.guaranteeImg} />
            <h2 className={styles.guaranteeTitle}>28-Day Money-Back Guarantee</h2>
            <p className={styles.guaranteeBody}>
              Try TAICHI COACH with no risk. If it&apos;s not the right fit for you, you can request a refund within 28 days. Please check our Refund Policy for full details.
            </p>
            <div className={styles.guaranteeLinks}>
              <a href="/terms">Terms of Use</a>
              <span>|</span>
              <a href="/privacy-policy">Privacy Policy</a>
              <span>|</span>
              <a href="/refund">Refund Policy</a>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <footer className={styles.footer}>
            <p className={styles.footerCopy}>© 2026 TAICHI COACH. All rights reserved.</p>
          </footer>

        </div>
      </main>
    </>
  )
}
