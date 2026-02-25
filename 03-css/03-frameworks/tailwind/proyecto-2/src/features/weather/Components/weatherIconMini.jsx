// ================= IMPORTS =================
import {
    WiCloud,
    WiDaySunny,
    WiFog,
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
    const { category } = parseWeather(code, isDay);

    function resolveIcon() {
        switch (category) {
            case "clear":
                return isDay ? WiDaySunny : WiNightClear;
            case "cloudy":
                return isDay ? WiCloud : WiNightAltCloudy;
            case "rain":
                return WiRain;
            case "snow":
                return WiSnow;
            case "storm":
                return WiThunderstorm;
            case "mist":
            case "fog":
                return WiFog;
            default:
                return isDay ? WiDaySunny : WiNightClear;
        }
    }

    const Icon = resolveIcon();

    // Render/retorno del bloque actual
    return <Icon size={size} className={className} />;
}

export default WeatherIconMini;
