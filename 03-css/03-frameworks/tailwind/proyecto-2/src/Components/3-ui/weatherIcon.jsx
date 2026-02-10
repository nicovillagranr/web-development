import {
    WiDaySunny,
    WiCloudy,
    WiRain,
    WiFog,
    WiSnow,
    WiThunderstorm,
} from "react-icons/wi";

export function WeatherIcon({ code, size = 20, className = "" }) {
    if (code === 0) return <WiDaySunny size={size} className={className} />;

    if ([1, 2, 3].includes(code))
        return <WiCloudy size={size} className={className} />;

    if ([45, 48].includes(code))
        return <WiFog size={size} className={className} />;

    if (code >= 51 && code <= 67)
        return <WiRain size={size} className={className} />;

    if (code >= 71 && code <= 77)
        return <WiSnow size={size} className={className} />;

    if (code >= 95)
        return <WiThunderstorm size={size} className={className} />;

    return <WiCloudy size={size} className={className} />;
}
