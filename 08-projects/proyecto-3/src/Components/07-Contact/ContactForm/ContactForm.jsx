// Import hooks and validation helper
import { useState } from "react"
import { ContactValidation } from "../ContactValidation.jsx"

// Importamos estilos
import "../../../assets/styles/App.css"
import "./ContactForm.css"

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
        <section className="contact-form">
            <form
                className="contact-form__form"
                onSubmit={handleSubmit}
                noValidate
                id="contact-form"
            >
                <div className="contact-form__group">
                    <label htmlFor="contact-name" className="contact-form__label">
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
                        className="contact-form__input"
                    />
                    {errors.name && (
                        <p id="contact-name-error" role="alert" className="contact-form__error">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="contact-form__group">
                    <label htmlFor="contact-email" className="contact-form__label">
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
                        className="contact-form__input"
                    />
                    {errors.email && (
                        <p id="contact-email-error" role="alert" className="contact-form__error">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="contact-form__group">
                    <label htmlFor="contact-message" className="contact-form__label">
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
                        className="contact-form__textarea"
                    />
                    {errors.message && (
                        <p id="contact-message-error" role="alert" className="contact-form__error">
                            {errors.message}
                        </p>
                    )}
                </div>

                {status === "success" && (
                    <p role="status" aria-live="polite" className="contact-form__success">
                        Message sent successfully
                    </p>
                )}
            </form>
        </section>
    )
}

export default ContactForm