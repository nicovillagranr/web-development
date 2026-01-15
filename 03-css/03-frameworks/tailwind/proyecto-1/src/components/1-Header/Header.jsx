// Importamos NavLink de React Router DOM
import { NavLink } from "react-router-dom"
import { useLocation } from "react-router-dom"

// Importamos Hooks de React
import { useEffect, useState } from "react"

// Importamos íconos
import HouseIcon from "../../assets/icons/house-solid-full.svg"
import MenuIcon from "../../assets/icons/bars-staggered-solid-full.svg"
import CloseIcon from "../../assets/icons/xmark-solid-full.svg"

// Importamos componentes
import NavItem from "./NavItem.jsx"

function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const location = useLocation()

    useEffect(() => {
        setIsOpen(false)
    }, [location.pathname])


    const navItems = [
        { to: "/", text: "Home" },
        { to: "/services", text: "Services" },
        { to: "/portfolio", text: "Portfolio" },
        { to: "/team", text: "Our Team" },
        { to: "/news", text: "News" },
        { to: "/contact", text: "Contact Us" },
    ]


    return (
        <header className="relative w-full bg-[#ff5959] flex justify-center z-10">
            <nav className="w-[90%] min-h-[10vh] flex items-center justify-between md:w-[80%]">

                {/*Logo*/}
                <div className="flex flex-col">
                    <NavLink to="/" end className="flex items-center justify-center text-white text-xl tracking-widest ">
                        <img src={HouseIcon} alt="Home" className="w-5 h-5" />
                        <p>Projex</p>
                    </NavLink>
                    <span className="text-white text-xs font-bold">One Page Business Team</span>
                </div>

                {/* Menú Hamburguesa: Móvil */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}>

                    <img
                        src={isOpen ? CloseIcon : MenuIcon}
                        alt={isOpen ? "Close menu icon" : "Open menu icon"}
                        className="w-7 h-7" />
                </button>

                {/*Mobile menu*/}
                {isOpen && (
                    <ul className="md:hidden absolute top-[10vh] left-0 w-full bg-[#ff5959] flex flex-col items-center gap-6 py-6 text-white">
                        {navItems.map(item => (
                            <NavItem
                                key={item.to}
                                to={item.to}
                                text={item.text}
                                onClick={() => setIsOpen(false)}
                            />
                        ))}
                    </ul>
                )}


                {/*Desktop menu*/}
                <ul className="hidden md:flex gap-6 lg:gap-15 text-white text-sm">
                    {navItems.map(item => (
                        <NavItem
                            key={item.to}
                            to={item.to}
                            text={item.text}
                        />
                    ))}
                </ul>


            </nav>
        </header >
    )
}
export default Header