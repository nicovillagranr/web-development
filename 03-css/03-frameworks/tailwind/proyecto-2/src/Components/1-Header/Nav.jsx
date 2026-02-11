import Card from "../3-ui/Card.jsx";

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
                <Card
                    className="col-span-1 row-span-1 cursor-pointer"
                    onClick={onOpenTimeSettings}
                >
                    <span className="text-3xl font-light tracking-tight">
                        {time}
                    </span>
                </Card>

                {/* Card del clima */}
                <Card className="col-span-1 row-span-1">
                    <span className="flex flex-row items-center font-extralight text-3xl">
                        {weather ? (
                            <span>{weather.temperature}°</span>
                        ) : (
                            <span className="opacity-0">0°</span>
                        )}
                    </span>
                </Card>

            </section>
        </nav>
    );
}

export default Nav;
