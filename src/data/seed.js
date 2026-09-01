import { Bulb, Code, Pen, Sparkle } from '../components/Icons.jsx'

/**
 * Static UI content only.
 *
 * Every fact about Wajid — background, availability, scheduling — comes from
 * the agent at `POST /agent`, so nothing about him is duplicated here.
 */

/** The starter prompts on the welcome screen. */
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
