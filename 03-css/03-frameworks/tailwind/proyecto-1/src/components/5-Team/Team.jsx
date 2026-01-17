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
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
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
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
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
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
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
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
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
            <h2 className="text-xl font-semibold text-center md:text-3xl">Our Wonderful Team</h2>
            <div className="flex items-center gap-3 mt-4">
                <span className="w-24 h-px bg-gray-400 md:w-40" />
                <span className="w-2 h-2 bg-gray-400 rounded-full" />
                <span className="w-24 h-px bg-gray-400 md:w-40" />
            </div>

            {/* Members */}
            <section className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mt-8">

                {members.map((member) => (
                    <article key={member.id} className="flex flex-col items-center text-center p-6 rounded-lg shadow-md hover:transform  hover:transition-all  hover:ease-in-out hover:-translate-y-2 hover:duration-500">
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