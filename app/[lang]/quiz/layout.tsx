'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useQuizStore } from '@/lib/quiz-store'

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const direction = useQuizStore((s) => s.direction)

  // Step pages share one animation key so navigating between steps is instant.
  // Pattern: /<lang>/quiz/<number>
  const animationKey = /^\/[a-z]{2}\/quiz\/\d+$/.test(pathname) ? 'quiz-steps' : pathname

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={animationKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        style={{ background: 'var(--color-bg)', minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
