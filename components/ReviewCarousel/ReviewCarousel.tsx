'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './ReviewCarousel.module.css'
import { useLangStore, type LangCode } from '@/lib/lang-store'
import { useParams } from 'next/navigation'
import { LANGUAGES } from '@/lib/i18n'
import { REVIEWS } from '@/lib/reviews-data'

const VALID_LANGS = new Set<string>(LANGUAGES.map((l) => l.code))

const GAP = 12

function Avatar({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={styles.avatarWrap}>
      {!loaded && <div className={styles.avatarSkeleton} />}
      <img
        src={src}
        alt={alt}
        className={`${styles.avatar} ${loaded ? styles.avatarLoaded : ''}`}
        width={44}
        height={44}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  )
}

export default function ReviewCarousel({ reviews: reviewsProp }: { reviews?: import('@/lib/reviews-data').Review[] } = {}) {
  const { lang: storeLang, setLang } = useLangStore()
  const params = useParams()

  // Sync URL lang param → store (e.g. when linked directly to /lt/quiz/loading-screen)
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

  const reviews = reviewsProp ?? REVIEWS[lang] ?? REVIEWS.en
  const reviewsLabel = lang === 'jp' ? 'お客様のレビュー' : lang === 'ru' ? 'Отзывы пользователей' : lang === 'tw' ? '用戶評價' : lang === 'il' ? 'ביקורות משתמשים' : lang === 'lt' ? 'Klientų atsiliepimai' : 'Customer reviews'
  const trustpilotLabel = lang === 'jp' ? 'Trustpilot' : lang === 'ru' ? 'Trustpilot' : lang === 'tw' ? 'Trustpilot' : lang === 'il' ? 'Trustpilot' : lang === 'lt' ? 'Trustpilot' : 'Trustpilot'
  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const goTo = useCallback((idx: number) => {
    const next = ((idx % reviews.length) + reviews.length) % reviews.length
    setActiveIdx(next)

    if (!trackRef.current || !outerRef.current) return

    const containerW = outerRef.current.offsetWidth
    const cardW = Math.round(containerW - 72)
    outerRef.current.style.setProperty('--card-w', `${cardW}px`)

    const cards = trackRef.current.querySelectorAll<HTMLElement>('[data-card]')
    if (!cards.length) return
    const centerOffset = (containerW - cardW) / 2
    const offset = centerOffset - next * (cardW + GAP)
    trackRef.current.style.transform = `translateX(${offset}px)`
  }, [reviews.length])

  useEffect(() => {
    setActiveIdx(0)
    goTo(0)
    const handleResize = () => goTo(activeIdx)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goTo, lang])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(i => {
        const next = (i + 1) % reviews.length
        goTo(next)
        return next
      })
    }, 4000)
    return () => clearInterval(timer)
  }, [goTo, reviews.length])

  return (
    <div ref={outerRef} className={styles.outer} aria-label={reviewsLabel}>
      <div ref={trackRef} className={styles.track}>
        {reviews.map((r, i) => (
          <div
            key={i}
            data-card={i}
            className={`${styles.card} ${i === activeIdx ? styles.cardActive : ''}`}
          >
            <div className={styles.cardHeader}>
              <div className={styles.reviewerInfo}>
                <Avatar src={r.photo} alt={r.name} />
                <span className={styles.reviewerName}>{r.name}</span>
              </div>
              <div className={styles.trustpilot}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#00B67A">
                  <path d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.9L12 20l-6.4 4.6 2.8-8.9L1 10.9h8.1z" />
                </svg>
                <span className={styles.tpText}>{trustpilotLabel}</span>
              </div>
            </div>
            <div className={styles.stars}>
              {Array(5).fill(null).map((_, si) => (
                <span key={si} className={si < r.stars ? styles.starFilled : styles.starEmpty}>★</span>
              ))}
            </div>
            <p className={styles.reviewText}>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
