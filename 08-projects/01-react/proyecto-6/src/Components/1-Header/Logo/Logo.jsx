// Import de Link de React-Router-Dom
import { Link } from "react-router-dom"
// Import de Constantes
import { ROUTES } from "../../../utils/constants"
// Import de Logo
import logoLight from "../../../assets/images/logo-light.png"
import logoDark from "../../../assets/images/logo-dark.png"

export const Logo = () => {
    return (
        <Link to={ROUTES.HOME} className="shrink-0">
            <img src={logoLight} alt="Logo" className="w-30 blok dark:hidden" />
            <img src={logoDark} alt="Logo" className="w-30 hidden dark:block" />
        </Link>
    )
}
