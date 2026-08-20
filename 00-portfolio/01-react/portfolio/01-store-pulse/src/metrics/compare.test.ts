import { describe, expect, it } from "vitest";
import { compare } from "./compare.ts";

describe("compare", () => {
  it("reproduce el cálculo de tiempos del documento", () => {
    // §16: 4:28 → 4:15, o sea 268 s → 255 s, una mejora del 4,85%.
    const result = compare(255, 268, "lower-is-better");
    expect(result?.pct).toBeCloseTo(4.85, 2);
    expect(result?.improved).toBe(true);
    expect(result?.movement).toBe("down");
  });

  it("separa hacia dónde se movió el número de si eso es bueno", () => {
    // El test que protege la decisión de diseño más importante del módulo.
    // Mismo movimiento (baja), veredicto opuesto según la métrica.
    const tiempo = compare(3.77, 4.05, "lower-is-better");
    expect(tiempo?.movement).toBe("down");
    expect(tiempo?.improved).toBe(true);

    const pedidos = compare(180, 205, "higher-is-better");
    expect(pedidos?.movement).toBe("down");
    expect(pedidos?.improved).toBe(false);
  });

  it("devuelve null si no hay período anterior con el que comparar", () => {
    // Alguien que se incorporó esta semana. No es un error ni un desplome:
    // simplemente no hay comparación que hacer.
    expect(compare(180, undefined, "higher-is-better")).toBeNull();
  });

  it("no inventa un porcentaje cuando el período anterior valía cero", () => {
    const result = compare(5, 0, "higher-is-better");
    expect(result?.pct).toBeNull();
    // Pero el delta y el movimiento sí son información válida.
    expect(result?.delta).toBe(5);
    expect(result?.movement).toBe("up");
    expect(result?.improved).toBe(true);
  });

  it("marca improved como null cuando el valor no se movió", () => {
    const result = compare(6.91, 6.91, "lower-is-better");
    expect(result?.movement).toBe("flat");
    expect(result?.improved).toBeNull();
    expect(result?.pct).toBe(0);
  });

  it("marca improved como null en métricas neutrales aunque el valor cambie", () => {
    const result = compare(10, 5, "neutral");
    expect(result?.movement).toBe("up");
    expect(result?.improved).toBeNull();
  });

  it("el porcentaje nunca es negativo: el signo lo lleva movement", () => {
    const result = compare(180, 205, "higher-is-better");
    expect(result?.pct).toBeGreaterThan(0);
    expect(result?.delta).toBeLessThan(0);
  });

  it("devuelve null ante valores no finitos", () => {
    expect(compare(Number.NaN, 100, "higher-is-better")).toBeNull();
    expect(compare(100, Number.POSITIVE_INFINITY, "higher-is-better")).toBeNull();
  });
});
