import { useEffect, useState } from "react";

/**
 * Estado base del sistema.
 * NUNCA usar valores inválidos aquí.
 */
const DEFAULT_SETTINGS = {
    autoTime: true,
    is24hFormat: false,
    manualDate: new Date().toISOString(),
    timeZone: "America/Santiago",
};

/**
 * Hook centralizado de configuración del sistema.
 *
 * Es la ÚNICA fuente de verdad para:
 * - formato horario
 * - hora automática / manual
 * - fecha manual
 * - zona horaria
 */
export function useSettings() {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem("settings");
        if (!saved) return DEFAULT_SETTINGS;

        try {
            const parsed = JSON.parse(saved);
            return { ...DEFAULT_SETTINGS, ...parsed };
        } catch {
            return DEFAULT_SETTINGS;
        }
    });

    /**
     * Persistencia automática.
     */
    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify(settings));
    }, [settings]);

    return {
        autoTime: settings.autoTime,
        is24hFormat: settings.is24hFormat,

        /**
         * SIEMPRE exponemos manualDate como Date
         */
        manualDate: new Date(settings.manualDate),

        timeZone: settings.timeZone,

        setAutoTime: (value) =>
            setSettings(s => ({ ...s, autoTime: value })),

        setIs24hFormat: (value) =>
            setSettings(s => ({ ...s, is24hFormat: value })),

        /**
         * SIEMPRE recibimos Date y serializamos aquí
         */
        setManualDate: (date) =>
            setSettings(s => ({ ...s, manualDate: date.toISOString() })),

        setTimeZone: (zone) =>
            setSettings(s => ({ ...s, timeZone: zone })),
    };
}
