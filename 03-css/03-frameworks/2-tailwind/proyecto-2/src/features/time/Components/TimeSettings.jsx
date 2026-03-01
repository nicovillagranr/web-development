// ================= IMPORTS =================
import { useState } from "react";

import SettingsHeader from "../../../Components/ui/settings/SettingsHeader.jsx";

// ================= FUNCION =================
// TimeEditorModal: modal para editar fecha u hora manual
function TimeEditorModal({ mode, manualDate, setManualDate, onClose }) {
    // Render/retorno del bloque actual
    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60">
            <div className="bg-[#2C2D3A] rounded-xl p-6 w-80 shadow-lg">
                <h3 className="text-white text-lg font-medium mb-4">{mode === "date" ? "Ajustar Fecha" : "Ajustar Hora"}</h3>

                <input type={mode === "date" ? "date" : "time"} className="w-full p-2 rounded-md bg-[#1F1F2C] text-white border-none focus:ring-2 focus:ring-green-500" value={manualDate} onChange={(e) => setManualDate(e.target.value)} />

                <div className="flex justify-end mt-4 space-x-2">
                    <button
                        className="px-4 py-2 bg-[#3B3C4F] text-white rounded-md hover:bg-[#4B4C5F]"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        onClick={onClose}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}

// ================= FUNCION =================
// TimeSettings: panel de configuracion de fecha y hora
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
    // Hook: estado local del editor activo (date/time)
    const [activeEditor, setActiveEditor] = useState(null);

    const handleToggleAutoTime = () => {
        const nextValue = !autoTime;
        setAutoTime(nextValue);
        if (nextValue) setActiveEditor(null);
    };

    // Render/retorno del bloque actual
    return (
        <section className={`absolute inset-0 z-20 py-4 flex flex-col transition-transform duration-500 ease-out bg-[#1B1C27] text-[#F5F5F5] ${isActive ? "translate-x-0" : "-translate-x-full"}`}>
            <SettingsHeader title="Fecha y Hora" onBack={onBack} />

            <div className="flex-1 p-4 space-y-2">
                <div className="h-14 rounded-lg bg-[#2C2D3A] flex items-center justify-between px-4">
                    <span className="text-white font-medium">Fecha y Hora Automaticas</span>
                    <button onClick={handleToggleAutoTime} className={`relative w-11 h-6 rounded-full transition ${autoTime ? "bg-green-500" : "bg-[#3B3C4F]"}`}>
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${autoTime ? "translate-x-5" : ""}`} />
                    </button>
                </div>

                <button onClick={() => setActiveEditor("date")} className={`h-14 w-full rounded-lg bg-[#2C2D3A] flex items-center px-4 ${autoTime ? "opacity-40 pointer-events-none" : ""}`}>
                    <span className="text-white font-medium">Ajustar Fecha</span>
                </button>

                <button onClick={() => setActiveEditor("time")} className={`h-14 w-full rounded-lg bg-[#2C2D3A] flex items-center px-4 ${autoTime ? "opacity-40 pointer-events-none" : ""}`}>
                    <span className="text-white font-medium pointer-events-none">Ajustar Hora</span>
                </button>

                <div className="h-14 rounded-lg bg-[#2C2D3A] flex items-center justify-between px-4 mt-2">
                    <span className="text-white font-medium">Formato 24 horas</span>
                    <button onClick={() => setIs24hFormat(!is24hFormat)} className={`relative w-11 h-6 rounded-full transition ${is24hFormat ? "bg-green-500" : "bg-[#3B3C4F]"}`}>
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${is24hFormat ? "translate-x-5" : ""}`} />
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

