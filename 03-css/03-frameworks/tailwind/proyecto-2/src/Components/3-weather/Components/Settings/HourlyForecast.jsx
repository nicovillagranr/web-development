// Este componente muestra el pronóstico por hora para las próximas 24 horas. Se utiliza un carrusel horizontal para mostrar cada hora con su temperatura y un ícono representativo del clima. El componente también resalta la hora actual con la etiqueta "Ahora".

import { useMemo, useRef } from "react";
import { WeatherIcon } from "../weatherIcon";

function isSameHour(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate() &&
        a.getHours() === b.getHours()
    );
}

function HourlyForecast({ hours }) {
    if (!hours || hours.length === 0) return null;

    const visibleHours = useMemo(() => hours.slice(0, 24), [hours]);
    const scrollerRef = useRef(null);

    const now = new Date();

    return (
        <div className="px-4 mt-4">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-5">
                <h3 className="text-sm opacity-70 mb-4">Próximas 24 horas</h3>

                <div ref={scrollerRef} className="flex gap-3 overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory -mx-5 px-5 scroll-px-5 overscroll-x-contain touch-pan-x [-webkit-overflow-scrolling:touch]">
                    {visibleHours.map((hour, i) => {
                        const hourDate = new Date(hour.time);
                        const isNow = isSameHour(hourDate, now);

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

function MiniHourlyCard({ hour, isNow }) {
    const formattedHour = isNow
        ? "Ahora"
        : new Date(hour.time).toLocaleTimeString("es-CL", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

    return (
        <div className=" rounded-2xl px-3 text-center">
            <p className="text-md opacity-70">{formattedHour}</p>
            <div className="flex justify-center mb-2">
                <WeatherIcon code={hour.code} size={50} />
            </div>
            <p className="text-lg font-light leading-none">{hour.temp}°</p>
        </div>
    );
}

export default HourlyForecast;