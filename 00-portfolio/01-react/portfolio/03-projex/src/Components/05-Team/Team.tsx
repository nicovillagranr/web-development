import SectionTitle from "../SectionTitle/SectionTitle.tsx"

import {
    FaTwitter,
    FaPinterest,
    FaFacebook,
    FaGoogle,
    FaLinkedin,
} from "react-icons/fa"

import { members, type SocialPlatform } from "./teamData.ts"

const socialIcons: Record<SocialPlatform, React.ElementType> = {
    Twitter: FaTwitter,
    Pinterest: FaPinterest,
    Facebook: FaFacebook,
    Google: FaGoogle,
    LinkedIn: FaLinkedin,
}

function Team() {
    return (
        <section className="flex min-h-[75vh] w-full flex-col items-center justify-center bg-surface px-4 py-4">
            {/* Title */}
            <SectionTitle className="text-black" title="Quiénes están detrás" level={1} />
            {/* Members */}
            <ul className="mt-6 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {members.map((member) => (
                    <li key={member.id}>
                        <article className="flex flex-col h-full items-center overflow-hidden rounded-lg bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <img
                                decoding="async"
                                width="200"
                                height="200"
                                draggable="false"
                                src={member.img}
                                alt={member.name}
                                className="h-48 w-48 rounded-full border-4 border-primary object-cover sm:h-56 sm:w-56"
                            />

                            <div className="flex flex-1 flex-col">
                                <h3 className="mt-4 text-lg font-semibold md:text-xl">
                                    {member.name}
                                </h3>

                                <p className="text-sm text-gray-600 md:text-base">
                                    {member.role}
                                </p>

                                <p className="mt-3 text-xs text-gray-700">
                                    {member.description}
                                </p>
                            </div>

                            {/* Social Media */}
                            <div className="mt-auto flex gap-3 pt-4">
                                {member.socials.map((social) => {
                                    const IconComponent = socialIcons[social.platform]
                                    return (
                                        <button
                                            type="button"
                                            key={social.platform}
                                            aria-label={`${social.platform} (demo)`}
                                            className="flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-110 md:h-7 md:w-7"
                                            style={{ backgroundColor: social.bg }}>
                                            <IconComponent className="h-5 w-5 text-white md:h-4 md:w-4" />
                                        </button>
                                    )
                                })}
                            </div>

                            <div className="mt-3 w-full">
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
