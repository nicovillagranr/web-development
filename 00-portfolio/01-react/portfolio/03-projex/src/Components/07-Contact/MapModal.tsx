// MapModal.jsx
import { useEffect, useRef } from "react"
import { CONTACT_MAP_URL } from "./contactConstants"

function MapModal({ onClose }) {
    // Referencias para controlar el foco dentro del modal.
    const modalRef = useRef(null)
    const closeButtonRef = useRef(null)

    useEffect(() => {
        // Guarda estado previo para restaurarlo al cerrar.
        const previousOverflow = document.body.style.overflow
        const previousActiveElement = document.activeElement

        // Bloquea scroll de la pagina mientras el modal esta abierto.
        document.body.style.overflow = "hidden"

        const handleKeyDown = (event) => {
            // Permite cerrar con tecla Escape.
            if (event.key === "Escape") {
                onClose()
                return
            }

            // Solo maneja navegacion por tabulacion.
            if (event.key !== "Tab" || !modalRef.current) {
                return
            }

            // Lista de elementos que pueden recibir foco dentro del modal.
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
            )

            if (focusableElements.length === 0) {
                event.preventDefault()
                return
            }

            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]
            const activeElement = document.activeElement

            // Si el foco sale, vuelve al primer elemento del modal.
            if (!modalRef.current.contains(activeElement)) {
                event.preventDefault()
                firstElement.focus()
                return
            }

            // Focus trap: rota entre primer y ultimo elemento.
            if (event.shiftKey && activeElement === firstElement) {
                event.preventDefault()
                lastElement.focus()
            } else if (!event.shiftKey && activeElement === lastElement) {
                event.preventDefault()
                firstElement.focus()
            }
        }

        // Activa listener global y envia foco inicial al boton de cierre.
        document.addEventListener("keydown", handleKeyDown)
        closeButtonRef.current?.focus()

        return () => {
            // Limpia listener y restaura scroll/foco previo.
            document.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = previousOverflow

            if (previousActiveElement instanceof HTMLElement) {
                previousActiveElement.focus()
            }
        }
    }, [onClose])

    return (
        // Overlay oscuro del modal.
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" role="dialog" aria-modal="true">
            {/* Contenedor principal del modal. */}
            <div ref={modalRef} tabIndex={-1} className="relative w-[90%] max-w-lg overflow-hidden rounded-lg bg-white">
                {/* Boton para cerrar el modal. */}
                <button ref={closeButtonRef} type="button" onClick={onClose} className="absolute right-3 top-3 text-4xl" aria-label="Close map">
                    &times;
                </button>

                {/* Mapa embebido de la ubicacion. */}
                <iframe
                    title="Location map"
                    src={CONTACT_MAP_URL}
                    className="h-80 w-full"
                    loading="lazy"
                />
            </div>
        </div>
    )
}
export default MapModal
