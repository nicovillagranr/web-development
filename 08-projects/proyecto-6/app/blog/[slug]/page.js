// app/blog/[slug]/page.js → ruta: /blog/:slug
// ─────────────────────────────────────────────────────────────────────────────
// CONCEPTO: Rutas dinámicas + generateStaticParams + params prop
//
// El nombre de la carpeta [slug] le dice a Next.js que este segmento es variable.
// /blog/file-based-routing → params.slug = "file-based-routing"
// /blog/server-vs-client  → params.slug = "server-vs-client"
//
// DIFERENCIA con React Router:
// En React Router usabas useParams() hook para leer los parámetros.
// En Next.js Server Components, los parámetros llegan como prop { params }.
// No hay hook. El componente es una función pura que recibe props.
//
// generateStaticParams: le dice a Next.js qué slugs pre-renderizar en build time.
// Sin esto, Next.js genera la página on-demand en cada request (también válido).
// ─────────────────────────────────────────────────────────────────────────────

import { notFound } from 'next/navigation'
import Link from 'next/link'
import ComponentBadge from '../../../components/ComponentBadge'
import { getPostBySlug, posts } from '../../../lib/posts'

// generateStaticParams corre en build time y le dice a Next.js:
// "pre-renderiza estas rutas". Equivalente a getStaticPaths en el Pages Router.
export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

// generateMetadata corre en el servidor para generar el <title> de cada post.
// Recibe los mismos params que el componente.
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post no encontrado' }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }) {
  // En Next.js 15, params es una Promise — debe ser awaited.
  const { slug } = await params
  const post = getPostBySlug(slug)

  // notFound() renderiza el 404 de Next.js (o el not-found.js más cercano).
  // Equivalente a un <Navigate to="/404" /> pero para Server Components.
  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center gap-3 mb-6">
        <ComponentBadge type="server" />
        <span className="text-xs text-gray-500 font-mono">
          params.slug = &quot;{slug}&quot;
        </span>
      </div>

      <p className="text-xs text-gray-500 font-mono mb-3">{post.date}</p>
      <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>
      <p className="text-primary text-sm mb-8 font-medium">{post.excerpt}</p>

      <div className="prose prose-invert max-w-none">
        <div className="bg-surface rounded-xl p-6 border border-white/10 text-gray-300 leading-relaxed whitespace-pre-line text-sm">
          {post.content}
        </div>
      </div>

      <div className="mt-10">
        <Link
          href="/blog"
          className="text-sm text-gray-400 hover:text-primary transition-colors"
        >
          ← Volver al Blog
        </Link>
      </div>
    </article>
  )
}
