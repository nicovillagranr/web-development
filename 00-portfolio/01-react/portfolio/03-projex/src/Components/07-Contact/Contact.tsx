// Hooks y tipos de React.
import {
    useState,
    useEffect,
    useRef,
    useCallback,
    type ChangeEvent,
    type FormEvent,
} from "react";

// Iconos
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";

// Componentes
import SectionTitle from "../SectionTitle/SectionTitle.tsx";

// 1. CONSTANTES
const CONTACT_ADDRESS =
    "Alonso de Córdova 1234, Vitacura, Santiago";

const CONTACT_NUMBER = "9 1234 5678";

const CONTACT_MAP_URL =
    "https://www.google.com/maps?q=Alonso%20de%20C%C3%B3rdova%201234%20Vitacura%20Santiago&output=embed";

// ============================================================
// 2. TIPOS DE TYPESCRIPT
// ============================================================

// Forma de los datos que el usuario escribe.
interface ContactFormData {
    name: string;
    lastName: string;
    email: string;
    message: string;
}

// Cada error es opcional: puede existir o no.
interface ContactErrors {
    name?: string;
    lastName?: string;
    email?: string;
    message?: string;
}

// Estados posibles del envío.
type EstadoEnvio = "inicial" | "enviando" | "enviado";

// Props de ContactInfo.
interface ContactInfoProps {
    onOpenMap: () => void;
}

// Props de MapModal.
interface MapModalProps {
    onClose: () => void;
}

// ============================================================
// 3. VALIDACIÓN DEL FORMULARIO
// ============================================================

