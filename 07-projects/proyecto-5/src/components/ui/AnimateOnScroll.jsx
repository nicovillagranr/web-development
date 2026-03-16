// ================= CONTEXTO MODULO =================
// Wrapper de framer-motion que anima elementos al entrar al viewport.
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AnimateOnScroll({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null)
  // Detecta cuándo el elemento entra al viewport. once:true evita re-animaciones al hacer scroll hacia arriba.
  // margin:'-80px' activa la animación un poco antes del borde inferior de la pantalla.
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // Offsets iniciales según la dirección de entrada del elemento
  const directions = {
    up: { y: 40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
  }

  const offset = directions[direction]

  return (
    // Arranca invisible y desplazado; al entrar al viewport transiciona a opacidad 1 y posición 0
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
