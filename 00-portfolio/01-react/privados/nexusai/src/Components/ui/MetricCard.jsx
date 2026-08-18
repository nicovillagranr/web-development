// ================= CONTEXTO MODULO =================
// Tarjeta de metrica con contador animado y neon glow.
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import AnimateOnScroll from './AnimateOnScroll'

export default function MetricCard({ value, suffix, label, delay = 0 }) {
  const ref = useRef(null)
  // Dispara el contador una sola vez cuando la tarjeta entra al viewport
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    // Anima el contador desde 0 hasta value en 2 segundos con 60 pasos (~60fps)
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      setCount(Math.min(Math.round(increment * step), value))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  // Formatea valores >= 1000 como "12K" para mejor legibilidad
  const display = value >= 1000 ? `${Math.round(count / 1000)}K` : count

  return (
    <AnimateOnScroll delay={delay}>
      <div ref={ref} className="text-center p-6 relative">
        {/* Número animado con gradiente cyan→magenta */}
        <div className="font-heading text-4xl md:text-6xl font-800 mb-3 tracking-tight">
          <span className="bg-linear-to-r from-brand-accent to-brand-warm bg-clip-text text-transparent drop-shadow-glow-accent-md">
            {display}
          </span>
          <span className="text-brand-warm drop-shadow-glow-warm">{suffix}</span>
        </div>
        {/* Etiqueta descriptiva de la métrica */}
        <p className="text-brand-muted text-sm font-500 uppercase tracking-widest">{label}</p>
      </div>
    </AnimateOnScroll>
  )
}
