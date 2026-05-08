import useCart from "../5-CartContext/useCart"
import { Link } from "react-router-dom"
import { ROUTES } from "../../../utils/constants"

const API_URL = import.meta.env.VITE_API_URL

const CartItem = ({ producto, agregarProducto, reducirCantidad, eliminarProducto }) => (
    <li className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-4 sm:gap-6 py-6 border-b border-stone-200 dark:border-stone-900">

        {/* Imagen */}
        <div className="bg-stone-100 dark:bg-stone-900 overflow-hidden aspect-square shrink-0">
            <img
                src={`${API_URL}${producto.image}`}
                alt={producto.nombre}
                className="w-full h-full object-cover"
            />
        </div>

        {/* Info + controles */}
        <div className="flex flex-col gap-3">

            {/* Nombre y eliminar */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="font-body text-[11px] uppercase tracking-[0.22em] text-stone-600 dark:text-stone-300 mb-1">
                        {producto.talla ? `Talla: ${producto.talla}` : "Talla única"}
                    </p>
                    <h3 className="font-body text-small text-ink dark:text-paper font-medium leading-snug">
                        {producto.nombre}
                    </h3>
                </div>
                <button
                    onClick={() => eliminarProducto(producto.id)}
                    aria-label={`Eliminar ${producto.nombre}`}
                    className="font-body text-[10px] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-600 hover:text-ink dark:hover:text-paper transition-colors duration-200 shrink-0 mt-0.5"
                >
                    Eliminar
                </button>
            </div>

            {/* Cantidad + precio total */}
            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center border border-stone-300 dark:border-stone-900">
                    <button
                        onClick={() => reducirCantidad(producto.id)}
                        aria-label="Reducir cantidad"
                        className="w-8 h-8 flex items-center justify-center text-ink dark:text-paper hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors duration-200 font-body text-base"
                    >
                        −
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center font-body text-small text-ink dark:text-paper border-x border-stone-300 dark:border-stone-900 select-none">
                        {producto.cantidad}
                    </span>
                    <button
                        onClick={() => agregarProducto(producto)}
                        aria-label="Aumentar cantidad"
                        className="w-8 h-8 flex items-center justify-center text-ink dark:text-paper hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors duration-200 font-body text-base"
                    >
                        +
                    </button>
                </div>

                <p className="font-body text-price text-ink dark:text-paper">
                    {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio * producto.cantidad)}
                </p>
            </div>
        </div>
    </li>
)

const EmptyCart = () => (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center gap-6">
        <div className="w-16 h-16 border border-stone-300 dark:border-stone-900 flex items-center justify-center">
            <svg className="w-7 h-7 text-stone-400 dark:text-stone-600" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="font-heading font-normal text-subtitle text-ink dark:text-paper">Tu carrito está vacío</h2>
            <p className="font-body text-small text-stone-600 dark:text-stone-300 max-w-xs">
                Explora nuestra colección y encuentra algo que te guste.
            </p>
        </div>
        <Link
            to={ROUTES.PRODUCTS}
            className="mt-2 font-body text-[11px] uppercase tracking-[0.22em] text-paper bg-ink dark:text-ink dark:bg-paper px-8 py-3.5 hover:bg-camel-deep dark:hover:bg-camel transition-colors duration-200"
        >
            Ver productos
        </Link>
    </div>
)

const Cart = () => {
    const { carrito, agregarProducto, reducirCantidad, eliminarProducto } = useCart()

    const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)
    const envio = subtotal > 100000 ? 0 : 5990
    const total = subtotal + envio

    const fmt = (n) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(n)

    return (
        <section className="min-h-screen bg-paper dark:bg-ink px-4 sm:px-6 lg:px-10 py-10 lg:py-16 max-w-7xl mx-auto">

            {/* Encabezado */}
            <div className="pb-8 border-b border-stone-200 dark:border-stone-900 mb-8">
                <span className="font-body text-eyebrow text-stone-600 dark:text-stone-300 uppercase tracking-[0.28em] block mb-2">
                    Resumen
                </span>
                <h1 className="font-heading font-normal text-title text-ink dark:text-paper">
                    Tu carrito
                    {carrito.length > 0 && (
                        <span className="font-body text-small text-stone-400 dark:text-stone-600 ml-3 align-middle">
                            ({carrito.length} {carrito.length === 1 ? "producto" : "productos"})
                        </span>
                    )}
                </h1>
            </div>

            {carrito.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

                    {/* Lista de productos */}
                    <div>
                        <div className="hidden sm:grid grid-cols-[100px_1fr] gap-6 pb-4 border-b border-stone-200 dark:border-stone-900">
                            <span />
                            <div className="flex justify-between">
                                <span className="font-body text-[10px] uppercase tracking-[0.22em] text-stone-400 dark:text-stone-600">Producto</span>
                                <span className="font-body text-[10px] uppercase tracking-[0.22em] text-stone-400 dark:text-stone-600">Total</span>
                            </div>
                        </div>
                        <ul>
                            {carrito.map((producto) => (
                                <CartItem
                                    key={producto.id}
                                    producto={producto}
                                    agregarProducto={agregarProducto}
                                    reducirCantidad={reducirCantidad}
                                    eliminarProducto={eliminarProducto}
                                />
                            ))}
                        </ul>
                        <div className="pt-6">
                            <Link
                                to={ROUTES.PRODUCTS}
                                className="font-body text-[11px] uppercase tracking-[0.22em] text-stone-600 dark:text-stone-300 hover:text-ink dark:hover:text-paper transition-colors duration-200 inline-flex items-center gap-2"
                            >
                                ← Seguir comprando
                            </Link>
                        </div>
                    </div>

                    {/* Resumen del pedido */}
                    <aside className="bg-stone-50 dark:bg-stone-900 p-6 lg:p-8 flex flex-col gap-5 lg:sticky lg:top-24">
                        <h2 className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink dark:text-paper pb-5 border-b border-stone-200 dark:border-stone-900">
                            Resumen del pedido
                        </h2>

                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-baseline">
                                <span className="font-body text-small text-stone-600 dark:text-stone-300">Subtotal</span>
                                <span className="font-body text-small text-ink dark:text-paper">{fmt(subtotal)}</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="font-body text-small text-stone-600 dark:text-stone-300">Envío</span>
                                <span className="font-body text-small text-ink dark:text-paper">
                                    {envio === 0 ? "Gratis" : fmt(envio)}
                                </span>
                            </div>
                            {envio > 0 && (
                                <p className="font-body text-[10px] text-camel uppercase tracking-[0.18em]">
                                    Agrega {fmt(100000 - subtotal)} más para envío gratis
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between items-baseline pt-5 border-t border-stone-200 dark:border-stone-900">
                            <span className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink dark:text-paper">Total</span>
                            <span className="font-heading font-normal text-subtitle text-ink dark:text-paper">{fmt(total)}</span>
                        </div>

                        <button className="w-full bg-ink dark:bg-paper text-paper dark:text-ink font-body text-[11px] uppercase tracking-[0.22em] py-4 hover:bg-camel-deep transition-colors duration-200 mt-2">
                            Proceder al pago
                        </button>

                        <p className="font-body text-[10px] text-stone-400 dark:text-stone-600 uppercase tracking-[0.18em] text-center pt-2 border-t border-stone-200 dark:border-stone-900">
                            Pago seguro · Devolución en 30 días
                        </p>
                    </aside>
                </div>
            )}
        </section>
    )
}

export default Cart
