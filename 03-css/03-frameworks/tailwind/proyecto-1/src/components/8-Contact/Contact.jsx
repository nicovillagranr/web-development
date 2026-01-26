// Importamos useState desde React
import { useState } from "react"

// Importamos SectionTitle
import SectionTitle from "../11-SectionTitle/SectionTitle.jsx"

// Importamos iconos
import locationIcon from "../../assets/icons/4-Contact/location.svg"
import phoneIcon from "../../assets/icons/4-Contact/phone.svg"

function Contact() {
    // =========================
    // STATE
    // =========================
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState("idle")
    // idle | submitting | success

    const [isMapOpen, setIsMapOpen] = useState(false)

    // =========================
    // HANDLERS
    // =========================
    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const validate = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "El nombre es obligatorio"
        } else if (formData.name.length < 2) {
            newErrors.name = "El nombre debe tener al menos 2 caracteres"
        }

        if (!formData.email.trim()) {
            newErrors.email = "El email es obligatorio"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email no válido"
        }

        if (!formData.message.trim()) {
            newErrors.message = "El mensaje es obligatorio"
        } else if (formData.message.length < 10) {
            newErrors.message = "El mensaje debe tener al menos 10 caracteres"
        }

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validate()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setErrors({})
        setStatus("submitting")

        // Simulación de envío
        await new Promise(resolve => setTimeout(resolve, 1500))

        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
    }

    return (
        <section className="w-full min-h-[75vh] py-5 bg-[#E8E8E8] flex flex-col items-center justify-center">

            <SectionTitle className="text-black" title="Contact Us" />

            <div className="w-full flex flex-col px-5 md:px-60 mt-10 md:flex-row gap-10">

                {/* FORM */}
                <section className="w-full md:w-[50%]">
                    <form id="contact-form" className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 font-md border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5959] text-md md:text-lg" />

                        {errors.name && (
                            <span className="text-red-600 text-sm">{errors.name}</span>
                        )}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 font-md border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5959] text-md md:text-lg" />

                        {errors.email && (
                            <span className="text-red-600 text-sm">{errors.email}</span>
                        )}

                        <textarea
                            name="message"
                            placeholder="Mensaje"
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 border font-md border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5959] text-md md:text-lg" />

                        {errors.message && (
                            <span className="text-red-600 text-sm">{errors.message}</span>
                        )}
                    </form>
                </section>

                {/* CONTACT INFO */}
                <section className="w-full md:w-[50%] flex flex-col justify-between">
                    <h3 className="text-2xl">Information</h3>

                    <p className="text-xl font-light">Have a project in mind or just an idea you want to validate?
                        Let’s talk and see how we can turn it into a solid digital product.</p>

                    <p className="flex items-center gap-2">
                        <img src={locationIcon} alt="Location Icon" className="w-5 h-5" />
                        <span className="text-lg">Alonso de Córdova 1234, Vitacura, Santiago</span>
                    </p>

                    <p className="flex items-center gap-2">
                        <img src={phoneIcon} alt="Phone Icon" className="w-5 h-5" />
                        <span className="text-lg">(+56) 9 1234 5678</span>
                    </p>

                    <div className="flex flex-row gap-5">
                        <button
                            form="contact-form"
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full py-3 border-2 border-[#ff5959] bg-[#ff5959] text-white font-bold rounded-md hover:bg-transparent hover:text-black transition disabled:opacity-60">
                            {status === "submitting" ? "Enviando..." : "Send Message"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsMapOpen(true)}
                            className="w-full py-3 border-2 border-[#ff5959] text-black font-bold rounded-md hover:bg-[#ff5959] hover:text-white transition">
                            View Map
                        </button>
                    </div>

                    {status === "success" && (
                        <p className="text-green-600 font-medium mt-3">
                            Mensaje enviado correctamente ✔
                        </p>
                    )}
                </section>
            </div>

            {/* MAP MODAL */}
            {isMapOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" role="dialog" aria-modal="true">

                    <div className="relative w-[90%] max-w-lg rounded-lg bg-white overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setIsMapOpen(false)}
                            className="absolute right-3 top-3 font-bold text-sm"
                            aria-label="Close map">
                            ✕
                        </button>

                        <iframe title="Location map" src="https://www.google.com/maps?q=Alonso%20de%20Córdova%201234%20Vitacura%20Santiago&output=embed" className="w-full h-80"
                            loading="lazy" />
                    </div>
                </div>
            )}
        </section>
    )
}
export default Contact