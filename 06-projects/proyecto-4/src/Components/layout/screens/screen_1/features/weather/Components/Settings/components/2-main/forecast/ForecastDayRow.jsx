// ================= IMPORTS =================
import { WeatherIcon } from "../../../../weatherIcon.jsx";
import TemperatureRangeBar from "../shared/TemperatureRangeBar.jsx";
import { formatWeekdayShortESCL } from "../../../utils/formatDay.esCL.js";
import { getRangeBarStyle, getValuePercent } from "../../../utils/forecastMath.js";

// ================= COMPONENTE/FUNCION =================
// ForecastDayRow: punto de entrada; recibe props/parametros: { day, globalMin, globalMax, isToday = false, currentTemperature = null }
export default function ForecastDayRow({
    day,
    globalMin,
    globalMax,
    isToday = false,
    currentTemperature = null,
}) {
    // Texto corto del dia (ej: Lun, Mar, Mie).
    const formattedDay = formatWeekdayShortESCL(day.date);

    // Estilo de rango [min-max] dentro de la escala global del forecast.
    const barStyle = getRangeBarStyle({
        min: day.min,
        max: day.max,
        globalMin,
        globalMax,
    });

    // Marker solo para la fila de hoy.
    const currentTempMarkerPercent = isToday
        ? getValuePercent({ value: currentTemperature, globalMin, globalMax })
        : null;

    return (
        <div className="flex items-center justify-between border-b border-white/10 last:border-b-0">
            {/* Columna 1: nombre del dia */}
            <span className="w-20 text-base font-medium opacity-90">{formattedDay}</span>

            {/* Columna 2: icono meteo del dia */}
            <WeatherIcon code={day.code} size={50} />

            {/* Columna 3: min / rango / max */}
            <div className="flex items-center gap-3 w-50 justify-end">
                <span className="text-sm font-medium w-8 text-right">{day.min}°</span>
                <TemperatureRangeBar style={barStyle} markerPercent={currentTempMarkerPercent} />
                <span className="text-sm font-medium w-8">{day.max}°</span>
            </div>
        </div>
    );
}
