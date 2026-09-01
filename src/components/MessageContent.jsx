import { useState } from 'react'

import { Check, Copy } from './Icons.jsx'

/**
 * A deliberately small markdown renderer — fenced code blocks, paragraphs,
 * bullet lists, `inline code` and **bold**. Enough to make the template read
 * like a real chat without pulling in a parser.
 *
 * Because it only ever emits text into elements (never HTML), there's no
 * injection surface here.
 */

const FENCE = /```(\w*)\n([\s\S]*?)```/g
const INLINE = /(`[^`]+`|\*\*[^*]+\*\*)/g

function Inline({ text }) {
  return text.split(INLINE).map((chunk, i) => {
    if (chunk.startsWith('`') && chunk.endsWith('`')) {
      return <code key={i}>{chunk.slice(1, -1)}</code>
    }
    if (chunk.startsWith('**') && chunk.endsWith('**')) {
      return <strong key={i}>{chunk.slice(2, -2)}</strong>
    }
    return chunk
  })
}

function CodeBlock({ lang, code }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard blocked (insecure origin, denied permission) — no-op.
    }
  }

  return (
    <div className="codeblock">
      <div className="codeblock__bar">
        <span>{lang || 'code'}</span>
        <button type="button" className="codeblock__copy" onClick={copy}>
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

/** Paragraphs and bullet lists within one non-code segment. */
function Prose({ text }) {
  return text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, i) => {
      const lines = block.split('\n')

      if (lines.every((line) => /^[-*]\s/.test(line.trim()))) {
        return (
          <ul key={i}>
            {lines.map((line, j) => (
              <li key={j}>
                <Inline text={line.trim().replace(/^[-*]\s/, '')} />
              </li>
            ))}
          </ul>
        )
      }

      if (lines.every((line) => /^\d+\.\s/.test(line.trim()))) {
        return (
          <ol key={i}>
            {lines.map((line, j) => (
              <li key={j}>
                <Inline text={line.trim().replace(/^\d+\.\s/, '')} />
              </li>
            ))}
          </ol>
        )
      }

      return (
        <p key={i}>
          <Inline text={block} />
        </p>
      )
    })
}

export default function MessageContent({ content }) {
  const parts = []
  let cursor = 0
  let match

  FENCE.lastIndex = 0
  while ((match = FENCE.exec(content)) !== null) {
    if (match.index > cursor) {
      parts.push({ type: 'prose', value: content.slice(cursor, match.index) })
    }
    parts.push({ type: 'code', lang: match[1], value: match[2] })
    cursor = FENCE.lastIndex
  }
  if (cursor < content.length) {
    parts.push({ type: 'prose', value: content.slice(cursor) })
  }

  return parts.map((part, i) =>
    part.type === 'code' ? (
      <CodeBlock key={i} lang={part.lang} code={part.value} />
    ) : (
      <Prose key={i} text={part.value} />
    ),
  )
}
