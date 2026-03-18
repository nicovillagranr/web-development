// app/page.js → ruta: /
// ─────────────────────────────────────────────────────────────────────────────
// CONCEPTO: Server Component (comportamiento por defecto)
//
// No hay "use client". Este componente se ejecuta en el servidor.
// El HTML se genera en el servidor y se envía al browser.
// No hay JavaScript de React en el cliente para este componente.
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link'
import ComponentBadge from '../components/ComponentBadge'

// La metadata de cada página complementa el template del layout raíz.
// Resultado final en el browser: "Home | NX6"
export const metadata = {
  title: 'Home',
}

const concepts = [
  {
    title: 'File-Based Routing',
    desc: 'Crear una carpeta = crear una ruta. No hay archivo de configuración.',
    href: '/blog/file-based-routing',
    color: 'border-violet-500/40 hover:border-violet-500',
  },
  {
    title: 'Server vs Client Components',
    desc: 'Por defecto todo es Server Component. "use client" opt-in cuando necesitas interactividad.',
    href: '/blog/server-vs-client',
    color: 'border-emerald-500/40 hover:border-emerald-500',
  },
  {
    title: 'API Routes',
    desc: 'Backend serverless dentro del mismo proyecto. app/api/route.js → endpoint HTTP.',
    href: '/blog/api-routes',
    color: 'border-blue-500/40 hover:border-blue-500',
  },
  {
    title: 'Metadata API',
    desc: 'SEO por página con export const metadata. Sin react-helmet.',
    href: '/blog/metadata-api',
    color: 'border-amber-500/40 hover:border-amber-500',
  },
]

export default function HomePage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      {/* Hero */}
      <div className="text-center mb-16">
        <ComponentBadge type="server" />
        <h1 className="text-5xl font-bold mt-6 mb-4 leading-tight">
          Next.js 15{' '}
          <span className="text-primary">App Router</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Un proyecto construido para entender cómo funciona Next.js por dentro.
          Cada página tiene un badge que muestra qué estrategia de rendering está activa.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/blog"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-80 transition-opacity"
          >
            Ver Blog →
          </Link>
          <Link
            href="/contact"
            className="border border-white/20 text-gray-300 px-6 py-3 rounded-lg font-medium hover:border-white/50 hover:text-white transition-all"
          >
            Contacto
          </Link>
        </div>
      </div>

      {/* Conceptos */}
      <div>
        <h2 className="text-xl font-semibold text-gray-400 mb-6 uppercase tracking-widest text-sm">
          Conceptos demostrados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {concepts.map((concept) => (
            <Link
              key={concept.title}
              href={concept.href}
              className={`block p-6 bg-surface rounded-xl border ${concept.color} transition-colors`}
            >
              <h3 className="font-semibold text-white mb-2">{concept.title}</h3>
              <p className="text-sm text-gray-400">{concept.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick reference */}
      <div className="mt-16 p-6 bg-surface rounded-xl border border-white/10">
        <h2 className="font-semibold text-sm uppercase tracking-widest text-gray-400 mb-4">
          Vite vs Next.js — referencia rápida
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {[
            ['Rutas', 'App.jsx con <Route>', 'Carpetas en app/'],
            ['Shell', 'Header en App.jsx', 'app/layout.js'],
            ['Data fetch', 'useEffect + fetch', 'async function Page() { await ... }'],
            ['Backend', 'Servidor separado', 'app/api/route.js'],
            ['URL params', 'useParams()', 'params prop en page.js'],
            ['Link', 'react-router-dom', 'next/link'],
            ['Active link', 'NavLink className', 'usePathname()'],
            ['SEO', 'react-helmet', 'export const metadata'],
          ].map(([concept, vite, nextjs]) => (
            <div key={concept} className="grid grid-cols-3 gap-2 text-xs py-2 border-b border-white/5 last:border-0">
              <span className="text-gray-500 font-medium">{concept}</span>
              <span className="text-red-400 font-mono">{vite}</span>
              <span className="text-emerald-400 font-mono">{nextjs}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
