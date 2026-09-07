/**
 * Widget entry point — the file the host page loads.
 *
 * Built by vite.widget.config.js into a single self-contained script:
 *
 *   <script src="https://.../waira-widget.js" defer></script>
 *
 * Everything renders inside a shadow root. That is not decoration: this widget
 * is meant to sit on pages with their own global CSS, and Waira's stylesheets
 * are unscoped (`.app`, `.thread`, `* { margin: 0 }`, `body { overflow:
 * hidden }`). A shadow root makes the isolation mutual — the host page cannot
 * restyle the chat, and the chat cannot break the host page's layout.
 *
 * The one thing that does cross the boundary is the theme, deliberately: the
 * widget follows whatever `<html data-theme>` the host page is using.
 */

import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

// `?inline` hands us the CSS as a string instead of letting Vite inject it
// into <head>, where it would apply to the host page instead of the widget.
import themeCss from './styles/theme.css?inline'
import baseCss from './styles/base.css?inline'
import appCss from './styles/app.css?inline'
import widgetCss from './styles/widget.css?inline'

import ChatWidget from './ChatWidget.jsx'

const HOST_ID = 'waira-widget-host'

/**
 * Read config off the <script> tag that loaded us.
 *
 * `document.currentScript` is only set while the script is first evaluating,
 * so this has to run at module top level — not inside mount().
 */
const script = document.currentScript
const config = {
  label: script?.dataset.label || 'Ask about Wajid',
  theme: script?.dataset.theme || 'auto',
}

/** Mirror the host page's theme onto the widget, and keep following it. */
function followTheme(root, mode) {
  if (mode === 'light' || mode === 'dark') {
    root.dataset.theme = mode
    return () => {}
  }

  const read = () =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

  const apply = () => {
    root.dataset.theme = read()
  }

  apply()

  // The portfolio's theme toggle writes `data-theme` on <html>; watching the
  // attribute means the widget follows it without either side importing the
  // other's code.
  const observer = new MutationObserver(apply)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  return () => observer.disconnect()
}

function mount() {
  // Guard against the script being included twice — a real possibility once a
  // tag lives in a template someone else edits.
  if (document.getElementById(HOST_ID)) return

  const host = document.createElement('div')
  host.id = HOST_ID
  document.body.appendChild(host)

  const shadow = host.attachShadow({ mode: 'open' })

  const style = document.createElement('style')
  // theme.css first: everything downstream reads its custom properties.
  style.textContent = [themeCss, baseCss, appCss, widgetCss].join('\n')
  shadow.appendChild(style)

  // `.waira-root` is this tree's stand-in for <body>: it carries `data-theme`,
  // which is what theme.css keys its `[data-theme='…']` blocks off.
  const root = document.createElement('div')
  root.className = 'waira-root'
  shadow.appendChild(root)

  followTheme(root, config.theme)

  // createElement rather than JSX so this stays a plain .js entry point.
  createRoot(root).render(createElement(ChatWidget, { label: config.label }))
}

// `defer` already guarantees a parsed document, but the tag may also be pasted
// into <head> without it, and then <body> does not exist yet.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount, { once: true })
} else {
  mount()
}
