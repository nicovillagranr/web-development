// Importamos Link para que el usuario pueda volver a la página principal
import { Link } from "react-router-dom";

// Importamos estilos
import "../../../assets/styles/App.css";
import "./404.css";

// Este componente muestra un mensaje de error 404 cuando la página no se encuentra
function NotFound() {
    return (
        <section className="not-found">
            <h1 className="not-found__code">404</h1>
            <p className="not-found__message">The page you are looking for does not exist or has been moved.</p>
            <Link to="/" className="not-found__link">
                Back to Home
            </Link>
        </section>
    )
}
export default NotFound;