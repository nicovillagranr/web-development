// ================= CONTEXTO MODULO =================
// Modal reutilizable para editar fecha u hora manual.
// Actualiza solo la porcion requerida del Date para evitar estados inconsistentes.
// ================= IMPORTS =================
import { FiX } from "react-icons/fi";

// ================= COMPONENTE =================
function TimeEditorModal({
    mode,
    manualDate,
    setManualDate,
    onClose,
}) {
    // updateDate: reemplaza anio/mes/dia y conserva la hora actual.
    const updateDate = (value) => {
        if (!value) return;

        const [year, month, day] = value.split("-");
        const nextDate = new Date(manualDate);
        nextDate.setFullYear(year, month - 1, day);
        setManualDate(nextDate);
    };

    // updateTime: reemplaza horas/minutos y conserva la fecha actual.
    const updateTime = (value) => {
        if (!value) return;

        const [hours, minutes] = value.split(":");
        const nextDate = new Date(manualDate);
        nextDate.setHours(hours);
        nextDate.setMinutes(minutes);
        setManualDate(nextDate);
    };

    return (
        <div className="absolute inset-0 z-30 bg-black/40 flex items-center justify-center">
            <div className="w-80 bg-[var(--glass-dark)] border border-white/10 backdrop-blur-xl rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">
                        {mode === "date" && "Ajustar Fecha"}
                        {mode === "time" && "Ajustar Hora"}
                    </h3>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:bg-white/10 transition"
                    >
                        <FiX size={18} />
                    </button>
                </div>

                {mode === "date" && (
                    <input
                        type="date"
                        className="w-full h-12 px-4 rounded-lg bg-white/8 border border-white/10 text-white outline-none focus:ring-1 focus:ring-accent/50"
                        value={manualDate.toISOString().split("T")[0]}
                        onChange={(event) => updateDate(event.target.value)}
                    />
                )}

                {mode === "time" && (
                    <input
                        type="time"
                        className="w-full h-12 px-4 rounded-lg bg-white/8 border border-white/10 text-white outline-none focus:ring-1 focus:ring-accent/50"
                        value={manualDate.toTimeString().slice(0, 5)}
                        onChange={(event) => updateTime(event.target.value)}
                    />
                )}
            </div>
        </div>
    );
}

export default TimeEditorModal;
