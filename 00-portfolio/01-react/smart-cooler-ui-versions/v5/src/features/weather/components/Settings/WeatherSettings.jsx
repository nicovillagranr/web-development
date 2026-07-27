// ================= IMPORTS =================
import { useCallback, useState } from "react";
import { useEscapeKey } from "@hooks/useEscapeKey.jsx";

// Utilidades de dominio clima.
import { parseWeather } from "../../utils/weatherParser.js";
import { getWeatherGradient } from "../../utils/getWeatherGradient.js";

// Bloques UI reutilizables.
import SettingsHeader from "@ui/SettingsHeader.jsx";
import WeatherSettingsShell from "./layout/WeatherSettingsShell.jsx";

// Secciones internas del modulo weather settings.
import CurrentWeatherCard from "./components/1-header/CurrentWeatherCard.jsx";
import ForecastPreviewCard from "./components/2-main/forecast/ForecastPreviewCard";
import FullForecastModal from "./components/2-main/forecast/FullForecastModal";
import HourlyForecast from "./components/2-main/hourly/HourlyForecast.jsx";
import WeatherQuickGrid from "./components/3-footer/WeatherQuickGrid.jsx";
import s from "./WeatherSettings.module.css";

// ================= COMPONENTE/FUNCION =================
// WeatherSettings: punto de entrada; recibe props/parametros: { isActive, onBack, weather, weatherState }
export default function WeatherSettings({
    isActive,
    onBack,
    weather,
    weatherState,
}) {
    // Estado local para abrir/cerrar modal de pronostico completo.
    const [isFullOpen, setIsFullOpen] = useState(false);

    const handleClose = useCallback(() => {
        setIsFullOpen(false);
        onBack?.();
    }, [onBack]);

    useEscapeKey(isActive, handleClose);

    // Estados derivados del hook useWeather para controlar UX.
    const isLoading = weatherState?.isLoading ?? false;
    const error = weatherState?.error ?? "";
    const retry = weatherState?.refresh;

    // Parseo defensivo para evitar errores cuando weather aun no llega.
    const parsedWeather =
        weather && weather.code !== undefined
            ? parseWeather(weather.code, weather.isDay)
            : null;

    // Seleccion dinamica del gradiente de fondo segun clima actual.
    const gradient = parsedWeather
        ? getWeatherGradient(
            parsedWeather.category,
            parsedWeather.intensity,
            parsedWeather.isDay,
        )
        : "bg-linear-to-br from-slate-600 via-slate-700 to-slate-800";

    return (
        <WeatherSettingsShell isActive={isActive} gradient={gradient}>
            {/* Header fijo del panel weather settings */}
            <SettingsHeader title="Clima y pronostico" onBack={handleClose} />

            {/* Contenedor scrollable de contenido */}
            <div className={`${s["weather-settings__scroll"]} no-scrollbar`}>
                {/* Estado 1: sin datos y cargando => skeleton */}
                {!weather && isLoading && (
                    <article className={s["weather-settings__skeleton"]}>
                        <p className={s["weather-settings__skeleton-text"]}>Cargando datos del clima...</p>
                        <div className={s["weather-settings__skeleton-bars"]}>
                            <div className={s["weather-settings__skeleton-bar--lg"]} />
                            <div className={s["weather-settings__skeleton-bar--md"]} />
                            <div className={s["weather-settings__skeleton-bar--xl"]} />
                        </div>
                    </article>
                )}

                {/* Estado 2: sin datos y con error => mensaje + boton retry */}
                {!weather && !!error && (
                    <article className={s["weather-settings__error-card"]}>
                        <p className={s["weather-settings__error-title"]}>No pudimos cargar el clima.</p>
                        <p className={s["weather-settings__error-detail"]}>{error}</p>
                        <button
                            type="button"
                            onClick={() => retry?.()}
                            className={s["weather-settings__retry-btn"]}
                        >
                            Reintentar
                        </button>
                    </article>
                )}

                {/* Estado 3: sin datos y sin loading/error => estado vacio */}
                {!weather && !isLoading && !error && (
                    <article className={s["weather-settings__empty-card"]}>
                        <p className={s["weather-settings__empty-text"]}>No hay datos de clima disponibles.</p>
                        <button
                            type="button"
                            onClick={() => retry?.()}
                            className={s["weather-settings__retry-btn"]}
                        >
                            Intentar nuevamente
                        </button>
                    </article>
                )}

                {/* Estado 4: hay datos validos => render completo del modulo */}
                {weather && (
                    <>
                        {/* Aviso no intrusivo mientras refresca datos */}
                        {isLoading && (
                            <div className={s["weather-settings__refreshing-banner"]}>
                                Actualizando datos del clima...
                            </div>
                        )}

                        {/* Aviso de error cuando se mantiene ultimo dato cacheado */}
                        {!!error && (
                            <div className={s["weather-settings__error-banner"]}>
                                <span>Error de actualizacion. Mostrando ultimo dato valido.</span>
                                <button
                                    type="button"
                                    onClick={() => retry?.()}
                                    className={s["weather-settings__error-banner-btn"]}
                                >
                                    Reintentar
                                </button>
                            </div>
                        )}

                        {/* Seccion header clima actual */}
                        <CurrentWeatherCard weather={weather} parsedWeather={parsedWeather} />

                        {/* Seccion pronostico resumen + apertura modal completo */}
                        <ForecastPreviewCard
                            forecast={weather.forecast}
                            currentTemperature={weather.temperature}
                            onOpenFull={() => setIsFullOpen(true)}
                        />

                        {/* Seccion carrusel por hora */}
                        <HourlyForecast hours={weather.hourly} />

                        {/* Seccion metricas complementarias */}
                        <WeatherQuickGrid weather={weather} />
                    </>
                )}
            </div>

            {/* Modal pronostico extendido */}
            <FullForecastModal
                forecast={weather?.forecast ?? []}
                isOpen={isFullOpen}
                onClose={() => setIsFullOpen(false)}
            />
        </WeatherSettingsShell>
    );
}
