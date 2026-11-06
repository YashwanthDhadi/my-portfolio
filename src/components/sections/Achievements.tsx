import { Award, Briefcase, Trophy, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { achievements } from '../../data/achievements'
import { experience } from '../../data/experience'
import { Section } from '../layout/Section'
import { Reveal } from '../ui/Reveal'
import { Tag } from '../ui/Tag'

function TimelineItem({ icon: Icon, children, last }: { icon: LucideIcon; children: ReactNode; last: boolean }) {
  return (
    <li className="relative flex gap-5 pb-8 last:pb-0">
      {!last && <span className="absolute top-10 bottom-0 left-[1.1875rem] w-px bg-border" aria-hidden="true" />}
      <span className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-accent shadow-card">
        <Icon className="size-[1.125rem]" aria-hidden="true" />
      </span>
      <div className="flex-1 rounded-xl border border-border bg-surface p-5 shadow-card">{children}</div>
    </li>
  )
}

export function Achievements() {
  const hasExperience = experience.length > 0
  const total = experience.length + achievements.length

  return (
    <Section
      id="achievements"
      index="04"
      eyebrow={hasExperience ? 'Experience' : 'Achievements'}
      title={hasExperience ? 'Experience & achievements' : 'Achievements & certifications'}
    >
      <Reveal className="max-w-3xl">
        <ol>
          {experience.map((item, i) => (
            <TimelineItem key={`${item.organization}-${item.role}`} icon={Briefcase} last={i === total - 1}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold">{item.role}</h3>
                <span className="font-mono text-xs text-muted">{item.period}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted">
                {item.organization}
                {item.location && ` · ${item.location}`}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.9375rem] marker:text-border-strong">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {item.tech && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </TimelineItem>
          ))}

          {achievements.map((item, i) => (
            <TimelineItem
              key={item.title}
              icon={item.kind === 'award' ? Trophy : Award}
              last={experience.length + i === total - 1}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <span className="font-mono text-xs text-muted">{item.date}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{item.context}</p>
              {item.description && <p className="mt-3 text-[0.9375rem] leading-relaxed">{item.description}</p>}
              {item.link && (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-accent hover:text-accent-hover"
                >
                  {item.link.label} ↗
                </a>
              )}
            </TimelineItem>
          ))}
        </ol>
      </Reveal>
    </Section>
  )
}
