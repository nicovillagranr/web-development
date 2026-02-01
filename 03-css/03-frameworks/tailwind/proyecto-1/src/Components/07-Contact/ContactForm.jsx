import { useState } from "react"
import { ContactValidation } from "./ContactValidation"

function ContactForm() {
    const { validate } = ContactValidation()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState("idle")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validate(formData)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setErrors({})
        setStatus("submitting")

        await new Promise(resolve => setTimeout(resolve, 1500))

        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
    }

    return (
        <section className="w-full md:w-[50%]">
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit}
                noValidate
                id="contact-form"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-md md:text-lg"
                />
                {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-md md:text-lg"
                />
                {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}

                <textarea
                    name="message"
                    placeholder="Message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-md md:text-lg"
                />
                {errors.message && <span className="text-red-600 text-sm">{errors.message}</span>}

                {status === "success" && (
                    <p className="text-green-600 text-sm">
                        Message sent successfully ✔
                    </p>
                )}
            </form>
        </section>
    )
}

export default ContactForm
