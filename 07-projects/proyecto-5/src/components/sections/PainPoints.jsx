// ================= CONTEXTO MODULO =================
// Seccion de pain points con estetica Miami Vice.
import { HiXCircle } from 'react-icons/hi'
import { PAIN_POINTS } from '../../data/content'
import AnimateOnScroll from '../ui/AnimateOnScroll'

export default function PainPoints() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 relative">
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-warm/15 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <span className="text-brand-sunset text-xs font-body font-500 uppercase tracking-[0.3em]">
            {PAIN_POINTS.tag}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-800 text-brand-text mt-4 mb-16 max-w-3xl leading-tight tracking-tight">
            {PAIN_POINTS.headline}
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PAIN_POINTS.items.map((item, i) => (
            <AnimateOnScroll key={item.title} delay={i * 0.12}>
              <div className="group bg-brand-800/60 rounded-2xl border border-brand-warm/8 p-7 md:p-9 h-full hover:border-brand-warm/25 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-warm/3 rounded-full blur-[60px] group-hover:bg-brand-warm/8 transition-all duration-500" />
                <HiXCircle className="text-brand-warm/50 text-2xl mb-5 relative z-10" />
                <h3 className="font-heading text-xl font-700 text-brand-text mb-3 relative z-10">{item.title}</h3>
                <p className="text-brand-muted leading-relaxed font-300 relative z-10">{item.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
