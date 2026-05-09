// ================= CONTEXTO MODULO =================
// Seccion de metricas con fondo gradient Miami Vice.
import { METRICS } from '../../data/content'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import MetricCard from '../ui/MetricCard'

export default function Metrics() {
  return (
    <section id="resultados" className="py-24 md:py-32 px-6 md:px-10 relative">
      {/* Línea decorativa superior en warm (contrasta con las otras secciones en accent) */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-brand-warm/15 to-transparent" />

      {/* Fondo sutil con gradiente vertical — da profundidad sin distraer de los números */}
      <div className="absolute inset-0 bg-linear-to-b from-brand-800/40 via-brand-900/20 to-brand-800/40" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header centrado */}
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <span className="text-brand-accent text-xs font-body font-500 uppercase tracking-tag">
              {METRICS.tag}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-800 text-brand-text mt-4 tracking-tight">
              {METRICS.headline}
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Grid de 4 métricas — en mobile son 2 columnas, en desktop 4 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {METRICS.items.map((item, i) => (
            <MetricCard key={item.label} {...item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
