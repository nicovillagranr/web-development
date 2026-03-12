// ================= CONTEXTO MODULO =================
// Card para consumo energetico en tiempo real.

// ================= IMPORTS =================
import SystemPanelCard from "./SystemPanelCard.jsx";

const defaultRows = [
    { id: "actual", label: "Actual", value: "2.4 kWh", progress: 62, tone: "teal" },
    { id: "promedio", label: "Promedio", value: "2.9 kWh", progress: 72, tone: "sky" },
];

function getToneClass(tone) {
    if (tone === "sky") return "bg-white/25";
    if (tone === "amber") return "bg-amber-400/60";
    return "bg-cyan-400/60";
}

function normalizeProgress(progress) {
    const value = Number(progress);
    if (Number.isNaN(value)) return 0;
    return Math.max(0, Math.min(100, value));
}

function CardEnergy({
    onClick,
    className = "",
    summary = "Consumo actual y comparacion con el promedio.",
    rows = defaultRows,
    ...props
}) {
    return (
        <SystemPanelCard title="Energia" onClick={onClick} className={className} {...props}>
            <p className="text-[11px] leading-snug text-white/50">
                {summary}
            </p>

            <div className="mt-2 space-y-1.5">
                {rows.slice(0, 2).map((row) => (
                    <div key={row.id || row.label}>
                        <div className="flex items-center justify-between text-[10px]">
                            <span className="text-white/40">{row.label}</span>
                            <span className="text-white/70 font-medium">{row.value}</span>
                        </div>
                        <div className="mt-1 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                            <span
                                className={`block h-full rounded-full ${getToneClass(row.tone)}`}
                                style={{ width: `${normalizeProgress(row.progress)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </SystemPanelCard>
    );
}

export default CardEnergy;
