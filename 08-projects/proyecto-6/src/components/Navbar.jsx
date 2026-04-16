import { useState, useEffect } from 'react'
import logo from '../assets/logo-2.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Por qué elegirnos', href: '#por-que-elegirnos' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-mgd-orange/95 backdrop-blur-sm shadow-lg'
          : 'bg-mgd-orange/90 backdrop-blur-sm'
      }`}
    >
      <div className="container-wide px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#inicio"
          className="flex items-center gap-2 group"
        >
          <img
            src={logo}
            alt="MGD Exports Logo"
            className="h-10 w-auto transform group-hover:scale-110 transition-transform"
          />
          <span className="font-display font-bold text-lg text-white">
            MGD Exports
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm font-medium transition-colors relative group text-white hover:text-mgd-orange"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mgd-orange group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <a
          href="#contacto"
          className="hidden md:block px-6 py-2.5 bg-mgd-orange text-white font-display font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-orange-dark"
        >
          Contactar
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-colors text-white"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-mgd-orange border-t border-white/20">
          <div className="container-wide px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white font-body text-sm font-medium hover:text-mgd-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-6 py-2.5 bg-mgd-orange text-white font-display font-bold rounded-lg text-center"
            >
              Contactar
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
