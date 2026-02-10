// hooks/useDateTime.js
import { useEffect, useState } from "react";

const TIMEZONE = "America/Santiago";

export function useDateTime({ autoTime, manualDate }) {
    const [now, setNow] = useState(
        autoTime ? new Date() : manualDate
    );

    useEffect(() => {
        if (!autoTime) {
            setNow(manualDate);
            return;
        }

        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [autoTime, manualDate]);

    const formatterDate = new Intl.DateTimeFormat("es-CL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: TIMEZONE,
    });

    const formatterTime = new Intl.DateTimeFormat("es-CL", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: TIMEZONE,
    });

    return {
        date: formatterDate.format(now),
        time: formatterTime.format(now),
        rawDate: now, // 🔹 clave para editar luego
    };
}
