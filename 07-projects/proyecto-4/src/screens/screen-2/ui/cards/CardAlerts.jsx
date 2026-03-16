// ================= CONTEXTO MODULO =================
// Módulo de alertas y mantenimiento pendiente.
// Muestra las alertas activas con nivel de urgencia codificado por color.

// ================= IMPORTS =================
import { FiBell } from "react-icons/fi";
import SystemPanelCard from "./SystemPanelCard.jsx";

const defaultAlerts = [
    { id: "filtro", label: "Filtro de agua", time: "Hoy 18:30", level: "medium" },
    { id: "sensor", label: "Sensor puerta",  time: "Mañana",    level: "low"    },
];

// Clases de color según nivel de urgencia de la alerta
function getAlertClasses(level) {
    if (level === "high")   return "bg-rose-500/10 border-rose-400/15 text-rose-300/80";
    if (level === "medium") return "bg-amber-500/10 border-amber-400/15 text-amber-300/80";
    return "bg-white/4 border-white/6 text-white/45";
}

// ================= COMPONENT =================
function CardAlerts({
    onClick,
    animDelay,
    alerts = defaultAlerts,
    ...props
}) {
    const pendingCount = alerts.length;
    const hasUrgent = alerts.some((a) => a.level === "high" || a.level === "medium");

    return (
        <SystemPanelCard
            title="Alertas"
            icon={FiBell}
            accentClass={hasUrgent ? "bg-amber-400" : "bg-white/20"}
            statusLabel={`${pendingCount} pendiente${pendingCount !== 1 ? "s" : ""}`}
            statusClass={hasUrgent ? "text-amber-400/80" : "text-white/40"}
            onClick={onClick}
            animDelay={animDelay}
            {...props}
        >
            {/* Lista de alertas con color por nivel de urgencia */}
            <div className="space-y-1">
                {alerts.slice(0, 2).map((alert) => (
                    <div
                        key={alert.id}
                        className={`rounded-lg border px-2 py-1.5 flex items-center justify-between gap-2 ${getAlertClasses(alert.level)}`}
                    >
                        <p className="text-[12px] font-medium leading-none">{alert.label}</p>
                        <p className="text-[12px] leading-none opacity-55 shrink-0">{alert.time}</p>
                    </div>
                ))}
            </div>
        </SystemPanelCard>
    );
}
export default CardAlerts;
