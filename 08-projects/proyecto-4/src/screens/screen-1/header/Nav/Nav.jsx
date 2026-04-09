// ================= CONTEXTO MODULO =================
// Grid de tarjetas de navegacion rapida (receta, tiempo, clima, spotify).
// ================= IMPORTS =================
import CardRecipe from "../../widgets/CardRecipe";
import CardTime from "../../widgets/CardTime";
import { CardWeather } from "../../widgets/CardWeather";
import CardSpotify from "../../widgets/CardSpotify";
import s from "./Nav.module.css";

// Orden fijo de slots en el grid (col-span/row-span por posicion)
const SLOT_CLASSES = [
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
];

// ================= COMPONENT =================
// Nav: parametros: { time, weather, onOpenTimeSettings, onOpenWeatherSettings, onOpenRecipeSettings, onOpenSpotifySettings }
function Nav({
    time,
    weather,
    onOpenTimeSettings,
    onOpenWeatherSettings,
    onOpenRecipeSettings,
    onOpenSpotifySettings,
}) {
    const cards = [
        { id: "inventory", Component: CardRecipe,  props: {},          onOpen: onOpenRecipeSettings  },
        { id: "time",      Component: CardTime,    props: { time },    onOpen: onOpenTimeSettings    },
        { id: "weather",   Component: CardWeather, props: { weather }, onOpen: onOpenWeatherSettings },
        { id: "spotify",   Component: CardSpotify, props: {},          onOpen: onOpenSpotifySettings },
    ];

    return (
        <nav className={s.nav}>
            <section className={s.nav__grid}>
                {cards.map((card, slotIndex) => (
                    <div key={card.id} className={SLOT_CLASSES[slotIndex]}>
                        <card.Component
                            {...card.props}
                            onClick={card.onOpen}
                            className="w-full h-full"
                        />
                    </div>
                ))}
            </section>
        </nav>
    );
}
export default Nav;
