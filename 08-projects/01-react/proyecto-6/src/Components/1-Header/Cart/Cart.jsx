import { Link } from "react-router-dom"
import { FiShoppingCart } from "react-icons/fi"
import { ROUTES } from "../../../utils/constants"

export const Cart = () => {
    return (
        <Link to={ROUTES.CART} aria-label="Carrito de compras" className="relative text-ink dark:text-paper hover:text-camel transition-colors duration-200">
            <FiShoppingCart className="h-5 w-5" />
            <span aria-hidden="true" className="absolute -top-2 -right-3 bg-ink text-paper text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full">0</span>
        </Link>
    );
}
