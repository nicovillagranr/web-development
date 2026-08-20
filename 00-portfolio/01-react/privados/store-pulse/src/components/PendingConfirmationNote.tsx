import { METRIC_LIST, assumedMetrics, unlistedMetrics } from "../metrics/index.ts";

/**
 * Qué parte del registro sigue sin confirmar con el local.
 *
 * La Fase 0 del proyecto —preguntar en el turno qué significa exactamente cada
 * indicador— sigue abierta, y este aviso la mantiene a la vista en lugar de dejarla
 * enterrada en un documento que nadie vuelve a abrir.
 *
 * Son dos dudas distintas y por eso se cuentan por separado:
 *
 *   `assumed`   sabemos cómo se llama, no qué mide
 *   sin fuente  ni siquiera sabemos si existe: la métrica se la inventó la app
 *
 * El listado de indicadores del local (18 ago 2026) resolvió la primera mitad de la
 * primera duda —los nombres— y ninguna de las otras. Decir "salen de capturas" ya
 * sería mentira; decir "están confirmadas" lo sería mucho más.
 *
 * No hay nada que mantener: los dos números se calculan desde el registro, así que
 * van encogiendo solos y el aviso desaparece cuando no quede ninguno. Un aviso que
 * se borra a sí mismo no se queda mintiendo.
 */
export function PendingConfirmationNote() {
  const pending = assumedMetrics();
  const unlisted = unlistedMetrics();
  if (pending.length === 0 && unlisted.length === 0) return null;

  return (
    <p className="text-ink-soft border-line bg-surface rounded-2xl border p-3 text-xs">
      {pending.length > 0 && (
        <>
          <span className="text-ink font-medium">
            {pending.length} de {METRIC_LIST.length} métricas están por confirmar
          </span>{" "}
          con el local: sabemos cómo se llaman, no qué mide cada una exactamente.{" "}
        </>
      )}
      {unlisted.length === 1 &&
        "Una de ellas no aparece en el listado de indicadores del local, así que puede que ni exista. "}
      {unlisted.length > 1 &&
        `${unlisted.length} de ellas no aparecen en el listado de indicadores del local, así que puede que ni existan. `}
      Los datos que ves son ficticios.
    </p>
  );
}
