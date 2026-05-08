import { Link } from "react-router-dom"
import { ROUTES } from "../../../utils/constants"
import logoLight from "../../../assets/images/logo-light.png"
import logoDark from "../../../assets/images/logo-dark.png"

export const HeaderLogo = () => {
    return (
        <Link to={ROUTES.HOME} className="shrink-0">
            <img src={logoLight} alt="Logo" className="w-30 blok dark:hidden" />
            <img src={logoDark} alt="Logo" className="w-30 hidden dark:block" />
        </Link>
    )
}
