export default function EngineeringIcon({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gear 1 */}
      <g>
        <circle cx="18" cy="24" r="8" stroke="currentColor" strokeWidth="2.5" />
        <line
          x1="18"
          y1="14"
          x2="18"
          y2="10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="38"
          x2="18"
          y2="34"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="8"
          y1="24"
          x2="4"
          y2="24"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="24"
          x2="32"
          y2="24"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
      {/* Gear 2 */}
      <g>
        <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2.5" />
        <line
          x1="32"
          y1="38"
          x2="32"
          y2="42"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="38"
          y1="32"
          x2="44"
          y2="32"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
      {/* Wrench */}
      <path
        d="M10 38L6 42"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="42" r="2" fill="currentColor" />
    </svg>
  )
}
