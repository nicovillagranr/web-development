// Todo lo que identifica al negocio vive aquí y en services.ts. Los componentes no
// llevan textos de negocio: cambiar de rubro es editar estos dos archivos.

type Contact = {
  /**
   * Formato que pide wa.me: código de país + número, sin "+", espacios ni guiones.
   *
   * PROVISIONAL. Antes de mostrarlo, pon un número tuyo: con este, el botón abre un
   * chat que WhatsApp rechaza como inválido.
   */
  whatsappNumber: string;
  /** Opcionales: si no están, la página no deja el hueco ni un "[TU CORREO]" a la vista. */
  email?: string;
  city?: string;
};

export const contact: Contact = {
  whatsappNumber: "56900000000",
};

export const site = {
  name: "SERVICIOS VPS",
  defaultMessage: "Hola, vi su sitio y quiero cotizar un servicio.",
  hero: {
    badge: "Cotización sin costo · Respuesta rápida",
    title: "Tu PC, tu web y tus diseños,",
    // Va aparte porque se pinta en naranja: así el componente no tiene que partir un
    // texto que no es suyo.
    titleAccent: "resueltos en un solo lugar.",
    subtitle:
      "Mantenimiento y armado de computadores, creación de páginas web y diseño mecánico en SolidWorks. Escríbenos y te respondemos con una propuesta clara.",
    tiles: [
      { tone: "pc", title: "PCs", text: "Armado y mantención" },
      { tone: "web", title: "Páginas web", text: "Diseño a tu medida" },
      { tone: "cad", title: "SolidWorks", text: "Modelado 3D y planos" },
      { tone: "soporte", title: "Soporte", text: "Seguimiento post-servicio" },
    ],
  },
  steps: [
    {
      tone: "pc",
      title: "Escríbenos",
      text: "Cuéntanos por WhatsApp qué necesitas. Si tienes fotos o archivos, envíalos.",
    },
    {
      tone: "web",
      title: "Recibe tu cotización",
      text: "Te enviamos un precio claro y un plazo, sin costo y sin compromiso.",
    },
    {
      tone: "cad",
      title: "Listo y funcionando",
      text: "Hacemos el trabajo, te lo entregamos y te explicamos todo lo que hicimos.",
    },
  ],
  faqs: [
    {
      question: "¿La cotización tiene costo?",
      answer: "No. Nos cuentas lo que necesitas y te enviamos un precio y un plazo sin compromiso.",
    },
    {
      question: "¿Cuánto se demora un mantenimiento de PC?",
      // El mockup seguía con "[PLAZO HABITUAL]". Cuando haya un plazo real, va al final.
      answer: "Depende del equipo y del trabajo. Te damos el plazo exacto al cotizar.",
    },
    {
      question: "¿La página web se verá bien en celular?",
      answer:
        "Sí. Todas las páginas se diseñan pensando primero en el celular y luego en computador.",
    },
    {
      question: "¿En qué formatos entregan los archivos de SolidWorks?",
      answer:
        "Entregamos el archivo nativo y, si lo necesitas, PDF de planos y STL o STEP para fabricación o impresión 3D.",
    },
  ],
} as const;
