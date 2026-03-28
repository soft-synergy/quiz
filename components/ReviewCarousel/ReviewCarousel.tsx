'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './ReviewCarousel.module.css'

const REVIEWS = [
  {
    photo: 'https://i.pravatar.cc/96?img=47',
    name: 'Debora Lampron',
    text: 'Ok, so whoever made this a thing I thank you so much! This is making me fit and I think if I do it for the whole month or maybe even just this week I will definitely lose some pounds and burn some belly fat.',
    stars: 5,
  },
  {
    photo: 'https://i.pravatar.cc/96?img=44',
    name: 'Samantha Jenkins',
    text: "I've never really been a fitness person — too much time if you're not motivated. Downloaded this app for the routines. This may sound crazy but my back pain disappeared for the first time in a longer time.",
    stars: 4,
  },
  {
    photo: 'https://i.pravatar.cc/96?img=53',
    name: 'James Forrest',
    text: 'My doctor recommended low-impact exercise and this plan is perfect. The Tai Chi segments are calming and the indoor walking keeps my heart rate up just enough.',
    stars: 5,
  },
  {
    photo: 'https://i.pravatar.cc/96?img=32',
    name: 'Maria Santos',
    text: "Been using this for 3 weeks now and I'm already down 4 pounds! The variety keeps it interesting and I love that I can do it all from my living room regardless of the weather outside.",
    stars: 5,
  },
  {
    photo: 'https://i.pravatar.cc/96?img=56',
    name: 'Linda Kowalski',
    text: 'At 67 years old I thought I was too old to start a new fitness routine. This plan proved me completely wrong. I feel stronger and more flexible than I have in years.',
    stars: 5,
  },
]

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

export default function ReviewCarousel() {
  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const goTo = useCallback((idx: number) => {
    const next = ((idx % REVIEWS.length) + REVIEWS.length) % REVIEWS.length
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
  }, [])

  useEffect(() => {
    goTo(0)
    const handleResize = () => goTo(activeIdx)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goTo])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(i => {
        const next = (i + 1) % REVIEWS.length
        goTo(next)
        return next
      })
    }, 4000)
    return () => clearInterval(timer)
  }, [goTo])

  return (
    <div ref={outerRef} className={styles.outer} aria-label="Customer reviews">
      <div ref={trackRef} className={styles.track}>
        {REVIEWS.map((r, i) => (
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
                <span className={styles.tpText}>Trustpilot</span>
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
