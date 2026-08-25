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
