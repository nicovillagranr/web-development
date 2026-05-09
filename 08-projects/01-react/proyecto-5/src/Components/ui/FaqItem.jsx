// ================= CONTEXTO MODULO =================
// Item de FAQ con acordeon animado y acentos neon.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'

export default function FaqItem({ question, answer }) {
  // Controla si el acordeón está expandido o colapsado
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-brand-accent/8">
      {/* Header del acordeón: pregunta + chevron que rota 180° al abrir */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
      >
        <span className="font-heading font-600 text-lg text-brand-text pr-4 group-hover:text-brand-accent transition-colors duration-300">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-brand-warm text-xl flex-shrink-0"
        >
          <HiChevronDown />
        </motion.span>
      </button>

      {/* AnimatePresence permite animar la salida del contenido (exit).
          La altura va de 0 → auto al abrir y de auto → 0 al cerrar. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-brand-muted pb-6 leading-relaxed font-300">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
