import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent shadow-card hover:bg-accent-hover',
  secondary: 'border border-border bg-surface text-ink shadow-card hover:border-border-strong hover:bg-bg-subtle',
  ghost: 'text-body hover:bg-bg-subtle hover:text-ink',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 gap-1.5 px-3.5 text-sm',
  md: 'h-11 gap-2 px-5 text-[0.9375rem]',
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean
  children: ReactNode
}

/** A link styled as a button. All buttons on this site navigate, so this is an <a>. */
export function LinkButton({
  variant = 'primary',
  size = 'md',
  external,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-lg font-medium whitespace-nowrap transition-colors duration-150',
        variants[variant],
        sizes[size],
        className,
      )}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  )
}
