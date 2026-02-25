// ================= IMPORTS =================
import { useState } from "react";

import { parseWeather } from "../../utils/weatherParser.js";
import { getWeatherGradient } from "../../utils/getWeatherGradient.js";

import SettingsHeader from "../../../../components/ui/SettingsHeader.jsx";
import HourlyForecast from "./components/HourlyForecast.jsx";
import WeatherQuickGrid from "./components/WeatherQuickGrid.jsx";

import WeatherSettingsShell from "./layout/WeatherSettingsShell.jsx";
import CurrentWeatherCard from "./components/CurrentWeatherCard.jsx";
import ForecastPreviewCard from "./components/ForecastPreviewCard.jsx";
import FullForecastModal from "./components/FullForecastModal.jsx";


// ================= COMPONENTE/FUNCION =================
// WeatherSettings: punto de entrada; recibe props/parametros: { isActive, onBack, weather }
export default function WeatherSettings({ isActive, onBack, weather }) {
    // Hook: estado local del componente
    const [isFullOpen, setIsFullOpen] = useState(false);

    const parsedWeather =
        weather && weather.code !== undefined
            ? parseWeather(weather.code)
            : null;

    const gradient = parsedWeather
        ? getWeatherGradient(parsedWeather.category, parsedWeather.intensity)
        : "bg-gradient-to-br from-slate-600 to-slate-800";

    if (!weather) return null;

    // Render/retorno del bloque actual
    return (
        <WeatherSettingsShell isActive={isActive} gradient={gradient}>
            <SettingsHeader title="Clima y pronóstico" onBack={onBack} />

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pb-[calc(env(safe-area-inset-bottom)+1.5rem)] no-scrollbar">
                <CurrentWeatherCard weather={weather} parsedWeather={parsedWeather} />

                <ForecastPreviewCard
                    forecast={weather.forecast}
                    onOpenFull={() => setIsFullOpen(true)}
                />

                <HourlyForecast hours={weather.hourly} />
                <WeatherQuickGrid weather={weather} />
            </div>

            <FullForecastModal
                forecast={weather.forecast}
                isOpen={isFullOpen}
                onClose={() => setIsFullOpen(false)}
            />
        </WeatherSettingsShell>
    );
}
