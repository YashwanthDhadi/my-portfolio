import { m } from 'motion/react'
import { ArrowRight, Download, MapPin } from 'lucide-react'
import photo352 from '../../assets/images/profile-352.webp'
import photo640 from '../../assets/images/profile-640.webp'
import { profile } from '../../data/profile'
import { LinkButton } from '../ui/Button'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Container } from '../layout/Section'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
})

const socialLink =
  'inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface text-body shadow-card transition-colors hover:border-border-strong hover:text-ink'

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Faint dot grid, faded out towards the edges. Decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(var(--color-dots)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_65%)] opacity-60"
      />
      <Container className="grid items-center gap-10 pt-10 pb-16 md:pt-16 md:pb-24 lg:grid-cols-12 lg:gap-12 lg:pt-20 lg:pb-28">
        <m.div {...fadeUp(0.1)} className="flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <img
            src={photo640}
            srcSet={`${photo352} 352w, ${photo640} 640w`}
            sizes="(min-width: 1024px) 320px, 176px"
            width={320}
            height={320}
            alt="Portrait of Yashwanth Dhadi"
            fetchPriority="high"
            className="size-44 rounded-full shadow-[var(--shadow-photo)] lg:size-80"
          />
        </m.div>

        <div className="text-center lg:order-1 lg:col-span-7 lg:text-left">
          {profile.status && (
            <m.p
              {...fadeUp(0)}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-body shadow-card"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-success" />
              </span>
              {profile.status}
            </m.p>
          )}

          <m.h1
            {...fadeUp(0.05)}
            id="hero-title"
            className="text-[2.5rem] leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </m.h1>

          <m.p
            {...fadeUp(0.1)}
            className="mt-4 text-xl leading-snug font-medium tracking-tight text-balance text-ink-soft sm:text-2xl lg:text-[1.75rem]"
          >
            {profile.headline}
          </m.p>

          <m.p {...fadeUp(0.15)} className="mt-4 font-mono text-[0.8125rem] font-medium text-accent sm:text-sm">
            {profile.title}
          </m.p>

          <m.p
            {...fadeUp(0.2)}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-body sm:text-[1.0625rem] lg:mx-0"
          >
            {profile.intro}
          </m.p>

          <m.div {...fadeUp(0.25)} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <LinkButton href="#projects">
              View Projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href={profile.resume.url} download={profile.resume.downloadName} variant="secondary">
              <Download className="size-4" aria-hidden="true" />
              Download Resume
            </LinkButton>
          </m.div>

          <m.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={socialLink} aria-label="GitHub profile">
              <GitHubIcon className="size-[1.125rem]" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={socialLink} aria-label="LinkedIn profile">
              <LinkedInIcon className="size-[1.125rem]" />
            </a>
            <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-4" aria-hidden="true" />
              {profile.location}
            </span>
          </m.div>
        </div>
      </Container>
    </section>
  )
}
