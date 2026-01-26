// Importamos SectionTitle
import SectionTitle from "../11-SectionTitle/SectionTitle.jsx"

// Importamos las imágenes de los miembros del equipo
import member1img from "../../assets/images/4-Team/team__member-1.webp"
import member2img from "../../assets/images/4-Team/team__member-2.webp"
import member3img from "../../assets/images/4-Team/team__member-3.webp"
import member4img from "../../assets/images/4-Team/team__member-4.webp"

// Importamos los Icons de las redes sociales
import twitterIcon from "../../assets/icons/2-Team/twitter.svg"
import pinterestIcon from "../../assets/icons/2-Team/pinterest.svg"
import facebookIcon from "../../assets/icons/2-Team/facebook.svg"
import googleIcon from "../../assets/icons/2-Team/google.svg"
import linkedinIcon from "../../assets/icons/2-Team/linkedin.svg"

const members = [
    {
        id: 1,
        img: member1img,
        name: "Elisa Mendoza",
        role: "CEO Founder",
        description: "Focused on product vision, business strategy and long-term scalability.",
        socials: [
            { platform: "Twitter", url: "#", bg: "#1DA1F2", icon: twitterIcon },
            { platform: "Pinterest", url: "#", bg: "#E60023", icon: pinterestIcon },
            { platform: "Facebook", url: "#", bg: "#1877F2", icon: facebookIcon },
            { platform: "Google", url: "#", bg: "#DB4437", icon: googleIcon },
            { platform: "LinkedIn", url: "#", bg: "#0A66C2", icon: linkedinIcon },
        ]
    },
    {
        id: 2,
        img: member2img,
        name: "Carlos Ramirez",
        role: "CTO Co-Founder",
        description: "Front-end architecture, performance optimization and technical decisions that scale.",
        socials: [
            { platform: "Twitter", url: "#", bg: "#1DA1F2", icon: twitterIcon },
            { platform: "Pinterest", url: "#", bg: "#E60023", icon: pinterestIcon },
            { platform: "Facebook", url: "#", bg: "#1877F2", icon: facebookIcon },
            { platform: "Google", url: "#", bg: "#DB4437", icon: googleIcon },
            { platform: "LinkedIn", url: "#", bg: "#0A66C2", icon: linkedinIcon },
        ]
    },
    {
        id: 3,
        img: member3img,
        name: "Ana Gutierrez",
        role: "Lead Designer",
        description: "User-centered design, accessibility and visual consistency across the product.",
        socials: [
            { platform: "Twitter", url: "#", bg: "#1DA1F2", icon: twitterIcon },
            { platform: "Pinterest", url: "#", bg: "#E60023", icon: pinterestIcon },
            { platform: "Facebook", url: "#", bg: "#1877F2", icon: facebookIcon },
            { platform: "Google", url: "#", bg: "#DB4437", icon: googleIcon },
            { platform: "LinkedIn", url: "#", bg: "#0A66C2", icon: linkedinIcon },
        ]
    },
    {
        id: 4,
        img: member4img,
        name: "Erika Fernandez",
        role: "Marketing Head",
        description: "Communication, positioning and growth strategies based on real user behavior.",
        socials: [
            { platform: "Twitter", url: "#", bg: "#1DA1F2", icon: twitterIcon },
            { platform: "Pinterest", url: "#", bg: "#E60023", icon: pinterestIcon },
            { platform: "Facebook", url: "#", bg: "#1877F2", icon: facebookIcon },
            { platform: "Google", url: "#", bg: "#DB4437", icon: googleIcon },
            { platform: "LinkedIn", url: "#", bg: "#0A66C2", icon: linkedinIcon },
        ]
    },
]


function Team() {
    return (
        <section className="w-full min-h-[75vh] bg-[#E8E8E8] py-10 px-4 flex flex-col items-center justify-center">

            {/* Title */}
            <SectionTitle className="text-black" title="People Behind the Product" />

            {/* Members */}
            <section className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mt-8">

                {members.map((member) => (
                    <article key={member.id} className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        <img src={member.img} alt={member.name} className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border-3 border-[#ff5959]" />
                        <h3 className="mt-4 text-lg font-semibold md:text-xl">{member.name}</h3>
                        <h4 className="text-sm text-gray-600 md:text-base">{member.role}</h4>
                        <p className="mt-3 text-xs text-gray-700">{member.description}</p>

                        {/* Social Media */}
                        <div className="flex gap-3 mt-4">
                            {member.socials.map(social => {
                                return (
                                    <a href={social.url} aria-label={social.platform} className="w-7 h-7 flex items-center justify-center rounded-full transition-transform hover:scale-110" style={{ backgroundColor: social.bg }} key={social.platform}>
                                        <img src={social.icon} alt={social.platform} className="w-4 h-4" />
                                    </a>
                                )
                            })}
                        </div>
                    </article>
                ))}
            </section>
        </section>

    )
}

export default Team