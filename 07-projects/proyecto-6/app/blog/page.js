// app/blog/page.js → ruta: /blog
// ─────────────────────────────────────────────────────────────────────────────
// CONCEPTO: Async Server Component — fetch directo sin useEffect
//
// Este es el concepto más importante de Next.js vs Vite.
// En Vite harías:
//   const [posts, setPosts] = useState([])
//   const [loading, setLoading] = useState(true)
//   useEffect(() => {
//     fetch('/api/posts').then(r => r.json()).then(setPosts).finally(() => setLoading(false))
//   }, [])
//
// En Next.js lo mismo son 3 líneas:
//   async function BlogPage() {
//     const posts = await fetch('/api/posts').then(r => r.json())
//     return <ul>{posts.map(...)}</ul>
//   }
//
// El "loading state" es automático via loading.js.
// El "error state" es automático via error.js.
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link'
import ComponentBadge from '../../components/ComponentBadge'
import { posts } from '../../lib/posts'

export const metadata = {
  title: 'Blog',
}

// Para static export los datos se importan directamente — no se puede hacer
// fetch a localhost en build time porque no hay servidor corriendo.
// En un deploy real (Vercel, Railway) sí funcionaría el fetch a una URL absoluta.
export default async function BlogPage() {

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <ComponentBadge type="server" />
      <h1 className="text-4xl font-bold mt-6 mb-2">Blog</h1>
      <p className="text-gray-400 mb-10 text-sm">
        Posts cargados con <code className="text-primary bg-surface px-1.5 py-0.5 rounded text-xs">await fetch()</code> directamente en el Server Component.
        Sin useState, sin useEffect.
      </p>

      <ul className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block p-6 bg-surface rounded-xl border border-white/10 hover:border-primary/50 transition-colors group"
            >
              <p className="text-xs text-gray-500 font-mono mb-2">{post.date}</p>
              <h2 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
