import { describe, expect, it } from "vitest";
import { getExpiryMeta, TYPE_EMOJI, getTypeLabel } from "../utils/inventoryUtils.js";

// ─── getExpiryMeta ──────────────────────────────────────────────────────────
// Traduce días restantes a etiqueta + color visual para la UI.

describe("getExpiryMeta", () => {
    it("retorna 'Sin fecha' cuando no hay fecha de expiración", () => {
        const result = getExpiryMeta(null);
        expect(result.label).toBe("Sin fecha");
        expect(result.tone).toContain("white");
    });

    it("retorna 'Vence hoy' cuando faltan 0 días", () => {
        const result = getExpiryMeta(0);
        expect(result.label).toBe("Vence hoy");
        expect(result.tone).toContain("amber");
    });

    it("retorna alerta ámbar cuando faltan 1-3 días", () => {
        const result = getExpiryMeta(2);
        expect(result.label).toBe("Vence en 2d");
        expect(result.tone).toContain("amber");
    });

    it("retorna verde cuando faltan más de 3 días", () => {
        const result = getExpiryMeta(10);
        expect(result.label).toBe("Vence en 10d");
        expect(result.tone).toContain("emerald");
    });

    it("retorna 'Vencido' cuando los días son negativos", () => {
        const result = getExpiryMeta(-5);
        expect(result.label).toBe("Vencido hace 5d");
        expect(result.tone).toContain("rose");
    });
});

// ─── TYPE_EMOJI ─────────────────────────────────────────────────────────────
// Cada tipo de alimento tiene un emoji asociado.

describe("TYPE_EMOJI", () => {
    it("tiene emoji para todos los tipos conocidos", () => {
        expect(TYPE_EMOJI.fruta).toBe("🍎");
        expect(TYPE_EMOJI.carne).toBe("🥩");
        expect(TYPE_EMOJI.bebida).toBe("🥤");
    });

    it("retorna undefined para tipos desconocidos", () => {
        expect(TYPE_EMOJI["inventado"]).toBeUndefined();
    });
});

// ─── getTypeLabel ───────────────────────────────────────────────────────────
// Convierte el valor interno (ej: "fruta") a la etiqueta visible (ej: "Fruta").

describe("getTypeLabel", () => {
    it("retorna la etiqueta legible para un tipo válido", () => {
        expect(getTypeLabel("fruta")).toBe("Fruta");
        expect(getTypeLabel("lacteo")).toBe("Lacteo");
    });

    it("retorna el valor original si el tipo no existe", () => {
        expect(getTypeLabel("desconocido")).toBe("desconocido");
    });
});
