import Link from 'next/link'

export const metadata = {
    title: 'Pagina no encontrada',
}

export default function NotFound() {
    return (
        <section className='w-full min-h-[80vh] flex flex-col justify-center items-center gap-4'>
            <h1 className='text-8xl font-bold'>404</h1>
            <h2 className='text-3xl'>Página no encontrada</h2>
            <Link className='text-xl text-sky-600' href="/">Volver al inicio</Link>
        </section>
    )
}
