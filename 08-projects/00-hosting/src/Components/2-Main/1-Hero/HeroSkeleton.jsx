// Bloque gris con pulso — pieza base del skeleton
function Block({ className = "", style }) {
  return <div className={`animate-pulse rounded bg-line ${className}`} style={style} />;
}

export default function HeroSkeleton() {
  return (
    <section className="pt-8 md:pt-16 lg:pt-20" id="hero" aria-hidden="true">
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 lg:grid-cols-2 lg:items-start">
        {/* Panel izquierdo — imita PreviewPanel */}
        <div className="flex h-75 flex-col gap-4 md:h-100">
          <Block className="h-6 w-32" />
          <div className="flex flex-col gap-2">
            <Block className="h-3 w-24" />
            <Block className="h-10 w-3/4" />
            <Block className="h-3 w-40" />
          </div>
          <div className="grid grid-cols-3 gap-3 border-t border-b border-dashed border-line-hover py-4">
            <Block className="h-12" />
            <Block className="h-12" />
            <Block className="h-12" />
          </div>
          <div className="flex gap-3">
            <Block className="h-10 flex-1" />
            <Block className="h-10 flex-1" />
          </div>
        </div>

        {/* Panel derecho — imita EditorWindow */}
        <div className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface/60">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <Block className="h-4 w-16" />
            <Block className="h-4 w-16" />
            <Block className="h-4 w-16" />
          </div>
          <div className="flex flex-col gap-3 p-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Block key={i} className="h-4" style={{ width: `${55 + ((i * 13) % 40)}%` }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
