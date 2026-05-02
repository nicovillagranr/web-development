import { Link } from "react-router-dom"

import { ROUTES } from "../../utils/constants"

const linksClass = "font-body text-[11px] uppercase tracking-[0.18em] font-medium text-ink dark:text-paper hover:text-camel transition-colors duration-200"

export const NavBar = () => {
    return (
        <nav className="hidden md:block">
            <ul className="flex justify-end gap-7 lg:gap-10">
                <li><Link to={ROUTES.HOME} className={linksClass}>Home</Link></li>
                <li><Link to={ROUTES.PRODUCTS} className={linksClass}>Productos</Link></li>
            </ul>
        </nav>
    )
}
