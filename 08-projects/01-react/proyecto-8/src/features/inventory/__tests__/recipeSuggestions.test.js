import { describe, expect, it } from "vitest";
import {
    normalizeText,
    matchRecipe,
    buildSuggestions,
} from "../hooks/useInventoryRecipeSuggestions.jsx";

// ─── normalizeText ──────────────────────────────────────────────────────────
// Quita acentos, pasa a minúsculas y trimea.

describe("normalizeText", () => {
    it("pasa a minúsculas", () => {
        expect(normalizeText("Huevo")).toBe("huevo");
    });

    it("elimina acentos/tildes", () => {
        expect(normalizeText("jamón")).toBe("jamon");
        expect(normalizeText("maní")).toBe("mani");
        expect(normalizeText("Plátano")).toBe("platano");
    });

    it("trimea espacios", () => {
        expect(normalizeText("  queso  ")).toBe("queso");
    });

    it("retorna string vacío para null/undefined", () => {
        expect(normalizeText(null)).toBe("");
        expect(normalizeText(undefined)).toBe("");
    });
});

// ─── matchRecipe ────────────────────────────────────────────────────────────
// Calcula score de coincidencia entre inventario y receta.

const testRecipe = {
    id: "omelette-queso",
    title: "Omelette de queso",
    ingredients: ["huevo", "queso", "cebolla"],
};

describe("matchRecipe", () => {
    it("detecta ingredientes que coinciden exactamente", () => {
        const names = ["huevo", "queso", "leche"];
        const types = new Set();
        const result = matchRecipe(testRecipe, names, types);

        expect(result.matchCount).toBe(2);
        expect(result.matchedIngredients).toEqual(["huevo", "queso"]);
        expect(result.missingIngredients).toEqual(["cebolla"]);
    });

    it("match bidireccional: 'huevos' matchea con 'huevo'", () => {
        const names = ["huevos"];
        const types = new Set();
        const result = matchRecipe(testRecipe, names, types);

        expect(result.matchCount).toBe(1);
        expect(result.matchedIngredients).toContain("huevo");
    });

    it("match bidireccional: 'mani' matchea con 'mantequilla de maní'", () => {
        const recipe = {
            id: "test",
            title: "Test",
            ingredients: ["mantequilla de maní"],
        };
        const names = ["mani"];
        const types = new Set();
        const result = matchRecipe(recipe, names, types);

        expect(result.matchCount).toBe(1);
    });

    it("calcula coverage correctamente", () => {
        const names = ["huevo", "queso", "cebolla"];
        const types = new Set();
        const result = matchRecipe(testRecipe, names, types);

        expect(result.coverage).toBeCloseTo(1.0);
        expect(result.matchCount).toBe(3);
        expect(result.missingIngredients).toHaveLength(0);
    });

    it("aplica typeBonus para fruta", () => {
        const frutaRecipe = {
            id: "jugo-fruta-mixta",
            title: "Jugo de fruta",
            ingredients: ["manzana", "naranja"],
        };
        const names = ["manzana"];
        const typesWithFruta = new Set(["fruta"]);
        const typesWithout = new Set();

        const withBonus = matchRecipe(frutaRecipe, names, typesWithFruta);
        const withoutBonus = matchRecipe(frutaRecipe, names, typesWithout);

        expect(withBonus.score).toBeGreaterThan(withoutBonus.score);
    });

    it("retorna score 0 si no hay coincidencias", () => {
        const names = ["arroz", "sal"];
        const types = new Set();
        const result = matchRecipe(testRecipe, names, types);

        expect(result.matchCount).toBe(0);
        expect(result.score).toBe(0);
    });
});

// ─── buildSuggestions ───────────────────────────────────────────────────────
// Rankea recetas del catálogo contra items del inventario.

describe("buildSuggestions", () => {
    it("retorna fallback cuando no hay items", () => {
        const result = buildSuggestions([]);
        expect(result.length).toBeLessThanOrEqual(2);
        result.forEach((r) => {
            expect(r.matchCount).toBe(0);
        });
    });

    it("retorna máximo 4 sugerencias", () => {
        const items = [
            { name: "huevo", type: "proteina" },
            { name: "queso", type: "lacteo" },
            { name: "cebolla", type: "verdura" },
            { name: "tomate", type: "verdura" },
        ];
        const result = buildSuggestions(items);
        expect(result.length).toBeLessThanOrEqual(4);
    });

    it("las sugerencias vienen ordenadas por score descendente", () => {
        const items = [
            { name: "huevo", type: "proteina" },
            { name: "queso", type: "lacteo" },
        ];
        const result = buildSuggestions(items);

        if (result.length === 2) {
            expect(result[0].score).toBeGreaterThanOrEqual(result[1].score);
        }
    });

    it("retorna fallback si ningún item coincide con el catálogo", () => {
        const items = [{ name: "xyzinventado", type: "otro" }];
        const result = buildSuggestions(items);

        result.forEach((r) => {
            expect(r.matchCount).toBe(0);
        });
    });

    it("cada sugerencia incluye campos enriquecidos", () => {
        const items = [{ name: "huevo", type: "proteina" }];
        const result = buildSuggestions(items);
        const recipe = result[0];

        expect(recipe).toHaveProperty("score");
        expect(recipe).toHaveProperty("matchCount");
        expect(recipe).toHaveProperty("matchedIngredients");
        expect(recipe).toHaveProperty("missingIngredients");
        expect(recipe).toHaveProperty("coverage");
    });
});
