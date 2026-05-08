// ================= CONTEXTO MODULO =================
// Grid de tarjetas de navegacion rapida (receta, tiempo, clima).
// ================= IMPORTS =================
import CardRecipe from "../widgets/CardRecipe.jsx";
import CardTime from "../widgets/CardTime.jsx";
import CardWeather from "../widgets/CardWeather.jsx";

// Orden fijo de slots en el grid (col-span/row-span por posicion)
const SLOT_CLASSES = [
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
];

// ================= COMPONENT =================
// Nav: parametros: { time, weather, onOpenTimeSettings, onOpenWeatherSettings, onOpenRecipeSettings }
function Nav({
    time,
    weather,
    onOpenTimeSettings,
    onOpenWeatherSettings,
    onOpenRecipeSettings,
}) {
    const cards = [
        { id: "inventory", Component: CardRecipe, props: {},         onOpen: onOpenRecipeSettings  },
        { id: "time",      Component: CardTime,   props: { time },   onOpen: onOpenTimeSettings    },
        { id: "weather",   Component: CardWeather, props: { weather }, onOpen: onOpenWeatherSettings },
    ];

    return (
        <nav className="w-full">
            <section className="grid grid-cols-2 grid-rows-2 gap-3 w-full h-35">
                {cards.map(({ id, Component, props, onOpen }, slotIndex) => (
                    <div key={id} className={SLOT_CLASSES[slotIndex]}>
                        <Component
                            {...props}
                            onClick={onOpen}
                            className="w-full h-full"
                        />
                    </div>
                ))}
            </section>
        </nav>
    );
}
export default Nav;
