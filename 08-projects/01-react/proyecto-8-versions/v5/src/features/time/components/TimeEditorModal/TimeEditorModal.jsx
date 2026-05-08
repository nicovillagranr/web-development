// ================= CONTEXTO MODULO =================
// Modal reutilizable para editar fecha u hora manual.
// Actualiza solo la porcion requerida del Date para evitar estados inconsistentes.
// ================= IMPORTS =================
import { FiX } from "react-icons/fi";
import s from "./TimeEditorModal.module.css";

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
        <div className={s["time-editor"]}>
            <div className={s["time-editor__panel"]}>
                <div className={s["time-editor__header"]}>
                    <h3 className={s["time-editor__title"]}>
                        {mode === "date" && "Ajustar Fecha"}
                        {mode === "time" && "Ajustar Hora"}
                    </h3>

                    <button
                        type="button"
                        onClick={onClose}
                        className={s["time-editor__close-btn"]}
                    >
                        <FiX size={18} />
                    </button>
                </div>

                {mode === "date" && (
                    <input
                        type="date"
                        className={s["time-editor__input"]}
                        value={manualDate.toISOString().split("T")[0]}
                        onChange={(event) => updateDate(event.target.value)}
                    />
                )}

                {mode === "time" && (
                    <input
                        type="time"
                        className={s["time-editor__input"]}
                        value={manualDate.toTimeString().slice(0, 5)}
                        onChange={(event) => updateTime(event.target.value)}
                    />
                )}
            </div>
        </div>
    );
}

export default TimeEditorModal;
