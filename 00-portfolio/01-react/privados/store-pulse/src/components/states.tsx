/**
 * Los estados que no son "todo bien".
 *
 * Viven juntos y se escriben al principio, no al final: una pantalla sin estado de
 * carga, de error y de vacío está a medio hacer aunque el caso feliz se vea perfecto.
 */

/**
 * Un esqueleto de carga fiel al layout final: mismas cajas, mismas alturas, mismas
 * proporciones. Un spinner centrado es más fácil de escribir, pero desplaza todo el
 * contenido al llegar los datos y hace que la app parezca que da un salto.
 */
export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`bg-line animate-pulse rounded-2xl ${className}`} aria-hidden="true" />;
}

export function SkeletonScreen({ cards = 4 }: { cards?: number }) {
  return (
    <div className="flex flex-col gap-4" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Cargando métricas…</span>
      <SkeletonBlock className="h-16" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: cards }, (_, index) => (
          <SkeletonBlock key={index} className="h-28" />
        ))}
      </div>
      <SkeletonBlock className="h-48" />
    </div>
  );
}

export function ErrorState({ error }: { error: Error }) {
  return (
    <div role="alert" className="border-bad/20 bg-bad-soft text-ink rounded-2xl border p-4 text-sm">
      <h2 className="text-bad font-semibold">No se pudieron cargar las métricas</h2>
      {/* Qué pasó y qué hacer. Un `Error: fetch failed` a pelo no le sirve a nadie
          que esté abriendo esto a las 8 de la mañana antes de un turno. */}
      <p className="text-ink-soft mt-1">
        Puede ser un problema de conexión. Intenta recargar en unos segundos; si sigue igual, avisa
        al encargado.
      </p>
      <p className="text-ink-faint mt-2 font-mono text-xs">{error.message}</p>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="border-line bg-surface text-ink-soft rounded-2xl border p-6 text-center text-sm">
      {message}
    </div>
  );
}
