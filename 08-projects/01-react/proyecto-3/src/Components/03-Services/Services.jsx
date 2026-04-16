// Importamos SectionTitle
import SectionTitle from "../SectionTitle/SectionTitle.jsx"

// Importamos las imágenes de los servicios
import service1Img from "../../assets/images/2-Services/idea.webp"
import service2Img from "../../assets/images/2-Services/seo.webp"
import service3Img from "../../assets/images/2-Services/graphic-design.webp"


const services = [
    {
        id: 1,
        img: service1Img,
        title: "HTML & CSS Architecture",
        text: "Clean, semantic and accessible layouts designed to scale. We build interfaces that are easy to maintain, fast to load and friendly for users and search engines."
    },

    {
        id: 2,
        img: service2Img,
        title: "SEO Optimization",
        text: "Performance is not optional. We optimize loading times, structure and metadata so your product is visible and fast from the start."
    },

    {
        id: 3,
        img: service3Img,
        title: "UI Systems & Design Consistency",
        text: "We create reusable components and visual systems that keep your product consistent as it grows — no redesign every six months."
    }
]


function Services() {
    return (
        <section className="w-full min-h-[75vh] bg-surface flex flex-col items-center justify-center p-5">

            {/* Services Title */}
            <SectionTitle className="text-black" title="What We Do" />

            {/* Services Cards */}
            <div className="w-[90%] mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* .map() de cada Card */}
                {services.map(service => {
                    return (
                        <article key={service.id} className="flex flex-col items-center justify-center gap-4 p-6 md:p-10 rounded-lg bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                            <img
                                draggable="false"
                                src={service.img}
                                alt=""
                                aria-hidden="true"
                                className="w-24 h-24 md:w-32 md:h-32"
                            />
                            <h3 className="text-lg md:text-2xl font-semibold">{service.title}</h3>
                            <p className="text-sm md:text-base text-center">{service.text}</p>
                        </article>
                    )
                })}

            </div>

        </section>
    )
}
export default Services