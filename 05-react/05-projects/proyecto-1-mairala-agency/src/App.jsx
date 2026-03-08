import { useState } from 'react'
import './App.css'

const SERVICES = [
  {
    id: 'brand',
    name: 'Brand Strategy',
    description: 'Definimos posicionamiento, narrativa y sistema visual para marcas digitales.',
  },
  {
    id: 'product',
    name: 'Product Design',
    description: 'Disenamos experiencias web enfocadas en conversion y usabilidad.',
  },
  {
    id: 'growth',
    name: 'Growth Ops',
    description: 'Construimos funnels y dashboards para acelerar aprendizaje comercial.',
  },
]

const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Mairala paso de una landing basica a un sistema completo de captacion en 6 semanas.',
    author: 'Camila Ruiz - Founder, Nube Studio',
  },
  {
    id: 2,
    quote: 'El equipo no solo diseno: alineo marketing y producto con una sola narrativa.',
    author: 'Javier Tellez - CMO, AtlasPay',
  },
  {
    id: 3,
    quote: 'Subimos conversiones un 34% con decisiones simples y medibles.',
    author: 'Marta Ossa - Growth Lead, Terracota',
  },
]

const FAQ = [
  {
    id: 1,
    question: 'Cuanto dura un proyecto promedio?',
    answer: 'Entre 4 y 10 semanas segun alcance y equipo disponible.',
  },
  {
    id: 2,
    question: 'Trabajan solo con startups?',
    answer: 'No. Trabajamos con startups, pymes y equipos corporativos.',
  },
  {
    id: 3,
    question: 'Entregan sistema de componentes?',
    answer: 'Si, entregamos UI kit y guias para evolucionar el producto.',
  },
]

function ServiceTabs({ activeId, onSelect }) {
  return (
    <div className="tabs">
      {SERVICES.map((service) => (
        <button
          key={service.id}
          className={activeId === service.id ? 'active' : ''}
          onClick={() => onSelect(service.id)}
        >
          {service.name}
        </button>
      ))}
    </div>
  )
}

function Testimonials({ index, onPrev, onNext }) {
  const testimonial = TESTIMONIALS[index]

  return (
    <article className="testimonial card">
      <p className="quote">"{testimonial.quote}"</p>
      <p className="author">{testimonial.author}</p>
      <div className="controls">
        <button onClick={onPrev}>Anterior</button>
        <button onClick={onNext}>Siguiente</button>
      </div>
    </article>
  )
}

function FaqList({ openId, onToggle }) {
  return (
    <ul className="faq-list">
      {FAQ.map((item) => (
        <li key={item.id} className="card">
          <button className="faq-question" onClick={() => onToggle(item.id)}>
            {item.question}
          </button>
          {openId === item.id && <p>{item.answer}</p>}
        </li>
      ))}
    </ul>
  )
}

export default function App() {
  const [activeService, setActiveService] = useState(SERVICES[0].id)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [openFaq, setOpenFaq] = useState(FAQ[0].id)

  const selectedService = SERVICES.find((service) => service.id === activeService)

  function nextTestimonial() {
    setTestimonialIndex((current) => (current + 1) % TESTIMONIALS.length)
  }

  function prevTestimonial() {
    setTestimonialIndex((current) =>
      current === 0 ? TESTIMONIALS.length - 1 : current - 1,
    )
  }

  return (
    <main>
      <header className="hero">
        <p className="eyebrow">Mairala Agency</p>
        <h1>Design + Growth para productos digitales que necesitan resultados</h1>
        <p>
          Unimos estrategia de marca, UX y growth para que tu producto escale con foco.
        </p>
        <a href="#contacto" className="cta">
          Solicitar diagnostico
        </a>
      </header>

      <section className="section" id="servicios">
        <h2>Servicios</h2>
        <ServiceTabs activeId={activeService} onSelect={setActiveService} />
        <article className="card service-highlight">
          <h3>{selectedService.name}</h3>
          <p>{selectedService.description}</p>
        </article>
      </section>

      <section className="section" id="testimonios">
        <h2>Casos y testimonios</h2>
        <Testimonials
          index={testimonialIndex}
          onPrev={prevTestimonial}
          onNext={nextTestimonial}
        />
      </section>

      <section className="section" id="faq">
        <h2>Preguntas frecuentes</h2>
        <FaqList
          openId={openFaq}
          onToggle={(id) => setOpenFaq((current) => (current === id ? 0 : id))}
        />
      </section>

      <section className="section contact" id="contacto">
        <h2>Listo para el siguiente sprint?</h2>
        <p>
          Agenda una llamada de 30 minutos y te devolvemos un plan accionable para tu web.
        </p>
        <a href="mailto:hola@mairala.agency" className="cta secondary">
          hola@mairala.agency
        </a>
      </section>
    </main>
  )
}
