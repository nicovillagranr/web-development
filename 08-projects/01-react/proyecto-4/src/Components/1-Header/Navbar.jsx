import { useState, useEffect } from 'react'
import logo from '../../assets/images/logo.webp'

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
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about-us' },
    { label: 'Services', href: '#services' },
    { label: 'Why Choose Us', href: '#why-us' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-sm ${scrolled ? 'bg-mgd-orange/80 shadow-lg' : 'bg-mgd-orange/90'}`}>
      <div className="container-wide px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group shrink-0">
          <img src={logo} alt="MGD Export Logo" className="h-10 w-auto transform group-hover:scale-110 transition-transform" />
          <span className="font-display font-bold text-lg text-white">MGD Export</span>
        </a>

        {/* Divisor */}
        <div className="hidden md:block w-px h-8 bg-white/20 ml-5" />

        {/* Spacer */}
        <div className="hidden md:block grow" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm font-bold transition-colors relative group text-white"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mgd-cta group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <a href="#contact" className="hidden md:block ml-5 px-6 py-2.5 bg-mgd-orange text-white font-display font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-orange-dark shrink-0">
          Contact
        </a>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-colors text-white" aria-label="Toggle menu">
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''
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
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-6 py-2.5 bg-mgd-orange text-white font-display font-bold rounded-lg text-center"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
