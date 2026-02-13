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

export function WeatherIcon({ code, size = 0, className = "" }) {
    const { category, intensity } = parseWeather(code);

    const icon =
        weatherMap[category][intensity || "default"];

    return (
        <img
            src={icon}
            alt={category}
            width={size}
            height={size}
            className="block"
        />
    );
}