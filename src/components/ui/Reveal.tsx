import { m } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds. Use small steps (0.06) to stagger cards. */
  delay?: number
}

/**
 * Fades content in and lifts it 12px once, when it scrolls into view.
 * Reduced-motion users get the fade only (MotionConfig in App.tsx).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
    >
      {children}
    </m.div>
  )
}
