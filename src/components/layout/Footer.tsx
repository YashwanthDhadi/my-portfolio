import { ArrowUp, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Container } from './Section'

const YEAR = new Date().getFullYear()

const iconLink = 'inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-bg-subtle hover:text-ink'

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted">
          © {YEAR} {profile.name} · Built with React &amp; TypeScript
        </p>
        <div className="flex items-center gap-1">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub profile">
            <GitHubIcon className="size-[1.125rem]" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="LinkedIn profile">
            <LinkedInIcon className="size-[1.125rem]" />
          </a>
          <a href={`mailto:${profile.email}`} className={iconLink} aria-label={`Email ${profile.email}`}>
            <Mail className="size-[1.125rem]" aria-hidden="true" />
          </a>
          <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
          <a href="#top" className={iconLink} aria-label="Back to top">
            <ArrowUp className="size-[1.125rem]" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
