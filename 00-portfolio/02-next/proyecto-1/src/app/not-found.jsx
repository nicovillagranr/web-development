import Link from "next/link"

export default function NotFound() {
    return (
        <section className="mx-auto max-w-xl text-center">

            <article className="rounded-xl border border-gray-800 bg-gray-900 p-8">
                <h2 className="text-xl font-bold text-white mb-2">Página no encontrada</h2>
                <p className="text-gray-400 text-sm mb-6">La ruta que buscas no existe</p>

                <Link href="/" className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-950 transition-colors hover:bg-gray-200">
                    Volver al inicio
                </Link>
            </article>

        </section>
    )
}
