// Contact.jsx
import { useState } from "react"

// Importamos SectionTitle
import SectionTitle from "../../SectionTitle/SectionTitle/SectionTitle.jsx"
// Importamos ContactForm
import ContactForm from "../ContactForm/ContactForm.jsx"
// Importamos ContactInfo
import ContactInfo from "../ContactInfo/ContactInfo.jsx"
// Importamos MapModal
import MapModal from "../MapModal/MapModal.jsx"

// Importamos estilos
import "../../../assets/styles/App.css"
import "./Contact.css"

function Contact() {
    const [isMapOpen, setIsMapOpen] = useState(false)

    return (
        <section className="contact">

            <SectionTitle className="contact__title-text" title="Contact Us" />

            <div className="contact__container">
                <ContactForm />
                <ContactInfo onOpenMap={() => setIsMapOpen(true)} />
            </div>

            {isMapOpen && (
                <MapModal onClose={() => setIsMapOpen(false)} />
            )}
        </section>
    )
}
export default Contact