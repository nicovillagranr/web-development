// ================= CONTEXTO MODULO =================
// Seccion CTA final con neon glows dramaticos Miami Vice.
import { FINAL_CTA, BOOKING_URL } from '../../data/content'
import AnimateOnScroll from '../ui/AnimateOnScroll'
import Button from '../ui/Button'

export default function FinalCta() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-accent/15 to-transparent" />

      {/* Dramatic neon background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-warm/8 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-accent/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center z-10">
        <AnimateOnScroll>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-800 text-brand-text mb-6 leading-tight tracking-tight">
            {FINAL_CTA.headline}
          </h2>
          <p className="text-brand-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed font-300">
            {FINAL_CTA.subheadline}
          </p>
          <Button href={BOOKING_URL} size="lg">
            {FINAL_CTA.cta}
          </Button>
          <p className="text-brand-warm/60 text-sm mt-5 font-500 tracking-wide">{FINAL_CTA.note}</p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
