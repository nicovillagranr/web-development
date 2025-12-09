import "./Header.css"

function Header() {
    return (
        <header className="header">
            <nav className="header__nav">
                <a href="#" className="nav__logo"><span className="weight__logo">Active</span>Box</a>
                <ul className="nav__list">
                    <li className="list__item"><a href="#feature" className="item__link">Features</a></li>
                    <li className="list__item"><a href="#portfolio" className="item__link">Works</a></li>
                    <li className="list__item"><a href="#team" className="item__link">Our Team</a></li>
                    <li className="list__item"><a href="#testimonial" className="item__link">Testimonials</a></li>
                    <li className="list__item"><a href="#download" className="item__link">Download</a></li>
                </ul>
            </nav>
        </header>
    )
}
export default Header