// app/about/page.js → ruta: /about
// Server Component estático. Demuestra cómo metadata por página funciona
// junto al template del layout raíz. El <title> será: "About | NX6"

import ComponentBadge from '../../components/ComponentBadge'

export const metadata = {
  title: 'About',
  description: 'Sobre este proyecto demo de Next.js 15 App Router.',
}

export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <ComponentBadge type="server" />
      <h1 className="text-4xl font-bold mt-6 mb-6">About</h1>

      <div className="space-y-6 text-gray-300 leading-relaxed">
        <p>
          Este proyecto fue construido como referencia educativa para entender cómo funciona
          Next.js 15 App Router desde adentro. Todos los archivos están comentados para explicar
          qué concepto demuestran y cómo difieren de un setup React + Vite.
        </p>

        <div className="bg-surface rounded-xl p-6 border border-white/10">
          <h2 className="text-white font-semibold mb-4">Stack</h2>
          <ul className="space-y-2 text-sm font-mono">
            <li className="flex justify-between">
              <span className="text-gray-400">Framework</span>
              <span className="text-primary">Next.js 15 (App Router)</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Estilos</span>
              <span className="text-primary">Tailwind CSS v4</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Lenguaje</span>
              <span className="text-primary">JavaScript (sin TypeScript)</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Build</span>
              <span className="text-primary">Turbopack (dev) / webpack (prod)</span>
            </li>
          </ul>
        </div>

        <div className="bg-surface rounded-xl p-6 border border-white/10">
          <h2 className="text-white font-semibold mb-4">Estructura del proyecto</h2>
          <pre className="text-xs text-gray-400 font-mono leading-6 overflow-x-auto">
{`app/
├── layout.js          ← Shell persistente (Navbar + Footer)
├── page.js            ← /  (Server Component)
├── about/page.js      ← /about (esta página)
├── blog/
│   ├── page.js        ← /blog  (async Server Component)
│   ├── loading.js     ← skeleton automático
│   ├── error.js       ← error boundary automático
│   └── [slug]/page.js ← /blog/:slug (ruta dinámica)
├── contact/page.js    ← /contact (Client Component)
└── api/posts/route.js ← GET /api/posts (API Route)

components/
├── Navbar.js          ← "use client"
├── Footer.js          ← Server Component
└── ComponentBadge.js  ← badge verde/azul

lib/
└── posts.js           ← datos compartidos (frontend + backend)`}
          </pre>
        </div>
      </div>
    </section>
  )
}
