import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'

interface SectionProps {
  id: string
  /** Shown as "01 / About" above the title. */
  index: string
  eyebrow: string
  title: string
  description?: string
  /** Off-white background band. */
  subtle?: boolean
  children: ReactNode
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

/** Shared wrapper for every page section: anchor id, heading and background. */
export function Section({ id, index, eyebrow, title, description, subtle, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('py-16 md:py-24', subtle ? 'border-y border-border/70 bg-bg-subtle' : 'bg-bg')}
    >
      <Container>
        <Reveal className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-3 font-mono text-xs font-medium tracking-wide text-accent">
            {index} <span className="text-border-strong">/</span> {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="text-[1.75rem] leading-tight font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-4 text-base leading-relaxed text-muted md:text-[1.0625rem]">{description}</p>}
        </Reveal>
        {children}
      </Container>
    </section>
  )
}
