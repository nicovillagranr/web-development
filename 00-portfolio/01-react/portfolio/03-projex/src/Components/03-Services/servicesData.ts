// Importamos las imágenes de los servicios
import service1Img from "../../assets/images/2-Services/idea.webp"
import service2Img from "../../assets/images/2-Services/seo.webp"
import service3Img from "../../assets/images/2-Services/graphic-design.webp"

// Definimos la interfaz para TypeScript
export interface ServiceItem {
    id: number;
    img: string;
    title: string;
    text: string;
}

// Exportamos el arreglo tipado
export const services: ServiceItem[] = [
    {
        id: 1,
        img: service1Img,
        title: "HTML & CSS Architecture",
        text: "Clean, semantic and accessible layouts designed to scale. We build interfaces that are easy to maintain, fast to load and friendly for users and search engines."
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
];
