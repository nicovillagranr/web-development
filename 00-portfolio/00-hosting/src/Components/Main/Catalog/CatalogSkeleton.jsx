// Bloque gris con pulso — pieza base del skeleton
function Block({ className = "", style }) {
    return <div className={`animate-pulse rounded bg-line ${className}`} style={style} />;
}

// Card-placeholder — imita el molde de <article> en ProjectCard: las mismas 5
// franjas del subgrid (portada, cabecera, descripción, stack, acción), el mismo
// marco (borde, radios, gradiente) y el mismo `px-5`. Reusa también el
// `row-span-5` para que el esqueleto cuadre igual que las cards reales y no
// haya "salto" cuando llegan los datos.
function CardSkeleton() {
    return (
        <article className="grid gap-4 overflow-hidden rounded-tl-4xl rounded-tr-sm rounded-bl-sm rounded-br-4xl border border-line bg-linear-to-b from-surface-strong to-surface shadow-card md:row-span-5 md:mb-2 md:grid-rows-subgrid">
            {/* 1. Portada — a sangre, mismo aspect-video que la card real */}
            <Block className="aspect-video w-full rounded-none" />

            {/* 2. Cabecera — kicker (izq) + estado (der) en una línea, y el
                título justo debajo, sin la canaleta del subgrid en medio */}
            <div className="grid gap-1 px-5">
                <div className="flex items-center justify-between gap-2">
                    <Block className="h-3 w-20" />
                    <Block className="h-3 w-16" />
                </div>
                <Block className="h-7 w-3/4" />
            </div>

            {/* 3. Descripción — tres líneas, la última más corta */}
            <div className="grid gap-2 px-5">
                <Block className="h-3.5 w-full" />
                <Block className="h-3.5 w-full" />
                <Block className="h-3.5 w-4/6" />
            </div>

            {/* 4. Stack — misma rejilla etiqueta | chips que la card real */}
            <div className="grid grid-cols-[6rem_1fr] items-start gap-x-3 gap-y-2 px-5">
                <Block className="h-4 w-20" />
                <div className="flex flex-wrap gap-1.5">
                    <Block className="h-5 w-24 rounded-badge" />
                </div>
                <Block className="h-4 w-16" />
                <div className="flex flex-wrap gap-1.5">
                    <Block className="h-5 w-16 rounded-badge" />
                    <Block className="h-5 w-20 rounded-badge" />
                </div>
                <Block className="h-4 w-20" />
                <div className="flex flex-wrap gap-1.5">
                    <Block className="h-5 w-20 rounded-badge" />
                    <Block className="h-5 w-24 rounded-badge" />
                </div>
            </div>

            {/* 5. Acción — botón "Abrir →", tras la misma línea separadora */}
            <div className="px-5 pb-5">
                <div className="border-t border-line pt-4">
                    <Block className="h-9 w-24" />
                </div>
            </div>
        </article>
    );
}

export default function CatalogSkeleton() {
    // 6 cards = 3 filas completas en md:grid-cols-2, suficiente para llenar el
    // alto y matar el hueco mientras llega el fetch.
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

            {/* Grid — mismas clases exactas que el grid real de Catalog */}
            <div className="grid gap-x-6 gap-y-6 sm:grid-cols-1 md:grid-cols-2 md:gap-y-4">
                {Array.from({ length: CARDS }).map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </section>
    );
}
