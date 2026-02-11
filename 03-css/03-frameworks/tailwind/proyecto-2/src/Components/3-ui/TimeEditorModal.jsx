import { FiX } from "react-icons/fi";

/**
 * Modal reutilizable para editar:
 * - fecha
 * - hora
 * - zona horaria
 *
 * NO decide cuándo se abre.
 * SOLO edita datos según el mode recibido.
 */
function TimeEditorModal({
    mode,
    manualDate,
    setManualDate,
    timeZone,
    setTimeZone,
    onClose,
}) {

    /**
     * updateDate
     *
     * Reemplaza SOLO año, mes y día,
     * manteniendo la hora intacta.
     */
    const updateDate = (value) => {
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
     */
    const updateTime = (value) => {
        const [hours, minutes] = value.split(":");
        const newDate = new Date(manualDate);
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        setManualDate(newDate);
    };

    return (
        <div className="absolute inset-0 z-30 bg-black/40 flex items-center justify-center">
            <div className="w-80 bg-white rounded-xl p-4 space-y-4 shadow-lg">

                {/* Header del modal */}
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                        {mode === "date" && "Ajustar Fecha"}
                        {mode === "time" && "Ajustar Hora"}
                        {mode === "timezone" && "Zona Horaria"}
                    </h3>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
                    >
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

                {mode === "timezone" && (
                    <select
                        className="w-full h-12 px-4 rounded-lg border"
                        value={timeZone}
                        onChange={(e) => setTimeZone(e.target.value)}
                    >
                        <option value="America/Santiago">Chile</option>
                        <option value="America/Argentina/Buenos_Aires">Argentina</option>
                        <option value="America/Mexico_City">México</option>
                        <option value="Europe/Madrid">España</option>
                    </select>
                )}
            </div>
        </div>
    );
}

export default TimeEditorModal;
