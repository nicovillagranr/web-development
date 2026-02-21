import { FiChevronLeft } from "react-icons/fi";
import { parseWeather } from "../utils/weatherParser.js";
import { getWeatherGradient } from "../utils/getWeatherGradient.js";
import { WeatherIcon } from "./weatherIcon.jsx";

function WeatherSettings({ isActive, onBack, weather }) {
    if (!weather) return null;

    const parsedWeather =
        weather.code !== undefined
            ? parseWeather(weather.code)
            : null;

    const gradient =
        parsedWeather
            ? getWeatherGradient(parsedWeather.category, parsedWeather.intensity)
            : "bg-gradient-to-br from-slate-600 to-slate-800";

    return (
        <section className={`absolute inset-0 z-20 py-4 flex flex-col text-white transition-transform duration-500 ease-out ${gradient} ${isActive ? "translate-x-0" : "-translate-x-full"}`}>
            {/* ================= HEADER ================= */}
            <Header onBack={onBack} />

            {/* ================= Clima Actual ================= */}
            <CurrentWeather weather={weather} parsedWeather={parsedWeather} />

            {/* ================= Pronóstico ================= */}
            <Forecast forecast={weather.forecast} />
        </section>
    );
}

export default WeatherSettings;

/* ===================== COMPONENTS INTERNOS ===================== */

function Header({ onBack }) {
    return (
        <header className="h-14 flex items-center px-4">
            <button
                type="button"
                onClick={onBack}
                aria-label="Volver"
                className="w-8 h-8 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
                <FiChevronLeft size={20} />
            </button>
            <h1 className="ml-4 text-lg font-medium pointer-events-none">Clima y pronóstico</h1>
        </header>
    );
}

function CurrentWeather({ weather, parsedWeather }) {
    return (
        <div className="flex flex-col mt-6 px-4">
            <h2 className="text-2xl font-medium">
                {weather.city} de {weather.country}
            </h2>
            <h3 className="text-7xl font-thin leading-none">{weather.temperature}°</h3>
            {parsedWeather && (
                <p className="text-lg opacity-80 capitalize">
                    {parsedWeather.category} {weather.max}° / {weather.min}°
                </p>
            )}
        </div>
    );
}

function Forecast({ forecast }) {
    if (!forecast) return null;

    return (
        <div className="px-4 mt-6">
            <div className="backdrop-blur-md bg-white/20 rounded-2xl p-4 shadow-lg">
                <p className="text-sm opacity-80 mb-4">Pronóstico para los próximos días</p>
                <div className="space-y-4">
                    {forecast.slice(0, 6).map((day, index) => (
                        <ForecastDay key={day.date || index} day={day} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ForecastDay({ day }) {
    const dayName = new Date(day.date).toLocaleDateString("es-CL", {
        weekday: "short",
    });
    const formattedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <span className="w-14 text-sm">{formattedDay}</span>
                <WeatherIcon code={day.code} size={28} />
            </div>
            <span className="text-sm opacity-90">
                {day.min}° — {day.max}°
            </span>
        </div>
    );
}