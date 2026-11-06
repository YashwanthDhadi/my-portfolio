import type { LucideIcon } from 'lucide-react'

export interface Profile {
  name: string
  /** Main hero headline. */
  headline: string
  /** Professional title shown under the headline. */
  title: string
  /** Short hero introduction. */
  intro: string
  /** Optional availability line in the hero. Set to undefined to hide it. */
  status?: string
  location: string
  email: string
  /** Display format, e.g. "+91 95025 42919". */
  phone: string
  /** E.164 format for the tel: link, e.g. "+919502542919". */
  phoneE164: string
  github: string
  linkedin: string
  resume: {
    /** Path under /public. Replace the file to update every download link. */
    url: string
    /** File name suggested to the browser when downloading. */
    downloadName: string
  }
  /** About section paragraphs. */
  about: string[]
  focusAreas: string[]
}

export interface SkillCategory {
  id: string
  title: string
  icon: LucideIcon
  skills: string[]
}

export interface ProjectLink {
  label: string
  href: string
  kind: 'github' | 'live' | 'demo' | 'docs'
}

export interface ArchitectureStep {
  title: string
  detail: string
}

export interface Project {
  /** Used in the shareable URL: #project/<slug> */
  slug: string
  name: string
  /** Short descriptor shown under the name. */
  tagline: string
  /** One to two sentence summary for the card. */
  summary: string
  /** The flagship project is shown as a full-width card. */
  flagship?: boolean
  /** Shown as a badge, e.g. "Team project · Team VoxMind". Omit for solo work. */
  team?: string
  /** Short facts taken from the repository (no invented metrics). */
  highlights: string[]
  problem: string
  solution: string
  architecture: ArchitectureStep[]
  aiIntegration: string[]
  features: string[]
  /** Short tags shown on the card (first few) and in full in the detail view. */
  tech: string[]
  /** Honest limitations or notes, shown in the detail view. */
  notes?: string[]
  /** What I did. Omit to hide the line. */
  role?: string
  links: ProjectLink[]
  /** Optional screenshots, e.g. { src: 'images/projects/name.png', alt: '…' }. Files go in public/images/projects/. */
  images?: { src: string; alt: string }[]
}

export interface Achievement {
  title: string
  context: string
  date: string
  description?: string
  kind: 'award' | 'certification'
  link?: { label: string; href: string }
}

export interface ExperienceItem {
  role: string
  organization: string
  period: string
  location?: string
  points: string[]
  tech?: string[]
}

export interface EducationItem {
  qualification: string
  institution: string
  location?: string
  period?: string
  score?: string
  /** The primary entry is shown as the large card. */
  primary?: boolean
}
