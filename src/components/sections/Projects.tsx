import { projects } from '../../data/projects'
import { useProjectHash } from '../../hooks/useProjectHash'
import { Section } from '../layout/Section'
import { ProjectCard } from '../projects/ProjectCard'
import { ProjectModal } from '../projects/ProjectModal'
import { Reveal } from '../ui/Reveal'

export function Projects() {
  const { slug, open, close } = useProjectHash()
  const selected = projects.find((p) => p.slug === slug) ?? null

  const flagship = projects.find((p) => p.flagship)
  const others = projects.filter((p) => p !== flagship)

  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Projects"
      title="Featured projects"
      description="Applications I've built that combine Python backends, data and AI. Open any project for the problem, architecture and implementation details."
      subtle
    >
      {flagship && (
        <Reveal className="mb-5">
          <ProjectCard project={flagship} onOpen={open} />
        </Reveal>
      )}
      <ul className="grid gap-5 md:grid-cols-2">
        {others.map((project, i) => (
          <li key={project.slug}>
            <Reveal delay={(i % 2) * 0.06} className="h-full">
              <ProjectCard project={project} onOpen={open} />
            </Reveal>
          </li>
        ))}
      </ul>

      <ProjectModal project={selected} onClose={close} />
    </Section>
  )
}
