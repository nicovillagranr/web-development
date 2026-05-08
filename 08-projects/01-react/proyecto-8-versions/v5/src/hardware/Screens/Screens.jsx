// ================= CONTEXTO MODULO =================
// Contenedor principal de pantallas Home.
// Gestiona scroll horizontal, indice activo y dots de navegacion.
// ================= IMPORTS =================
import { useEffect, useRef, useState } from "react";
import { useDateTime } from "@features/time/hooks/useDateTime.jsx";
import TopBar from "@screen1/header/TopBar";
import Screen1 from "@screen1/Screen1.jsx";
import Screen2 from "@screen2/Screen2.jsx";
import s from "./Screens.module.css";

// Cantidad total de pantallas horizontales.
const SCREEN_COUNT = 2;
// Pantalla inicial al montar (screen_1).
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
    // Referencia al contenedor scrollable horizontal.
    const scrollerRef = useRef(null);
    // Indice activo para estado visual (dots) y reposicionamientos.
    const [activeIndex, setActiveIndex] = useState(INITIAL_SCREEN_INDEX);
    // Unica instancia de useDateTime para toda la vista home.
    const { date, time } = useDateTime({ autoTime, manualDate, is24hFormat });

    // Al montar:
    // - posiciona el scroll en la pantalla inicial
    // - sincroniza el indice activo
    // requestAnimationFrame evita medir clientWidth antes del primer paint.
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

    // Cuando cambia el tamano de ventana:
    // - mantiene visible la pantalla actualmente activa
    // - evita que el carrusel "salte" a una posicion incorrecta
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

    // Deriva indice activo en base al scroll horizontal actual.
    // Se usa para actualizar dots y estado interno de navegacion.
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
        <div className={s.screens}>
            <header className={s.screens__header}>
                <TopBar time={time} date={date} weather={weather} />
            </header>

            <div ref={scrollerRef} onScroll={handleScroll} className={`${s.screens__scroller} no-scrollbar`}>
                <section className={s.screens__section}>
                    <Screen1
                        time={time}
                        weather={weather}
                        onOpenTimeSettings={onOpenTimeSettings}
                        onOpenWeatherSettings={onOpenWeatherSettings}
                        onOpenRecipeSettings={onOpenRecipeSettings}
                        onOpenSpotifySettings={onOpenSpotifySettings}
                    />
                </section>

                {/* Pantalla secundaria (modulo energia/consola) */}
                <section className={s.screens__section}>
                    <Screen2 />
                </section>
            </div>


            <div className={s.screens__dots}>
                {Array.from({ length: SCREEN_COUNT }, (_, index) => (
                    <span key={index}
                        className={`${s.screens__dot} ${activeIndex === index ? s["screens__dot--active"] : s["screens__dot--inactive"]}`} />
                ))}
            </div>

        </div>
    );
}