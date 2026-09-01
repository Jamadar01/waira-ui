import { useEffect, useRef } from 'react'

import { Send } from './Icons.jsx'

export default function Composer({ value, onChange, onSend, disabled }) {
  const textareaRef = useRef(null)

  // Grow with the content up to the max-height set in CSS, then scroll.
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  const handleKeyDown = (event) => {
    // Enter sends, Shift+Enter inserts a newline — the convention users expect.
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSend()
    }
  }

  const canSend = value.trim().length > 0 && !disabled

  return (
    <div className="composer">
      <div className="composer__inner">
        <div className="composer__box">
          <textarea
            ref={textareaRef}
            className="composer__input"
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Wajid, or book a time…"
            aria-label="Message"
          />

          <button
            type="button"
            className="send"
            onClick={onSend}
            disabled={!canSend}
            aria-label="Send message"
          >
            <Send size={17} />
          </button>
        </div>

        <p className="composer__hint">
          Waira answers questions about Wajid and handles scheduling — nothing else.
        </p>
      </div>
    </div>
  )
}
