// Hook
import { useRef } from "react"

// Icons
import { FaCalendar, FaUser } from "react-icons/fa"

// Components
import SectionTitle from "../SectionTitle/SectionTitle.tsx"

// Data
import { news } from "./newsData.ts"

function News() {
    // Referencias
    const scrollRef = useRef<HTMLUListElement>(null)

    // Función para manejar el scroll horizontal con la rueda del mouse
    const handleWheel = (e: React.WheelEvent<HTMLUListElement>) => {
        const el = scrollRef.current
        if (!el) return
        // Solo intercepta si existe overflow horizontal real
        if (el.scrollWidth <= el.clientWidth) return
        // Desplazamiento
        el.scrollLeft += e.deltaY
    }

    return (
        <section className="flex min-h-[75vh] w-full flex-col items-center justify-center bg-primary py-6">
            {/* News Title */}
            <SectionTitle className="text-white" title="Ideas y novedades" level={1} />

            {/* Cards */}
            <ul onWheel={handleWheel} ref={scrollRef} className="scrollbar-none mt-6 mb-6 flex w-[75%] flex-nowrap gap-6 overflow-x-auto scroll-smooth">
                {news.map((newItem) => (
                    <li key={newItem.id} className="w-[85vw] shrink-0 sm:w-75 md:w-90">
                        <article className="flex h-full flex-col">

                            {/* Imagen */}
                            <div className="h-48 w-full overflow-hidden">
                                <img
                                    decoding="async"
                                    width="200"
                                    height="200"
                                    draggable="false"
                                    src={newItem.image}
                                    alt={newItem.title}
                                    className="h-full w-full object-cover" />
                            </div>

                            {/* Titulo */}
                            <h3 className="mt-4 mb-2 line-clamp-2 text-xl font-bold text-white">{newItem.title}</h3>

                            {/* Texto */}
                            <p className="line-clamp-3 text-xs text-gray-300">{newItem.text}</p>

                            {/* Autor y Fecha */}
                            <div className="mt-3 flex w-full items-center justify-start gap-10 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <FaUser className="h-5 w-5" aria-hidden="true" />
                                    <span>{newItem.author}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaCalendar className="h-5 w-5" aria-hidden="true" />
                                    <time dateTime={newItem.datetime}>
                                        {newItem.date}
                                    </time>
                                </div>
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default News
