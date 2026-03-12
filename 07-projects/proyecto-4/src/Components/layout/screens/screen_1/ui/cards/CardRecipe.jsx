// ================= CONTEXTO MODULO =================
// Card de receta sugerida con estilo "foto pegada".
// Al hacer click abre un panel con el detalle de la receta.

// ================= IMPORTS =================
import Card from "./Card.jsx";
import { useInventoryRecipeSuggestions } from "../../main/inventory/hooks/useInventoryRecipeSuggestions.jsx";
import { useRecipeImage } from "../../main/inventory/hooks/useRecipeImage.jsx";


// ================= COMPONENT =================
function CardRecipe({ className = "", ...props }) {
    const { recommendedRecipe } = useInventoryRecipeSuggestions();
    const recipeTitle = recommendedRecipe?.title || "Sin sugerencia por ahora";
    const imageUrl = useRecipeImage(recommendedRecipe?.title ?? null);

    return (
        <Card as="button" className={`w-full h-full rounded-xl relative overflow-hidden ${className}`}
            {...props}>

            {/* Fondo: imagen de Unsplash o gradiente oscuro como fallback */}
            <section
                className="relative w-full h-full bg-[linear-gradient(160deg,_#18112E_0%,_#0C1522_55%,_#0A1A18_100%)] bg-cover bg-center"
                style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
            >
                <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-violet-500/10 blur-2xl pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,_rgba(0,0,0,0.75)_0%,_transparent_100%)] pointer-events-none" />

                <div className="absolute bottom-0 left-0 px-3 py-3 z-10">
                    <div className="inline-block px-2 py-1.5 rounded-lg bg-black/50 backdrop-blur-md">
                        <h2 className="text-[9px] font-medium tracking-[0.18em] uppercase text-cyan-400/70 text-left mb-0.5">Receta del día</h2>
                        <p className="text-[11px] font-light text-white/90 text-left leading-tight">{recipeTitle}</p>
                    </div>
                </div>
            </section>

        </Card>
    );
}
export default CardRecipe;
