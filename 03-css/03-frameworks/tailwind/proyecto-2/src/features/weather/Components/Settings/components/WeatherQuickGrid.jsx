// ================= FUNCION =================
// MeterCard: card visual con barra de progreso para una metrica
function MeterCard({ label, shortLabel, value, unit = "", percent }) {
    return (
        <div className="h-24 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md px-2 sm:px-3 py-3 sm:py-4 text-center flex flex-col">
            <p className="text-[10px] sm:text-xs opacity-70 leading-tight min-h-6 sm:min-h-8 flex items-center justify-center">
                <span className="sm:hidden">{shortLabel || label}</span>
                <span className="hidden sm:inline">{label}</span>
            </p>
            <p className="text-sm sm:text-base font-medium mt-1 min-h-5 flex items-center justify-center">
                {value ?? "--"}
                {value !== null && value !== undefined ? unit : ""}
            </p>

            <div className="mt-auto h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                <div
                    className="h-full rounded-full bg-linear-to-r from-cyan-300 via-emerald-300 to-lime-300"
                    style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
                />
            </div>
        </div>
    );
}

// ================= FUNCION =================
// normalizePercent: normaliza un valor numerico dentro de un rango a 0-100
function normalizePercent(value, min, max) {
    if (value === null || value === undefined) return 0;
    if (max <= min) return 0;
    return ((value - min) / (max - min)) * 100;
}

// ================= FUNCION =================
// WeatherQuickGrid: grid visual 2x3 con metricas actuales
function WeatherQuickGrid({ weather }) {
    const uv = weather?.metrics?.uvIndex ?? null;
    const humidity = weather?.metrics?.humidity ?? null;
    const feelsLike = weather?.metrics?.feelsLike ?? null;
    const pressure = weather?.metrics?.pressure ?? null;
    const aqi = weather?.metrics?.aqi ?? null;
    const uvDayScore = weather?.metrics?.uvDayScore ?? null;

    // Rangos visuales calibrados para evitar saturacion prematura de barras
    const uvPercent = normalizePercent(uv, 0, 11);
    const humidityPercent = normalizePercent(humidity, 0, 100);
    const feelsLikePercent = normalizePercent(feelsLike, -10, 45);
    const pressurePercent = normalizePercent(pressure, 980, 1040);
    const aqiPercent = normalizePercent(aqi, 0, 500);
    const uvDayScorePercent = normalizePercent(uvDayScore, 0, 60);

    // Render/retorno del bloque actual
    return (
        <div className="px-4 mt-4 mb-8">
            <div className="grid grid-cols-3 grid-rows-2 gap-2 sm:gap-3">
                <MeterCard label="Indice UV" shortLabel="UV" value={uv} percent={uvPercent} />
                <MeterCard label="Humedad" shortLabel="Humedad" value={humidity} unit="%" percent={humidityPercent} />
                <MeterCard label="Sensacion termica" shortLabel="ST" value={feelsLike} unit="°" percent={feelsLikePercent} />
                <MeterCard label="Presion" shortLabel="Presion" value={pressure} unit=" hPa" percent={pressurePercent} />
                <MeterCard label="AQI" shortLabel="AQI" value={aqi} percent={aqiPercent} />
                <MeterCard label="UV dia" shortLabel="UV dia" value={uvDayScore} unit=" score" percent={uvDayScorePercent} />
            </div>
        </div>
    );
}
export default WeatherQuickGrid;