// ================= IMPORTS =================
import {
    DEFAULT_WEATHER_GRADIENT,
    weatherGradients,
} from "../constants/weatherGradients";


// ================= FUNCION EXPORTADA =================
// getWeatherGradient: utilidad exportada; parametros: category, intensity, isDay
export function getWeatherGradient(category, intensity, isDay = true) {
    const normalizedCategory = String(category || "").toLowerCase().trim();
    const normalizedIntensity = String(intensity || "medium").toLowerCase().trim();

    const categoryGradient = weatherGradients[normalizedCategory];
    if (!categoryGradient) return DEFAULT_WEATHER_GRADIENT;

    const timeKey = isDay ? "day" : "night";

    if (typeof categoryGradient === "string") {
        return categoryGradient;
    }

    if (categoryGradient.day || categoryGradient.night) {
        return (
            categoryGradient[timeKey] ||
            categoryGradient.day ||
            categoryGradient.night ||
            DEFAULT_WEATHER_GRADIENT
        );
    }

    const intensityGradient =
        categoryGradient[normalizedIntensity] || categoryGradient.medium;
    if (!intensityGradient) return DEFAULT_WEATHER_GRADIENT;

    if (typeof intensityGradient === "string") {
        return intensityGradient;
    }

    return (
        intensityGradient[timeKey] ||
        intensityGradient.day ||
        intensityGradient.night ||
        DEFAULT_WEATHER_GRADIENT
    );
}
