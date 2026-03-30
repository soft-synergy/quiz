'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter, useParams, usePathname } from 'next/navigation'
import styles from './page.module.css'
import interStyles from './interstitial.module.css'
import { QUIZ_STEPS, TOTAL_STEPS, QUIZ_PHASE1_END } from '@/lib/quiz-data'
import { useQuizStore } from '@/lib/quiz-store'
import { useLangStore } from '@/lib/lang-store'
import { getTranslatedSteps, useStepPageT } from '@/lib/i18n'
import { calcBMI, getBMICategory, toCanonical, fromCanonical, splitFtIn } from '@/lib/bmi-utils'
import QuizHeader from '@/components/QuizHeader/QuizHeader'
import QuizFooter from '@/components/QuizFooter/QuizFooter'
import OptionCard from '@/components/OptionCard/OptionCard'
import TargetZones from '@/components/TargetZones/TargetZones'
import DatePicker from '@/components/DatePicker/DatePicker'

const EXCLUSIVE_OPTION_IDS = new Set(['none'])
const HEIGHT_STEP = 23
const WEIGHT_STEP = 24

function StepContent({
  stepNum,
  navigate,
}: {
  stepNum: number
  navigate: (dir: 'forward' | 'backward') => void
}) {
  const { answers, setAnswer } = useQuizStore()
  const lang = useLangStore((s) => s.lang)
  const t = useStepPageT(lang)
  const translatedSteps = useMemo(() => getTranslatedSteps(lang), [lang])
  const stepData = translatedSteps.find((s) => s.step === stepNum)

  const savedAnswer = answers[stepNum]
  const canonicalUnit = stepData?.units?.[0] ?? stepData?.unit ?? ''

  const [inputUnit, setInputUnit] = useState<string>(() => {
    // Default height to ft/in display (more intuitive for most users)
    if (stepData?.units?.includes('in') && canonicalUnit === 'cm') return 'in'
    return canonicalUnit
  })
  const [inputValue, setInputValue] = useState<string>(() => {
    if (typeof savedAnswer === 'string' && stepData?.type === 'input-number' && savedAnswer) return savedAnswer
    return ''
  })
  // ft+in dual inputs for height step (when unit is 'in' and canonical is 'cm')
  const [ftValue, setFtValue] = useState<string>(() => {
    if (stepData?.units?.includes('in') && canonicalUnit === 'cm' && typeof savedAnswer === 'string' && savedAnswer) {
      const totalIn = Number(savedAnswer) / 2.54
      return String(Math.floor(totalIn / 12))
    }
    return ''
  })
  const [inchValue, setInchValue] = useState<string>(() => {
    if (stepData?.units?.includes('in') && canonicalUnit === 'cm' && typeof savedAnswer === 'string' && savedAnswer) {
      const totalIn = Number(savedAnswer) / 2.54
      return String(Math.round(totalIn % 12))
    }
    return ''
  })
  const [textValue, setTextValue] = useState<string>(
    typeof savedAnswer === 'string' && stepData?.type === 'input-text' ? savedAnswer : ''
  )
  const [dateValue, setDateValue] = useState<string>(
    typeof savedAnswer === 'string' && stepData?.type === 'input-date' ? savedAnswer : ''
  )
  const [selected, setSelected] = useState<string[]>(
    Array.isArray(savedAnswer) ? savedAnswer : savedAnswer ? [savedAnswer as string] : []
  )
  const [consentChecked, setConsentChecked] = useState(false)

  const liveBMI = useMemo<number | null>(() => {
    if (!stepData?.showBMICard) return null
    const canonical = toCanonical(inputValue, inputUnit, canonicalUnit)
    const weightLbs = Number(canonical)
    const heightCm = Number(answers[HEIGHT_STEP])
    if (!weightLbs || !heightCm) return null
    return calcBMI(weightLbs, heightCm)
  }, [inputValue, inputUnit, canonicalUnit, stepData?.showBMICard, answers])

  const goalAnalysis = useMemo<{ key: 'too-low' | 'a-lot' | 'moderate' | 'small'; pct: number } | null>(() => {
    if (!stepData?.showGoalCard) return null
    const canonical = toCanonical(inputValue, inputUnit, canonicalUnit)
    const goalLbs = Number(canonical)
    const currentLbs = Number(answers[WEIGHT_STEP])
    const heightCm = Number(answers[HEIGHT_STEP])
    if (!goalLbs || !currentLbs || !heightCm) return null
    const goalBmi = calcBMI(goalLbs, heightCm)
    const pct = ((currentLbs - goalLbs) / currentLbs) * 100
    if (goalBmi < 18.5) return { key: 'too-low', pct }
    if (pct > 20) return { key: 'a-lot', pct }
    if (pct > 8) return { key: 'moderate', pct }
    return { key: 'small', pct: Math.max(0, pct) }
  }, [inputValue, inputUnit, canonicalUnit, stepData?.showGoalCard, answers])

  if (!stepData) return null

  const isSingle = stepData.type === 'single'
  const isMulti = stepData.type === 'multi'
  const isInput = stepData.type === 'input-number'
  const isTextInput = stepData.type === 'input-text'
  const isDateInput = stepData.type === 'input-date'
  const isInterstitial = stepData.type === 'interstitial'
  const isTargetZones = stepData.type === 'target-zones'
  const hasUnitToggle = isInput && (stepData.units?.length ?? 0) > 1
  const isFtIn = isInput && inputUnit === 'in' && canonicalUnit === 'cm'

  // For ft+in mode, compute total inches as the effective input value
  const activeInputValue = isFtIn
    ? (ftValue || inchValue ? String(Number(ftValue || 0) * 12 + Number(inchValue || 0)) : '')
    : inputValue

  const handleUnitSwitch = (newUnit: string) => {
    if (newUnit === inputUnit || !stepData.units) return
    const canonical = toCanonical(activeInputValue, inputUnit, canonicalUnit)
    setInputUnit(newUnit)
    if (newUnit === 'in') {
      const totalIn = Number(fromCanonical(canonical, 'in', 'cm'))
      if (totalIn > 0) {
        setFtValue(String(Math.floor(totalIn / 12)))
        setInchValue(String(Math.round(totalIn % 12)))
      }
    } else {
      setInputValue(fromCanonical(canonical, newUnit, canonicalUnit))
    }
  }

  if (isInterstitial && stepData.interstitial) {
    const { images, headline, body, note, circular, fullWidthTop } = stepData.interstitial
    const isPair = images.length >= 2
    return (
      <>
        <main className={interStyles.main}>
          {fullWidthTop ? (
            <div className={interStyles.imageTopFull}>
              <img src={images[0]} alt="" aria-hidden="true" />
            </div>
          ) : circular ? (
            <div className={interStyles.imageCircleWrap}>
              <img src={images[0]} alt="" aria-hidden="true" className={interStyles.imageCircle} />
            </div>
          ) : (
            <div className={`${interStyles.imageCard} ${isPair ? interStyles.pair : ''}`}>
              {images.map((src, i) => (
                <img key={i} src={src} alt="" aria-hidden="true" />
              ))}
            </div>
          )}
          {note && <p className={interStyles.note}>{note}</p>}
          <div className={interStyles.body}>
            <h1 className={interStyles.headline}>{headline}</h1>
            <p className={interStyles.para}>{body}</p>
          </div>
        </main>
        <QuizFooter onClick={() => navigate('forward')} sticky={false} />
      </>
    )
  }

  const handleToggle = (id: string) => {
    if (isSingle) {
      setSelected([id])
      setAnswer(stepNum, id)
      setTimeout(() => navigate('forward'), 50)
    } else {
      setSelected((prev) => {
        let next: string[]
        if (EXCLUSIVE_OPTION_IDS.has(id)) {
          next = prev.includes(id) ? [] : [id]
        } else {
          const withoutExclusive = prev.filter((x) => !EXCLUSIVE_OPTION_IDS.has(x))
          next = withoutExclusive.includes(id)
            ? withoutExclusive.filter((x) => x !== id)
            : [...withoutExclusive, id]
        }
        queueMicrotask(() => setAnswer(stepNum, next))
        return next
      })
    }
  }

  const handleContinue = () => {
    if (isInput) setAnswer(stepNum, toCanonical(activeInputValue, inputUnit, canonicalUnit))
    else if (isTextInput) setAnswer(stepNum, textValue.trim())
    else if (isDateInput && dateValue) setAnswer(stepNum, dateValue)
    navigate('forward')
  }

  const handleSkip = () => navigate('forward')

  const inputNum = Number(toCanonical(activeInputValue, inputUnit, canonicalUnit))
  const isValidInput = activeInputValue.trim().length > 0 && !isNaN(inputNum) && inputNum > 0
  const isValidText = textValue.trim().length >= 2

  const inputError: string | null = (() => {
    if (!isInput || !activeInputValue.trim()) return null
    if (!isValidInput) return null
    if (stepData.validation) {
      const { min, max } = stepData.validation
      const displayMin = Math.round(Number(fromCanonical(String(min), inputUnit, canonicalUnit)))
      const displayMax = Math.round(Number(fromCanonical(String(max), inputUnit, canonicalUnit)))
      const unit = inputUnit || stepData.unit || ''
      if (inputNum < min || inputNum > max) return t.error_range(displayMin, displayMax, unit)
    }
    if (stepData.showGoalCard) {
      const currentLbs = Number(answers[WEIGHT_STEP])
      if (currentLbs && inputNum >= currentLbs) return t.goal_weight_too_high
    }
    return null
  })()

  const baseCanContinue = isInput
    ? isValidInput && !inputError
    : isTextInput ? isValidText
    : isDateInput ? (!!dateValue || !!stepData.skippable)
    : selected.length > 0
  const canContinue = stepData.requiresConsent ? (baseCanContinue && consentChecked) : baseCanContinue

  if (isTargetZones && stepData.options) {
    return (
      <>
        <main className={styles.main}>
          <div className={styles.content}>
            <h1 className={styles.question}>{stepData.question}</h1>
            <TargetZones
              options={stepData.options}
              selected={selected}
              onToggle={(id) => {
                setSelected((prev) => {
                  const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                  queueMicrotask(() => setAnswer(stepNum, next))
                  return next
                })
              }}
            />
          </div>
        </main>
        <QuizFooter disabled={selected.length === 0} onClick={handleContinue} />
      </>
    )
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.question}>{stepData.question}</h1>
          {stepData.subtitle && <p className={styles.subtitle}>{stepData.subtitle}</p>}

          {(isSingle || isMulti) && stepData.options && (
            <div className={styles.optionsGroup} role={isSingle ? 'radiogroup' : 'group'}>
              {stepData.options.map((opt, i) => (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  selected={selected.includes(opt.id)}
                  onToggle={() => handleToggle(opt.id)}
                  animationDelay={0.05 + i * 0.05}
                  type={isSingle ? 'single' : 'multi'}
                />
              ))}
            </div>
          )}

          {isInput && (
            <>
              {hasUnitToggle && (
                <div className={styles.unitToggle}>
                  {stepData.units!.map((u) => (
                    <button
                      key={u}
                      className={`${styles.unitBtn} ${inputUnit === u ? styles.unitBtnActive : ''}`}
                      onClick={() => handleUnitSwitch(u)}
                      type="button"
                    >
                      {u}
                    </button>
                  ))}
                </div>
              )}

              {isFtIn ? (
                <div className={styles.ftInWrap}>
                  <div className={styles.ftInField}>
                    <input
                      className={`${styles.numberInput} ${inputError ? styles.numberInputError : ''}`}
                      type="number" inputMode="numeric"
                      placeholder="0" value={ftValue}
                      onChange={(e) => setFtValue(e.target.value)}
                      min="0" max="9" autoFocus
                    />
                    <span className={styles.inputUnit}>ft</span>
                  </div>
                  <div className={styles.ftInField}>
                    <input
                      className={`${styles.numberInput} ${inputError ? styles.numberInputError : ''}`}
                      type="number" inputMode="numeric"
                      placeholder="0" value={inchValue}
                      onChange={(e) => setInchValue(e.target.value)}
                      min="0" max="11"
                    />
                    <span className={styles.inputUnit}>in</span>
                  </div>
                </div>
              ) : (
                <div className={styles.inputWrap}>
                  <input
                    className={`${styles.numberInput} ${inputError ? styles.numberInputError : ''}`}
                    type="number"
                    inputMode="decimal"
                    placeholder={stepData.placeholder ?? ''}
                    value={inputValue}
                    onChange={(e) => {
                      const val = e.target.value
                      // Auto-switch: single digit 4–8 in cm mode looks like feet → switch to ft/in
                      if (stepData?.units?.includes('in') && canonicalUnit === 'cm' && val.length === 1) {
                        const num = Number(val)
                        if (num >= 4 && num <= 8) {
                          setInputUnit('in')
                          setFtValue(val)
                          setInchValue('')
                          return
                        }
                      }
                      setInputValue(val)
                    }}
                    autoFocus
                  />
                  <span className={styles.inputUnit}>{hasUnitToggle ? inputUnit : stepData.unit}</span>
                </div>
              )}
              {inputError && <p className={styles.inputErrorMsg}>{inputError}</p>}

              {stepData.hint && (
                <div className={styles.hintCard}>
                  <span className={styles.hintIcon} aria-hidden="true">☝️</span>
                  <div className={styles.hintBody}>
                    {stepData.hintTitle && <p className={styles.hintTitle}>{stepData.hintTitle}</p>}
                    <p className={styles.hintText}>{stepData.hint}</p>
                  </div>
                </div>
              )}

              {stepData.showBMICard && (() => {
                const cat = liveBMI ? getBMICategory(liveBMI) : null
                const catClass = cat === 'Underweight' ? styles.bmiCardUnderweight
                  : cat === 'Normal'      ? styles.bmiCardNormal
                  : cat === 'Overweight'  ? styles.bmiCardOverweight
                  : cat === 'Obese'       ? styles.bmiCardObese : ''
                const emoji = cat === 'Underweight' ? '💙'
                  : cat === 'Normal'     ? '😊'
                  : cat === 'Overweight' ? '😔'
                  : cat === 'Obese'      ? '🔥' : ''
                return (
                  <div className={`${styles.bmiLiveCard} ${catClass} ${liveBMI ? styles.bmiLiveCardVisible : ''}`}>
                    {liveBMI && cat ? (
                      <>
                        <span className={styles.bmiCardEmoji} aria-hidden="true">{emoji}</span>
                        <div className={styles.bmiCardContent}>
                          <p className={styles.bmiCardTitle}>
                            {cat === 'Underweight' && t.bmi_underweight(liveBMI.toFixed(1))}
                            {cat === 'Normal'      && t.bmi_normal(liveBMI.toFixed(1))}
                            {cat === 'Overweight'  && t.bmi_overweight(liveBMI.toFixed(1))}
                            {cat === 'Obese'       && t.bmi_obese(liveBMI.toFixed(1))}
                          </p>
                          <p className={styles.bmiCardBody}>
                            {cat === 'Underweight' && t.bmi_underweight_body}
                            {cat === 'Normal'      && t.bmi_normal_body}
                            {cat === 'Overweight'  && t.bmi_overweight_body}
                            {cat === 'Obese'       && t.bmi_obese_body}
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className={styles.bmiLivePlaceholder}>{t.bmi_checking}</p>
                    )}
                  </div>
                )
              })()}

              {stepData.showGoalCard && (() => {
                const heightCm = Number(answers[HEIGHT_STEP])
                const heightM = heightCm / 100
                const minHealthyLbs = heightM > 0 ? Math.round(18.5 * heightM * heightM / 0.453592) : 0
                const maxHealthyLbs = heightM > 0 ? Math.round(24.9 * heightM * heightM / 0.453592) : 0
                const displayMinW = inputUnit === 'kg' ? Math.round(minHealthyLbs * 0.453592) : minHealthyLbs
                const displayMaxW = inputUnit === 'kg' ? Math.round(maxHealthyLbs * 0.453592) : maxHealthyLbs
                const unit = inputUnit || 'lbs'
                return (
                  <div className={`${styles.goalCard} ${goalAnalysis?.key === 'too-low' ? styles.goalCardOutOfRange : ''} ${goalAnalysis ? styles.goalCardVisible : ''}`}>
                    {goalAnalysis?.key === 'too-low' ? (
                      <>
                        <span className={styles.goalCardEmoji} aria-hidden="true">🍀</span>
                        <div className={styles.goalCardContent}>
                          <p className={styles.goalCardTitle}>Oops! Out of range</p>
                          <p className={styles.goalCardBody}>
                            According to medical standards, a healthy BMI falls between <strong>18.5</strong> and <strong>24.9</strong>.
                            {minHealthyLbs > 0 && <> For your height, this means a recommended goal weight between <strong>{displayMinW} {unit}</strong> and <strong>{displayMaxW} {unit}</strong>.</>}
                            {' '}<strong>Please adjust your target to stay within the safe range.</strong>
                          </p>
                        </div>
                      </>
                    ) : goalAnalysis ? (
                      <>
                        <span className={styles.goalCardEmoji} aria-hidden="true">
                          {goalAnalysis.key === 'a-lot' ? '💪' : goalAnalysis.key === 'moderate' ? '👍' : '🎯'}
                        </span>
                        <div className={styles.goalCardContent}>
                          <p className={styles.goalDesc}>
                            {goalAnalysis.key === 'a-lot'    && t.goal_a_lot}
                            {goalAnalysis.key === 'moderate' && t.goal_moderate}
                            {goalAnalysis.key === 'small'    && t.goal_small}
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className={styles.bmiLivePlaceholder}>{t.goal_placeholder}</p>
                    )}
                  </div>
                )
              })()}
            </>
          )}

          {isTextInput && (
            <div className={styles.textInputWrap}>
              <input
                className={styles.textInput}
                type="text"
                placeholder={stepData.placeholder ?? ''}
                value={textValue}
                maxLength={20}
                onChange={(e) => setTextValue(e.target.value)}
                autoFocus
                autoComplete="given-name"
              />
              <span className={styles.charCount}>{t.char_count(textValue.length)}</span>
            </div>
          )}

          {isDateInput && (
            <div className={styles.dateInputWrap}>
              <DatePicker value={dateValue} onChange={setDateValue} />
            </div>
          )}

          {isInput && stepData.requiresConsent && (
            <div
              className={styles.consentRow}
              onClick={() => setConsentChecked((v) => !v)}
              role="checkbox"
              aria-checked={consentChecked}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setConsentChecked((v) => !v) } }}
            >
              <div className={`${styles.consentCheck} ${consentChecked ? styles.consentChecked : ''}`} aria-hidden="true">
                {consentChecked && (
                  <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={styles.consentText}>
                {t.consent_text} <a href="/privacy-policy" onClick={(e) => e.stopPropagation()}>{t.consent_privacy_link}</a>
              </span>
            </div>
          )}
        </div>
      </main>

      {(isMulti || isInput || isTextInput || isDateInput) && (
        <QuizFooter
          disabled={!canContinue}
          onClick={handleContinue}
          onSkip={isDateInput && stepData.skippable ? handleSkip : undefined}
          label={stepData.buttonLabel}
        />
      )}
    </>
  )
}

