export function calcBMI(weightLbs: number, heightCm: number): number {
  const heightM = heightCm / 100
  const weightKg = weightLbs * 0.453592
  return weightKg / (heightM * heightM)
}

export function getBMICategory(bmi: number): 'Underweight' | 'Normal' | 'Overweight' | 'Obese' {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

export function getBMIMarkerPercent(bmi: number): number {
  const min = 15
  const max = 45
  return Math.min(94, Math.max(5, ((bmi - min) / (max - min)) * 100))
}

/** Calculate projected goal date at 9.33 days per lb lost */
export function getGoalDate(startWeightLbs: number, goalWeightLbs: number): string {
  const lbsToLose = Math.max(0, startWeightLbs - goalWeightLbs)
  const days = Math.round(lbsToLose * 9.33)
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

/** Convert display value → canonical storage unit */
export function toCanonical(value: string, displayUnit: string, canonicalUnit: string): string {
  const num = Number(value)
  if (isNaN(num) || !value.trim()) return value
  if (displayUnit === canonicalUnit) return value
  if (canonicalUnit === 'lbs' && displayUnit === 'kg') return (num / 0.453592).toFixed(1)
  if (canonicalUnit === 'cm'  && displayUnit === 'in') return (num * 2.54).toFixed(1)
  if (canonicalUnit === 'cm'  && displayUnit === 'ft') return (num * 30.48).toFixed(1)
  return value
}

/** Convert canonical stored value → display value in given unit */
export function fromCanonical(value: string, displayUnit: string, canonicalUnit: string): string {
  const num = Number(value)
  if (isNaN(num) || !value.trim()) return value
  if (displayUnit === canonicalUnit) return value
  if (canonicalUnit === 'lbs' && displayUnit === 'kg') return (num * 0.453592).toFixed(1)
  if (canonicalUnit === 'cm'  && displayUnit === 'in') return (num / 2.54).toFixed(1)
  if (canonicalUnit === 'cm'  && displayUnit === 'ft') return (num / 30.48).toFixed(1)
  return value
}

/** Split total inches into { ft, inch } */
export function splitFtIn(totalInches: number): { ft: number; inch: number } {
  const ft = Math.floor(totalInches / 12)
  const inch = Math.round(totalInches % 12)
  return { ft, inch }
}
