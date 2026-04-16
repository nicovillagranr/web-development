import { NavLink } from "react-router-dom"

// Importamos estilos
import "./NavItem.css"

function NavItem({ to, text, onClick }) {
    return (
        <li className="nav-item">
            <NavLink
                to={to}
                onClick={onClick}
                className={({ isActive }) =>
                    isActive
                        ? "nav-item__link nav-item__link--active"
                        : "nav-item__link"
                }
            >
                {text}
            </NavLink>
        </li>
    )
}

export default NavItem