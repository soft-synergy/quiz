'use client'
import { useEffect, useRef } from 'react'
import styles from './BMIScale.module.css'
import { getBMIMarkerPercent } from '@/lib/bmi-utils'

interface Props {
  bmi: number
}

export default function BMIScale({ bmi }: Props) {
  const markerRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef<HTMLDivElement>(null)
  const pct = getBMIMarkerPercent(bmi)

  useEffect(() => {
    if (!markerRef.current || !scaleRef.current) return
    const w = scaleRef.current.offsetWidth
    const px = (pct / 100) * w
    markerRef.current.style.transform = `translateX(${px}px)`
  }, [pct])

  const normalBmi = 21.5

  return (
    <div className={styles.bmiCard}>
      <div className={styles.bmiCardTop}>
        <span className={styles.bmiLabel}>Body-Mass-Index (BMI)</span>
        <span className={styles.bmiValue}>Normal – {normalBmi}</span>
      </div>
      <div className={styles.bmiScaleWrap}>
        <div ref={markerRef} className={styles.bmiMarkerWrap}>
          <div className={styles.bmiTooltip}>
            Your BMI is
            <br />
            {bmi.toFixed(2)}
          </div>
          <div className={styles.bmiMarkerDot} />
        </div>
        <div ref={scaleRef} className={styles.bmiScaleBar} />
      </div>
      <div className={styles.bmiScaleLabels}>
        <span>Normal</span>
        <span>Overweight</span>
        <span>Obese</span>
      </div>
    </div>
  )
}
