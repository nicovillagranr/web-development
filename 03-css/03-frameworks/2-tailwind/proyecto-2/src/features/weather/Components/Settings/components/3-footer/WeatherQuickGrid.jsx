import MetricCard from "./weather-quick-grid/cards/MetricCard.jsx";
import ProgressFooter from "./weather-quick-grid/cards/footers/ProgressFooter.jsx";
import PressureFooter from "./weather-quick-grid/cards/footers/PressureFooter.jsx";
import {
    getAqiMeta,
    getFeelsLikeMeta,
    getHumidityMeta,
    getPressureMeta,
    getUvDayMeta,
    getUvMeta,
} from "./weather-quick-grid/config/metricThresholds.js";
import { formatValue, normalizePercent } from "./weather-quick-grid/utils/metricFormatters.js";

// ================= COMPONENT =================
// WeatherQuickGrid: grid visual 2x3 con metricas actuales
function WeatherQuickGrid({ weather }) {
    const uv = weather?.metrics?.uvIndex ?? null;
    const humidity = weather?.metrics?.humidity ?? null;
    const feelsLike = weather?.metrics?.feelsLike ?? null;
    const pressure = weather?.metrics?.pressure ?? null;
    const aqi = weather?.metrics?.aqi ?? null;
    const uvDayScore = weather?.metrics?.uvDayScore ?? null;

    const uvMeta = getUvMeta(uv);
    const humidityMeta = getHumidityMeta(humidity);
    const feelsLikeMeta = getFeelsLikeMeta(feelsLike);
    const pressureMeta = getPressureMeta(pressure);
    const aqiMeta = getAqiMeta(aqi);
    const uvDayMeta = getUvDayMeta(uvDayScore);

    const uvPercent = normalizePercent(uv, 0, 11);
    const humidityPercent = normalizePercent(humidity, 0, 100);
    const feelsLikePercent = normalizePercent(feelsLike, -10, 45);
    const pressurePercent = normalizePercent(pressure, 980, 1040);
    const aqiPercent = normalizePercent(aqi, 0, 300);
    const uvDayScorePercent = normalizePercent(uvDayScore, 0, 60);

    return (
        // Contenedor de espaciado
        <div className="px-4 mt-4 mb-4">

            {/* Contenedor de metricas Grid */}
            <div className="grid grid-cols-2 gap-3">
                <MetricCard
                    label="Radiacion UV actual"
                    mobileLabel="Radiacion UV"
                    valueNode={<>{formatValue(uv, 1)}</>}
                    statusLabel={uvMeta.label}
                    statusTone={uvMeta.tone}
                    footer={<ProgressFooter percent={uvPercent} fillClass="bg-linear-to-r from-lime-300 via-yellow-300 to-rose-400" />}
                />

                <MetricCard
                    label="Humedad"
                    mobileLabel="Humedad"
                    valueNode={<>{formatValue(humidity)}{humidity !== null && humidity !== undefined ? "%" : ""}</>}
                    statusLabel={humidityMeta.label}
                    statusTone={humidityMeta.tone}
                    footer={<ProgressFooter percent={humidityPercent} fillClass="bg-linear-to-r from-sky-300 via-cyan-300 to-blue-400" />}
                />

                <MetricCard
                    label="Temperatura percibida"
                    mobileLabel="Temp. percibida"
                    valueNode={<>{formatValue(feelsLike)}{feelsLike !== null && feelsLike !== undefined ? "\u00B0" : ""}</>}
                    statusLabel={feelsLikeMeta.label}
                    statusTone={feelsLikeMeta.tone}
                    footer={<ProgressFooter percent={feelsLikePercent} fillClass="bg-linear-to-r from-cyan-300 via-lime-300 to-rose-400" />}
                />

                <MetricCard
                    label="Presion del aire"
                    mobileLabel="Presion aire"
                    valueNode={<>{formatValue(pressure)}{pressure !== null && pressure !== undefined ? " hPa" : ""}</>}
                    statusLabel={pressureMeta.label}
                    statusTone={pressureMeta.tone}
                    footer={<PressureFooter percent={pressurePercent} />}
                />

                <MetricCard
                    label="Calidad del aire"
                    mobileLabel="Calidad aire"
                    valueNode={<>{formatValue(aqi)}{aqi !== null && aqi !== undefined ? " pts" : ""}</>}
                    statusLabel={aqiMeta.label}
                    statusTone={aqiMeta.tone}
                    footer={<ProgressFooter percent={aqiPercent} fillClass="bg-linear-to-r from-emerald-300 via-yellow-300 via-orange-300 to-rose-400" />}
                />

                <MetricCard
                    label="Riesgo UV diario"
                    mobileLabel="UV diario"
                    valueNode={
                        <>
                            {formatValue(uvDayScore, 1)}
                            {uvDayScore !== null && uvDayScore !== undefined ? " pts" : ""}
                        </>
                    }
                    statusLabel={uvDayMeta.label}
                    statusTone={uvDayMeta.tone}
                    footer={<ProgressFooter percent={uvDayScorePercent} fillClass="bg-linear-to-r from-lime-300 via-amber-300 to-fuchsia-400" />}
                />
            </div>
        </div>
    );
}
export default WeatherQuickGrid;
