// Import de Hooks
import { useState, useEffect } from "react"

// Import de Componentes
import { FilterSidebar } from "./FilterSidebar"
import { CatalogHeader } from "./CatalogHeader"
import { ProductGrid } from "./ProductGrid"

export const Products = () => {

    // Hooks para el Fetcgh de Productos
    const [productos, setProductos] = useState([])
    const [error, setError] = useState(null)

    // Hooks para el orden de productos
    const [orden, setOrden] = useState("Relevancia")

    // Funciones para el orden de productos
    const handleOrdenChange = (e) => {
        setOrden(e.target.value)
    }

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

    return (
        <section className="grid grid-cols-1 lg:grid-cols-[220px_1fr] xl:grid-cols-[260px_1fr] lg:pr-8">
            <FilterSidebar />
            <section className="px-4 sm:px-6 lg:px-8 py-6">
                <CatalogHeader orden={orden} handleOrdenChange={handleOrdenChange} />
                <ProductGrid productos={productos} error={error} />
            </section>
        </section>
    )
}

