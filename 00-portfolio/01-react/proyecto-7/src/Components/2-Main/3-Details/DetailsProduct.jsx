import { useState } from "react"
import { useParams } from "react-router-dom"
import { useProduct } from "./hooks/useProduct"
import { SIZES } from "../../../utils/constants"
import useCart from "../5-CartContext/useCart"

const API_URL = import.meta.env.VITE_API_URL

export const DetailsProduct = () => {
    const { id } = useParams()
    const { data: producto, loading, error } = useProduct(id)
    const [selectedSize, setSelectedSize] = useState(null)

    const { agregarProducto } = useCart()

    const handleAgregarProducto = () => {
        if (producto) {
            agregarProducto({
                id: producto.id,
                image: producto.image,
                nombre: producto.nombre,
                precio: producto.precio,
                talla: selectedSize,
                cantidad: 1
            })
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block mb-4">
                        <div className="w-10 h-10 border-2 border-stone-200 border-t-ink rounded-full animate-spin"></div>
                    </div>
                    <p className="font-body text-small uppercase tracking-[0.22em] text-stone-600">Cargando producto</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="font-heading font-normal text-title text-ink mb-2">Error</h1>
                    <p className="font-body text-small text-stone-600">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-paper">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 px-4 sm:px-6 lg:px-10 py-10 lg:py-20 max-w-7xl mx-auto">

                {/* Galería de Imágenes */}
                <div className="flex flex-col gap-3">
                    <div className="bg-stone-100 overflow-hidden aspect-square">
                        <img src={`${API_URL}${producto.image}`} alt={producto.nombre} className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-stone-100 overflow-hidden aspect-square">
                            <img
                                src={`${API_URL}${producto.image}`}
                                alt={`${producto.nombre} vista 1`}
                                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity duration-300"
                            />
                        </div>
                        <div className="bg-stone-100 overflow-hidden aspect-square">
                            <img
                                src={`${API_URL}${producto.image}`}
                                alt={`${producto.nombre} vista 2`}
                                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity duration-300"
                            />
                        </div>
                        <div className="bg-stone-100 overflow-hidden aspect-square">
                            <img
                                src={`${API_URL}${producto.image}`}
                                alt={`${producto.nombre} vista 3`}
                                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity duration-300"
                            />
                        </div>
                    </div>
                </div>

                {/* Detalles del Producto */}
                <div className="flex flex-col gap-8">

                    {/* Información Principal */}
                    <div className="border-b border-stone-200 pb-8">
                        <span className="font-body text-eyebrow uppercase tracking-[0.28em] text-stone-600 mb-3 block">
                            SKU · {producto.id}
                        </span>
                        <h1 className="font-heading font-normal text-4xl lg:text-5xl text-ink mb-5 leading-[1.1]">
                            {producto.nombre}
                        </h1>
                        <p className="font-body text-price text-ink -mt-2">{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio)}</p>
                    </div>

                    {/* Descripción */}
                    <div>
                        <h3 className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink mb-3">Descripción</h3>
                        <p className="font-body text-body text-stone-600 leading-relaxed">
                            {producto.descripcion || "Producto de alta calidad con acabados premium."}
                        </p>
                    </div>

                    {/* Selector de Talla */}
                    <div>
                        <h3 className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink mb-4">Seleccionar talla</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {SIZES.map((size) => (
                                <button
                                    key={size}
                                    aria-pressed={selectedSize === size}
                                    onClick={() => setSelectedSize(prev => prev === size ? null : size)}
                                    className={`py-3 px-2 rounded-none font-body text-[12px] uppercase tracking-[0.18em] transition-colors duration-200 border ${selectedSize === size
                                        ? "border-ink bg-ink text-paper"
                                        : "border-stone-300 bg-paper text-ink hover:border-ink"
                                        }`}>
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button onClick={handleAgregarProducto} className="flex-1 bg-ink hover:bg-camel-deep text-paper font-body py-4 px-4 rounded-none transition-colors duration-300 uppercase tracking-[0.22em] text-[11px]">
                            Agregar al carrito
                        </button>
                        <button className="flex-1 border border-ink hover:bg-ink hover:text-paper text-ink font-body py-4 px-4 rounded-none transition-colors duration-300 uppercase tracking-[0.22em] text-[11px]">
                            Agregar a favoritos
                        </button>
                    </div>

                    {/* Información Adicional */}
                    <div className="bg-stone-50 border border-stone-200 rounded-none p-6 space-y-4 mt-2">
                        <div className="flex items-start gap-4">
                            <span className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink min-w-22.5">Envío</span>
                            <p className="font-body text-small text-stone-600">Envío gratis en compras mayores a $100</p>
                        </div>
                        <div className="flex items-start gap-4 border-t border-stone-200 pt-4">
                            <span className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink min-w-22.5">Retorno</span>
                            <p className="font-body text-small text-stone-600">Devolución gratuita en 30 días</p>
                        </div>
                        <div className="flex items-start gap-4 border-t border-stone-200 pt-4">
                            <span className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink min-w-22.5">Garantía</span>
                            <p className="font-body text-small text-stone-600">Garantía de 1 año en todos los productos</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
