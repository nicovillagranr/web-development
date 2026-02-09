import { useDateTime } from "./useDateTime";
import { useWeather } from "./useWeather";

import TopBar from "./TopBar";
import Nav from "./Nav";

function Header() {
    const { date, time } = useDateTime();
    const weather = useWeather();

    return (
        <header className="w-full flex flex-col px-4 py-2 font-sans gap-2">
            <TopBar time={time} date={date} weather={weather} />
            <Nav time={time} weather={weather} />
        </header>
    );
}

export default Header;
