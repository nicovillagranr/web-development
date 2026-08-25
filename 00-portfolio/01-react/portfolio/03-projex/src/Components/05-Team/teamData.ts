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
        role: "CEO y fundadora",
        description: "Enfocada en la visión de producto, la estrategia de negocio y la escalabilidad a largo plazo.",
        socials
    },
    {
        id: 2,
        img: member2img,
        name: "Carlos Ramírez",
        role: "CTO y cofundador",
        description: "Arquitectura front-end, optimización de rendimiento y decisiones técnicas que escalan.",
        socials
    },
    {
        id: 3,
        img: member3img,
        name: "Ana Gutiérrez",
        role: "Diseñadora principal",
        description: "Diseño centrado en las personas, accesibilidad y consistencia visual en todo el producto.",
        socials
    },
    {
        id: 4,
        img: member4img,
        name: "Erika Fernández",
        role: "Jefa de marketing",
        description: "Comunicación, posicionamiento y estrategias de crecimiento basadas en el comportamiento real de los usuarios.",
        socials
    },
]
