import { Link } from "react-router-dom"

const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
]

export const NavBar = () => {
    return (
        <nav>
            <ul className="flex gap-6">
                {navLinks.map(link => (
                    <li key={link.to}>
                        <Link to={link.to} className="text-white/70 font-medium transition-colors duration-200 hover:text-white">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
