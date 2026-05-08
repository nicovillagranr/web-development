// ================= CONTEXTO MODULO =================
// Hook de recomendaciones para lista de compras.
// Combina faltantes de recetas, stock bajo y basicos para generar prioridades.
import { useMemo, useState } from "react";
import { useInventory } from "../../../main/inventory/hooks/useInventory.jsx";
import { useInventoryRecipeSuggestions } from "../../../main/inventory/hooks/useInventoryRecipeSuggestions.jsx";

function normalizeText(value) {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function getUniqueEntries(entries) {
    const seen = new Set();
    return entries.filter((entry) => {
        const key = normalizeText(entry.label);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function buildRecipeMissingEntries(recipe) {
    if (!recipe) return [];

    return (recipe.missingIngredients || []).map((ingredient) => ({
        id: `recipe-${normalizeText(ingredient)}`,
        label: ingredient,
        reason: `Falta para ${recipe.title}`,
        tone: "recipe",
    }));
}

function buildLowStockEntries(items) {
    return items
        .filter((item) => Number(item.quantity) <= 1)
        .map((item) => ({
            id: `stock-${item.id}`,
            label: item.name,
            reason: `Stock bajo (${item.quantity} ${item.unit})`,
            tone: "stock",
        }));
}

function buildEssentialsEntries(items) {
    const essentials = ["huevo", "leche", "pan"];
    const tokens = items.map((item) => normalizeText(item.name));

    return essentials
        .filter((name) => !tokens.some((token) => token.includes(name)))
        .map((name) => ({
            id: `base-${name}`,
            label: name[0].toUpperCase() + name.slice(1),
            reason: "Basico recomendado",
            tone: "base",
        }));
}

export function useSmartShoppingList() {
    const { items } = useInventory();
    const { recommendedRecipe } = useInventoryRecipeSuggestions();
    const [checkedIds, setCheckedIds] = useState([]);

    const suggestedItems = useMemo(() => {
        const combined = [
            ...buildRecipeMissingEntries(recommendedRecipe),
            ...buildLowStockEntries(items),
            ...buildEssentialsEntries(items),
        ];
        return getUniqueEntries(combined).slice(0, 9);
    }, [items, recommendedRecipe]);

    const doneCount = useMemo(
        () => suggestedItems.filter((item) => checkedIds.includes(item.id)).length,
        [checkedIds, suggestedItems],
    );

    const pendingCount = suggestedItems.length - doneCount;

    const toggleChecked = (itemId) => {
        setCheckedIds((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId],
        );
    };

    const clearCompleted = () => {
        setCheckedIds((prev) =>
            prev.filter((id) => !suggestedItems.some((item) => item.id === id)),
        );
    };

    return {
        recipeTitle: recommendedRecipe?.title || null,
        suggestedItems,
        checkedIds,
        doneCount,
        pendingCount,
        toggleChecked,
        clearCompleted,
    };
}
