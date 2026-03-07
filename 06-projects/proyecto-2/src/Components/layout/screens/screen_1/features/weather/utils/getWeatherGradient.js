// ================= IMPORTS =================
// Mapa central de gradientes por tipo de clima + fallback global.
import {
    DEFAULT_WEATHER_GRADIENT,
    weatherGradients,
} from "../constants/weatherGradients";

// ================= FUNCION EXPORTADA =================
// getWeatherGradient: utilidad exportada; parametros: category, intensity, isDay
export function getWeatherGradient(category, intensity, isDay = true) {
    // Normalizamos entradas para hacer el helper tolerante a valores sucios.
    const normalizedCategory = String(category || "").toLowerCase().trim();
    const normalizedIntensity = String(intensity || "medium").toLowerCase().trim();

    // 1) Tomamos el bloque principal de categoria.
    const categoryGradient = weatherGradients[normalizedCategory];
    if (!categoryGradient) return DEFAULT_WEATHER_GRADIENT;

    // 2) Resolvemos clave temporal segun ciclo dia/noche.
    const timeKey = isDay ? "day" : "night";

    // Caso simple: categoria ya definida como string unico.
    if (typeof categoryGradient === "string") {
        return categoryGradient;
    }

    // Caso categoria con variante dia/noche sin intensidades.
    if (categoryGradient.day || categoryGradient.night) {
        return (
            categoryGradient[timeKey] ||
            categoryGradient.day ||
            categoryGradient.night ||
            DEFAULT_WEATHER_GRADIENT
        );
    }

    // Caso categoria con intensidades (light/medium/heavy).
    const intensityGradient =
        categoryGradient[normalizedIntensity] || categoryGradient.medium;
    if (!intensityGradient) return DEFAULT_WEATHER_GRADIENT;

    // Intensidad definida como string unico.
    if (typeof intensityGradient === "string") {
        return intensityGradient;
    }

    // Intensidad con variante dia/noche.
    return (
        intensityGradient[timeKey] ||
        intensityGradient.day ||
        intensityGradient.night ||
        DEFAULT_WEATHER_GRADIENT
    );
}
