import { ArrowUpRight, BookOpen, Globe, PlayCircle } from 'lucide-react'
import type { ProjectLink } from '../../types/content'
import { cn } from '../../lib/cn'
import { GitHubIcon } from '../ui/BrandIcons'

const icons = {
  github: GitHubIcon,
  live: Globe,
  demo: PlayCircle,
  docs: BookOpen,
}

interface ProjectLinksProps {
  links: ProjectLink[]
  projectName: string
  className?: string
  /** Compact links for cards; full buttons for the detail view. */
  variant?: 'compact' | 'full'
}

export function ProjectLinks({ links, projectName, className, variant = 'compact' }: ProjectLinksProps) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)}>
      {links.map((link) => {
        const Icon = icons[link.kind]
        return (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label}: ${projectName} (opens in a new tab)`}
              className={cn(
                'relative z-10 inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors',
                variant === 'compact' && 'px-2 py-1.5 text-[0.8125rem] text-body hover:bg-bg-subtle hover:text-ink',
                variant === 'full' &&
                  'h-9 border border-border bg-surface px-3 text-sm text-ink shadow-card hover:border-border-strong hover:bg-bg-subtle',
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {link.label}
              {variant === 'full' && <ArrowUpRight className="size-3.5 text-muted" aria-hidden="true" />}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
