import { useState } from "react"
import { ContactValidation } from "./ContactValidation.tsx"

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
        if (status === "success") setStatus("idle")
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
        <div className="w-full md:w-[50%]">
            <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit}
                noValidate
                id="contact-form"
            >
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor="contact-name" className="text-sm font-medium text-gray-800">
                            Name
                        </label>
                        <p id="contact-name-error" role="alert" aria-live="polite" className="text-xs text-red-500">
                            {errors.name}
                        </p>
                    </div>
                    <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby="contact-name-error"
                        className="w-full rounded-md border border-gray-400 p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor="contact-email" className="text-sm font-medium text-gray-800">
                            Email
                        </label>
                        <p id="contact-email-error" role="alert" aria-live="polite" className="text-xs text-red-500">
                            {errors.email}
                        </p>
                    </div>
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
                        aria-describedby="contact-email-error"
                        className="w-full rounded-md border border-gray-400 p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor="contact-message" className="text-sm font-medium text-gray-800">
                            Message
                        </label>
                        <p id="contact-message-error" role="alert" aria-live="polite" className="text-xs text-red-500">
                            {errors.message}
                        </p>
                    </div>
                    <textarea
                        id="contact-message"
                        name="message"
                        placeholder="Message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby="contact-message-error"
                        className="w-full resize-none rounded-md border border-gray-400 p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {status === "success" && (
                    <p role="status" aria-live="polite" className="text-xs text-green-600 text-right">
                        Message sent successfully
                    </p>
                )}
            </form>
        </div>
    )
}
export default ContactForm