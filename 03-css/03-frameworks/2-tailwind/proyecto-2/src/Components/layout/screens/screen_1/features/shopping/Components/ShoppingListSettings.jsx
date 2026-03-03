// ================= CONTEXTO MODULO =================
// Pantalla de lista inteligente de compras.
// Muestra resumen, checklist interactivo y limpieza de items completados.
import { FiCheck, FiCircle } from "react-icons/fi";
import SettingsHeader from "../../../ui/settings/SettingsHeader.jsx";
import { useSmartShoppingList } from "../hooks/useSmartShoppingList.jsx";

function getToneClass(tone) {
    if (tone === "recipe") return "bg-cyan-500/20 text-cyan-100";
    if (tone === "stock") return "bg-amber-500/20 text-amber-100";
    return "bg-emerald-500/20 text-emerald-100";
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

    return (
        <section
            className={`absolute inset-0 z-20 flex flex-col bg-[#1B1C27] text-white transition-transform duration-500 ease-out ${isActive ? "translate-x-0" : "-translate-x-full"}`}
        >
            <SettingsHeader title="Lista inteligente" onBack={onBack} />

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pb-6 space-y-4 no-scrollbar">
                <article className="rounded-3xl backdrop-blur-xl bg-white/10 p-4">
                    <p className="text-sm uppercase tracking-wide text-white/70">Resumen</p>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-xl bg-black/20 p-2">
                            <p className="text-[11px] text-white/70">Total</p>
                            <p className="text-lg font-semibold">{suggestedItems.length}</p>
                        </div>
                        <div className="rounded-xl bg-black/20 p-2">
                            <p className="text-[11px] text-white/70">Pendientes</p>
                            <p className="text-lg font-semibold">{pendingCount}</p>
                        </div>
                        <div className="rounded-xl bg-black/20 p-2">
                            <p className="text-[11px] text-white/70">Listos</p>
                            <p className="text-lg font-semibold">{doneCount}</p>
                        </div>
                    </div>
                    <p className="text-xs text-white/65 mt-3">
                        {recipeTitle
                            ? `Reforzada por receta: ${recipeTitle}`
                            : "Agrega alimentos en tu inventario para mejorar sugerencias"}
                    </p>
                </article>

                <article className="rounded-3xl backdrop-blur-xl bg-white/10 p-4">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-sm uppercase tracking-wide text-white/70">Compras sugeridas</p>
                        <button
                            type="button"
                            onClick={clearCompleted}
                            className="text-[11px] px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            Limpiar checks
                        </button>
                    </div>

                    <div className="mt-3 space-y-2">
                        {suggestedItems.length === 0 && (
                            <p className="text-sm text-white/65 text-center py-3">
                                Todo al dia. No hay compras prioritarias por ahora.
                            </p>
                        )}

                        {suggestedItems.map((item) => {
                            const isDone = checkedIds.includes(item.id);

                            return (
                                <article
                                    key={item.id}
                                    className={`rounded-2xl border p-3 transition-colors ${isDone ? "bg-emerald-500/15 border-emerald-400/20" : "bg-black/20 border-white/10"}`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleChecked(item.id)}
                                        className="w-full flex items-start gap-3 text-left"
                                    >
                                        <span className="pt-0.5">
                                            {isDone ? (
                                                <FiCheck className="w-4 h-4 text-emerald-200" />
                                            ) : (
                                                <FiCircle className="w-4 h-4 text-white/60" />
                                            )}
                                        </span>

                                        <span className="min-w-0">
                                            <span className={`text-sm font-medium block ${isDone ? "line-through text-white/70" : "text-white"}`}>
                                                {item.label}
                                            </span>
                                            <span className={`text-[11px] mt-1 inline-flex px-2 py-1 rounded-full ${getToneClass(item.tone)}`}>
                                                {item.reason}
                                            </span>
                                        </span>
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </article>
            </div>
        </section>
    );
}

export default ShoppingListSettings;
