// Importamos useRef para manejar el scroll
import { useRef } from "react"

// Importamos SectionTitle
import SectionTitle from "../11-SectionTitle/SectionTitle.jsx"

// Importamos las imágenes de noticias
import newsImage1 from "../../assets/images/5-News/news-1.webp"
import newsImage2 from "../../assets/images/5-News/news-2.webp"
import newsImage3 from "../../assets/images/5-News/news-3.webp"

// Importamos los Icons de las tarjetas de noticias
import calendarIcon from "../../assets/icons/3-News/calendar.svg"
import userIcon from "../../assets/icons/3-News/user.svg"

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
        text: "Users rarely notice good UX, but they immediately feel when it’s missing. Here are practical insights we apply to avoid friction and confusion.",
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

    const handleWheel = (e) => {
        const el = scrollRef.current
        if (!el) return

        // Solo intercepta si existe overflow horizontal real
        if (el.scrollWidth <= el.clientWidth) return

        // Desplazamiento
        el.scrollLeft += e.deltaY
    }

    return (
        <section className="w-full min-h-[75vh] py-6 bg-[#ff5959] flex flex-col items-center justify-center">

            {/* Services Title */}
            <SectionTitle className="text-white" title="Insights & Updates" />

            {/* News Content */}
            <section
                onWheel={handleWheel}
                ref={scrollRef}
                className="w-[75%] mt-6 mb-6 flex gap-6 overflow-x-auto flex-nowrap scroll-smooth scrollbar-none">

                {news.map((newItem) => (
                    <article key={newItem.id} className="shrink-0 w-75 md:w-90 flex flex-col">

                        {/* Card */}
                        <div className="w-full h-48 overflow-hidden">
                            <img src={newItem.image} alt={newItem.title} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold mt-4 mb-2 text-white">{newItem.title}</h3>
                        <time className="text-sm text-gray-300 mb-4">{newItem.Date}</time>
                        <p className="text-gray-200 text-xs">{newItem.text}</p>
                        {/* Card */}

                        {/* Author and Comments */}
                        <div className="w-full flex justify-start gap-10 items-center mt-3 text-sm text-gray-200">
                            <div className="flex items-center gap-2">
                                <img src={userIcon} alt="Author" className="w-5 h-5" />
                                <span>{newItem.author}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <img src={calendarIcon} alt="Comments" className="w-5 h-5" />
                                <span>{newItem.comments} Comments</span>
                            </div>
                        </div>
                        {/* Author and Comments */}


                    </article>
                ))}
            </section>


        </section >
    )
}
export default News