// ================= IMPORTS =================
import Card from "./Card.jsx";
import { useInventoryRecipeSuggestions } from "../../layout/main/inventory/hooks/useInventoryRecipeSuggestions.jsx";

function IngredientChip({ name, tone }) {
    return (
        <span className={`text-[10px] leading-none rounded-md px-1.5 py-1 ${tone}`}>
            {name}
        </span>
    );
}

// ================= FUNCION =================
// CardRecipe: helper/componente interno; parametros: { className = "", ...props }
function CardRecipe({ className = "", ...props }) {
    const { itemCount, recommendedRecipe } = useInventoryRecipeSuggestions();

    const hasInventory = itemCount > 0;
    const recipe = recommendedRecipe;
    const matched = recipe?.matchedIngredients || [];
    const missing = recipe?.missingIngredients || [];
    const steps = recipe?.steps || [];

    return (
        <Card
            as="div"
            className={`relative overflow-hidden bg-linear-to-br from-amber-100 via-orange-200 to-red-300 text-slate-900 flex flex-col items-start justify-between p-3 ${className}`}
            {...props}
        >
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,white,transparent_55%)] pointer-events-none" />

            <div className="relative z-10 w-full">
                <p className="text-[11px] uppercase tracking-wide text-slate-700/80">Receta recomendada</p>
                <h3 className="text-sm sm:text-base font-semibold leading-tight mt-1 truncate">
                    {recipe?.title || "Sin sugerencia por ahora"}
                </h3>
                <p className="text-[11px] text-slate-700/80 mt-1">
                    {hasInventory
                        ? `${matched.length}/${(matched.length + missing.length) || 0} ingrediente(s) disponibles`
                        : "Agrega alimentos en Main para obtener recomendaciones"}
                </p>
            </div>

            <div className="relative z-10 w-full mt-2 flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2 pr-1">
                {!hasInventory && (
                    <p className="text-[11px] text-slate-700/80 rounded-md bg-white/55 px-2 py-1">
                        Completa tu inventario y te mostramos receta, faltantes y pasos automaticamente.
                    </p>
                )}

                {hasInventory && recipe && (
                    <>
                        <section>
                            <p className="text-[11px] uppercase tracking-wide text-slate-700/80">Tienes</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                                {matched.length === 0 && (
                                    <IngredientChip name="Nada aun" tone="bg-white/70 text-slate-700" />
                                )}
                                {matched.map((ingredient) => (
                                    <IngredientChip
                                        key={`ok-${ingredient}`}
                                        name={`✓ ${ingredient}`}
                                        tone="bg-emerald-100 text-emerald-800"
                                    />
                                ))}
                            </div>
                        </section>

                        <section>
                            <p className="text-[11px] uppercase tracking-wide text-slate-700/80">Faltan</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                                {missing.length === 0 && (
                                    <IngredientChip name="Completa" tone="bg-emerald-100 text-emerald-800" />
                                )}
                                {missing.map((ingredient) => (
                                    <IngredientChip
                                        key={`miss-${ingredient}`}
                                        name={`• ${ingredient}`}
                                        tone="bg-rose-100 text-rose-800"
                                    />
                                ))}
                            </div>
                        </section>

                        <section>
                            <p className="text-[11px] uppercase tracking-wide text-slate-700/80">Paso a paso</p>
                            <ol className="mt-1 space-y-1.5">
                                {steps.map((step, index) => (
                                    <li key={`step-${index}`} className="text-[11px] leading-snug bg-white/70 rounded-md px-2 py-1">
                                        <span className="font-semibold mr-1">{index + 1}.</span>{step}
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </>
                )}
            </div>
        </Card>
    );
}

export default CardRecipe;


