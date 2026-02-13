import { useEffect, useState } from "react";

/**
 * Estado base del sistema.
 * NUNCA usar valores inválidos aquí.
 */
const DEFAULT_SETTINGS = {
    autoTime: true,
    is24hFormat: false,

    /**
     * Fecha manual serializada.
     * Siempre se guarda como ISO string.
     */
    manualDate: new Date().toISOString(),
};

/**
 * Hook centralizado de configuración del sistema.
 *
 * Es la ÚNICA fuente de verdad para:
 * - formato horario
 * - hora automática / manual
 * - fecha manual
 *
 * NOTA:
 * - No maneja lógica de reloj
 * - No formatea fecha u hora
 * - Solo guarda estado persistente del sistema
 */
export function useSettings() {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem("settings");
        if (!saved) return DEFAULT_SETTINGS;

        try {
            const parsed = JSON.parse(saved);

            /**
             * Merge defensivo:
             * - permite agregar settings nuevos en el futuro
             * - evita romper versiones anteriores
             */
            return { ...DEFAULT_SETTINGS, ...parsed };
        } catch {
            return DEFAULT_SETTINGS;
        }
    });

    /**
     * Persistencia automática.
     * Cada cambio se guarda inmediatamente en localStorage.
     */
    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify(settings));
    }, [settings]);

    return {
        autoTime: settings.autoTime,
        is24hFormat: settings.is24hFormat,

        /**
         * SIEMPRE exponemos manualDate como Date
         * para que el resto del sistema no piense en serialización.
         */
        manualDate: new Date(settings.manualDate),

        /**
         * Setters públicos.
         * Nunca exponen la estructura interna del estado.
         */
        setAutoTime: (value) =>
            setSettings(s => ({ ...s, autoTime: value })),

        setIs24hFormat: (value) =>
            setSettings(s => ({ ...s, is24hFormat: value })),

        /**
         * SIEMPRE recibimos Date
         * y serializamos aquí.
         */
        setManualDate: (date) =>
            setSettings(s => ({
                ...s,
                manualDate: date.toISOString(),
            })),
    };
}
