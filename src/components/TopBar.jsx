import ThemeToggle from './ThemeToggle.jsx'
import { Close, ExternalLink, Menu } from './Icons.jsx'
import Logo from './Logo.jsx'

export default function TopBar({
  title,
  theme,
  onToggleTheme,
  onOpenSidebar,
  embedded = false,
  onClose,
  siteUrl,
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
        <>
          {/* Opens the real Waira site in a new tab rather than growing the
              panel. The conversation does not travel with it — the backend
              answers each question on its own, so there is no thread to
              carry over. */}
          {siteUrl && (
            <a
              className="icon-btn"
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the full chat in a new tab"
              title="Open full chat"
            >
              <ExternalLink size={18} />
            </a>
          )}
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close chat">
            <Close size={19} />
          </button>
        </>
      ) : (
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      )}
    </header>
  )
}
