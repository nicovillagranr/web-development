// ================= CONTEXTO MODULO =================
// Contenedor principal de pantallas Home.
// Gestiona scroll horizontal, indice activo y dots de navegacion.
// ================= IMPORTS =================
import { useEffect, useRef, useState } from "react";
import { useDateTime } from "@features/time/hooks/useDateTime.jsx";
import TopBar from "@screen1/header/TopBar";
import Screen1 from "@screen1/Screen1.jsx";
import Screen2 from "@screen2/Screen2.jsx";

const SCREEN_COUNT = 2;
const INITIAL_SCREEN_INDEX = 0;

// ================= COMPONENT =================
export function Screens({
    autoTime,
    manualDate,
    is24hFormat,
    weather,
    onOpenTimeSettings,
    onOpenWeatherSettings,
    onOpenRecipeSettings,
    onOpenSpotifySettings,
}) {
    const scrollerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(INITIAL_SCREEN_INDEX);
    const { date, time } = useDateTime({ autoTime, manualDate, is24hFormat });

    useEffect(() => {
        const node = scrollerRef.current;
        if (!node) return;

        const id = requestAnimationFrame(() => {
            node.scrollTo({
                left: node.clientWidth * INITIAL_SCREEN_INDEX,
                behavior: "auto",
            });
            setActiveIndex(INITIAL_SCREEN_INDEX);
        });

        return () => cancelAnimationFrame(id);
    }, []);

    useEffect(() => {
        function handleResize() {
            const node = scrollerRef.current;
            if (!node) return;
            node.scrollTo({
                left: node.clientWidth * activeIndex,
                behavior: "auto",
            });
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activeIndex]);

    const handleScroll = (event) => {
        const node = event.currentTarget;
        if (!node.clientWidth) return;

        const rawIndex = Math.round(node.scrollLeft / node.clientWidth);
        const clampedIndex = Math.max(0, Math.min(SCREEN_COUNT - 1, rawIndex));
        if (clampedIndex !== activeIndex) {
            setActiveIndex(clampedIndex);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <header className="w-full flex flex-col px-4 py-2 gap-2">
                <TopBar time={time} date={date} weather={weather} />
            </header>

            <div
                ref={scrollerRef}
                onScroll={handleScroll}
                className="flex-1 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar"
            >
                <section className="h-full w-full shrink-0 snap-center">
                    <Screen1
                        time={time}
                        weather={weather}
                        onOpenTimeSettings={onOpenTimeSettings}
                        onOpenWeatherSettings={onOpenWeatherSettings}
                        onOpenRecipeSettings={onOpenRecipeSettings}
                        onOpenSpotifySettings={onOpenSpotifySettings}
                    />
                </section>

                <section className="h-full w-full shrink-0 snap-center">
                    <Screen2 />
                </section>
            </div>

            <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {Array.from({ length: SCREEN_COUNT }, (_, index) => (
                    <span
                        key={index}
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${activeIndex === index ? "bg-white" : "bg-white/25"}`}
                    />
                ))}
            </div>
        </div>
    );
}
