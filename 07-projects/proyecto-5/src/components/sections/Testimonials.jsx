// ================= CONTEXTO MODULO =================
// Seccion de testimonios con tarjetas de clientes y diseño editorial.
import { TESTIMONIALS } from '../../data/content'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import TestimonialCard from '../ui/TestimonialCard'

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 relative">
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-brand-accent/15 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header centrado con tag y headline */}
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <span className="text-brand-accent text-xs font-body font-500 uppercase tracking-tag">
              {TESTIMONIALS.tag}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-800 text-brand-text mt-4 tracking-tight">
              {TESTIMONIALS.headline}
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Grid de 3 testimonios con stagger de 0.12s entre cada card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.items.map((item, i) => (
            <TestimonialCard key={item.name} {...item} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}
