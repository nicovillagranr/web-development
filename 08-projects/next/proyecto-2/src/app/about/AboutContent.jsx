"use client"

import { useRouter } from "next/navigation"

export default function AboutContent() {

    const router = useRouter()

    return (
        <section className="flex flex-col gap-3">
            <h1 className="text-4xl">About</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla quae aliquam ea doloremque necessitatibus perspiciatis dicta, eos veniam earum numquam nesciunt quia nostrum labore ullam saepe ducimus illo sapiente alias nam. Et obcaecati laborum, reiciendis esse ad quos dolore labore est nihil reprehenderit adipisci voluptatum nesciunt quam ex aliquam. Id totam similique animi obcaecati cumque ducimus quia iure atque officiis pariatur, illo esse repudiandae, sit labore natus earum ea assumenda recusandae enim inventore beatae dolorum perferendis fuga tempora. Quibusdam non iste quae, consequuntur officiis, eos sit, explicabo deleniti repellendus deserunt iure quo labore a voluptates impedit. Maxime possimus quia molestiae!</p>

            <button href="/" className="w-fit bg-sky-400 px-4 py-2 rounded-md" onClick={() => {
                router.push("/")
            }}>
                Click
            </button>
        </section>
    )
}
