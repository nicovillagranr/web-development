// Import de Hooks
import { useState, useEffect } from "react"

// Navigate
import { useNavigate } from "react-router-dom"

// Import de API
const API_URL = import.meta.env.VITE_API_URL
// Constantes
const CATEGORIAS = ["Hombres", "Mujeres", "Niños"]
const TIPOS = ["Abrigos", "Ropa interior", "Calzado", "Accesorios"]


const ProductCard = ({ producto, handleImageClick }) => (
    <div className="flex flex-col gap-2 hover:scale-105 transition-transform duration-500">
        <img
            src={`${API_URL}${producto.image}`}
            alt={producto.nombre}
            onClick={() => handleImageClick(producto.id)}
            className="w-full h-48 object-cover rounded-md"
        />
        <h3 className="font-heading text-small font-semibold text-gray-900">{producto.nombre}</h3>
        <p className="font-body text-small font-semibold text-rose-500">{producto.precio}</p>
    </div>
)

export const Products = () => {

    // Fetch de productos
    const [productos, setProductos] = useState([])
    const [error, setError] = useState(null)

    // Orden por precio
    const [orden, setOrden] = useState("relevance")
    const handleOrdenChange = (e) => setOrden(e.target.value)

    // Filtros por categoría y tipo
    const [filtros, setFiltros] = useState({ categorias: [], tipos: [] })

    const navigate = useNavigate()


    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`${API_URL}/products`)
                if (!response.ok) {
                    throw new Error("Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.")
                }
                const data = await response.json()
                setProductos(data)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchProductos()
    }, [])


    const toggleFiltros = (tipoFiltro, valor) => {
        setFiltros((prev) => ({
            ...prev,
            [tipoFiltro]: prev[tipoFiltro].includes(valor)
                ? prev[tipoFiltro].filter((item) => item !== valor)
                : [...prev[tipoFiltro], valor],
        }))
    }

    const productosFiltrados = productos.filter((producto) => {
        const matchCategoria =
            filtros.categorias.length === 0 || filtros.categorias.includes(producto.categoria)
        const matchTipo =
            filtros.tipos.length === 0 || filtros.tipos.includes(producto.tipo)
        return matchCategoria && matchTipo
    })

    const productosOrdenados = [...productosFiltrados].sort((a, b) => {
        if (orden === "price-low-high") return a.precio - b.precio
        if (orden === "price-high-low") return b.precio - a.precio
        return 0
    })

    const handleImageClick = (id) => {
        navigate(`/productos/${id}`)
    }

    return (
        <section className="grid grid-cols-1 lg:grid-cols-[220px_1fr] xl:grid-cols-[260px_1fr] lg:pr-8">

            {/* Sidebar de filtros */}
            <aside className="p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
                <h2 className="font-heading text-subtitle font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                    Filtros
                </h2>
                <div className="flex flex-col gap-4">

                    <div className="p-4 border border-gray-200 rounded-md">
                        <h3 className="font-heading text-small font-semibold uppercase tracking-wide text-gray-700 mb-3">
                            Categorías
                        </h3>
                        {CATEGORIAS.map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer text-small text-gray-600 hover:text-rose-500 transition-colors duration-200 py-1">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-rose-500 cursor-pointer"
                                    checked={filtros.categorias.includes(opt)}
                                    onChange={() => toggleFiltros("categorias", opt)}
                                />
                                <span className="font-body select-none">{opt}</span>
                            </label>
                        ))}
                    </div>

                    <div className="p-4 border border-gray-200 rounded-md">
                        <h3 className="font-heading text-small font-semibold uppercase tracking-wide text-gray-700 mb-3">
                            Tipo de Producto
                        </h3>
                        {TIPOS.map((opt) => (
                            <label
                                key={opt}
                                className="flex items-center gap-3 cursor-pointer text-small text-gray-600 hover:text-rose-500 transition-colors duration-200 py-1"
                            >
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-rose-500 cursor-pointer"
                                    checked={filtros.tipos.includes(opt)}
                                    onChange={() => toggleFiltros("tipos", opt)}
                                />
                                <span className="font-body select-none">{opt}</span>
                            </label>
                        ))}
                    </div>

                </div>
            </aside>

            {/* Catálogo */}
            <section className="px-4 sm:px-6 lg:px-8 py-6">

                {/* Header del catálogo */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-5 border-b border-gray-200">
                    <div className="flex flex-col gap-1">
                        <span className="font-body text-small text-gray-500 uppercase tracking-wide">
                            Catálogo
                        </span>
                        <h2 className="font-heading text-subtitle sm:text-title font-semibold text-gray-900">
                            Todas las colecciones
                        </h2>
                    </div>

                    <label className="flex items-center gap-2 font-body text-small text-gray-600 shrink-0">
                        <span className="uppercase tracking-wide text-gray-500">Ordenar por</span>
                        <select
                            value={orden}
                            onChange={handleOrdenChange}
                            className="border border-gray-300 rounded-md px-3 py-2 text-small text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:border-rose-500 cursor-pointer transition-colors duration-200"
                        >
                            <option value="relevance">Relevancia</option>
                            <option value="price-low-high">Precio: Menor a mayor</option>
                            <option value="price-high-low">Precio: Mayor a menor</option>
                            <option value="newest">Novedades</option>
                        </select>
                    </label>
                </div>

                {/* Grid de productos */}
                {error ? (
                    <p className="pt-6 font-body text-small text-red-600">{error}</p>
                ) : productosFiltrados.length > 0 ? (
                    <div className="pt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {productosOrdenados.map((producto) => (
                            <ProductCard key={producto.id} producto={producto} handleImageClick={handleImageClick} />
                        ))}
                    </div>
                ) : (
                    <p className="pt-6 font-body text-small text-gray-600">No se encontraron productos</p>
                )}

            </section>

        </section>
    )
}