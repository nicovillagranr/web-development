import { useEffect, useState } from "react";

/**
 * Zonas horarias válidas de respaldo.
 * Nunca usar strings inventados como "local".
 */
const DEFAULT_TIMEZONE = "America/Santiago";

/**
 * Hook encargado de manejar fecha y hora.
 *
 * Decide:
 * - si la hora es automática o manual
 * - cómo formatearla
 * - cuándo actualizarla
 */
export function useDateTime({ autoTime, manualDate, is24hFormat, timeZone }) {

    /**
     * now representa la fecha/hora base que se va a mostrar.
     */
    const [now, setNow] = useState(
        autoTime ? new Date() : manualDate
    );

    /**
     * Motor del reloj:
     * - automático → actualiza cada segundo
     */
    useEffect(() => {
        if (!autoTime) return;

        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [autoTime]);

    /**
     * Sincronización manual:
     * - cuando autoTime está apagado
     * - reflejamos manualDate directamente
     */
    useEffect(() => {
        if (autoTime) return;
        setNow(manualDate);
    }, [autoTime, manualDate]);

    /**
     * Validación defensiva de la zona horaria.
     * Intl lanza excepción si es inválida.
     */
    let safeTimeZone = DEFAULT_TIMEZONE;

    try {
        Intl.DateTimeFormat("en-US", { timeZone }).format();
        safeTimeZone = timeZone;
    } catch {
        // fallback silencioso
    }

    // Formateador de fecha
    const formatterDate = new Intl.DateTimeFormat("es-CL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: safeTimeZone,
    });

    // Formateador de hora
    const formatterTime = new Intl.DateTimeFormat("es-CL", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !is24hFormat,
        timeZone: safeTimeZone,
    });

    return {
        date: formatterDate.format(now),
        time: formatterTime.format(now),
        rawDate: now,
    };
}
