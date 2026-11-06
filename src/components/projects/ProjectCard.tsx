import { ArrowRight, Users } from 'lucide-react'
import type { Project } from '../../types/content'
import { cn } from '../../lib/cn'
import { Tag } from '../ui/Tag'
import { FlowInline } from './FlowSteps'
import { ProjectLinks } from './ProjectLinks'

interface ProjectCardProps {
  project: Project
  onOpen: (slug: string) => void
}

const MAX_TAGS = { flagship: 8, regular: 4 }

/**
 * The whole card is clickable through the "View details" button, whose
 * ::after covers the card. The external links sit above it (z-10).
 */
export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const flagship = Boolean(project.flagship)
  const maxTags = flagship ? MAX_TAGS.flagship : MAX_TAGS.regular
  const extraTags = project.tech.length - maxTags

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-xl border border-border bg-surface shadow-card transition-[border-color,box-shadow,transform] duration-200',
        'hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card-hover focus-within:border-border-strong',
        flagship ? 'p-6 md:p-8' : 'p-6',
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {flagship && <Tag tone="accent">Flagship project</Tag>}
        {project.team && (
          <Tag tone="accent" className="gap-1">
            <Users className="size-3" aria-hidden="true" />
            {project.team}
          </Tag>
        )}
      </div>

      <div className={cn(flagship && 'lg:grid lg:grid-cols-12 lg:gap-10')}>
        <div className={cn(flagship && 'lg:col-span-7')}>
          <h3 className={cn('font-semibold tracking-tight', flagship ? 'mt-4 text-2xl md:text-[1.75rem]' : 'mt-3 text-xl')}>
            {project.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-muted">{project.tagline}</p>
          <p className={cn('mt-4 leading-relaxed', flagship ? 'text-[1.0625rem]' : 'text-[0.9375rem]')}>{project.summary}</p>
        </div>

        <div className={cn(flagship ? 'mt-6 lg:col-span-5 lg:mt-4' : 'mt-5')}>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5" aria-label="Highlights">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-[0.8125rem] font-medium text-ink">
                <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
          {flagship && (
            <div className="mt-5">
              <p className="mb-2 font-mono text-[0.6875rem] tracking-wide text-muted uppercase">How a message flows</p>
              <FlowInline steps={project.architecture} />
            </div>
          )}
        </div>
      </div>

      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
        {project.tech.slice(0, maxTags).map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
        {extraTags > 0 && (
          <li>
            <Tag className="text-muted">+{extraTags}</Tag>
          </li>
        )}
      </ul>

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <ProjectLinks links={project.links} projectName={project.name} className="-ml-2" />
          <button
            type="button"
            onClick={() => onOpen(project.slug)}
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent after:absolute after:inset-0 after:rounded-xl after:content-[''] hover:text-accent-hover"
            aria-haspopup="dialog"
          >
            View details
            <span className="sr-only">: {project.name}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
