import { METRIC_LIST, assumedMetrics } from "../metrics/index.ts";

/**
 * Cuántas métricas siguen sin confirmar con el local.
 *
 * La Fase 0 del proyecto —preguntar en el turno qué significa exactamente cada
 * indicador— sigue abierta, y todo lo que hay en el registro está leído de capturas.
 * Este aviso mantiene ese hecho a la vista en lugar de dejarlo enterrado en un
 * documento que nadie vuelve a abrir.
 *
 * No hay nada que mantener: se calcula desde `status` en el registro, así que va
 * encogiendo solo según se confirman métricas y desaparece del todo cuando no queda
 * ninguna. Un aviso que se borra a sí mismo no se queda mintiendo.
 */
export function PendingConfirmationNote() {
  const pending = assumedMetrics();
  if (pending.length === 0) return null;

  return (
    <p className="text-ink-soft border-line bg-surface rounded-2xl border p-3 text-xs">
      <span className="text-ink font-medium">
        {pending.length} de {METRIC_LIST.length} métricas están por confirmar
      </span>{" "}
      con el local: los nombres y significados salen de capturas de la plataforma interna, no de una
      definición oficial. Los datos que ves son ficticios.
    </p>
  );
}
