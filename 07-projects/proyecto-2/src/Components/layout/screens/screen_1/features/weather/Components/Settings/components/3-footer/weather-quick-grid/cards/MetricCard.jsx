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
        <article className="min-h-30 rounded-2xl bg-white/10 px-3.5 py-3 flex flex-col">
            {/* Header de card: titulo + estado */}
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium text-white/80 leading-tight">{displayLabel}</h3>
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs ${statusTone}`}>
                    {statusLabel}
                </span>
            </div>

            {/* Valor principal de metrica */}
            <div className="mt-2 text-[22px] leading-none font-semibold">{valueNode}</div>

            {/* Footer de visualizacion (progress o escala especial) */}
            <div className="mt-auto pt-2 h-10">{footer}</div>
        </article>
    );
}

export default MetricCard;
