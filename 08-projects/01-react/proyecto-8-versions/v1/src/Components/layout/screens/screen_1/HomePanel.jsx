// ================= CONTEXTO MODULO =================
// Pantalla principal del dashboard.
// Compone header interactivo y el formulario principal de inventario.
// ================= IMPORTS =================
import Header from "@screen1/header/Header.jsx";
import InventoryMainForm from "@screen1/main/inventory/Components/InventoryMainForm.jsx";

// ================= COMPONENT =================
function HomePanel({
    autoTime,
    manualDate,
    is24hFormat,
    weather,
    onOpenTimeSettings,
    onOpenWeatherSettings,
    onOpenRecipeSettings,
}) {
    return (
        <div className="h-full flex flex-col">
            <Header
                autoTime={autoTime}
                manualDate={manualDate}
                is24hFormat={is24hFormat}
                weather={weather}
                onOpenTimeSettings={onOpenTimeSettings}
                onOpenWeatherSettings={onOpenWeatherSettings}
                onOpenRecipeSettings={onOpenRecipeSettings}
                showTopBar={false}
            />

            <div className="px-4 pb-4 flex-1 min-h-0">
                <InventoryMainForm />
            </div>
        </div>
    );
}
export default HomePanel;
