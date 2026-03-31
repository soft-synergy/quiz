'use client'
import { useEffect, useRef } from 'react'
import styles from './BMIScale.module.css'
import { getBMIMarkerPercent } from '@/lib/bmi-utils'
import { useLangStore, type LangCode } from '@/lib/lang-store'

interface Props {
  bmi: number
}

export default function BMIScale({ bmi }: Props) {
  const lang = useLangStore((s) => s.lang)
  const markerRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef<HTMLDivElement>(null)
  const pct = getBMIMarkerPercent(bmi)
  const copy: Record<LangCode, { title: string; normal: string; tooltip: string; labels: [string, string, string] }> = {
    en: { title: 'Body-Mass-Index (BMI)', normal: 'Normal', tooltip: 'Your BMI is', labels: ['Normal', 'Overweight', 'Obese'] },
    lt: { title: 'Kūno masės indeksas (KMI)', normal: 'Norma', tooltip: 'Jūsų KMI yra', labels: ['Norma', 'Antsvoris', 'Nutukimas'] },
    lv: { title: 'Ķermeņa masas indekss (ĶMI)', normal: 'Norma', tooltip: 'Jūsu ĶMI ir', labels: ['Norma', 'Liekais svars', 'Aptaukošanās'] },
    ro: { title: 'Indicele de masă corporală (IMC)', normal: 'Normal', tooltip: 'IMC-ul dumneavoastră este', labels: ['Normal', 'Supraponderal', 'Obezitate'] },
    cz: { title: 'Index tělesné hmotnosti (BMI)', normal: 'Norma', tooltip: 'Vaše BMI je', labels: ['Norma', 'Nadváha', 'Obezita'] },
    dk: { title: 'Body Mass Index (BMI)', normal: 'Normal', tooltip: 'Jeres BMI er', labels: ['Normal', 'Overvægt', 'Fedme'] },
    gr: { title: 'Δείκτης μάζας σώματος (BMI)', normal: 'Φυσιολογικό', tooltip: 'Το BMI σας είναι', labels: ['Φυσιολογικό', 'Υπέρβαρο', 'Παχυσαρκία'] },
    hu: { title: 'Testtömegindex (BMI)', normal: 'Normál', tooltip: 'Az Ön BMI-je', labels: ['Normál', 'Túlsúly', 'Elhízás'] },
    hr: { title: 'Indeks tjelesne mase (BMI)', normal: 'Normalno', tooltip: 'Vaš BMI je', labels: ['Normalno', 'Prekomjerna težina', 'Pretilost'] },
    il: { title: 'מדד מסת גוף (BMI)', normal: 'תקין', tooltip: 'ה-BMI שלכם הוא', labels: ['תקין', 'עודף משקל', 'השמנה'] },
    jp: { title: 'BMI（体格指数）', normal: '標準', tooltip: 'あなたのBMIは', labels: ['標準', '過体重', '肥満'] },
    ru: { title: 'Индекс массы тела (ИМТ)', normal: 'Норма', tooltip: 'Ваш ИМТ', labels: ['Норма', 'Избыточный вес', 'Ожирение'] },
    sk: { title: 'Index telesnej hmotnosti (BMI)', normal: 'Norma', tooltip: 'Vaše BMI je', labels: ['Norma', 'Nadváha', 'Obezita'] },
    tw: { title: '身體質量指數（BMI）', normal: '正常', tooltip: '您的 BMI 為', labels: ['正常', '過重', '肥胖'] },
  }
  const t = copy[lang] ?? copy.en

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
        <span className={styles.bmiLabel}>{t.title}</span>
        <span className={styles.bmiValue}>{t.normal} - {normalBmi}</span>
      </div>
      <div className={styles.bmiScaleWrap}>
        <div ref={markerRef} className={styles.bmiMarkerWrap}>
          <div className={styles.bmiTooltip}>
            {t.tooltip}
            <br />
            {bmi.toFixed(2)}
          </div>
          <div className={styles.bmiMarkerDot} />
        </div>
        <div ref={scaleRef} className={styles.bmiScaleBar} />
      </div>
      <div className={styles.bmiScaleLabels}>
        <span>{t.labels[0]}</span>
        <span>{t.labels[1]}</span>
        <span>{t.labels[2]}</span>
      </div>
    </div>
  )
}
