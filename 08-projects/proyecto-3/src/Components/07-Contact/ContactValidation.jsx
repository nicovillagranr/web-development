export function ContactValidation() {
    const validate = (formData) => {
        const errors = {}

        if (!formData.name.trim()) {
            errors.name = "Name is required"
        } else if (formData.name.length < 2) {
            errors.name = "Name must be at least 2 characters long"
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Invalid email address"
        }

        if (!formData.message.trim()) {
            errors.message = "Message is required"
        } else if (formData.message.length < 10) {
            errors.message = "Message must be at least 10 characters long"
        }

        return errors
    }

    return { validate }
}
