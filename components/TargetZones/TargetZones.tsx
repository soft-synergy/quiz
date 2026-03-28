'use client'
import { useRef, useEffect, useCallback, useState } from 'react'
import styles from './TargetZones.module.css'
import { QuizOption } from '@/lib/quiz-data'

interface Props {
  options: QuizOption[]
  selected: string[]
  onToggle: (id: string) => void
}

interface Connector {
  x1: number
  y1: number
  x2: number
  y2: number
}

export default function TargetZones({ options, selected, onToggle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const spotRefs = useRef<(HTMLDivElement | null)[]>([])
  const [connectors, setConnectors] = useState<(Connector | null)[]>([])

  const measure = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const cRect = container.getBoundingClientRect()
    const next = options.map((_, i) => {
      const card = cardRefs.current[i]
      const spot = spotRefs.current[i]
      if (!card || !spot) return null
      const cr = card.getBoundingClientRect()
      const sr = spot.getBoundingClientRect()
      return {
        x1: cr.right - cRect.left,
        y1: (cr.top + cr.bottom) / 2 - cRect.top,
        x2: (sr.left + sr.right) / 2 - cRect.left,
        y2: (sr.top + sr.bottom) / 2 - cRect.top,
      }
    })
    setConnectors(next)
  }, [options])

  useEffect(() => {
    // measure after paint so positions are correct
    const id = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(id)
  }, [selected, measure])

  useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  return (
    <div ref={containerRef} className={styles.wrap}>
      {/* SVG connector lines */}
      <svg className={styles.svgOverlay} aria-hidden="true">
        {options.map((opt, i) => {
          if (!selected.includes(opt.id)) return null
          const c = connectors[i]
          if (!c) return null
          return (
            <g key={opt.id}>
              {/* Static track */}
              <line
                x1={c.x1} y1={c.y1}
                x2={c.x2} y2={c.y2}
                stroke="#dedad2"
                strokeWidth="1"
              />
              {/* Traveling dashes — flow from card toward core */}
              <line
                x1={c.x1} y1={c.y1}
                x2={c.x2} y2={c.y2}
                stroke="rgba(184,77,106,0.8)"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={styles.lineFlow}
              />
              {/* Small dot at card edge */}
              <circle
                cx={c.x1} cy={c.y1}
                r={3}
                fill="#b0aca4"
              />
            </g>
          )
        })}
      </svg>

      {/* Left: option cards */}
      <div className={styles.cards}>
        {options.map((opt, i) => {
          const isSelected = selected.includes(opt.id)
          return (
            <div
              key={opt.id}
              ref={(el) => { cardRefs.current[i] = el }}
              className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => onToggle(opt.id)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault()
                  onToggle(opt.id)
                }
              }}
              style={{ animationDelay: `${0.05 + i * 0.05}s` }}
            >
              <div className={styles.cardIcon} aria-hidden="true">
                <svg className={styles.iconPlus} viewBox="0 0 28 28" fill="none">
                  <line x1="14" y1="7" x2="14" y2="21" stroke="#a0a09a" strokeWidth="2" strokeLinecap="round" />
                  <line x1="7" y1="14" x2="21" y2="14" stroke="#a0a09a" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className={styles.iconCheck} viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="12" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2" />
                  <polyline points="9,14 12.5,17.5 19,11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className={styles.cardLabel}>{opt.label}</span>
            </div>
          )
        })}
      </div>

      {/* Right: body image with zone spots */}
      <div className={styles.body}>
        <img
          src="/images/person-intro.png"
          alt=""
          className={styles.bodyImg}
          aria-hidden="true"
          width={400}
          height={620}
        />
        {options.map((opt, i) => (
          <div
            key={opt.id}
            ref={(el) => { spotRefs.current[i] = el }}
            className={styles.spotAnchor}
            style={{ top: opt.zoneTop, left: opt.zoneLeft }}
            aria-hidden="true"
          >
            {selected.includes(opt.id) && (
              <div key={`spot-${opt.id}-${selected.join(',')}`} className={styles.spot}>
                <div className={styles.ring1} />
                <div className={styles.ring2} />
                <div className={styles.ring3} />
                <div className={styles.glow} />
                <div className={styles.core} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
