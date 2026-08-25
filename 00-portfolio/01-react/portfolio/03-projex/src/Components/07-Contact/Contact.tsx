// Contact.jsx
import { useState } from "react"

// Importamos SectionTitle
import SectionTitle from "../SectionTitle/SectionTitle.tsx"
// Importamos ContactForm
import ContactForm from "./ContactForm.tsx"
// Importamos ContactInfo
import ContactInfo from "./ContactInfo.tsx"
// Importamos MapModal
import MapModal from "./MapModal.tsx"

function Contact() {
    const [isMapOpen, setIsMapOpen] = useState(false)

    return (
        <section className="w-full min-h-[75vh] py-5 bg-surface flex flex-col items-center justify-center">

            <SectionTitle className="text-black" title="Contáctanos" level={1} />

            <div className="w-full flex flex-col px-5 md:px-60 mt-10 md:flex-row gap-10">
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
