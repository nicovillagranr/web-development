// ================= IMPORTS =================
import { useEffect, useState } from "react";

// Import de Molde Card
import Card from "./Card.jsx";

// Import de iconos y parser de clima
import { WeatherIcon } from "../../../features/weather/Components/weatherIcon.jsx";
import { FiMapPin } from "react-icons/fi";

// Import de parser de clima
import { parseWeather } from "../../../features/weather/utils/weatherParser.js";
import { getWeatherGradient } from "../../../features/weather/utils/getWeatherGradient.js";

// ================= FUNCION =================
// CardWeather: helper/componente interno; parametros: { weather, onClick, className = "", isLoading, error, onRetry, ...props }
function CardWeather({
    weather,
    onClick,
    className = "",
    isLoading = false,
    error = "",
    onRetry,
    ...props
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (weather) {
            const timer = setTimeout(() => setVisible(true), 50);
            return () => clearTimeout(timer);
        }
    }, [weather]);

    if (!weather) {
        const hasError = Boolean(error);
        const showLoading = isLoading || !hasError;

        const handleFallbackClick = () => {
            if (hasError && onRetry) {
                onRetry();
                return;
            }
            onClick?.();
        };

        return (
            <Card
                as="button"
                onClick={handleFallbackClick}
                className={`w-full h-full rounded-lg backdrop-blur-md shadow-lg flex flex-col items-center justify-center p-3 ${showLoading
                    ? "bg-white/20 animate-pulse"
                    : "bg-rose-500/20 border border-rose-300/40"
                    } ${className}`}
                {...props}
            >
                {showLoading ? (
                    <>
                        <div className="w-20 h-10 bg-white/40 rounded-full mb-2" />
                        <div className="w-24 h-4 bg-white/40 rounded-md mb-2" />
                        <p className="text-xs text-white/85 text-center">Cargando clima...</p>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-white font-medium text-center">Clima no disponible</p>
                        <p className="text-xs text-white/85 text-center mt-1 line-clamp-2">{error}</p>
                        <p className="text-[11px] text-white/80 text-center mt-2">Toca para reintentar</p>
                    </>
                )}
            </Card>
        );
    }

    const { category, intensity } = parseWeather(weather.code, weather.isDay);
    const gradient = getWeatherGradient(category, intensity, weather.isDay);

    return (
        <Card
            as="button"
            onClick={onClick}
            className={`flex flex-col items-center justify-center ${gradient} transition-all duration-500 ease-out ${visible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 scale-95"
                } ${className}`}
            {...props}
        >
            <div className="flex items-center h-10">
                <WeatherIcon code={weather.code} isDay={weather.isDay} size={70} />
                <span className="text-3xl font-light text-white mr-4">
                    {weather.temperature}{"\u00B0"}
                </span>
            </div>

            <div className="flex items-center gap-1 justify-center">
                <FiMapPin className="h-3 w-3 text-white" />
                <p className="text-xs truncate max-w-28 text-white drop-shadow-lg text-center">
                    {weather.city}, {weather.country}
                </p>
            </div>
        </Card>
    );
}

export default CardWeather;

