import { WeatherIcon } from "../3-ui/weatherIcon";

function TopBar({ time, date, weather }) {
    return (
        <div className="flex items-center justify-between pointer-events-none">
            <div className="text-sm uppercase tracking-wide font-light">
                {time} | {date}
            </div>

            <div className="flex items-center min-w-12 justify-end tracking-wide font-light">
                {weather ? (
                    <>
                        <WeatherIcon code={weather.code} size={18} />
                        <span className="font-light">{weather.temperature}°</span>
                    </>
                ) : (
                    <>
                        <span className="opacity-0">0°</span>
                    </>
                )}
            </div>
        </div>
    );
}

export default TopBar;
