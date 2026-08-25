// Importamos useState para mostrar feedback de demo
import { useState, useEffect } from "react"

// Importamos SectionTitle
import SectionTitle from "../SectionTitle/SectionTitle.tsx"

// Importamos la data
import { portfolioItems, type PortfolioDataType } from "./portfolioData.ts"

// Estructura de cada card
function PortfolioItem({ image, title, big }: PortfolioDataType) {
    const [showDemoMessage, setShowDemoMessage] = useState(false)

    const handleDemoClick = () => {
        setShowDemoMessage(true)
    }

    useEffect(() => {
        if (!showDemoMessage) return
        const id = setTimeout(() => setShowDemoMessage(false), 3000)
        return () => clearTimeout(id)
    }, [showDemoMessage])

    return (
        <article className={`group relative overflow-hidden ${big ? "aspect-4/3 sm:aspect-video lg:col-span-2" : "aspect-square"}`}>
            {/* Imagen */}
            <img
                loading="lazy"
                decoding="async"
                width={200}
                height={200}
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-linear-to-t from-black/70 via-black/40 to-black/20 px-5 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                <h3 className="max-w-[90%] text-center text-lg leading-snug font-semibold text-white">{title}</h3>

                <div className="flex gap-4">
                    {/* Detalle interno (demo) */}
                    <button
                        aria-label={`Ver detalle: ${title}`}
                        type="button"
                        onClick={handleDemoClick}
                        className="border border-white px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                    >
                        Ver detalle
                    </button>
                </div>

                {showDemoMessage && (
                    <p role="status" aria-live="polite"
                        className="absolute top-2 right-2 inline-block rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-center text-xs font-semibold tracking-wide text-amber-900 shadow-sm">
                        AVISO: Proyecto Demo
                    </p>
                )}
            </div>
        </article>
    )
}

// Contenedor general del Portfolio
function Portfolio() {
    return (
        <section className="flex min-h-[75vh] w-full flex-col items-center bg-primary py-10">
            <SectionTitle className="text-white" title="Trabajos seleccionados" level={1} />
            {/* Grid */}
            <div className="mt-8 grid w-[80%] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {portfolioItems.map((item) => {
                    // Usamos spread para ahorrar código verboso
                    return <PortfolioItem key={item.id} {...item} />
                })}
            </div>
        </section>
    )
}
export default Portfolio
