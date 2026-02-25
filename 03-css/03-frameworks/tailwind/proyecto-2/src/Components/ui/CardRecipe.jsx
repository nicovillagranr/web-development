// ================= IMPORTS =================
import Card from "./Card.jsx";
import { useInventoryRecipeSuggestions } from "../../features/inventory/hooks/useInventoryRecipeSuggestions.jsx";

// ================= FUNCION =================
// CardRecipe: helper/componente interno; parametros: { onClick, className = "", ...props }
function CardRecipe({ onClick, className = "", ...props }) {
    const { itemCount, suggestions } = useInventoryRecipeSuggestions();
    const hasInventory = itemCount > 0;

    return (
        <Card as="button" className={`bg-linear-to-br from-amber-100 via-orange-200 to-red-200 text-slate-900 flex flex-row items-start ${className}`} onClick={onClick} {...props}>
            <div className="text-leftr">
                <h3 className="text-lg font-semibold leading-tight mt-1">{hasInventory ? "Recetas sugeridas" : "Agrega alimentos"}</h3>
                <p className="text-xs text-slate-500 mt-1">{hasInventory ? `${itemCount} ingrediente(s) detectados` : "Aun no hay productos guardados"}</p>
            </div>

            <div className="w-full space-y-1">
                {suggestions.map((suggestion) => (
                    <p
                        key={suggestion}
                        className="text-sm font-medium bg-white/70 rounded-lg px-2 py-1 truncate text-left"
                    >
                        {suggestion}
                    </p>
                ))}
            </div>
        </Card>
    );
}

export default CardRecipe;
