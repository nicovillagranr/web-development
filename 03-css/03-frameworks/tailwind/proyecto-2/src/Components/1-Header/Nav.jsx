
// Este componente se encarga de mostrar la barra de navegación inferior del header, con el tiempo y el clima actual.
function Nav({ time, weather }) {
    return (
        <nav className="h-40 w-full">
            <section className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-40">
                <div className="col-span-1 row-span-2 bg-white rounded-lg flex justify-center items-center text-center shadow-[0px_18px_16px_-13px_rgba(0,0,0,0.1)]">
                    <h2>Contenedor Receta rápida. Inventario + API</h2>
                </div>

                <div className="col-span-1 row-span-1 bg-white rounded-lg flex justify-center items-center shadow-[0px_18px_16px_-13px_rgba(0,0,0,0.1)]">
                    <span className="text-3xl font-extralight tracking-tight">{time}</span>
                </div>

                <div className="col-span-1 row-span-1 bg-white rounded-lg flex justify-center items-center shadow-[0px_18px_16px_-13px_rgba(0,0,0,0.1)]">
                    <span className="flex flex-row items-center font-extralight text-3xl">
                        {weather ? (
                            <>
                                <span>{weather.temperature}°</span>
                            </>
                        ) : (
                            <>
                                <span className="opacity-0">0°</span>
                            </>
                        )}
                    </span>
                </div>
            </section>
        </nav>
    )
}
export default Nav