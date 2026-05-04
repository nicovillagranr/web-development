import { Link } from "react-router-dom"
import { categorias, campanas } from "./home.data"
import { ROUTES } from "../../../utils/constants"
import { CategoryCarousel } from "./CategoryCarousel"

const HeroBanner = () => {
    return (
        <section className="relative w-full h-[85vh] min-h-135 overflow-hidden">
            <img src="https://picsum.photos/seed/hero/1920/1080" alt="Colección destacada" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/25" />
            <div className="relative z-10 h-full flex flex-col justify-center items-start gap-6 px-6 sm:px-10 lg:px-20 max-w-4xl">
                <span className="font-body text-eyebrow uppercase tracking-[0.28em] text-paper/80">Temporada 2026</span>
                <h1 className="font-heading font-normal text-paper text-5xl md:text-7xl leading-[1.05]">
                    Descubre la nueva<br />colección
                </h1>
                <p className="font-body text-body text-paper/85 max-w-md">
                    Piezas pensadas para acompañarte cada día. Estilo, calidad y diseño en un solo lugar.
                </p>
                <Link to={ROUTES.PRODUCTS} className="mt-2 inline-block border-b border-paper text-paper font-body uppercase tracking-[0.22em] text-[11px] pb-1 hover:border-camel hover:text-camel transition-colors duration-300">
                    Ver productos
                </Link>
            </div>
        </section>
    )
}

const CategoryGrid = () => {
    return (
        <section className="px-4 sm:px-6 lg:px-10 py-20 lg:py-28 bg-stone dark:bg-ink border-t border-b border-paper">
            <div className="flex items-end justify-between mb-12">
                <div className="flex flex-col gap-2">
                    <span className="font-body text-eyebrow uppercase tracking-[0.28em] text-stone-600 dark:text-paper">Catálogo</span>
                    <h2 className="font-heading font-normal text-3xl md:text-title text-ink dark:text-paper">
                        Compra por categoría
                    </h2>
                </div>
                <Link to={ROUTES.PRODUCTS} className="hidden sm:inline font-body text-[11px] text-ink dark:text-paper hover:text-camel transition-colors duration-200 uppercase tracking-[0.22em] border-b border-ink hover:border-camel pb-1">
                    Ver todo
                </Link>
            </div>
            <CategoryCarousel items={categorias} title="" />
        </section>
    )
}

const CampaignGrid = () => {
    return (
        <section className="px-4 sm:px-6 lg:px-10 py-20 lg:py-28 border-t border-stone-200">
            <div className="flex flex-col gap-2 mb-12">
                <span className="font-body text-eyebrow uppercase tracking-[0.28em] text-stone-600">Editorial</span>
                <h2 className="font-heading font-normal text-3xl md:text-title text-ink">
                    Destacados de la semana
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                {campanas.map((camp) => (
                    <Link key={camp.id} to={camp.href} className="group relative block overflow-hidden aspect-video bg-stone-100">
                        <img src={camp.image} alt={camp.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90" />
                        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/15 to-transparent" />
                        <div className="absolute inset-0 flex flex-col justify-center gap-3 px-8 lg:px-12">
                            <span className="font-body text-eyebrow uppercase tracking-[0.28em] text-paper/80 max-w-xs">
                                {camp.subtitle}
                            </span>
                            <h3 className="font-heading font-normal text-3xl md:text-4xl text-paper max-w-sm leading-tight">
                                {camp.title}
                            </h3>
                            <span className="mt-2 font-body uppercase tracking-[0.22em] text-[11px] text-paper border-b border-paper pb-1 self-start group-hover:border-camel group-hover:text-camel transition-colors duration-300">
                                Explorar
                            </span>
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
