export type Service = {
  id: string;
  name: string;
  summary: string;
  includes: string[];
  /** Qué icono lleva la tarjeta. El dibujo vive en ServiceCard; aquí solo se elige. */
  icon: "pc" | "web" | "cad";
  /** Precio de referencia en CLP. Sin él, la tarjeta dice "A cotizar". */
  priceFrom?: number;
};

// Sin priceFrom en ninguno a propósito: un precio inventado en una página que se va a
// mostrar es una promesa. Cuando haya precios reales, basta con añadir el campo.
export const services: Service[] = [
  {
    id: "pcs",
    name: "Mantenimiento y armado de PCs",
    summary:
      "Tu computador más rápido y estable, o uno nuevo armado a la medida de lo que haces y de tu presupuesto.",
    includes: [
      "Limpieza interna y cambio de pasta térmica",
      "Diagnóstico de fallas y lentitud",
      "Formateo e instalación del sistema",
      "Armado a medida, con asesoría para elegir componentes",
    ],
    icon: "pc",
  },
  {
    id: "paginas-web",
    name: "Creación de páginas web",
    summary:
      "Una página rápida, que se ve bien en el celular y lleva a tus clientes directo a contactarte.",
    includes: [
      "Diseño pensado primero para el celular, como esta página",
      "Contacto directo a tu WhatsApp",
      "Publicación en tu propio dominio",
      "Cambios de textos e imágenes después de la entrega",
    ],
    icon: "web",
  },
  {
    id: "solidworks",
    name: "Diseño mecánico en SolidWorks",
    summary:
      "Modelamos tus piezas y ensambles en 3D y preparamos los planos para que se puedan fabricar.",
    includes: [
      "Modelado 3D de piezas y ensambles",
      "Planos de fabricación con cotas y tolerancias",
      "De un boceto o una pieza física a modelo 3D",
      "Archivos para impresión 3D o mecanizado (STL, STEP)",
    ],
    icon: "cad",
  },
];
