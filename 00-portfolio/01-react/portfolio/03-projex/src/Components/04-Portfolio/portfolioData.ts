// portfolioData.ts
import portfolioImg1 from "../../assets/images/3-Portfolio/portfolio-1.webp"
import portfolioImg2 from "../../assets/images/3-Portfolio/portfolio-2.webp"
import portfolioImg3 from "../../assets/images/3-Portfolio/portfolio-3.webp"
import portfolioImg4 from "../../assets/images/3-Portfolio/portfolio-4.webp"
import portfolioImg5 from "../../assets/images/3-Portfolio/portfolio-5.webp"
import portfolioImg6 from "../../assets/images/3-Portfolio/portfolio-6.webp"

// Interfaz de TypeScript corregida sin colisión de nombres
export interface PortfolioDataType {
    id: number,
    image: string,
    title: string,
    big?: boolean
}

// Data
export const portfolioItems: PortfolioDataType[] = [
    {
        id: 1,
        image: portfolioImg1,
        title: "Landing page para una plataforma SaaS de productividad",
        big: true,
    },
    {
        id: 2,
        image: portfolioImg2,
        title: "Sitio de marketing para una consultora digital",
        big: true,
    },
    {
        id: 3,
        image: portfolioImg3,
        title: "Front-end de e-commerce para una marca de retail",
    },
    {
        id: 4,
        image: portfolioImg4,
        title: "Interfaz de dashboard para una herramienta de analítica web",
    },
    {
        id: 5,
        image: portfolioImg5,
        title: "Sitio corporativo para una empresa de servicios financieros",
    },
    {
        id: 6,
        image: portfolioImg6,
        title: "Sitio de portafolio para una profesional creativa",
    },
]
