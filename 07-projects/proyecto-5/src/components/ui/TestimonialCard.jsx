// ================= CONTEXTO MODULO =================
// Tarjeta de testimonio con borde neon sutil.
import { FaQuoteLeft } from 'react-icons/fa'
import AnimateOnScroll from './AnimateOnScroll'

export default function TestimonialCard({ quote, name, role, company, delay = 0 }) {
  return (
    <AnimateOnScroll delay={delay}>
      <div className="group bg-brand-800/50 rounded-2xl border border-brand-700/40 p-7 md:p-9 h-full flex flex-col hover:border-brand-accent/20 transition-all duration-500 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-accent/0 group-hover:bg-brand-accent/3 rounded-full blur-glow transition-all duration-700" />
        <FaQuoteLeft className="text-brand-warm/25 text-2xl mb-5 relative z-10" />
        <p className="text-brand-text/80 leading-relaxed flex-1 mb-7 font-300 italic relative z-10">&ldquo;{quote}&rdquo;</p>
        <div className="relative z-10">
          <p className="font-heading font-700 text-brand-text">{name}</p>
          <p className="text-brand-muted text-sm font-300">
            {role} &middot; <span className="text-brand-accent/60">{company}</span>
          </p>
        </div>
      </div>
    </AnimateOnScroll>
  )
}
