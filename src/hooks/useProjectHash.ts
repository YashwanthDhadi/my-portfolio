import { useCallback, useEffect, useState } from 'react'

const PREFIX = '#project/'

function slugFromHash(): string | null {
  const { hash } = window.location
  return hash.startsWith(PREFIX) ? decodeURIComponent(hash.slice(PREFIX.length)) : null
}

/**
 * Keeps the open project in the URL (#project/<slug>) so a project can be
 * shared as a direct link. The browser Back button closes the project view.
 */
export function useProjectHash() {
  const [slug, setSlug] = useState<string | null>(() => slugFromHash())
  // True when we pushed the history entry ourselves, so closing can go back.
  const [pushed, setPushed] = useState(false)

  useEffect(() => {
    const sync = () => {
      setSlug(slugFromHash())
      setPushed(false)
    }
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  const open = useCallback((next: string) => {
    window.history.pushState(null, '', PREFIX + encodeURIComponent(next))
    setSlug(next)
    setPushed(true)
  }, [])

  const close = useCallback(() => {
    if (pushed) {
      window.history.back() // popstate clears the slug
    } else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
      setSlug(null)
    }
  }, [pushed])

  return { slug, open, close }
}
