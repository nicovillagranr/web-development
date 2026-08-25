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
        title: "Arquitectura HTML y CSS",
        text: "Maquetados limpios, semánticos y accesibles, pensados para crecer. Construimos interfaces fáciles de mantener, rápidas de cargar y amables tanto para las personas como para los buscadores."
    },
    {
        id: 2,
        img: service2Img,
        title: "Optimización SEO",
        text: "El rendimiento no es opcional. Optimizamos tiempos de carga, estructura y metadatos para que tu producto sea visible y rápido desde el primer día."
    },
    {
        id: 3,
        img: service3Img,
        title: "Sistemas de UI y consistencia visual",
        text: "Creamos componentes reutilizables y sistemas visuales que mantienen tu producto coherente a medida que crece, sin rediseños cada seis meses."
    }
];
