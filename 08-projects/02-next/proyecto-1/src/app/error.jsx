'use client'

export default function Error({ error, unstable_retry }) {
    return (
        <section className="mx-auto max-w-xl text-center">

            <article className="rounded-xl border border-gray-800 bg-gray-900 p-8">
                <h2 className="text-xl font-bold text-white mb-2">Algo salió mal</h2>
                <p className="text-gray-400 text-sm mb-6">{error.message}</p>

                <button onClick={() => unstable_retry()} className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-950 transition-colors hover:bg-gray-200">
                    Reintentar
                </button>
            </article>

        </section>
    )
}
