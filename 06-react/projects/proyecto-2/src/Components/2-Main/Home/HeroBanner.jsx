import { Link } from "react-router-dom"

export const HeroBanner = () => {
    return (
        <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
            <img
                src="https://picsum.photos/seed/hero/1920/1080"
                alt="Colección destacada"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 h-full flex flex-col justify-center items-start gap-4 px-6 sm:px-10 lg:px-16 max-w-3xl">
                <span className="font-body text-small uppercase tracking-widest text-white/80">
                    Temporada 2026
                </span>
                <h1 className="font-heading text-title sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
                    Descubre la nueva colección
                </h1>
                <p className="font-body text-subtitle text-white/90 max-w-xl">
                    Piezas pensadas para acompañarte cada día. Estilo, calidad y diseño en un solo lugar.
                </p>
                <Link
                    to="/productos"
                    className="mt-4 inline-block bg-rose-500 hover:bg-rose-600 text-white font-body text-small uppercase tracking-wide px-6 py-3 rounded-md transition-colors duration-200"
                >
                    Ver productos
                </Link>
            </div>
        </section>
    )
}
