import { useState, type ChangeEvent, type FormEvent } from "react"
import { ContactValidation, type ContactErrors } from "./ContactValidation.tsx"

type EstadoEnvio = "idle" | "enviando" | "enviado"

function ContactForm() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "", }) // Los datos del formulario parten con un objeto vacío de tipos string
    const [errors, setErrors] = useState<ContactErrors>({}) // Los errores parten de un objeto vacío de tipos string
    const [status, setStatus] = useState<EstadoEnvio>("idle") // Seteamos el estado del envío en "idle", osea quieto a la espera de datos

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target // Extraemos el nombre y el valor del campo que se está modificando
        setFormData(prev => ({ ...prev, [name]: value }))
        if (status === "enviado") {
            setStatus("idle")
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const validationErrors = ContactValidation(formData)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setStatus("idle")
            return
        }
        setErrors({})
        setStatus("enviando")
        await new Promise(resolve => setTimeout(resolve, 1500))
        setStatus("enviado")
        setFormData({ name: "", email: "", message: "" })
    }

    return (
        <div className="w-full md:w-[50%]">
            <form
                id="contact-form" // Identificación
                className="flex flex-col gap-3" // Estilos
                onSubmit={handleSubmit} // Comportamiento
                noValidate // Comportamiento
            >

                <div className="flex flex-col gap-1">

                    <div className="flex items-center justify-between">

                        <label
                            htmlFor="contact-name" // Accesibilidad / asociación
                            className="text-sm font-medium text-gray-800" // Estilos
                        >
                            Nombre
                        </label>

                        <p
                            id="contact-name-error" // Identificación
                            role="alert" // Accesibilidad
                            aria-live="polite" // Accesibilidad
                            className="text-xs text-red-500" // Estilos
                        >
                            {errors.name}
                        </p>

                    </div>

                    <input
                        id="contact-name" // Identificación
                        name="name" // Identificación
                        type="text" // Tipo de campo
                        placeholder="Nombre" // Texto / valor inicial
                        value={formData.name} // Valor
                        onChange={handleChange} // Comportamiento
                        autoComplete="name" // Accesibilidad: El navegador puede autocompletar el nombre del usuario con los datos de los formularios que se han llenado antes
                        aria-invalid={Boolean(errors.name)} // Accesibilidad: Indica si el campo tiene un error de validación en lectura de pantalla
                        aria-describedby="contact-name-error" // Accesibilidad: Asocia el campo con el mensaje de error correspondiente para que los lectores de pantalla puedan anunciarlo
                        className="w-full rounded-md border border-gray-400 p-3 text-base" // Estilos
                    />

                </div>

                <div className="flex flex-col gap-1">

                    <div className="flex items-center justify-between">

                        <label
                            htmlFor="contact-email" // Accesibilidad / asociación
                            className="text-sm font-medium text-gray-800" // Estilos
                        >
                            Correo
                        </label>

                        <p
                            id="contact-email-error" // Identificación
                            role="alert" // Accesibilidad
                            aria-live="polite" // Accesibilidad
                            className="text-xs text-red-500" // Estilos
                        >
                            {errors.email}
                        </p>

                    </div>

                    <input
                        id="contact-email" // Identificación
                        name="email" // Identificación
                        type="email" // Tipo de campo
                        placeholder="Correo electrónico" // Texto / valor inicial
                        value={formData.email} // Valor
                        onChange={handleChange} // Comportamiento
                        autoComplete="email" // Accesibilidad: El navegador puede autocompletar el correo electrónico del usuario con los datos de los formularios que se han llenado antes
                        inputMode="email" // Accesibilidad: Muestra el teclado de entrada adecuado para direcciones de correo electrónico
                        aria-invalid={Boolean(errors.email)} // Accesibilidad: Indica si el campo tiene un error de validación en lectura de pantalla
                        aria-describedby="contact-email-error" // Accesibilidad: Asocia el campo con el mensaje de error correspondiente para que los lectores de pantalla puedan anunciarlo
                        className="w-full rounded-md border border-gray-400 p-3 text-base" // Estilos
                    />

                </div>

                <div className="flex flex-col gap-1">

                    <div className="flex items-center justify-between">

                        <label
                            htmlFor="contact-message" // Accesibilidad / asociación
                            className="text-sm font-medium text-gray-800" // Estilos
                        >
                            Mensaje
                        </label>

                        <p
                            id="contact-message-error" // Identificación
                            role="alert" // Accesibilidad
                            aria-live="polite" // Accesibilidad
                            className="text-xs text-red-500" // Estilos
                        >
                            {errors.message}
                        </p>

                    </div>

                    <textarea
                        id="contact-message" // Identificación
                        name="message" // Identificación
                        placeholder="Mensaje" // Texto / configuración
                        rows={6} // Altura predeterminada
                        value={formData.message} // Valor
                        onChange={handleChange} // Comportamiento
                        aria-invalid={Boolean(errors.message)} // Accesibilidad: Indica si el campo tiene un error de validación en lectura de pantalla
                        aria-describedby="contact-message-error" // Accesibilidad: Asocia el campo con el mensaje de error correspondiente para que los lectores de pantalla puedan anunciarlo
                        className="w-full resize-none rounded-md border border-gray-400 p-3 text-base" // Estilos
                    />

                </div>

                {status === "enviado" && (

                    <p
                        role="status" // Accesibilidad
                        aria-live="polite" // Accesibilidad
                        className="text-xs text-green-600 text-right" // Estilos
                    >
                        Mensaje enviado correctamente
                    </p>

                )}

            </form>

        </div>

    )

}

export default ContactForm
