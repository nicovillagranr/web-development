// ================= CONTEXTO MODULO =================
// Card principal de clima para el dashboard.
// Gestiona loading/error, parsea codigo meteorologico y aplica gradiente dinamico.
// ================= IMPORTS =================
// Hooks de React para controlar estado local y efectos de animacion
import { useEffect, useState } from "react";

// Molde base reutilizable para las cards del dashboard
import Card from "../Card";

// Iconos de clima y ubicacion
import { WeatherIcon } from "@features/weather/components/weatherIcon.jsx";
import { FiMapPin } from "react-icons/fi";

// Utilidades para traducir codigo de clima y pintar gradiente dinamico
import { parseWeather } from "@features/weather/utils/weatherParser.js";
import { getWeatherGradient } from "@features/weather/utils/getWeatherGradient.js";

import s from "./CardWeather.module.css";

// ================= COMPONENT =================
// CardWeather: muestra estado actual del clima y maneja estados de carga/error
export function CardWeather({
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
            <Card as="button" onClick={handleFallbackClick} className={`${s["card-weather"]} ${showLoading ? s["card-weather--loading"] : s["card-weather--error"]} ${className}`}{...props}>
                {showLoading ? (
                    <>
                        {/* Skeleton visual del estado de carga */}
                        <div className={s["card-weather__skeleton-icon"]} />
                        <div className={s["card-weather__skeleton-text"]} />
                        <p className={s["card-weather__loading-label"]}>Cargando...</p>
                    </>
                ) : (
                    <>
                        {/* Mensaje de error con llamada clara a reintentar */}
                        <p className={s["card-weather__error-title"]}>Clima no disponible</p>
                        <p className={s["card-weather__error-msg"]}>{error}</p>
                        <p className={s["card-weather__error-hint"]}>Toca para reintentar</p>
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
        <Card as="button" onClick={onClick} className={`${s["card-weather__data"]} ${visible ? s["card-weather__data--visible"] : s["card-weather__data--hidden"]} ${gradient} ${className}`}
            {...props}
        >
            {/* Bloque principal: icono meteorologico + temperatura actual */}
            <div className={s["card-weather__main"]}>
                <WeatherIcon code={weather.code} isDay={weather.isDay} size={60} />
                <span className={s["card-weather__temp"]}>{weather.temperature}{"\u00B0"}</span>
            </div>

            {/* Bloque secundario: ciudad/pais para contexto geografico */}
            <div className={s["card-weather__location"]}>
                <FiMapPin className={s["card-weather__pin"]} />
                <p className={s["card-weather__city"]}>{weather.city}, {weather.country}</p>
            </div>
        </Card>
    );
}
