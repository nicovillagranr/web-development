// ================= CONTEXTO MODULO =================
// Seccion de metricas con fondo gradient Miami Vice.
import { METRICS } from '../../data/content'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import MetricCard from '../ui/MetricCard'

export default function Metrics() {
  return (
    <section id="resultados" className="py-24 md:py-32 px-6 md:px-10 relative">
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-warm/15 to-transparent" />

      {/* Subtle Miami gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-800/40 via-brand-900/20 to-brand-800/40" />

      <div className="relative max-w-7xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <span className="text-brand-accent text-xs font-body font-500 uppercase tracking-[0.3em]">
              {METRICS.tag}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-800 text-brand-text mt-4 tracking-tight">
              {METRICS.headline}
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {METRICS.items.map((item, i) => (
            <MetricCard key={item.label} {...item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
