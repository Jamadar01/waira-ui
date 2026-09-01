import { Bulb, Code, Pen, Sparkle } from '../components/Icons.jsx'

/**
 * Everything Waira knows, in one place.
 *
 * Waira is deliberately narrow: it answers questions about Wajid and it takes
 * meeting requests or messages. Anything else gets politely turned away by
 * `getReply()` at the bottom of this file.
 */

/**
 * TODO — replace every `TODO` below with your real details before sharing this
 * link. These strings are rendered verbatim in the chat.
 */
export const profile = {
  name: 'Wajid Jamadar',
  title: 'TODO — your role, e.g. Frontend Engineer',
  years: 'TODO — years of experience',
  location: 'TODO — city, and whether you are open to remote',
  status: 'TODO — open to new roles / not looking right now',
  notice: 'TODO — notice period or earliest start date',
  stack: 'TODO — the tools you actually want to be hired for',
  highlights: [
    'TODO — a project or result worth leading with',
    'TODO — a second one',
    'TODO — a third one',
  ],
  email: 'TODO — the address you want recruiters to use',
  links: {
    resume: 'TODO — link to your CV',
    github: 'TODO — github.com/you',
    linkedin: 'TODO — linkedin.com/in/you',
  },
  calendar: 'TODO — your booking link, e.g. cal.com/you',
}

export const suggestions = [
  {
    icon: Sparkle,
    title: 'About Wajid',
    desc: 'Give me a quick summary of Wajid’s background and experience.',
  },
  {
    icon: Code,
    title: 'Skills and stack',
    desc: 'What does Wajid work with day to day?',
  },
  {
    icon: Bulb,
    title: 'Availability',
    desc: 'Is Wajid open to new roles, and when could he start?',
  },
  {
    icon: Pen,
    title: 'Book a time',
    desc: 'Set up a 30-minute intro call with Wajid.',
  },
]

export const conversations = [
  {
    id: 'c1',
    title: 'Wajid’s background',
    group: 'Examples',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Hi — can you tell me a bit about Wajid?',
      },
      {
        id: 'm2',
        role: 'assistant',
        content: `Happy to. Here's the short version:

- **Role** — ${profile.title}
- **Experience** — ${profile.years}
- **Based in** — ${profile.location}
- **Works with** — ${profile.stack}

A few things worth knowing:

${profile.highlights.map((item) => `- ${item}`).join('\n')}

Want the full CV, or shall I set up a time with him?`,
      },
    ],
  },
  {
    id: 'c2',
    title: 'Scheduling an intro call',
    group: 'Examples',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'We have a senior frontend role open. Could we get 30 minutes with him this week?',
      },
      {
        id: 'm2',
        role: 'assistant',
        content: `Yes — Wajid is ${profile.status}.

You can grab a slot directly here: **${profile.calendar}**

If nothing there works, send me three windows that suit you along with your name, company, and the role, and I'll pass them straight to him.`,
      },
    ],
  },
  {
    id: 'c3',
    title: 'Leaving a message',
    group: 'Examples',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Can you just pass along a note instead?',
      },
      {
        id: 'm2',
        role: 'assistant',
        content: `Of course. Type it here and I'll make sure Wajid sees it — include your name, company, and how to reach you.

You can also email him directly at **${profile.email}**.`,
      },
    ],
  },
]

/** The answer for anything Waira isn't built to handle. */
const outOfScope = `I'm only Wajid's profile and scheduling assistant, so that one's outside what I can help with.

Here's what I *can* do:

- Tell you about his **experience, skills, and availability**
- **Book a meeting** with him
- **Pass along a note or message**

Which would you like?`

/**
 * Keyword routing, checked in order — first match wins.
 * Swap this for a real API call and the rest of the app is unchanged.
 */
const routes = [
  {
    keywords: ['meet', 'call', 'interview', 'schedule', 'book', 'slot', 'chat with', 'time with'],
    reply: `Happy to set that up — Wajid is ${profile.status}.

Pick a slot straight from his calendar: **${profile.calendar}**

Prefer to do it by email? Send me a few windows plus your name, company, and the role, and I'll pass them on.`,
  },
  {
    keywords: ['note', 'message', 'tell him', 'pass along', 'contact', 'reach', 'email', 'get in touch'],
    reply: `Go ahead — write it here and I'll make sure Wajid sees it. Please include your name, company, and how to reach you.

Direct email works too: **${profile.email}**`,
  },
  {
    keywords: ['available', 'availability', 'looking', 'open to', 'notice', 'start', 'join', 'relocat', 'remote', 'where is'],
    reply: `- **Status** — ${profile.status}
- **Notice / earliest start** — ${profile.notice}
- **Location** — ${profile.location}

If the timing works on your side, I can get a call in the diary: **${profile.calendar}**`,
  },
  {
    keywords: ['skill', 'stack', 'tech', 'tool', 'language', 'framework', 'code', 'build'],
    reply: `Day to day, Wajid works with **${profile.stack}**.

Some of what he's shipped:

${profile.highlights.map((item) => `- ${item}`).join('\n')}

His code is up at ${profile.links.github} if you'd like to look through it.`,
  },
  {
    keywords: ['resume', 'cv', 'portfolio', 'github', 'linkedin', 'link', 'profile'],
    reply: `Here's everything in one place:

- **CV** — ${profile.links.resume}
- **GitHub** — ${profile.links.github}
- **LinkedIn** — ${profile.links.linkedin}
- **Email** — ${profile.email}`,
  },
  {
    keywords: ['who', 'about', 'background', 'experience', 'tell me', 'summary', 'himself', 'work'],
    reply: `Here's the short version:

- **Role** — ${profile.title}
- **Experience** — ${profile.years}
- **Based in** — ${profile.location}
- **Works with** — ${profile.stack}

${profile.highlights.map((item) => `- ${item}`).join('\n')}

Want his CV, or shall I book you a time with him?`,
  },
]

/** Pick the response for a visitor's message. */
export function getReply(text) {
  const input = text.toLowerCase()
  const hit = routes.find(({ keywords }) => keywords.some((word) => input.includes(word)))
  return hit ? hit.reply : outOfScope
}
