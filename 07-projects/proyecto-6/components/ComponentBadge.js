// components/ComponentBadge.js
// Server Component — no hay "use client", no hay interactividad.
// Este badge aparece en cada página para indicar visualmente qué tipo de componente es.
// Verde = Server Component | Azul = Client Component

export default function ComponentBadge({ type }) {
  const isClient = type === 'client'
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full border ${
        isClient
          ? 'bg-blue-950 border-blue-500 text-blue-300'
          : 'bg-emerald-950 border-emerald-500 text-emerald-300'
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full inline-block bg-current" />
      {isClient ? 'Client Component' : 'Server Component'}
    </span>
  )
}
