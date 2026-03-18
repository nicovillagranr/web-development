import "./Footer.css"

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer" id="contact">

            <ul className="footer__list">
                <li className="footer__list-item"><a href="#about" className="footer__list-link">About Us</a></li>
                <li className="footer__list-item"><a href="privacy-policy.html" className="footer__list-link">Privacy Policy</a></li>
                <li className="footer__list-item"><a href="terms-of-service.html" className="footer__list-link">Terms of Service</a></li>
                <li className="footer__list-item"><a href="sitemap.xml" className="footer__list-link">XML Sitemap</a></li>
                <li className="footer__list-item"><a href="#contact" className="footer__list-link">Contact</a></li>
            </ul>

            <span className="footer__line"></span>

            <p className="footer__copy-text">
                &copy;<time dateTime={String(currentYear)}>{currentYear} </time>
                Glossy Touch. All Rights Reserved. Crafted with modern web technologies.
            </p>
        </footer>
    )
}
export default Footer
