import { describe, expect, it } from "vitest";
import { parseWeather } from "../utils/weatherParser.js";

// ─── parseWeather ───────────────────────────────────────────────────────────
// Traduce códigos numéricos de Open-Meteo a { category, intensity?, isDay }.

describe("parseWeather", () => {
    // ── Cielo despejado (codes 0, 1) ──
    describe("clear", () => {
        it("retorna clear para código 0", () => {
            expect(parseWeather(0)).toEqual({ category: "clear", isDay: true });
        });

        it("retorna clear para código 1", () => {
            expect(parseWeather(1)).toEqual({ category: "clear", isDay: true });
        });

        it("respeta isDay = false", () => {
            expect(parseWeather(0, false)).toEqual({ category: "clear", isDay: false });
        });
    });

    // ── Nubosidad (codes 2, 3, 45, 48) ──
    describe("cloudy", () => {
        it("retorna cloudy medium para código 2", () => {
            expect(parseWeather(2)).toEqual({ category: "cloudy", intensity: "medium", isDay: true });
        });

        it("retorna cloudy heavy para código 3", () => {
            expect(parseWeather(3)).toEqual({ category: "cloudy", intensity: "heavy", isDay: true });
        });

        it("retorna cloudy heavy para niebla (45, 48)", () => {
            expect(parseWeather(45)).toEqual({ category: "cloudy", intensity: "heavy", isDay: true });
            expect(parseWeather(48)).toEqual({ category: "cloudy", intensity: "heavy", isDay: true });
        });
    });

    // ── Lluvia (codes 51-67) ──
    describe("rain", () => {
        it("retorna rain light para llovizna suave (51, 61)", () => {
            expect(parseWeather(51).intensity).toBe("light");
            expect(parseWeather(61).intensity).toBe("light");
        });

        it("retorna rain medium para lluvia moderada (53, 63)", () => {
            expect(parseWeather(53).intensity).toBe("medium");
            expect(parseWeather(63).intensity).toBe("medium");
        });

        it("retorna rain heavy para lluvia fuerte (55, 65, 66, 67)", () => {
            for (const code of [55, 65, 66, 67]) {
                expect(parseWeather(code)).toEqual({ category: "rain", intensity: "heavy", isDay: true });
            }
        });
    });

    // ── Nieve (codes 71-77) ──
    describe("snow", () => {
        it("retorna snow light para nieve leve (71, 73)", () => {
            expect(parseWeather(71).intensity).toBe("light");
            expect(parseWeather(73).intensity).toBe("light");
        });

        it("retorna snow medium para código 75", () => {
            expect(parseWeather(75)).toEqual({ category: "snow", intensity: "medium", isDay: true });
        });

        it("retorna snow heavy para código 77", () => {
            expect(parseWeather(77)).toEqual({ category: "snow", intensity: "heavy", isDay: true });
        });
    });

    // ── Tormenta (code >= 95) ──
    describe("storm", () => {
        it("retorna storm para código 95", () => {
            expect(parseWeather(95)).toEqual({ category: "storm", isDay: true });
        });

        it("retorna storm para código 99", () => {
            expect(parseWeather(99)).toEqual({ category: "storm", isDay: true });
        });
    });

    // ── Fallback ──
    describe("fallback", () => {
        it("retorna cloudy medium para códigos desconocidos", () => {
            expect(parseWeather(10)).toEqual({ category: "cloudy", intensity: "medium", isDay: true });
        });

        it("convierte strings a número", () => {
            expect(parseWeather("0")).toEqual({ category: "clear", isDay: true });
            expect(parseWeather("61")).toEqual({ category: "rain", intensity: "light", isDay: true });
        });
    });
});
