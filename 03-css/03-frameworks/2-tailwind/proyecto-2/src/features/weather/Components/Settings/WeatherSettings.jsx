// ================= IMPORTS =================
import { useState } from "react";

import { parseWeather } from "../../utils/weatherParser.js";
import { getWeatherGradient } from "../../utils/getWeatherGradient.js";

import SettingsHeader from "../../../../Components/ui/settings/SettingsHeader.jsx";
import HourlyForecast from "./components/2-main/hourly/HourlyForecast.jsx";
import WeatherQuickGrid from "./components/3-footer/WeatherQuickGrid.jsx";

import WeatherSettingsShell from "./layout/WeatherSettingsShell.jsx";
import CurrentWeatherCard from "./components/1-header/CurrentWeatherCard.jsx";
import ForecastPreviewCard from "./components/2-main/forecast/ForecastPreviewCard.jsx";
import FullForecastModal from "./components/2-main/forecast/FullForecastModal.jsx";

// ================= COMPONENTE/FUNCION =================
// WeatherSettings: punto de entrada; recibe props/parametros: { isActive, onBack, weather, weatherState }
export default function WeatherSettings({
    isActive,
    onBack,
    weather,
    weatherState,
}) {
    const [isFullOpen, setIsFullOpen] = useState(false);
    const isLoading = weatherState?.isLoading ?? false;
    const error = weatherState?.error ?? "";
    const retry = weatherState?.refresh;

    const parsedWeather =
        weather && weather.code !== undefined
            ? parseWeather(weather.code, weather.isDay)
            : null;

    const gradient = parsedWeather
        ? getWeatherGradient(
            parsedWeather.category,
            parsedWeather.intensity,
            parsedWeather.isDay,
        )
        : "bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800";

    return (
        <WeatherSettingsShell isActive={isActive} gradient={gradient}>
            <SettingsHeader title="Clima y pronostico" onBack={onBack} />

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pb-[calc(env(safe-area-inset-bottom)+5rem)] md:pb-[calc(env(safe-area-inset-bottom)+5rem)] no-scrollbar">
                {!weather && isLoading && (
                    <article className="mx-4 mt-4 rounded-3xl backdrop-blur-xl bg-white/10 p-4 text-white">
                        <p className="text-sm text-white/80">Cargando datos del clima...</p>
                        <div className="mt-3 space-y-2 animate-pulse">
                            <div className="h-6 w-28 bg-white/20 rounded-md" />
                            <div className="h-4 w-40 bg-white/15 rounded-md" />
                            <div className="h-20 w-full bg-white/10 rounded-2xl" />
                        </div>
                    </article>
                )}

                {!weather && !!error && (
                    <article className="mx-4 mt-4 rounded-3xl backdrop-blur-xl bg-rose-500/15 border border-rose-300/40 p-4 text-white">
                        <p className="text-sm font-medium">No pudimos cargar el clima.</p>
                        <p className="text-xs text-white/80 mt-1">{error}</p>
                        <button
                            type="button"
                            onClick={() => retry?.()}
                            className="mt-3 rounded-xl px-3 py-2 bg-white/20 hover:bg-white/30 transition-colors text-sm"
                        >
                            Reintentar
                        </button>
                    </article>
                )}

                {!weather && !isLoading && !error && (
                    <article className="mx-4 mt-4 rounded-3xl backdrop-blur-xl bg-white/10 p-4 text-white">
                        <p className="text-sm">No hay datos de clima disponibles.</p>
                        <button
                            type="button"
                            onClick={() => retry?.()}
                            className="mt-3 rounded-xl px-3 py-2 bg-white/20 hover:bg-white/30 transition-colors text-sm"
                        >
                            Intentar nuevamente
                        </button>
                    </article>
                )}

                {weather && (
                    <>
                        {isLoading && (
                            <div className="mx-4 mt-4 rounded-xl bg-white/10 px-3 py-2 text-xs text-white/85">
                                Actualizando datos del clima...
                            </div>
                        )}

                        {!!error && (
                            <div className="mx-4 mt-2 rounded-xl bg-amber-500/20 border border-amber-200/40 px-3 py-2 text-xs text-amber-50 flex items-center justify-between gap-2">
                                <span>Error de actualizacion. Mostrando ultimo dato valido.</span>
                                <button
                                    type="button"
                                    onClick={() => retry?.()}
                                    className="shrink-0 rounded-lg bg-white/20 px-2 py-1 hover:bg-white/30 transition-colors"
                                >
                                    Reintentar
                                </button>
                            </div>
                        )}

                        <CurrentWeatherCard weather={weather} parsedWeather={parsedWeather} />

                        <ForecastPreviewCard
                            forecast={weather.forecast}
                            currentTemperature={weather.temperature}
                            onOpenFull={() => setIsFullOpen(true)}
                        />

                        <HourlyForecast hours={weather.hourly} />
                        <WeatherQuickGrid weather={weather} />
                    </>
                )}
            </div>

            <FullForecastModal
                forecast={weather?.forecast ?? []}
                isOpen={isFullOpen}
                onClose={() => setIsFullOpen(false)}
            />
        </WeatherSettingsShell>
    );
}




