// Import hooks and validation helper
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
            setStatus("idle")
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
                <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="text-sm font-medium text-gray-800 md:text-base">
                        Name
                    </label>
                    <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        className="w-full rounded-md border border-gray-400 p-3 text-md focus:outline-none focus:ring-2 focus:ring-primary md:text-lg"
                    />
                    {errors.name && (
                        <p id="contact-name-error" role="alert" className="text-sm text-red-600">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="text-sm font-medium text-gray-800 md:text-base">
                        Email
                    </label>
                    <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        inputMode="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        className="w-full rounded-md border border-gray-400 p-3 text-md focus:outline-none focus:ring-2 focus:ring-primary md:text-lg"
                    />
                    {errors.email && (
                        <p id="contact-email-error" role="alert" className="text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="contact-message" className="text-sm font-medium text-gray-800 md:text-base">
                        Message
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        placeholder="Message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? "contact-message-error" : undefined}
                        className="w-full rounded-md border border-gray-400 p-3 text-md focus:outline-none focus:ring-2 focus:ring-primary md:text-lg"
                    />
                    {errors.message && (
                        <p id="contact-message-error" role="alert" className="text-sm text-red-600">
                            {errors.message}
                        </p>
                    )}
                </div>

                {status === "success" && (
                    <p role="status" aria-live="polite" className="text-sm text-green-600">
                        Message sent successfully
                    </p>
                )}
            </form>
        </section>
    )
}

export default ContactForm
