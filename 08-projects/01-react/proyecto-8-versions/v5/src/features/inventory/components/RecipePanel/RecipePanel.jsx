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
import s from "./RecipePanel.module.css";

// ================= SUB-COMPONENTS: SHARED =================

function CategoryNav({ activeCategory, onSelect }) {
    return (
        <div className={`${s["recipe__category-nav"]} no-scrollbar`}>
            {RECIPE_CATEGORIES.map(({ id, label }) => (
                <button
                    key={id}
                    type="button"
                    onClick={() => onSelect(id)}
                    className={`${s["recipe__category-btn"]} ${activeCategory === id
                        ? s["recipe__category-btn--active"]
                        : s["recipe__category-btn--inactive"]
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
        <div className={s.recipe__empty}>
            <div className={s["recipe__empty-icon"]}>
                🍽
            </div>
            <p className={s["recipe__empty-text"]}>
                No hay recetas disponibles<br />para esta categoría.
            </p>
        </div>
    );
}

function NoInventoryState() {
    return (
        <div className={s.recipe__empty}>
            <div className={s["recipe__empty-icon"]}>
                🥦
            </div>
            <p className={s["recipe__empty-text"]}>
                Agrega alimentos a tu inventario<br />para recibir recetas personalizadas.
            </p>
        </div>
    );
}

// ================= SUB-COMPONENTS: LISTA =================

function RecipeListCard({ recipe, onSelect }) {
    const imageUrl = useRecipeImage(recipe.title, recipe.imageQuery);
    const fallbackGradient = "linear-gradient(145deg,#0D1B12 0%,#12221A 40%,#0A1510 100%)";

    return (
        <button
            type="button"
            onClick={() => onSelect(recipe)}
            className={s["recipe__list-card"]}
        >
            {/* Imagen cuadrada */}
            <div
                className={s["recipe__list-card-image"]}
                style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : fallbackGradient }}
            />

            {/* Info */}
            <div className={s["recipe__list-card-info"]}>
                {recipe.origin && (
                    <span className={s["recipe__list-card-origin"]}>{recipe.origin}</span>
                )}
                <h3 className={s["recipe__list-card-title"]} style={{ fontFamily: '"Fraunces", serif' }}>
                    {recipe.title}
                </h3>
                <span className={s["recipe__list-card-time"]}>⏱ {recipe.time}</span>

                {/* Chip de cobertura de ingredientes */}
                {recipe.matchCount > 0 && (
                    <span className={s["recipe__list-card-chip"]}>
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
        <div className={s["recipe__list-grid"]}>
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
    const fallbackGradient = "linear-gradient(145deg,#0D1B12 0%,#12221A 40%,#0A1510 100%)";

    return (
        <div className={s.recipe__hero}>
            {/* Imagen o gradiente de fallback */}
            <div
                className={s["recipe__hero-image"]}
                style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : fallbackGradient,
                }}
            />

            {/* Overlay superior suave */}
            <div className={s["recipe__hero-overlay-top"]} />

            {/* Overlay inferior fuerte para legibilidad del texto */}
            <div className={s["recipe__hero-overlay-bottom"]} />

            {/* Contenido */}
            <div className={s["recipe__hero-content"]}>
                {/* Chips de metadata */}
                {(recipe.origin || recipe.time || recipe.servings) && (
                    <div className={s["recipe__hero-chips"]}>
                        {recipe.origin && (
                            <span className={s["recipe__hero-chip"]}>
                                {recipe.origin}
                            </span>
                        )}
                        {recipe.time && (
                            <span className={s["recipe__hero-chip"]}>
                                <span>⏱</span>
                                <span>{recipe.time}</span>
                            </span>
                        )}
                        {recipe.servings && (
                            <span className={s["recipe__hero-chip"]}>
                                <span>🍽</span>
                                <span>{recipe.servings} {recipe.servings === 1 ? "porción" : "porciones"}</span>
                            </span>
                        )}
                    </div>
                )}

                {/* Título */}
                <h2 className={s["recipe__hero-title"]} style={{ fontFamily: '"Fraunces", serif' }}>
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
            <div className={s["recipe__ingredients-section"]}>
                <p className={s["recipe__ingredients-label"]}>
                    Ingredientes
                </p>
                <div className={s["recipe__ingredients-wrap"]}>
                    {allIngredients.map((ing) => (
                        <span
                            key={ing}
                            className={s["recipe__ingredient--neutral"]}
                        >
                            {ing}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={s["recipe__ingredients-section--multi"]}>
            {matched.length > 0 && (
                <div>
                    <p className={`${s["recipe__ingredients-label"]} ${s["recipe__ingredients-label--spaced"]}`}>
                        En tu inventario
                    </p>
                    <div className={s["recipe__ingredients-wrap"]}>
                        {matched.map((ing) => (
                            <span
                                key={ing}
                                className={s["recipe__ingredient--matched"]}
                            >
                                <span className={s["recipe__ingredient-check"]}>✓</span>
                                {ing}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {missing.length > 0 && (
                <div>
                    <p className={`${s["recipe__ingredients-label"]} ${s["recipe__ingredients-label--spaced"]}`}>
                        Necesitas conseguir
                    </p>
                    <div className={s["recipe__ingredients-wrap"]}>
                        {missing.map((ing) => (
                            <span
                                key={ing}
                                className={s["recipe__ingredient--missing"]}
                            >
                                <span className={s["recipe__ingredient-plus"]}>+</span>
                                {ing}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {matched.length === 0 && missing.length === 0 && allIngredients.length > 0 && (
                <div>
                    <p className={`${s["recipe__ingredients-label"]} ${s["recipe__ingredients-label--spaced"]}`}>
                        Ingredientes
                    </p>
                    <div className={s["recipe__ingredients-wrap"]}>
                        {allIngredients.map((ing) => (
                            <span
                                key={ing}
                                className={s["recipe__ingredient--neutral-dim"]}
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
    if (dotIndex < 0) return <strong className={s["recipe__step-bold"]}>{step}</strong>;

    const firstSentence = step.slice(0, dotIndex + 1);
    const rest = step.slice(dotIndex + 1);
    return (
        <>
            <strong className={s["recipe__step-bold"]}>{firstSentence}</strong>
            {rest}
        </>
    );
}

function StepsSection({ steps }) {
    return (
        <div className={s["recipe__steps-wrap"]}>
            <p className={s["recipe__steps-label"]}>
                Preparación
            </p>
            <ol className="space-y-0">
                {steps.map((step, i) => (
                    <li key={i} className={s.recipe__step}>
                        {/* Línea conectora */}
                        {i < steps.length - 1 && (
                            <div className={s["recipe__step-line"]} />
                        )}

                        {/* Número del paso */}
                        <div className={s["recipe__step-number"]}>
                            <span className={s["recipe__step-number-text"]}>
                                {String(i + 1).padStart(2, "0")}
                            </span>
                        </div>

                        {/* Texto del paso */}
                        <p className={s["recipe__step-text"]}>
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

            <div className={`${s["recipe__detail-scroll"]} no-scrollbar`}>
                <div className="card-enter pb-8 space-y-5">
                    <RecipeHero recipe={recipe} imageUrl={imageUrl} />

                    <div className="px-4"><div className={s["recipe__detail-divider"]} /></div>

                    <IngredientSection
                        matched={matched}
                        missing={missing}
                        allIngredients={allIngredients}
                        isPersonalized={isPersonalized}
                    />

                    {steps.length > 0 && (
                        <>
                            <div className="px-4"><div className={s["recipe__detail-divider"]} /></div>
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
            className={`${s.recipe__panel} ${isActive ? s["recipe__panel--active"] : s["recipe__panel--hidden"]}`}
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

                    <div className={`${s["recipe__content-scroll"]} no-scrollbar`}>
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