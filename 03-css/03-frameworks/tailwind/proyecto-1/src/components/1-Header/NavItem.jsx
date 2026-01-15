// Importamos NavLink de React Router DOM
import { NavLink } from "react-router-dom"


function NavItem({ to, text, onClick }) {
    return (
        <li>
            <NavLink
                to={to}
                onClick={onClick}
                className={({ isActive }) =>
                    `relative after:content-[''] after:absolute after:left-0 after:-bottom-1
                    after:h-0.5 after:bg-white after:transition-all after:duration-300
                ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
                }>

                {({ isActive }) => (
                    <span aria-current={isActive ? "page" : undefined}>
                        {text}
                    </span>
                )}
            </NavLink>

        </li>
    )
}

export default NavItem
