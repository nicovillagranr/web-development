// ================= CONTEXTO MODULO =================
// Módulo de consumo energético en tiempo real.
// Muestra valor actual vs promedio con barra de progreso.

// ================= IMPORTS =================
import { FiZap } from "react-icons/fi";
import SystemPanelCard from "./SystemPanelCard.jsx";

const defaultRows = [
    { id: "actual",   label: "Actual",   value: "2.4 kWh", progress: 62 },
    { id: "promedio", label: "Promedio", value: "2.9 kWh", progress: 72 },
];

function clampProgress(value) {
    const n = Number(value);
    return Number.isNaN(n) ? 0 : Math.max(0, Math.min(100, n));
}

// ================= COMPONENT =================
function CardEnergy({
    onClick,
    animDelay,
    rows = defaultRows,
    ...props
}) {
    const actual = rows[0];

    return (
        <SystemPanelCard
            title="Energía"
            icon={FiZap}
            accentClass="bg-emerald-400/70"
            statusLabel={actual?.value ?? "—"}
            statusClass="text-white/60"
            onClick={onClick}
            animDelay={animDelay}
            {...props}
        >
            {/* Filas de consumo: label + valor + barra de progreso */}
            <div className="space-y-1.5">
                {rows.slice(0, 2).map((row) => (
                    <div key={row.id}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-white/35">{row.label}</span>
                            <span className="text-[10px] font-medium text-white/65 tabular-nums">{row.value}</span>
                        </div>
                        {/* Barra de progreso */}
                        <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-emerald-400/50"
                                style={{ width: `${clampProgress(row.progress)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </SystemPanelCard>
    );
}
export default CardEnergy;
