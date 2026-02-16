// Import de Molde Card
import Card from "./Card.jsx";

// Import de iconos y parser de clima
import { WeatherIcon } from "../3-weather/weatherIcon.jsx";
import { FiMapPin } from "react-icons/fi";

// Import de parser de clima para determinar categoría e intensidad del clima
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
        return (
            <Card as="button" className="col-span-1 row-span-1 w-full h-full rounded-lg backdrop-blur-md bg-white/20 shadow-lg animate-pulse flex flex-col items-center justify-center p-2">
                <div className="w-20 h-10 bg-white/40 rounded-full mb-2 animate-pulse"></div>
                <div className="w-25 h-6 bg-white/40 rounded-md animate-pulse"></div>
            </Card>
        );
    }

    const { category, intensity } = parseWeather(weather.code);
    const gradient =
        typeof weatherGradients[category] === "string"
            ? weatherGradients[category]
            : weatherGradients[category][intensity || "medium"];

    return (
        <Card as="button" className={`col-span-1 row-span-1 flex flex-col items-center justify-center ${gradient}`} onClick={onClick}>

            {/* Icono + temperatura */}
            <div className="flex items-center h-10">
                <WeatherIcon code={weather.code} size={70} />
                <span className="text-3xl font-light text-white">{weather.temperature}°</span>
            </div>

            {/* Ubicación */}
            <div className="flex items-center gap-1 justify-center mt-1">
                <FiMapPin className="h-3 w-3 text-white" />
                <p className="text-xs truncate max-w-28 text-white drop-shadow-lg text-center">{weather.city}, {weather.country}</p>
            </div>
        </Card>
    );
}
export default CardWeather;