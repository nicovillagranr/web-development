// ================= CONTEXTO MODULO =================
// Grid de tarjetas de navegacion rapida (receta, tiempo, clima, spotify).
// ================= IMPORTS =================
import CardRecipe from "../widgets/CardRecipe.jsx";
import CardTime from "../widgets/CardTime.jsx";
import CardWeather from "../widgets/CardWeather.jsx";
import CardSpotify from "../widgets/CardSpotify.jsx";

// Orden fijo de slots en el grid (col-span/row-span por posicion)
const SLOT_CLASSES = [
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
];

// ================= COMPONENT =================
// Nav: parametros: { time, weather, spotify, isSpotifyConnected, spotifyState, onOpenTimeSettings, onOpenWeatherSettings, onOpenRecipeSettings, onOpenSpotifySettings }
function Nav({
    time,
    weather,
    spotify,
    isSpotifyConnected,
    spotifyState,
    onOpenTimeSettings,
    onOpenWeatherSettings,
    onOpenRecipeSettings,
    onOpenSpotifySettings,
}) {
    const cards = [
        { id: "inventory", Component: CardRecipe,  props: {},          onOpen: onOpenRecipeSettings  },
        { id: "time",      Component: CardTime,    props: { time },    onOpen: onOpenTimeSettings    },
        { id: "weather",   Component: CardWeather, props: { weather }, onOpen: onOpenWeatherSettings },
        {
            id: "spotify",
            Component: CardSpotify,
            props: {
                isConnected:      isSpotifyConnected,
                spotify,
                onTogglePlayPause: spotifyState?.togglePlayPause,
                onSkipNext:        spotifyState?.skipNext,
                onSkipPrev:        spotifyState?.skipPrev,
            },
            onOpen: onOpenSpotifySettings,
        },
    ];

    return (
        <nav className="w-full">
            <section className="grid grid-cols-2 grid-rows-3 gap-3 w-full h-52">
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
