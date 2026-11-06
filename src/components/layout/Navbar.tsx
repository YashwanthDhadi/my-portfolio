import { AnimatePresence, m } from 'motion/react'
import { Download, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { navItems } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../lib/cn'
import { LinkButton } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Container } from './Section'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // 'home' is the hero: when it is in view, no nav link is highlighted.
  const active = useActiveSection(['home', ...navItems.map((item) => item.id)])
  // Section to scroll to once the mobile menu has finished collapsing.
  const pendingScroll = useRef<string | null>(null)

  // The open menu is part of the sticky header and pushes the page down, so
  // scrolling while it collapses lands in the wrong place (or is cancelled).
  // Close first, then scroll in onExitComplete.
  const onMobileLinkClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    pendingScroll.current = id
    setMenuOpen(false)
  }

  const scrollToPending = () => {
    const id = pendingScroll.current
    pendingScroll.current = null
    if (!id) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
    window.history.pushState(null, '', `#${id}`)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu with Escape, or when the viewport grows past mobile.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    const mq = window.matchMedia('(min-width: 768px)')
    const onResize = () => mq.matches && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onResize)
    }
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200',
        solid ? 'border-b border-border bg-bg/85 backdrop-blur-md' : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" className="text-[0.9375rem] font-semibold tracking-tight text-ink" aria-label="Yashwanth Dhadi, back to top">
          Yashwanth Dhadi
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm transition-colors',
                    active === item.id ? 'font-medium text-accent' : 'text-body hover:text-ink',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Wrapper controls visibility: the button's own inline-flex would override `hidden`. */}
          <div className="hidden sm:block">
            <LinkButton href={profile.resume.url} download={profile.resume.downloadName} variant="secondary" size="sm">
              <Download className="size-4" aria-hidden="true" />
              Resume
            </LinkButton>
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-ink hover:bg-bg-subtle md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <AnimatePresence onExitComplete={scrollToPending}>
        {menuOpen && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="overflow-hidden border-t border-border bg-bg md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Container className="py-3">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => onMobileLinkClick(e, item.id)}
                      aria-current={active === item.id ? 'true' : undefined}
                      className={cn(
                        'block rounded-md px-2 py-3 text-base',
                        active === item.id ? 'font-medium text-accent' : 'text-body',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <LinkButton
                href={profile.resume.url}
                download={profile.resume.downloadName}
                variant="primary"
                className="mt-3 mb-2 w-full"
                onClick={() => setMenuOpen(false)}
              >
                <Download className="size-4" aria-hidden="true" />
                Download Resume
              </LinkButton>
            </Container>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
