// Import de Card reutilizable
import CardRecipe from "../../4-ui/CardRecipe.jsx";
import CardTime from "../../4-ui/CardTime.jsx";
import CardWeather from "../../4-ui/CardWeather.jsx";

function Nav({ time, weather, onOpenTimeSettings, onOpenWeatherSettings }) {
    return (
        <nav className="w-full">
            <section className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-40">

                {/* Receta / Inventario */}
                <CardRecipe className="col-span-2 row-span-1 flex items-center justify-center" onClick={onOpenTimeSettings} />
                {/* Hora */}
                <CardTime className="col-span-1 row-span-1 flex items-center justify-center" time={time} onClick={onOpenTimeSettings} />
                {/* Clima */}
                <CardWeather className="col-span-1 row-span-1 flex items-center justify-center" weather={weather} onClick={onOpenWeatherSettings} />

            </section>
        </nav>
    );
}
export default Nav;