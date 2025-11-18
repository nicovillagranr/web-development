import "./Header.css"
import Logo from '../../assets/img/logo.png'

function Header() {
    return (
        <header className="header">
            <nav className="header__container">
                <a href="#">
                    <img className='container__logo' src={Logo} alt="Logo de la empresa" />
                </a>

                <ul className='container__list'>
                    <li className="list__item"><a href="#">Home</a></li>
                    <li className="list__item"><a href="#">About</a></li>
                    <li className="list__item"><a href="#">Projects</a></li>
                    <li className="list__item"><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}
export default Header