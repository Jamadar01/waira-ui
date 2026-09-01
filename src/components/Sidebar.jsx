import { useMemo, useState } from 'react'

import { Message, Plus, Search, Sparkle } from './Icons.jsx'

export default function Sidebar({ conversations, activeId, onSelect, onNew, open }) {
  const [query, setQuery] = useState('')

  // Filter first, then bucket into the date headings, so empty groups vanish.
  const groups = useMemo(() => {
    const term = query.trim().toLowerCase()
    const matches = term
      ? conversations.filter((c) => c.title.toLowerCase().includes(term))
      : conversations

    return matches.reduce((acc, conv) => {
      ;(acc[conv.group] ||= []).push(conv)
      return acc
    }, {})
  }, [conversations, query])

  return (
    <aside className={`sidebar${open ? ' sidebar--open' : ''}`}>
      <div className="sidebar__top">
        <span className="brand">
          <span className="brand__mark">
            <Sparkle size={17} />
          </span>
          Waira
        </span>
      </div>

      <button type="button" className="btn-new" onClick={onNew}>
        <Plus size={17} />
        New chat
      </button>

      <div className="search">
        <Search size={16} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chats"
          aria-label="Search chats"
        />
      </div>

      <nav className="conv-list" aria-label="Conversations">
        {Object.entries(groups).map(([label, items]) => (
          <div key={label}>
            <p className="nav-label">{label}</p>
            {items.map((conv) => (
              <button
                key={conv.id}
                type="button"
                className={`conv${conv.id === activeId ? ' conv--active' : ''}`}
                onClick={() => onSelect(conv.id)}
                aria-current={conv.id === activeId ? 'page' : undefined}
              >
                <Message size={16} className="conv__icon" />
                <span className="conv__title">{conv.title}</span>
              </button>
            ))}
          </div>
        ))}

        {Object.keys(groups).length === 0 && (
          <p className="nav-label">No chats match “{query}”</p>
        )}
      </nav>
    </aside>
  )
}
