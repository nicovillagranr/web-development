// Import de Hooks y bibliotecas
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Importamos estilos
import "../../../assets/styles/App.css";
import "./Header.css";

// Importamos íconos
import HouseIcon from "../../../assets/icons/1-Header/house.svg";
import MenuIcon from "../../../assets/icons/1-Header/bars.svg";
import CloseIcon from "../../../assets/icons/1-Header/x.svg";

// Importamos componentes
import NavItem from "../NavItem/NavItem.jsx";

// Definimos el componente MotionMenu para animar el menú móvil
const MotionMenu = motion.ul;

// Definimos las variantes de animación para el menú móvil | El cómo aparecerá y desaparecerá el menú
const mobileMenuVariants = {
    hidden: {
        opacity: 0,
        y: -10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.15,
            ease: "easeIn",
        },
    },
};

// Definimos los elementos de navegación para el menú para recorrerlos fácilmente tanto en la versión de escritorio como en la móvil con un .map() y evitar la repetición de código
const navItems = [
    { to: "/", text: "Home" },
    { to: "/services", text: "Services" },
    { to: "/portfolio", text: "Portfolio" },
    { to: "/team", text: "Our Team" },
    { to: "/news", text: "News" },
    { to: "/contact", text: "Contact Us" },
];

function Header() {
    const [menuState, setMenuState] = useState({ isOpen: false, pathname: "/" });
    const location = useLocation();
    const isOpen = menuState.isOpen && menuState.pathname === location.pathname;

    const toggleMenu = () => {
        setMenuState((currentState) => ({
            isOpen: !(currentState.isOpen && currentState.pathname === location.pathname),
            pathname: location.pathname,
        }));
    };

    const closeMenu = () => {
        setMenuState({ isOpen: false, pathname: location.pathname });
    };

    return (
        <header className="header">
            <nav className="header__nav" aria-label="Primary">
                <div className="header__logo-container">
                    <div className="flex flex-col">
                        <NavLink to="/" end className="header__logo-link" onClick={closeMenu}>
                            <img src={HouseIcon} alt="" aria-hidden="true" className="header__logo-icon" />
                            <span className="header__brand">Projex</span>
                        </NavLink>
                        <span className="header__tagline">Scalable Web Products</span>
                    </div>

                    <div className="header__spacer" />

                    <ul className="header__menu-desktop">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.to}
                                to={item.to}
                                text={item.text}
                            />
                        ))}
                    </ul>
                </div>

                <div className="header__menu-actions">
                    <button
                        type="button"
                        className="header__menu-button"
                        onClick={toggleMenu}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                    >
                        <img
                            src={isOpen ? CloseIcon : MenuIcon}
                            alt=""
                            aria-hidden="true"
                            className="header__menu-button-icon"
                        />
                    </button>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <MotionMenu
                            id="mobile-navigation"
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="header__menu-mobile"
                            aria-label="Mobile"
                        >
                            {navItems.map((item) => (
                                <NavItem
                                    key={item.to}
                                    to={item.to}
                                    text={item.text}
                                    onClick={closeMenu}
                                />
                            ))}
                        </MotionMenu>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}

export default Header;
