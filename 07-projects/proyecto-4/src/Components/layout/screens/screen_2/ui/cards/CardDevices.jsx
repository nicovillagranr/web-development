// ================= CONTEXTO MODULO =================
// Card para estado rapido de dispositivos conectados.

// ================= IMPORTS =================
import SystemPanelCard from "./SystemPanelCard.jsx";

const defaultStats = [
    { id: "online", label: "Online", value: "8", tone: "emerald" },
    { id: "standby", label: "Standby", value: "3", tone: "sky" },
    { id: "off", label: "Off", value: "1", tone: "slate" },
];

function getStatValueClass(tone) {
    if (tone === "emerald") return "text-emerald-400";
    if (tone === "amber")   return "text-amber-400";
    if (tone === "sky")     return "text-cyan-400";
    return "text-white/40";
}

function CardDevices({
    onClick,
    className = "",
    summary = "Control rapido de equipos conectados.",
    stats = defaultStats,
    ...props
}) {
    return (
        <SystemPanelCard title="Dispositivos" onClick={onClick} className={className} {...props}>
            <p className="text-[11px] leading-snug text-white/50">
                {summary}
            </p>

            <div className="mt-2 grid grid-cols-3 gap-1.5">
                {stats.slice(0, 3).map((stat) => (
                    <article
                        key={stat.id || stat.label}
                        className="rounded-xl border border-white/[0.07] bg-white/[0.04] px-1.5 py-1"
                    >
                        <p className="text-[10px] leading-none text-white/35">{stat.label}</p>
                        <p className={`mt-1 text-xs font-medium leading-none ${getStatValueClass(stat.tone)}`}>{stat.value}</p>
                    </article>
                ))}
            </div>
        </SystemPanelCard>
    );
}

export default CardDevices;
