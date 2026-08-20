// ================= FUNCION EXPORTADA =================
// getGlobalMinMax: utilidad exportada; parametros: forecast = []
// Busca el minimo y maximo global del bloque forecast para escalar barras.
export function getGlobalMinMax(forecast = []) {
    if (!forecast.length) return { globalMin: 0, globalMax: 0 };

    const mins = forecast.map((day) => day.min);
    const maxs = forecast.map((day) => day.max);

    return {
        globalMin: Math.min(...mins),
        globalMax: Math.max(...maxs),
    };
}

// ================= FUNCION EXPORTADA =================
// getRangeBarStyle: utilidad exportada; parametros: { min, max, globalMin, globalMax }
// Devuelve left/width en porcentaje para pintar el rango [min-max] del dia.
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
// Convierte un valor puntual (ej: temperatura actual) a posicion porcentual.
export function getValuePercent({ value, globalMin, globalMax }) {
    if (value === null || value === undefined) return null;

    const range = globalMax - globalMin || 1;
    const rawPercent = ((value - globalMin) / range) * 100;

    // Clampeamos a [0..100] para evitar que el marcador se salga visualmente.
    return Math.max(0, Math.min(100, rawPercent));
}
