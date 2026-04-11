// Importamos useRef para manejar el scroll
import { useRef } from "react"

// Importamos SectionTitle
import SectionTitle from "../../SectionTitle/SectionTitle/SectionTitle.jsx"

// Importamos estilos
import "../../../assets/styles/App.css"
import "./News.css"

// Importamos las imágenes de noticias
import newsImage1 from "../../../assets/images/5-News/news-1.webp"
import newsImage2 from "../../../assets/images/5-News/news-2.webp"
import newsImage3 from "../../../assets/images/5-News/news-3.webp"

// Importamos los Icons de las tarjetas de noticias
import calendarIcon from "../../../assets/icons/3-News/calendar.svg"
import userIcon from "../../../assets/icons/3-News/user.svg"

// Creamos el array de noticias para recorrerlo con un .map()
const news = [
    {
        id: 1,
        image: newsImage1,
        title: "Why performance matters more than features in early-stage products",
        Date: "August 20, 2023",
        text: "In early products, speed, accessibility and clarity are often sacrificed for features. We explain why prioritizing fundamentals reduces technical debt and accelerates real growth.",
        author: "Projex Team",
        comments: 5,
    },
    {
        id: 2,
        image: newsImage2,
        title: "How we approach front-end architecture for scalable projects",
        Date: "August 28, 2023",
        text: "From component structure to data separation, we share the principles we follow to keep front-end projects maintainable as they grow.",
        author: "Projex Team",
        comments: 3,
    },
    {
        id: 3,
        image: newsImage3,
        title: "Good UX is invisible: lessons from real client projects",
        Date: "September 3, 2023",
        text: "Users rarely notice good UX, but they immediately feel when it's missing. Here are practical insights we apply to avoid friction and confusion",
        author: "Projex Team",
        comments: 7,
    },
    {
        id: 4,
        image: newsImage3,
        title: "Why most websites fail before users read the content",
        Date: "September 10, 2023",
        text: "Slow load times, poor hierarchy and unclear messaging cause users to leave before engaging. We break down the most common mistakes and how to avoid them.",
        author: "Projex Team",
        comments: 4,
    }
]

function News() {

    const scrollRef = useRef(null)

    // Función para manejar el scroll
    const handleWheel = (e) => {
        const el = scrollRef.current
        if (!el) return

        // Solo intercepta si existe overflow horizontal real
        if (el.scrollWidth <= el.clientWidth) return

        // Desplazamiento
        el.scrollLeft += e.deltaY
    }

    return (
        <section className="news">

            {/* Services Title */}
            <SectionTitle className="news__title-text" title="Insights & Updates" />

            {/* Cards */}
            <section onWheel={handleWheel} ref={scrollRef} className="news__container scrollbar-none">

                {news.map((newItem) => (
                    <article key={newItem.id} className="news__card">

                        {/* Tarjeta */}
                        <div className="news__card-image-wrapper">
                            <img src={newItem.image} alt={newItem.title} className="news__card-image" />
                        </div>
                        <h3 className="news__card-title">{newItem.title}</h3>
                        <time className="news__card-date">{newItem.Date}</time>
                        <p className="news__card-text">{newItem.text}</p>
                        {/* Tarjeta */}

                        {/* Autor y Comentarios */}
                        <div className="news__card-meta">
                            <div className="news__card-author">
                                <img src={userIcon} alt="" aria-hidden="true" className="news__card-meta-icon" />
                                <span>{newItem.author}</span>
                            </div>

                            <div className="news__card-comments">
                                <img src={calendarIcon} alt="" aria-hidden="true" className="news__card-meta-icon" />
                                <span>{newItem.comments} Comments</span>
                            </div>
                        </div>
                        {/* Autor y Comentarios */}

                    </article>
                ))}
            </section>
        </section >
    )
}
export default News
