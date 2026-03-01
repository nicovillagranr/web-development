// ================= HELPERS =================
export function clampPercent(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return 0;
    return Math.max(0, Math.min(100, num));
}

export function normalizePercent(value, min, max) {
    if (value === null || value === undefined) return 0;
    if (max <= min) return 0;
    return clampPercent(((value - min) / (max - min)) * 100);
}

export function formatValue(value, decimals = 0) {
    if (value === null || value === undefined) return "--";
    if (typeof value !== "number") return value;
    return value.toFixed(decimals);
}
