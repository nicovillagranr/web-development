import { Link } from "react-router-dom"
import { categorias } from "./home.data"

export const CategoryGrid = () => {
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-end justify-between mb-8">
                <h2 className="font-heading text-subtitle sm:text-title font-semibold text-gray-900">
                    Compra por categoría
                </h2>
                <Link
                    to="/productos"
                    className="hidden sm:inline font-body text-small text-gray-600 hover:text-rose-500 transition-colors duration-200 uppercase tracking-wide"
                >
                    Ver todo
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {categorias.map((cat) => (
                    <Link
                        key={cat.id}
                        to={cat.href}
                        className="group relative block overflow-hidden rounded-md aspect-[4/5]"
                    >
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <h3 className="absolute bottom-4 left-4 font-heading text-subtitle font-semibold text-white">
                            {cat.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    )
}