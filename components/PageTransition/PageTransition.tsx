'use client'
import { motion } from 'framer-motion'
import { useQuizStore } from '@/lib/quiz-store'

interface Props {
  children: React.ReactNode
  routeKey: string
}

export default function PageTransition({ children, routeKey }: Props) {
  const direction = useQuizStore((s) => s.direction)

  const variants = {
    enter: { x: direction === 'forward' ? '100%' : '-100%', opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: direction === 'forward' ? '-60%' : '60%', opacity: 0 },
  }

  return (
    <motion.div
      key={routeKey}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.28, ease: [0.32, 0, 0.16, 1] }}
      style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'var(--color-bg)' }}
    >
      {children}
    </motion.div>
  )
}
