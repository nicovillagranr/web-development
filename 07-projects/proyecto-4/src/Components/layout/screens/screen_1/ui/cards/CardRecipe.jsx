// ================= CONTEXTO MODULO =================
// Card de receta sugerida con estilo "foto pegada".
// Al hacer click abre un panel con el detalle de la receta.

// ================= IMPORTS =================
import Card from "./Card.jsx";
import { useInventoryRecipeSuggestions } from "../../main/inventory/hooks/useInventoryRecipeSuggestions.jsx";


// ================= COMPONENT =================
function CardRecipe({ className = "", ...props }) {
    const { recommendedRecipe } = useInventoryRecipeSuggestions();
    const recipeTitle = recommendedRecipe?.title || "Sin sugerencia por ahora";

    return (
        // Card molde
        <Card as="button" className={`w-full h-full rounded-none relative bg-white no-scrollbar p-2 border border-black/15 ${className}`}
            {...props}>

            {/* Contenedor de la imagen */}
            <section className="relative w-full h-full overflow-hidden bg-blue-300">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute inset-x-0 bottom-0 px-2 py-3 z-10">
                    <h2 className="text-[11px] font-light tracking-wide uppercase text-white text-left">Receta recomendada</h2>
                    <p className="text-xs text-white text-left">{recipeTitle}</p>
                </div>
            </section>

        </Card>
    );
}
export default CardRecipe;
