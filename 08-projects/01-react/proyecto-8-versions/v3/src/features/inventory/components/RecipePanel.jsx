// ================= CONTEXTO MODULO =================
// Panel de recetas — landing con imagen, ingredientes y pasos detallados.
// Nav de categorías en la parte superior para filtrar por tipo de receta.

// ================= IMPORTS =================
import { useCallback, useEffect, useMemo, useState } from "react";
import SettingsHeader from "@ui/SettingsHeader.jsx";
import { useInventoryRecipeSuggestions } from "@features/inventory/hooks/useInventoryRecipeSuggestions.jsx";
import { useRecipeImage } from "@features/inventory/hooks/useRecipeImage.jsx";
import { RECIPE_CATALOG, RECIPE_CATEGORIES } from "@features/inventory/constants/recipeSuggestions.js";

// ================= SUB-COMPONENTS =================

function CategoryNav({ activeCategory, onSelect }) {
    return (
        <div className="flex gap-2 pl-2 pr-4 pb-3 overflow-x-auto no-scrollbar shrink-0">
            {RECIPE_CATEGORIES.map(({ id, label }) => (
                <button
                    key={id}
                    type="button"
                    onClick={() => onSelect(id)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all duration-200 border ${activeCategory === id
                            ? "border-[#22C55E] text-[#22C55E] bg-[#22C55E]/10"
                            : "border-white/10 text-white/45 bg-white/6 hover:text-white/75 hover:bg-white/10"
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

function RecipeHero({ recipe, imageUrl }) {
    const fallbackGradient = "linear-gradient(145deg,#0D1B12 0%,#12221A 40%,#0A1510 100%)";

    return (
        <div className="relative h-52 mx-4 rounded-2xl overflow-hidden shrink-0">
            {/* Imagen o gradiente de fallback */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : fallbackGradient,
                }}
            />

            {/* Overlay superior suave */}
            <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/50 to-transparent" />

            {/* Overlay inferior fuerte para legibilidad del texto */}
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-black/95 via-black/50 to-transparent" />

            {/* Contenido */}
            <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
                {/* Chips de metadata */}
                {(recipe.time || recipe.servings) && (
                    <div className="flex items-center gap-1.5 mb-2.5">
                        {recipe.time && (
                            <span className="flex items-center gap-1 text-[10px] text-white/65 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1 leading-none">
                                <span>⏱</span>
                                <span>{recipe.time}</span>
                            </span>
                        )}
                        {recipe.servings && (
                            <span className="flex items-center gap-1 text-[10px] text-white/65 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1 leading-none">
                                <span>🍽</span>
                                <span>{recipe.servings} {recipe.servings === 1 ? "porción" : "porciones"}</span>
                            </span>
                        )}
                    </div>
                )}

                {/* Título */}
                <h2 className="text-[22px] font-semibold leading-tight text-white">
                    {recipe.title}
                </h2>
            </div>
        </div>
    );
}

function IngredientSection({ matched, missing, allIngredients, isPersonalized }) {
    // Sin contexto de inventario → mostrar todos los ingredientes de forma neutral
    if (!isPersonalized) {
        return (
            <div className="px-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 font-medium mb-2.5">
                    Ingredientes
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {allIngredients.map((ing) => (
                        <span
                            key={ing}
                            className="px-3 py-2 rounded-full bg-white/6 border border-white/10 text-[12px] text-white/65 capitalize"
                        >
                            {ing}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 space-y-3.5">
            {matched.length > 0 && (
                <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 font-medium mb-2">
                        En tu inventario
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {matched.map((ing) => (
                            <span
                                key={ing}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[12px] text-emerald-400 font-medium capitalize"
                            >
                                <span className="text-[9px] font-bold">✓</span>
                                {ing}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {missing.length > 0 && (
                <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 font-medium mb-2">
                        Necesitas conseguir
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {missing.map((ing) => (
                            <span
                                key={ing}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-amber-500/8 border border-amber-500/20 text-[12px] text-amber-400/80 capitalize"
                            >
                                <span className="text-[9px]">+</span>
                                {ing}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {matched.length === 0 && missing.length === 0 && allIngredients.length > 0 && (
                <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 font-medium mb-2">
                        Ingredientes
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {allIngredients.map((ing) => (
                            <span
                                key={ing}
                                className="px-3 py-2 rounded-full bg-white/6 border border-white/10 text-[12px] text-white/60 capitalize"
                            >
                                {ing}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function StepsSection({ steps }) {
    return (
        <div className="px-4">
            <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 font-medium mb-4">
                Preparación
            </p>
            <ol className="space-y-0">
                {steps.map((step, i) => (
                    <li key={i} className="relative flex gap-4 pb-5 last:pb-0">
                        {/* Línea conectora */}
                        {i < steps.length - 1 && (
                            <div className="absolute left-4.25 top-9 bottom-0 w-px bg-white/7" />
                        )}

                        {/* Número del paso */}
                        <div className="relative z-10 shrink-0 w-8.5 h-8.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mt-0.5">
                            <span className="text-[10px] font-semibold text-white/35 tabular-nums">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                        </div>

                        {/* Texto del paso */}
                        <p className="text-[13px] text-white/72 leading-relaxed pt-1.5">
                            {step}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-white/4 border border-white/8 flex items-center justify-center mb-4 text-xl">
                🍽
            </div>
            <p className="text-[13px] text-white/35 leading-relaxed">
                No hay recetas disponibles<br />para esta categoría.
            </p>
        </div>
    );
}

function NoInventoryState() {
    return (
        <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-white/4 border border-white/8 flex items-center justify-center mb-4 text-xl">
                🥦
            </div>
            <p className="text-[13px] text-white/35 leading-relaxed">
                Agrega alimentos a tu inventario<br />para recibir recetas personalizadas.
            </p>
        </div>
    );
}

// ================= COMPONENT =================
function RecipePanel({ isActive, onBack }) {
    const [activeCategory, setActiveCategory] = useState("para-ti");
    const { recommendedRecipe, itemCount } = useInventoryRecipeSuggestions();

    const isPersonalized = activeCategory === "para-ti";

    const displayedRecipe = useMemo(() => {
        if (isPersonalized) return recommendedRecipe;
        return RECIPE_CATALOG.find((r) => r.category === activeCategory) ?? null;
    }, [activeCategory, recommendedRecipe, isPersonalized]);

    const imageUrl = useRecipeImage(
        displayedRecipe?.title ?? null,
        displayedRecipe?.imageQuery,
    );

    const matched = isPersonalized ? (displayedRecipe?.matchedIngredients ?? []) : [];
    const missing = isPersonalized ? (displayedRecipe?.missingIngredients ?? []) : [];
    const allIngredients = displayedRecipe?.ingredients ?? [];
    const steps = displayedRecipe?.steps ?? [];

    const handleClose = useCallback(() => onBack?.(), [onBack]);

    useEffect(() => {
        if (!isActive) return;
        const handler = (e) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isActive, handleClose]);

    const showNoInventory = isPersonalized && itemCount === 0;

    return (
        <section
            className={`absolute inset-0 z-20 flex flex-col bg-[#0D0F1A] text-white transition-transform duration-500 ease-out ${isActive ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <SettingsHeader title="Recetas" onBack={handleClose} />

            <CategoryNav activeCategory={activeCategory} onSelect={setActiveCategory} />

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar">
                {showNoInventory ? (
                    <NoInventoryState />
                ) : !displayedRecipe ? (
                    <EmptyState />
                ) : (
                    <div key={`${activeCategory}-${displayedRecipe.id}`} className="card-enter pb-8 space-y-5">
                        <RecipeHero recipe={displayedRecipe} imageUrl={imageUrl} />

                        <div className="px-4"><div className="h-px bg-white/6" /></div>

                        <IngredientSection
                            matched={matched}
                            missing={missing}
                            allIngredients={allIngredients}
                            isPersonalized={isPersonalized}
                        />

                        {steps.length > 0 && (
                            <>
                                <div className="px-4"><div className="h-px bg-white/6" /></div>
                                <StepsSection steps={steps} />
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default RecipePanel;
