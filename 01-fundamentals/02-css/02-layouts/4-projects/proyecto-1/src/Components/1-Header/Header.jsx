import "./Header.css"
function Header() {
    return (
        <header className='header'>
            <nav className="header__nav">
                <h2><a href="#" className="nav__title">Glossy Touch</a></h2>

                <ul className="nav__list">
                    <li className="nav__item"><a href="#" className="item__link">Home</a></li>
                    <li className="nav__item"><a href="#" className="item__link">About</a></li>
                    <li className="nav__item"><a href="#" className="item__link">Services</a></li>
                    <li className="nav__item"><a href="#" className="item__link">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;