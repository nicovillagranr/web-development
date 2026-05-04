// Importamos SectionTitle
import SectionTitle from "../SectionTitle/SectionTitle.jsx"
import { FaTwitter, FaPinterest, FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa"

// Importamos las imagenes de los miembros del equipo
import member1img from "../../assets/images/4-Team/team__member-1.webp"
import member2img from "../../assets/images/4-Team/team__member-2.webp"
import member3img from "../../assets/images/4-Team/team__member-3.webp"
import member4img from "../../assets/images/4-Team/team__member-4.webp"

// Map de iconos por plataforma
const socialIcons = {
    Twitter: FaTwitter,
    Pinterest: FaPinterest,
    Facebook: FaFacebook,
    Google: FaGoogle,
    LinkedIn: FaLinkedin,
}

const socials = [
    { platform: "Twitter", bg: "#1DA1F2" },
    { platform: "Pinterest", bg: "#E60023" },
    { platform: "Facebook", bg: "#1877F2" },
    { platform: "Google", bg: "#DB4437" },
    { platform: "LinkedIn", bg: "#0A66C2" },
]

const members = [
    {
        id: 1,
        img: member1img,
        name: "Elisa Mendoza",
        role: "CEO Founder",
        description: "Focused on product vision, business strategy and long-term scalability.",
        socials,
    },
    {
        id: 2,
        img: member2img,
        name: "Carlos Ramirez",
        role: "CTO Co-Founder",
        description: "Front-end architecture, performance optimization and technical decisions that scale.",
        socials,
    },
    {
        id: 3,
        img: member3img,
        name: "Ana Gutierrez",
        role: "Lead Designer",
        description: "User-centered design, accessibility and visual consistency across the product.",
        socials,
    },
    {
        id: 4,
        img: member4img,
        name: "Erika Fernandez",
        role: "Marketing Head",
        description: "Communication, positioning and growth strategies based on real user behavior.",
        socials,
    },
]

function Team() {
    return (
        <section className="w-full min-h-[75vh] bg-surface flex flex-col items-center justify-center px-4 py-4">
            {/* Title */}
            <SectionTitle className="text-black" title="People Behind the Product" level={2} />

            {/* Members */}
            <ul className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mt-6">
                {members.map((member) => (
                    <li key={member.id}>
                        <article className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden bg-white">
                            <img
                                loading="lazy"
                                decoding="async"
                                width="200"
                                height="200"
                                draggable="false"
                                src={member.img}
                                alt={member.name}
                                className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border-4 border-primary"
                            />

                            <div className="flex flex-col flex-1">
                                <h3 className="mt-4 text-lg font-semibold md:text-xl">{member.name}</h3>
                                <p className="text-sm text-gray-600 md:text-base">{member.role}</p>
                                <p className="mt-3 text-xs text-gray-700">{member.description}</p>
                            </div>

                            {/* Social Media */}
                            <div className="flex gap-3 mt-auto pt-4">
                                {member.socials.map((social) => {
                                    const IconComponent = socialIcons[social.platform]
                                    return (
                                        <button
                                            type="button"
                                            key={social.platform}
                                            aria-label={`${social.platform} demo`}
                                            className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-full transition-transform hover:scale-110"
                                            style={{ backgroundColor: social.bg }}
                                        >
                                            <IconComponent className="w-5 h-5 md:w-4 md:h-4 text-white" />
                                        </button>
                                    )
                                })}
                            </div>

                            <div className="w-full mt-3">
                                <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold tracking-wide text-amber-900">
                                    Perfil demo: sin redes sociales
                                </p>
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    )
}
export default Team