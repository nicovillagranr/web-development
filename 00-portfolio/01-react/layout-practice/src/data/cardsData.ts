// Import de Icons
import wandIcon from "../assets/icons/wand-magic-sparkles-solid-full.svg"
import boltIcon from "../assets/icons/bolt-solid-full.svg"
import mobileIcon from "../assets/icons/mobile-screen-solid-full.svg"
import paintbrushIcon from "../assets/icons/paintbrush.svg"
import lockIcon from "../assets/icons/user-lock-solid-full.svg"
import rocketIcon from "../assets/icons/rocket.svg"


interface CardProps {
    id: number;
    icon: string;
    title: string;
    text: string;
}


export const cardsData: CardProps[] = [
    {
        id: 1,
        icon: wandIcon,
        title: "Modern Design",
        text: "Beautiful glass morphism effects with backdrop blur and translucent elements that create depth and visual hierarchy."
    },
    {
        id: 2,
        icon: boltIcon,
        title: "Fast Performance",
        text: "Optimized animations and effects that maintain smooth 60fps performance across all modern browsers and devices"
    },
    {
        id: 3,
        icon: mobileIcon,
        title: "Responsive",
        text: "Fully responsive design that adapts beautifully to any screen size, from mobile phones to desktop displays."
    },
    {
        id: 4,
        icon: paintbrushIcon,
        title: "Interactive UI",
        text: "Engaging hover effects, smooth transitions, and micro-animations that create delightful user experiences."
    },
    {
        id: 5,
        icon: lockIcon,
        title: "Secure & Safe",
        text: "Built with modern security standards and best practices to ensure your data and user privacy are protected."
    },
    {
        id: 6,
        icon: rocketIcon,
        title: "Easy Integration",
        text: "Simple to implement and customize for any project with clean, well-documented code and flexible components."
    }
]
