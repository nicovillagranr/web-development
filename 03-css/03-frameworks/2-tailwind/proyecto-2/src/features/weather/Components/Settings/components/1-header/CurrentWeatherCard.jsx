// ================= IMPORTS =================
import { weatherTranslationsES } from "../../constants/weatherTranslations.es.js";


// ================= COMPONENTE/FUNCION =================
// CurrentWeatherCard: punto de entrada; recibe props/parametros: { weather, parsedWeather }
export default function CurrentWeatherCard({ weather, parsedWeather }) {
    // Render/retorno del bloque actual
    return (
        <div className="flex flex-col mt-6 px-6">
            <h2 className="text-3xl font-medium">
                {weather.city} de {weather.country}
            </h2>

            <h3 className="text-8xl font-light leading-none">
                {weather.temperature}°
            </h3>

            {parsedWeather && (
                <p className="text-lg opacity-70 capitalize mt-2">
                    {weatherTranslationsES[parsedWeather.category.toLowerCase()] || parsedWeather.category}{" "}
                    {weather.max}° / {weather.min}°
                </p>
            )}
        </div>
    );
}

