import member1img from "../../assets/images/4-Team/team__member-1.webp"
import member2img from "../../assets/images/4-Team/team__member-2.webp"
import member3img from "../../assets/images/4-Team/team__member-3.webp"
import member4img from "../../assets/images/4-Team/team__member-4.webp"

export type SocialPlatform =
    | "Twitter"
    | "Pinterest"
    | "Facebook"
    | "Google"
    | "LinkedIn"

export interface Social {
    platform: SocialPlatform
    bg: string
}

export interface TeamMember {
    id: number
    img: string
    name: string
    role: string
    description: string
    socials: Social[]
}

export const socials: Social[] = [
    { platform: "Twitter", bg: "#1DA1F2" },
    { platform: "Pinterest", bg: "#E60023" },
    { platform: "Facebook", bg: "#1877F2" },
    { platform: "Google", bg: "#DB4437" },
    { platform: "LinkedIn", bg: "#0A66C2" },
]

export const members: TeamMember[] = [
    {
        id: 1,
        img: member1img,
        name: "Elisa Mendoza",
        role: "CEO Founder",
        description: "Focused on product vision, business strategy and long-term scalability.",
        socials
    },
    {
        id: 2,
        img: member2img,
        name: "Carlos Ramirez",
        role: "CTO Co-Founder",
        description: "Front-end architecture, performance optimization and technical decisions that scale.",
        socials
    },
    {
        id: 3,
        img: member3img,
        name: "Ana Gutierrez",
        role: "Lead Designer",
        description: "User-centered design, accessibility and visual consistency across the product.",
        socials
    },
    {
        id: 4,
        img: member4img,
        name: "Erika Fernandez",
        role: "Marketing Head",
        description: "Communication, positioning and growth strategies based on real user behavior.",
        socials
    },
]
