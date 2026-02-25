// ================= IMPORTS =================
import { weatherGradients } from "../constants/weatherGradients";


// ================= FUNCION EXPORTADA =================
// getWeatherGradient: utilidad exportada; parametros: category, intensity
export function getWeatherGradient(category, intensity) {
    const gradient = weatherGradients[category];

    if (!gradient) return "";

    if (typeof gradient === "string") {
        return gradient;
    }

    return gradient[intensity || "medium"];
}
