// ================= IMPORTS =================
import { useMemo, useRef } from "react";
import { WeatherIcon } from "../../../../weatherIcon.jsx";

const CAROUSEL = "flex gap-3 overflow-x-auto overflow-y-hidden snap-x snap-mandatory -mx-5 px-5 scroll-px-5 overscroll-x-contain touch-pan-x [-webkit-overflow-scrolling:touch] no-scrollbar";

// ================= FUNCION =================
function isSameHour(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate() &&
        a.getHours() === b.getHours()
    );
}

// ================= FUNCION =================
function HourlyForecast({ hours }) {
    const visibleHours = useMemo(() => (hours || []).slice(0, 24), [hours]);
    const scrollerRef = useRef(null);

    if (visibleHours.length === 0) return null;

    const now = new Date();

    return (
        <div className="px-4 mt-4">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-5">
                <h3 className="text-sm opacity-70 mb-4">Próximas 24 horas</h3>

                <div ref={scrollerRef} className={CAROUSEL}>
                    {visibleHours.map((hour) => {
                        const hourDate = new Date(hour.time);
                        const isNow = isSameHour(hourDate, now);

                        return (
                            <div key={hour.time} className="snap-start shrink-0">
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
function MiniHourlyCard({ hour, isNow }) {
    const formattedHour = isNow
        ? "Ahora"
        : new Date(hour.time).toLocaleTimeString("es-CL", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

    return (
        <div className="rounded-2xl px-3 flex flex-col items-center">
            <p className="text-sm">{formattedHour}</p>
            <WeatherIcon code={hour.code} isDay={hour.isDay} size={50} />
            <p className="text-lg font-light leading-none">{hour.temp}°</p>
        </div>
    );
}
export default HourlyForecast;
