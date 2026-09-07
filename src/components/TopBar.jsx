import ThemeToggle from './ThemeToggle.jsx'
import { Close, Menu } from './Icons.jsx'
import Logo from './Logo.jsx'

export default function TopBar({
  title,
  theme,
  onToggleTheme,
  onOpenSidebar,
  embedded = false,
  onClose,
}) {
  return (
    <header className="topbar">
      {!embedded && (
        <button
          type="button"
          className="icon-btn only-mobile"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <Menu size={19} />
        </button>
      )}

      <Logo size={26} className="topbar__brand" />

      <span className="topbar__sep" aria-hidden="true" />

      <h1 className="topbar__title">{title}</h1>

      {/* The widget follows the host page's theme, so it has nothing of its
          own to toggle — it gets a way out of the panel instead. */}
      {embedded ? (
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Close chat">
          <Close size={19} />
        </button>
      ) : (
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      )}
    </header>
  )
}
