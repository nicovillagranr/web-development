// Bloque gris con pulso — pieza base del skeleton
function Block({ className = "", style }) {
  return <div className={`animate-pulse rounded bg-line ${className}`} style={style} />;
}

export default function HeroSkeleton() {
  // 9 líneas = "{" + 7 campos + "}", igual que EditorWindow con la tab "about"
  const LINES = 9;

  return (
    <section className="pt-8 md:pt-16 lg:pt-20" id="hero" aria-hidden="true">
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 lg:grid-cols-2 lg:items-start">
        {/* Panel izquierdo — imita PreviewPanel (h-75 md:h-100, gap-3 sm:gap-6) */}
        <div className="flex h-75 flex-col gap-3 sm:gap-6 md:h-100">
          <div className="flex items-center justify-between">
            <Block className="h-6 w-28 rounded-badge" />
            <Block className="hidden h-4 w-24 sm:block" />
          </div>
          <div className="flex flex-col gap-2">
            <Block className="h-3 w-20" />
            <Block className="h-9 w-3/4 sm:h-12" />
            <Block className="h-4 w-48" />
          </div>
          <div className="grid grid-cols-3 gap-2 border-t border-b border-dashed border-line-hover py-3 sm:gap-3 sm:py-4">
            <Block className="h-12" />
            <Block className="h-12" />
            <Block className="h-12" />
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Block className="h-9 flex-1" />
            <Block className="h-9 flex-1" />
          </div>
        </div>

        {/* Panel derecho — imita EditorWindow (altura natural, sin alto fijo) */}
        <div className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface/60 max-h-96 sm:max-h-full">
          {/* Title bar + tabs */}
          <div className="flex items-center gap-2 border-b border-line px-2 py-2 sm:px-4 sm:py-2.5">
            <div className="h-6 min-w-0 flex-1 rounded-md border border-line-hover sm:h-7 sm:max-w-24" />
            <div className="h-6 min-w-0 flex-1 rounded-md border border-line-hover sm:h-7 sm:max-w-24" />
            <div className="h-6 min-w-0 flex-1 rounded-md border border-line-hover sm:h-7 sm:max-w-24" />
            <Block className="ml-auto hidden h-4 w-16 sm:block" />
          </div>

          {/* Editor body — columna de números + líneas de código */}
          <div className="flex">
            <div className="flex shrink-0 flex-col border-r border-line bg-base-900/50 px-1 py-2 sm:px-3 sm:py-4">
              {Array.from({ length: LINES }).map((_, i) => (
                <div key={i} className="flex h-5 items-center justify-end sm:h-7">
                  <Block className="h-2.5 w-3" />
                </div>
              ))}
            </div>
            <div className="flex flex-1 flex-col p-2 sm:p-4">
              {Array.from({ length: LINES }).map((_, i) => (
                <div key={i} className="flex h-5 items-center sm:h-7">
                  <Block className="h-2.5 sm:h-3" style={{ width: `${45 + ((i * 17) % 45)}%` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Status bar — oculto en mobile, igual que EditorWindow */}
          <div className="hidden items-center gap-3 border-t border-line bg-accent/5 px-4 py-2 sm:flex">
            <Block className="h-3 w-12" />
            <Block className="h-3 w-14" />
            <Block className="ml-auto h-3 w-10" />
            <Block className="h-3 w-16" />
          </div>
        </div>
      </div>
    </section>
  );
}
