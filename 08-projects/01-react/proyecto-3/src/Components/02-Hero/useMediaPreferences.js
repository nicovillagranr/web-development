import { useEffect, useState } from "react"

// Detecta reduce-motion del SO y "Ahorrar datos" del dispositivo
export function useMediaPreferences() {
    const [shouldUseStaticHero, setShouldUseStaticHero] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

        // Connection API: detecta si el usuario tiene "Ahorrar datos" activado en el SO
        // Fallbacks para diferentes navegadores (cada uno usa prefijo diferente)
        // - navigator.connection (Chrome, Edge, Opera)
        // - navigator.mozConnection (Firefox con prefijo moz)
        // - navigator.webkitConnection (Safari con prefijo webkit)
        // Si ninguno existe, connection será undefined pero el ?. evita errores
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

        const updatePreferences = () => {
            // Si tiene reduce-motion O saveData activo, usar imagen estática
            // saveData = true cuando usuario tiene "Ahorrar datos" en Android/iOS/Chrome
            setShouldUseStaticHero(mediaQuery.matches || Boolean(connection?.saveData))
        }

        updatePreferences()
        // Listener para cambios en tiempo real (ej: usuario activa reduce-motion mientras navega)
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", updatePreferences)
        } else {
            mediaQuery.addListener(updatePreferences)
        }
        connection?.addEventListener?.("change", updatePreferences)

        // Cleanup: remover listeners para evitar memory leaks
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", updatePreferences)
            } else {
                mediaQuery.removeListener(updatePreferences)
            }
            connection?.removeEventListener?.("change", updatePreferences)
        }
    }, [])

    return shouldUseStaticHero
}