function ContactValidation(data: ContactFormData): ContactErrors {
    // Creamos un objeto vacío para almacenar los errores.
    const errors: ContactErrors = {};

    // Normalizamos los datos antes de validarlos.
    const name = data.name.trim();
    const lastName = data.lastName.trim();
    const email = data.email.trim();
    const message = data.message.trim();

    // Validación del nombre.
    switch (true) {
        case !name:
            errors.name = "El nombre es obligatorio";
            break;

        case name.length < 2:
            errors.name =
                "El nombre debe tener al menos 2 caracteres";
            break;

        case name.length > 50:
            errors.name =
                "El nombre no puede superar los 50 caracteres";
            break;

        case !/^[\p{L}\s'-]+$/u.test(name):
            errors.name =
                "El nombre contiene caracteres no válidos";
            break;
    }

    // Validación del apellido.
    switch (true) {
        case !lastName:
            errors.lastName = "El apellido es obligatorio";
            break;

        case lastName.length < 2:
            errors.lastName =
                "El apellido debe tener al menos 2 caracteres";
            break;

        case lastName.length > 50:
            errors.lastName =
                "El apellido no puede superar los 50 caracteres";
            break;

        case !/^[\p{L}\s'-]+$/u.test(lastName):
            errors.lastName =
                "El apellido contiene caracteres no válidos";
            break;
    }

    // Validación del correo.
    switch (true) {
        case !email:
            errors.email = "El correo es obligatorio";
            break;

        case email.length > 254:
            errors.email = "El correo es demasiado largo";
            break;

        case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
            errors.email = "El correo no es válido";
            break;
    }

    // Validación del mensaje.
    switch (true) {
        case !message:
            errors.message = "El mensaje es obligatorio";
            break;

        case message.length < 10:
            errors.message =
                "El mensaje debe tener al menos 10 caracteres";
            break;

        case message.length > 1000:
            errors.message =
                "El mensaje no puede superar los 1000 caracteres";
            break;
    }

    // Devolvemos el objeto con los errores encontrados.
    return errors;
}

// ============================================================
// 4. COMPONENTE PRINCIPAL: Contact
// ============================================================

function Contact() {
    // Controla si el modal del mapa está abierto.
    const [isMapOpen, setIsMapOpen] = useState(false);

    // Abrimos el mapa.
    const handleOpenMap = useCallback(() => {
        setIsMapOpen(true);
    }, []);

    // Cerramos el mapa.
    const handleCloseMap = useCallback(() => {
        setIsMapOpen(false);
    }, []);

    return (
        <section className="w-full min-h-[75vh] py-5 bg-surface flex flex-col items-center justify-center">
            <SectionTitle className="text-3xl font-bold" title="Contáctanos" level={1} />

            <div className="w-full flex flex-col px-5 md:px-60 mt-10 md:flex-row gap-10">
                {/* Formulario de contacto */}
                <ContactForm />
                {/* Información de contacto y botones */}
                <ContactInfo onOpenMap={handleOpenMap} />
            </div>

            {/* El modal solo se renderiza si el mapa está abierto */}
            {isMapOpen && (
                <MapModal onClose={handleCloseMap} />
            )}
        </section>
    );
}

// ============================================================
// 5. FORMULARIO: ContactForm
// ============================================================

function ContactForm() {
    // Datos controlados por React.
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        message: "",
        lastName: "",
    });

    // Errores producidos por la validación.
    const [errors, setErrors] = useState<ContactErrors>({});

    // Estado actual del envío.
    const [status, setStatus] = useState<EstadoEnvio>("inicial");

    // Se ejecuta cuando cambia cualquier campo.
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Extraemos el nombre y el valor del campo modificado.
        const { name, value } = e.target;

        // Conservamos los demás campos y actualizamos el modificado.
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Si el mensaje ya se había enviado, volvemos al estado inicial.
        if (status === "enviado") {
            setStatus("inicial");
        }
    };

    // Se ejecuta al enviar el formulario.
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        // Evita que el navegador recargue la página.
        e.preventDefault();

        // 0. PENDIENTE: guard contra el doble envío (lo escribes tú).

        // 1. Validamos los datos actuales.
        const validationErrors = ContactValidation(formData);

        // 2. Si hay errores, los mostramos y detenemos el flujo.
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setStatus("inicial");
            return;
        }

        // 3. Si todo está correcto, limpiamos los errores.
        setErrors({});

        // 4. Indicamos que el envío está en curso.
        setStatus("enviando");

        // 5. Simulamos una espera de 1,5 segundos.
        // En una aplicación real aquí iría la petición a una API.
        await new Promise<void>((resolve) => {
            setTimeout(resolve, 1500);
        });

        // 6. Simulamos que el envío terminó correctamente.
        setStatus("enviado");

        // 7. Limpiamos los campos.
        setFormData({
            name: "",
            email: "",
            message: "",
            lastName: "",
        });
    };

    return (
        <div className="w-full md:w-[50%]">

            <form id="contact-form" className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>

                {/* ---------------- NOMBRE ---------------- */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor="contact-name" className="text-sm font-medium text-gray-800">Nombre</label>
                        <p id="contact-name-error" role="alert" aria-live="polite" className="text-xs text-red-500">
                            {errors.name}
                        </p>
                    </div>

                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby="contact-name-error"
                        className="w-full rounded-md border border-gray-400 p-3 text-base"
                    />
                </div>

                {/* ---------------- APELLIDO ---------------- */}

                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor="contact-lastname" className="text-sm font-medium text-gray-800">
                            Apellido
                        </label>
                        <p id="contact-lastname-error" role="alert" aria-live="polite" className="text-xs text-red-500">
                            {errors.lastName}
                        </p>
                    </div>

                    <input
                        id="contact-lastname"
                        name="lastName"
                        type="text"
                        placeholder="Apellido"
                        value={formData.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                        aria-invalid={Boolean(errors.lastName)}
                        aria-describedby="contact-lastname-error"
                        className="w-full rounded-md border border-gray-400 p-3 text-base"
                    />
                </div>

                {/* ---------------- CORREO ---------------- */}

                <div className="flex flex-col gap-1">

                    <div className="flex items-center justify-between">
                        <label htmlFor="contact-email" className="text-sm font-medium text-gray-800">
                            Correo
                        </label>
                        <p id="contact-email-error" role="alert" aria-live="polite" className="text-xs text-red-500">
                            {errors.email}
                        </p>
                    </div>

                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        inputMode="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby="contact-email-error"
                        className="w-full rounded-md border border-gray-400 p-3 text-base"
                    />

                </div>

                {/* ---------------- MENSAJE ---------------- */}

                <div className="flex flex-col gap-1">

                    <div className="flex items-center justify-between">

                        <label htmlFor="contact-message" className="text-sm font-medium text-gray-800">
                            Mensaje
                        </label>

                        <p
                            id="contact-message-error"
                            role="alert"
                            aria-live="polite"
                            className="text-xs text-red-500"
                        >
                            {errors.message}
                        </p>

                    </div>

                    <textarea
                        id="contact-message"
                        name="message"
                        placeholder="Mensaje"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby="contact-message-error"
                        className="w-full resize-none rounded-md border border-gray-400 p-3 text-base"
                    />

                </div>

                {/* -------- ESTADO DEL ENVÍO -------- */}

                {status === "enviando" && (
                    <p
                        role="status"
                        aria-live="polite"
                        className="text-xs text-gray-600 text-right"
                    >
                        Enviando mensaje...
                    </p>
                )}

                {status === "enviado" && (
                    <p
                        role="status"
                        aria-live="polite"
                        className="text-xs text-green-600 text-right"
                    >
                        Mensaje enviado correctamente
                    </p>
                )}

            </form>

        </div>
    );
}

// ============================================================
// 6. INFORMACIÓN: ContactInfo
// ============================================================

function ContactInfo({ onOpenMap }: ContactInfoProps) {
    return (
        <section className="w-full md:w-[50%] flex flex-col gap-6 md:justify-between">

            <h3 className="text-2xl">
                Información
            </h3>

            <p className="text-xl font-light">
                ¿Tienes un proyecto en mente o una idea que quieres validar?
                Conversemos y veamos cómo convertirla en un producto digital sólido.
            </p>

            <div className="flex items-center gap-2">

                <FaMapMarkerAlt
                    className="w-5 h-5"
                    aria-hidden="true"
                />

                <span className="text-lg">
                    {CONTACT_ADDRESS}
                </span>

            </div>

            <div className="flex items-center gap-2">

                <FaPhone
                    className="w-5 h-5"
                    aria-hidden="true"
                />

                <span className="text-lg">
                    (+56) {CONTACT_NUMBER}
                </span>

            </div>

            <div className="flex flex-row gap-5">

                {/* Envía el formulario aunque el botón esté fuera de él: atributo 'form' */}
                <button
                    form="contact-form"
                    type="submit"
                    className="w-full py-3 border-2 border-primary bg-primary text-white font-bold rounded-md hover:bg-transparent hover:text-black transition text-sm"
                >
                    Enviar mensaje
                </button>

                {/* Solicita al componente padre que abra el mapa */}
                <button
                    type="button"
                    onClick={onOpenMap}
                    className="w-full py-3 border-2 border-primary text-black font-bold rounded-md hover:bg-primary hover:text-white transition text-sm"
                >
                    Ver mapa
                </button>

            </div>

        </section>
    );
}

// ============================================================
// 7. MODAL: MapModal
// ============================================================

function MapModal({ onClose }: MapModalProps) {
    // Referencias a elementos del DOM.
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Guardamos el estado previo de la página.
        const previousOverflow = document.body.style.overflow;
        const previousActiveElement = document.activeElement;

        // Bloqueamos el scroll de fondo.
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            // Escape cierra el modal.
            if (event.key === "Escape") {
                onClose();
                return;
            }

            // Solo controlamos la navegación por Tab.
            if (event.key !== "Tab" || !modalRef.current) {
                return;
            }

            // Buscamos los elementos enfocables del modal.
            const focusableElements =
                modalRef.current.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
                );

            if (focusableElements.length === 0) {
                event.preventDefault();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement =
                focusableElements[focusableElements.length - 1];

            const activeElement = document.activeElement;

            // Si el foco sale del modal, vuelve al primero.
            if (!modalRef.current.contains(activeElement)) {
                event.preventDefault();
                firstElement.focus();
                return;
            }

            // Shift + Tab en el primero: saltamos al último.
            if (
                event.shiftKey &&
                activeElement === firstElement
            ) {
                event.preventDefault();
                lastElement.focus();
            } else if (
                !event.shiftKey &&
                activeElement === lastElement
            ) {
                // Tab en el último: volvemos al primero.
                event.preventDefault();
                firstElement.focus();
            }
        };

        // Escuchamos el teclado y enfocamos el botón de cierre.
        document.addEventListener("keydown", handleKeyDown);
        closeButtonRef.current?.focus();

        // Limpieza al desmontar el modal.
        return () => {
            document.removeEventListener("keydown", handleKeyDown);

            // Restauramos el scroll.
            document.body.style.overflow = previousOverflow;

            // Devolvemos el foco al elemento anterior.
            if (previousActiveElement instanceof HTMLElement) {
                previousActiveElement.focus();
            }
        };
    }, [onClose]);

    return (
        // Fondo oscuro.
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            role="dialog"
            aria-modal="true"
            aria-label="Mapa de ubicación"
            onMouseDown={(event) => {
                // Cierra si el usuario pulsa fuera del panel.
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >

            {/* Panel principal del modal */}
            <div
                ref={modalRef}
                tabIndex={-1}
                className="relative w-[90%] max-w-lg overflow-hidden rounded-lg bg-white"
            >

                {/* Botón de cierre */}
                <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    className="absolute right-3 top-3 z-10 text-4xl"
                    aria-label="Cerrar mapa"
                >
                    &times;
                </button>

                {/* Mapa embebido */}
                <iframe
                    title="Mapa de ubicación"
                    src={CONTACT_MAP_URL}
                    className="h-80 w-full"
                    loading="lazy"
                />

            </div>

        </div>
    );
}

// ============================================================
// EXPORTACIÓN
// ============================================================

export default Contact;
