import PostCard from "@/src/components/PostCard"

// --- SERVER: el fetch se ejecuta en el servidor, el cliente nunca ve esta función ---
async function loadPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()

    // await new Promise((resolve) => setTimeout(resolve, 3000))
    return data
}


// --- SERVER: todo este componente se renderiza en el servidor ---
// El cliente recibe solo el HTML final, sin JavaScript
export default async function PostPages() {

    // SERVER: esta llamada ocurre en el servidor antes de enviar el HTML
    const posts = await loadPosts()

    // SERVER: el .map() se ejecuta en el servidor, el HTML resultante se envía al cliente
    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Publicaciones</h1>

            <div className="grid gap-4">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </>
    )
}

// CLIENT: nada — este componente no envía JS al navegador
// Si necesitáramos interactividad (onClick, useState, etc.) tendríamos que
// extraer esa parte a un componente aparte con "use client"