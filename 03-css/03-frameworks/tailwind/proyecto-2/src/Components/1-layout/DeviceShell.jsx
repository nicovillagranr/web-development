import { useState } from "react";
import { useSettings } from "../2-time/useSettings.jsx";

import Header from "./Header.jsx";
import TimeSettings from "../2-time/TimeSettings.jsx";
import WeatherSettings from "../3-weather/weatherSettings.jsx";


// DeviceShell tiene como propósito simular el HardWare del dispositivo de salida, en este caso es un refrigerador inteligente, por lo que se encarga de contener la interfaz y darle un estilo acorde a un dispositivo real, con un fondo, bordes redondeados y una disposición de elementos que simula una pantalla de dispositivo. Además, maneja la lógica de navegación entre las diferentes pantallas (ajustes de tiempo y clima) utilizando un estado local para determinar qué pantalla mostrar en cada momento.

function DeviceShell() {

    const [activeScreen, setActiveScreen] = useState(null);

    const settings = useSettings();

    return (
        <section className="relative w-120 h-screen rounded-sm bg-[url('../../assets/images/fondo-1.jpg')] bg-cover bg-center overflow-hidden">

            <Header
                autoTime={settings.autoTime}
                manualDate={settings.manualDate}
                is24hFormat={settings.is24hFormat}
                weatherSettings={settings.weather}
                onOpenTimeSettings={() => setActiveScreen("time")}
                onOpenWeatherSettings={() => setActiveScreen("weather")}
            />

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

            <WeatherSettings
                isActive={activeScreen === "weather"}
                onBack={() => setActiveScreen(null)}
                weather={settings.weather}
                setWeather={settings.setWeather}
            />
        </section>
    );
}

export default DeviceShell;
