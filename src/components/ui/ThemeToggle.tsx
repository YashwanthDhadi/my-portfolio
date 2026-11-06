import { AnimatePresence, m } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

/** Light/dark switch shown in the navbar. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light theme' : 'Dark theme'}
      className="relative inline-flex size-9 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface text-body shadow-card transition-colors hover:border-border-strong hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.18 }}
          className="inline-flex"
        >
          {dark ? <Sun className="size-[1.0625rem]" aria-hidden="true" /> : <Moon className="size-[1.0625rem]" aria-hidden="true" />}
        </m.span>
      </AnimatePresence>
    </button>
  )
}
