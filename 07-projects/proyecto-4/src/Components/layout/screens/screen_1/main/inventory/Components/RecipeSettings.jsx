// ================= CONTEXTO MODULO =================
// Panel de detalle para receta recomendada.
// Muestra foto, ingredientes disponibles/faltantes y pasos.

// ================= IMPORTS =================
import { useCallback, useEffect } from "react";
import SettingsHeader from "../../../ui/settings/SettingsHeader.jsx";
import { useInventoryRecipeSuggestions } from "../hooks/useInventoryRecipeSuggestions.jsx";
import { useRecipeImage } from "../hooks/useRecipeImage.jsx";

// ================= COMPONENT =================
function RecipeSettings({ isActive, onBack }) {
    const { itemCount, recommendedRecipe } = useInventoryRecipeSuggestions();
    const imageUrl = useRecipeImage(recommendedRecipe?.title ?? null);

    const hasInventory = itemCount > 0;
    const recipe = recommendedRecipe;
    const matched = recipe?.matchedIngredients || [];
    const missing = recipe?.missingIngredients || [];
    const steps = recipe?.steps || [];

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
            <SettingsHeader title="Receta" onBack={handleClose} />

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pb-6 space-y-3 no-scrollbar pt-4">

                {/* Hero imagen */}
                <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
                    <div
                        className="relative h-48 bg-cover bg-center bg-[#0D0F1A]"
                        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
                    >
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-[10px] uppercase tracking-[0.14em] text-white/50 mb-1">Receta recomendada</p>
                            <h2 className="text-xl font-medium leading-tight text-white">
                                {recipe?.title || "Sin sugerencia por ahora"}
                            </h2>
                        </div>
                    </div>
                </div>

                {!hasInventory && (
                    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4">
                        <p className="text-sm text-white/50">
                            Agrega alimentos en tu inventario para recibir recetas, ingredientes
                            faltantes y pasos automáticamente.
                        </p>
                    </div>
                )}

                {hasInventory && recipe && (
                    <>
                        {/* Ingredientes disponibles */}
                        <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4">
                            <span className="block text-[10px] uppercase tracking-[0.14em] text-white/40 font-medium mb-3">Disponibles</span>
                            {matched.length > 0 ? (
                                <ul className="space-y-1.5">
                                    {matched.map((ingredient) => (
                                        <li key={`ok-${ingredient}`} className="flex items-center gap-2 text-sm text-white/75">
                                            <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                                            {ingredient}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-white/30">Sin coincidencias por ahora.</p>
                            )}
                        </div>

                        {/* Ingredientes faltantes */}
                        <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4">
                            <span className="block text-[10px] uppercase tracking-[0.14em] text-white/40 font-medium mb-3">Faltantes</span>
                            {missing.length > 0 ? (
                                <ul className="space-y-1.5">
                                    {missing.map((ingredient) => (
                                        <li key={`miss-${ingredient}`} className="flex items-center gap-2 text-sm text-white/75">
                                            <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                                            {ingredient}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-emerald-400">Receta completa, no faltan ingredientes.</p>
                            )}
                        </div>

                        {/* Pasos */}
                        <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4">
                            <span className="block text-[10px] uppercase tracking-[0.14em] text-white/40 font-medium mb-3">Paso a paso</span>
                            {steps.length > 0 ? (
                                <ol className="space-y-2.5">
                                    {steps.map((step, index) => (
                                        <li key={`step-${index}`} className="flex gap-3 text-sm text-white/75">
                                            <span className="text-[11px] font-medium text-white/30 pt-0.5 tabular-nums shrink-0">{String(index + 1).padStart(2, "0")}</span>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p className="text-sm text-white/30">No hay pasos cargados para esta receta.</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default RecipeSettings;
