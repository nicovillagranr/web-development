// Importamos SectionTitle
import SectionTitle from "../SectionTitle/SectionTitle.jsx"

// Importamos las imágenes de los proyectos
import portfolioImg1 from "../../assets/images/3-Portfolio/portfolio-1.webp";
import portfolioImg2 from "../../assets/images/3-Portfolio/portfolio-2.webp";
import portfolioImg3 from "../../assets/images/3-Portfolio/portfolio-3.webp";
import portfolioImg4 from "../../assets/images/3-Portfolio/portfolio-4.webp";
import portfolioImg5 from "../../assets/images/3-Portfolio/portfolio-5.webp";
import portfolioImg6 from "../../assets/images/3-Portfolio/portfolio-6.webp";


/* =========================
   DATA (fuente de verdad)
========================= */
const portfolioItems = [
    { id: 1, image: portfolioImg1, title: "Landing Page for a SaaS Productivity Platform", big: true },
    { id: 2, image: portfolioImg2, title: "Marketing Website for a Digital Consulting Agency", big: true },
    { id: 3, image: portfolioImg3, title: "E-commerce Front-End for a Retail Brand" },
    { id: 4, image: portfolioImg4, title: "Dashboard UI for a Web Analytics Tool" },
    { id: 5, image: portfolioImg5, title: "Corporate Website for a Financial Services Company" },
    { id: 6, image: portfolioImg6, title: "Portfolio Website for a Creative Professional" }
]

/* =========================
   ITEM (1 sola tarjeta)
========================= */
function PortfolioItem({ image, title, big }) {
    return (

        <div className={`group relative overflow-hidden ${big ? "aspect-4/3 sm:aspect-video lg:col-span-2" : "aspect-square"}`}>

            {/* Imagen */}
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 px-5">

                <p className="text-white text-lg font-semibold text-center leading-snug max-w-[90%] cursor-pointer">{title}</p>

                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200 transition">View Demo</button>
                    <button className="px-4 py-2 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition">Project Details</button>
                </div>
            </div>

        </div>

    )
}

/* =========================
   CONTAINER (sección)
========================= */
function Portfolio() {
    return (
        <section className="w-full min-h-[75vh] bg-primary flex flex-col items-center py-10">

            {/* Título */}
            <SectionTitle className="text-white" title="Selected Work" />

            {/* Grid */}
            <div className="w-[80%] grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
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
    );
}

export default Portfolio;
