// Importamos useState para mostrar feedback de demo
import { useState, useEffect } from "react"

// Importamos SectionTitle
import SectionTitle from "../SectionTitle/SectionTitle.jsx"

// Importamos las imagenes de los proyectos
import portfolioImg1 from "../../assets/images/3-Portfolio/portfolio-1.webp"
import portfolioImg2 from "../../assets/images/3-Portfolio/portfolio-2.webp"
import portfolioImg3 from "../../assets/images/3-Portfolio/portfolio-3.webp"
import portfolioImg4 from "../../assets/images/3-Portfolio/portfolio-4.webp"
import portfolioImg5 from "../../assets/images/3-Portfolio/portfolio-5.webp"
import portfolioImg6 from "../../assets/images/3-Portfolio/portfolio-6.webp"

// Datos de los proyectos para recorrerlos con un .map()
const portfolioItems = [
    {
        id: 1,
        image: portfolioImg1,
        title: "Landing Page for a SaaS Productivity Platform",
        big: true,
    },
    {
        id: 2,
        image: portfolioImg2,
        title: "Marketing Website for a Digital Consulting Agency",
        big: true,
    },
    {
        id: 3,
        image: portfolioImg3,
        title: "E-commerce Front-End for a Retail Brand",
    },
    {
        id: 4,
        image: portfolioImg4,
        title: "Dashboard UI for a Web Analytics Tool",
    },
    {
        id: 5,
        image: portfolioImg5,
        title: "Corporate Website for a Financial Services Company",
    },
    {
        id: 6,
        image: portfolioImg6,
        title: "Portfolio Website for a Creative Professional",
    },
]

// Estructura de cada card
function PortfolioItem({ image, title, big }) {
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
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-linear-to-t from-black/70 via-black/40 to-black/20 px-5 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                <h3 className="max-w-[90%] text-center text-lg leading-snug font-semibold text-white">{title}</h3>

                <div className="flex gap-4">
                    {/* Demo externa */}
                    <button
                        aria-label={`View Demo: ${title}`}
                        type="button"
                        onClick={handleDemoClick}
                        className="bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-200"
                    >
                        View Demo
                    </button>

                    {/* Detalle interno (demo) */}
                    <button
                        aria-label={`Project Details: ${title}`}
                        type="button"
                        onClick={handleDemoClick}
                        className="border border-white px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                    >
                        Project Details
                    </button>
                </div>

                {showDemoMessage && (
                    <p
                        role="status"
                        aria-live="polite"
                        className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-center text-xs font-semibold tracking-wide text-amber-900 shadow-sm"
                    >
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
            {/* Titulo */}
            <SectionTitle className="text-white" title="Selected Work" level={2} />

            {/* Grid */}
            <div className="mt-8 grid w-[80%] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {portfolioItems.map(item => (
                    <PortfolioItem
                        key={item.id}
                        image={item.image}
                        title={item.title}
                        big={item.big}
                    />
                ))}
            </div>
        </section>
    )
}
export default Portfolio