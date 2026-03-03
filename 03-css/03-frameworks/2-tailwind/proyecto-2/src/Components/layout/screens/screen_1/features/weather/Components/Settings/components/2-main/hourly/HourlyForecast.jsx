// ================= IMPORTS =================
import { useMemo, useRef } from "react";
import { WeatherIcon } from "../../../../weatherIcon.jsx";

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
        <div className="px-4 mt-4">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-5">
                {/* Titulo de seccion */}
                <h3 className="text-sm opacity-70 mb-4">Proximas 24 horas</h3>

                {/* Carrusel horizontal de horas */}
                <div
                    ref={scrollerRef}
                    className="flex gap-3 overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory -mx-5 px-5 scroll-px-5 overscroll-x-contain touch-pan-x [-webkit-overflow-scrolling:touch]"
                >
                    {visibleHours.map((hour, index) => {
                        const hourDate = new Date(hour.time);
                        const isNow = isSameHour(hourDate, now);

                        return (
                            <div key={index} className="snap-start shrink-0">
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
        <div className="rounded-2xl px-3 text-center">
            {/* Hora */}
            <p className="text-md">{formattedHour}</p>

            {/* Icono meteo de esa hora */}
            <div className="flex justify-center mb-2">
                <WeatherIcon code={hour.code} isDay={hour.isDay} size={50} />
            </div>

            {/* Temperatura puntual */}
            <p className="text-lg font-light leading-none">{hour.temp}°</p>
        </div>
    );
}

export default HourlyForecast;
