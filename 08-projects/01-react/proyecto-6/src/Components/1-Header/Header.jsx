// Import de Link de React Router para navegación entre páginas
import { Link } from "react-router-dom"

// Import de Componentes
import { NavBar } from "./NavBar"

// Import de Icons
import { searchIcon, cartIcon } from "../../assets/icons"

export const Header = () => {
    return (
        <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-white border-b border-gray-100 sticky top-0 z-50 gap-4">

            {/* Logo */}
            <Link to="/" className="shrink-0">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Fashion Go!</h1>
            </Link>

            {/* Navegación */}
            <NavBar />

            {/* Buscador y Carrito */}
            <div className="flex items-center gap-4 sm:gap-5">
                <button className="hover:text-rose-500 text-gray-600 transition-colors duration-200 cursor-pointer">
                    <img src={searchIcon} alt="Search" className="h-5" />
                </button>

                <Link to="/carrito" className="relative hover:text-rose-500 text-gray-600 transition-colors duration-200">
                    <img src={cartIcon} alt="Cart" className="h-5" />
                    <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
                </Link>
            </div>

        </header>
    )
}