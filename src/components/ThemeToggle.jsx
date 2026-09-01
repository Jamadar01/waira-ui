import { Moon, Sun } from './Icons.jsx'

/**
 * Light/dark switch. The knob position is driven purely by `[data-theme]` in
 * CSS, so the animation stays in sync even if the theme changes elsewhere.
 */
export default function ThemeToggle({ theme, onToggle }) {
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <span className="theme-toggle__knob" />
      <span className="theme-toggle__icons">
        <Sun size={14} className="theme-toggle__sun" />
        <Moon size={14} className="theme-toggle__moon" />
      </span>
    </button>
  )
}
