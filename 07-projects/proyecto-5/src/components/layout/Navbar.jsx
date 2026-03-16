// ================= CONTEXTO MODULO =================
// Barra de navegacion fija con toggle de tema, blur on scroll y menu hamburguesa mobile.

// Import de Hooks
import { useState, useEffect } from 'react'
import { useScrollTo } from '../../hooks/useScrollTo'
import { useTheme } from '../../hooks/useTheme'

// Import de Icons
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { HiSun, HiMoon } from 'react-icons/hi2'

// Import de Data para el menu. Esto tiene como fin que el menu sea dinamico y se pueda actualizar sin tener que modificar el componente Navbar
import { NAV, BOOKING_URL } from '../../data/content'

// Import de Componentes
import Button from '../ui/Button'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)  // controla el fondo blur al hacer scroll
  const [isOpen, setIsOpen] = useState(false)           // controla el menú mobile
  const scrollTo = useScrollTo()
  const { theme, toggle } = useTheme()

  // Activa el fondo blur de la navbar cuando el usuario scrollea más de 50px
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (href) => {
    scrollTo(href)
    setIsOpen(false)
  }

  return (

    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-900/80 backdrop-blur-md'
      : 'bg-transparent'}`}>

      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <span className="font-heading text-xl md:text-2xl font-800 tracking-tight text-brand-accent drop-shadow-glow-accent pointer-events-none">
          {NAV.logo}<span className="text-brand-warm drop-shadow-glow-warm">.</span>
        </span>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV.links.map((link) => (

            <button key={link.href} onClick={() => handleNav(link.href)}
              className="text-brand-muted hover:text-brand-accent transition-colors duration-300 text-sm font-body font-500 uppercase tracking-widest cursor-pointer hover:drop-shadow-glow-accent-sm"
            >
              {link.label}
            </button>

          ))}

          {/* Theme Button */}
          <button onClick={toggle} className="text-brand-muted hover:text-brand-warm transition-all duration-300 text-xl cursor-pointer hover:drop-shadow-glow-warm-sm"
            aria-label="Cambiar tema">
            {theme === 'dark' ? <HiSun /> : <HiMoon />}
          </button>

          {/* CTA Button */}
          <Button href={BOOKING_URL} size="md">
            {NAV.cta}
          </Button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={toggle}
            className="text-brand-muted hover:text-brand-warm text-xl cursor-pointer transition-colors"
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? <HiSun /> : <HiMoon />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-brand-muted hover:text-brand-warm text-2xl cursor-pointer transition-colors"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (

        <div className="lg:hidden bg-brand-900/95 backdrop-blur-xl border-t border-brand-accent/10 px-6 pb-8 pt-6">
          <div className="flex flex-col gap-5">

            {NAV.links.map((link) => (
              <button key={link.href} onClick={() => handleNav(link.href)} className="text-brand-muted hover:text-brand-accent transition-colors text-left text-lg font-heading font-600 cursor-pointer">
                {link.label}
              </button>
            ))}

            <Button href={BOOKING_URL} size="md" className="mt-3 w-full text-center">
              {NAV.cta}
            </Button>
          </div>
        </div>

      )}

    </nav>
  )
}
