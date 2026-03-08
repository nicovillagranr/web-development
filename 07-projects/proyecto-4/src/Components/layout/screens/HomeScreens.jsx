// ================= CONTEXTO MODULO =================
// Contenedor principal de pantallas Home.
// Gestiona scroll horizontal, indice activo y dots de navegacion.
// ================= IMPORTS =================
import { useEffect, useRef, useState } from "react";
import Header from "@screen1/header/Header.jsx";
import HomePanel from "@screen1/HomePanel.jsx";
import SystemPanel from "@screen2/SystemPanel.jsx";

// Cantidad total de pantallas horizontales.
const SCREEN_COUNT = 2;
// Pantalla inicial al montar (screen_1).
const INITIAL_SCREEN_INDEX = 0;

// ================= COMPONENT =================
function HomeScreens({
    autoTime,
    manualDate,
    is24hFormat,
    weather,
    onOpenTimeSettings,
    onOpenWeatherSettings,
    onOpenRecipeSettings,
    onOpenShoppingSettings,
}) {
    // Referencia al contenedor scrollable horizontal.
    const scrollerRef = useRef(null);
    // Indice activo para estado visual (dots) y reposicionamientos.
    const [activeIndex, setActiveIndex] = useState(INITIAL_SCREEN_INDEX);

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

    // Render/retorno del bloque actual
    return (
        <div className="relative z-10 h-full flex flex-col">
            {/* Header superior fijo (TopBar) para la vista Home */}
            <Header
                autoTime={autoTime}
                manualDate={manualDate}
                is24hFormat={is24hFormat}
                weather={weather}
                showNav={false}
            />

            {/* Carrusel horizontal de pantallas (screen_1 + screen_2) */}
            <div ref={scrollerRef} onScroll={handleScroll} className="flex-1 flex overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory">
                {/* Pantalla principal con widgets y accesos de configuracion */}
                <section className="h-full w-full shrink-0 snap-center">
                    <HomePanel
                        autoTime={autoTime}
                        manualDate={manualDate}
                        is24hFormat={is24hFormat}
                        weather={weather}
                        onOpenTimeSettings={onOpenTimeSettings}
                        onOpenWeatherSettings={onOpenWeatherSettings}
                        onOpenRecipeSettings={onOpenRecipeSettings}
                        onOpenShoppingSettings={onOpenShoppingSettings}
                    />
                </section>

                {/* Pantalla secundaria (modulo energia/consola) */}
                <section className="h-full w-full shrink-0 snap-center">
                    <SystemPanel />
                </section>
            </div>

            {/* Indicador visual de pagina activa (dots) */}
            <div className="pointer-events-none absolute bottom-15 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {Array.from({ length: SCREEN_COUNT }, (_, index) => (
                    <span key={index}
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${activeIndex === index ? "bg-white" : "bg-white/25"}`} />
                ))}
            </div>
        </div>
    );
}
export default HomeScreens;