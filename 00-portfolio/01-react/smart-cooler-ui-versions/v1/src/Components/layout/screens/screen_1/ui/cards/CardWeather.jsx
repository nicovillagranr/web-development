// ================= CONTEXTO MODULO =================
// Card principal de clima para el dashboard.
// Gestiona loading/error, parsea codigo meteorologico y aplica gradiente dinamico.
// ================= IMPORTS =================
// Hooks de React para controlar estado local y efectos de animacion
import { useEffect, useState } from "react";

// Molde base reutilizable para las cards del dashboard
import Card from "./Card.jsx";

// Iconos de clima y ubicacion
import { WeatherIcon } from "../../features/weather/Components/weatherIcon.jsx";
import { FiMapPin } from "react-icons/fi";

// Utilidades para traducir codigo de clima y pintar gradiente dinamico
import { parseWeather } from "../../features/weather/utils/weatherParser.js";
import { getWeatherGradient } from "../../features/weather/utils/getWeatherGradient.js";

// ================= COMPONENT =================
// CardWeather: muestra estado actual del clima y maneja estados de carga/error
function CardWeather({
    weather,
    onClick,
    className = "",
    isLoading = false,
    error = "",
    onRetry,
    ...props
}) {
    // Estado local que activa la transicion visual de entrada cuando hay datos
    const [visible, setVisible] = useState(false);

    // Efecto de entrada: al recibir weather, aplicamos un delay corto para animar
    useEffect(() => {
        if (weather) {
            const timer = setTimeout(() => setVisible(true), 50);
            return () => clearTimeout(timer);
        }
    }, [weather]);

    // Fallback cuando aun no hay datos:
    // - Loading: skeleton animado
    // - Error: mensaje + accion de reintento
    if (!weather) {
        const hasError = Boolean(error);
        const showLoading = isLoading || !hasError;

        // Si existe error y callback de reintento, priorizamos retry;
        // de lo contrario, ejecutamos el click normal de la card.
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
                        {/* Skeleton visual del estado de carga */}
                        <div className="w-20 h-10 bg-white/40 mb-2" />
                        <div className="w-24 h-4 bg-white/40 mb-2" />
                        <p className="text-xs text-black/50 text-center">Cargando clima...</p>
                    </>
                ) : (
                    <>
                        {/* Mensaje de error con llamada clara a reintentar */}
                        <p className="text-sm text-white font-medium text-center">Clima no disponible</p>
                        <p className="text-xs text-white/85 text-center mt-1 line-clamp-2">{error}</p>
                        <p className="text-[11px] text-white/80 text-center mt-2">Toca para reintentar</p>
                    </>
                )}
            </Card>
        );
    }

    // Con datos reales:
    // 1) Parseamos codigo de API a categoria/intensidad
    // 2) Seleccionamos gradiente de fondo segun clima y ciclo dia/noche
    const { category, intensity } = parseWeather(weather.code, weather.isDay);
    const gradient = getWeatherGradient(category, intensity, weather.isDay);

    return (
        <Card
            as="button"
            onClick={onClick}
            className={`flex flex-col items-center justify-center ${gradient} transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 scale-95"} ${className}`}
            {...props}
        >
            {/* Bloque principal: icono meteorologico + temperatura actual */}
            <div className="flex items-center h-10">
                <WeatherIcon code={weather.code} isDay={weather.isDay} size={60} />
                <span className="text-3xl font-light text-white mr-4">{weather.temperature}{"\u00B0"}</span>
            </div>

            {/* Bloque secundario: ciudad/pais para contexto geografico */}
            <div className="flex items-center gap-1 justify-center">
                <FiMapPin className="h-3 w-3 text-white/80" />
                <p className="text-xs truncate max-w-28 text-white drop-shadow-lg text-center">{weather.city}, {weather.country}</p>
            </div>
        </Card>
    );
}
export default CardWeather;