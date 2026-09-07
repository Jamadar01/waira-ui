import { useCallback, useEffect, useRef, useState } from 'react'

import App from './App.jsx'
import { WairaMark } from './components/Icons.jsx'

/**
 * The embeddable form of Waira: a launcher button that opens the chat in a
 * floating panel.
 *
 * The chat itself is the same <App /> the standalone site renders — passing
 * `embedded` drops the sidebar and the theme toggle, both of which belong to a
 * full page rather than a 400px panel. Nothing here duplicates the message
 * logic, so the panel can never drift from the hosted app.
 */
export default function ChatWidget({ label = 'Ask about Wajid' }) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  // The chat mounts on first open and stays mounted after that, so closing the
  // panel does not throw away the conversation.
  const [everOpened, setEverOpened] = useState(false)

  const panelRef = useRef(null)
  const launcherRef = useRef(null)

  const close = useCallback(() => {
    setOpen(false)
    // Reopen small. Full view is a deliberate act, not a mode to get stuck in.
    setExpanded(false)
    // Send focus back where it came from, or the keyboard user is stranded at
    // the top of the host page.
    launcherRef.current?.focus()
  }, [])

  const toggle = () => {
    setEverOpened(true)
    setOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        close()
      }
    }

    // Listen on the panel, not the document: the host page has its own key
    // handlers and Escape inside the chat is none of its business.
    const el = panelRef.current
    el?.addEventListener('keydown', onKeyDown)
    return () => el?.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  return (
    <>
      {everOpened && (
        <div
          ref={panelRef}
          className={`waira-panel${expanded ? ' waira-panel--full' : ''}`}
          role="dialog"
          aria-label="Chat with Waira"
          hidden={!open}
        >
          <App
            embedded
            onClose={close}
            expanded={expanded}
            onToggleExpand={() => setExpanded((prev) => !prev)}
          />
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        className={`waira-launcher${open ? ' waira-launcher--hidden' : ''}`}
        onClick={toggle}
        aria-expanded={open}
        aria-label={label}
        title={label}
      >
        <WairaMark size={26} />
      </button>
    </>
  )
}
