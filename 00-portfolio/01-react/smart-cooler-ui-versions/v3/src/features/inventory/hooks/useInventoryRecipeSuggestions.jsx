// ================= CONTEXTO MODULO =================
// Hook de sugerencias de recetas por inventario actual.
// Rankea recetas por coincidencias y entrega fallback rotativo cuando no hay match.
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

function enrichRecipe(recipe, matchedIngredients, score = 0) {
    const normalizedMatched = new Set(matchedIngredients.map((name) => normalizeText(name)));
    const missingIngredients = recipe.ingredients.filter(
        (ingredient) => !normalizedMatched.has(normalizeText(ingredient)),
    );

    return {
        ...recipe,
        score,
        matchCount: matchedIngredients.length,
        matchedIngredients,
        missingIngredients,
        coverage: recipe.ingredients.length
            ? matchedIngredients.length / recipe.ingredients.length
            : 0,
    };
}

function matchRecipe(recipe, nameSignals, typeSignals) {
    const matched = recipe.ingredients.filter((ingredient) => {
        const token = normalizeText(ingredient);
        return nameSignals.some((name) => name.includes(token));
    });

    const coverage = recipe.ingredients.length
        ? matched.length / recipe.ingredients.length
        : 0;

    let typeBonus = 0;
    if (typeSignals.has("fruta") && recipe.id.includes("fruta")) typeBonus += 0.2;
    if (typeSignals.has("verdura") && recipe.id.includes("ensalada")) typeBonus += 0.2;

    return enrichRecipe(recipe, matched, coverage + typeBonus);
}

function getDaySeed() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const dayInYear = Math.floor((now - startOfYear) / 86400000);
    return dayInYear;
}

function buildFallbackRecipes() {
    if (FALLBACK_RECIPES.length <= 2) {
        return FALLBACK_RECIPES.map((recipe) => enrichRecipe(recipe, [], 0));
    }

    const startIndex = getDaySeed() % FALLBACK_RECIPES.length;
    const rotated = [
        ...FALLBACK_RECIPES.slice(startIndex),
        ...FALLBACK_RECIPES.slice(0, startIndex),
    ];

    return rotated.slice(0, 2).map((recipe) => enrichRecipe(recipe, [], 0));
}

function buildSuggestions(items) {
    if (!items.length) {
        return buildFallbackRecipes();
    }

    const nameSignals = getNameSignals(items);
    const typeSignals = getTypeSignals(items);

    const ranked = RECIPE_CATALOG.map((recipe) =>
        matchRecipe(recipe, nameSignals, typeSignals),
    )
        .filter((recipe) => recipe.matchCount > 0)
        .sort((a, b) => b.score - a.score);

    if (!ranked.length) {
        return buildFallbackRecipes();
    }

    return ranked.slice(0, 2);
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

    const suggestedRecipes = useMemo(() => buildSuggestions(items), [items]);

    return {
        itemCount: items.length,
        suggestions: suggestedRecipes.map((recipe) => recipe.title),
        suggestedRecipes,
        recommendedRecipe: suggestedRecipes[0] || null,
    };
}
