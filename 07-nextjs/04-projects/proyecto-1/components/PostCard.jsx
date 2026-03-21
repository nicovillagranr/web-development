// Client Component
"use client"

import Link from "next/link"

export default function PostCard({ post }) {
    return (
        <div className="p-5 rounded-lg border">
            <Link className="underline" href={`/posts/${post.id}`}>
                <span className="text-sm font-semibold text-accent">#{post.id}</span>
                <h3 className="text-lg font-semibold mt-1 capitalize">{post.title}</h3>
            </Link>
            <p className="text-sm text-text-muted mt-2 leading-relaxed">{post.body}</p>
            <button
                className="mt-4 bg-accent text-white py-2 px-4 rounded-lg" onClick={() => {
                    console.log("Click")
                }}>Click</button>
        </div>
    )
}