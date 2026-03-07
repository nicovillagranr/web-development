// ================= IMPORTS =================
// Traducciones legibles de categorias climaticas para idioma es.
import { weatherTranslationsES } from "../../constants/weatherTranslations.es.js";

// ================= COMPONENTE/FUNCION =================
// CurrentWeatherCard: punto de entrada; recibe props/parametros: { weather, parsedWeather }
// Encargado de mostrar:
// - ubicacion actual
// - temperatura actual en grande
// - descripcion de clima + max/min del dia
export default function CurrentWeatherCard({ weather, parsedWeather }) {
    return (
        <div className="flex flex-col mt-6 px-6">
            {/* Bloque: ciudad y pais */}
            <h2 className="text-3xl font-medium">
                {weather.city} de {weather.country}
            </h2>

            {/* Bloque: temperatura principal */}
            <h3 className="text-8xl font-light leading-none">
                {weather.temperature}°
            </h3>

            {/* Bloque: resumen textual del estado + rango diario */}
            {parsedWeather && (
                <p className="text-lg opacity-70 capitalize mt-2">
                    {weatherTranslationsES[parsedWeather.category.toLowerCase()] || parsedWeather.category}{" "}
                    {weather.max}° / {weather.min}°
                </p>
            )}
        </div>
    );
}
