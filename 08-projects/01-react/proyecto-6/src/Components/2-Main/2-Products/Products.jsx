// Navigate
import { useNavigate } from "react-router-dom"

// Hooks propios
import { useProducts } from "./hooks/useProducts"
import { useFiltrosProductos } from "./hooks/useFiltrosProductos"
import { useOrdenProductos } from "./hooks/useOrdenProductos"

// Context
import useCart from "../5-CartContext/useCart"

// Components
import { ProductCard } from "../7-ProductCard"

// Constantes globales
import { PRODUCT_FILTERS, SORT_OPTIONS } from "../../../utils/constants"

export const Products = () => {

    const { data: productos, error, loading } = useProducts()

    const { filtros, toggleFiltros, productosFiltrados } = useFiltrosProductos(productos ?? [])

    const { orden, handleOrdenChange, productosOrdenados } = useOrdenProductos(productosFiltrados)

    const { agregarProducto } = useCart()

    const navigate = useNavigate()
    const handleImageClick = (id) => navigate(`/productos/${id}`)

    return (
        <section className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] lg:pr-10">

            {/* Sidebar de filtros */}
            <aside className="px-4 sm:px-6 py-8 lg:py-12 border-b lg:border-b-0 lg:border-r border-stone-200">
                <h2 className="font-heading font-normal text-subtitle text-ink mb-8 pb-5 border-b border-stone-200">Filtros</h2>
                <div className="flex flex-col gap-8">
                    <div>
                        <h3 className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink mb-4">Categorías</h3>
                        <div className="flex flex-col">
                            {PRODUCT_FILTERS.CATEGORIES.map((opt) => (
                                <label key={opt} className="flex items-center gap-3 cursor-pointer text-small text-stone-600 hover:text-ink transition-colors duration-200 py-1.5">
                                    <input type="checkbox" className="w-3.5 h-3.5 accent-ink cursor-pointer rounded-none" checked={filtros.categorias.includes(opt)}
                                        onChange={() => toggleFiltros("categorias", opt)}
                                    />
                                    <span className="font-body select-none">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-stone-200 pt-6">
                        <h3 className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink mb-4">Tipo de producto</h3>
                        <div className="flex flex-col">
                            {PRODUCT_FILTERS.TYPES.map((opt) => (
                                <label key={opt} className="flex items-center gap-3 cursor-pointer text-small text-stone-600 hover:text-ink transition-colors duration-200 py-1.5">
                                    <input
                                        type="checkbox"
                                        className="w-3.5 h-3.5 accent-ink cursor-pointer rounded-none"
                                        checked={filtros.tipos.includes(opt)}
                                        onChange={() => toggleFiltros("tipos", opt)}
                                    />
                                    <span className="font-body select-none">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                </div>
            </aside>

            {/* Catálogo */}
            <section className="px-4 sm:px-6 lg:px-10 py-8 lg:py-12">

                {/* Header del catálogo */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-8 border-b border-stone-200">
                    <div className="flex flex-col gap-2">
                        <span className="font-body text-eyebrow text-stone-600 uppercase tracking-[0.28em]">Catálogo</span>
                        <h2 className="font-heading font-normal text-3xl md:text-title text-ink">Todas las colecciones</h2>
                    </div>

                    <label className="flex items-center gap-3 font-body text-small text-ink shrink-0">
                        <span className="uppercase tracking-[0.22em] text-[11px] text-stone-600">Ordenar por</span>
                        <select value={orden} onChange={handleOrdenChange} className="border-0 border-b border-ink rounded-none px-1 py-1 text-small text-ink bg-transparent focus:outline-none focus:border-camel cursor-pointer transition-colors duration-200">
                            {SORT_OPTIONS.map(({ value, label }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* Grid de productos */}
                {loading ? (
                    <p className="pt-8 font-body text-small text-stone-600">Cargando productos...</p>
                ) : error ? (
                    <p className="pt-8 font-body text-small text-red-700">{error}</p>
                ) : productosOrdenados.length > 0 ? (
                    <div className="pt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-x-3 gap-y-10">
                        {productosOrdenados.map((producto) => (
                            <ProductCard key={producto.id} producto={producto} handleImageClick={handleImageClick} agregarProducto={agregarProducto} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full h-screen flex justify-center items-center pt-6 font-body text-small text-stone-600">
                        <p className="pt-6 font-body text-small text-stone-600">No se encontraron productos</p>
                    </div>
                )}
            </section>
        </section>
    )
}