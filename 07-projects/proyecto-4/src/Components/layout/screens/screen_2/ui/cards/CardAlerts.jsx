// ================= CONTEXTO MODULO =================
// Card para alertas y pendientes de mantenimiento.

// ================= IMPORTS =================
import SystemPanelCard from "./SystemPanelCard.jsx";

const defaultAlerts = [
    { id: "filtro", label: "Filtro de agua", time: "Hoy 18:30", level: "medium" },
    { id: "sensor", label: "Sensor puerta", time: "Manana", level: "low" },
];

function getAlertToneClass(level) {
    if (level === "high")   return "bg-rose-500/[0.10] border-rose-400/[0.15] text-rose-300/80";
    if (level === "medium") return "bg-amber-500/[0.10] border-amber-400/[0.15] text-amber-300/80";
    return "bg-white/[0.04] border-white/[0.07] text-white/50";
}

function CardAlerts({
    onClick,
    className = "",
    summary = "Eventos, anomalias y mantenimiento pendiente.",
    alerts = defaultAlerts,
    ...props
}) {
    return (
        <SystemPanelCard title="Alertas" onClick={onClick} className={className} {...props}>
            <p className="text-[11px] leading-snug text-white/50">
                {summary}
            </p>

            <div className="mt-2 space-y-1">
                {alerts.slice(0, 2).map((alert) => (
                    <article
                        key={alert.id || alert.label}
                        className={`rounded-lg border px-2 py-1 flex items-center justify-between gap-2 ${getAlertToneClass(alert.level)}`}
                    >
                        <p className="text-[10px] font-medium leading-none">{alert.label}</p>
                        <p className="text-[10px] leading-none opacity-60">{alert.time}</p>
                    </article>
                ))}
            </div>
        </SystemPanelCard>
    );
}

export default CardAlerts;
