
async function fetchUsers() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await res.json()
    return data
}

export default async function HomePage() {

    const users = await fetchUsers()

    return (
        <main className="min-h-screen bg-gray-950 px-6 py-16 font-(family-name:--font-geist-sans)">
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-2 text-4xl font-bold tracking-tight text-white">
                    Users
                </h1>
                <p className="mb-10 text-gray-400">
                    {users.length} users fetched from JSONPlaceholder
                </p>

                <ul className="space-y-3">
                    {users.map((user) => (
                        <li key={user.id}>
                            <a
                                href={`/users/${user.id}`}
                                className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 px-5 py-4 transition-colors hover:border-gray-600 hover:bg-gray-800"
                            >
                                <div>
                                    <span className="text-lg font-medium text-white">{user.name}</span>
                                    <span className="mt-0.5 block text-sm text-gray-500">{user.email}</span>
                                </div>
                                <span className="text-gray-600">&rarr;</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}