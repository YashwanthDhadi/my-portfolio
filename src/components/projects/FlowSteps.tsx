import { ChevronRight } from 'lucide-react'
import type { ArchitectureStep } from '../../types/content'

/** Compact one-line pipeline: "Step → Step → Step". Used on the flagship card. */
export function FlowInline({ steps }: { steps: ArchitectureStep[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-1 gap-y-2" aria-label="Request flow">
      {steps.map((step, i) => (
        <li key={step.title} className="flex items-center gap-1">
          <span className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-[0.6875rem] font-medium text-body">
            {step.title}
          </span>
          {i < steps.length - 1 && <ChevronRight className="size-3.5 text-border-strong" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  )
}

/** Numbered vertical pipeline with details. Used in the project detail view. */
export function FlowVertical({ steps }: { steps: ArchitectureStep[] }) {
  return (
    <ol className="relative space-y-4">
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-4">
          {i < steps.length - 1 && (
            <span className="absolute top-8 bottom-[-1rem] left-[0.9375rem] w-px bg-border" aria-hidden="true" />
          )}
          <span className="relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-accent-ring bg-accent-soft font-mono text-xs font-medium text-accent-hover">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="pt-1">
            <p className="text-[0.9375rem] font-semibold text-ink">{step.title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
