import { useState } from 'react'

import MessageContent from './MessageContent.jsx'
import { Check, Copy, Refresh, Sparkle, ThumbDown, ThumbUp } from './Icons.jsx'

export default function MessageItem({ message, isNew }) {
  const [copied, setCopied] = useState(false)
  const [vote, setVote] = useState(null)

  const isUser = message.role === 'user'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard unavailable — leave the button in its idle state.
    }
  }

  return (
    <article
      className={`msg msg--${isUser ? 'user' : 'assistant'}${isNew ? ' msg-enter' : ''}`}
    >
      {!isUser && (
        <span className="avatar">
          <Sparkle size={16} />
        </span>
      )}

      <div className="msg__body">
        {isUser ? (
          <div className="bubble-user">{message.content}</div>
        ) : (
          <>
            <MessageContent content={message.content} />

            <div className="msg__actions">
              <button
                type="button"
                className={`action${copied ? ' action--done' : ''}`}
                onClick={copy}
                aria-label="Copy message"
                title="Copy"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
              <button
                type="button"
                className={`action${vote === 'up' ? ' action--done' : ''}`}
                onClick={() => setVote(vote === 'up' ? null : 'up')}
                aria-pressed={vote === 'up'}
                aria-label="Good response"
                title="Good response"
              >
                <ThumbUp size={15} />
              </button>
              <button
                type="button"
                className={`action${vote === 'down' ? ' action--done' : ''}`}
                onClick={() => setVote(vote === 'down' ? null : 'down')}
                aria-pressed={vote === 'down'}
                aria-label="Bad response"
                title="Bad response"
              >
                <ThumbDown size={15} />
              </button>
              <button type="button" className="action" aria-label="Regenerate" title="Regenerate">
                <Refresh size={15} />
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  )
}
