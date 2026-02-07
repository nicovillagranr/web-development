// import { useDateTime } from "./useDateTime"; import { useWeather } from "./useWeather"; import { WeatherIcon } from "./weatherIcon"; function Header() { const { date, time } = useDateTime(); const weather = useWeather(); return (<header className="flex items-center w-full h-10 bg-yellow-800 gap-20"> <div className=""> {time} {date} </div> <div className="flex items-center"> {weather ? (<> <WeatherIcon code={weather.code} size={18} className="text-black" /> <span>{weather.temperature}°</span> </>) : ("--")} </div> </header>); } export default Header;

import { useDateTime } from "./useDateTime";
import { useWeather } from "./useWeather";
import { WeatherIcon } from "./weatherIcon";

function Header() {
    const { date, time } = useDateTime();
    const weather = useWeather();

    return (
        <header className="flex items-center w-full bg-yellow-800 gap-20">
            <div className="">{time} {date}</div>
            <div className="flex items-center">
                {weather ? (
                    <>
                        <WeatherIcon code={weather.code} size={18} className="text-black" />
                        <span>{weather.temperature}°</span>
                    </>
                ) : (
                    "--"
                )}
            </div>
        </header>
    );
}

export default Header;