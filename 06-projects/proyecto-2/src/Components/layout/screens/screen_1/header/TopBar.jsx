// ================= CONTEXTO MODULO =================
// Barra superior informativa no interactiva.
// Muestra hora, fecha y mini resumen de clima actual.
// ================= IMPORTS =================
import WeatherIconMini from "@screen1/features/weather/Components/weatherIconMini.jsx";

/**
 * Barra superior informativa.
 *
 * Solo muestra informaciÃ³n:
 * - hora
 * - fecha
 * - icono y temperatura
 *
 * No es interactiva.
 * 
 * Opera en todas las pantallas
 */

// ================= FUNCION =================
// TopBar: helper/componente interno; parametros: { time, date, weather }
function TopBar({ time, date, weather }) {
    return (
        // Contenedor Invisible
        <div className="flex items-center justify-between pointer-events-none">
            {/* Fecha y hora */}
            <div className="text-sm uppercase tracking-wide font-light">{time} | {date}</div>
            {/* Clima */}
            <div className="flex items-center min-w-12 justify-end tracking-wide font-light">
                {weather ? (
                    <>
                        <WeatherIconMini code={weather.code} isDay={weather.isDay} size={20} />
                        <span>{weather.temperature}°</span>
                    </>
                ) : (
                    // Skeleton | Mientras se carga el clima, mostramos un placeholder animado
                    <div className="flex items-center gap-1 animate-pulse">
                        <div className="w-4 h-6 backdrop-blur-md bg-white/20 rounded-full"></div>
                        <div className="w-6 h-4 backdrop-blur-md bg-white/20 rounded"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default TopBar;
