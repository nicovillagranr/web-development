// ================= CONTEXTO MODULO =================
// Orquestador principal del dispositivo simulado.
// Conecta hooks globales y controla apertura de cada pantalla de ajustes.
// ================= IMPORTS =================
import { useState } from "react";
import { useSettings } from "@features/time/hooks/useSettings.jsx";
import { useWeather } from "@features/weather/hooks/useWeather.jsx";
import { Screens } from "../Screens";
import s from "./Shell.module.css";
import TimeSettings from "@features/time/components/TimeSettings";
import WeatherSettings from "@features/weather/components/Settings/WeatherSettings.jsx";
import RecipePanel from "@features/inventory/components/RecipePanel";
import SpotifySettings from "@features/spotify/components/SpotifySettings.jsx";


// Shell simula el hardware del dispositivo (refrigerador inteligente). Contiene la interfaz con estilo de pantalla real y maneja la navegación entre paneles de ajustes mediante un estado local (activeScreen).


// ================= FUNCION =================
// Shell: helper/componente interno; parametros: 
export function Shell() {

    // Hook: estado local del componente
    const [activeScreen, setActiveScreen] = useState(null);
    const settings = useSettings();
    const weatherState = useWeather(settings.weather);
    const weatherData = weatherState.weather;

    // Render/retorno del bloque actual
    return (
        <section className={s.shell}>

            {/* Pantallas de Home y Ajustes */}
            <Screens
                autoTime={settings.autoTime}
                manualDate={settings.manualDate}
                is24hFormat={settings.is24hFormat}
                weather={weatherData}
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
            />
        </section>
    )
}