'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface QuizState {
  answers: Record<number, string | string[]>
  age: string
  weightUnit: string
  currentStep: number
  direction: 'forward' | 'backward'
  _hydrated: boolean
  setAge: (age: string) => void
  setAnswer: (step: number, answer: string | string[]) => void
  setWeightUnit: (unit: string) => void
  setDirection: (d: 'forward' | 'backward') => void
  setCurrentStep: (step: number) => void
  setHydrated: (v: boolean) => void
  reset: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      answers: {},
      age: '',
      weightUnit: 'kg',
      currentStep: 1,
      direction: 'forward',
      _hydrated: false,
      setAge: (age) => set({ age }),
      setAnswer: (step, answer) =>
        set((s) => ({ answers: { ...s.answers, [step]: answer } })),
      setWeightUnit: (weightUnit) => set({ weightUnit }),
      setDirection: (direction) => set({ direction }),
      setCurrentStep: (currentStep) => set({ currentStep }),
      setHydrated: (v) => set({ _hydrated: v }),
      reset: () => set({ answers: {}, age: '', weightUnit: 'kg', currentStep: 1, direction: 'forward' }),
    }),
    {
      name: 'quiz-state',
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    }
  )
)
