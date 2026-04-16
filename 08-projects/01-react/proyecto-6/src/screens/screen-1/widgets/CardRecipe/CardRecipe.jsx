// ================= CONTEXTO MODULO =================
// Card de receta sugerida con estilo "foto pegada".
// Al hacer click abre un panel con el detalle de la receta.

// ================= IMPORTS =================
import Card from "../Card";
import { useInventoryRecipeSuggestions } from "@features/inventory/hooks/useInventoryRecipeSuggestions.jsx";
import { useRecipeImage } from "@features/inventory/hooks/useRecipeImage.jsx";

import s from "./CardRecipe.module.css";

// ================= COMPONENT =================
function CardRecipe({ className = "", ...props }) {
    const { recommendedRecipe } = useInventoryRecipeSuggestions();
    const recipeTitle = recommendedRecipe?.title || "Sin sugerencia por ahora";
    const imageUrl = useRecipeImage(recommendedRecipe?.title ?? null, recommendedRecipe?.imageQuery);

    return (
        <Card as="button" className={`${s["card-recipe"]} ${className}`}
            {...props}>

            {/* Fondo: imagen de Unsplash o gradiente oscuro como fallback */}
            <section
                className={s["card-recipe__bg"]}
                style={{
                    backgroundImage: imageUrl
                        ? `url(${imageUrl})`
                        : "linear-gradient(160deg, #18112E 0%, #0C1522 55%, #0A1A18 100%)"
                }}
            >
                <div className={s["card-recipe__blur-circle"]} />
                <div className={s["card-recipe__gradient"]} />

                <div className={s["card-recipe__info"]}>
                    <div className={s["card-recipe__badge"]}>
                        <h2 className={s["card-recipe__label"]}>Receta recomendada</h2>
                        <p className={s["card-recipe__title"]}>{recipeTitle}</p>
                    </div>
                </div>
            </section>

        </Card>
    );
}
export default CardRecipe;
