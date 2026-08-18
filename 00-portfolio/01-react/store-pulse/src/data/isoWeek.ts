import type { Period } from "./types.ts";

const DAY_MS = 86_400_000;

/** `2026-W33`. El año va delante porque "W33" a secas se repite cada año. */
export function periodId(isoYear: number, isoWeek: number): string {
  return `${isoYear}-W${String(isoWeek).padStart(2, "0")}`;
}

/**
 * El lunes de una semana ISO.
 *
 * La regla ISO 8601 dice que la semana 1 es la que contiene el primer jueves del
 * año. La forma corta de aplicarla: **el 4 de enero siempre cae en la semana 1**, así
 * que se busca el lunes de la semana del 4 de enero y se cuentan semanas desde ahí.
 *
 * Todo en UTC a propósito: con horario local, los cambios de hora de primavera y
 * otoño mueven algunos lunes un día entero.
 */
export function isoWeekStart(isoYear: number, isoWeek: number): Date {
  const jan4 = new Date(Date.UTC(isoYear, 0, 4));
  const dayOfWeek = (jan4.getUTCDay() + 6) % 7; // 0 = lunes
  const firstMonday = jan4.getTime() - dayOfWeek * DAY_MS;
  return new Date(firstMonday + (isoWeek - 1) * 7 * DAY_MS);
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function buildPeriod(isoYear: number, isoWeek: number): Period {
  const start = isoWeekStart(isoYear, isoWeek);
  const end = new Date(start.getTime() + 6 * DAY_MS);

  return {
    id: periodId(isoYear, isoWeek),
    isoYear,
    isoWeek,
    startsOn: toIsoDate(start),
    endsOn: toIsoDate(end),
  };
}

/** Cuántas semanas ISO tiene un año: 52, o 53 los años largos. */
export function weeksInIsoYear(isoYear: number): number {
  // Un año ISO tiene 53 semanas si empieza en jueves, o si es bisiesto y empieza en
  // miércoles. En la práctica basta con mirar dónde cae el 28 de diciembre, que
  // siempre pertenece a la última semana del año.
  const dec28 = new Date(Date.UTC(isoYear, 11, 28));
  const start = isoWeekStart(isoYear, 1);

  // floor y no round: el 28 de diciembre casi nunca cae en lunes, así que la
  // diferencia con el primer lunes del año no es múltiplo de 7. Redondeando, un
  // resto de 4, 5 o 6 días sube a la semana siguiente y devuelve 53 semanas para
  // años que solo tienen 52 (2025, sin ir más lejos). Con floor se cuenta la semana
  // empezada, que es lo que pide la definición.
  return Math.floor((dec28.getTime() - start.getTime()) / (7 * DAY_MS)) + 1;
}

/**
 * Las `count` semanas que terminan en la indicada, de la más antigua a la más reciente.
 *
 * Retrocede cruzando el cambio de año, que es donde estas cuentas suelen romperse:
 * la semana anterior a la 1 de 2027 es la 53 de 2026, no la 0 ni la 52.
 */
export function recentPeriods(isoYear: number, isoWeek: number, count: number): Period[] {
  const periods: Period[] = [];
  let year = isoYear;
  let week = isoWeek;

  for (let i = 0; i < count; i += 1) {
    periods.unshift(buildPeriod(year, week));
    week -= 1;
    if (week < 1) {
      year -= 1;
      week = weeksInIsoYear(year);
    }
  }

  return periods;
}
