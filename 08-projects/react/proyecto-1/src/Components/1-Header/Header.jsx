import "./Header.css"
function Header() {
    return (
        <header className='header' id="home">
            <nav className="header__nav" aria-label="Primary navigation">
                <a href="#home" className="nav__title">Glossy Touch</a>

                <ul className="nav__list">
                    <li className="nav__item"><a href="#home" className="item__link">Home</a></li>
                    <li className="nav__item"><a href="#about" className="item__link">About</a></li>
                    <li className="nav__item"><a href="#services" className="item__link">Services</a></li>
                    <li className="nav__item"><a href="#contact" className="item__link">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;
