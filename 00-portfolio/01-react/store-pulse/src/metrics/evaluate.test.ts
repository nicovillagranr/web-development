import { describe, expect, it } from "vitest";
import { evaluate, performanceRatio } from "./evaluate.ts";
import { DEFAULT_TIERS, getMetric, getTarget } from "./definitions.ts";
import type { Target } from "./types.ts";

describe("performanceRatio", () => {
  it("en higher-is-better, superar el objetivo da un ratio mayor que 1", () => {
    expect(performanceRatio(110, 100, "higher-is-better")).toBeCloseTo(1.1);
  });

  it("en lower-is-better, quedar POR DEBAJO del objetivo también da un ratio mayor que 1", () => {
    // Este es el test que justifica que la función exista: 3,77 es "menos" que 4,20
    // y aun así es mejor. Sin normalizar, un solo escalafón de umbrales no podría
    // servir a las dos direcciones.
    expect(performanceRatio(3.77, 4.2, "lower-is-better")).toBeCloseTo(1.114, 3);
  });

  it('devuelve null para métricas neutrales, que no tienen "mejor"', () => {
    expect(performanceRatio(10, 5, "neutral")).toBeNull();
  });

  it("devuelve null si el objetivo es cero o negativo, en vez de dividir por cero", () => {
    expect(performanceRatio(5, 0, "lower-is-better")).toBeNull();
    expect(performanceRatio(5, -1, "higher-is-better")).toBeNull();
  });

  it("trata el cero absoluto en lower-is-better como rendimiento insuperable", () => {
    // Cero errores cuando se permitía un 2%: por encima de cualquier umbral.
    expect(performanceRatio(0, 2, "lower-is-better")).toBe(Number.POSITIVE_INFINITY);
  });

  it("devuelve null ante valores no finitos", () => {
    expect(performanceRatio(Number.NaN, 4.2, "lower-is-better")).toBeNull();
    expect(performanceRatio(4.2, Number.NaN, "lower-is-better")).toBeNull();
  });
});

describe("evaluate", () => {
  it("reproduce el ejemplo real de Picking Time del documento", () => {
    // Picking 3,77 min contra objetivo 4,20 min → el documento dice "Supera".
    const tier = evaluate(3.77, getMetric("picking_time"), getTarget("picking_time"));
    expect(tier?.id).toBe("supera");
    expect(tier?.label).toBe("Supera");
  });

  it("reproduce el ejemplo real de calidad del documento", () => {
    // Inaccuracy 1,65% contra objetivo 2,00% → el documento dice "Supera".
    const tier = evaluate(1.65, getMetric("inaccuracy_total"), getTarget("inaccuracy_total"));
    expect(tier?.id).toBe("supera");
  });

  it("marca como bajo objetivo un tiempo peor que el objetivo", () => {
    // 5,00 min contra 4,20: ratio 0,84, por debajo del corte de "cerca".
    const tier = evaluate(5, getMetric("picking_time"), getTarget("picking_time"));
    expect(tier?.id).toBe("bajo");
  });

  it('distingue "cerca" de "bajo" cuando se queda a poco del objetivo', () => {
    // 4,35 contra 4,20: ratio 0,966 → cae en "cerca".
    const tier = evaluate(4.35, getMetric("picking_time"), getTarget("picking_time"));
    expect(tier?.id).toBe("cerca");
  });

  it('llega a "supera amplia" cuando la mejora es grande', () => {
    // 3,00 contra 4,20: ratio 1,40.
    const tier = evaluate(3, getMetric("picking_time"), getTarget("picking_time"));
    expect(tier?.id).toBe("supera_amplia");
  });

  it("evalúa correctamente una métrica en la que MÁS es mejor", () => {
    // El mismo escalafón, la dirección contraria: 260 pedidos contra un objetivo
    // de 200 es ratio 1,30 → supera amplia.
    const target: Target = { metricId: "total_orders", value: 200, tiers: DEFAULT_TIERS };
    expect(evaluate(260, getMetric("total_orders"), target)?.id).toBe("supera_amplia");
    expect(evaluate(150, getMetric("total_orders"), target)?.id).toBe("bajo");
  });

  it("devuelve null cuando la métrica no tiene objetivo", () => {
    // "Sin objetivo" no es lo mismo que "va mal": la UI debe poder distinguirlo.
    expect(evaluate(6.91, getMetric("prep_time"), getTarget("prep_time"))).toBeNull();
  });

  it("no depende de que los escalones lleguen ordenados", () => {
    const desordenados: Target = {
      metricId: "picking_time",
      value: 4.2,
      tiers: [...DEFAULT_TIERS].reverse(),
    };
    expect(evaluate(3.77, getMetric("picking_time"), desordenados)?.id).toBe("supera");
  });
});
