import { describe, expect, it } from "vitest";
import { METRIC_IDS } from "./types.ts";
import { DEFAULT_TIERS, METRIC_LIST, METRICS, TARGETS, metricsForScope } from "./definitions.ts";

/**
 * Tests de integridad del registro.
 *
 * No comprueban lógica, comprueban que el registro es coherente consigo mismo. Son
 * los que convierten "añadir una métrica es añadir una fila" en una promesa con red:
 * si alguien añade una fila mal, salta aquí y no en la pantalla de un compañero.
 */
describe("registro de métricas", () => {
  it("define todas las métricas declaradas en METRIC_IDS", () => {
    for (const id of METRIC_IDS) {
      expect(METRICS[id], `falta la definición de ${id}`).toBeDefined();
    }
    expect(METRIC_LIST).toHaveLength(METRIC_IDS.length);
  });

  it("cada definición usa como id la clave bajo la que está guardada", () => {
    // Un copia-pega mal rematado es la forma más fácil de romper el registro:
    // la entrada existe, pero se identifica como otra métrica.
    for (const [key, definition] of Object.entries(METRICS)) {
      expect(definition.id).toBe(key);
    }
  });

  it("las métricas derivadas apuntan a métricas que existen", () => {
    for (const metric of METRIC_LIST) {
      for (const part of metric.derivedFrom ?? []) {
        expect(METRICS[part], `${metric.id} deriva de ${part}, que no existe`).toBeDefined();
      }
    }
  });

  it("las partes de una métrica derivada comparten su unidad", () => {
    // Sumar minutos con porcentajes no significa nada. Si esto salta, la relación
    // que se declaró no es una suma y hay que modelarla de otra forma.
    for (const metric of METRIC_LIST) {
      for (const part of metric.derivedFrom ?? []) {
        expect(METRICS[part].unit, `${part} no mide lo mismo que ${metric.id}`).toBe(metric.unit);
      }
    }
  });

  it("ninguna métrica se declara derivada de sí misma", () => {
    for (const metric of METRIC_LIST) {
      expect(metric.derivedFrom ?? []).not.toContain(metric.id);
    }
  });

  it("toda métrica declara al menos un ámbito", () => {
    for (const metric of METRIC_LIST) {
      expect(
        metric.scopes.length,
        `${metric.id} no aparecería en ninguna pantalla`,
      ).toBeGreaterThan(0);
    }
  });

  it("cada nivel de la app tiene métricas que mostrar", () => {
    expect(metricsForScope("worker").length).toBeGreaterThan(0);
    expect(metricsForScope("team").length).toBeGreaterThan(0);
    expect(metricsForScope("store").length).toBeGreaterThan(0);
  });

  it("los objetivos apuntan a métricas que existen y se identifican bien", () => {
    for (const [id, target] of Object.entries(TARGETS)) {
      expect(target).toBeDefined();
      expect(METRICS[target!.metricId]).toBeDefined();
      expect(target!.metricId).toBe(id);
    }
  });

  it("ninguna métrica repite el nombre de la fuente", () => {
    // El importador de la Fase 6 buscará las columnas del Excel por `sourceLabel`.
    // Dos métricas con la misma cadena significarían dos destinos para una columna,
    // y la ingesta escribiría una encima de la otra sin quejarse.
    const nombres = METRIC_LIST.map((metric) => metric.sourceLabel).filter(
      (nombre) => nombre !== undefined,
    );
    expect(new Set(nombres).size, "hay un sourceLabel duplicado").toBe(nombres.length);
  });

  it("el escalafón por defecto tiene suelo, para que ningún valor quede sin escalón", () => {
    // Sin un escalón que acepte cualquier ratio, evaluate() devolvería null para los
    // valores muy malos — y la UI los pintaría igual que "sin objetivo". Justo al revés.
    const suelo = Math.min(...DEFAULT_TIERS.map((tier) => tier.minRatio));
    expect(suelo).toBe(Number.NEGATIVE_INFINITY);
  });

  it("el escalafón por defecto no repite umbrales", () => {
    const umbrales = DEFAULT_TIERS.map((tier) => tier.minRatio);
    expect(new Set(umbrales).size).toBe(umbrales.length);
  });
});