export default function QuizStepPage() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const { setDirection, setCurrentStep } = useQuizStore()
  const lang = useLangStore((s) => s.lang)

  const [stepNum, setStepNum] = useState(Number(params.step))

  useEffect(() => {
    setCurrentStep(stepNum)
  }, [stepNum, setCurrentStep])

  useEffect(() => {
    const stepFromPath = Number(pathname.match(/\/quiz\/(\d+)/)?.[1])
    if (stepFromPath && stepFromPath !== stepNum) setStepNum(stepFromPath)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    const nextStep = QUIZ_STEPS.find((s) => s.step === stepNum + 1)
    if (!nextStep?.options) return
    nextStep.options.forEach((opt) => {
      if (opt.image) { const img = new Image(); img.src = opt.image }
    })
  }, [stepNum])

  const navigate = useCallback(
    (direction: 'forward' | 'backward') => {
      setDirection(direction)
      const base = `/${lang}/quiz`
      if (direction === 'forward') {
        if (stepNum === QUIZ_PHASE1_END) {
          router.push(`${base}/wellness`)
        } else if (stepNum >= TOTAL_STEPS) {
          router.push(`${base}/result`)
        } else {
          const next = stepNum + 1
          setStepNum(next)
          window.history.pushState(null, '', `${base}/${next}`)
          window.scrollTo(0, 0)
        }
      } else {
        if (stepNum <= 1) {
          router.push(`/${lang}`)
        } else {
          const prev = stepNum - 1
          setStepNum(prev)
          window.history.pushState(null, '', `${base}/${prev}`)
          window.scrollTo(0, 0)
        }
      }
    },
    [stepNum, router, setDirection, lang]
  )

  const currentStepData = QUIZ_STEPS.find((s) => s.step === stepNum)
  const isInterstitialStep = currentStepData?.type === 'interstitial'
  const questionSteps = QUIZ_STEPS.filter((s) => s.type !== 'interstitial')
  const questionStepNum = questionSteps.findIndex((s) => s.step === stepNum) + 1
  const questionTotal = questionSteps.length

  return (
    <>
      <QuizHeader
        step={isInterstitialStep ? undefined : questionStepNum || undefined}
        totalSteps={isInterstitialStep ? undefined : questionTotal}
        hideProgress={isInterstitialStep}
        overlay={isInterstitialStep}
        onBack={() => navigate('backward')}
      />
      <StepContent key={stepNum} stepNum={stepNum} navigate={navigate} />
    </>
  )
}
