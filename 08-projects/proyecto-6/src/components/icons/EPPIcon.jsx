export default function EPPIcon({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Helmet */}
      <path
        d="M12 18C12 12 16 8 24 8C32 8 36 12 36 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="12"
        y1="18"
        x2="36"
        y2="18"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Visor */}
      <rect
        x="18"
        y="14"
        width="12"
        height="6"
        rx="2"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Gloves */}
      <circle cx="10" cy="28" r="5" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="38" cy="28" r="5" stroke="currentColor" strokeWidth="2.5" />
      {/* Boot */}
      <rect
        x="20"
        y="36"
        width="8"
        height="8"
        rx="1"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  )
}
