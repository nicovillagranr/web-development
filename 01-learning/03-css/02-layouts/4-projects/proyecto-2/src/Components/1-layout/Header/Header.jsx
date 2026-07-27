import "./Header.css"

function Header() {
    return (
        <header className="header">
            <nav className="header__nav">
                <a href="#home" className="header__logo"><span className="header__logo-highlight">Active</span>Box</a>
                <ul className="header__list">
                    <li className="header__item"><a href="#feature" className="header__link">Features</a></li>
                    <li className="header__item"><a href="#portfolio" className="header__link">Works</a></li>
                    <li className="header__item"><a href="#team" className="header__link">Our Team</a></li>
                    <li className="header__item"><a href="#testimonial" className="header__link">Testimonials</a></li>
                    <li className="header__item"><a href="#download" className="header__link">Download</a></li>
                </ul>
            </nav>
        </header>
    )
}
export default Header