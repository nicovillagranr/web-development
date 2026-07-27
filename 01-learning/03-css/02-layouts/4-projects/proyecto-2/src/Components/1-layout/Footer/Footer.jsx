import "./Footer.css"

import facebookIcon from "../../../assets/icons/facebook.svg"
import twitterIcon from "../../../Assets/Icons/twitter.svg"
import linkedinIcon from "../../../Assets/Icons/linkedin.svg"

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__top-container">
                <div className="footer__container-location">
                    <h3 className="footer__location-title">Location</h3>
                    <p className="footer__location-text">3481 Melrose Place</p>
                    <p className="footer__location-text">Berberly Hills, Ca 90210</p>
                </div>

                <div className="footer__container-rrss">
                    <h3 className="footer__rrss-title">Share with love</h3>
                    <ul className="footer__rrss-list">
                        <li className="footer__social-item">
                            <a href="#"><img src={facebookIcon} alt="Facebook" className="memberCard__social-icon" /></a>
                        </li>
                        <li className="footer__social-item">
                            <a href="#"><img src={twitterIcon} alt="Twitter" className="memberCard__social-icon" /></a>
                        </li>
                        <li className="footer__social-item">
                            <a href="#"><img src={linkedinIcon} alt="Linkedin" className="memberCard__social-icon" /></a>
                        </li>
                    </ul>
                </div>

                <div className="footer__container-about">
                    <h3 className="footer__about-title">About ActiveBox</h3>
                    <p className="footer__about-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates, earum.</p>
                </div>
            </div>

            <div className="footer__bottom-container">
                <p>Copyright © 2015 ActiveBox. All Rights Reserved</p>
                <p>Made with ❤️ <span>by ActiveBox</span></p>
            </div>
        </footer>
    )
}
export default Footer