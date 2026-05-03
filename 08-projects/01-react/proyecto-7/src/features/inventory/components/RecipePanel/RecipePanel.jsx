// ================= CONTEXTO MODULO =================
// Panel de recetas — lista de recetas por categoría + detalle con ingredientes y pasos.
// Nav de categorías en la parte superior para filtrar por tipo de receta.
// Vista lista → tap en card → vista detalle. Mínimo de toques (manos sucias).

// ================= IMPORTS =================
import { useCallback, useMemo, useState } from "react";
import SettingsHeader from "@ui/SettingsHeader.jsx";
import { useEscapeKey } from "@hooks/useEscapeKey.jsx";
import { useInventoryRecipeSuggestions } from "@features/inventory/hooks/useInventoryRecipeSuggestions.jsx";
import { useRecipeImage } from "@features/inventory/hooks/useRecipeImage.jsx";
import { RECIPE_CATALOG, RECIPE_CATEGORIES } from "@features/inventory/constants/recipeSuggestions.js";

// ================= CONSTANTS =================
const FALLBACK_GRADIENT = "linear-gradient(145deg,#0D1B12 0%,#12221A 40%,#0A1510 100%)";
const INGREDIENTS_LABEL = "text-[10px] uppercase tracking-[0.14em] text-white/35 font-medium mb-2.5";
const INGREDIENTS_LABEL_SPACED = "text-[10px] uppercase tracking-[0.14em] text-white/35 font-medium mb-2";
const INGREDIENTS_WRAP = "flex flex-wrap gap-1.5";
const HERO_CHIP = "flex items-center gap-1 text-[10px] text-white/65 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1 leading-none";

// ================= SUB-COMPONENTS: SHARED =================

