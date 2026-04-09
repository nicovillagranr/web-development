// ================= IMPORTS =================
import { useMemo, useRef } from "react";
import { WeatherIcon } from "../../../../weatherIcon.jsx";
import s from "./HourlyForecast.module.css";

// ================= FUNCION =================
// isSameHour: helper/componente interno; parametros: a, b
// Compara dos fechas al nivel de hora calendario.
function isSameHour(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate() &&
        a.getHours() === b.getHours()
    );
}

// ================= FUNCION =================
// HourlyForecast: helper/componente interno; parametros: { hours }
function HourlyForecast({ hours }) {
    // Limitamos visualmente a 24 horas por consistencia de UI.
    const visibleHours = useMemo(() => (hours || []).slice(0, 24), [hours]);

    // Referencia reservada para mejoras de scroll/programmatic focus.
    const scrollerRef = useRef(null);

    // Guard clause sin datos.
    if (visibleHours.length === 0) return null;

    const now = new Date();

    return (
        <div className={s.hourly}>
            <div className={s.hourly__card}>
                {/* Titulo de seccion */}
                <h3 className={s.hourly__title}>Próximas 24 horas</h3>

                {/* Carrusel horizontal de horas */}
                <div ref={scrollerRef} className={`${s.hourly__carousel} no-scrollbar`}>

                    {visibleHours.map((hour) => {
                        const hourDate = new Date(hour.time);
                        const isNow = isSameHour(hourDate, now);

                        return (
                            <div key={hour.time} className={s["hourly__snap-item"]}>
                                <MiniHourlyCard hour={hour} isNow={isNow} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ================= FUNCION =================
// MiniHourlyCard: helper/componente interno; parametros: { hour, isNow }
function MiniHourlyCard({ hour, isNow }) {
    // Si coincide con hora actual mostramos etiqueta "Ahora".
    const formattedHour = isNow
        ? "Ahora"
        : new Date(hour.time).toLocaleTimeString("es-CL", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

    return (
        <div className={s["hourly__mini-card"]}>
            {/* Hora */}
            <p className={s["hourly__mini-card-hour"]}>{formattedHour}</p>

            {/* Icono meteo de esa hora */}
            <WeatherIcon code={hour.code} isDay={hour.isDay} size={50} />

            {/* Temperatura puntual */}
            <p className={s["hourly__mini-card-temp"]}>{hour.temp}°</p>
        </div>
    );
}
export default HourlyForecast;