// Con este hook obtenemos la fecha y hora actual Santiago de Chile

import { useEffect, useState } from "react";

const TIMEZONE = "America/Santiago";

export function useDateTime() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
    };
}
