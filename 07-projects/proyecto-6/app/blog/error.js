'use client'
// ─────────────────────────────────────────────────────────────────────────────
// CONCEPTO: Error Boundary automático
//
// Si blog/page.js lanza un error (ej: la API falla), Next.js renderiza
// automáticamente ESTE componente en vez de crashear toda la app.
//
// IMPORTANTE: error.js DEBE ser "use client". Next.js lo requiere porque
// usa React Error Boundaries internamente, y esos solo funcionan en el cliente.
//
// La prop reset() le dice a Next.js que intente re-renderizar el segmento.
// ─────────────────────────────────────────────────────────────────────────────

export default function BlogError({ error, reset }) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-950 border border-red-500/40 mb-6">
        <span className="text-2xl">⚠</span>
      </div>
      <h2 className="text-2xl font-bold text-red-400">Error al cargar el blog</h2>
      <p className="text-gray-400 mt-2 text-sm font-mono">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 px-5 py-2.5 bg-primary text-white rounded-lg hover:opacity-80 transition-opacity text-sm font-medium"
      >
        Intentar de nuevo
      </button>
    </section>
  )
}
