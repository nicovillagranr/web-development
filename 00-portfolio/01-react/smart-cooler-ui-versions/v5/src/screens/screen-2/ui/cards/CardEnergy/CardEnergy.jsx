// ================= CONTEXTO MODULO =================
// Módulo de consumo energético en tiempo real.
// Muestra valor actual vs promedio con barra de progreso.

// ================= IMPORTS =================
import { FiZap } from "react-icons/fi";
import SystemPanelCard from "../SystemPanelCard";
import s from "./CardEnergy.module.css";

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
            {...props}
        >
            {/* Filas de consumo: label + valor + barra de progreso */}
            <div className={s["card-energy__rows"]}>
                {rows.slice(0, 2).map((row) => (
                    <div key={row.id}>
                        <div className={s["card-energy__row-header"]}>
                            <span className={s["card-energy__label"]}>{row.label}</span>
                            <span className={s["card-energy__value"]}>{row.value}</span>
                        </div>
                        {/* Barra de progreso */}
                        <div className={s["card-energy__bar-track"]}>
                            <div
                                className={s["card-energy__bar-fill"]}
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
