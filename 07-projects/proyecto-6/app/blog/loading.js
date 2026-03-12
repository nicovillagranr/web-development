// app/blog/loading.js
// ─────────────────────────────────────────────────────────────────────────────
// CONCEPTO: Loading UI automático
//
// Cuando blog/page.js hace await (espera datos del servidor),
// Next.js muestra automáticamente ESTE componente mientras espera.
// No hay configuración. Solo exporta un componente default aquí
// y Next.js se encarga del resto.
//
// Técnicamente usa React Suspense por debajo.
// En Vite habrías necesario un estado de loading manual en el componente.
// ─────────────────────────────────────────────────────────────────────────────

export default function BlogLoading() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <div className="h-6 w-32 bg-surface rounded-full animate-pulse mb-6" />
      <div className="h-10 w-48 bg-surface rounded-lg animate-pulse mb-10" />
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-40 bg-surface rounded-xl animate-pulse border border-white/5" />
        ))}
      </div>
    </section>
  )
}
