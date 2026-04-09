// ================= CONTEXTO MODULO =================
// Barra superior informativa no interactiva.
// Muestra hora, fecha y mini resumen de clima actual.

// Import de Icono dinámico
import WeatherIconMini from "@features/weather/components/weatherIconMini.jsx";
import s from "./TopBar.module.css";

// ================= FUNCION =================
// TopBar: helper/componente interno; parametros: { time, date, weather }
function TopBar({ time, date, weather }) {
    return (
        // Contenedor Invisible
        <div className={s.topbar}>
            {/* Fecha y hora */}
            <div className={s.topbar__datetime}>{time} · {date}</div>
            {/* Clima */}
            <div className={s.topbar__weather}>
                {weather ? (
                    <>
                        <WeatherIconMini code={weather.code} isDay={weather.isDay} size={20} />
                        <span>{weather.temperature}°</span>
                    </>
                ) : (
                    // Skeleton | Mientras se carga el clima, mostramos un placeholder animado
                    <div className={s.topbar__skeleton}>
                        <div className={s["topbar__skeleton-icon"]}></div>
                        <div className={s["topbar__skeleton-temp"]}></div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default TopBar;