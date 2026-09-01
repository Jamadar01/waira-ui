import { useEffect, useRef, useState } from 'react'

import Composer from './components/Composer.jsx'
import MessageItem from './components/MessageItem.jsx'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import Welcome from './components/Welcome.jsx'
import { Sparkle } from './components/Icons.jsx'
import { useTheme } from './hooks/useTheme.js'
import { conversations as seedConversations, getReply } from './data/seed.js'

let idCounter = 0
const nextId = (prefix) => `${prefix}-${Date.now()}-${idCounter++}`

export default function App() {
  const { theme, toggleTheme } = useTheme()

  const [chats, setChats] = useState(seedConversations)
  const [activeId, setActiveId] = useState(seedConversations[0].id)
  const [draft, setDraft] = useState('')
  const [pending, setPending] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const threadRef = useRef(null)
  const replyTimer = useRef(null)
  // Only the turn we just added animates in; history renders instantly.
  const newestId = useRef(null)

  const active = chats.find((chat) => chat.id === activeId) ?? chats[0]

  // Keep the newest turn in view as messages arrive.
  useEffect(() => {
    const el = threadRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [active?.messages.length, pending, activeId])

  useEffect(() => () => clearTimeout(replyTimer.current), [])

  const patchActive = (updater) => {
    setChats((prev) => prev.map((chat) => (chat.id === activeId ? updater(chat) : chat)))
  }

  const handleSend = () => {
    const text = draft.trim()
    if (!text || pending) return

    const message = { id: nextId('u'), role: 'user', content: text }
    newestId.current = message.id

    patchActive((chat) => ({
      ...chat,
      // A fresh chat takes its name from the opening message.
      title: chat.messages.length === 0 ? text.slice(0, 42) : chat.title,
      messages: [...chat.messages, message],
    }))

    setDraft('')
    setPending(true)

    // Stand-in for a real request. Swap this block for your API call.
    replyTimer.current = setTimeout(() => {
      const reply = {
        id: nextId('a'),
        role: 'assistant',
        content: getReply(text),
      }
      newestId.current = reply.id

      patchActive((chat) => ({ ...chat, messages: [...chat.messages, reply] }))
      setPending(false)
    }, 1200)
  }

  const handleNewChat = () => {
    clearTimeout(replyTimer.current)
    setPending(false)

    const chat = { id: nextId('c'), title: 'New chat', group: 'Today', messages: [] }
    setChats((prev) => [chat, ...prev])
    setActiveId(chat.id)
    setDraft('')
    setSidebarOpen(false)
  }

  const handleSelect = (id) => {
    clearTimeout(replyTimer.current)
    setPending(false)
    setActiveId(id)
    setSidebarOpen(false)
  }

  const isEmpty = active.messages.length === 0 && !pending

  return (
    <div className="app">
      <Sidebar
        conversations={chats}
        activeId={active.id}
        onSelect={handleSelect}
        onNew={handleNewChat}
        open={sidebarOpen}
      />

      {sidebarOpen && (
        <div
          className="backdrop"
          onClick={() => setSidebarOpen(false)}
          role="presentation"
        />
      )}

      <main className="main">
        <TopBar
          title={active.title}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <div className="thread" ref={threadRef}>
          {isEmpty ? (
            <Welcome onPick={setDraft} />
          ) : (
            <div className="thread__inner">
              {active.messages.map((message) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  isNew={message.id === newestId.current}
                />
              ))}

              {pending && (
                <div className="msg msg--assistant">
                  <span className="avatar">
                    <Sparkle size={16} />
                  </span>
                  <div className="msg__body">
                    <div className="typing" aria-label="Waira is typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <Composer value={draft} onChange={setDraft} onSend={handleSend} disabled={pending} />
      </main>
    </div>
  )
}
