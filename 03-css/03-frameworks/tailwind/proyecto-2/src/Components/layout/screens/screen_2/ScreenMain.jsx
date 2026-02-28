// ================= IMPORTS =================
import Header from "../../header/Header.jsx";

// ================= COMPONENT =================
function ScreenMain({
    autoTime,
    manualDate,
    is24hFormat,
    weather,
    onOpenTimeSettings,
    onOpenWeatherSettings,
    onOpenInventorySettings,
    onOpenMusicSettings,
}) {
    // Render/retorno del bloque actual
    return (
        <Header
            autoTime={autoTime}
            manualDate={manualDate}
            is24hFormat={is24hFormat}
            weather={weather}
            onOpenTimeSettings={onOpenTimeSettings}
            onOpenWeatherSettings={onOpenWeatherSettings}
            onOpenInventorySettings={onOpenInventorySettings}
            onOpenMusicSettings={onOpenMusicSettings}
            showTopBar={false}
        />
    );
}

export default ScreenMain;
