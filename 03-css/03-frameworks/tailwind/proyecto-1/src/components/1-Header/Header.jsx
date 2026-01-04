// Importamos NavLink de React Router DOM
import { NavLink } from "react-router-dom"

// Importamos Hooks de React
import { useState } from "react"

// Importamos íconos
import HouseIcon from "../../assets/icons/house-solid-full.svg"
import MenuIcon from "../../assets/icons/bars-staggered-solid-full.svg"

// Importamos componentes
import NavItem from "./NavItem.jsx"

function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="relative w-full bg-[#ff5959] flex justify-center z-10">
            <nav className="w-[90%] min-h-[10vh] flex items-center justify-between md:w-[85%]">

                {/*Logo*/}
                <div className="flex flex-col">
                    <NavLink to="/" end className="flex items-center justify-center text-white text-xl tracking-widest ">
                        <img src={HouseIcon} alt="Home" className="w-5 h-5" />
                        Projex
                    </NavLink>
                    <span className="text-white text-xs font-bold">
                        One Page Business Team
                    </span>
                </div>

                {/* Hamburger button (mobile only)*/}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Open menu">
                    <img src={MenuIcon} alt="Menu" className="w-6 h-6" />
                </button>

                {/*Mobile menu*/}
                {isOpen && (
                    <ul className="md:hidden absolute top-[10vh] left-0 w-full bg-[#ff5959] flex flex-col items-center gap-6 py-6 text-white">
                        <NavItem to="/" text="Home" />
                        <NavItem to="/services" text="Services" />
                        <NavItem to="/portfolio" text="Portfolio" />
                        <NavItem to="/team" text="Our Team" />
                        <NavItem to="/news" text="News" />
                        <NavItem to="/contact" text="Contact Us" />
                    </ul>
                )}

                {/*Desktop menu*/}
                <ul className="hidden md:flex gap-6 lg:gap-15 text-white text-sm">
                    <NavItem to="/" text="Home" />
                    <NavItem to="/services" text="Services" />
                    <NavItem to="/portfolio" text="Portfolio" />
                    <NavItem to="/team" text="Our Team" />
                    <NavItem to="/news" text="News" />
                    <NavItem to="/contact" text="Contact Us" />
                </ul>

            </nav>
        </header>
    )
}
export default Header