// ================= CONTEXTO MODULO =================
// Panel lateral para ajustar fecha y hora del dispositivo.
// Controla modo automatico, formato 24h y apertura del editor manual.
// ================= IMPORTS =================
import { useCallback, useEffect, useState } from "react";
import SettingsHeader from "../../../ui/settings/SettingsHeader.jsx";
import TimeEditorModal from "./TimeEditorModal.jsx";

// ================= COMPONENTE =================
function TimeSettings({
    isActive,
    onBack,
    autoTime,
    setAutoTime,
    is24hFormat,
    setIs24hFormat,
    manualDate,
    setManualDate,
}) {
    // Editor activo: "date" | "time" | null
    const [activeEditor, setActiveEditor] = useState(null);

    const handleClose = useCallback(() => {
        setActiveEditor(null);
        onBack?.();
    }, [onBack]);

    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (event) => {
            if (event.key !== "Escape") return;
            handleClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isActive, handleClose]);

    const handleToggleAutoTime = () => {
        const nextValue = !autoTime;
        setAutoTime(nextValue);
        if (nextValue) setActiveEditor(null);
    };

    return (
        <section
            className={`absolute inset-0 z-20 py-4 flex flex-col transition-transform duration-500 ease-out bg-[#1B1C27] text-[#F5F5F5] ${isActive ? "translate-x-0" : "-translate-x-full"}`}
        >
            <SettingsHeader title="Fecha y Hora" onBack={handleClose} />

            <div className="flex-1 p-4 space-y-2">
                <div className="h-14 rounded-lg bg-[#2C2D3A] flex items-center justify-between px-4">
                    <span className="text-white font-medium">Fecha y Hora Automaticas</span>
                    <button
                        type="button"
                        onClick={handleToggleAutoTime}
                        className={`relative w-11 h-6 rounded-full transition ${autoTime ? "bg-green-500" : "bg-[#3B3C4F]"}`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${autoTime ? "translate-x-5" : ""}`}
                        />
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setActiveEditor("date")}
                    className={`h-14 w-full rounded-lg bg-[#2C2D3A] flex items-center px-4 ${autoTime ? "opacity-40 pointer-events-none" : ""}`}
                >
                    <span className="text-white font-medium">Ajustar Fecha</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveEditor("time")}
                    className={`h-14 w-full rounded-lg bg-[#2C2D3A] flex items-center px-4 ${autoTime ? "opacity-40 pointer-events-none" : ""}`}
                >
                    <span className="text-white font-medium pointer-events-none">Ajustar Hora</span>
                </button>

                <div className="h-14 rounded-lg bg-[#2C2D3A] flex items-center justify-between px-4 mt-2">
                    <span className="text-white font-medium">Formato 24 horas</span>
                    <button
                        type="button"
                        onClick={() => setIs24hFormat(!is24hFormat)}
                        className={`relative w-11 h-6 rounded-full transition ${is24hFormat ? "bg-green-500" : "bg-[#3B3C4F]"}`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${is24hFormat ? "translate-x-5" : ""}`}
                        />
                    </button>
                </div>
            </div>

            {activeEditor && !autoTime && (
                <TimeEditorModal
                    mode={activeEditor}
                    manualDate={manualDate}
                    setManualDate={setManualDate}
                    onClose={() => setActiveEditor(null)}
                />
            )}
        </section>
    );
}

export default TimeSettings;
