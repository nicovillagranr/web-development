import {
    day,
    cloudyLight,
    cloudyMedium,
    cloudyHeavy,
    rainLight,
    rainMedium,
    rainHeavy,
    snowLight,
    snowMedium,
    snowHeavy,
    thunder,
} from "../../assets/icons/weather/export";

import { parseWeather } from "./weatherParser";

/**
 * Mapa de íconos según categoría e intensidad.
 */
const weatherMap = {
    clear: {
        default: day,
    },
    cloudy: {
        light: cloudyLight,
        medium: cloudyMedium,
        heavy: cloudyHeavy,
    },
    rain: {
        light: rainLight,
        medium: rainMedium,
        heavy: rainHeavy,
    },
    snow: {
        light: snowLight,
        medium: snowMedium,
        heavy: snowHeavy,
    },
    storm: {
        default: thunder,
    },
};

/**
 * Componente que renderiza el ícono de clima.
 *
 * - code: código de clima a parsear
 * - size: ancho y alto del ícono (0 = tamaño original)
 * - className: clases adicionales de Tailwind u otras
 */
export function WeatherIcon({ code, size = 0, className = "" }) {
    const { category, intensity } = parseWeather(code);

    // fallback seguro: si category o intensity no existen en weatherMap
    const icon =
        (weatherMap[category] && weatherMap[category][intensity || "default"]) ||
        day; // day como fallback seguro

    // si por alguna razón sigue siendo undefined, no renderiza nada
    if (!icon) return null;

    return (
        <img
            src={icon}
            alt={category || "weather"}
            width={size || undefined}
            height={size || undefined}
            className={`block ${className}`}
        />
    );
}
