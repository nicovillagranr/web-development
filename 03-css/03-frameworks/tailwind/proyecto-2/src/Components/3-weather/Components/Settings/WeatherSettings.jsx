// Hook de React para manejar estado interno
import { useState } from "react";

// Ícono para botón volver
import { FiX } from "react-icons/fi";

// Utilidades propias del proyecto
import { parseWeather } from "../../utils/weatherParser.js";
import { getWeatherGradient } from "../../utils/getWeatherGradient.js";

// Componente que renderiza el ícono según código meteorológico
import { WeatherIcon } from "../weatherIcon.jsx";

// Componente de cabecera de configuración
import SettingsHeader from "../../../4-ui/SettingsHeader.jsx";

// Componentes específicos de clima
import HourlyForecast from "./HourlyForecast.jsx"


// ================= COMPONENTE PRINCIPAL =================

function WeatherSettings({ isActive, onBack, weather }) {

    // Estado que controla si el panel completo (6 días) está abierto
    const [isFullOpen, setIsFullOpen] = useState(false);

    // Si no hay datos de clima, no renderizamos nada
    if (!weather) return null;

    // Parseamos el código meteorológico si existe
    const parsedWeather =
        weather.code !== undefined ? parseWeather(weather.code) : null;

    // Generamos el gradiente dinámico según categoría e intensidad
    const gradient = parsedWeather
        ? getWeatherGradient(parsedWeather.category, parsedWeather.intensity)
        : "bg-gradient-to-br from-slate-600 to-slate-800";

    // Diccionario simple para traducir categorías
    const weatherTranslations = {
        clear: "Despejado",
        rain: "Lluvia",
        cloudy: "Nublado",
        snow: "Nieve",
        thunderstorm: "Tormenta",
        fog: "Niebla",
        mist: "Neblina",
        drizzle: "Llovizna",
    };

    return (
        <section className={`absolute inset-0 z-20 flex flex-col text-white transition-transform duration-500 ease-out ${gradient} ${isActive ? "translate-x-0" : "-translate-x-full"}`}>

            <SettingsHeader title="Clima y pronóstico" onBack={onBack} />


            <div className="flex-1 overflow-y-auto overscroll-contain pb-6 no-scrollbar">
                <CurrentWeather
                    weather={weather}
                    parsedWeather={parsedWeather}
                    translations={weatherTranslations}
                />

                <Forecast
                    forecast={weather.forecast}
                    onOpenFull={() => setIsFullOpen(true)}
                />

                <HourlyForecast hours={weather.hourly} />
            </div>

            <FullForecastPanel
                forecast={weather.forecast}
                isOpen={isFullOpen}
                onClose={() => setIsFullOpen(false)}
            />
        </section>
    );
}

export default WeatherSettings;




// ================= CLIMA ACTUAL =================
function CurrentWeather({ weather, parsedWeather, translations }) {
    return (
        <div className="flex flex-col mt-6 px-6">

            {/* Ciudad y país */}
            <h2 className="text-3xl font-medium">
                {weather.city} de {weather.country}
            </h2>

            {/* Temperatura principal */}
            <h3 className="text-8xl font-thin leading-none">
                {weather.temperature}°
            </h3>

            {/* Estado del clima + rango */}
            {parsedWeather && (
                <p className="text-lg opacity-70 capitalize mt-2">
                    {translations[
                        parsedWeather.category.toLowerCase()
                    ] || parsedWeather.category}{" "}
                    {weather.max}° / {weather.min}°
                </p>
            )}
        </div>
    );
}



// ================= FORECAST PRINCIPAL (3 DÍAS) =================

function Forecast({ forecast, onOpenFull }) {

    if (!forecast) return null;

    // Calculamos el mínimo y máximo global de toda la semana
    const globalMin = Math.min(...forecast.map(d => d.min));
    const globalMax = Math.max(...forecast.map(d => d.max));

    return (
        <div className="px-4 mt-8">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl px-5 py-3">

                {/* Header del contenedor */}
                <p className="text-sm opacity-80 mt-2">Pronóstico de 5 días</p>

                {/* Renderizamos solo los primeros 3 días */}
                {forecast.slice(0, 3).map((day, index) => (
                    <ForecastDay key={day.date || index} day={day} globalMin={globalMin} globalMax={globalMax} />
                ))}

                {/* Botón grande inferior */}
                <button onClick={onOpenFull} className="w-full mt-3 py-4 rounded-2xl  bg-white/10 backdrop-blur-md text-sm font-medium tracking-wide opacity-80">
                    Ver los próximos 5 días
                </button>
            </div>
        </div>
    );
}



// ================= PANEL COMPLETO (6 DÍAS) =================

function FullForecastPanel({ forecast, onClose, isOpen }) {

    const globalMin = Math.min(...forecast.map(d => d.min));
    const globalMax = Math.max(...forecast.map(d => d.max));

    return (
        <div
            className={`absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-300
            ${isOpen ? "bg-black/40 backdrop-blur-md opacity-100" : "opacity-0 pointer-events-none"}`}>

            <div className={`w-[90%] m-auto bg-slate-900 rounded-3xl p-5 transform transition-all duration-300 ease-out origin-center
                ${isOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90 pointer-events-none"}`}>

                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-medium">Pronóstico de 5 días</h2>
                    <button onClick={onClose} className="text-md">
                        <FiX className="w-7 h-7" />
                    </button>
                </div>

                {forecast.slice(1, 6).map((day, index) => (
                    <ForecastDay
                        key={index}
                        day={day}
                        globalMin={globalMin}
                        globalMax={globalMax}
                    />
                ))}
            </div>
        </div >
    );
}


// ================= FORECAST DAY =================

function ForecastDay({ day, globalMin, globalMax }) {

    // Nombre del día abreviado
    const dayName = new Date(day.date).toLocaleDateString("es-CL", {
        weekday: "short",
    });

    const formattedDay =
        dayName.charAt(0).toUpperCase() + dayName.slice(1);

    // Rango total semanal
    const range = globalMax - globalMin || 1;

    // Calculamos posición inicial proporcional
    const leftPercent =
        ((day.min - globalMin) / range) * 100;

    // Calculamos ancho proporcional
    const widthPercent =
        ((day.max - day.min) / range) * 100;

    return (
        <div className="flex items-center justify-between border-b border-white/10 last:border-b-0">

            {/* Día */}
            <span className="w-14 text-base font-medium opacity-90">{formattedDay}</span>

            {/* Ícono */}
            <WeatherIcon code={day.code} size={50} />

            {/* Temperaturas + barra proporcional */}
            <div className="flex items-center gap-3 w-40 justify-end">

                {/* Temperatura mínima */}
                <span className="text-sm font-medium w-8 text-right">{day.min}°</span>

                {/* Barra base */}
                <div className="relative h-2 w-20 rounded-full bg-white/20 overflow-hidden">
                    {/* Barra dinámica proporcional */}
                    <div className="absolute h-full bg-linear-to-r from-yellow-300 via-orange-400 to-red-400 rounded-full"
                        style={{
                            left: `${leftPercent}%`,
                            width: `${widthPercent}%`
                        }} />
                </div>

                {/* Temperatura máxima */}
                <span className="text-sm font-medium w-8">{day.max}°</span>
            </div>
        </div>
    );
}