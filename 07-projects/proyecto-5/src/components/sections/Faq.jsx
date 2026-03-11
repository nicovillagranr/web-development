// ================= CONTEXTO MODULO =================
// Seccion de preguntas frecuentes con acordeon animado.
import { FAQ } from '../../data/content'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import FaqItem from '../ui/FaqItem'

export default function Faq() {
  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-10 relative">
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-accent/15 to-transparent" />

      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <span className="text-brand-accent text-xs font-body font-500 uppercase tracking-[0.3em]">
              {FAQ.tag}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-800 text-brand-text mt-4 tracking-tight">
              {FAQ.headline}
            </h2>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="border-t border-brand-accent/10">
            {FAQ.items.map((item) => (
              <FaqItem key={item.question} {...item} />
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
