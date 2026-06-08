// Bloque gris con pulso — pieza base del skeleton
function Block({ className = "", style }) {
    return <div className={`animate-pulse rounded bg-line ${className}`} style={style} />;
}

// Card-placeholder — imita la estructura de <article> en ProjectCard:
// imagen (aspect-video) + badges + título + descripción + chips de stack + botón.
// Reusa el mismo marco (borde, radios, padding) para que no haya "salto"
// cuando llegan las cards reales.
function CardSkeleton() {
    return (
        <article className="grid gap-3 overflow-hidden rounded-tl-4xl rounded-tr-sm rounded-bl-sm rounded-br-4xl border border-line bg-linear-to-b from-surface-strong to-surface p-4 shadow-card">
            {/* Imagen — mismo recorte negativo y aspect-video que la card real */}
            <div className="-mx-4 -mt-4">
                <Block className="aspect-video w-full rounded-none" />
            </div>

            {/* Fila de badges: type (izq) + status (der) */}
            <div className="flex flex-wrap items-center justify-between gap-2">
                <Block className="h-5 w-24 rounded-badge" />
                <Block className="h-5 w-20 rounded-badge" />
            </div>

            {/* Título */}
            <Block className="h-6 w-3/4" />

            {/* Descripción — dos líneas, la segunda más corta */}
            <div className="grid gap-2">
                <Block className="h-3.5 w-full" />
                <Block className="h-3.5 w-5/6" />
            </div>

            {/* Stack — etiqueta "$ grupo" + fila de chips */}
            <div className="grid gap-2">
                <Block className="h-3 w-16" />
                <div className="flex flex-wrap gap-1.5 pl-3">
                    <Block className="h-5 w-16 rounded-badge" />
                    <Block className="h-5 w-20 rounded-badge" />
                    <Block className="h-5 w-14 rounded-badge" />
                </div>
            </div>

            {/* Acción — botón "Abrir →" */}
            <div className="mt-auto pt-1">
                <Block className="h-9 w-24" />
            </div>
        </article>
    );
}

export default function CatalogSkeleton() {
    // 6 cards = 2 filas completas en lg:grid-cols-3, suficiente para llenar
    // el alto en pantallas grandes y matar el hueco mientras llega el fetch.
    const CARDS = 6;

    return (
        <section className="mt-6" id="proyectos" aria-hidden="true">
            {/* Header — imita el bloque h2 + párrafo + filtros de Catalog */}
            <div className="mb-5 grid gap-1.5">
                <Block className="h-8 w-40" />
                <Block className="h-4 w-72 max-w-full" />
                <div className="mt-4 flex gap-2">
                    <Block className="h-8 w-20 rounded-full" />
                    <Block className="h-8 w-20 rounded-full" />
                    <Block className="h-8 w-24 rounded-full" />
                    <Block className="h-8 w-20 rounded-full" />
                </div>
            </div>

            {/* Grid — misma clase exacta que el grid real de Catalog */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: CARDS }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </section>
    );
}
