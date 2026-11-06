import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface TagProps {
  children: ReactNode
  tone?: 'neutral' | 'accent'
  className?: string
}

/** Small monospace chip used for technologies and skills. */
export function Tag({ children, tone = 'neutral', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-1 font-mono text-xs leading-none font-medium',
        tone === 'neutral' && 'border border-border bg-bg-subtle text-body',
        tone === 'accent' && 'bg-accent-soft text-accent-hover',
        className,
      )}
    >
      {children}
    </span>
  )
}
