// ================= METRIC METAS =================
// Cada helper devuelve:
// - label: texto humano para estado de la metrica
// - tone: clases tailwind para badge de estado

// Meta UV instantaneo.
export function getUvMeta(uv) {
    if (uv === null || uv === undefined) {
        return { label: "Sin dato", tone: "bg-white/15 text-white/70" };
    }
    if (uv < 3) return { label: "Bajo", tone: "bg-emerald-400/25 text-emerald-100" };
    if (uv < 6) return { label: "Moderado", tone: "bg-yellow-400/25 text-yellow-100" };
    if (uv < 8) return { label: "Alto", tone: "bg-orange-400/25 text-orange-100" };
    if (uv < 11) return { label: "Muy alto", tone: "bg-rose-400/25 text-rose-100" };
    return { label: "Extremo", tone: "bg-fuchsia-400/25 text-fuchsia-100" };
}

// Meta humedad relativa.
export function getHumidityMeta(humidity) {
    if (humidity === null || humidity === undefined) {
        return { label: "Sin dato", tone: "bg-white/15 text-white/70" };
    }
    if (humidity < 30) return { label: "Seca", tone: "bg-amber-400/25 text-amber-100" };
    if (humidity <= 60) return { label: "Confort", tone: "bg-emerald-400/25 text-emerald-100" };
    return { label: "Humeda", tone: "bg-cyan-400/25 text-cyan-100" };
}

// Meta sensacion termica.
export function getFeelsLikeMeta(feelsLike) {
    if (feelsLike === null || feelsLike === undefined) {
        return { label: "Sin dato", tone: "bg-white/15 text-white/70" };
    }
    if (feelsLike < 8) return { label: "Frio", tone: "bg-cyan-400/25 text-cyan-100" };
    if (feelsLike < 18) return { label: "Fresco", tone: "bg-sky-400/25 text-sky-100" };
    if (feelsLike < 28) return { label: "Templado", tone: "bg-emerald-400/25 text-emerald-100" };
    if (feelsLike < 35) return { label: "Calor", tone: "bg-orange-400/25 text-orange-100" };
    return { label: "Intenso", tone: "bg-rose-400/25 text-rose-100" };
}

// Meta presion atmosferica (hPa).
export function getPressureMeta(pressure) {
    if (pressure === null || pressure === undefined) {
        return { label: "Sin dato", tone: "bg-white/15 text-white/70" };
    }
    if (pressure < 1000) return { label: "Baja", tone: "bg-amber-400/25 text-amber-100" };
    if (pressure <= 1022) return { label: "Normal", tone: "bg-emerald-400/25 text-emerald-100" };
    return { label: "Alta", tone: "bg-cyan-400/25 text-cyan-100" };
}

// Meta calidad de aire (AQI US).
export function getAqiMeta(aqi) {
    if (aqi === null || aqi === undefined) {
        return { label: "Sin dato", tone: "bg-white/15 text-white/70" };
    }
    if (aqi <= 50) return { label: "Buena", tone: "bg-emerald-400/25 text-emerald-100" };
    if (aqi <= 100) return { label: "Moderada", tone: "bg-yellow-400/25 text-yellow-100" };
    if (aqi <= 150) return { label: "Sensible", tone: "bg-orange-400/25 text-orange-100" };
    if (aqi <= 200) return { label: "Danina", tone: "bg-rose-400/25 text-rose-100" };
    if (aqi <= 300) return { label: "Muy danina", tone: "bg-purple-400/25 text-purple-100" };
    return { label: "Peligrosa", tone: "bg-red-500/30 text-red-100" };
}

// Meta score UV acumulado del dia.
export function getUvDayMeta(score) {
    if (score === null || score === undefined) {
        return { label: "Sin dato", tone: "bg-white/15 text-white/70" };
    }
    if (score < 10) return { label: "Baja", tone: "bg-emerald-400/25 text-emerald-100" };
    if (score < 25) return { label: "Media", tone: "bg-yellow-400/25 text-yellow-100" };
    if (score < 45) return { label: "Alta", tone: "bg-orange-400/25 text-orange-100" };
    return { label: "Muy alta", tone: "bg-rose-400/25 text-rose-100" };
}
