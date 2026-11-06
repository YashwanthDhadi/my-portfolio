import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import { useEffect, useState, type ComponentType, type SVGProps } from 'react'
import { profile } from '../../data/profile'
import { Section } from '../layout/Section'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { Reveal } from '../ui/Reveal'

interface ContactMethod {
  label: string
  value: string
  href: string
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>
  external?: boolean
  copy?: string
}

const methods: ContactMethod[] = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail, copy: profile.email },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phoneE164}`, icon: Phone, copy: profile.phone },
  { label: 'LinkedIn', value: 'in/yashwanthdhadi', href: profile.linkedin, icon: LinkedInIcon, external: true },
  { label: 'GitHub', value: 'YashwanthDhadi', href: profile.github, icon: GitHubIcon, external: true },
]

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  // Hidden where the Clipboard API is unavailable (e.g. non-HTTPS origins).
  if (typeof navigator === 'undefined' || !navigator.clipboard) return null

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).then(
          () => setCopied(true),
          () => setCopied(false),
        )
      }}
      className="relative z-10 inline-flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-bg-subtle hover:text-ink"
      aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
    >
      {copied ? <Check className="size-4 text-success" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied to clipboard` : ''}
      </span>
    </button>
  )
}

export function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Contact"
      title="Contact me"
      description="I'm open to internships, graduate roles and collaborations in Python backend and AI application development. The quickest way to reach me is by email."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {methods.map((m, i) => {
          const Icon = m.icon
          return (
            <li key={m.label}>
              <Reveal delay={(i % 2) * 0.06}>
                <div className="group relative flex items-center gap-4 rounded-xl border border-border bg-surface p-5 shadow-card transition-[border-color,box-shadow] hover:border-border-strong hover:shadow-card-hover">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium tracking-wide text-muted uppercase">{m.label}</p>
                    <a
                      href={m.href}
                      {...(m.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="mt-0.5 block truncate text-[0.9375rem] font-medium text-ink after:absolute after:inset-0 after:rounded-xl after:content-[''] group-hover:text-accent"
                      aria-label={m.external ? `${m.label}: ${m.value} (opens in a new tab)` : `${m.label}: ${m.value}`}
                    >
                      {m.value}
                    </a>
                  </div>
                  {m.copy ? (
                    <CopyButton text={m.copy} label={m.label} />
                  ) : (
                    <ArrowUpRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" aria-hidden="true" />
                  )}
                </div>
              </Reveal>
            </li>
          )
        })}
      </ul>

      <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
        <MapPin className="size-4" aria-hidden="true" />
        Based in {profile.location}
      </p>
    </Section>
  )
}
