import { describe, expect, it } from "vitest";
import {
  formatMetricValue,
  formatNumber,
  formatPercentChange,
  formatPeriodLabel,
} from "./format.ts";
import { getMetric } from "./definitions.ts";

describe("formatMetricValue", () => {
  it("formatea tiempos como en la fuente original", () => {
    expect(formatMetricValue(6.91, getMetric("prep_time"))).toBe("6,91 min");
  });

  it("formatea porcentajes con el % pegado, como en la fuente original", () => {
    expect(formatMetricValue(1.65, getMetric("inaccuracy_total"))).toBe("1,65%");
  });

  it("formatea cantidades sin decimales y con separador de millares", () => {
    expect(formatMetricValue(1243, getMetric("total_orders"))).toBe("1.243");
  });

  it("respeta la precisión de cada métrica al redondear", () => {
    // El registro manda: pedidos con 0 decimales aunque llegue un número con cola.
    expect(formatMetricValue(243.7, getMetric("total_orders"))).toBe("244");
    expect(formatMetricValue(6.9, getMetric("prep_time"))).toBe("6,90 min");
  });
});

describe("formatPercentChange", () => {
  it("reproduce el porcentaje del ejemplo del documento", () => {
    // §16: la mejora de 268 s a 255 s se muestra como 4,9%.
    expect(formatPercentChange(4.85)).toBe("4,9%");
  });
});

describe("formatNumber", () => {
  it("devuelve el número sin unidad, para ejes de gráficos", () => {
    expect(formatNumber(3.77, 2)).toBe("3,77");
  });
});

describe("formatPeriodLabel", () => {
  it("convierte un identificador ISO en una etiqueta legible", () => {
    expect(formatPeriodLabel("2026-W33")).toBe("Semana 33");
  });

  it("quita el cero a la izquierda de las semanas de un dígito", () => {
    expect(formatPeriodLabel("2026-W07")).toBe("Semana 7");
  });

  it("devuelve el identificador tal cual si no tiene la forma esperada", () => {
    expect(formatPeriodLabel("sin-formato")).toBe("sin-formato");
  });
});
