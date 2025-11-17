import "../../assets/fontawesome/css/all.min.css";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header__logo">
                <i class="fa-solid fa-fire header__icon">
                    <span className="header__brand">TecnoShop</span>
                </i>

            </div>
            <nav className="header__nav">
                <ul className="nav__list">
                    <li className="list__item"><a href="#">Home</a></li>
                    <li className="list__item"><a href="#">About</a></li>
                    <li className="list__item"><a href="#">Features</a></li>
                    <li className="list__item"><a href="#">Products</a></li>
                    <li className="list__item"><a href="#">Testimonial</a></li>
                    <li className="list__item"><a href="#">Faq</a></li>
                    <li className="list__item"><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;