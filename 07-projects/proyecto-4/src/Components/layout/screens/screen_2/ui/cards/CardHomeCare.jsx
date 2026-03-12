// ================= CONTEXTO MODULO =================
// Card para monitoreo general del hogar.

// ================= IMPORTS =================
import {
    FiAlertCircle,
    FiCheckCircle,
    FiDroplet,
    FiHome,
    FiWind,
} from "react-icons/fi";
import SystemPanelCard from "./SystemPanelCard.jsx";

const defaultDevices = [
    { id: "family-hub", label: "Family Hub", icon: FiHome, status: "ok" },
    { id: "dryer", label: "Dryer Samsung", icon: FiWind, status: "ok" },
    { id: "washer", label: "Lavadora", icon: FiDroplet, status: "ok" },
];

function CardHomeCare({
    onClick,
    className = "",
    summary = "Los 3 dispositivos con diagnostico IA funcionan correctamente.",
    devices = defaultDevices,
    ...props
}) {
    return (
        <SystemPanelCard title="Home Care" onClick={onClick} className={className} {...props}>
            <p className="text-[11px] leading-snug text-white/50">
                {summary}
            </p>

            <div className="mt-2 grid grid-cols-3 gap-1.5">
                {devices.slice(0, 3).map((device) => {
                    const Icon = device.icon || FiHome;
                    const isOk = device.status !== "warning";

                    return (
                        <div key={device.id || device.label} className="text-center">
                            <span className="relative mx-auto flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.06]">
                                <Icon className="w-3.5 h-3.5 text-white/60" aria-hidden="true" />
                                {isOk ? (
                                    <FiCheckCircle className="absolute -right-1 -bottom-1 h-3.5 w-3.5 text-emerald-400 rounded-full bg-[#0D0F1A]" />
                                ) : (
                                    <FiAlertCircle className="absolute -right-1 -bottom-1 h-3.5 w-3.5 text-amber-400 rounded-full bg-[#0D0F1A]" />
                                )}
                            </span>

                            <p className="mt-1 text-[10px] leading-tight text-white/40">
                                {device.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </SystemPanelCard>
    );
}

export default CardHomeCare;
