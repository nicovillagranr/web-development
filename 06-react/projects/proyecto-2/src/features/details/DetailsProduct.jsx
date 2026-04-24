import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

// Import de API
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

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="font-heading text-title font-semibold text-red-600 mb-2">Error</h1>
                    <p className="font-body text-small text-gray-600">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {
                producto ? (
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 py-8 lg:py-16 max-w-7xl mx-auto">

                        {/* Galería de Imágenes */}
                        <div className="flex flex-col gap-4">
                            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                                <img
                                    src={`${API_URL}${producto.image}`}
                                    alt={producto.nombre}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                                    <img
                                        src={`${API_URL}${producto.image}`}
                                        alt={`${producto.nombre} vista 1`}
                                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                                    <img
                                        src={`${API_URL}${producto.image}`}
                                        alt={`${producto.nombre} vista 2`}
                                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                                    <img
                                        src={`${API_URL}${producto.image}`}
                                        alt={`${producto.nombre} vista 3`}
                                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Detalles del Producto */}
                        <div className="flex flex-col gap-6">

                            {/* Información Principal */}
                            <div className="border-b border-gray-200 pb-6">
                                <h1 className="font-heading text-title lg:text-4xl font-semibold text-gray-900 mb-2">
                                    {producto.nombre}
                                </h1>
                                <p className="font-body text-small text-gray-500 mb-4">
                                    SKU: {producto.id}
                                </p>
                                <p className="font-heading text-2xl lg:text-3xl font-semibold text-rose-500">
                                    ${producto.precio}
                                </p>
                            </div>

                            {/* Descripción */}
                            <div>
                                <h3 className="font-heading text-small font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                                    Descripción
                                </h3>
                                <p className="font-body text-small text-gray-600 leading-relaxed">
                                    {producto.descripcion || "Producto de alta calidad con acabados premium."}
                                </p>
                            </div>

                            {/* Selector de Talla */}
                            <div>
                                <h3 className="font-heading text-small font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                                    Seleccionar Talla
                                </h3>
                                <div className="grid grid-cols-4 gap-3">
                                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`py-3 px-2 rounded-md font-heading font-semibold text-small uppercase tracking-wide transition-all duration-300 border-2 ${selectedSize === size
                                                ? "border-rose-500 bg-rose-50 text-rose-600"
                                                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Botones de Acción */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                <button className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-heading font-semibold py-3 px-4 rounded-md transition-colors duration-300 uppercase tracking-wide">
                                    Agregar al Carrito
                                </button>
                                <button className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-900 font-heading font-semibold py-3 px-4 rounded-md transition-colors duration-300 uppercase tracking-wide">
                                    Agregar a Favoritos
                                </button>
                            </div>

                            {/* Información Adicional */}
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200 mt-4">
                                <div className="flex items-start gap-3">
                                    <span className="font-heading text-small font-semibold text-gray-900 min-w-fit">📦 Envío:</span>
                                    <p className="font-body text-small text-gray-600">Envío gratis en compras mayores a $100</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="font-heading text-small font-semibold text-gray-900 min-w-fit">↩️ Retorno:</span>
                                    <p className="font-body text-small text-gray-600">Devolución gratuita en 30 días</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="font-heading text-small font-semibold text-gray-900 min-w-fit">✓ Garantía:</span>
                                    <p className="font-body text-small text-gray-600">Garantía de 1 año en todos los productos</p>
                                </div>
                            </div>

                        </div>

                    </section>
                ) : (
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block mb-4">
                                <div className="w-12 h-12 border-4 border-gray-200 border-t-rose-500 rounded-full animate-spin"></div>
                            </div>
                            <p className="font-body text-small text-gray-600">Cargando producto...</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}