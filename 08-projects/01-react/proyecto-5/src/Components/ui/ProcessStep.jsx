// ================= CONTEXTO MODULO =================
// Paso del proceso con numero neon y borde brillante.
import AnimateOnScroll from './AnimateOnScroll'

export default function ProcessStep({ number, title, description, delay = 0 }) {
  return (
    <AnimateOnScroll delay={delay}>
      <div className="relative text-center lg:text-left">
        {/* Círculo con número del paso — borde cyan con glow sutil */}
        <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full border border-brand-accent/25 bg-brand-900 mb-6 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
          <span className="font-heading text-lg font-800 bg-gradient-to-r from-brand-accent to-brand-warm bg-clip-text text-transparent">{number}</span>
        </div>
        {/* Título y descripción del paso */}
        <h3 className="font-heading text-xl font-700 text-brand-text mb-3">{title}</h3>
        <p className="text-brand-muted leading-relaxed font-300">{description}</p>
      </div>
    </AnimateOnScroll>
  )
}
