// ================= IMPORTS =================
import Card from "./Card.jsx";
import { useInventoryRecipeSuggestions } from "../../features/inventory/hooks/useInventoryRecipeSuggestions.jsx";

// ================= FUNCION =================
// CardRecipe: helper/componente interno; parametros: { onClick, className = "", ...props }
function CardRecipe({ onClick, className = "", ...props }) {
    const { itemCount, suggestions } = useInventoryRecipeSuggestions();
    const hasInventory = itemCount > 0;
    const visibleSuggestions = suggestions.slice(0, 2);

    return (
        // Card con fondo degradado, texto e informacion de sugerencias; onClick para abrir inventario
        <Card as="button" className={`relative overflow-hidden bg-linear-to-br from-amber-100 via-orange-200 to-red-300 text-slate-900 flex flex-col items-start justify-between p-3 ${className}`} onClick={onClick} {...props}>

            {/* Fondo */}
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,white,transparent_55%)] pointer-events-none" />

            <div className="relative z-10 w-full">
                <p className="text-[11px] uppercase tracking-wide text-slate-700/80">Inventario</p>
                <h3 className="text-base font-semibold leading-tight mt-1">{hasInventory ? "Recetas sugeridas" : "Agrega alimentos"}</h3>
                <p className="text-xs text-slate-700/80 mt-1">
                    {hasInventory
                        ? `${itemCount} ingrediente(s) detectados`
                        : "Aun no hay productos guardados"}
                </p>
            </div>

            {/* Seccion de sugerencias */}
            <div className="relative z-10 w-full space-y-1.5">
                {visibleSuggestions.map((suggestion) => (
                    <p key={suggestion} className="text-xs font-medium bg-white/70 rounded-md px-2 py-1 truncate text-center"
                    >
                        {suggestion}
                    </p>
                ))}
                <p className="text-[11px] text-slate-700/80 pt-0.5">
                    Toca para abrir inventario
                </p>
            </div>
        </Card>
    );
}

export default CardRecipe;
