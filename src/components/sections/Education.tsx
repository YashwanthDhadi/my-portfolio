import { GraduationCap } from 'lucide-react'
import { education } from '../../data/education'
import { Section } from '../layout/Section'
import { Reveal } from '../ui/Reveal'

export function Education() {
  const primary = education.find((e) => e.primary)
  const secondary = education.filter((e) => !e.primary)

  return (
    <Section id="education" index="05" eyebrow="Education" title="Education" subtle>
      {primary && (
        <Reveal>
          <article className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 shadow-card sm:flex-row sm:items-center md:p-8">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <GraduationCap className="size-6" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">{primary.qualification}</h3>
              <p className="mt-1 text-[0.9375rem] text-body">
                {primary.institution}
                {primary.location && `, ${primary.location}`}
              </p>
            </div>
            <div className="flex gap-6 sm:flex-col sm:items-end sm:gap-1 sm:text-right">
              {primary.period && <p className="font-mono text-sm text-muted">{primary.period}</p>}
              {primary.score && <p className="text-base font-semibold text-accent">{primary.score}</p>}
            </div>
          </article>
        </Reveal>
      )}

      {secondary.length > 0 && (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {secondary.map((item, i) => (
            <li key={item.qualification}>
              <Reveal delay={i * 0.06}>
                <article className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4 shadow-card">
                  <div>
                    <h3 className="text-[0.9375rem] font-semibold">{item.qualification}</h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {item.institution}
                      {item.location && `, ${item.location}`}
                    </p>
                  </div>
                  {item.score && <p className="shrink-0 font-mono text-sm text-body">{item.score}</p>}
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
