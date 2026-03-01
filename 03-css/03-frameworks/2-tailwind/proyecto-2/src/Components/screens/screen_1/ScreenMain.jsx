// ================= IMPORTS =================
import Header from "../../layout/header/Header.jsx";
import InventoryMainForm from "../../layout/main/inventory/Components/InventoryMainForm.jsx";

// ================= COMPONENT =================
function ScreenMain({
    autoTime,
    manualDate,
    is24hFormat,
    weather,
    onOpenTimeSettings,
    onOpenWeatherSettings,
    onOpenInventorySettings,
    onOpenShoppingSettings,
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
                onOpenInventorySettings={onOpenInventorySettings}
                onOpenShoppingSettings={onOpenShoppingSettings}
                showTopBar={false}
                className="shrink-0"
            />

            <div className="px-4 pb-4 flex-1 min-h-0">
                <InventoryMainForm />
            </div>
        </div>
    );
}

export default ScreenMain;
