import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa"

const navLinks = [
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Work" },
    { to: "/team", label: "Team" },
    { to: "/contact", label: "Contact" },
]

function Footer() {
    return (
        <footer className="w-full min-h-[15vh] bg-dark border-t border-white/10 flex flex-col items-center justify-center gap-4 px-8 sm:flex-row sm:justify-between sm:gap-0">

            {/* Logo */}
            <Link to="/" className="flex flex-col items-center sm:items-start gap-0.5">
                <span className="flex items-center gap-1.5 text-white text-base font-bold tracking-widest uppercase">
                    <FaHome className="w-4 h-4 opacity-80" aria-hidden="true" />
                    Projex
                </span>
                <span className="text-white/60 text-[10px] tracking-widest uppercase">
                    Building scalable web products
                </span>
            </Link>

            {/* Nav links — solo desktop */}
            <nav aria-label="Footer navigation" className="hidden sm:flex items-center gap-6">
                {navLinks.map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className="text-white/60 text-xs tracking-wide hover:text-primary transition-colors duration-200"
                    >
                        {label}
                    </Link>
                ))}
            </nav>

            {/* Copyright */}
            <p className="text-white/60 text-[10px] tracking-wide text-center sm:text-right">
                &copy; {new Date().getFullYear()} Nico Villagran
            </p>

        </footer>
    )
}
export default Footer
