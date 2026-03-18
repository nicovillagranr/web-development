'use client'
// ─────────────────────────────────────────────────────────────────────────────
// CONCEPTO: "use client"
//
// Esta directiva convierte el componente en Client Component.
// Es necesaria aquí porque usamos:
//   1. useState (toggle del menú mobile)
//   2. usePathname (saber qué ruta está activa)
//
// DIFERENCIA con tus proyectos Vite:
// En Vite TODOS los componentes son "client components" implícitamente.
// En Next.js tienes que ser explícito cuando necesitas JS en el browser.
//
// NOTA: usePathname es el equivalente a lo que hacías con NavLink de React Router.
// En Next.js usas next/link + usePathname en vez de NavLink.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-dark/80 backdrop-blur border-b border-white/10">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* next/link reemplaza a react-router-dom Link */}
        <Link href="/" className="font-bold text-lg tracking-widest text-primary">
          NX6
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors ${
                    isActive ? 'text-primary' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center gap-5 py-6 border-t border-white/10 text-sm">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
