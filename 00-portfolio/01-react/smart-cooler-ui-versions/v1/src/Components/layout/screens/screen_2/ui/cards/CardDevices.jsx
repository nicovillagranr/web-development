// ================= CONTEXTO MODULO =================
// Card para estado rapido de dispositivos conectados.

// ================= IMPORTS =================
import SystemPanelCard from "./SystemPanelCard.jsx";

const defaultStats = [
    { id: "online", label: "Online", value: "8", tone: "emerald" },
    { id: "standby", label: "Standby", value: "3", tone: "sky" },
    { id: "off", label: "Off", value: "1", tone: "slate" },
];

function getStatToneClass(tone) {
    if (tone === "sky") return "bg-sky-500/15 border-sky-300/30 text-sky-100";
    if (tone === "slate") return "bg-slate-500/15 border-slate-300/30 text-slate-100";
    if (tone === "amber") return "bg-amber-500/15 border-amber-300/30 text-amber-100";
    return "bg-emerald-500/15 border-emerald-300/30 text-emerald-100";
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
            <p className="text-[11px] leading-snug text-white/90">
                {summary}
            </p>

            <div className="mt-2 grid grid-cols-3 gap-1.5">
                {stats.slice(0, 3).map((stat) => (
                    <article
                        key={stat.id || stat.label}
                        className={`rounded-xl border px-1.5 py-1 ${getStatToneClass(stat.tone)}`}
                    >
                        <p className="text-[10px] leading-none">{stat.label}</p>
                        <p className="mt-1 text-xs font-semibold leading-none">{stat.value}</p>
                    </article>
                ))}
            </div>
        </SystemPanelCard>
    );
}

export default CardDevices;
