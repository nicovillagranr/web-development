// ================= CONTEXTO MODULO =================
// Tarjeta de servicio con neon glow hover Miami Vice.
import AnimateOnScroll from './AnimateOnScroll'

export default function ServiceCard({ Icon, title, description, delay = 0, featured = false }) {
  return (
    <AnimateOnScroll delay={delay} className="h-full">
      {/* featured=true → acento cyan; featured=false → acento magenta */}
      <div className={`group relative rounded-2xl border p-7 md:p-9 h-full overflow-hidden transition-all duration-500 ${
        featured
          ? 'bg-brand-800/80 border-brand-accent/10 hover:border-brand-accent/30 hover:shadow-[0_0_30px_rgba(0,229,255,0.06)]'
          : 'bg-brand-800/50 border-brand-700/50 hover:border-brand-warm/20 hover:shadow-[0_0_30px_rgba(255,45,149,0.06)]'
      }`}>
        {/* Círculo de glow decorativo en la esquina superior derecha; aparece en hover */}
        <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-glow transition-all duration-700 ${
          featured
            ? 'bg-brand-accent/0 group-hover:bg-brand-accent/5'
            : 'bg-brand-warm/0 group-hover:bg-brand-warm/5'
        }`} />

        <div className="relative z-10">
          {/* Contenedor del icono con fondo sutil que se intensifica en hover */}
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-colors duration-500 ${
            featured
              ? 'bg-brand-accent/8 border border-brand-accent/15 group-hover:bg-brand-accent/15'
              : 'bg-brand-warm/8 border border-brand-warm/15 group-hover:bg-brand-warm/15'
          }`}>
            <Icon className={`text-xl ${featured ? 'text-brand-accent' : 'text-brand-warm'}`} />
          </div>
          {/* Título y descripción del servicio */}
          <h3 className="font-heading text-xl font-700 text-brand-text mb-3">{title}</h3>
          <p className="text-brand-muted leading-relaxed font-300">{description}</p>
        </div>
      </div>
    </AnimateOnScroll>
  )
}
