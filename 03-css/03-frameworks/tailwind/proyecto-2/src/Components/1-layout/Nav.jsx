import Card from "../4-ui/Card.jsx";

import { WeatherIcon } from "../3-weather/weatherIcon.jsx";


/**
 * Barra de navegación del Header.
 *
 * Contiene accesos rápidos:
 * - recetas
 * - hora (abre ajustes)
 * - clima
 */
function Nav({ time, weather, onOpenTimeSettings }) {
    return (
        <nav className="h-40 w-full">
            <section className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-40">

                {/* Placeholder: recetas rápidas */}
                <Card className="col-span-1 row-span-2 flex flex-col items-center text-center">
                    <h2>Contenedor Receta rápida. Inventario + API</h2>
                </Card>

                {/* Card de la hora (abre TimeSettings) */}
                <Card className="col-span-1 row-span-1 cursor-pointer" onClick={onOpenTimeSettings}>
                    <span className="text-3xl font-medium tracking-tight">
                        {time}
                    </span>
                </Card>

                {/* Card del clima */}
                <Card className="col-span-1 row-span-1 flex items-center justify-center pr-10">
                    {weather ? (
                        <>
                            <WeatherIcon
                                code={weather.code}
                                size={70}
                                className="text-black"
                            />
                            <span className="text-3xl font-extralight">
                                {weather.temperature}°
                            </span>
                        </>
                    ) : (
                        <div className="flex items-center gap-1 animate-pulse">
                            <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
                            <div className="w-12 h-8 bg-gray-300 rounded-md"></div>
                        </div>
                    )}
                </Card>
            </section>
        </nav>
    );
}
export default Nav;