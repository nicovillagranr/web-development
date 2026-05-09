// ================= CONTEXTO MODULO =================
// Todo el copy de la landing page centralizado en un solo archivo.
// Facilita cambios de texto sin tocar componentes.
import { FaRobot, FaCogs, FaChartLine, FaBrain } from 'react-icons/fa'

// --- Navbar ---
// Links del menú y texto del CTA. Consumido por Navbar.jsx.
export const NAV = {
  logo: 'NexusAI',
  links: [
    { label: 'Servicios', href: 'servicios' },
    { label: 'Proceso', href: 'proceso' },
    { label: 'Resultados', href: 'resultados' },
    { label: 'FAQ', href: 'faq' },
  ],
  cta: 'Agendar Llamada',
}

// --- Hero ---
// Headline principal, subheadline, textos de los CTAs y social proof.
// Consumido por Hero.jsx.
export const HERO = {
  headline: 'Construimos Soluciones de IA que ',
  headlineAccent: 'Multiplican tus Resultados',
  subheadline:
    'Ayudamos a empresas a automatizar procesos, reducir costos operativos y escalar sus operaciones con aplicaciones de Inteligencia Artificial a medida.',
  ctaPrimary: 'Agenda tu Consulta Gratuita',
  ctaSecondary: 'Ver Cómo Funciona',
  socialProof: '+50 empresas ya confían en nosotros',
}

// --- Pain Points ---
// Los 3 problemas que sufre el cliente antes de contratar NexusAI.
// Consumido por PainPoints.jsx.
export const PAIN_POINTS = {
  tag: 'EL PROBLEMA',
  headline:
    'La IA Puede Transformar tu Negocio... Pero Implementarla Solo Es Otra Historia',
  items: [
    {
      title: 'Falta de Expertise Técnico',
      description:
        'Tu equipo no tiene especialistas en IA y contratar talento interno es costoso y lento. Cada semana sin automatizar es dinero perdido.',
    },
    {
      title: 'Herramientas Genéricas que No Sirven',
      description:
        'ChatGPT y las herramientas gratuitas no resuelven tus problemas específicos. Necesitas soluciones construidas para TU negocio.',
    },
    {
      title: 'Miedo a Invertir sin Resultados',
      description:
        'Has escuchado las promesas de la IA pero no sabes por dónde empezar ni cómo medir el retorno de inversión.',
    },
  ],
}

// --- Services ---
// Los 4 servicios que ofrece NexusAI. Cada item lleva un icono de react-icons.
// Consumido por Services.jsx → ServiceCard.jsx.
export const SERVICES = {
  tag: 'SOLUCIONES',
  headline: 'Aplicaciones de IA Diseñadas para tu Negocio',
  subheadline:
    'Desde la estrategia hasta la implementación, construimos herramientas que generan impacto real desde el día uno.',
  items: [
    {
      Icon: FaRobot,
      title: 'Agentes de IA Conversacionales',
      description:
        'Chatbots inteligentes que atienden clientes 24/7, califican leads y agendan citas automáticamente. Reduce tu tiempo de respuesta a segundos.',
    },
    {
      Icon: FaCogs,
      title: 'Automatización de Procesos',
      description:
        'Flujos de trabajo automatizados que eliminan tareas repetitivas. Tu equipo se enfoca en lo que realmente importa.',
    },
    {
      Icon: FaChartLine,
      title: 'Análisis Predictivo',
      description:
        'Modelos de datos que anticipan tendencias, optimizan inventario y mejoran la toma de decisiones con información accionable.',
    },
    {
      Icon: FaBrain,
      title: 'Soluciones a Medida',
      description:
        'Aplicaciones personalizadas de IA integradas directamente a tus sistemas existentes. Sin disrupciones, solo resultados.',
    },
  ],
}

// --- Process ---
// Los 4 pasos del proceso de trabajo. Consumido por Process.jsx → ProcessStep.jsx.
export const PROCESS = {
  tag: 'PROCESO',
  headline: 'De la Idea al Impacto en 4 Pasos',
  subheadline:
    'Un proceso probado que elimina la incertidumbre y garantiza resultados medibles.',
  steps: [
    {
      number: '01',
      title: 'Diagnóstico',
      description:
        'Analizamos tus operaciones, identificamos cuellos de botella y definimos las oportunidades de mayor impacto con IA.',
    },
    {
      number: '02',
      title: 'Diseño',
      description:
        'Creamos la arquitectura de tu solución con prototipos funcionales. Ves resultados antes de comprometerte.',
    },
    {
      number: '03',
      title: 'Desarrollo',
      description:
        'Construimos e integramos la solución en sprints de 2 semanas. Transparencia total con demos constantes.',
    },
    {
      number: '04',
      title: 'Soporte Continuo',
      description:
        'Monitoreamos, optimizamos y escalamos tu solución. Tu IA mejora cada día con datos reales de tu negocio.',
    },
  ],
}

