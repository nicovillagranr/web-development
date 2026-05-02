import { useState } from "react"

export const useOrdenProductos = (productos) => {
    const [orden, setOrden] = useState('relevance')

    const handleOrdenChange = (e) => setOrden(e.target.value)

    const productosOrdenados = [...productos].sort((a, b) => {
        if (orden === "price-low-high") return a.precio - b.precio
        if (orden === "price-high-low") return b.precio - a.precio
        return 0
    })
    return { orden, handleOrdenChange, productosOrdenados }
}