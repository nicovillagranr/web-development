// ================= CONTEXTO MODULO =================
// Orquestador principal del dispositivo simulado.
// Conecta hooks globales y controla apertura de cada pantalla de ajustes.
// ================= IMPORTS =================
import { useState } from "react";
import { useSettings } from "@features/time/hooks/useSettings.jsx";
import { useWeather } from "@features/weather/hooks/useWeather.jsx";
import { useSpotify } from "@features/spotify/hooks/useSpotify.jsx";

import HomeScreens from "@shell/HomeScreens.jsx";
import TimeSettings from "@features/time/components/TimeSettings.jsx";
import WeatherSettings from "@features/weather/components/Settings/WeatherSettings.jsx";
import RecipePanel from "@features/inventory/components/RecipePanel.jsx";
import SpotifySettings from "@features/spotify/components/SpotifySettings.jsx";


// DeviceShell tiene como propÃ³sito simular el HardWare del dispositivo de salida, en este caso es un refrigerador inteligente, por lo que se encarga de contener la interfaz y darle un estilo acorde a un dispositivo real, con un fondo, bordes redondeados y una disposiciÃ³n de elementos que simula una pantalla de dispositivo. AdemÃ¡s, maneja la lÃ³gica de navegaciÃ³n entre las diferentes pantallas (ajustes de tiempo y clima) utilizando un estado local para determinar quÃ© pantalla mostrar en cada momento.


// ================= FUNCION =================
// DeviceShell: helper/componente interno; parametros: 
function DeviceShell() {

    // Hook: estado local del componente
    const [activeScreen, setActiveScreen] = useState(null);
    const settings        = useSettings();
    const weatherState    = useWeather(settings.weather);
    const weatherData     = weatherState.weather;
    const spotifyState = useSpotify();

    // Render/retorno del bloque actual
    return (
        <section className="relative w-120 h-dvh min-h-svh bg-dark overflow-hidden">

            {/* Pantallas de Home y Ajustes */}
            <HomeScreens
                autoTime={settings.autoTime}
                manualDate={settings.manualDate}
                is24hFormat={settings.is24hFormat}
                weather={weatherData}
                spotify={spotifyState.spotify}
                isSpotifyConnected={spotifyState.isConnected}
                spotifyState={spotifyState}
                onOpenTimeSettings={() => setActiveScreen("time")}
                onOpenWeatherSettings={() => setActiveScreen("weather")}
                onOpenRecipeSettings={() => setActiveScreen("recipe")}
                onOpenSpotifySettings={() => setActiveScreen("spotify")}
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

            {/* Panel de recetas: detalle con categorías, ingredientes y pasos */}
            <RecipePanel
                isActive={activeScreen === "recipe"}
                onBack={() => setActiveScreen(null)}
            />

            {/* Panel de Spotify: conexión OAuth y controles de reproducción */}
            <SpotifySettings
                isActive={activeScreen === "spotify"}
                onBack={() => setActiveScreen(null)}
                spotifyState={spotifyState}
            />

        </section>
    )
}
export default DeviceShell;
