// ================= IMPORTS =================
// Set de iconos mini para tarjetas compactas (react-icons).
import {
    WiCloud,
    WiDaySunny,
    WiNightAltCloudy,
    WiNightClear,
    WiRain,
    WiSnow,
    WiThunderstorm,
} from "react-icons/wi";
import { parseWeather } from "../utils/weatherParser.js";

// ================= FUNCION =================
// WeatherIconMini: helper/componente interno; parametros: { code, isDay = true, size = 20, className = "" }
function WeatherIconMini({ code, isDay = true, size = 20, className = "" }) {
    // Derivamos solo categoria (para mini icono no usamos intensidad).
    const { category } = parseWeather(code, isDay);

    // Resolvemos icono segun categoria y franja temporal.
    switch (category) {
        case "clear":
            return isDay ? <WiDaySunny size={size} className={className} /> : <WiNightClear size={size} className={className} />;

        case "cloudy":
            return isDay
                ? <WiCloud size={size} className={className} />
                : <WiNightAltCloudy size={size} className={className} />;

        case "rain":
            return <WiRain size={size} className={className} />;

        case "snow":
            return <WiSnow size={size} className={className} />;

        case "storm":
            return <WiThunderstorm size={size} className={className} />;

        // Fallback visual si llega categoria desconocida.
        default:
            return isDay
                ? <WiDaySunny size={size} className={className} />
                : <WiNightClear size={size} className={className} />;
    }
}

export default WeatherIconMini;
