// ================= CONTEXTO MODULO =================
// Módulo de estado rápido de dispositivos conectados.
// Muestra conteos de online / standby / apagados como píldoras de estado.

// ================= IMPORTS =================
import { FiWifi } from "react-icons/fi";
import SystemPanelCard from "./SystemPanelCard.jsx";

const defaultStats = [
    { id: "online",  label: "Online",  value: "8", valueClass: "text-accent/80"   },
    { id: "standby", label: "Standby", value: "3", valueClass: "text-sky-400/70"  },
    { id: "off",     label: "Off",     value: "1", valueClass: "text-white/35"    },
];

// ================= COMPONENT =================
function CardDevices({
    onClick,
    animDelay,
    stats = defaultStats,
    ...props
}) {
    const online = stats.find((s) => s.id === "online");

    return (
        <SystemPanelCard
            title="Dispositivos"
            icon={FiWifi}
            accentClass="bg-sky-400/70"
            statusLabel={online ? `${online.value} activos` : undefined}
            statusClass="text-accent/80"
            onClick={onClick}
            animDelay={animDelay}
            {...props}
        >
            {/* Contadores de estado: online / standby / off */}
            <div className="flex gap-2">
                {stats.slice(0, 3).map((stat) => (
                    <div
                        key={stat.id}
                        className="flex-1 rounded-lg border border-white/6 bg-white/4 px-2 py-1.5"
                    >
                        <p className="text-[11px] text-white/30 leading-none mb-1">{stat.label}</p>
                        <p className={`text-sm font-semibold tabular-nums leading-none ${stat.valueClass}`}>
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>
        </SystemPanelCard>
    );
}
export default CardDevices;
