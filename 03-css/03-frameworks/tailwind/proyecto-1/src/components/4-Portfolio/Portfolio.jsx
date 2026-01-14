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
    { id: 1, image: portfolioImg1, title: "Project One", big: true },
    { id: 2, image: portfolioImg2, title: "Project Two", big: true },
    { id: 3, image: portfolioImg3, title: "Project Three" },
    { id: 4, image: portfolioImg4, title: "Project Four" },
    { id: 5, image: portfolioImg5, title: "Project Five" },
    { id: 6, image: portfolioImg6, title: "Project Six" }
]

/* =========================
   ITEM (1 sola tarjeta)
========================= */
function PortfolioItem({ image, title, big }) {
    return (

        <div className={`group relative overflow-hidden ${big ? "aspect-video lg:col-span-2" : "aspect-square"}`}>

            {/* Imagen */}
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#ff5959]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center
                    gap-4">

                <p className="text-white text-lg font-semibold">{title}</p>

                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200 transition">View</button>
                    <button className="px-4 py-2 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition">Code</button>
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
        <section className="w-full min-h-[75vh] bg-[#ff5959] flex flex-col items-center py-10">

            {/* Título */}
            <h2 className="text-xl md:text-3xl text-white">Our Portfolio</h2>
            <div className="flex items-center justify-center gap-3 mt-4">
                <span className="w-32 h-px bg-gray-400"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span className="w-32 h-px bg-gray-400"></span>
            </div>

            {/* Grid */}
            <div className="w-[80%] grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-4">
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
