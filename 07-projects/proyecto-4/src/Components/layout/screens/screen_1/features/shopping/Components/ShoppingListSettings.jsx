// ================= CONTEXTO MODULO =================
// Pantalla de lista inteligente de compras.
// Muestra resumen, checklist interactivo y limpieza de items completados.
import { useCallback, useEffect } from "react";
import { FiCheck, FiCircle } from "react-icons/fi";
import SettingsHeader from "../../../ui/settings/SettingsHeader.jsx";
import { useSmartShoppingList } from "../hooks/useSmartShoppingList.jsx";

function getToneClass(tone) {
    if (tone === "recipe") return "bg-cyan-500/15 text-cyan-300/80";
    if (tone === "stock") return "bg-amber-500/15 text-amber-300/80";
    return "bg-emerald-500/15 text-emerald-300/80";
}

function ShoppingListSettings({ isActive, onBack }) {
    const {
        recipeTitle,
        suggestedItems,
        checkedIds,
        doneCount,
        pendingCount,
        toggleChecked,
        clearCompleted,
    } = useSmartShoppingList();

    const handleClose = useCallback(() => {
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

    return (
        <section
            className={`absolute inset-0 z-20 flex flex-col bg-[#0D0F1A] text-white transition-transform duration-500 ease-out ${isActive ? "translate-x-0" : "-translate-x-full"}`}
        >
            <SettingsHeader title="Lista inteligente" onBack={handleClose} />

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pb-6 space-y-3 no-scrollbar pt-4">

                {/* Resumen */}
                <div className="rounded-2xl bg-white/4 border border-white/6 p-4">
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-white/40 font-medium mb-3">Resumen</span>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        {[
                            { label: "Total", value: suggestedItems.length },
                            { label: "Pendientes", value: pendingCount },
                            { label: "Listos", value: doneCount },
                        ].map(({ label, value }) => (
                            <div key={label} className="rounded-xl bg-white/5 border border-white/6 py-2.5">
                                <p className="text-[10px] text-white/35 uppercase tracking-wide">{label}</p>
                                <p className="text-lg font-light text-white/90 mt-0.5">{value}</p>
                            </div>
                        ))}
                    </div>
                    {recipeTitle && (
                        <p className="text-[11px] text-white/30 mt-3">Reforzada por: {recipeTitle}</p>
                    )}
                </div>

                {/* Lista */}
                <div className="rounded-2xl bg-white/4 border border-white/6 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase tracking-[0.14em] text-white/40 font-medium">Compras sugeridas</span>
                        <button
                            type="button"
                            onClick={clearCompleted}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/[0.07] text-white/35 hover:text-white/65 transition-colors"
                        >
                            Limpiar
                        </button>
                    </div>

                    <div className="space-y-1.5">
                        {suggestedItems.length === 0 && (
                            <p className="text-xs text-white/30 text-center py-4">
                                Todo al día. Sin compras prioritarias.
                            </p>
                        )}

                        {suggestedItems.map((item) => {
                            const isDone = checkedIds.includes(item.id);

                            return (
                                <article
                                    key={item.id}
                                    className={`rounded-xl border px-3 py-2.5 transition-colors ${isDone ? "bg-white/3 border-white/4" : "bg-white/5 border-white/6"}`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleChecked(item.id)}
                                        className="w-full flex items-center gap-3 text-left"
                                    >
                                        <span className="shrink-0">
                                            {isDone ? (
                                                <FiCheck className="w-4 h-4 text-emerald-400/60" />
                                            ) : (
                                                <FiCircle className="w-4 h-4 text-white/25" />
                                            )}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className={`text-sm block font-medium ${isDone ? "line-through text-white/30" : "text-white/80"}`}>
                                                {item.label}
                                            </span>
                                            <span className={`text-[10px] mt-1 inline-flex px-2 py-0.5 rounded-full ${getToneClass(item.tone)}`}>
                                                {item.reason}
                                            </span>
                                        </span>
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ShoppingListSettings;