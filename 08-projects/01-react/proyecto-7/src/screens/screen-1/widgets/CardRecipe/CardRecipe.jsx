// ================= CONTEXTO MODULO =================
// Card de receta sugerida con estilo "foto pegada".
// Al hacer click abre un panel con el detalle de la receta.

// ================= IMPORTS =================
import Card from "../Card";
import { useInventoryRecipeSuggestions } from "@features/inventory/hooks/useInventoryRecipeSuggestions.jsx";
import { useRecipeImage } from "@features/inventory/hooks/useRecipeImage.jsx";

// ================= COMPONENT =================
function CardRecipe({ className = "", ...props }) {
    const { recommendedRecipe } = useInventoryRecipeSuggestions();
    const recipeTitle = recommendedRecipe?.title || "Sin sugerencia por ahora";
    const imageUrl = useRecipeImage(recommendedRecipe?.title ?? null, recommendedRecipe?.imageQuery);

    return (
        <Card
            as="button"
            className={`w-full h-full rounded-xl relative overflow-hidden ${className}`}
            {...props}
        >
            <section
                className="relative w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: imageUrl
                        ? `url(${imageUrl})`
                        : "linear-gradient(160deg, #18112E 0%, #0C1522 55%, #0A1A18 100%)"
                }}
            >
                <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-violet-500/10 blur-2xl pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.75)_0%,transparent_100%)]" />

                <div className="absolute bottom-0 left-0 px-3 py-3 z-10">
                    <div className="inline-block px-2 py-1.5 rounded-lg bg-black/50 backdrop-blur-md">
                        <h2 className="text-[11px] font-medium tracking-[0.18em] text-green-400/70 text-left mb-0.5">Receta recomendada</h2>
                        <p className="text-[11px] font-light text-white/90 text-left leading-tight">{recipeTitle}</p>
                    </div>
                </div>
            </section>
        </Card>
    );
}
export default CardRecipe;
