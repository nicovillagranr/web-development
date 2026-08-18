import { describe, expect, it } from "vitest";
import { checkDerived } from "./derived.ts";
import { getMetric } from "./definitions.ts";

const prepTime = getMetric("prep_time");

describe("checkDerived", () => {
  it("no avisa cuando las partes suman el total, como en la muestra real", () => {
    // 1,56 + 3,77 + 1,58 = 6,91. Los números tal cual salen del documento.
    const mismatch = checkDerived(prepTime, {
      assignment_time: 1.56,
      picking_time: 3.77,
      packaging_time: 1.58,
      prep_time: 6.91,
    });
    expect(mismatch).toBeNull();
  });

  it("avisa cuando las partes dejan de sumar el total", () => {
    // El caso que de verdad importa: algún pedido no pasó por las tres etapas.
    const mismatch = checkDerived(prepTime, {
      assignment_time: 1.56,
      picking_time: 3.77,
      packaging_time: 1.58,
      prep_time: 8.5,
    });
    expect(mismatch).not.toBeNull();
    expect(mismatch?.metricId).toBe("prep_time");
    expect(mismatch?.expected).toBeCloseTo(6.91, 2);
    expect(mismatch?.actual).toBe(8.5);
    expect(mismatch?.gap).toBeCloseTo(1.59, 2);
  });

  it("tolera el redondeo de la propia fuente", () => {
    const mismatch = checkDerived(prepTime, {
      assignment_time: 1.56,
      picking_time: 3.77,
      packaging_time: 1.58,
      prep_time: 6.915,
    });
    expect(mismatch).toBeNull();
  });

  it("calla si falta una de las partes: no se puede comprobar, no está mal", () => {
    const mismatch = checkDerived(prepTime, {
      assignment_time: 1.56,
      picking_time: 3.77,
      prep_time: 6.91,
    });
    expect(mismatch).toBeNull();
  });

  it("calla si falta el total", () => {
    const mismatch = checkDerived(prepTime, {
      assignment_time: 1.56,
      picking_time: 3.77,
      packaging_time: 1.58,
    });
    expect(mismatch).toBeNull();
  });

  it("devuelve null en métricas que no son derivadas", () => {
    expect(checkDerived(getMetric("picking_time"), { picking_time: 3.77 })).toBeNull();
  });
});
