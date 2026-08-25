import { NavLink } from "react-router-dom"

// Definimos los types que va a recibir como argumento el componente NavItem
type NavItemProps = {
    to: string
    text: string
    onClick?: () => void
}

function NavItem({ to, text, onClick }: NavItemProps) {
    return (
        <li>
            <NavLink to={to} onClick={onClick} className={({ isActive }) =>
                `relative after:content-[''] after:absolute after:left-0 after:-bottom-1
                    after:h-0.5 after:bg-white after:transition-all after:duration-300
                    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`}>
                {text}
            </NavLink>
        </li>
    )
}
export default NavItem
