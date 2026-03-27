// Import de estilos
import '@/src/styles/globals.css'

// Import de Fuentes
import { Poppins, Outfit } from 'next/font/google'

// Import de componentes
import NavBar from '../components/NavBar.jsx'


export const metadata = {
    title: "Falabella.com | Proyecto 2 en Next.js",
    description: "Falabella.com — tu tienda online",
}

const poppins = Poppins({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    variable: '--font-poppins',
})

const outfit = Outfit({
    weight: ['600', '700'],
    subsets: ['latin'],
    variable: '--font-outfit',
})

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={`${poppins.variable} ${outfit.variable} font-(family-name:--font-poppins) bg-bg text-text min-h-screen`}>
                <NavBar />
                <main className="px-5 py-5 sm:px-10 sm:py-10">
                    {children}
                </main>
            </body>
        </html>
    )
}