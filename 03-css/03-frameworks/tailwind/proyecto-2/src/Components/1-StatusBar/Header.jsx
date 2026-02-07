// import { useDateTime } from "./useDateTime"; import { useWeather } from "./useWeather"; import { WeatherIcon } from "./weatherIcon"; function Header() { const { date, time } = useDateTime(); const weather = useWeather(); return (<header className="flex items-center w-full h-10 bg-yellow-800 gap-20"> <div className=""> {time} {date} </div> <div className="flex items-center"> {weather ? (<> <WeatherIcon code={weather.code} size={18} className="text-black" /> <span>{weather.temperature}°</span> </>) : ("--")} </div> </header>); } export default Header;

import { useDateTime } from "./useDateTime";
import { useWeather } from "./useWeather";
import { WeatherIcon } from "./weatherIcon";

function Header() {
    const { date, time } = useDateTime();
    const weather = useWeather();

    return (
        <header className="w-full flex flex-col px-4 py-2 font-sans gap-2">

            {/* Fila superior */}
            <div className="flex items-center justify-between">
                <div className="text-sm">
                    {time} {date}
                </div>

                <div className="flex items-center gap-1 text-sm min-w-12 justify-end">
                    {weather ? (
                        <>
                            <WeatherIcon code={weather.code} size={18} />
                            <span>{weather.temperature}°</span>
                        </>
                    ) : (
                        <>
                            <WeatherIcon code={0} size={18} className="opacity-0" />
                            <span className="opacity-0">0°</span>
                        </>
                    )}
                </div>
            </div>

            {/* Fila inferior */}
            <nav className="h-40 w-full">

                <section className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-40">
                    <div className="col-span-1 row-span-2 bg-black/20 rounded-lg">

                    </div>

                    <div className="col-span-1 row-span-1 bg-black/20 rounded-lg flex justify-center items-center">
                        <span className="text-3xl font-extralight tracking-tight">{time}</span>
                    </div>

                    <div className="col-span-1 row-span-1 bg-black/20 rounded-lg flex justify-center items-center">
                        <span className="flex flex-row items-center font-extralight text-3xl">
                            {weather ? (
                                <>
                                    <WeatherIcon code={weather.code} size={18} />
                                    <span>{weather.temperature}°</span>
                                </>
                            ) : (
                                <>
                                    <WeatherIcon code={0} size={18} className="opacity-0" />
                                    <span className="opacity-0">0°</span>
                                </>
                            )}
                        </span>
                    </div>
                </section>


            </nav>

        </header>

    );
}

export default Header;