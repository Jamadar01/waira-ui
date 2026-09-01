import { WairaMark } from './Icons.jsx'

/**
 * The brand lockup: the Waira mark in a gradient tile, optionally followed by
 * the wordmark. One component so the sidebar, top bar and welcome screen can
 * never drift apart.
 */
export default function Logo({ size = 30, showName = true, className = '' }) {
  return (
    <span className={`brand${className ? ` ${className}` : ''}`}>
      <span
        className="brand__mark"
        style={{ width: size, height: size, borderRadius: Math.round(size * 0.3) }}
      >
        <WairaMark size={Math.round(size * 0.66)} />
      </span>
      {showName && <span className="brand__name">Waira</span>}
    </span>
  )
}
