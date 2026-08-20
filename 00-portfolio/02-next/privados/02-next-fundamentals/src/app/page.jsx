// Importamos la función fetchUsers
import Users from "@/src/components/Users"

async function fetchUsers() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await res.json()
    return data
}

export default async function HomePage() {

    const users = await fetchUsers()

    return (
        <section className="mx-auto max-w-lg md:max-w-2xl lg:max-w-2xl">
            <h1 className="mb-5">Listado de usuarios de consulta externa</h1>
            <Users users={users} />
        </section>
    )
}