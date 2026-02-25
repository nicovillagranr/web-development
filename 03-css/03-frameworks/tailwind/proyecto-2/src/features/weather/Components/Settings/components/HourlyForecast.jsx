// Este componente muestra el pronostico por hora para las proximas 24 horas. Se utiliza un carrusel horizontal para mostrar cada hora con su temperatura y un icono representativo del clima. El componente tambien resalta la hora actual con la etiqueta "Ahora".

// ================= IMPORTS =================
import { useMemo, useRef } from "react";
import { WeatherIcon } from "../../weatherIcon.jsx";


// ================= FUNCION =================
// isSameHour: helper/componente interno; parametros: a, b
function isSameHour(a, b) {
    // Render/retorno del bloque actual
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
    // Hook: memoizacion para evitar calculos en cada render
    const visibleHours = useMemo(() => (hours || []).slice(0, 24), [hours]);
    // Hook: referencia mutable para acceder a nodos/valores persistentes
    const scrollerRef = useRef(null);

    if (visibleHours.length === 0) return null;

    const now = new Date();

    // Render/retorno del bloque actual
    return (
        <div className="px-4 mt-4">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-5">
                <h3 className="text-sm opacity-70 mb-4">Proximas 24 horas</h3>

                <div ref={scrollerRef} className="flex gap-3 overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory -mx-5 px-5 scroll-px-5 overscroll-x-contain touch-pan-x [-webkit-overflow-scrolling:touch]">
                    {visibleHours.map((hour, i) => {
                        const hourDate = new Date(hour.time);
                        const isNow = isSameHour(hourDate, now);

                        // Render/retorno del bloque actual
                        return (
                            <div key={i} className="snap-start shrink-0">
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
    const formattedHour = isNow
        ? "Ahora"
        : new Date(hour.time).toLocaleTimeString("es-CL", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

    // Render/retorno del bloque actual
    return (
        <div className=" rounded-2xl px-3 text-center">
            <p className="text-md opacity-70">{formattedHour}</p>
            <div className="flex justify-center mb-2">
                <WeatherIcon code={hour.code} isDay={hour.isDay} size={50} />
            </div>
            <p className="text-lg font-light leading-none">{hour.temp}°</p>
        </div>
    );
}

export default HourlyForecast;
