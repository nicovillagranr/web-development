import { useRef } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

export const Carousel = ({ items = [], title = "Categorías" }) => {
    const containerRef = useRef(null)

    const scroll = (dir) => {
        const el = containerRef.current
        const amount = el.offsetWidth * 0.8

        el.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth",
        })
    }

    return (
        <section className="w-full px-4 py-4">
            {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

            {/* Contenedor scrolleable */}
            <div ref={containerRef} className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none">
                {items.map((item, i) => (
                    <div key={i} className="relative shrink-0 w-[75%] sm:w-[60%] md:w-[40%] lg:w-[25%] aspect-square overflow-hidden snap-start">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                        <span className="absolute bottom-3 left-3 text-white font-semibold">{item.title}</span>
                    </div>
                ))}
            </div>

            {/* Controles abajo a la derecha */}
            <div className="hidden md:flex justify-end mt-4">
                <button onClick={() => scroll("left")} aria-label="Anterior" className="text-black dark:text-white w-9 h-9 flex items-center justify-center transition-colors">
                    <FiChevronLeft size={22} />
                </button>
                <button onClick={() => scroll("right")} aria-label="Siguiente" className="text-black dark:text-white w-9 h-9 flex items-center justify-center transition-colors">
                    <FiChevronRight size={22} />
                </button>
            </div>
        </section>
    )
}