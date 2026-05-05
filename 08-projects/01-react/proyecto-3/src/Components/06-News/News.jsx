// Importamos useRef para manejar el scroll
import { useRef } from "react"
import { FaCalendar, FaUser } from "react-icons/fa"

// Importamos SectionTitle
import SectionTitle from "../SectionTitle/SectionTitle.jsx"

// Importamos las imágenes de noticias
import newsImage1 from "../../assets/images/5-News/news-1.webp"
import newsImage2 from "../../assets/images/5-News/news-2.webp"
import newsImage3 from "../../assets/images/5-News/news-3.webp"

// Creamos el array de noticias para recorrerlo con un .map()
const news = [
    {
        id: 1,
        image: newsImage1,
        title: "Why performance matters more than features in early-stage products",
        date: "August 20, 2023",
        datetime: "2023-08-20",
        text: "In early products, speed, accessibility and clarity are often sacrificed for features. We explain why prioritizing fundamentals reduces technical debt and accelerates real growth.",
        author: "Projex Team",
    },
    {
        id: 2,
        image: newsImage2,
        title: "How we approach front-end architecture for scalable projects",
        date: "August 28, 2023",
        datetime: "2023-08-28",
        text: "From component structure to data separation, we share the principles we follow to keep front-end projects maintainable as they grow.",
        author: "Projex Team",
    },
    {
        id: 3,
        image: newsImage3,
        title: "Good UX is invisible: lessons from real client projects",
        date: "September 3, 2023",
        datetime: "2023-09-03",
        text: "Users rarely notice good UX, but they immediately feel when it's missing. Here are practical insights we apply to avoid friction and confusion.",
        author: "Projex Team",
    },
    {
        id: 4,
        image: newsImage1,
        title: "Why most websites fail before users read the content",
        date: "September 10, 2023",
        datetime: "2023-09-10",
        text: "Slow load times, poor hierarchy and unclear messaging cause users to leave before engaging. We break down the most common mistakes and how to avoid them.",
        author: "Projex Team",
    }
]

function News() {

    const scrollRef = useRef(null)

    // Función para manejar el scroll horizontal con la rueda del mouse
    const handleWheel = (e) => {
        const el = scrollRef.current
        if (!el) return

        // Solo intercepta si existe overflow horizontal real
        if (el.scrollWidth <= el.clientWidth) return

        // Desplazamiento
        el.scrollLeft += e.deltaY
    }

    return (
        <section className="w-full min-h-[75vh] py-6 bg-primary flex flex-col items-center justify-center">

            {/* News Title */}
            <SectionTitle className="text-white" title="Insights & Updates" level={2} />

            {/* Cards */}
            <ul onWheel={handleWheel} ref={scrollRef} className="w-[75%] mt-6 mb-6 flex gap-6 overflow-x-auto flex-nowrap scroll-smooth scrollbar-none">

                {news.map((newItem) => (
                    <li key={newItem.id} className="shrink-0 w-[85vw] sm:w-75 md:w-90">
                        <article className="flex flex-col h-full">

                            {/* Imagen */}
                            <div className="w-full h-48 overflow-hidden">
                                <img decoding="async" width="200" height="200" draggable="false" src={newItem.image} alt={newItem.title} className="w-full h-full object-cover" />
                            </div>

                            <h3 className="text-xl font-bold mt-4 mb-2 text-white line-clamp-2">{newItem.title}</h3>
                            <p className="text-gray-300 text-xs line-clamp-3">{newItem.text}</p>

                            {/* Autor y Fecha */}
                            <div className="w-full flex justify-start gap-10 items-center mt-3 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <FaUser className="w-5 h-5" />
                                    <span>{newItem.author}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FaCalendar className="w-5 h-5" />
                                    <time dateTime={newItem.datetime}>{newItem.date}</time>
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
