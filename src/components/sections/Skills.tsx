import { skillCategories } from '../../data/skills'
import { Section } from '../layout/Section'
import { Reveal } from '../ui/Reveal'
import { Tag } from '../ui/Tag'

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title="Technical skills"
      description="Technologies I have used in the projects on this page, grouped by area."
    >
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {skillCategories.map((category, i) => {
          const Icon = category.icon
          return (
            <li key={category.id} className="flex">
              <Reveal delay={(i % 4) * 0.06} className="flex w-full">
                <article className="flex w-full flex-col rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-border-strong">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon className="size-[1.125rem]" aria-hidden="true" />
                    </span>
                    <h3 className="text-[0.9375rem] leading-snug font-semibold">{category.title}</h3>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${category.title} skills`}>
                    {category.skills.map((skill) => (
                      <li key={skill}>
                        <Tag>{skill}</Tag>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
