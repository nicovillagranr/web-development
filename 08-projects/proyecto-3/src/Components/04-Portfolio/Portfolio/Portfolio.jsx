// Importamos useState para mostrar feedback de demo
import { useState } from "react"

// Importamos SectionTitle
import SectionTitle from "../../SectionTitle/SectionTitle/SectionTitle.jsx"

// Importamos estilos
import "../../../assets/styles/App.css"
import "./Portfolio.css"

// Importamos las imagenes de los proyectos
import portfolioImg1 from "../../../assets/images/3-Portfolio/portfolio-1.webp"
import portfolioImg2 from "../../../assets/images/3-Portfolio/portfolio-2.webp"
import portfolioImg3 from "../../../assets/images/3-Portfolio/portfolio-3.webp"
import portfolioImg4 from "../../../assets/images/3-Portfolio/portfolio-4.webp"
import portfolioImg5 from "../../../assets/images/3-Portfolio/portfolio-5.webp"
import portfolioImg6 from "../../../assets/images/3-Portfolio/portfolio-6.webp"

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

    return (
        <article className={`portfolio-item ${big ? "portfolio-item--big" : ""}`}>
            {/* Imagen */}
            <img width={200} height={200} src={image} alt={title} className="portfolio-item__image" />

            {/* Overlay */}
            <div className="portfolio-item__overlay">
                <h3 className="portfolio-item__title">{title}</h3>

                <div className="portfolio-item__buttons">
                    {/* Demo externa */}
                    <button
                        type="button"
                        onClick={handleDemoClick}
                        className="portfolio-item__button portfolio-item__button--primary"
                    >
                        View Demo
                    </button>

                    {/* Detalle interno (demo) */}
                    <button
                        type="button"
                        onClick={handleDemoClick}
                        className="portfolio-item__button portfolio-item__button--secondary"
                    >
                        Project Details
                    </button>
                </div>

                {showDemoMessage && (
                    <p
                        role="status"
                        aria-live="polite"
                        className="portfolio-item__message"
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
        <section className="portfolio">
            {/* Titulo */}
            <SectionTitle className="portfolio__title-text" title="Selected Work" />

            {/* Grid */}
            <div className="portfolio__container">
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