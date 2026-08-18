import type { Direction } from "./types.ts";

/** Hacia dónde se movió el número. Nada que ver con si eso es bueno. */
export type Movement = "up" | "down" | "flat";

export type Comparison = {
  /** Diferencia con signo, en la unidad de la métrica. */
  readonly delta: number;
  /**
   * Variación porcentual, siempre positiva (el signo ya lo lleva `movement`).
   * `null` cuando el período anterior valía 0 y dividir no significaría nada.
   */
  readonly pct: number | null;
  readonly movement: Movement;
  /**
   * Si el cambio es una mejora. `null` cuando la pregunta no aplica: métrica
   * neutral, o valor que no se movió.
   *
   * Está separado de `movement` a propósito, y es la distinción que hace que esta
   * app no mienta: en Prep Time el número BAJA (`movement: 'down'`) y eso es una
   * MEJORA (`improved: true`). La flecha se pinta desde `movement`, el color desde
   * `improved`. Juntarlos en un solo campo es el bug clásico de estos paneles.
   */
  readonly improved: boolean | null;
};

/**
 * Compara el período actual con el anterior.
 *
 * `previous` acepta `undefined` porque es un caso corriente y no un error: la
 * primera semana con datos, o alguien que se incorporó el mes pasado. Devolver
 * `null` obliga a quien llama a decidir qué pintar, en vez de dejar que un 0
 * fantasma se cuele en la interfaz y parezca un desplome del 100 %.
 */
export function compare(
  current: number,
  previous: number | undefined,
  direction: Direction,
): Comparison | null {
  if (previous === undefined) return null;
  if (!Number.isFinite(current) || !Number.isFinite(previous)) return null;

  const delta = current - previous;

  const movement: Movement = delta > 0 ? "up" : delta < 0 ? "down" : "flat";

  // Sin base no hay porcentaje: pasar de 0 a 5 no es "subir un 500 %", es empezar.
  const pct = previous === 0 ? null : Math.abs((delta / previous) * 100);

  const improved =
    direction === "neutral" || movement === "flat"
      ? null
      : direction === "lower-is-better"
        ? movement === "down"
        : movement === "up";

  return { delta, pct, movement, improved };
}
