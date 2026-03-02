
// ================= FUNCION EXPORTADA =================
// getGlobalMinMax: utilidad exportada; parametros: forecast = []
export function getGlobalMinMax(forecast = []) {
    if (!forecast.length) return { globalMin: 0, globalMax: 0 };
    const mins = forecast.map(d => d.min);
    const maxs = forecast.map(d => d.max);
    return {
        globalMin: Math.min(...mins),
        globalMax: Math.max(...maxs),
    };
}


// ================= FUNCION EXPORTADA =================
// getRangeBarStyle: utilidad exportada; parametros: { min, max, globalMin, globalMax }
export function getRangeBarStyle({ min, max, globalMin, globalMax }) {
    const range = globalMax - globalMin || 1;
    const leftPercent = ((min - globalMin) / range) * 100;
    const widthPercent = ((max - min) / range) * 100;

    return {
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
    };
}

// ================= FUNCION EXPORTADA =================
// getValuePercent: utilidad exportada; parametros: { value, globalMin, globalMax }
export function getValuePercent({ value, globalMin, globalMax }) {
    if (value === null || value === undefined) return null;
    const range = globalMax - globalMin || 1;
    const rawPercent = ((value - globalMin) / range) * 100;
    return Math.max(0, Math.min(100, rawPercent));
}
