// ================= CONTEXTO MODULO =================
// Card para alertas y pendientes de mantenimiento.

// ================= IMPORTS =================
import SystemPanelCard from "./SystemPanelCard.jsx";

const defaultAlerts = [
    { id: "filtro", label: "Filtro de agua", time: "Hoy 18:30", level: "medium" },
    { id: "sensor", label: "Sensor puerta", time: "Manana", level: "low" },
];

function getAlertToneClass(level) {
    if (level === "high") return "bg-rose-500/20 border-rose-300/40 text-rose-100";
    if (level === "medium") return "bg-amber-500/20 border-amber-300/40 text-amber-100";
    return "bg-white/8 border-white/15 text-white/85";
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
            <p className="text-[11px] leading-snug text-white/90">
                {summary}
            </p>

            <div className="mt-2 space-y-1">
                {alerts.slice(0, 2).map((alert) => (
                    <article
                        key={alert.id || alert.label}
                        className={`rounded-lg border px-2 py-1 flex items-center justify-between gap-2 ${getAlertToneClass(alert.level)}`}
                    >
                        <p className="text-[10px] font-medium leading-none">{alert.label}</p>
                        <p className="text-[10px] leading-none opacity-90">{alert.time}</p>
                    </article>
                ))}
            </div>
        </SystemPanelCard>
    );
}

export default CardAlerts;
