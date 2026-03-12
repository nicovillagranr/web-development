// ================= CONTEXTO MODULO =================
// Seccion hero Miami Vice con neon glows y gradiente sunset.
import { motion } from 'framer-motion'
import { HiCheckCircle } from 'react-icons/hi'
import { HERO, BOOKING_URL } from '../../data/content'
import Button from '../ui/Button'
import { useScrollTo } from '../../hooks/useScrollTo'

export default function Hero() {
  const scrollTo = useScrollTo()

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-10 overflow-hidden">
      {/* Miami Vice gradient mesh */}
      <div className="absolute inset-0">
        <div className="absolute top-[-15%] right-[-5%] w-150 h-150 bg-brand-warm/12 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 bg-brand-accent/8 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] left-[50%] w-100 h-100 bg-brand-600/40 rounded-full blur-[100px]" />
        {/* Sunset horizon line */}
        <div className="absolute bottom-[20%] left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-warm/20 to-transparent" />
      </div>

      {/* Vertical neon line */}
      <div className="absolute top-0 right-[22%] w-px h-full bg-linear-to-b from-transparent via-brand-accent/15 to-transparent" />

      <div className="relative max-w-7xl mx-auto w-full z-10 pt-24 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-brand-warm/80 text-xs font-body font-500 uppercase tracking-tag mb-6 border border-brand-warm/25 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(255,45,149,0.1)]">
                Agencia de Inteligencia Artificial
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-800 leading-[0.95] mb-8 tracking-tight"
            >
              {HERO.headline}
              <span className="bg-linear-to-r from-brand-warm via-brand-sunset to-brand-accent bg-clip-text text-transparent drop-shadow-glow-warm-lg">
                {HERO.headlineAccent}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-brand-muted mb-10 max-w-xl leading-relaxed font-300"
            >
              {HERO.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Button href={BOOKING_URL} size="lg">
                {HERO.ctaPrimary}
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollTo('proceso')}>
                {HERO.ctaSecondary}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex items-center gap-2.5 text-brand-muted text-sm"
            >
              <HiCheckCircle className="text-brand-accent text-lg drop-shadow-glow-accent-xs" />
              <span className="font-300">{HERO.socialProof}</span>
            </motion.div>
          </div>

          {/* Neon geometric decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex lg:col-span-5 justify-center items-center"
          >
            <div className="relative w-80 h-80">
              {/* Neon rings */}
              <div className="absolute inset-0 rounded-full border border-brand-accent/20 shadow-[0_0_15px_rgba(0,229,255,0.1)] animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-brand-warm/20 shadow-[0_0_15px_rgba(255,45,149,0.1)] animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute inset-12 rounded-full border border-brand-accent/25 shadow-[0_0_10px_rgba(0,229,255,0.15)] animate-[spin_15s_linear_infinite]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-linear-to-br from-brand-warm/15 to-brand-accent/10 rounded-2xl rotate-45 backdrop-blur-sm border border-brand-warm/20 shadow-[0_0_30px_rgba(255,45,149,0.15)]" />
              </div>
              {/* Neon dots */}
              <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-brand-accent/70 shadow-[0_0_10px_rgba(0,229,255,0.6)] animate-pulse" />
              <div className="absolute bottom-16 left-8 w-1.5 h-1.5 rounded-full bg-brand-warm/70 shadow-[0_0_10px_rgba(255,45,149,0.6)] animate-pulse [animation-delay:1s]" />
              <div className="absolute top-1/2 right-4 w-1 h-1 rounded-full bg-brand-sunset/60 shadow-[0_0_8px_rgba(255,107,53,0.5)] animate-pulse [animation-delay:2s]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