// --- Metrics ---
// Métricas clave del negocio. value es el número final del contador animado.
// Consumido por Metrics.jsx → MetricCard.jsx.
export const METRICS = {
  tag: 'RESULTADOS',
  headline: 'Números que Hablan por Sí Solos',
  items: [
    { value: 25, suffix: '+', label: 'Proyectos Entregados' },
    { value: 12000, suffix: '+', label: 'Horas Ahorradas a Clientes' },
    { value: 3, suffix: 'x', label: 'ROI Promedio en 6 Meses' },
    { value: 98, suffix: '%', label: 'Clientes Satisfechos' },
  ],
}

// --- Testimonials ---
// Testimonios de clientes con quote, nombre, rol y empresa.
// Consumido por Testimonials.jsx → TestimonialCard.jsx.
export const TESTIMONIALS = {
  tag: 'TESTIMONIOS',
  headline: 'Lo que Dicen Nuestros Clientes',
  items: [
    {
      quote:
        'NexusAI automatizó nuestro proceso de atención al cliente y redujimos los tiempos de respuesta en un 80%. La inversión se pagó sola en el primer mes.',
      name: 'María González',
      role: 'Directora de Operaciones',
      company: 'LogisTech MX',
    },
    {
      quote:
        'Pensé que la IA era solo para empresas grandes. NexusAI nos demostró que con la solución correcta, cualquier negocio puede competir en otro nivel.',
      name: 'Carlos Ruiz',
      role: 'CEO',
      company: 'Distribuidora Norte',
    },
    {
      quote:
        'El equipo de NexusAI no solo entrega tecnología, entiende el negocio. Su agente de ventas nos generó un 40% más de leads calificados.',
      name: 'Ana Martínez',
      role: 'Gerente Comercial',
      company: 'FinServ Solutions',
    },
  ],
}

// --- FAQ ---
// Preguntas frecuentes con acordeón animado.
// Consumido por Faq.jsx → FaqItem.jsx.
export const FAQ = {
  tag: 'PREGUNTAS FRECUENTES',
  headline: 'Resolvemos tus Dudas',
  items: [
    {
      question: '¿Cuánto tiempo toma implementar una solución de IA?',
      answer:
        'Dependiendo de la complejidad, un MVP funcional se entrega entre 4 y 8 semanas. Proyectos más robustos pueden tomar 3-4 meses con entregas incrementales cada 2 semanas.',
    },
    {
      question:
        '¿Necesito tener un equipo técnico para usar las soluciones?',
      answer:
        'No. Diseñamos interfaces intuitivas que cualquier persona de tu equipo puede usar. Además, incluimos capacitación completa y soporte continuo.',
    },
    {
      question: '¿Cuánto cuesta un proyecto de IA?',
      answer:
        'Cada proyecto es único. Ofrecemos una consulta gratuita donde evaluamos tus necesidades y te presentamos una propuesta con inversión clara y ROI proyectado. No hay sorpresas.',
    },
    {
      question:
        '¿Qué pasa si la solución no funciona como esperamos?',
      answer:
        'Trabajamos con metodología ágil y validamos cada etapa contigo. Si algo no cumple expectativas, iteramos hasta lograrlo. Tu satisfacción es nuestra prioridad.',
    },
    {
      question: '¿Se integra con los sistemas que ya usamos?',
      answer:
        'Sí. Nuestras soluciones se integran con CRMs, ERPs, plataformas de e-commerce, herramientas de comunicación y cualquier sistema que tu empresa ya utilice.',
    },
  ],
}

// --- Final CTA ---
// Sección de cierre con llamada a la acción principal. Consumido por FinalCta.jsx.
export const FINAL_CTA = {
  headline: '¿Listo para Transformar tu Negocio con IA?',
  subheadline:
    'Agenda una llamada gratuita de 30 minutos. Sin compromisos, sin presión. Solo una conversación honesta sobre cómo la IA puede ayudarte.',
  cta: 'Agendar Mi Consulta Gratuita',
  note: 'Cupos limitados este mes',
}

// --- Footer ---
// Datos del pie de página: logo, tagline, columnas de links y copyright.
// Consumido por Footer.jsx.
export const FOOTER = {
  logo: 'NexusAI',
  tagline: 'Inteligencia Artificial que Impulsa tu Negocio',
  columns: [
    {
      title: 'Empresa',
      links: [
        { label: 'Servicios', href: 'servicios' },
        { label: 'Proceso', href: 'proceso' },
        { label: 'Resultados', href: 'resultados' },
        { label: 'FAQ', href: 'faq' },
      ],
    },
    {
      title: 'Contacto',
      items: ['hola@nexusai.com', '+52 55 1234 5678', 'Ciudad de México, MX'],
    },
  ],
  copyright: `© ${new Date().getFullYear()} NexusAI. Todos los derechos reservados.`,
}

// --- Booking URL ---
// URL del calendario de Calendly. Usada en Navbar, Hero y FinalCta.
export const BOOKING_URL = 'https://calendly.com/nexusai/consulta'
