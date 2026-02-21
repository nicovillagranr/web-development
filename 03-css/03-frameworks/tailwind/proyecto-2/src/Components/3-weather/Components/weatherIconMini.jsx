// Import de iconos
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from "react-icons/wi";

// Import de hooks
import { parseWeather } from "../utils/weatherParser";

// Import de componentes
function WeatherIconMini({ code, className = "" }) {
    const { category } = parseWeather(code);

    function resolveIcon(category) {
        switch (category) {
            case "clear":
                return <WiDaySunny />;
            case "cloudy":
                return <WiCloud />;
            case "rain":
                return <WiRain />;
            case "snow":
                return <WiSnow />;
            case "storm":
                return <WiThunderstorm />;
            case "mist":
                return <WiFog />;
            default:
                return <WiDaySunny />;
        }
    }
    // Render
    return <span className={`text-lg ${className}`}>{resolveIcon(category)}</span>;
}

export default WeatherIconMini;
