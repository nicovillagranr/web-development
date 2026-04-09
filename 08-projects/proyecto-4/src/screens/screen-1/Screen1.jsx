// Import de Header sólo usado en esta pantalla
import Header from "@screen1/header/Header.jsx";
// Import de InventoryMainForm sólo usado en esta pantalla
import InventoryMainForm from "@features/inventory/components/InventoryMainForm";

// Se crea componente Screen1 que recibe props para mostrar información y manejar eventos relacionados con el tiempo, clima, Spotify y configuraciones. Este componente se encarga de renderizar el Header con la información proporcionada y el InventoryMainForm para mostrar el inventario principal. Se exporta el componente para su uso en otras partes de la aplicación.
function Screen1({
    time,
    weather,
    onOpenTimeSettings,
    onOpenWeatherSettings,
    onOpenRecipeSettings,
    onOpenSpotifySettings,
}) {

    return (
        <div className="h-full flex flex-col px-4">
            <Header
                time={time}
                weather={weather}
                onOpenTimeSettings={onOpenTimeSettings}
                onOpenWeatherSettings={onOpenWeatherSettings}
                onOpenRecipeSettings={onOpenRecipeSettings}
                onOpenSpotifySettings={onOpenSpotifySettings}
            />

            <div className="h-[30%]">
                <InventoryMainForm />
            </div>
        </div>
    );
}
export default Screen1;
