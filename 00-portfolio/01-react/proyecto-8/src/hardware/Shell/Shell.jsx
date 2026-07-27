// ================= CONTEXTO MODULO =================
// Orquestador principal del dispositivo simulado.
// Conecta hooks globales y controla apertura de cada pantalla de ajustes.
// ================= IMPORTS =================
import { useState } from "react";
import { useSettings } from "@features/time/hooks/useSettings.jsx";
import { useWeather } from "@features/weather/hooks/useWeather.jsx";
import { Screens } from "../Screens";
import TimeSettings from "@features/time/components/TimeSettings";
import WeatherSettings from "@features/weather/components/Settings/WeatherSettings.jsx";
import RecipePanel from "@features/inventory/components/RecipePanel";
import SpotifySettings from "@features/spotify/components/SpotifySettings.jsx";

// ================= FUNCION =================
export function Shell() {
    const [activeScreen, setActiveScreen] = useState(null);
    const settings = useSettings();
    const weatherState = useWeather(settings.weather);
    const weatherData = weatherState.weather;

    return (
        <section className="relative w-120 h-dvh min-h-svh bg-dark overflow-hidden">

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
                weather={weatherData}
                weatherState={weatherState}
                setWeather={settings.setWeather}
            />

            <RecipePanel
                isActive={activeScreen === "recipe"}
                onBack={() => setActiveScreen(null)}
            />

            <SpotifySettings
                isActive={activeScreen === "spotify"}
                onBack={() => setActiveScreen(null)}
            />
        </section>
    );
}
