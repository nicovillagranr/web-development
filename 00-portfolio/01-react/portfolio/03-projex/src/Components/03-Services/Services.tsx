// Data
import { services } from "./servicesData"

// Importamos SectionTitle
import SectionTitle from "../SectionTitle/SectionTitle.tsx"


function Services() {
    return (
        <section className="w-full min-h-[75vh] bg-surface flex flex-col items-center justify-center p-5">
            {/* Services Title */}
            <SectionTitle className="text-black" title="Qué hacemos" level={1} />

            {/* Services Cards */}
            <div className="w-[90%] mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map(service => {
                    return (
                        <article key={service.id} className="flex flex-col items-center justify-center gap-4 p-6 md:p-10 rounded-lg bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                            <img
                                decoding="async"
                                width="80"
                                height="80"
                                draggable="false"
                                src={service.img}
                                alt={service.title}
                                aria-hidden="true"
                                className="w-24 h-24 md:w-32 md:h-32" />
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
