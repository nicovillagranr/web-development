// 1: Definimos la estructura de los datos del formulario
interface ContactFormData {
    name: string,
    email: string,
    message: string
}

// 2: Definimos la estructura de un eventual error/errores del formulario
interface ContactErrors {
    name?: string,
    email?: string,
    message?: string
}

export function ContactValidation(data: ContactFormData) {
    const errors: ContactErrors = {};

    // Validación del Nombre
    switch (true) {
        case !data.name.trim(): // Verifica si el nombre está vacío o solo contiene espacios
            errors.name = "El nombre es obligatorio";
            break;
        case data.name.length < 2: // Verifica si el nombre tiene menos de 2 caracteres
            errors.name = "El nombre debe tener al menos 2 caracteres";
            break;
    }

    // Validación del Email
    switch (true) {
        case !data.email.trim(): // Verifica si el correo está vacío
            errors.email = "El correo es obligatorio";
            break;
        case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email): // Valida el formato del correo mediante una expresión regular
            errors.email = "El correo no es válido";
            break;
    }

    // Validación del Mensaje
    switch (true) {
        case !data.message.trim(): // Verifica si el mensaje está vacío
            errors.message = "El mensaje es obligatorio";
            break;
        case data.message.length < 10: // Verifica si el mensaje es demasiado corto (menos de 10 caracteres)
            errors.message = "El mensaje debe tener al menos 10 caracteres";
            break;
    }

    return errors;
}
