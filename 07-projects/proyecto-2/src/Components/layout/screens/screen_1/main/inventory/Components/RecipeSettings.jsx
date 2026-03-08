// ================= CONTEXTO MODULO =================
// Panel de detalle para receta recomendada.
// Muestra foto, ingredientes disponibles/faltantes y pasos.

// ================= IMPORTS =================
import { useCallback, useEffect } from "react";
import SettingsHeader from "../../../ui/settings/SettingsHeader.jsx";
import { useInventoryRecipeSuggestions } from "../hooks/useInventoryRecipeSuggestions.jsx";
import recipesBg from "@assets/images/recipes-bg.jpg";

// ================= COMPONENT =================
function RecipeSettings({ isActive, onBack }) {
    const { itemCount, recommendedRecipe } = useInventoryRecipeSuggestions();

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
            className={`absolute inset-0 z-20 flex flex-col bg-[#1B1C27] text-white transition-transform duration-500 ease-out ${isActive ? "translate-x-0" : "-translate-x-full"}`}
        >
            <SettingsHeader title="Receta" onBack={handleClose} />

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pb-6 space-y-4 no-scrollbar">
                <article className="rounded-3xl overflow-hidden border border-white/15 bg-black/25">
                    <div
                        className="relative h-52 bg-cover bg-center"
                        style={{ backgroundImage: `url(${recipesBg})` }}
                    >
                        <div className="absolute inset-0 bg-black/35" />

                        <div className="absolute inset-x-0 top-0 px-4 py-2 bg-gradient-to-b from-black/85 via-black/55 to-transparent backdrop-blur-[1px]">
                            <p className="text-xs font-medium uppercase tracking-wide text-white/90">
                                Receta recomendada
                            </p>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 px-4 py-3 bg-gradient-to-t from-black/90 via-black/55 to-transparent backdrop-blur-[1px]">
                            <h2 className="text-2xl font-semibold leading-tight text-white">
                                {recipe?.title || "Sin sugerencia por ahora"}
                            </h2>
                        </div>
                    </div>
                </article>

                {!hasInventory && (
                    <article className="rounded-3xl backdrop-blur-xl bg-white/10 p-4">
                        <p className="text-sm text-white/85">
                            Agrega alimentos en tu inventario para recibir receta, ingredientes
                            faltantes y pasos automaticamente.
                        </p>
                    </article>
                )}

                {hasInventory && recipe && (
                    <>
                        <article className="rounded-3xl backdrop-blur-xl bg-white/10 p-4">
                            <p className="text-xs uppercase tracking-wide text-white/70">
                                Ingredientes disponibles
                            </p>
                            {matched.length > 0 ? (
                                <ul className="mt-2 space-y-1 text-sm text-white/90">
                                    {matched.map((ingredient) => (
                                        <li key={`ok-${ingredient}`}>- {ingredient}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-2 text-sm text-white/75">
                                    Sin coincidencias por ahora.
                                </p>
                            )}
                        </article>

                        <article className="rounded-3xl backdrop-blur-xl bg-white/10 p-4">
                            <p className="text-xs uppercase tracking-wide text-white/70">
                                Ingredientes faltantes
                            </p>
                            {missing.length > 0 ? (
                                <ul className="mt-2 space-y-1 text-sm text-white/90">
                                    {missing.map((ingredient) => (
                                        <li key={`miss-${ingredient}`}>- {ingredient}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-2 text-sm text-emerald-200">
                                    Receta completa, no faltan ingredientes.
                                </p>
                            )}
                        </article>

                        <article className="rounded-3xl backdrop-blur-xl bg-white/10 p-4">
                            <p className="text-xs uppercase tracking-wide text-white/70">
                                Paso a paso
                            </p>
                            {steps.length > 0 ? (
                                <ol className="mt-2 space-y-2 text-sm text-white/90">
                                    {steps.map((step, index) => (
                                        <li key={`step-${index}`}>
                                            <span className="font-semibold mr-1">{index + 1}.</span>
                                            {step}
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p className="mt-2 text-sm text-white/75">
                                    No hay pasos cargados para esta receta.
                                </p>
                            )}
                        </article>
                    </>
                )}
            </div>
        </section>
    );
}

export default RecipeSettings;
