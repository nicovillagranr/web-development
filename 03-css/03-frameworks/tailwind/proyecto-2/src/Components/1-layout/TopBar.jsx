import WeatherIconMini from "../3-weather/weatherIconMini.jsx";

/**
 * Barra superior informativa.
 *
 * Solo muestra información:
 * - hora
 * - fecha
 * - icono y temperatura
 *
 * No es interactiva.
 */
function TopBar({ time, date, weather }) {
    return (
        <div className="flex items-center justify-between pointer-events-none">

            {/* Fecha y hora */}
            <div className="text-sm uppercase tracking-wide font-light">{time} | {date}</div>

            {/* Clima */}
            <div className="flex items-center min-w-12 justify-end tracking-wide font-light">
                {weather ? (
                    <>
                        <WeatherIconMini code={weather.code} size={20} />
                        <span>{weather.temperature}°</span>
                    </>
                ) : (
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