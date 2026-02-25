// ================= IMPORTS =================
import { useEffect, useState } from "react";

/**
 * Hook encargado de manejar fecha y hora.
 * - hora automatica o manual
 * - formato 12/24h
 */

// ================= FUNCION EXPORTADA =================
// useDateTime: utilidad exportada; parametros: { autoTime, manualDate, is24hFormat }
export function useDateTime({ autoTime, manualDate, is24hFormat }) {
    // Hook: tick para forzar rerender del reloj automatico
    const [, setTick] = useState(0);

    // Hook: reloj automatico (sin setState sincrono en effect body)
    useEffect(() => {
        if (!autoTime) return;

        const interval = setInterval(() => {
            setTick((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [autoTime]);

    const currentDate = autoTime ? new Date() : manualDate;

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
        date: formatterDate.format(currentDate),
        time: formatterTime.format(currentDate),
        rawDate: currentDate,
    };
}
