'use client'
import { useState, useEffect, useRef } from 'react'
import styles from './OptionCard.module.css'
import { QuizOption } from '@/lib/quiz-data'

interface Props {
  option: QuizOption
  selected: boolean
  onToggle: () => void
  animationDelay: number
  type?: 'single' | 'multi'
}

export default function OptionCard({
  option,
  selected,
  onToggle,
  animationDelay,
  type = 'multi',
}: Props) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth) {
      setImgLoaded(true)
    }
  }, [])

  return (
    <div
      className={`${styles.option} ${selected ? styles.optionSelected : ''}`}
      style={{ animationDelay: `${animationDelay}s` }}
      role={type === 'single' ? 'radio' : 'checkbox'}
      aria-checked={selected}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          onToggle()
        }
      }}
    >
      {type === 'multi' && (
        <div className={styles.optionIcon} aria-hidden="true">
          <svg className={styles.iconPlus} viewBox="0 0 28 28" fill="none">
            <line x1="14" y1="7" x2="14" y2="21" stroke="#a0a09a" strokeWidth="2" strokeLinecap="round" />
            <line x1="7" y1="14" x2="21" y2="14" stroke="#a0a09a" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <svg className={styles.iconCheck} viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="2" />
            <polyline points="9,14 12.5,17.5 19,11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      <span className={`${styles.optionLabel} ${type === 'single' ? styles.optionLabelSingle : ''}`}>{option.label}</span>
      {option.emoji && (
        <div className={styles.optionEmoji} aria-hidden="true">
          {option.emoji}
        </div>
      )}
      {option.image && (
        <div
          className={`${styles.optionImageWrap} ${imgLoaded ? styles.imageLoaded : ''}`}
          aria-hidden="true"
        >
          <div className={styles.skeleton} />
          <img
            ref={imgRef}
            src={option.image}
            alt=""
            width={110}
            height={90}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(true)}
          />
        </div>
      )}
    </div>
  )
}
