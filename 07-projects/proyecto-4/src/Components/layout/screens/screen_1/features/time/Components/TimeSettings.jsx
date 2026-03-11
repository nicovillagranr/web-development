// ================= CONTEXTO MODULO =================
// Panel lateral para ajustar fecha y hora del dispositivo.
// Controla modo automatico, formato 24h y apertura del editor manual.
// ================= IMPORTS =================
import { useCallback, useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
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
            className={`absolute inset-0 z-20 flex flex-col bg-[#0D0F1A] text-white transition-transform duration-500 ease-out ${isActive ? "translate-x-0" : "-translate-x-full"}`}
        >
            <SettingsHeader title="Fecha y Hora" onBack={handleClose} />

            <div className="flex-1 p-4 space-y-2">
                {/* Toggle: hora automática */}
                <div className="flex items-center justify-between px-4 h-14 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-sm text-white/80">Fecha y hora automáticas</span>
                    <button
                        type="button"
                        onClick={handleToggleAutoTime}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${autoTime ? "bg-cyan-500" : "bg-white/15"}`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${autoTime ? "translate-x-5" : ""}`}
                        />
                    </button>
                </div>

                {/* Ajustar fecha */}
                <button
                    type="button"
                    onClick={() => setActiveEditor("date")}
                    className={`w-full flex items-center justify-between px-4 h-14 rounded-xl bg-white/[0.04] border border-white/[0.06] transition-opacity duration-200 ${autoTime ? "opacity-30 pointer-events-none" : ""}`}
                >
                    <span className="text-sm text-white/80">Ajustar fecha</span>
                    <FiChevronRight className="w-4 h-4 text-white/30" />
                </button>

                {/* Ajustar hora */}
                <button
                    type="button"
                    onClick={() => setActiveEditor("time")}
                    className={`w-full flex items-center justify-between px-4 h-14 rounded-xl bg-white/[0.04] border border-white/[0.06] transition-opacity duration-200 ${autoTime ? "opacity-30 pointer-events-none" : ""}`}
                >
                    <span className="text-sm text-white/80">Ajustar hora</span>
                    <FiChevronRight className="w-4 h-4 text-white/30" />
                </button>

                {/* Toggle: formato 24h */}
                <div className="flex items-center justify-between px-4 h-14 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-sm text-white/80">Formato 24 horas</span>
                    <button
                        type="button"
                        onClick={() => setIs24hFormat(!is24hFormat)}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${is24hFormat ? "bg-cyan-500" : "bg-white/15"}`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${is24hFormat ? "translate-x-5" : ""}`}
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
