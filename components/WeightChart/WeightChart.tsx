import styles from './WeightChart.module.css'
import { fromCanonical } from '@/lib/bmi-utils'

interface Props {
  startWeight: number
  goalWeight: number
  goalDate: string
  unit?: string
}

export default function WeightChart({ startWeight, goalWeight, unit = 'lbs' }: Props) {
  const diff = startWeight - goalWeight
  const m1 = startWeight
  const m2 = Math.round(startWeight - diff * 0.35)
  const m3 = Math.round(startWeight - diff * 0.68)
  const m4 = goalWeight

  const fmt = (lbs: number) =>
    unit === 'kg'
      ? Math.round(Number(fromCanonical(String(lbs), 'kg', 'lbs')))
      : lbs

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartCardLabel}>Weight journey</div>
      <div className={styles.chartWrap}>
        <svg
          className={styles.weightChart}
          viewBox="0 0 500 185"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="lineGrad"
              x1="42"
              y1="0"
              x2="460"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#E07060" />
              <stop offset="44%" stopColor="#F0C040" />
              <stop offset="100%" stopColor="#b53e5a" />
            </linearGradient>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b53e5a" stopOpacity="0.13" />
              <stop offset="100%" stopColor="#b53e5a" stopOpacity="0" />
            </linearGradient>
          </defs>

          <line x1="162" y1="14" x2="162" y2="168" stroke="#EEECE8" strokeWidth="1" />
          <line x1="285" y1="14" x2="285" y2="168" stroke="#EEECE8" strokeWidth="1" />
          <line x1="402" y1="14" x2="402" y2="168" stroke="#EEECE8" strokeWidth="1" />
          <line x1="28" y1="168" x2="478" y2="168" stroke="#EEECE8" strokeWidth="1" />

          <path
            className={styles.chartArea}
            d="M 42,32 C 92,32 112,75 162,75 C 212,75 237,114 285,114 C 333,114 352,146 402,146 C 431,146 446,153 460,153 L 460,168 L 42,168 Z"
            fill="url(#areaGrad)"
          />

          <path
            className={styles.chartLine}
            d="M 42,32 C 92,32 112,75 162,75 C 212,75 237,114 285,114 C 333,114 352,146 402,146 C 431,146 446,153 460,153"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g className={styles.dot1}>
            <circle cx="42" cy="32" r="6.5" fill="white" stroke="#E07060" strokeWidth="2.5" />
          </g>
          <g className={styles.dot2}>
            <circle cx="162" cy="75" r="6.5" fill="white" stroke="#C89040" strokeWidth="2.5" />
          </g>
          <g className={styles.dot3}>
            <circle cx="285" cy="114" r="6.5" fill="white" stroke="#7DB852" strokeWidth="2.5" />
          </g>
          <g className={styles.dot4}>
            <circle cx="402" cy="146" r="9" fill="#b53e5a" stroke="#6FBF8C" strokeWidth="2" />
            <circle cx="402" cy="146" r="3.8" fill="white" />
          </g>

          <g className={styles.lbl1}>
            <rect x="14" y="5" width="56" height="22" rx="6" fill="#272724" />
            <text
              x="42"
              y="20"
              textAnchor="middle"
              fill="white"
              fontFamily="var(--font-dm-sans),sans-serif"
              fontSize="11"
              fontWeight="600"
            >
              {fmt(m1)} {unit}
            </text>
          </g>
          <g className={styles.lbl2}>
            <rect x="134" y="48" width="56" height="22" rx="6" fill="#373735" />
            <text
              x="162"
              y="63"
              textAnchor="middle"
              fill="white"
              fontFamily="var(--font-dm-sans),sans-serif"
              fontSize="11"
              fontWeight="600"
            >
              {fmt(m2)} {unit}
            </text>
          </g>
          <g className={styles.lbl3}>
            <rect x="257" y="87" width="56" height="22" rx="6" fill="#373735" />
            <text
              x="285"
              y="102"
              textAnchor="middle"
              fill="white"
              fontFamily="var(--font-dm-sans),sans-serif"
              fontSize="11"
              fontWeight="600"
            >
              {fmt(m3)} {unit}
            </text>
          </g>
          <g className={styles.lbl4}>
            <rect x="368" y="118" width="68" height="22" rx="11" fill="#b53e5a" />
            <text
              x="402"
              y="133"
              textAnchor="middle"
              fill="white"
              fontFamily="var(--font-dm-sans),sans-serif"
              fontSize="11"
              fontWeight="600"
            >
              {fmt(m4)} {unit}
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
