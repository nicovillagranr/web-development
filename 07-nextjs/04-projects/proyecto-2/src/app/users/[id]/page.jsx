import Link from "next/link"

async function getUser(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const data = await res.json()
    return data
}


// generateStaticParams — necesario para output: "export" (build estático)
export async function generateStaticParams() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const users = await res.json()
    return users.map((user) => ({ id: String(user.id) }))
}

async function UserPage({ params }) {

    const { id } = await params

    const user = await getUser(id)

    return (
        <section className="mx-auto max-w-xl md:max-w-2xl">

            <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors mb-8">
                &larr; Volver
            </Link>

            <article className="rounded-xl border border-gray-800 bg-gray-900 p-5 sm:p-8">
                <header className="mb-6">
                    <span className="text-sm text-gray-500">#{user.id}</span>
                    <h1 className="text-2xl font-bold text-white mt-1">{user.name}</h1>
                    <span className="text-gray-400">@{user.username}</span>
                </header>

                <dl className="space-y-4 text-sm">
                    <div className="flex justify-between border-b border-gray-800 pb-3">
                        <dt className="text-gray-500">Email</dt>
                        <dd className="text-gray-300">{user.email}</dd>
                    </div>
                    <div className="flex justify-between border-b border-gray-800 pb-3">
                        <dt className="text-gray-500">Teléfono</dt>
                        <dd className="text-gray-300">{user.phone}</dd>
                    </div>
                    <div className="flex justify-between border-b border-gray-800 pb-3">
                        <dt className="text-gray-500">Website</dt>
                        <dd className="text-gray-300">{user.website}</dd>
                    </div>
                    <div className="flex justify-between border-b border-gray-800 pb-3">
                        <dt className="text-gray-500">Empresa</dt>
                        <dd className="text-gray-300">{user.company.name}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-gray-500">Ciudad</dt>
                        <dd className="text-gray-300">{user.address.city}</dd>
                    </div>
                </dl>
            </article>

        </section>
    )
}
export default UserPage