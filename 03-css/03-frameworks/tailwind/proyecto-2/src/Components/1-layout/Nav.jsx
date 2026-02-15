// Import de Card reutilizable
import Card from "../4-ui/Card.jsx";
import CardRecipe from "../4-ui/CardRecipe.jsx";
import CardTime from "../4-ui/CardTime.jsx";
import CardWeather from "../4-ui/CardWeather.jsx";



function Nav({ time, weather, onOpenTimeSettings, onOpenWeatherSettings }) {
    return (
        <nav className="w-full">
            <section className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-40">

                {/* Receta / Inventario */}
                <CardRecipe className="col-span-2 row-span-1 flex items-center justify-center cursor-pointer" onClick={onOpenTimeSettings}>
                    <span className="text-3xl font-medium tracking-tight">
                        Receta / Inventario
                    </span>
                </CardRecipe>

                {/* Hora */}
                <CardTime className="col-span-1 row-span-1 flex items-center justify-center cursor-pointer" time={time} onClick={onOpenTimeSettings} />

                {/* Clima */}
                <CardWeather
                    className="col-span-1 row-span-1 flex items-center justify-center cursor-pointer"
                    weather={weather}
                    onClick={onOpenWeatherSettings} />

            </section>
        </nav>
    );
}
export default Nav;