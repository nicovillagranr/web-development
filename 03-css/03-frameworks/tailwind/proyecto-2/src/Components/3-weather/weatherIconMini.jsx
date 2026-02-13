import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

function WeatherIconMini({ code, className = "" }) {

    function resolveIcon(code) {
        if (code === 0) return <WiDaySunny />;
        if (code === 1) return <WiCloud />;
        if (code === 2) return <WiRain />;
        return <WiDaySunny />;
    }

    return (
        <span className={`text-lg ${className}`}>
            {resolveIcon(code)}
        </span>
    );
}

export default WeatherIconMini;
