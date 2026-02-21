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
} from "../../../assets/icons/weather/export";

import { parseWeather } from "../utils/weatherParser";

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

export function WeatherIcon({ code, isDay = true, size = 0, className = "" }) {
    const { category, intensity } = parseWeather(code, isDay);

    const timeKey = isDay ? "day" : "night";

    let icon;

    if (category === "cloudy") {
        icon = weatherMap.cloudy[timeKey]?.[intensity];
    } else if (category === "clear") {
        icon = weatherMap.clear[timeKey];
    } else {
        icon =
            weatherMap[category]?.[intensity || "default"];
    }

    if (!icon) return null;

    return (
        <img
            src={icon}
            alt={category || "weather"}
            width={size || undefined}
            height={size || undefined}
            className={`block ${className}`}
        />
    );
}
