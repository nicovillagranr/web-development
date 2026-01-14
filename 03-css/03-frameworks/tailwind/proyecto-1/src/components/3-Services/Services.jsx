import service1Img from "../../assets/images/2-Services/idea.webp"
import service2Img from "../../assets/images/2-Services/seo.webp"
import service3Img from "../../assets/images/2-Services/graphic-design.webp"

const services = [
    {
        id: 1,
        img: service1Img,
        title: "HTML 5 & CSS3",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    },

    {
        id: 2,
        img: service2Img,
        title: "SEO Optimization",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    },

    {
        id: 3,
        img: service3Img,
        title: "Graphic Design",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
    }
]


function Services() {
    return (
        <section className="w-full min-h-[90vh] bg-[#E8E8E8] flex flex-col items-center justify-center p-5">

            {/* Services Title */}
            <h2 className="text-xl md:text-3xl cursor-pointer">Our Services</h2>
            <div className="flex items-center justify-center gap-3 mt-4">
                <span className="block w-40 h-px bg-gray-400"></span>
                <span className="block w-2 h-2 bg-gray-400 rounded-full"></span>
                <span className="block w-40 h-px bg-gray-400"></span>
            </div>

            {/* Services Cards */}
            <div className="w-[90%] mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* .map() de cada Card */}
                {services.map(service => {
                    return (
                        <article key={service.id} className="flex flex-col items-center justify-center gap-4 p-6 md:p-10 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                            <img
                                draggable="false"
                                src={service.img}
                                alt={service.title}
                                className="w-24 h-24 md:w-32 md:h-32"
                            />
                            <h3 className="text-lg md:text-2xl cursor-pointer">{service.title}</h3>
                            <p className="text-sm md:text-base text-center cursor-pointer">{service.text}</p>
                        </article>
                    )
                })}

            </div>

        </section>
    )
}
export default Services