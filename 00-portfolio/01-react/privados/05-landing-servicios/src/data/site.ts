// Todo lo que identifica al negocio vive aquí y en services.ts. Los componentes no
// llevan textos de negocio: cambiar de rubro es editar estos dos archivos.

export const site = {
  name: "Brío",
  /**
   * Formato que pide wa.me: código de país + número, sin "+", espacios ni guiones.
   *
   * PROVISIONAL. Antes de mostrarlo, pon un número tuyo: con este, el botón abre un
   * chat que WhatsApp rechaza como inválido.
   */
  whatsappNumber: "56900000000",
  defaultMessage: "Hola, vi su sitio y quiero cotizar un servicio.",
  hero: {
    eyebrow: "Servicios técnicos y de diseño",
    // \u00a0 es un espacio que no corta línea: sin él, en móvil quedaba "en" al final
    // de una línea y "3D." solo al principio de la siguiente.
    title: "Tu PC, tu web y tus piezas en\u00a03D. Resuelto.",
    subtitle:
      "Armamos y mantenemos computadores, creamos páginas web y modelamos piezas mecánicas en SolidWorks. Cuéntanos qué necesitas y te cotizamos sin costo.",
  },
  highlights: [
    "Cotización sin costo",
    "Respuesta en menos de 24 h",
    "Te explicamos todo sin tecnicismos",
  ],
  steps: [
    {
      title: "Nos escribes",
      text: "Cuéntanos por WhatsApp qué necesitas. Una foto del equipo, un boceto de la pieza o un audio también sirven.",
    },
    {
      title: "Te cotizamos",
      text: "Te respondemos con un precio cerrado y un plazo, sin letra chica.",
    },
    {
      title: "Lo hacemos",
      text: "Te mostramos avances en el camino y te entregamos el trabajo listo para usar.",
    },
  ],
} as const;
