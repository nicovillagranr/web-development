// Importamos Link para que el logo del footer redirija al home
import { Link } from "react-router-dom"

// Importamos estilos
import "../../../assets/styles/App.css"
import "./Footer.css"

// Importamos íconos
import HouseIcon from "../../../assets/icons/1-Header/house.svg"

function Footer() {
    return (
        <footer className="footer">

            {/*Logo*/}
            <div className="footer__logo-container">
                <Link to="/" className="footer__logo-link">
                    <img src={HouseIcon} alt="" aria-hidden="true" className="footer__logo-icon" />
                    <span className="footer__logo-text">Projex</span>
                </Link>
                <span className="footer__tagline">
                    Building scalable web products
                </span>
            </div>


            {/* Copyright */}
            <div className="footer__copyright">
                &copy; {new Date().getFullYear()} Nico Villagran. All rights reserved.
            </div>

        </footer>
    )
}
export default Footer
