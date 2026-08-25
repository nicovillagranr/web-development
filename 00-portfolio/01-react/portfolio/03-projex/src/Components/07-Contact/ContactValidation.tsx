export function ContactValidation() {
    const validate = (formData) => {
        const errors = {}

        if (!formData.name.trim()) {
            errors.name = "El nombre es obligatorio"
        } else if (formData.name.length < 2) {
            errors.name = "El nombre debe tener al menos 2 caracteres"
        }

        if (!formData.email.trim()) {
            errors.email = "El correo es obligatorio"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "El correo no es válido"
        }

        if (!formData.message.trim()) {
            errors.message = "El mensaje es obligatorio"
        } else if (formData.message.length < 10) {
            errors.message = "El mensaje debe tener al menos 10 caracteres"
        }

        return errors
    }

    return { validate }
}
