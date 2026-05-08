// ================= COMPONENTE/FUNCION =================
// TemperatureRangeBar: punto de entrada; recibe props/parametros: { style, markerPercent = null }
// Muestra:
// - barra base del rango global
// - segmento de temperatura min/max del dia
// - marcador puntual opcional (temperatura actual) para el dia de hoy
export default function TemperatureRangeBar({ style, markerPercent = null }) {
    // Validamos si el marcador es realmente numerico y usable.
    const markerNumber = Number(markerPercent);
    const hasMarker =
        markerPercent !== null &&
        markerPercent !== undefined &&
        Number.isFinite(markerNumber);

    // Clampeamos para evitar que el punto quede cortado en extremos.
    const safeMarkerPercent = hasMarker
        ? Math.max(2, Math.min(98, markerNumber))
        : null;

    return (
        <div className="relative h-1.5 w-16 rounded-full bg-white/20 overflow-hidden">
            {/* Segmento de rango (min-max) */}
            <div
                className="absolute h-full bg-linear-to-r from-yellow-300 via-orange-400 to-red-400 rounded-full"
                style={style}
            />

            {/* Marcador puntual de temperatura actual (solo hoy) */}
            {hasMarker && (
                <span
                    className="absolute top-1/2 z-10 size-1.5 rounded-full bg-white border border-black -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${safeMarkerPercent}%` }}
                />
            )}
        </div>
    );
}
