// ================= IMPORTS =================
import s from "./MetricCard.module.css";

// ================= COMPONENTE/FUNCION =================
// MetricCard: helper/componente interno; parametros: { label, mobileLabel, valueNode, statusLabel, statusTone, footer }
// Pieza base del grid de metricas. Estructura:
// - titulo
// - badge de estado
// - valor principal
// - footer (barra/escala)
function MetricCard({
    label,
    mobileLabel,
    valueNode,
    statusLabel,
    statusTone,
    footer,
}) {
    // Priorizamos etiqueta corta para mobile si existe.
    const displayLabel = mobileLabel || label;

    return (
        <article className={s["metric-card"]}>
            {/* Header de card: titulo + estado */}
            <div className={s["metric-card__header"]}>
                <h3 className={s["metric-card__label"]}>{displayLabel}</h3>
                <span className={`${s["metric-card__badge"]} ${statusTone}`}>
                    {statusLabel}
                </span>
            </div>

            {/* Valor principal de metrica */}
            <div className={s["metric-card__value"]}>{valueNode}</div>

            {/* Footer de visualizacion (progress o escala especial) */}
            <div className={s["metric-card__footer"]}>{footer}</div>
        </article>
    );
}

export default MetricCard;
