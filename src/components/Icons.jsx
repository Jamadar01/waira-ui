/**
 * Inline stroke icons (24x24 grid, currentColor). Kept in one file so the
 * template has no icon-library dependency.
 */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Icon({ size = 18, children, ...rest }) {
  return (
    <svg width={size} height={size} {...base} {...rest} aria-hidden="true">
      {children}
    </svg>
  )
}

export const Sparkle = (p) => (
  <Icon {...p}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
    <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
  </Icon>
)

export const Plus = (p) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
)

export const Search = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.2-3.2" />
  </Icon>
)

export const Message = (p) => (
  <Icon {...p}>
    <path d="M20 15a2 2 0 0 1-2 2H8l-4 3V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9z" />
  </Icon>
)

export const Send = (p) => (
  <Icon {...p}>
    <path d="M4.5 11.5L19 5l-6.5 14.5-1.8-6.2-6.2-1.8z" />
  </Icon>
)

export const Paperclip = (p) => (
  <Icon {...p}>
    <path d="M20 11.5l-7.8 7.8a4.5 4.5 0 1 1-6.4-6.4l8-8a3 3 0 0 1 4.3 4.3l-8 8a1.5 1.5 0 0 1-2.2-2.2l7.3-7.3" />
  </Icon>
)

export const Mic = (p) => (
  <Icon {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </Icon>
)

export const Copy = (p) => (
  <Icon {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h8" />
  </Icon>
)

export const Check = (p) => (
  <Icon {...p}>
    <path d="M20 6L9 17l-5-5" />
  </Icon>
)

export const ThumbUp = (p) => (
  <Icon {...p}>
    <path d="M7 21V10l4.5-7a2 2 0 0 1 3 2.3L13.5 9H19a2 2 0 0 1 2 2.4l-1.5 7A2 2 0 0 1 17.5 20H7z" />
    <path d="M7 10H4v11h3" />
  </Icon>
)

export const ThumbDown = (p) => (
  <Icon {...p}>
    <path d="M17 3v11l-4.5 7a2 2 0 0 1-3-2.3l1-3.7H5a2 2 0 0 1-2-2.4l1.5-7A2 2 0 0 1 6.5 4H17z" />
    <path d="M17 14h3V3h-3" />
  </Icon>
)

export const Refresh = (p) => (
  <Icon {...p}>
    <path d="M20 11a8 8 0 1 0-1.2 5" />
    <path d="M20 5v6h-6" />
  </Icon>
)

export const Sun = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
  </Icon>
)

export const Moon = (p) => (
  <Icon {...p}>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z" />
  </Icon>
)

export const Menu = (p) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
)

export const Share = (p) => (
  <Icon {...p}>
    <circle cx="18" cy="5" r="2.6" />
    <circle cx="6" cy="12" r="2.6" />
    <circle cx="18" cy="19" r="2.6" />
    <path d="M8.3 10.8l7.4-4.3M8.3 13.2l7.4 4.3" />
  </Icon>
)

export const Chevron = (p) => (
  <Icon {...p}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
)

export const Code = (p) => (
  <Icon {...p}>
    <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
  </Icon>
)

export const Pen = (p) => (
  <Icon {...p}>
    <path d="M4 20l4.5-1 10-10a2.5 2.5 0 0 0-3.5-3.5l-10 10L4 20z" />
  </Icon>
)

export const Bulb = (p) => (
  <Icon {...p}>
    <path d="M9.5 18h5M10 21h4" />
    <path d="M12 3a6 6 0 0 1 3.5 10.9c-.6.5-.9 1-.9 1.7v.4h-5.2v-.4c0-.7-.3-1.2-.9-1.7A6 6 0 0 1 12 3z" />
  </Icon>
)

/**
 * The Waira mark — a friendly robot head whose smile is a "W", tying the
 * assistant back to Wajid. Mixes fills and strokes, so it builds its own
 * <svg> instead of going through `Icon`.
 */
export const WairaMark = ({ size = 18, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {/* Antenna */}
    <circle cx="12" cy="2.5" r="1.2" fill="currentColor" stroke="none" />
    <path d="M12 3.9v1.9" />
    {/* Head */}
    <rect x="4" y="5.8" width="16" height="12.5" rx="4.4" />
    {/* Ears */}
    <path d="M2.2 11.3v2.5M21.8 11.3v2.5" />
    {/* Eyes */}
    <circle cx="9.2" cy="11" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="14.8" cy="11" r="1.3" fill="currentColor" stroke="none" />
    {/* Smile shaped like a W */}
    <path d="M8.6 14.3l1.7 1.7 1.7-1.7 1.7 1.7 1.7-1.7" />
  </svg>
)
