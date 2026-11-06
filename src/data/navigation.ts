import { experience } from './experience'

export interface NavItem {
  id: string
  label: string
}

/** Section order on the page. Each id must match a <Section id>. */
export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: experience.length > 0 ? 'Experience' : 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
