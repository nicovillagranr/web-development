export default function MiningIcon({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Pickaxe head */}
      <path
        d="M18 10L14 18M30 10L26 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Handle */}
      <path
        d="M22 20V38"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Rock/mining gem */}
      <polygon
        points="32,28 38,36 26,36"
        fill="currentColor"
        opacity="0.8"
      />
      <polygon
        points="32,28 38,20 42,28"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  )
}
