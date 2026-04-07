import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

export const NavBar = () => {
    return (
        <nav>
            <ul className={styles["nav-list"]}>
                <Link to="/" className={styles["nav-link"]}>Home</Link>
                {/* <Link to="/about" className={styles["nav-link"]}>About</Link> */}
                {/* <Link to="/contact" className={styles["nav-link"]}>Contact</Link> */}
            </ul>
        </nav>
    )
}