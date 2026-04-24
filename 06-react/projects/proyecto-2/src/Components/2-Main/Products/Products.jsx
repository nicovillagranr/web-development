// Import de Hooks
import { useState, useEffect } from "react"

// Import de Componentes
import { FilterSidebar } from "./FilterSidebar"
import { CatalogHeader } from "./CatalogHeader"
import { ProductGrid } from "./ProductGrid"

export const Products = () => {

    // Hooks para el Fetch de Productos
    const [productos, setProductos] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch("https://products-api-puce.vercel.app/products")
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


    // Hooks para el orden de productos por precio
    const [orden, setOrden] = useState("relevance")

    // Funciones para el orden de productos
    const handleOrdenChange = (e) => {
        setOrden(e.target.value)
    }



    // Hooks para los filtros
    const [filtros, setFiltros] = useState({ categorias: [], tipos: [] })

    const toggleFiltros = (tipoFiltro, valor) => {
        setFiltros((prev) => ({
            ...prev,
            [tipoFiltro]: prev[tipoFiltro].includes(valor) ? prev[tipoFiltro].filter((item) => item !== valor) : [...prev[tipoFiltro], valor],
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
        if (orden === "price-low-high") {
            return a.precio - b.precio
        }
        if (orden === "price-high-low") {
            return b.precio - a.precio
        }
        return 0;
    })

    return (
        <section className="grid grid-cols-1 lg:grid-cols-[220px_1fr] xl:grid-cols-[260px_1fr] lg:pr-8">
            <FilterSidebar filtros={filtros} toggleFiltros={toggleFiltros} />
            <section className="px-4 sm:px-6 lg:px-8 py-6">
                <CatalogHeader orden={orden} handleOrdenChange={handleOrdenChange} />
                <ProductGrid productos={productosOrdenados} error={error} />
            </section>
        </section>
    )
}