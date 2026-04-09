// ================= IMPORTS =================
// Traducciones legibles de categorias climaticas para idioma es.
import { weatherTranslationsES } from "../../constants/weatherTranslations.es.js";
import s from "./CurrentWeatherCard.module.css";

// ================= COMPONENTE/FUNCION =================
// CurrentWeatherCard: punto de entrada; recibe props/parametros: { weather, parsedWeather }
// Encargado de mostrar:
// - ubicacion actual
// - temperatura actual en grande
// - descripcion de clima + max/min del dia
export default function CurrentWeatherCard({ weather, parsedWeather }) {
    return (
        <div className={s["current-weather"]}>
            {/* Bloque: ciudad y pais */}
            <h2 className={s["current-weather__city"]}>
                {weather.city} de {weather.country}
            </h2>

            {/* Bloque: temperatura principal */}
            <h3 className={s["current-weather__temperature"]}>
                {weather.temperature}°
            </h3>

            {/* Bloque: resumen textual del estado + rango diario */}
            {parsedWeather && (
                <p className={s["current-weather__description"]}>
                    {weatherTranslationsES[parsedWeather.category.toLowerCase()] || parsedWeather.category}{" "}
                    {weather.max}° / {weather.min}°
                </p>
            )}
        </div>
    );
}
