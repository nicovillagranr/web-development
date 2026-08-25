import newsImage1 from "../../assets/images/5-News/news-1.webp"
import newsImage2 from "../../assets/images/5-News/news-2.webp"
import newsImage3 from "../../assets/images/5-News/news-3.webp"

export interface NewsItem {
    id: number
    image: string
    title: string
    date: string
    datetime: string
    text: string
    author: string
}

export const news: NewsItem[] = [
    {
        id: 1,
        image: newsImage1,
        title: "Por qué el rendimiento importa más que las funcionalidades en un producto que recién parte",
        date: "20 de agosto de 2023",
        datetime: "2023-08-20",
        text: "En los productos jóvenes se sacrifican la velocidad, la accesibilidad y la claridad para sumar funcionalidades. Explicamos por qué priorizar los fundamentos reduce la deuda técnica y acelera el crecimiento real.",
        author: "Equipo Projex",
    },
    {
        id: 2,
        image: newsImage2,
        title: "Cómo abordamos la arquitectura front-end en proyectos que tienen que escalar",
        date: "28 de agosto de 2023",
        datetime: "2023-08-28",
        text: "Desde la estructura de componentes hasta la separación de los datos, compartimos los principios que seguimos para que un proyecto front-end siga siendo mantenible mientras crece.",
        author: "Equipo Projex",
    },
    {
        id: 3,
        image: newsImage3,
        title: "La buena UX es invisible: lecciones de proyectos con clientes reales",
        date: "3 de septiembre de 2023",
        datetime: "2023-09-03",
        text: "Los usuarios rara vez notan una buena UX, pero sienten de inmediato cuando falta. Estas son las ideas prácticas que aplicamos para evitar fricción y confusión.",
        author: "Equipo Projex",
    },
    {
        id: 4,
        image: newsImage1,
        title: "Por qué la mayoría de los sitios fracasa antes de que alguien lea el contenido",
        date: "10 de septiembre de 2023",
        datetime: "2023-09-10",
        text: "Los tiempos de carga lentos, una jerarquía pobre y un mensaje poco claro hacen que la gente se vaya antes de interesarse. Desglosamos los errores más comunes y cómo evitarlos.",
        author: "Equipo Projex",
    },
]
