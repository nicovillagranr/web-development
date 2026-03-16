// ================= CONTEXTO MODULO =================
// Pantalla principal del dashboard.
// Compone header interactivo y el formulario principal de inventario.
// ================= IMPORTS =================
import Nav from "@screen1/header/Nav.jsx";
import InventoryMainForm from "@features/inventory/components/InventoryMainForm.jsx";

// ================= COMPONENT =================
function HomePanel({
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
    return (
        <div className="h-full flex flex-col">
            <header className="w-full flex flex-col px-4 py-2 gap-2">
                <Nav
                    time={time}
                    weather={weather}
                    spotify={spotify}
                    isSpotifyConnected={isSpotifyConnected}
                    spotifyState={spotifyState}
                    onOpenTimeSettings={onOpenTimeSettings}
                    onOpenWeatherSettings={onOpenWeatherSettings}
                    onOpenRecipeSettings={onOpenRecipeSettings}
                    onOpenSpotifySettings={onOpenSpotifySettings}
                />
            </header>

            <div className="px-4 pb-4 mt-2 h-[37%]">
                <InventoryMainForm />
            </div>
        </div>
    );
}
export default HomePanel;
