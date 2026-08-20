// ================= CONTEXTO MODULO =================
// Módulo de diagnóstico de dispositivos del hogar.
// Muestra cada dispositivo con ícono + nombre + indicador de estado (OK / Revisar).

// ================= IMPORTS =================
import { FiAlertCircle, FiCheckCircle, FiDroplet, FiHome, FiWind } from "react-icons/fi";
import SystemPanelCard from "../SystemPanelCard";

const defaultDevices = [
    { id: "family-hub", label: "Family Hub",    icon: FiHome,    status: "ok" },
    { id: "dryer",      label: "Dryer",          icon: FiWind,    status: "ok" },
    { id: "washer",     label: "Lavadora",        icon: FiDroplet, status: "ok" },
];

// ================= COMPONENT =================
function CardHomeCare({
    onClick,
    devices = defaultDevices,
    ...props
}) {
    const allOk = devices.every((d) => d.status === "ok");

    return (
        <SystemPanelCard
            title="Home Care"
            icon={FiHome}
            accentClass="bg-accent"
            statusLabel={allOk ? "Todo OK" : "Revisar"}
            statusClass={allOk ? "text-accent/80" : "text-amber-400/80"}
            onClick={onClick}
            {...props}
        >
            <div className="flex items-center gap-4">
                {devices.slice(0, 3).map((device) => {
                    const Icon = device.icon || FiHome;
                    const isOk = device.status === "ok";

                    return (
                        <div key={device.id} className="flex items-center gap-1.5">
                            <Icon className="w-3 h-3 text-white/30" aria-hidden="true" />
                            <span className="text-[12px] text-white/50 leading-none">{device.label}</span>
                            {isOk
                                ? <FiCheckCircle className="w-3 h-3 text-accent/70" aria-label="OK" />
                                : <FiAlertCircle className="w-3 h-3 text-amber-400/80" aria-label="Revisar" />
                            }
                        </div>
                    );
                })}
            </div>
        </SystemPanelCard>
    );
}
export default CardHomeCare;
