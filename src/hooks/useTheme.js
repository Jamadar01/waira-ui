import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'waira-theme'

/** Read whatever the inline script in index.html already resolved. */
function currentTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

/**
 * Owns the light/dark state.
 *
 * The theme lives on `<html data-theme>` rather than in React state alone, so
 * plain CSS can do all the actual work — see src/styles/theme.css.
 */
export function useTheme() {
  const [theme, setTheme] = useState(currentTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Private browsing / storage disabled — the theme still applies, it just
      // won't survive a reload.
    }
  }, [theme])

  // Follow the OS while the user hasn't made an explicit choice.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event) => {
      let stored = null
      try {
        stored = localStorage.getItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
      if (!stored) setTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, setTheme, toggleTheme }
}
