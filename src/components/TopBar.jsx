import ThemeToggle from './ThemeToggle.jsx'
import { Menu } from './Icons.jsx'

export default function TopBar({ title, theme, onToggleTheme, onOpenSidebar }) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="icon-btn only-mobile"
        onClick={onOpenSidebar}
        aria-label="Open sidebar"
      >
        <Menu size={19} />
      </button>

      <h1 className="topbar__title">{title}</h1>

      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}
