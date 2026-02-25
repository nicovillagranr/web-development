import { useEffect, useMemo, useState } from "react";
import {
    INVENTORY_STORAGE_KEY,
    INVENTORY_UPDATED_EVENT,
} from "./useInventory.jsx";
import {
    FALLBACK_RECIPES,
    RECIPE_CATALOG,
} from "../constants/recipeSuggestions.js";

function parseItems(rawValue) {
    if (!rawValue) return [];
    try {
        const parsed = JSON.parse(rawValue);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function readInventoryItems() {
    if (typeof window === "undefined") return [];
    return parseItems(localStorage.getItem(INVENTORY_STORAGE_KEY));
}

function normalizeText(value) {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function getNameSignals(items) {
    return items.map((item) => normalizeText(item.name));
}

function getTypeSignals(items) {
    return new Set(items.map((item) => normalizeText(item.type)));
}

function matchRecipe(recipe, nameSignals, typeSignals) {
    const matched = recipe.ingredients.filter((ingredient) => {
        const token = normalizeText(ingredient);
        return nameSignals.some((name) => name.includes(token));
    });

    const coverage = recipe.ingredients.length
        ? matched.length / recipe.ingredients.length
        : 0;

    // Small bonus for certain type-based fits.
    let typeBonus = 0;
    if (typeSignals.has("fruta") && recipe.id.includes("fruta")) typeBonus += 0.2;
    if (typeSignals.has("verdura") && recipe.id.includes("ensalada")) typeBonus += 0.2;

    return {
        ...recipe,
        score: coverage + typeBonus,
        matchCount: matched.length,
    };
}

function buildSuggestions(items) {
    if (!items.length) {
        return FALLBACK_RECIPES.slice(0, 2);
    }

    const nameSignals = getNameSignals(items);
    const typeSignals = getTypeSignals(items);

    const ranked = RECIPE_CATALOG.map((recipe) =>
        matchRecipe(recipe, nameSignals, typeSignals),
    )
        .filter((recipe) => recipe.matchCount > 0)
        .sort((a, b) => b.score - a.score);

    if (!ranked.length) {
        return FALLBACK_RECIPES.slice(0, 2);
    }

    return ranked.slice(0, 2).map((recipe) => recipe.title);
}

export function useInventoryRecipeSuggestions() {
    const [items, setItems] = useState(() => readInventoryItems());

    useEffect(() => {
        const handleStorage = () => {
            setItems(readInventoryItems());
        };

        const handleInventoryUpdated = (event) => {
            const nextItems = event?.detail?.items;
            if (Array.isArray(nextItems)) {
                setItems(nextItems);
                return;
            }
            setItems(readInventoryItems());
        };

        window.addEventListener("storage", handleStorage);
        window.addEventListener(INVENTORY_UPDATED_EVENT, handleInventoryUpdated);

        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener(INVENTORY_UPDATED_EVENT, handleInventoryUpdated);
        };
    }, []);

    const suggestions = useMemo(() => buildSuggestions(items), [items]);

    return {
        itemCount: items.length,
        suggestions,
    };
}
