// Definimos el componente MetricCard que recibe varias props para mostrar información de una métrica
function MetricCard({
    label,
    mobileLabel,
    valueNode,
    statusLabel,
    statusTone,
    footer,
}) {
    // Si se proporciona un mobileLabel, se usará en lugar del label para dispositivos móviles
    const displayLabel = mobileLabel || label;

    return (
        // Contenedor principal del componente
        <article className="min-h-30 rounded-2xl bg-white/10 px-3.5 py-3 flex flex-col">
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium text-white/80 leading-tight">{displayLabel}</h3>
                <span className={`inline-flex rounded-full px-2 py-0.5 text-sm ${statusTone}`}>{statusLabel}</span>
            </div>
            <div className="mt-2 text-[22px] leading-none font-semibold">{valueNode}</div>
            <div className="mt-auto pt-2 h-10">{footer}</div>
        </article>
    );
}
export default MetricCard;
