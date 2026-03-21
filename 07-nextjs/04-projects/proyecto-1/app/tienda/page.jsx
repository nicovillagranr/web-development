// Import de Link, que hace la navegación
import Link from "next/link"

export const metadata = {
    title: "Falabella.com | Tienda - Categorias",
    description: "Esta es la Tienda Page de Falabella.com",
}

export default function TiendaPage() {
    return (
        <>
            <nav>
                <ul className="flex gap-4 list-none">
                    <li><Link className="text-accent" href="/">Hombre</Link></li>
                    <li><Link className="text-accent" href="/">Mujer</Link></li>
                    <li><Link className="text-accent" href="/">Niños</Link></li>
                </ul>
            </nav>
        </>
    )
}
