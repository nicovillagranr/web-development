export default function HydraulicIcon({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main cylinder */}
      <rect
        x="14"
        y="10"
        width="20"
        height="28"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Piston rod */}
      <line
        x1="24"
        y1="6"
        x2="24"
        y2="2"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Piston head */}
      <circle cx="24" cy="8" r="2" fill="currentColor" />
      {/* Inner fluid indicator */}
      <rect
        x="16"
        y="20"
        width="16"
        height="12"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Connectors */}
      <line
        x1="10"
        y1="24"
        x2="14"
        y2="24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="24"
        x2="38"
        y2="24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Base */}
      <ellipse cx="24" cy="40" rx="12" ry="4" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}
