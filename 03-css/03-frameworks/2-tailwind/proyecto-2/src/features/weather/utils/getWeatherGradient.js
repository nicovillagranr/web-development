// ================= IMPORTS =================
import { weatherGradients } from "../constants/weatherGradients";


// ================= FUNCION EXPORTADA =================
// getWeatherGradient: utilidad exportada; parametros: category, intensity, isDay
export function getWeatherGradient(category, intensity, isDay = true) {
    const categoryGradient = weatherGradients[category];
    if (!categoryGradient) return "";

    const timeKey = isDay ? "day" : "night";

    if (typeof categoryGradient === "string") {
        return categoryGradient;
    }

    if (categoryGradient.day || categoryGradient.night) {
        return (
            categoryGradient[timeKey] ||
            categoryGradient.day ||
            categoryGradient.night ||
            ""
        );
    }

    const intensityGradient =
        categoryGradient[intensity || "medium"] || categoryGradient.medium;
    if (!intensityGradient) return "";

    if (typeof intensityGradient === "string") {
        return intensityGradient;
    }

    return (
        intensityGradient[timeKey] ||
        intensityGradient.day ||
        intensityGradient.night ||
        ""
    );
}
