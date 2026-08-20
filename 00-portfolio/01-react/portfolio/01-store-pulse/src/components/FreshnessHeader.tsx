import type { Period } from "../data/types.ts";

/**
 * Cuándo son estos datos y si se puede confiar en ellos.
 *
 * No es decoración. Es la defensa contra el peor fallo posible de esta app: que
 * alguien tome una decisión con datos de hace tres semanas creyendo que son de hoy.
 * El §18 del documento de origen lo pide explícitamente, y con razón.
 */

const TIME_ZONE = "America/Santiago";

const dayFormatter = new Intl.DateTimeFormat("es-CL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: TIME_ZONE,
});

const timeFormatter = new Intl.DateTimeFormat("es-CL", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIME_ZONE,
});

const rangeFormatter = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "long",
  timeZone: TIME_ZONE,
});

/**
 * ¿Está cargada la semana que tocaba?
 *
 * Se mide contra el cierre del último período y NO contra el reloj de pared. Es la
 * pregunta correcta ("¿ya subieron los datos de la semana que terminó?") y además no
 * caduca: una demo que se compara con `new Date()` se pinta en rojo sola dentro de
 * unos meses aunque no le pase nada.
 */
function isUpToDate(period: Period, updatedAt: string): boolean {
  const closed = new Date(`${period.endsOn}T23:59:59Z`).getTime();
  const updated = new Date(updatedAt).getTime();
  if (Number.isNaN(updated)) return false;
  return updated >= closed;
}

export function FreshnessHeader({ period, updatedAt }: { period: Period; updatedAt: string }) {
  const updated = new Date(updatedAt);
  const fresh = isUpToDate(period, updatedAt);

  const start = new Date(`${period.startsOn}T12:00:00Z`);
  const end = new Date(`${period.endsOn}T12:00:00Z`);

  return (
    <header className="border-line bg-surface rounded-2xl border p-4">
      <h1 className="text-ink text-lg font-semibold">Semana {period.isoWeek}</h1>
      <p className="text-ink-soft text-sm">
        {rangeFormatter.format(start)} – {rangeFormatter.format(end)}
      </p>

      <p className="mt-2 flex items-center gap-2 text-sm">
        <span
          aria-hidden="true"
          className={`h-2 w-2 shrink-0 rounded-full ${fresh ? "bg-good" : "bg-warn"}`}
        />
        <span className={fresh ? "text-good" : "text-warn"}>
          {fresh ? "Datos al día" : "Pendiente de actualizar"}
        </span>
      </p>

      <p className="text-ink-faint mt-1 text-xs">
        Última actualización: {dayFormatter.format(updated)}, {timeFormatter.format(updated)}
      </p>
    </header>
  );
}
