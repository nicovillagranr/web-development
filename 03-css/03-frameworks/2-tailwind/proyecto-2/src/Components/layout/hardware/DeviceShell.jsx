// ================= CONTEXTO MODULO =================
// Orquestador principal del dispositivo simulado.
// Conecta hooks globales y controla apertura de cada pantalla de ajustes.
// ================= IMPORTS =================
import { useState } from "react";
import { useSettings } from "@screen1/features/time/hooks/useSettings.jsx";
import { useWeather } from "@screen1/features/weather/hooks/useWeather.jsx";


import HomeScreens from "@shared/screens/HomeScreens.jsx";
import TimeSettings from "@screen1/features/time/Components/TimeSettings.jsx";
import WeatherSettings from "@screen1/features/weather/Components/Settings/WeatherSettings.jsx";
import InventorySettings from "@screen1/main/inventory/Components/InventorySettings.jsx";
import ShoppingListSettings from "@screen1/features/shopping/Components/ShoppingListSettings.jsx";


// DeviceShell tiene como propÃ³sito simular el HardWare del dispositivo de salida, en este caso es un refrigerador inteligente, por lo que se encarga de contener la interfaz y darle un estilo acorde a un dispositivo real, con un fondo, bordes redondeados y una disposiciÃ³n de elementos que simula una pantalla de dispositivo. AdemÃ¡s, maneja la lÃ³gica de navegaciÃ³n entre las diferentes pantallas (ajustes de tiempo y clima) utilizando un estado local para determinar quÃ© pantalla mostrar en cada momento.


// ================= FUNCION =================
// DeviceShell: helper/componente interno; parametros: 
function DeviceShell() {

    // Hook: estado local del componente
    const [activeScreen, setActiveScreen] = useState(null);
    const settings = useSettings();
    const weatherState = useWeather(settings.weather);
    const weatherData = weatherState.weather;

    // Render/retorno del bloque actual
    return (
        <section className="relative w-120 h-dvh min-h-svh rounded-sm bg-[url('../../assets/images/fondo-1.jpg')] bg-cover bg-center overflow-hidden">

            {/* Pantallas de Home y Ajustes */}
            <HomeScreens
                autoTime={settings.autoTime}
                manualDate={settings.manualDate}
                is24hFormat={settings.is24hFormat}
                weather={weatherData}
                onOpenTimeSettings={() => setActiveScreen("time")}
                onOpenWeatherSettings={() => setActiveScreen("weather")}
                onOpenInventorySettings={() => setActiveScreen("inventory")}
                onOpenShoppingSettings={() => setActiveScreen("shopping")}
            />

            {/* Ajustes de fecha y hora  del Refrigerador */}
            <TimeSettings
                isActive={activeScreen === "time"}
                onBack={() => setActiveScreen(null)}
                autoTime={settings.autoTime}
                setAutoTime={settings.setAutoTime}
                is24hFormat={settings.is24hFormat}
                setIs24hFormat={settings.setIs24hFormat}
                manualDate={settings.manualDate}
                setManualDate={settings.setManualDate}
            />

            {/* Pantalla que nos muestra los datos climáticos de Santiago de Chile */}
            <WeatherSettings
                isActive={activeScreen === "weather"}
                onBack={() => setActiveScreen(null)}
                weather={weatherData}
                weatherState={weatherState}
                setWeather={settings.setWeather}
            />

            {/* Sistema de inventario de alimentos */}
            <InventorySettings
                isActive={activeScreen === "inventory"}
                onBack={() => setActiveScreen(null)}
            />

            {/* Pantalla que nos muestra sugerencias para nuestra próxima compra */}
            <ShoppingListSettings
                isActive={activeScreen === "shopping"}
                onBack={() => setActiveScreen(null)}
            />
        </section>
    )
}
export default DeviceShell;
