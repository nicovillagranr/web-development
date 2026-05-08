// ================= CONTEXTO MODULO =================
// Header compuesto del dashboard (screen-1).
// Envuelve Nav dentro de un landmark <header> semantico.
// TopBar NO va aqui — vive en HomeScreens porque es compartido entre pantallas.
// ================= IMPORTS =================
import Nav from "./Nav";

// ================= COMPONENT =================
// Componente Header que recibe props para mostrar información y manejar eventos relacionados con el tiempo, clima, Spotify y configuraciones. Este componente se encarga de renderizar el Nav con la información proporcionada. Se exporta el componente para su uso en otras partes de la aplicación.
function Header({
    time,
    weather,
    onOpenTimeSettings,
    onOpenWeatherSettings,
    onOpenRecipeSettings,
    onOpenSpotifySettings,
}) {
    return (
        <header className="w-full flex flex-col py-2 gap-2">
            <Nav
                time={time}
                weather={weather}
                onOpenTimeSettings={onOpenTimeSettings}
                onOpenWeatherSettings={onOpenWeatherSettings}
                onOpenRecipeSettings={onOpenRecipeSettings}
                onOpenSpotifySettings={onOpenSpotifySettings}
            />
        </header>
    );
}
export default Header;
