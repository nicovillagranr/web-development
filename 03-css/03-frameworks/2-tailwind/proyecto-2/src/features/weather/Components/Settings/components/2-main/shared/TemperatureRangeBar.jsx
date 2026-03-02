
// ================= COMPONENTE/FUNCION =================
// TemperatureRangeBar: punto de entrada; recibe props/parametros: { style, markerPercent = null }
export default function TemperatureRangeBar({ style, markerPercent = null }) {
    const markerNumber = Number(markerPercent);
    const hasMarker =
        markerPercent !== null &&
        markerPercent !== undefined &&
        Number.isFinite(markerNumber);
    const safeMarkerPercent = hasMarker
        ? Math.max(2, Math.min(98, markerNumber))
        : null;

    // Render/retorno del bloque actual
    return (
        <div className="relative h-2 w-20 rounded-full bg-white/20 overflow-hidden">
            <div className="absolute h-full bg-linear-to-r from-yellow-300 via-orange-400 to-red-400 rounded-full"
                style={style}
            />

            {hasMarker && (
                <span className="absolute top-1/2 z-10 size-1.5 rounded-full bg-white border border-black  -translate-x-1/2 -translate-y-1/2" style={{ left: `${safeMarkerPercent}%` }} />
            )}
        </div>
    );
}