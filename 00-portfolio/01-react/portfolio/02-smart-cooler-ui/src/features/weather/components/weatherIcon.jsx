// ================= IMPORTS =================
// Import de todos los iconos SVG del sistema de clima.
import {
    day,
    night,
    cloudyDayLight,
    cloudyDayMedium,
    cloudyDayHeavy,
    cloudyNightLight,
    cloudyNightMedium,
    cloudyNightHeavy,
    rainLight,
    rainMedium,
    rainHeavy,
    snowLight,
    snowMedium,
    snowHeavy,
    thunder,
} from "@assets/icons/weather/export.js";

// Parser que traduce codigo numerico API a categoria/intensidad.
import { parseWeather } from "../utils/weatherParser.js";

// Nombres en español de cada categoría, para el texto alternativo del icono.
import { weatherTranslationsES } from "./Settings/constants/weatherTranslations.es.js";

// ================= MAPA DE ICONOS =================
// Estructura central para resolver icono por:
// - categoria
// - intensidad (si aplica)
// - ciclo dia/noche
const weatherMap = {
    clear: {
        day,
        night,
    },

    cloudy: {
        day: {
            light: cloudyDayLight,
            medium: cloudyDayMedium,
            heavy: cloudyDayHeavy,
        },
        night: {
            light: cloudyNightLight,
            medium: cloudyNightMedium,
            heavy: cloudyNightHeavy,
        },
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

// ================= FUNCION EXPORTADA =================
// WeatherIcon: utilidad exportada; parametros: { code, isDay = true, size = 0, className = "" }
export function WeatherIcon({ code, isDay = true, size = 0, className = "" }) {
    // 1) Derivamos categoria/intensidad desde codigo de clima.
    const { category, intensity } = parseWeather(code, isDay);

    // 2) Seleccionamos variante temporal (day/night) cuando aplique.
    const timeKey = isDay ? "day" : "night";

    // 3) Resolvemos el icono final segun tipo de categoria.
    let icon;
    if (category === "cloudy") {
        icon = weatherMap.cloudy[timeKey]?.[intensity];
    } else if (category === "clear") {
        icon = weatherMap.clear[timeKey];
    } else {
        icon = weatherMap[category]?.[intensity || "default"];
    }

    // Guard rail: si no hay icono definido para ese caso, no renderizamos.
    if (!icon) return null;

    // Render principal del icono.
    return (
        <img
            src={icon}
            alt={weatherTranslationsES[category] || "Estado del clima"}
            width={size || undefined}
            height={size || undefined}
            className={`block ${className}`}
        />
    );
}
