import styles from './SocialProofStep.module.css'

interface Props {
  onContinue: () => void
}

// Satellite avatar positions as [top%, left%] relative to the constellation container
const AVATARS = [
  { img: '/images/social-1.jpg', top: '4%',  left: '43%' },
  { img: '/images/social-2.jpg', top: '10%', left: '76%' },
  { img: '/images/social-3.jpg', top: '52%', left: '88%' },
  { img: '/images/social-4.jpg', top: '84%', left: '30%' },
  { img: '/images/social-5.jpg', top: '46%', left: '2%'  },
]

export default function SocialProofStep({ onContinue }: Props) {
  return (
    <div className={styles.page}>
      {/* Constellation */}
      <div className={styles.constellation} aria-hidden="true">
        {/* Dashed orbit circle */}
        <svg className={styles.orbit} viewBox="0 0 300 300" fill="none" aria-hidden="true">
          <circle
            cx="150"
            cy="150"
            r="124"
            stroke="#d4d2cc"
            strokeWidth="1.5"
            strokeDasharray="7 5"
          />
        </svg>

        {/* Center avatar */}
        <div className={styles.avatarCenter}>
          <img src="/images/social-center.jpg" alt="" width={136} height={136} />
        </div>

        {/* Satellite avatars */}
        {AVATARS.map((av, i) => (
          <div
            key={i}
            className={styles.avatarSat}
            style={{ top: av.top, left: av.left }}
          >
            <img src={av.img} alt="" width={72} height={72} />
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <svg className={styles.laurel} viewBox="0 0 32 40" fill="none" aria-hidden="true">
          <path d="M16 36C16 36 4 28 4 16C4 10 8 6 12 6C10 10 10 14 12 18C14 22 16 26 16 36Z" fill="#b53e5a" opacity="0.7"/>
          <path d="M16 36C16 36 4 30 6 20C7 14 11 10 14 12" stroke="#b53e5a" strokeWidth="1.2"/>
          <path d="M6 24C8 20 10 18 12 18" stroke="#b53e5a" strokeWidth="1" opacity="0.6"/>
          <path d="M7 30C9 26 11 24 14 22" stroke="#b53e5a" strokeWidth="1" opacity="0.6"/>
        </svg>
        <div className={styles.statNumber}>23&thinsp;000&thinsp;000+</div>
        <svg className={styles.laurel} viewBox="0 0 32 40" fill="none" style={{ transform: 'scaleX(-1)' }} aria-hidden="true">
          <path d="M16 36C16 36 4 28 4 16C4 10 8 6 12 6C10 10 10 14 12 18C14 22 16 26 16 36Z" fill="#b53e5a" opacity="0.7"/>
          <path d="M16 36C16 36 4 30 6 20C7 14 11 10 14 12" stroke="#b53e5a" strokeWidth="1.2"/>
          <path d="M6 24C8 20 10 18 12 18" stroke="#b53e5a" strokeWidth="1" opacity="0.6"/>
          <path d="M7 30C9 26 11 24 14 22" stroke="#b53e5a" strokeWidth="1" opacity="0.6"/>
        </svg>
      </div>
      <p className={styles.statLabel}>people already joined us</p>

      {/* Continue button */}
      <footer className={styles.footer}>
        <button className={styles.btn} onClick={onContinue} type="button">
          Continue
        </button>
      </footer>
    </div>
  )
}
