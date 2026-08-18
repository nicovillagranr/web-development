import { z } from "zod";
import { METRIC_IDS } from "../metrics/index.ts";

/**
 * Validación de la frontera de datos, con el mismo criterio que ya usas en
 * `00-hosting/src/schemas/`: lo que entra desde fuera se comprueba antes de usarse, y
 * si viene mal se falla en el sitio (fail-fast) en vez de dejar que un dato corrupto
 * se propague y reviente el render tres componentes más abajo.
 *
 * Hoy lo único que entra son los mocks, así que parece un trámite. No lo es por dos
 * motivos: valida que el generador produce lo que promete (y ahí sí ha cazado
 * errores), y el día que los datos lleguen por `fetch` desde la API, este archivo ya
 * es la aduana — sin escribir nada nuevo.
 */

const PeriodIdSchema = z
  .string()
  .regex(/^\d{4}-W\d{2}$/, "el id de período debe tener la forma 2026-W33");

const IsoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "la fecha debe ser YYYY-MM-DD");

export const PeriodSchema = z
  .object({
    id: PeriodIdSchema,
    isoYear: z.int().min(2000).max(2100),
    // 53 y no 52: hay años ISO de 53 semanas (2026 es uno de ellos). Cortar en 52
    // es el error clásico de calendario, y solo se manifiesta a fin de año.
    isoWeek: z.int().min(1).max(53),
    startsOn: IsoDateSchema,
    endsOn: IsoDateSchema,
  })
  .refine(
    (period) => period.id === `${period.isoYear}-W${String(period.isoWeek).padStart(2, "0")}`,
    {
      message: "el id del período no coincide con su año y semana",
    },
  )
  .refine((period) => period.startsOn < period.endsOn, {
    message: "el período termina antes de empezar",
  });

export const SubjectSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(["worker", "team", "store"]),
  displayName: z.string().min(1),
});

export const MetricSnapshotSchema = z.object({
  subjectId: z.string().min(1),
  periodId: PeriodIdSchema,
  // partialRecord y no record: un snapshot puede traer solo algunas métricas, y de
  // hecho es lo normal (la composición de calidad es del local, no de una persona).
  // Un `record` exigiría las once métricas en cada fila.
  values: z.partialRecord(z.enum(METRIC_IDS), z.number().finite()),
});

export const DatasetSchema = z
  .object({
    updatedAt: z.iso.datetime(),
    periods: z.array(PeriodSchema).min(1),
    workers: z.array(SubjectSchema).min(1),
    store: SubjectSchema,
    snapshots: z.array(MetricSnapshotSchema),
  })
  .refine(
    (dataset) => {
      // Ningún snapshot puede apuntar a un período que no está en la lista. Sin esta
      // comprobación, un período mal escrito en el origen no da error: simplemente
      // hace desaparecer datos de la pantalla en silencio, que es mucho peor.
      const known = new Set(dataset.periods.map((period) => period.id));
      return dataset.snapshots.every((snapshot) => known.has(snapshot.periodId));
    },
    { message: "hay snapshots que apuntan a un período inexistente" },
  )
  .refine(
    (dataset) => {
      const known = new Set([...dataset.workers.map((worker) => worker.id), dataset.store.id]);
      return dataset.snapshots.every((snapshot) => known.has(snapshot.subjectId));
    },
    { message: "hay snapshots que apuntan a un sujeto inexistente" },
  )
  .refine(
    (dataset) => {
      // La clave natural del §13 del plan, comprobada ya en el cliente: un sujeto
      // solo puede tener un snapshot por período. Dos filas iguales significan que
      // el importador duplicó, y aquí se ve antes de que la UI sume dos veces.
      const keys = dataset.snapshots.map(
        (snapshot) => `${snapshot.periodId}|${snapshot.subjectId}`,
      );
      return new Set(keys).size === keys.length;
    },
    { message: "hay más de un snapshot para el mismo sujeto y período" },
  );
