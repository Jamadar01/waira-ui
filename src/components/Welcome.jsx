import { WairaMark } from './Icons.jsx'
import { suggestions } from '../data/seed.js'

export default function Welcome({ onPick }) {
  return (
    <div className="welcome">
      <span className="welcome__mark">
        <WairaMark size={30} />
      </span>

      <h1>Hello, this is Waira — Wajid’s personal assistant</h1>
      <p>I can walk you through Wajid’s background, or get a meeting in the diary.</p>

      <div className="suggestions">
        {suggestions.map(({ icon: Icon, title, desc }) => (
          <button key={title} type="button" className="suggestion" onClick={() => onPick(desc)}>
            <span className="suggestion__icon">
              <Icon size={16} />
            </span>
            <span>
              <span className="suggestion__title">{title}</span>
              <br />
              <span className="suggestion__desc">{desc}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
