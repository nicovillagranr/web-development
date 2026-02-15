import { useDateTime } from "../2-time/useDateTime.jsx";
import { useWeather } from "../3-weather/useWeather.jsx";

import TopBar from "./TopBar";
import Nav from "./Nav";

function Header({
    autoTime,
    manualDate,
    is24hFormat,
    weatherSettings,
    onOpenTimeSettings,
    onOpenWeatherSettings,
}) {

    const { date, time } = useDateTime({
        autoTime,
        manualDate,
        is24hFormat,
    });

    const weather = useWeather(weatherSettings);

    return (
        <header className="w-full flex flex-col px-4 py-2 gap-2">
            <TopBar
                time={time}
                date={date}
                weather={weather}
            />

            <Nav
                time={time}
                weather={weather}
                onOpenTimeSettings={onOpenTimeSettings}
                onOpenWeatherSettings={onOpenWeatherSettings}
            />
        </header>
    );
}

export default Header;
