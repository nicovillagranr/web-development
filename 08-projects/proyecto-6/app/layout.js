// app/layout.js
// ─────────────────────────────────────────────────────────────────────────────
// CONCEPTO: Root Layout
//
// Este es el archivo más importante de Next.js App Router.
// Envuelve TODAS las páginas — es el shell persistente de la app.
//
// DIFERENCIA con tus proyectos Vite:
// En Vite, el shell (Header + Footer) vive en App.jsx junto al router.
// En Next.js, el shell vive aquí. La clave es que layout.js NUNCA se re-renderiza
// al navegar entre páginas — solo el {children} (la parte que cambia) se actualiza.
// Esto significa que Navbar y Footer no se re-montan al hacer click en un Link.
//
// SIN "use client" = Server Component por defecto.
// Puede exportar metadata. Puede hacer async/await. No puede usar useState.
// ─────────────────────────────────────────────────────────────────────────────

import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// La Metadata API reemplaza a react-helmet.
// Esto se inyecta en el <head> automáticamente por Next.js.
// El template hace que cada página pueda tener su propio title + " | NX6".
export const metadata = {
  title: {
    template: '%s | NX6',   // %s = el title que exporta cada page.js
    default: 'NX6 — Next.js 15 Demo',
  },
  description: 'Proyecto educativo para aprender Next.js 15 App Router desde adentro.',
}

// RootLayout recibe {children} — que es lo que renderiza el page.js actual.
// HTML y body deben estar aquí (solo en el layout raíz).
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-dvh">
        {/* Navbar es un Client Component ("use client") pero vive dentro de un Server Component.
            Esto es válido — puedes anidar Client Components dentro de Server Components. */}
        <Navbar />

        {/* children = el page.js de la ruta actual.
            Cuando navegas de / a /blog, solo este slot se reemplaza. */}
        <main className="flex-1">{children}</main>

        {/* Footer es un Server Component estático */}
        <Footer />
      </body>
    </html>
  )
}
