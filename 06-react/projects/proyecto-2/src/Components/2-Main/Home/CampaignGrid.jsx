import { Link } from "react-router-dom"
import { campanas } from "./home.data"

export const CampaignGrid = () => {
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
                        className="group relative block overflow-hidden rounded-md aspect-[16/9]"
                    >
                        <img
                            src={camp.image}
                            alt={camp.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
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
