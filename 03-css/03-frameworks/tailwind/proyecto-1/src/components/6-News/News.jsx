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
        title: "News Title 1",
        Date: "August 20, 2023",
        text: "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        author: "Author 1",
        comments: 5,
    },
    {
        id: 2,
        image: newsImage2,
        title: "News Title 2",
        Date: "August 21, 2023",
        text: "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        author: "Author 2",
        comments: 3,
    },
    {
        id: 3,
        image: newsImage3,
        title: "News Title 3",
        Date: "August 22, 2023",
        text: "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        author: "Author 3",
        comments: 7,
    },
    {
        id: 4,
        image: newsImage3,
        title: "News Title 3",
        Date: "August 22, 2023",
        text: "lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        author: "Author 3",
        comments: 7,
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
            <SectionTitle className="text-white" title="Our Latest News" />

            {/* News Content */}
            <section
                onWheel={handleWheel}
                ref={scrollRef}
                className="w-[75%] mt-8 mb-8 flex gap-6 overflow-x-auto flex-nowrap scroll-smooth scrollbar-none">

                {news.map((newItem) => (
                    <article key={newItem.id} className="shrink-0 w-75 md:w-90 flex flex-col">

                        {/* Card */}
                        <div className="w-full h-48 overflow-hidden">
                            <img src={newItem.image} alt={newItem.title} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold mt-4 mb-2 text-white">{newItem.title}</h3>
                        <time className="text-sm text-gray-300 mb-4">{newItem.Date}</time>
                        <p className="text-gray-200">{newItem.text}</p>
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