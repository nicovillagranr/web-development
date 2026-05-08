import { useSearchParams, useNavigate } from "react-router-dom"
import { useProducts } from "../2-Products/hooks/useProducts"
import useCart from "../5-CartContext/useCart"
import { ProductCard } from "../7-ProductCard"

export const SearchResults = () => {
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q") || ""

    const { data: productos, error, loading } = useProducts()
    const { agregarProducto } = useCart()
    const navigate = useNavigate()

    const handleImageClick = (id) => navigate(`/productos/${id}`)

    const resultados = productos?.filter(p =>
        p.nombre.toLowerCase().includes(q.toLowerCase())
    ) || []

    return (
        <section className="px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
            <div className="flex flex-col gap-2 pb-8 border-b border-stone-200">
                <span className="font-body text-eyebrow text-stone-600 uppercase tracking-[0.28em]">Búsqueda</span>
                <h2 className="font-heading font-normal text-3xl md:text-title text-ink">
                    Resultados para "{q}"
                </h2>
            </div>

            {loading ? (
                <p className="pt-8 font-body text-small text-stone-600">Cargando productos...</p>
            ) : error ? (
                <p className="pt-8 font-body text-small text-red-700">{error}</p>
            ) : resultados.length > 0 ? (
                <div className="pt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-x-3 gap-y-10">
                    {resultados.map((producto) => (
                        <ProductCard key={producto.id} producto={producto} handleImageClick={handleImageClick} agregarProducto={agregarProducto} />
                    ))}
                </div>
            ) : (
                <div className="w-full pt-12 flex justify-center items-center font-body text-small text-stone-600">
                    <p>No se encontraron productos con "{q}"</p>
                </div>
            )}
        </section>
    )
}
