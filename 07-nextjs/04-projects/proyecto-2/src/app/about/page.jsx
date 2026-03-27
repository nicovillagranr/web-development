// page.jsx es un Server Component para poder exportar "metadata".
// La lógica client-side (useRouter, onClick, etc.) vive en AboutContent.jsx ("use client").
// Next.js no permite exportar metadata desde un Client Component.
import AboutContent from "./AboutContent"

export const metadata = {
    title: "Falabella.com | Sobre nosotros - About Page",
    description: "Esta es la About Page de Falabella.com",
}

export default function AboutPage() {
    return (
        <AboutContent />
    )
}
