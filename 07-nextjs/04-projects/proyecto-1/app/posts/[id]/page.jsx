import Posts from '../page'
import { Suspense } from 'react'


// generateStaticParams() solo es necesario para despliegue en hosting estático (ej. Hostinger).
// En Vercel no haría falta, ya que las páginas dinámicas se generan en el servidor bajo demanda.
export async function generateStaticParams() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()
    return posts.map((post) => ({ id: String(post.id) }))
}


async function loadPost(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data = await res.json()
    return data
}

export default async function Page({ params }) {
    const { id } = await params
    const post = await loadPost(id)

    return (
        <>
            <article className="max-w-2xl">
                {/* Post number pill */}
                <span className="inline-block bg-accent text-nav-text text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
                    Post #{post.id}
                </span>

                {/* Title */}
                <h1 className="font-(family-name:--font-outfit) text-4xl font-bold leading-tight text-text mb-8 capitalize">
                    {post.title}
                </h1>

                {/* Divider */}
                <div className="w-12 h-1 bg-accent rounded-full mb-8" />

                {/* Body */}
                <p className="text-text-muted text-lg leading-relaxed">
                    {post.body}
                </p>
            </article >


            <hr className="mt-10" />

            {/* Other posts */}
            <article className="mt-5">
                <h3>Otras Publicaciones</h3>

                <Suspense fallback={<p>Cargando otras publicaciones</p>}>
                    <Posts />
                </Suspense>

            </article>

        </>
    )
}