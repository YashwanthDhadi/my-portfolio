import { Info, Users, X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import type { Project } from '../../types/content'
import { Tag } from '../ui/Tag'
import { FlowVertical } from './FlowSteps'
import { ProjectLinks } from './ProjectLinks'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h3 className="mb-3 font-mono text-[0.6875rem] font-medium tracking-wider text-muted uppercase">{title}</h3>
      {children}
    </section>
  )
}

function BulletList({ items, columns }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={columns ? 'grid gap-x-8 gap-y-2.5 sm:grid-cols-2' : 'space-y-2.5'}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
          <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * Project detail view, built on the native <dialog> element: it provides the
 * focus trap, Escape-to-close and an inert page behind it for free.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) {
      dialog.showModal()
      dialog.scrollTop = 0
    } else if (!project && dialog.open) {
      dialog.close()
    }
  }, [project])

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-modal-title"
      onClose={onClose}
      // A click on the dialog element itself (not its content) is a backdrop click.
      onClick={(e) => e.target === ref.current && onClose()}
      className="project-dialog m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto overscroll-contain rounded-2xl border border-border bg-surface p-0 text-body shadow-2xl"
    >
      {project && (
        <div>
          <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-surface/95 px-6 py-5 backdrop-blur md:px-8">
            <div>
              {project.team && (
                <Tag tone="accent" className="mb-2 gap-1">
                  <Users className="size-3" aria-hidden="true" />
                  {project.team}
                </Tag>
              )}
              <h2 id="project-modal-title" tabIndex={-1} autoFocus className="text-xl font-semibold tracking-tight outline-none md:text-2xl">
                {project.name}
              </h2>
              <p className="mt-0.5 text-sm text-muted">{project.tagline}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-bg-subtle hover:text-ink"
              aria-label="Close project details"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </header>

          <div className="px-6 pt-6 pb-8 md:px-8">
            <ProjectLinks links={project.links} projectName={project.name} variant="full" />

            {project.images && project.images.length > 0 && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.images.map((img) => (
                  <img
                    key={img.src}
                    src={`${import.meta.env.BASE_URL}${img.src.replace(/^\//, '')}`}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full rounded-lg border border-border"
                  />
                ))}
              </div>
            )}

            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink">{project.summary}</p>

            <div className="mt-2 grid gap-x-8 md:grid-cols-2">
              <Block title="Problem">
                <p className="text-[0.9375rem] leading-relaxed">{project.problem}</p>
              </Block>
              <Block title="Solution">
                <p className="text-[0.9375rem] leading-relaxed">{project.solution}</p>
              </Block>
            </div>

            <Block title="Architecture">
              <div className="rounded-xl border border-border bg-bg-subtle p-5">
                <FlowVertical steps={project.architecture} />
              </div>
            </Block>

            <Block title="AI integration">
              <BulletList items={project.aiIntegration} />
            </Block>

            <Block title="Key features">
              <BulletList items={project.features} columns />
            </Block>

            <Block title="Technologies">
              <ul className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </Block>

            {project.notes && project.notes.length > 0 && (
              <Block title="Engineering notes">
                <div className="rounded-xl border border-border p-5">
                  <BulletList items={project.notes} />
                </div>
              </Block>
            )}

            {project.role && (
              <p className="mt-8 flex gap-3 rounded-xl bg-accent-soft p-4 text-[0.9375rem] leading-relaxed text-ink">
                <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <span className="font-semibold">My role: </span>
                  {project.role}
                </span>
              </p>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}
