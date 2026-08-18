import { checkDerived, formatMetricValue, getMetric } from "../../metrics/index.ts";
import type { MetricId } from "../../metrics/index.ts";

/**
 * En qué parte del proceso se va el tiempo.
 *
 * El bloque más útil de la app y el que justifica que `derivedFrom` exista. Un Prep
 * Time de 6,91 min no dice qué hacer; ver que 3,77 de esos minutos son picking, sí.
 *
 * Si las partes dejan de sumar el total, se avisa. **No se corrige el total**: la
 * relación es una observación tomada de una captura, no una ley del dominio, y son
 * promedios — solo suman si todos los pedidos pasan por las tres etapas. Taparlo
 * calculando el total nosotros escondería un problema real de los datos de origen.
 */
export function TimeBreakdown({ values }: { values: Partial<Record<MetricId, number>> }) {
  const total = getMetric("prep_time");
  const parts = (total.derivedFrom ?? []).map((id) => getMetric(id));

  const totalValue = values[total.id];
  const mismatch = checkDerived(total, values);

  // Se reparten las barras sobre la suma de las partes y no sobre el total: si hay
  // descuadre, las proporciones siguen siendo las de lo que se midió de verdad.
  const partsSum = parts.reduce((acc, part) => acc + (values[part.id] ?? 0), 0);

  return (
    <section aria-labelledby="tiempos" className="border-line bg-surface rounded-2xl border p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h2 id="tiempos" className="text-ink-soft text-sm font-semibold">
          {total.label}
        </h2>
        <p className="tabular text-ink text-lg font-semibold">
          {totalValue === undefined ? "—" : formatMetricValue(totalValue, total)}
        </p>
      </div>

      <ul className="mt-3 flex flex-col gap-2">
        {parts.map((part) => {
          const value = values[part.id];
          const share = value !== undefined && partsSum > 0 ? (value / partsSum) * 100 : 0;

          return (
            <li key={part.id} className="flex items-center gap-3">
              <span className="text-ink-soft w-24 shrink-0 text-xs">{part.shortLabel}</span>
              <span className="bg-canvas h-2 flex-1 overflow-hidden rounded-full">
                <span
                  className="bg-brand block h-full rounded-full"
                  style={{ width: `${share}%` }}
                />
              </span>
              <span className="tabular text-ink w-20 shrink-0 text-right text-xs font-medium">
                {value === undefined ? "—" : formatMetricValue(value, part)}
              </span>
            </li>
          );
        })}
      </ul>

      {mismatch ? (
        <p
          role="status"
          className="bg-warn-soft text-warn ring-warn/20 mt-3 rounded-xl p-2 text-xs ring-1"
        >
          Las tres etapas suman {formatMetricValue(mismatch.expected, total)} y el total marca{" "}
          {formatMetricValue(mismatch.actual, total)}. Puede que no todos los pedidos pasen por las
          tres etapas — conviene preguntarlo antes de sacar conclusiones.
        </p>
      ) : null}
    </section>
  );
}
