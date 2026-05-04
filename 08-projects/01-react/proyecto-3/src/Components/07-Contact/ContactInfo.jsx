// ContactInfo.jsx
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa"
import { CONTACT_ADDRESS } from "./contactConstants"

function ContactInfo({ onOpenMap }) {
    return (
        <section className="w-full md:w-[50%] flex flex-col gap-6 md:justify-between">
            <h3 className="text-2xl">Information</h3>

            <p className="text-xl font-light">
                Have a project in mind or just an idea you want to validate?
                Let’s talk and see how we can turn it into a solid digital product.
            </p>

            <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-5 h-5" />
                <span className="text-lg">{CONTACT_ADDRESS}</span>
            </div>

            <div className="flex items-center gap-2">
                <FaPhone className="w-5 h-5" />
                <span className="text-lg">(+56) 9 1234 5678</span>
            </div>

            <div className="flex flex-row gap-5">
                <button
                    form="contact-form"
                    type="submit"
                    className="w-full py-3 border-2 border-primary bg-primary text-white font-bold rounded-md hover:bg-transparent hover:text-black transition text-sm">
                    Send Message
                </button>

                <button
                    type="button"
                    onClick={onOpenMap}
                    className="w-full py-3 border-2 border-primary text-black font-bold rounded-md hover:bg-primary hover:text-white transition text-sm">
                    View Map
                </button>
            </div>
        </section>
    )
}
export default ContactInfo