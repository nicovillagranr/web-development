import { describe, expect, it } from "vitest";
import { generateDataset } from "./generate.ts";
import { DatasetSchema } from "../data/schemas.ts";
import { METRIC_LIST, checkDerived, getMetric } from "../metrics/index.ts";

describe("generateDataset", () => {
  it("produce un dataset que cumple el contrato de la API", () => {
    // El schema comprueba de paso las claves naturales: ningún sujeto repetido en un
    // mismo período, ninguna referencia a períodos o sujetos inexistentes.
    expect(() => DatasetSchema.parse(generateDataset())).not.toThrow();
  });

  it("es determinista: la misma semilla da exactamente los mismos datos", () => {
    // Una demo que enseña números distintos en cada recarga parece rota, y unos
    // tests que dependen del azar fallan solos un martes cualquiera.
    expect(generateDataset()).toEqual(generateDataset());
  });

  it("cambia los datos al cambiar la semilla, manteniendo la forma", () => {
    const otro = generateDataset({ seed: "otro-local" });
    expect(otro).not.toEqual(generateDataset());
    expect(() => DatasetSchema.parse(otro)).not.toThrow();
  });

  it("genera TODAS las métricas de ámbito trabajador, sin listarlas a mano", () => {
    // El test que respalda la promesa del proyecto: los datos salen del registro.
    // Si alguien añade una métrica de trabajador a definitions.ts y el generador
    // no la produce, salta aquí — no aparece un hueco silencioso en la pantalla.
    const dataset = generateDataset();
    const esperadas = METRIC_LIST.filter((metric) => metric.scopes.includes("worker"));

    for (const snapshot of dataset.snapshots) {
      if (snapshot.subjectId === dataset.store.id) continue;
      for (const metric of esperadas) {
        expect(
          snapshot.values[metric.id],
          `falta ${metric.id} en ${snapshot.subjectId}`,
        ).toBeTypeOf("number");
      }
    }
  });

  it("respeta el invariante de las métricas derivadas en todos los snapshots", () => {
    // assignment + picking + packaging = prep_time, en cada persona y cada semana.
    // Que se cumpla en la demo es lo que permite probar de verdad el aviso de
    // descuadre: si el mock no cuadrara nunca, el aviso saldría siempre.
    const dataset = generateDataset();
    const derivadas = METRIC_LIST.filter((metric) => metric.derivedFrom);

    for (const snapshot of dataset.snapshots) {
      for (const metric of derivadas) {
        expect(checkDerived(metric, snapshot.values)).toBeNull();
      }
    }
  });

  it("agrega los pedidos del local sumando los de las personas", () => {
    const dataset = generateDataset();
    const period = dataset.periods.at(-1);
    expect(period).toBeDefined();

    const suma = dataset.snapshots
      .filter((snapshot) => snapshot.periodId === period!.id && snapshot.subjectId !== "store")
      .reduce((acc, snapshot) => acc + (snapshot.values.total_orders ?? 0), 0);

    const local = dataset.snapshots.find(
      (snapshot) => snapshot.periodId === period!.id && snapshot.subjectId === "store",
    );

    // El dashboard del local y la vista de equipo no pueden contradecirse.
    expect(local?.values.total_orders).toBe(suma);
  });

  it("promedia los tiempos del local en vez de sumarlos", () => {
    const dataset = generateDataset();
    const period = dataset.periods.at(-1)!;
    const local = dataset.snapshots.find(
      (snapshot) => snapshot.periodId === period.id && snapshot.subjectId === "store",
    );

    const tiempos = dataset.snapshots
      .filter((snapshot) => snapshot.periodId === period.id && snapshot.subjectId !== "store")
      .map((snapshot) => snapshot.values.picking_time ?? 0);

    const media = tiempos.reduce((acc, value) => acc + value, 0) / tiempos.length;
    // Sumar minutos de ocho personas daría media hora de picking y ningún sentido.
    expect(local?.values.picking_time).toBeCloseTo(media, 2);
  });

  it("da a cada métrica el número de decimales que declara el registro", () => {
    const dataset = generateDataset();
    const pedidos = getMetric("total_orders");
    expect(pedidos.precision).toBe(0);

    for (const snapshot of dataset.snapshots) {
      const value = snapshot.values.total_orders;
      if (value === undefined) continue;
      expect(Number.isInteger(value)).toBe(true);
    }
  });

  it("permite pedir otro tamaño de histórico y de equipo", () => {
    const dataset = generateDataset({ weeks: 4, workerCount: 3 });
    expect(dataset.periods).toHaveLength(4);
    expect(dataset.workers).toHaveLength(3);
    // Una fila por persona y una del local, por cada semana.
    expect(dataset.snapshots).toHaveLength(4 * (3 + 1));
  });
});
