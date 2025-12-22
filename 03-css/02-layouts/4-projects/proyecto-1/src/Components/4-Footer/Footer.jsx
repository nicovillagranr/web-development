import "./Footer.css"

function Footer() {
    return (
        <footer className="footer">

            <ul className="footer__list">
                <li className="footer__list-item"><a href="#" className="footer__list-link">About Us</a></li>
                <li className="footer__list-item"><a href="#" className="footer__list-link">Privacy Policy</a></li>
                <li className="footer__list-item"><a href="#" className="footer__list-link">Terms of Service</a></li>
                <li className="footer__list-item"><a href="#" className="footer__list-link">XML Sitemap</a></li>
                <li className="footer__list-item"><a href="#" className="footer__list-link">Contact</a></li>
            </ul>

            <span className="footer__line"></span>

            <p className="footer__copy-text">&copy; 2025 Glossy Touch. All Rights Reserved. Crafted with modern web technologies.</p>
        </footer>
    )
}
export default Footer