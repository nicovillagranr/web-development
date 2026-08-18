import { describe, expect, it } from "vitest";
import { buildPeriod, isoWeekStart, periodId, recentPeriods, weeksInIsoYear } from "./isoWeek.ts";

describe("isoWeekStart", () => {
  it("sitúa la semana 33 de 2026 en el lunes correcto", () => {
    // Comprobado contra el calendario: la W33 de 2026 va del 10 al 16 de agosto,
    // y es la última semana completa antes de la fecha del documento de origen.
    expect(isoWeekStart(2026, 33).toISOString().slice(0, 10)).toBe("2026-08-10");
  });

  it("aplica la regla del 4 de enero cuando el año empieza a media semana", () => {
    // 2026 empieza en jueves, así que su semana 1 arranca el 29 de diciembre de 2025.
    // Es el caso que rompe cualquier implementación que asuma que la semana 1
    // empieza el 1 de enero.
    expect(isoWeekStart(2026, 1).toISOString().slice(0, 10)).toBe("2025-12-29");
  });
});

describe("buildPeriod", () => {
  it("construye un período completo y coherente", () => {
    const period = buildPeriod(2026, 33);
    expect(period).toEqual({
      id: "2026-W33",
      isoYear: 2026,
      isoWeek: 33,
      startsOn: "2026-08-10",
      endsOn: "2026-08-16",
    });
  });

  it("rellena con cero las semanas de un dígito", () => {
    expect(periodId(2026, 7)).toBe("2026-W07");
  });
});

describe("weeksInIsoYear", () => {
  it("reconoce los años ISO de 53 semanas", () => {
    // 2026 es uno de ellos. Cortar en 52 es el error de calendario clásico, y solo
    // se manifiesta a fin de año — cuando ya nadie está mirando.
    expect(weeksInIsoYear(2026)).toBe(53);
  });

  it("reconoce los años ISO normales de 52 semanas", () => {
    expect(weeksInIsoYear(2025)).toBe(52);
  });
});

describe("recentPeriods", () => {
  it("devuelve las semanas en orden cronológico, terminando en la pedida", () => {
    const periods = recentPeriods(2026, 33, 4);
    expect(periods.map((period) => period.id)).toEqual([
      "2026-W30",
      "2026-W31",
      "2026-W32",
      "2026-W33",
    ]);
  });

  it("retrocede bien al cruzar el cambio de año", () => {
    // La semana anterior a la 1 de 2027 es la 53 de 2026, no la 0 ni la 52.
    const periods = recentPeriods(2027, 2, 4);
    expect(periods.map((period) => period.id)).toEqual([
      "2026-W52",
      "2026-W53",
      "2027-W01",
      "2027-W02",
    ]);
  });
});
