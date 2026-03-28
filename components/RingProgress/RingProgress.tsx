'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './RingProgress.module.css'

const R = 68
const CIRCUMFERENCE = 2 * Math.PI * R

// Uneven waypoints [normalizedTime, progress] — irregular pacing for dopamine
// Fast burst → steady → mid-stall suspense → surge → near-end stall → final rush
const WAYPOINTS: [number, number][] = [
  [0,    0],
  [0.05, 0.12],  // fast burst off the start
  [0.11, 0.21],
  [0.18, 0.29],
  [0.26, 0.36],
  [0.36, 0.43],  // pace drops — building suspense
  [0.47, 0.47],  // near-stall around 47%
  [0.53, 0.53],  // barely moving
  [0.59, 0.63],  // sudden surge — dopamine hit
  [0.66, 0.73],
  [0.73, 0.80],
  [0.80, 0.85],
  [0.87, 0.88],  // slows again near end — max tension
  [0.92, 0.90],  // almost frozen
  [0.95, 0.94],  // final rush begins
  [1.0,  1.0],
]

function easeWaypoints(t: number): number {
  for (let i = 1; i < WAYPOINTS.length; i++) {
    const [t0, p0] = WAYPOINTS[i - 1]
    const [t1, p1] = WAYPOINTS[i]
    if (t <= t1) {
      const seg = (t - t0) / (t1 - t0)
      // Smooth ease-in-out within each segment
      const e = seg < 0.5 ? 2 * seg * seg : 1 - 2 * (1 - seg) * (1 - seg)
      return p0 + (p1 - p0) * e
    }
  }
  return 1
}

interface Props {
  durationMs?: number
  onComplete?: () => void
}

export default function RingProgress({
  durationMs = 6000,
  onComplete,
}: Props) {
  const arcRef = useRef<SVGCircleElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 650)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    let raf: number

    const animate = (ts: number) => {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime
      const t = Math.min(elapsed / durationMs, 1)
      const progress = easeWaypoints(t)

      if (arcRef.current) {
        arcRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - progress))
      }
      if (labelRef.current) {
        labelRef.current.textContent = Math.round(progress * 100) + '%'
      }
      if (wrapRef.current) {
        wrapRef.current.setAttribute('aria-valuenow', String(Math.round(progress * 100)))
      }

      if (t < 1) {
        raf = requestAnimationFrame(animate)
      } else {
        onComplete?.()
      }
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [started, durationMs, onComplete])

  return (
    <div
      ref={wrapRef}
      className={styles.ringWrap}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <svg
        className={styles.ringSvg}
        viewBox="0 0 160 160"
        aria-hidden="true"
      >
        <circle className={styles.ringTrack} cx="80" cy="80" r={R} />
        <circle
          ref={arcRef}
          className={styles.ringProgress}
          cx="80"
          cy="80"
          r={R}
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: CIRCUMFERENCE,
          }}
        />
      </svg>
      <div ref={labelRef} className={styles.ringLabel}>
        0%
      </div>
    </div>
  )
}
