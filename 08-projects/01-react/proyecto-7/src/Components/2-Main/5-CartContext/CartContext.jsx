import React, { createContext, useState } from "react";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([])

    const agregarProducto = (producto) => {
        setCarrito((carritoAnterior) => {
            const yaExiste = carritoAnterior.findIndex(item => item.id === producto.id)
            if (yaExiste >= 0) {
                const carritoActualizado = [...carritoAnterior]
                carritoActualizado[yaExiste] = { ...carritoActualizado[yaExiste], cantidad: carritoActualizado[yaExiste].cantidad + 1 }
                return carritoActualizado
            } else {
                return [...carritoAnterior, { ...producto, cantidad: 1 }]
            }
        })
    }

    const reducirCantidad = (id) => {
        setCarrito((carritoAnterior) => {
            const yaExiste = carritoAnterior.findIndex(item => item.id === id)
            if (carritoAnterior[yaExiste].cantidad === 1) {
                return carritoAnterior.filter(item => item.id !== id)
            }
            const carritoActualizado = [...carritoAnterior]
            carritoActualizado[yaExiste] = { ...carritoActualizado[yaExiste], cantidad: carritoActualizado[yaExiste].cantidad - 1 }
            return carritoActualizado
        })
    }

    const eliminarProducto = (id) => {
        setCarrito((carritoAnterior) => carritoAnterior.filter(item => item.id !== id))
    }

    return (
        <CartContext.Provider value={{ carrito, agregarProducto, reducirCantidad, eliminarProducto }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContext