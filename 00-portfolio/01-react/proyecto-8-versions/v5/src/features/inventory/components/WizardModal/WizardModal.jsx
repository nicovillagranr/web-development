// ================= CONTEXTO MODULO =================
// Modal wizard de 3 pasos para agregar un alimento al inventario.
// Se ancla al DeviceShell (absolute inset-0) y se desliza desde abajo.
// Navegación: Enter (avanzar), Escape (cerrar), botones en pantalla.
// ================= IMPORTS =================
import { useCallback, useEffect, useRef, useState } from "react";
import { INVENTORY_TYPES, INVENTORY_UNITS } from "../../hooks/useInventory.jsx";
import s from "./WizardModal.module.css";

// ================= CONSTANTS =================
const STEP_LABELS = {
    1: "¿Qué alimento?",
    2: "Cantidad y unidad",
    3: "Tipo y vencimiento",
};

// ================= COMPONENTE =================
function WizardModal({ isOpen, onClose, form, error, setField, addItem, resetForm }) {
    const [step, setStep] = useState(1);
    const handleNextRef = useRef(null);

    const handleClose = useCallback(() => {
        resetForm();
        setStep(1);
        onClose();
    }, [resetForm, onClose]);

    function handleNext() {
        if (step === 1) {
            if (!form.name.trim()) return;
            setStep(2);
        } else if (step === 2) {
            const qty = Number(form.quantity);
            if (!Number.isFinite(qty) || !Number.isInteger(qty) || qty <= 0) return;
            setStep(3);
        } else {
            const success = addItem();
            if (success) {
                setStep(1);
                onClose();
            }
        }
    }

    // Sincroniza ref con la última versión de handleNext (fuera del render)
    useEffect(() => {
        handleNextRef.current = handleNext;
    });

    // Auto-focus al primer campo de cada paso
    useEffect(() => {
        if (!isOpen) return;
        const el = document.querySelector("[data-wizard-focus]");
        el?.focus();
    }, [step, isOpen]);

    // Teclado: Enter avanza, Escape cierra
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => {
            const isNativePicker = e.target.tagName === "INPUT" && (e.target.type === "date" || e.target.type === "time");
            if (e.key === "Enter" && e.target.tagName !== "BUTTON" && e.target.tagName !== "SELECT" && !isNativePicker) {
                e.preventDefault();
                handleNextRef.current?.();
            }
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, handleClose]);

    if (!isOpen) return null;

    return (
        <div role="dialog" aria-modal="true" aria-labelledby="wizard-step-label" className={s.wizard}>

            {/* Backdrop */}
            <div className={s.wizard__backdrop} onClick={handleClose} />

            {/* Panel */}
            <div className={`wizard-enter ${s.wizard__panel}`}>

                {/* Barra de progreso */}
                <div role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-label={`Paso ${step} de 3`} className={s.wizard__progress}>

                    {[1, 2, 3].map((n) => (
                        <div key={n}
                            className={`${s["wizard__progress-step"]} ${n <= step ? s["wizard__progress-step--active"] : s["wizard__progress-step--inactive"]}`}
                        />
                    ))}
                </div>

                {/* Etiqueta del paso — referenciada por aria-labelledby del dialog */}
                <p id="wizard-step-label" className={s["wizard__step-label"]}>
                    {STEP_LABELS[step]}
                </p>

                {/* Contenido — key={step} dispara card-enter al cambiar */}
                <div key={step} className="card-enter">
                    {step === 1 && (
                        <div>
                            <label htmlFor="wizard-name" className="sr-only">Nombre del alimento</label>
                            <input
                                id="wizard-name"
                                data-wizard-focus=""
                                type="text"
                                value={form.name}
                                onChange={(e) => setField("name", e.target.value)}
                                placeholder="Ej. Manzana, Leche, Pollo…"
                                autoComplete="off"
                                className={s.wizard__input}
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className={s.wizard__grid}>
                            <div>
                                <label htmlFor="wizard-quantity" className="sr-only">Cantidad</label>
                                <input
                                    id="wizard-quantity"
                                    data-wizard-focus=""
                                    type="number"
                                    min="1"
                                    value={form.quantity}
                                    onChange={(e) => setField("quantity", e.target.value)}
                                    placeholder="Cantidad"
                                    className={s.wizard__input}
                                />
                            </div>
                            <div>
                                <label htmlFor="wizard-unit" className="sr-only">Unidad de medida</label>
                                <select
                                    id="wizard-unit"
                                    value={form.unit}
                                    onChange={(e) => setField("unit", e.target.value)}
                                    className={s.wizard__select}
                                >
                                    {INVENTORY_UNITS.map((u) => (
                                        <option className={s.wizard__option} key={u.value} value={u.value}>
                                            {u.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className={s.wizard__grid}>
                            <div>
                                <label htmlFor="wizard-type" className="sr-only">Tipo de alimento</label>
                                <select
                                    id="wizard-type"
                                    data-wizard-focus=""
                                    value={form.type}
                                    onChange={(e) => setField("type", e.target.value)}
                                    className={s.wizard__select}
                                >
                                    {INVENTORY_TYPES.map((t) => (
                                        <option className={s.wizard__option} key={t.value} value={t.value}>
                                            {t.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="wizard-expires" className="sr-only">Fecha de vencimiento</label>
                                <input
                                    id="wizard-expires"
                                    type="date"
                                    value={form.expiresAt}
                                    onChange={(e) => setField("expiresAt", e.target.value)}
                                    className={s.wizard__input}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Error — role="alert" lo anuncia automáticamente en lectores de pantalla */}
                <div role="alert" aria-live="assertive" className={s["wizard__error-zone"]}>
                    {error && step === 3 && (
                        <p className={s["wizard__error-msg"]}>{error}</p>
                    )}
                </div>

                {/* Footer */}
                <div className={s.wizard__footer}>

                    <button type="button" onClick={handleClose} className={s["wizard__btn-cancel"]}>
                        Cancelar
                    </button>

                    <button type="button" onClick={handleNext} className={s["wizard__btn-next"]}>
                        {step === 3 ? "Agregar" : "Siguiente →"}
                    </button>
                </div>

            </div>
        </div>
    );
}
export default WizardModal;
