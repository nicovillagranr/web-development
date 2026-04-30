import { Link } from "react-router-dom"
import { categorias, campanas } from "./home.data"

const HeroBanner = () => {
    return (
        <section className="relative w-full h-[60vh] min-h-100 overflow-hidden">
            <img src="https://picsum.photos/seed/hero/1920/1080" alt="Colección destacada" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 h-full flex flex-col justify-center items-start gap-4 px-6 sm:px-10 lg:px-16 max-w-3xl">
                <span className="font-body text-small tracking-widest text-white/80">Temporada 2026</span>
                <h1 className="font-heading text-title sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">Descubre la nueva colección</h1>
                <p className="font-body text-subtitle text-white/90 max-w-xl">
                    Piezas pensadas para acompañarte cada día. Estilo, calidad y diseño en un solo lugar.
                </p>
                <Link to="/productos" className="mt-4 inline-block bg-rose-500 hover:bg-rose-600 text-white font-body text-small uppercase tracking-wide px-6 py-3 rounded-md transition-colors duration-200">
                    Ver productos
                </Link>
            </div>
        </section>
    )
}

const CategoryGrid = () => {
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-end justify-between mb-8">
                <h2 className="font-heading text-subtitle sm:text-title font-semibold text-gray-900">
                    Compra por categoría
                </h2>
                <Link to="/productos" className="hidden sm:inline font-body text-small text-gray-600 hover:text-rose-500 transition-colors duration-200 uppercase tracking-wide">
                    Ver todo
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {categorias.map((cat) => (
                    <Link key={cat.id} to={cat.href} className="group relative block overflow-hidden rounded-md aspect-4/5">
                        <img src={cat.image} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                        <h3 className="absolute bottom-4 left-4 font-heading text-subtitle font-semibold text-white">
                            {cat.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    )
}

const CampaignGrid = () => {
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="font-heading text-subtitle sm:text-title font-semibold text-gray-900 mb-8">
                Destacados de la semana
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {campanas.map((camp) => (
                    <Link
                        key={camp.id}
                        to={camp.href}
                        className="group relative block overflow-hidden rounded-md aspect-video"
                    >
                        <img
                            src={camp.image}
                            alt={camp.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex flex-col justify-center gap-2 px-8">
                            <span className="font-body text-small uppercase tracking-widest text-white/80">
                                {camp.subtitle}
                            </span>
                            <h3 className="font-heading text-title font-semibold text-white max-w-xs">
                                {camp.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export const Home = () => {
    return (
        <>
            <HeroBanner />
            <CategoryGrid />
            <CampaignGrid />
        </>
    )
}