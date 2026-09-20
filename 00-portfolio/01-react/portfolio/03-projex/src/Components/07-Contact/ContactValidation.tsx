export interface ContactFormData {
    name: string
    email: string
    message: string
}

export interface ContactErrors {
    name?: string
    email?: string
    message?: string
}

export function ContactValidation(data: ContactFormData): ContactErrors {
    const errors: ContactErrors = {}

    // Normalizamos los datos antes de validarlos
    const name = data.name.trim()
    const email = data.email.trim()
    const message = data.message.trim()

    // Validación del Nombre
    switch (true) {
        case !name:
            errors.name = "El nombre es obligatorio"
            break

        case name.length < 2:
            errors.name = "El nombre debe tener al menos 2 caracteres"
            break

        case name.length > 50:
            errors.name = "El nombre no puede superar los 50 caracteres"
            break

        case !/^[\p{L}\s'-]+$/u.test(name):
            errors.name = "El nombre contiene caracteres no válidos"
            break
    }

    // Validación del Email
    switch (true) {
        case !email:
            errors.email = "El correo es obligatorio"
            break

        case email.length > 254:
            errors.email = "El correo es demasiado largo"
            break

        case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
            errors.email = "El correo no es válido"
            break
    }

    // Validación del Mensaje
    switch (true) {
        case !message:
            errors.message = "El mensaje es obligatorio"
            break

        case message.length < 10:
            errors.message = "El mensaje debe tener al menos 10 caracteres"
            break

        case message.length > 1000:
            errors.message = "El mensaje no puede superar los 1000 caracteres"
            break
    }

    return errors
}
