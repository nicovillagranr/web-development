// Importamos SectionTitle
import SectionTitle from "../../SectionTitle/SectionTitle/SectionTitle.jsx"

// Importamos estilos
import "../../../assets/styles/App.css"
import "./Services.css"

// Importamos las imágenes de los servicios
import service1Img from "../../../assets/images/2-Services/idea.webp"
import service2Img from "../../../assets/images/2-Services/seo.webp"
import service3Img from "../../../assets/images/2-Services/graphic-design.webp"


const services = [
    {
        id: 1,
        img: service1Img,
        title: "HTML & CSS Architecture",
        text: "Clean, semantic and accessible layouts designed to scale.We build interfaces that are easy to maintain, fast to load and friendly for users and search engines."
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
        <section className="services">

            {/* Services Title */}
            <SectionTitle className="services__title-text" title="What We Do" />

            {/* Services Cards */}
            <div className="services__container">

                {/* .map() de cada Card */}
                {services.map(service => {
                    return (
                        <article key={service.id} className="services__card">
                            <img
                                draggable="false"
                                src={service.img}
                                alt={service.title}
                                className="services__card-image"
                            />
                            <h3 className="services__card-title">{service.title}</h3>
                            <p className="services__card-text">{service.text}</p>
                        </article>
                    )
                })}

            </div>

        </section>
    )
}
export default Services