import newsImage1 from "../../assets/images/5-News/news-1.webp"
import newsImage2 from "../../assets/images/5-News/news-2.webp"
import newsImage3 from "../../assets/images/5-News/news-3.webp"


const news = [
    {
        id: 1,
        image: newsImage1,
        title: "News Title 1",
        Date: "August 20, 2023",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        author: "Author 1",
        comments: 5,
    },
    {
        id: 2,
        image: newsImage2,
        title: "News Title 2",
        Date: "August 21, 2023",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        author: "Author 2",
        comments: 3,
    },
    {
        id: 3,
        image: newsImage3,
        title: "News Title 3",
        Date: "August 22, 2023",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        author: "Author 3",
        comments: 7,
    }
]


function News() {
    return (
        <section className="w-full min-h-[90vh] bg-[#ff5959] flex flex-col items-center justify-center">

            {/* Services Title */}
            <h2 className="text-xl md:text-3xl cursor-pointer text-white">The Latest News</h2>
            <div className="flex items-center justify-center gap-3 mt-4">
                <span className="block w-40 h-px bg-gray-400"></span>
                <span className="block w-2 h-2 bg-gray-400 rounded-full"></span>
                <span className="block w-40 h-px bg-gray-400"></span>
            </div>

            {/* News Content */}
            <section className="w-[70%] flex flex-row items-center justify-center mt-10 gap-6">

                {news.map((newItem) => {
                    return (
                        <article key={newItem.id} className="w-full  p-4 rounded-lg shadow-lg flex flex-col items-center">
                            <img src={newItem.image} alt={newItem.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl font-bold mb-2">{newItem.title}</h3>
                            <time className="text-sm text-gray-500 mb-4">{newItem.Date}</time>
                            <p className="text-gray-600 text-center">{newItem.text}</p>
                        </article>
                    )
                })}

            </section>

        </section >

    )
}
export default News