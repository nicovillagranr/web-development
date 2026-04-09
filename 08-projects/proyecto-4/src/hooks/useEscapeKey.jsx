// ================= CONTEXTO MODULO =================
// Hook reutilizable para cerrar paneles con Escape.
// Usado por todos los settings panels (Time, Weather, Recipe, Spotify).
// ================= IMPORTS =================
import { useEffect } from "react";

// ================= HOOK =================
export function useEscapeKey(isActive, callback) {
    useEffect(() => {
        if (!isActive) return;
        const handler = (e) => {
            if (e.key === "Escape") callback();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isActive, callback]);
}
