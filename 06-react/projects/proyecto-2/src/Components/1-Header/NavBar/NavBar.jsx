import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <nav className="hidden md:block">
            <ul className="flex justify-end gap-6 lg:gap-8">
                <Link to="/" className="font-body text-small text-gray-600 hover:text-rose-500 transition-colors duration-200 tracking-wide">
                    Home
                </Link>
                <Link to="/productos" className="font-body text-small text-gray-600 hover:text-rose-500 transition-colors duration-200 tracking-wide">
                    Productos
                </Link>
            </ul>
        </nav>
    )
}