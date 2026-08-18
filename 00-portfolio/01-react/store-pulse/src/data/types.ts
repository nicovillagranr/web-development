import type { MetricId, Scope } from "../metrics/index.ts";

/**
 * El contrato de datos de la app.
 *
 * Es también, a propósito, la forma que tendrá la respuesta de la API cuando exista
 * el backend (Fase 5). Hoy lo rellena el generador de mocks; mañana lo rellenará
 * `fetch`. Los componentes no notarán la diferencia porque nunca hablan con ninguno
 * de los dos: hablan con `DataSource`.
 */

/** Un período semanal, identificado por año y semana ISO. */
export type Period = {
  /** `2026-W33`. Año ISO incluido: "W33" a secas es ambiguo entre años. */
  readonly id: string;
  readonly isoYear: number;
  readonly isoWeek: number;
  /** Lunes del período, `YYYY-MM-DD`. */
  readonly startsOn: string;
  /** Domingo del período, `YYYY-MM-DD`. */
  readonly endsOn: string;
};

/**
 * Quién o qué se está midiendo.
 *
 * Un trabajador es una entidad de primera clase y no una columna de texto. Es lo
 * que permitirá que la autenticación por roles entre en la Fase 9 sin rehacer nada:
 * la sesión solo tendrá que traer un `subjectId`.
 */
export type Subject = {
  readonly id: string;
  readonly kind: Scope;
  readonly displayName: string;
};

/**
 * Lo que se midió de un sujeto en un período.
 *
 * `values` es parcial a propósito: no toda métrica aplica a todo sujeto (la
 * composición de calidad es del local, no de una persona) y un período puede llegar
 * incompleto. Con `exactOptionalPropertyTypes` activado, leer una métrica ausente da
 * `undefined` y hay que tratarlo — que es justo lo que queremos que pase.
 */
export type MetricSnapshot = {
  readonly subjectId: string;
  readonly periodId: string;
  readonly values: Partial<Record<MetricId, number>>;
};

export type Dataset = {
  /** Cuándo se actualizó la fuente. Alimenta el indicador de frescura del §18. */
  readonly updatedAt: string;
  /** Ordenados del más antiguo al más reciente. */
  readonly periods: readonly Period[];
  readonly workers: readonly Subject[];
  readonly store: Subject;
  readonly snapshots: readonly MetricSnapshot[];
};
