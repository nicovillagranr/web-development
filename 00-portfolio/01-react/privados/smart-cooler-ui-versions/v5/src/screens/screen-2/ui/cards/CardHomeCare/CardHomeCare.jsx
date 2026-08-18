// ================= CONTEXTO MODULO =================
// Módulo de diagnóstico de dispositivos del hogar.
// Muestra cada dispositivo con ícono + nombre + indicador de estado (OK / Revisar).

// ================= IMPORTS =================
import { FiAlertCircle, FiCheckCircle, FiDroplet, FiHome, FiWind } from "react-icons/fi";
import SystemPanelCard from "../SystemPanelCard";
import s from "./CardHomeCare.module.css";

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
            {/* Dispositivos en fila: ícono + nombre + estado */}
            <div className={s["card-homecare__devices"]}>
                {devices.slice(0, 3).map((device) => {
                    const Icon = device.icon || FiHome;
                    const isOk = device.status === "ok";

                    return (
                        <div key={device.id} className={s["card-homecare__device"]}>
                            <Icon className={s["card-homecare__device-icon"]} aria-hidden="true" />
                            <span className={s["card-homecare__device-label"]}>{device.label}</span>
                            {isOk
                                ? <FiCheckCircle className={`${s["card-homecare__status-icon"]} text-accent/70`} aria-label="OK" />
                                : <FiAlertCircle className={`${s["card-homecare__status-icon"]} text-amber-400/80`} aria-label="Revisar" />
                            }
                        </div>
                    );
                })}
            </div>
        </SystemPanelCard>
    );
}
export default CardHomeCare;
