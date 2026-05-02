import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ProductGallery } from "./components/ProductGallery"
import { ProductInfo } from "./components/ProductInfo"
import { ProductDescription } from "./components/ProductDescription"
import { SizeSelector } from "./components/SizeSelector"
import { ProductActions } from "./components/ProductActions"
import { ShippingInfo } from "./components/ShippingInfo"
import { LoadingState } from "./components/LoadingState"
import { ErrorState } from "./components/ErrorState"

const API_URL = import.meta.env.VITE_API_URL

export const DetailsProduct = () => {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [error, setError] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`${API_URL}/products/${id}`)
                if (!response.ok) {
                    throw new Error("Error al cargar el producto. Por favor, inténtalo de nuevo más tarde.")
                }
                const data = await response.json()
                setProducto(data)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchProducto()
    }, [id])

    if (error) return <ErrorState message={error} />

    return (
        <div className="min-h-screen bg-white">
            {producto ? (
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 py-8 lg:py-16 max-w-7xl mx-auto">
                    <ProductGallery image={`${API_URL}${producto.image}`} nombre={producto.nombre} />
                    <div className="flex flex-col gap-6">
                        <ProductInfo nombre={producto.nombre} id={producto.id} precio={producto.precio} />
                        <ProductDescription descripcion={producto.descripcion} />
                        <SizeSelector selectedSize={selectedSize} onSelect={setSelectedSize} />
                        <ProductActions />
                        <ShippingInfo />
                    </div>
                </section>
            ) : (
                <LoadingState />
            )}
        </div>
    )
}
