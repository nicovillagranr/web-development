import { describe, expect, it } from "vitest";
import {
  latestPeriod,
  median,
  previousPeriod,
  rankingBy,
  seriesFor,
  snapshotFor,
  valueOf,
} from "./selectors.ts";
import { buildPeriod } from "./isoWeek.ts";
import type { Dataset } from "./types.ts";
import { getMetric } from "../metrics/index.ts";

/**
 * Un dataset mínimo escrito a mano.
 *
 * A diferencia de los datos de la app, aquí sí se escriben los números a mano: un
 * test necesita valores que se puedan razonar de cabeza, no datos plausibles.
 */
const dataset: Dataset = {
  updatedAt: "2026-08-17T12:32:00.000Z",
  periods: [buildPeriod(2026, 32), buildPeriod(2026, 33)],
  workers: [
    { id: "w-01", kind: "worker", displayName: "Camila" },
    { id: "w-02", kind: "worker", displayName: "Nicolás" },
    { id: "w-03", kind: "worker", displayName: "María" },
  ],
  store: { id: "store", kind: "store", displayName: "Local" },
  snapshots: [
    { subjectId: "w-01", periodId: "2026-W32", values: { picking_time: 4.5, total_orders: 150 } },
    { subjectId: "w-02", periodId: "2026-W32", values: { picking_time: 3.8, total_orders: 200 } },
    { subjectId: "w-01", periodId: "2026-W33", values: { picking_time: 4.2, total_orders: 160 } },
    { subjectId: "w-02", periodId: "2026-W33", values: { picking_time: 3.5, total_orders: 210 } },
    // w-03 solo aparece en W33: se incorporó esta semana.
    { subjectId: "w-03", periodId: "2026-W33", values: { picking_time: 5.0, total_orders: 90 } },
  ],
};

describe("períodos", () => {
  it("encuentra el período más reciente", () => {
    expect(latestPeriod(dataset)?.id).toBe("2026-W33");
  });

  it("encuentra el período anterior a uno dado", () => {
    expect(previousPeriod(dataset, "2026-W33")?.id).toBe("2026-W32");
  });

  it("devuelve undefined para el período anterior al primero", () => {
    // No hay nada antes del comienzo del histórico, y eso no es un error.
    expect(previousPeriod(dataset, "2026-W32")).toBeUndefined();
  });
});

describe("lecturas puntuales", () => {
  it("lee el valor de una métrica de un sujeto en un período", () => {
    expect(valueOf(dataset, "w-01", "2026-W33", "picking_time")).toBe(4.2);
  });

  it("devuelve undefined si el sujeto no tiene datos ese período", () => {
    expect(snapshotFor(dataset, "w-03", "2026-W32")).toBeUndefined();
    expect(valueOf(dataset, "w-03", "2026-W32", "picking_time")).toBeUndefined();
  });

  it("devuelve undefined si el snapshot existe pero no trae esa métrica", () => {
    expect(valueOf(dataset, "w-01", "2026-W33", "inaccuracy_total")).toBeUndefined();
  });
});

describe("seriesFor", () => {
  it("devuelve un punto por período, en orden cronológico", () => {
    const serie = seriesFor(dataset, "w-01", "picking_time");
    expect(serie.map((point) => point.period.id)).toEqual(["2026-W32", "2026-W33"]);
    expect(serie.map((point) => point.value)).toEqual([4.5, 4.2]);
  });

  it("deja un hueco (undefined) donde falta el dato, nunca un cero", () => {
    // w-03 se incorporó en W33. Un cero en W32 dibujaría una caída inventada y
    // haría creer que esa semana rindió pésimo, cuando ni siquiera estaba.
    const serie = seriesFor(dataset, "w-03", "picking_time");
    expect(serie.map((point) => point.value)).toEqual([undefined, 5.0]);
  });
});

describe("rankingBy", () => {
  it("en una métrica de tiempo, el primero es el más rápido", () => {
    const ranking = rankingBy(dataset, getMetric("picking_time"), "2026-W33");
    expect(ranking.map((entry) => entry.worker.id)).toEqual(["w-02", "w-01", "w-03"]);
    expect(ranking[0]?.position).toBe(1);
  });

  it("en una métrica de pedidos, el primero es el que más hizo", () => {
    // Mismo dataset, mismo período, orden inverso: lo decide la dirección de la
    // métrica y no el tamaño del número.
    const ranking = rankingBy(dataset, getMetric("total_orders"), "2026-W33");
    expect(ranking.map((entry) => entry.worker.id)).toEqual(["w-02", "w-01", "w-03"]);
  });

  it("deja fuera a quien no tiene dato, en vez de rankearlo con un cero", () => {
    // Un cero fantasma pondría a w-03 el primero en picking (0 min) y el último en
    // pedidos. Las dos cosas serían mentira.
    const ranking = rankingBy(dataset, getMetric("picking_time"), "2026-W32");
    expect(ranking.map((entry) => entry.worker.id)).toEqual(["w-02", "w-01"]);
  });

  it("numera las posiciones desde 1 y sin huecos", () => {
    const ranking = rankingBy(dataset, getMetric("picking_time"), "2026-W33");
    expect(ranking.map((entry) => entry.position)).toEqual([1, 2, 3]);
  });
});

describe("median", () => {
  it("con un número impar de valores devuelve el del medio", () => {
    expect(median([3.5, 4.2, 5.0])).toBe(4.2);
  });

  it("con un número par promedia los dos centrales", () => {
    expect(median([3.5, 4.0, 4.5, 5.5])).toBe(4.25);
  });

  it("no depende del orden de entrada", () => {
    expect(median([5.0, 3.5, 4.2])).toBe(4.2);
  });

  it("aguanta un valor atípico sin moverse, que es justo por lo que se usa", () => {
    // La media de estos cinco valores es 8,1 y no describe a nadie. La mediana, 4.
    expect(median([3, 3.5, 4, 4.5, 25.5])).toBe(4);
  });

  it("devuelve undefined con una lista vacía", () => {
    expect(median([])).toBeUndefined();
  });
});
