import { weatherGradients } from "../constants/weatherGradients";

export function getWeatherGradient(category, intensity) {
    const gradient = weatherGradients[category];

    if (!gradient) return "";

    if (typeof gradient === "string") {
        return gradient;
    }

    return gradient[intensity || "medium"];
}
