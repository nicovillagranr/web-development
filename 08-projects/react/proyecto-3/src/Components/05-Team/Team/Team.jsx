// Importamos SectionTitle
import SectionTitle from "../../SectionTitle/SectionTitle/SectionTitle.jsx"

// Importamos estilos
import "../../../assets/styles/App.css"
import "./Team.css"

// Importamos las imagenes de los miembros del equipo
import member1img from "../../../assets/images/4-Team/team__member-1.webp"
import member2img from "../../../assets/images/4-Team/team__member-2.webp"
import member3img from "../../../assets/images/4-Team/team__member-3.webp"
import member4img from "../../../assets/images/4-Team/team__member-4.webp"

// Importamos los iconos de redes sociales
import twitterIcon from "../../../assets/icons/2-Team/twitter.svg"
import pinterestIcon from "../../../assets/icons/2-Team/pinterest.svg"
import facebookIcon from "../../../assets/icons/2-Team/facebook.svg"
import googleIcon from "../../../assets/icons/2-Team/google.svg"
import linkedinIcon from "../../../assets/icons/2-Team/linkedin.svg"

const members = [
    {
        id: 1,
        img: member1img,
        name: "Elisa Mendoza",
        role: "CEO Founder",
        description: "Focused on product vision, business strategy and long-term scalability.",
        socials: [
            { platform: "Twitter", bg: "#1DA1F2", icon: twitterIcon },
            { platform: "Pinterest", bg: "#E60023", icon: pinterestIcon },
            { platform: "Facebook", bg: "#1877F2", icon: facebookIcon },
            { platform: "Google", bg: "#DB4437", icon: googleIcon },
            { platform: "LinkedIn", bg: "#0A66C2", icon: linkedinIcon },
        ],
    },
    {
        id: 2,
        img: member2img,
        name: "Carlos Ramirez",
        role: "CTO Co-Founder",
        description: "Front-end architecture, performance optimization and technical decisions that scale.",
        socials: [
            { platform: "Twitter", bg: "#1DA1F2", icon: twitterIcon },
            { platform: "Pinterest", bg: "#E60023", icon: pinterestIcon },
            { platform: "Facebook", bg: "#1877F2", icon: facebookIcon },
            { platform: "Google", bg: "#DB4437", icon: googleIcon },
            { platform: "LinkedIn", bg: "#0A66C2", icon: linkedinIcon },
        ],
    },
    {
        id: 3,
        img: member3img,
        name: "Ana Gutierrez",
        role: "Lead Designer",
        description: "User-centered design, accessibility and visual consistency across the product.",
        socials: [
            { platform: "Twitter", bg: "#1DA1F2", icon: twitterIcon },
            { platform: "Pinterest", bg: "#E60023", icon: pinterestIcon },
            { platform: "Facebook", bg: "#1877F2", icon: facebookIcon },
            { platform: "Google", bg: "#DB4437", icon: googleIcon },
            { platform: "LinkedIn", bg: "#0A66C2", icon: linkedinIcon },
        ],
    },
    {
        id: 4,
        img: member4img,
        name: "Erika Fernandez",
        role: "Marketing Head",
        description: "Communication, positioning and growth strategies based on real user behavior.",
        socials: [
            { platform: "Twitter", bg: "#1DA1F2", icon: twitterIcon },
            { platform: "Pinterest", bg: "#E60023", icon: pinterestIcon },
            { platform: "Facebook", bg: "#1877F2", icon: facebookIcon },
            { platform: "Google", bg: "#DB4437", icon: googleIcon },
            { platform: "LinkedIn", bg: "#0A66C2", icon: linkedinIcon },
        ],
    },
]

function Team() {
    return (
        <section className="team">
            {/* Title */}
            <SectionTitle className="team__title-text" title="People Behind the Product" />

            {/* Members */}
            <section className="team__container">
                {members.map((member) => (
                    <article
                        key={member.id}
                        className="team__card"
                    >
                        <img
                            src={member.img}
                            alt={member.name}
                            className="team__card-image"
                        />

                        <div className="team__card-content">
                            <h3 className="team__card-name">{member.name}</h3>
                            <h4 className="team__card-role">{member.role}</h4>
                            <p className="team__card-description">{member.description}</p>
                        </div>

                        {/* Social Media */}
                        <ul className="team__socials" aria-label={`Social platforms for ${member.name}`}>
                            {member.socials.map((social) => (
                                <li
                                    key={social.platform}
                                    className="team__social-item"
                                >
                                    <span
                                        className="team__social-badge"
                                        style={{ backgroundColor: social.bg }}
                                        title={social.platform}
                                    >
                                        <img
                                            src={social.icon}
                                            alt=""
                                            aria-hidden="true"
                                            className="team__social-icon"
                                        />
                                        <span className="sr-only">{social.platform}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="team__demo-notice">
                            <p className="team__demo-text">
                                Demo profile: social platforms are shown for presentation only.
                            </p>
                        </div>
                    </article>
                ))}
            </section>
        </section>
    )
}
export default Team
