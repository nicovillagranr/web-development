import { Link } from "react-router-dom"
import { FiShoppingCart } from "react-icons/fi"
import { ROUTES } from "../../../utils/constants"
import useCart from "../../2-Main/5-CartContext/useCart"

export const HeaderCart = () => {

    const { carrito } = useCart()
    const totalItems = carrito.reduce((acumulador, ItemActual) => acumulador + ItemActual.cantidad, 0)

    return (
        <Link to={ROUTES.CART} aria-label="Carrito de compras" className="relative text-ink dark:text-paper hover:text-camel transition-colors duration-200">
            <FiShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
                <span
                    aria-hidden="true"
                    className="absolute -top-2 -right-3 bg-ink text-paper text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
                    {totalItems > 99 ? "99+" : totalItems}
                </span>
            )}
        </Link>
    );
}
