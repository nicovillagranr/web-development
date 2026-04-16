// ================= IMPORTS =================
import s from "./TemperatureRangeBar.module.css";

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
        <div className={s["range-bar"]}>
            {/* Segmento de rango (min-max) */}
            <div
                className={s["range-bar__segment"]}
                style={style}
            />

            {/* Marcador puntual de temperatura actual (solo hoy) */}
            {hasMarker && (
                <span
                    className={s["range-bar__marker"]}
                    style={{ left: `${safeMarkerPercent}%` }}
                />
            )}
        </div>
    );
}
