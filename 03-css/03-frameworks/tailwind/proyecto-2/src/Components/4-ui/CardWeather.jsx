import { useEffect, useState } from "react";

// Import de Molde Card
import Card from "./Card.jsx";

// Import de iconos y parser de clima
import { WeatherIcon } from "../3-weather/Components/weatherIcon.jsx";
import { FiMapPin } from "react-icons/fi";

// Import de parser de clima
import { parseWeather } from "../3-weather/utils/weatherParser.js";
import { getWeatherGradient } from "../3-weather/utils/getWeatherGradient.js";


function CardWeather({ weather, onClick }) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (weather) {
            const timer = setTimeout(() => setVisible(true), 50);
            return () => clearTimeout(timer);
        }
    }, [weather]);

    // Skeleton mientras carga
    if (!weather) {
        return (
            <Card as="button" className="col-span-1 row-span-1 w-full h-full rounded-lg backdrop-blur-md bg-white/20 shadow-lg animate-pulse flex flex-col items-center justify-center p-2">
                <div className="w-20 h-10 bg-white/40 rounded-full mb-2"></div>
                <div className="w-25 h-6 bg-white/40 rounded-md"></div>
            </Card>
        );
    }

    const { category, intensity } = parseWeather(weather.code);

    const gradient = getWeatherGradient(category, intensity);


    return (
        // Tarjeta con fondo dinámico según el clima, animación de aparición y onClick para mostrar detalles
        <Card as="button" onClick={onClick} className={`col-span-1 row-span-1 flex flex-col items-center justify-center ${gradient} transition-all duration-500 ease-out
        ${visible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 scale-95"}`}>

            {/* Icono + temperatura */}
            <div className="flex items-center h-10">
                <WeatherIcon code={weather.code} size={70} />
                <span className="text-3xl font-extralight text-white">{weather.temperature}°</span>
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