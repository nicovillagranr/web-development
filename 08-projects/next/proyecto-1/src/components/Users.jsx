// En caso de tener eventos de navegación se usaría use client para que la renderización ocurra en el dispotivo del cliente
// "use client"

import Link from "next/link"

export default function Users({ users }) {
    return (
        <ul className="flex flex-col gap-2.5">

            {users.map((user) => (
                <Link key={user.id} href={`/users/${user.id}`}>
                    <li className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 sm:px-5 sm:py-4">
                        <div>
                            <span>#{user.id}</span>
                            <h5>{user.name}</h5>
                            <span className="mt-0.5 block text-sm text-gray-500">{user.email}</span>
                        </div>
                        <span className="text-gray-600">&rarr;</span>
                    </li>
                </Link>
            ))}
        </ul>
    )
}