import { WeatherIcon } from "../3-weather/weatherIcon.jsx";
import { FiMapPin } from "react-icons/fi";
import { parseWeather } from "../3-weather/weatherParser.jsx";

/**
 * Gradientes de clima agresivos
 * - Contraste alto para que se note en botones pequeños
 * - Colores hexadecimales directos
 */
const weatherGradients = {
    clear: "bg-gradient-to-br from-[#FFD700] via-[#FFB800] to-[#FF7F00]", // dorado → naranja fuerte
    cloudy: {
        light: "bg-gradient-to-br from-[#B0B0B0] via-[#888888] to-[#555555]", // gris claro → gris medio → gris oscuro
        medium: "bg-gradient-to-br from-[#888888] via-[#555555] to-[#222222]",
        heavy: "bg-gradient-to-br from-[#555555] via-[#333333] to-[#111111]",
    },
    rain: {
        light: "bg-gradient-to-br from-[#4FC3F7] via-[#0288D1] to-[#01579B]", // azul cielo → azul medio → azul oscuro
        medium: "bg-gradient-to-br from-[#0288D1] via-[#01579B] to-[#002F5F]",
        heavy: "bg-gradient-to-br from-[#01579B] via-[#002F5F] to-[#001F3F]",
    },
    snow: {
        light: "bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA]", // azul muy claro → celeste
        medium: "bg-gradient-to-br from-[#B2EBF2] via-[#80DEEA] to-[#4DD0E1]",
        heavy: "bg-gradient-to-br from-[#80DEEA] via-[#4DD0E1] to-[#26C6DA]",
    },
    storm: "bg-gradient-to-br from-[#9C27B0] via-[#6A1B9A] to-[#000000]", // púrpura intenso → negro
    mist: "bg-gradient-to-br from-[#EEEEEE] via-[#CCCCCC] to-[#AAAAAA]", // gris muy claro → medio
};

/**
 * CardWeather
 *
 * Tarjeta interactiva de clima:
 * - Icono + temperatura
 * - Ubicación
 * - Gradiente dinámico según clima
 * - Animación suave de transición de fondo
 */
function CardWeather({ weather, onClick }) {
    if (!weather) {
        // placeholder skeleton mientras carga
        return (
            <div className="col-span-1 row-span-1 flex flex-col items-center justify-center w-full h-full bg-gray-200 animate-pulse rounded-lg">
                <div className="w-10 h-10 bg-gray-300 rounded-full mb-2"></div>
                <div className="w-12 h-6 bg-gray-300 rounded-md"></div>
            </div>
        );
    }

    const { category, intensity } = parseWeather(weather.code);

    // Obtener gradiente según categoría e intensidad
    const gradient =
        typeof weatherGradients[category] === "string"
            ? weatherGradients[category]
            : weatherGradients[category][intensity || "medium"];

    return (
        <button
            className={`col-span-1 row-span-1 flex flex-col items-center justify-center rounded-lg shadow-md active:scale-98
            transition-transform duration-100 ${gradient}`}
            onClick={onClick}>

            {/* Icono + temperatura */}
            <div className="flex items-center h-10">
                <WeatherIcon code={weather.code} size={60} />
                <span className="text-3xl font-light text-white">
                    {weather.temperature}°
                </span>
            </div>

            {/* Ubicación */}
            <div className="flex items-center gap-1 justify-center mt-1">
                <FiMapPin className="h-3 w-3 shrink-0 text-white drop-shadow-lg" />
                <p className="text-xs truncate max-w-28 text-white drop-shadow-lg text-center">
                    {weather.city}, {weather.country}
                </p>
            </div>
        </button>
    );
}

export default CardWeather;
