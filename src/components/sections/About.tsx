import { GraduationCap, MapPin, Target } from 'lucide-react'
import { education } from '../../data/education'
import { profile } from '../../data/profile'
import { Section } from '../layout/Section'
import { Reveal } from '../ui/Reveal'

export function About() {
  const degree = education.find((e) => e.primary)

  return (
    <Section id="about" index="01" eyebrow="About" title="Software first, with AI where it earns its place" subtle>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="space-y-5 text-base leading-relaxed md:text-[1.0625rem] lg:col-span-7">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <aside className="rounded-xl border border-border bg-surface p-6 shadow-card" aria-label="Focus areas and quick facts">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Target className="size-4 text-accent" aria-hidden="true" />
              Focus areas
            </h3>
            <ul className="mt-4 space-y-2.5">
              {profile.focusAreas.map((area) => (
                <li key={area} className="flex items-start gap-3 text-[0.9375rem]">
                  <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {area}
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
              {degree && (
                <div className="flex items-start gap-3">
                  <dt>
                    <GraduationCap className="mt-0.5 size-4 text-muted" aria-label="Education" />
                  </dt>
                  <dd>
                    B.Tech, AI &amp; ML · Class of {degree.period?.split('–').pop()?.trim()}
                    {degree.score && <span className="text-muted"> · {degree.score}</span>}
                  </dd>
                </div>
              )}
              <div className="flex items-start gap-3">
                <dt>
                  <MapPin className="mt-0.5 size-4 text-muted" aria-label="Location" />
                </dt>
                <dd>{profile.location}</dd>
              </div>
            </dl>
          </aside>
        </Reveal>
      </div>
    </Section>
  )
}
