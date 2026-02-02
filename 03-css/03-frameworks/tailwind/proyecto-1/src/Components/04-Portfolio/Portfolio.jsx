// Importamos Link
import { Link } from "react-router-dom"

// Importamos SectionTitle
import SectionTitle from "../SectionTitle/SectionTitle.jsx"

// Importamos las imágenes de los proyectos
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
        slug: "saas-productivity-landing",
        demoUrl: "https://example.com",
        big: true,
    },
    {
        id: 2,
        image: portfolioImg2,
        title: "Marketing Website for a Digital Consulting Agency",
        slug: "digital-consulting-marketing",
        demoUrl: "https://example.com",
        big: true,
    },
    {
        id: 3,
        image: portfolioImg3,
        title: "E-commerce Front-End for a Retail Brand",
        slug: "ecommerce-retail-frontend",
        demoUrl: "https://example.com",
    },
    {
        id: 4,
        image: portfolioImg4,
        title: "Dashboard UI for a Web Analytics Tool",
        slug: "analytics-dashboard-ui",
        demoUrl: "https://example.com",
    },
    {
        id: 5,
        image: portfolioImg5,
        title: "Corporate Website for a Financial Services Company",
        slug: "financial-corporate-website",
        demoUrl: "https://example.com",
    },
    {
        id: 6,
        image: portfolioImg6,
        title: "Portfolio Website for a Creative Professional",
        slug: "creative-portfolio-website",
        demoUrl: "https://example.com",
    },
]

// Creamos la estructura de la tarjeta de cada proyecto | Según la prop "big", el tamaño será diferente
function PortfolioItem({ image, title, slug, demoUrl, big }) {
    return (
        // Con un Ternario ajustamos el tamaño del artículo según la prop "big"
        <article
            className={`group relative overflow-hidden
            ${big ? "aspect-4/3 sm:aspect-video lg:col-span-2" : "aspect-square"}`}>

            {/* Imagen */}
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                transition-opacity duration-300 flex flex-col items-center justify-center gap-4 px-5">

                <h3 className="text-white text-lg font-semibold text-center leading-snug max-w-[90%]">{title}</h3>

                <div className="flex gap-4">

                    {/* Demo externa */}
                    <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200 transition">
                        View Demo
                    </a>

                    {/* Detalle interno */}
                    <Link
                        to={`/portfolio/${slug}`}
                        className="
                        px-4 py-2
                        border border-white text-white text-sm font-medium
                        hover:bg-white hover:text-black transition">
                        Project Details
                    </Link>

                </div>
            </div>
        </article>
    )
}

// Contenedor general del Portfolio
function Portfolio() {
    return (
        <section className="w-full min-h-[75vh] bg-primary flex flex-col items-center py-10">
            {/* Título */}
            <SectionTitle className="text-white" title="Selected Work" />

            {/* Grid */}
            <div className="w-[80%] grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
                {/* Recorremos los datos de los proyectos con un .map() */}
                {portfolioItems.map(item => (
                    <PortfolioItem
                        key={item.id}
                        image={item.image}
                        title={item.title}
                        slug={item.slug}
                        demoUrl={item.demoUrl}
                        big={item.big}
                    />
                ))}
            </div>
        </section>
    )
}
export default Portfolio
