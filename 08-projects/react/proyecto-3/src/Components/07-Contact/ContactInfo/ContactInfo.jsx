// ContactInfo.jsx
import "../../../assets/styles/App.css"
import "./ContactInfo.css"

import locationIcon from "../../../assets/icons/4-Contact/location.svg"
import phoneIcon from "../../../assets/icons/4-Contact/phone.svg"

function ContactInfo({ onOpenMap }) {
    return (
        <section className="contact-info">
            <h3 className="contact-info__title">Information</h3>

            <p className="contact-info__description">
                Have a project in mind or just an idea you want to validate?
                Let's talk and see how we can turn it into a solid digital product.
            </p>

            <div className="contact-info__item">
                <img src={locationIcon} alt="" aria-hidden="true" className="contact-info__icon" />
                <span className="contact-info__text">Alonso de Córdova 1234, Vitacura, Santiago</span>
            </div>

            <div className="contact-info__item">
                <img src={phoneIcon} alt="" aria-hidden="true" className="contact-info__icon" />
                <span className="contact-info__text">(+56) 9 1234 5678</span>
            </div>

            <div className="contact-info__buttons">
                <button
                    form="contact-form"
                    type="submit"
                    aria-controls="contact-form"
                    className="contact-info__button contact-info__button--primary">
                    Send Message
                </button>

                <button
                    type="button"
                    onClick={onOpenMap}
                    className="contact-info__button contact-info__button--secondary">
                    View Map
                </button>
            </div>
        </section>
    )
}
export default ContactInfo
