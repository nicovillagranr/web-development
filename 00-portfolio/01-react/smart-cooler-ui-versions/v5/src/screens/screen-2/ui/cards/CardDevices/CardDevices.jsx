// ================= CONTEXTO MODULO =================
// Módulo de estado rápido de dispositivos conectados.
// Muestra conteos de online / standby / apagados como píldoras de estado.

// ================= IMPORTS =================
import { FiWifi } from "react-icons/fi";
import SystemPanelCard from "../SystemPanelCard";
import s from "./CardDevices.module.css";

const defaultStats = [
    { id: "online",  label: "Online",  value: "8", valueClass: "text-accent/80"   },
    { id: "standby", label: "Standby", value: "3", valueClass: "text-sky-400/70"  },
    { id: "off",     label: "Off",     value: "1", valueClass: "text-white/35"    },
];

// ================= COMPONENT =================
function CardDevices({
    onClick,
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
            {...props}
        >
            {/* Contadores de estado: online / standby / off */}
            <div className={s["card-devices__stats"]}>
                {stats.slice(0, 3).map((stat) => (
                    <div
                        key={stat.id}
                        className={s["card-devices__pill"]}
                    >
                        <p className={s["card-devices__pill-label"]}>{stat.label}</p>
                        <p className={`${s["card-devices__pill-value"]} ${stat.valueClass}`}>
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>
        </SystemPanelCard>
    );
}
export default CardDevices;