function CategoryNav({ activeCategory, onSelect }) {
    return (
        <div className="flex gap-2 pl-2 pr-4 pb-3 overflow-x-auto shrink-0 no-scrollbar">
            {RECIPE_CATEGORIES.map(({ id, label }) => (
                <button
                    key={id}
                    type="button"
                    onClick={() => onSelect(id)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all duration-200 border ${activeCategory === id
                        ? "border-accent text-accent bg-accent/10"
                        : "border-white/10 text-white/45 bg-white/6 hover:text-white/75 hover:bg-white/10"
                        }`}
                >
                    {label}
                </button>
            ))}
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

// ================= SUB-COMPONENTS: LISTA =================

function RecipeListCard({ recipe, onSelect }) {
    const imageUrl = useRecipeImage(recipe.title, recipe.imageQuery);

    return (
        <button
            type="button"
            onClick={() => onSelect(recipe)}
            className="rounded-xl overflow-hidden border border-white/8 active:scale-[0.97] transition-transform duration-150 text-left"
        >
            {/* Imagen cuadrada */}
            <div
                className="aspect-square bg-cover bg-position-[center_60%]"
                style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : FALLBACK_GRADIENT }}
            />

            {/* Info */}
            <div className="px-2.5 py-2.5 bg-white/4">
                {recipe.origin && (
                    <span className="text-[10px] text-white/40">{recipe.origin}</span>
                )}
                <h3 className="text-[14px] font-semibold text-white/90 leading-tight mt-0.5 line-clamp-2" style={{ fontFamily: '"Fraunces", serif' }}>
                    {recipe.title}
                </h3>
                <span className="text-[11px] text-white/40 mt-1 block">⏱ {recipe.time}</span>

                {/* Chip de cobertura de ingredientes */}
                {recipe.matchCount > 0 && (
                    <span className="inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                        ✓ {recipe.matchCount}/{recipe.ingredients.length}
                    </span>
                )}
            </div>
        </button>
    );
}

function RecipeList({ recipes, onSelect }) {
    if (!recipes.length) return <EmptyState />;

    return (
        <div className="grid grid-cols-2 gap-3 px-4 pb-6">
            {recipes.map((recipe) => (
                <RecipeListCard
                    key={recipe.id}
                    recipe={recipe}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}

// ================= SUB-COMPONENTS: DETALLE =================

function RecipeHero({ recipe, imageUrl }) {
    return (
        <div className="relative h-52 mx-4 rounded-2xl overflow-hidden shrink-0">
            {/* Imagen o gradiente de fallback */}
            <div
                className="absolute inset-0 bg-cover bg-position-[center_60%]"
                style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : FALLBACK_GRADIENT,
                }}
            />

            {/* Overlay superior suave */}
            <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/50 to-transparent" />

            {/* Overlay inferior fuerte para legibilidad del texto */}
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-black/95 via-black/50 to-transparent" />

            {/* Contenido */}
            <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
                {/* Chips de metadata */}
                {(recipe.origin || recipe.time || recipe.servings) && (
                    <div className="flex items-center gap-1.5 mb-2.5">
                        {recipe.origin && (
                            <span className={HERO_CHIP}>
                                {recipe.origin}
                            </span>
                        )}
                        {recipe.time && (
                            <span className={HERO_CHIP}>
                                <span>⏱</span>
                                <span>{recipe.time}</span>
                            </span>
                        )}
                        {recipe.servings && (
                            <span className={HERO_CHIP}>
                                <span>🍽</span>
                                <span>{recipe.servings} {recipe.servings === 1 ? "porción" : "porciones"}</span>
                            </span>
                        )}
                    </div>
                )}

                {/* Título */}
                <h2 className="text-[22px] font-semibold leading-tight text-white" style={{ fontFamily: '"Fraunces", serif' }}>
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
                <p className={INGREDIENTS_LABEL}>
                    Ingredientes
                </p>
                <div className={INGREDIENTS_WRAP}>
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
                    <p className={INGREDIENTS_LABEL_SPACED}>
                        En tu inventario
                    </p>
                    <div className={INGREDIENTS_WRAP}>
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
                    <p className={INGREDIENTS_LABEL_SPACED}>
                        Necesitas conseguir
                    </p>
                    <div className={INGREDIENTS_WRAP}>
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
                    <p className={INGREDIENTS_LABEL_SPACED}>
                        Ingredientes
                    </p>
                    <div className={INGREDIENTS_WRAP}>
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

function renderStepText(step) {
    const dotIndex = step.indexOf(". ");
    if (dotIndex < 0) return <strong className="text-white/90">{step}</strong>;

    const firstSentence = step.slice(0, dotIndex + 1);
    const rest = step.slice(dotIndex + 1);
    return (
        <>
            <strong className="text-white/90">{firstSentence}</strong>
            {rest}
        </>
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
                        <p className="text-[14px] text-white/80 leading-relaxed pt-1.5">
                            {renderStepText(step)}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    );
}

function RecipeDetail({ recipe, imageUrl, isPersonalized, onBack }) {
    const matched = isPersonalized ? (recipe.matchedIngredients ?? []) : [];
    const missing = isPersonalized ? (recipe.missingIngredients ?? []) : [];
    const allIngredients = recipe.ingredients ?? [];
    const steps = recipe.steps ?? [];

    return (
        <>
            <SettingsHeader title={recipe.title} onBack={onBack} />

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar">
                <div className="card-enter pb-8 space-y-5">
                    <RecipeHero recipe={recipe} imageUrl={imageUrl} />

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
            </div>
        </>
    );
}

// ================= COMPONENT =================
function RecipePanel({ isActive, onBack }) {
    const [activeCategory, setActiveCategory] = useState("para-ti");
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const { suggestedRecipes, enrichedCatalog, itemCount } = useInventoryRecipeSuggestions();

    const isPersonalized = activeCategory === "para-ti";

    const recipes = useMemo(() => {
        if (isPersonalized) return suggestedRecipes;
        return enrichedCatalog.filter((r) => r.category === activeCategory).slice(0, 4);
    }, [activeCategory, suggestedRecipes, enrichedCatalog, isPersonalized]);

    const imageUrl = useRecipeImage(
        selectedRecipe?.title ?? null,
        selectedRecipe?.imageQuery,
    );

    const handleClose = useCallback(() => onBack?.(), [onBack]);

    const handleCategoryChange = useCallback((category) => {
        setActiveCategory(category);
        setSelectedRecipe(null);
    }, []);

    const handleBack = useCallback(() => {
        if (selectedRecipe) {
            setSelectedRecipe(null);
        } else {
            handleClose();
        }
    }, [selectedRecipe, handleClose]);

    useEscapeKey(isActive, handleBack);

    const showNoInventory = isPersonalized && itemCount === 0 && !selectedRecipe;

    return (
        <section
            className={`absolute inset-0 z-20 flex flex-col bg-[#0D0F1A] text-white transition-transform duration-500 ease-out ${isActive ? "translate-x-0" : "-translate-x-full"}`}
        >
            {selectedRecipe ? (
                <RecipeDetail
                    recipe={selectedRecipe}
                    imageUrl={imageUrl}
                    isPersonalized={isPersonalized}
                    onBack={() => setSelectedRecipe(null)}
                />
            ) : (
                <>
                    <SettingsHeader title="Recetas" onBack={handleClose} />

                    <CategoryNav activeCategory={activeCategory} onSelect={handleCategoryChange} />

                    <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar">
                        {showNoInventory ? (
                            <NoInventoryState />
                        ) : (
                            <RecipeList
                                recipes={recipes}
                                onSelect={setSelectedRecipe}
                            />
                        )}
                    </div>
                </>
            )}
        </section>
    );
}
export default RecipePanel;
