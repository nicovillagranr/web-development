// Import de Link de React Router para navegación entre páginas
import { Link } from "react-router-dom"

// Import de Componentes
import { NavBar } from "./NavBar/NavBar"

// Import de Icons
import searchIcon from "../../assets/icons/search.svg"
import cartIcon from "../../assets/icons/shop-cart.svg"

// Import de Estilos
import styles from "./Header.module.css"

export const Header = () => {
    return (
        <header className={styles.header}>

            <Link to="/">
                <h1 className={styles.logo}>TR<span className={styles["logo-accent"]}>ENDY</span></h1>
            </Link>

            <NavBar />

            <div className={styles.actions}>
                <button className={styles["icon-btn"]}>
                    <img src={searchIcon} alt="Search" className={styles.icon} />
                </button>

                <Link to="/carrito" className={styles["cart-link"]}>
                    <img src={cartIcon} alt="Cart" className={styles.icon} />
                    <span className={styles["cart-badge"]}>0</span>
                </Link>
            </div>

        </header>
    )
}
