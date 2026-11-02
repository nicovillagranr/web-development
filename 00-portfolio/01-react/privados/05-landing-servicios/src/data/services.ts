import type { Tone } from "./tone";

export type Service = {
  id: string;
  /** Lo que se lee en grande en la cabecera de color de la tarjeta. */
  title: string;
  tagline: string;
  /** Nombre completo: va en el mensaje de WhatsApp, donde "PCs" a secas se queda corto. */
  name: string;
  /** Texto del botón. Ya nombra el servicio, así que no hace falta texto oculto extra. */
  cta: string;
  includes: string[];
  /** Color de la tarjeta. El icono sale del mismo color: uno por servicio. */
  tone: Tone;
  /** Precio de referencia en CLP. Sin él, la tarjeta dice "A cotizar". */
  priceFrom?: number;
};

// Sin priceFrom en ninguno a propósito: el mockup dejaba "Desde [TU PRECIO]", y un
// precio inventado en una página que se va a mostrar es una promesa. Cuando haya
// precios reales, basta con añadir el campo.
export const services: Service[] = [
  {
    id: "pcs",
    title: "PCs",
    tagline: "Mantenimiento y armado",
    name: "Mantenimiento y armado de PCs",
    cta: "Cotizar PCs",
    includes: [
      "Limpieza interna y cambio de pasta térmica",
      "Formateo e instalación de programas",
      "Armado de PC gamer o de trabajo",
      "Asesoría para comprar componentes",
    ],
    tone: "pc",
  },
  {
    id: "paginas-web",
    title: "Páginas web",
    tagline: "Creación y rediseño",
    name: "Creación de páginas web",
    cta: "Cotizar web",
    includes: [
      "Landing pages y sitios para negocios",
      "Diseño adaptado a celular",
      "Botón directo a WhatsApp",
      "Ayuda con dominio y publicación",
    ],
    tone: "web",
  },
  {
    id: "solidworks",
    title: "SolidWorks",
    tagline: "Diseño mecánico",
    name: "Diseño mecánico en SolidWorks",
    cta: "Cotizar SolidWorks",
    includes: [
      "Modelado de piezas y ensambles 3D",
      "Planos técnicos con cotas",
      "Archivos listos para impresión 3D",
      "Apoyo en proyectos y trabajos",
    ],
    tone: "cad",
  },
];
