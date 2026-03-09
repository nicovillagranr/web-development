import "./Footer.css"

import facebookIcon from "../../../assets/icons/facebook.svg"
import twitterIcon from "../../../assets/icons/twitter.svg"
import linkedinIcon from "../../../assets/icons/linkedin.svg"

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
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Facebook">
                                <img src={facebookIcon} alt="" className="memberCard__social-icon" />
                            </a>
                        </li>
                        <li className="footer__social-item">
                            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit X">
                                <img src={twitterIcon} alt="" className="memberCard__social-icon" />
                            </a>
                        </li>
                        <li className="footer__social-item">
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn">
                                <img src={linkedinIcon} alt="" className="memberCard__social-icon" />
                            </a>
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
