// ================= CONTEXTO MODULO =================
// Modal wizard de 3 pasos para agregar un alimento al inventario.
// Se ancla al DeviceShell (absolute inset-0) y se desliza desde abajo.
// Navegación: Enter (avanzar), Escape (cerrar), botones en pantalla.
// ================= IMPORTS =================
import { useCallback, useEffect, useRef, useState } from "react";
import { INVENTORY_TYPES, INVENTORY_UNITS } from "../../hooks/useInventory.jsx";

// ================= CONSTANTS =================
const STEP_LABELS = {
    1: "¿Qué alimento?",
    2: "Cantidad y unidad",
    3: "Tipo y vencimiento",
};

const INPUT_CLASSES = "w-full h-11 rounded-xl bg-white/7 border border-white/8 px-3 text-sm text-white outline-none focus:border-green-400/40 transition-colors placeholder:text-white/25";
const SELECT_CLASSES = "w-full h-11 rounded-xl bg-white/7 border border-white/8 px-3 text-sm text-white/80 outline-none focus:border-green-400/40 transition-colors";
const OPTION_CLASSES = "bg-[#0a0c14] text-white";

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
        <div role="dialog" aria-modal="true" aria-labelledby="wizard-step-label" className="absolute inset-0 z-30 flex items-end">

            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

            {/* Panel */}
            <div className="wizard-enter relative w-full rounded-t-2xl border border-b-0 backdrop-blur-xl px-5 pt-5 pb-6 bg-[var(--glass-dark)] border-[var(--glass-border)]">

                {/* Barra de progreso */}
                <div role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-label={`Paso ${step} de 3`} className="flex gap-1.5 mb-5">

                    {[1, 2, 3].map((n) => (
                        <div key={n}
                            className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${n <= step ? "bg-green-400" : "bg-white/15"}`}
                        />
                    ))}
                </div>

                {/* Etiqueta del paso — referenciada por aria-labelledby del dialog */}
                <p id="wizard-step-label" className="text-[10px] uppercase tracking-[0.14em] text-white/40 mb-3">
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
                                className={INPUT_CLASSES}
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="grid grid-cols-2 gap-2">
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
                                    className={INPUT_CLASSES}
                                />
                            </div>
                            <div>
                                <label htmlFor="wizard-unit" className="sr-only">Unidad de medida</label>
                                <select
                                    id="wizard-unit"
                                    value={form.unit}
                                    onChange={(e) => setField("unit", e.target.value)}
                                    className={SELECT_CLASSES}
                                >
                                    {INVENTORY_UNITS.map((u) => (
                                        <option className={OPTION_CLASSES} key={u.value} value={u.value}>
                                            {u.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label htmlFor="wizard-type" className="sr-only">Tipo de alimento</label>
                                <select
                                    id="wizard-type"
                                    data-wizard-focus=""
                                    value={form.type}
                                    onChange={(e) => setField("type", e.target.value)}
                                    className={SELECT_CLASSES}
                                >
                                    {INVENTORY_TYPES.map((t) => (
                                        <option className={OPTION_CLASSES} key={t.value} value={t.value}>
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
                                    className={INPUT_CLASSES}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Error — role="alert" lo anuncia automáticamente en lectores de pantalla */}
                <div role="alert" aria-live="assertive" className="min-h-5 mt-2">
                    {error && step === 3 && (
                        <p className="text-xs text-rose-400">{error}</p>
                    )}
                </div>

                {/* Footer */}
                <div className="flex gap-2 mt-5">

                    <button type="button" onClick={handleClose} className="h-10 px-4 rounded-xl bg-white/5 border border-white/7 text-sm text-white/40 transition-colors hover:text-white/65 hover:bg-white/8">
                        Cancelar
                    </button>

                    <button type="button" onClick={handleNext} className="flex-1 h-10 rounded-xl bg-green-500/15 border border-green-400/25 text-sm text-green-300 transition-colors hover:bg-green-500/20 hover:border-green-400/35">
                        {step === 3 ? "Agregar" : "Siguiente →"}
                    </button>
                </div>

            </div>
        </div>
    );
}
export default WizardModal;
