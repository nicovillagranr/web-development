// ================= IMPORTS =================
import { FiX } from "react-icons/fi";

/**
 * Modal reutilizable para editar:
 * - fecha
 * - hora
 *
 * NO decide cuándo se abre.
 * SOLO edita datos según el mode recibido.
 */
function TimeEditorModal({
    mode,
    manualDate,
    setManualDate,
    onClose,
}) {

    /**
     * updateDate
     *
     * Reemplaza SOLO año, mes y día,
     * manteniendo la hora intacta.
     *
     * IMPORTANTE:
     * - Si el input queda vacío, NO hacemos nada
     * - manualDate SIEMPRE debe ser un Date válido
     */
    const updateDate = (value) => {
        if (!value) return;

        const [year, month, day] = value.split("-");
        const newDate = new Date(manualDate);
        newDate.setFullYear(year, month - 1, day);
        setManualDate(newDate);
    };

    /**
     * updateTime
     *
     * Reemplaza SOLO horas y minutos,
     * manteniendo el día intacto.
     *
     * IMPORTANTE:
     * - Si el input queda vacío, NO hacemos nada
     * - Evitamos estados inválidos
     */
    const updateTime = (value) => {
        if (!value) return;

        const [hours, minutes] = value.split(":");
        const newDate = new Date(manualDate);
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        setManualDate(newDate);
    };

    // Render/retorno del bloque actual
    return (
        <div className="absolute inset-0 z-30 bg-black/40 flex items-center justify-center">
            <div className="w-80 bg-white rounded-xl p-4 space-y-4 shadow-lg">

                {/* Header del modal */}
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                        {mode === "date" && "Ajustar Fecha"}
                        {mode === "time" && "Ajustar Hora"}
                    </h3>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition">
                        <FiX size={18} />
                    </button>
                </div>

                {/* Contenido dinámico */}
                {mode === "date" && (
                    <input
                        type="date"
                        className="w-full h-12 px-4 rounded-lg border"
                        value={manualDate.toISOString().split("T")[0]}
                        onChange={(e) => updateDate(e.target.value)}
                    />
                )}

                {mode === "time" && (
                    <input
                        type="time"
                        className="w-full h-12 px-4 rounded-lg border"
                        value={manualDate.toTimeString().slice(0, 5)}
                        onChange={(e) => updateTime(e.target.value)}
                    />
                )}
            </div>
        </div>
    );
}
export default TimeEditorModal;
