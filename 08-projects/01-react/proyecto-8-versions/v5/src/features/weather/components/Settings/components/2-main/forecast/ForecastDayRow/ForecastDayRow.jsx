// ================= IMPORTS =================
import { WeatherIcon } from "../../../../../weatherIcon.jsx";
import TemperatureRangeBar from "../../shared/TemperatureRangeBar.jsx";
import { formatWeekdayShortESCL } from "../../../../utils/formatDay.esCL.js";
import { getRangeBarStyle, getValuePercent } from "../../../../utils/forecastMath.js";
import s from "./ForecastDayRow.module.css";

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
        <div className={s["forecast-row"]}>
            {/* Columna 1: nombre del dia */}
            <span className={s["forecast-row__day"]}>{formattedDay}</span>

            {/* Columna 2: icono meteo del dia */}
            <WeatherIcon code={day.code} size={50} />

            {/* Columna 3: min / rango / max */}
            <div className={s["forecast-row__range"]}>
                <span className={`${s["forecast-row__temp"]} ${s["forecast-row__temp--min"]}`}>{day.min}°</span>
                <TemperatureRangeBar style={barStyle} markerPercent={currentTempMarkerPercent} />
                <span className={s["forecast-row__temp"]}>{day.max}°</span>
            </div>
        </div>
    );
}
