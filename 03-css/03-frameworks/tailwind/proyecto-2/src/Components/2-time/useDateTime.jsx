import { useEffect, useState } from "react";

/**
 * Hook encargado de manejar fecha y hora.
 *
 * Decide:
 * - si la hora es automática o manual
 * - cómo formatearla
 * - cuándo actualizarla
 */
export function useDateTime({ autoTime, manualDate, is24hFormat }) {

    /**
     * now representa la fecha/hora base que se va a mostrar.
     */
    const [now, setNow] = useState(
        autoTime ? new Date() : manualDate
    );

    /**
     * Motor del reloj automático.
     */
    useEffect(() => {
        if (!autoTime) return;

        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [autoTime]);

    /**
     * Sincronización manual directa.
     */
    useEffect(() => {
        if (autoTime) return;
        setNow(manualDate);
    }, [autoTime, manualDate]);

    const formatterDate = new Intl.DateTimeFormat("es-CL", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    const formatterTime = new Intl.DateTimeFormat("es-CL", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !is24hFormat,
    });

    return {
        date: formatterDate.format(now),
        time: formatterTime.format(now),
        rawDate: now,
    };
}
