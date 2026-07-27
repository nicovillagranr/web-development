// ================= CONTEXTO MODULO =================
// Panel lateral para ajustar fecha y hora del dispositivo.
// Controla modo automatico, formato 24h y apertura del editor manual.
// ================= IMPORTS =================
import { useCallback, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import SettingsHeader from "@ui/SettingsHeader.jsx";
import { useEscapeKey } from "@hooks/useEscapeKey.jsx";
import TimeEditorModal from "../TimeEditorModal";
import s from "./TimeSettings.module.css";

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

    useEscapeKey(isActive, handleClose);

    const handleToggleAutoTime = () => {
        const nextValue = !autoTime;
        setAutoTime(nextValue);
        if (nextValue) setActiveEditor(null);
    };

    return (
        <section
            className={`${s["time-settings"]} ${isActive ? s["time-settings--active"] : s["time-settings--hidden"]}`}
        >
            <SettingsHeader title="Fecha y Hora" onBack={handleClose} />

            <div className={s["time-settings__body"]}>
                {/* Toggle: hora automática */}
                <div className={s["time-settings__row"]}>
                    <span className={s["time-settings__row-label"]}>Fecha y hora automáticas</span>
                    <button
                        type="button"
                        onClick={handleToggleAutoTime}
                        className={`${s["time-settings__toggle"]} ${autoTime ? s["time-settings__toggle--on"] : s["time-settings__toggle--off"]}`}
                    >
                        <span
                            className={`${s["time-settings__toggle-knob"]} ${autoTime ? s["time-settings__toggle-knob--on"] : ""}`}
                        />
                    </button>
                </div>

                {/* Ajustar fecha */}
                <button
                    type="button"
                    onClick={() => setActiveEditor("date")}
                    className={`${s["time-settings__row-btn"]} ${autoTime ? s["time-settings__row-btn--disabled"] : ""}`}
                >
                    <span className={s["time-settings__row-label"]}>Ajustar fecha</span>
                    <FiChevronRight className={s["time-settings__row-btn-chevron"]} />
                </button>

                {/* Ajustar hora */}
                <button
                    type="button"
                    onClick={() => setActiveEditor("time")}
                    className={`${s["time-settings__row-btn"]} ${autoTime ? s["time-settings__row-btn--disabled"] : ""}`}
                >
                    <span className={s["time-settings__row-label"]}>Ajustar hora</span>
                    <FiChevronRight className={s["time-settings__row-btn-chevron"]} />
                </button>

                {/* Toggle: formato 24h */}
                <div className={s["time-settings__row"]}>
                    <span className={s["time-settings__row-label"]}>Formato 24 horas</span>
                    <button
                        type="button"
                        onClick={() => setIs24hFormat(!is24hFormat)}
                        className={`${s["time-settings__toggle"]} ${is24hFormat ? s["time-settings__toggle--on"] : s["time-settings__toggle--off"]}`}
                    >
                        <span
                            className={`${s["time-settings__toggle-knob"]} ${is24hFormat ? s["time-settings__toggle-knob--on"] : ""}`}
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
