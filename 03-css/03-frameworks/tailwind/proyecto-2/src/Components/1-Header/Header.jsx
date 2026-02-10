import { useDateTime } from "../../hooks/useDateTime";
import { useWeather } from "../../hooks/useWeather";

import TopBar from "./TopBar";
import Nav from "./Nav";

function Header({ autoTime, manualDate, onOpenTimeSettings }) {
    const { date, time } = useDateTime({ autoTime, manualDate });
    const weather = useWeather();

    return (
        <header className="w-full flex flex-col px-4 py-2 gap-2">
            <TopBar time={time} date={date} weather={weather} />
            <Nav time={time} weather={weather} onOpenTimeSettings={onOpenTimeSettings} />
        </header>
    );
}

export default Header;
