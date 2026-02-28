// ================= IMPORTS =================
import { useEffect, useRef, useState } from "react";
import Header from "../header/Header.jsx";
import ScreenMain from "./screen_2/ScreenMain.jsx";
import ScreenRight from "./screen_3/ScreenRight.jsx";

const SCREEN_COUNT = 2;
const INITIAL_SCREEN_INDEX = 0;

// ================= COMPONENT =================
function HomeScreens({
    autoTime,
    manualDate,
    is24hFormat,
    weather,
    onOpenTimeSettings,
    onOpenWeatherSettings,
    onOpenInventorySettings,
    onOpenMusicSettings,
}) {
    const scrollerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(INITIAL_SCREEN_INDEX);

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

    // Render/retorno del bloque actual
    return (
        <div className="relative z-10 h-full flex flex-col">
            <Header
                autoTime={autoTime}
                manualDate={manualDate}
                is24hFormat={is24hFormat}
                weather={weather}
                showNav={false}
                className="shrink-0"
            />

            <div ref={scrollerRef} onScroll={handleScroll} className="flex-1 flex overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory">
                <section className="h-full w-full shrink-0 snap-center">
                    <ScreenMain
                        autoTime={autoTime}
                        manualDate={manualDate}
                        is24hFormat={is24hFormat}
                        weather={weather}
                        onOpenTimeSettings={onOpenTimeSettings}
                        onOpenWeatherSettings={onOpenWeatherSettings}
                        onOpenInventorySettings={onOpenInventorySettings}
                        onOpenMusicSettings={onOpenMusicSettings}
                    />
                </section>

                <section className="h-full w-full shrink-0 snap-center">
                    <ScreenRight />
                </section>
            </div>

            <div className="pointer-events-none absolute bottom-15 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {Array.from({ length: SCREEN_COUNT }, (_, index) => (
                    <span
                        key={index}
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${activeIndex === index ? "bg-white/95" : "bg-white/35"}`}
                    />
                ))}
            </div>
        </div>
    );
}
export default HomeScreens;
