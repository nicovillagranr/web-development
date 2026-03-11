// ================= CONTEXTO MODULO =================
// Seccion de servicios con grid bento asimetrico.
import { SERVICES } from '../../data/content'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import ServiceCard from '../ui/ServiceCard'

export default function Services() {
  return (
    <section id="servicios" className="py-24 md:py-32 px-6 md:px-10 relative">
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-accent/15 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <div className="mb-16 max-w-2xl">
            <span className="text-brand-accent text-xs font-body font-500 uppercase tracking-[0.3em]">
              {SERVICES.tag}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-800 text-brand-text mt-4 mb-5 leading-tight tracking-tight">
              {SERVICES.headline}
            </h2>
            <p className="text-brand-muted text-lg font-300 leading-relaxed">
              {SERVICES.subheadline}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Bento grid - asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <ServiceCard {...SERVICES.items[0]} delay={0} featured />
          </div>
          <div>
            <ServiceCard {...SERVICES.items[1]} delay={0.1} />
          </div>
          <div>
            <ServiceCard {...SERVICES.items[2]} delay={0.2} />
          </div>
          <div className="lg:col-span-2">
            <ServiceCard {...SERVICES.items[3]} delay={0.3} featured />
          </div>
        </div>
      </div>
    </section>
  )
}
