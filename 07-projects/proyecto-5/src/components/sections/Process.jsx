// ================= CONTEXTO MODULO =================
// Seccion de proceso con linea neon de conexion.
import { PROCESS } from '../../data/content'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import ProcessStep from '../ui/ProcessStep'

export default function Process() {
  return (
    <section id="proceso" className="py-24 md:py-32 px-6 md:px-10 relative">
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-accent/15 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <span className="text-brand-accent text-xs font-body font-500 uppercase tracking-[0.3em]">
              {PROCESS.tag}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-800 text-brand-text mt-4 mb-5 leading-tight tracking-tight">
              {PROCESS.headline}
            </h2>
            <p className="text-brand-muted text-lg font-300 leading-relaxed">
              {PROCESS.subheadline}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Neon connection line */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-px bg-gradient-to-r from-brand-warm/25 via-brand-accent/15 to-brand-warm/25 shadow-[0_0_8px_rgba(0,229,255,0.1)]" />

          {PROCESS.steps.map((step, i) => (
            <ProcessStep key={step.number} {...step} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}
