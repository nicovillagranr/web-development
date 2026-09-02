import { describe, expect, it } from "vitest";
import { REPORT_COLUMNS, REPORT_ROWS } from "./report.ts";
import { loadReportRows } from "./roster.ts";

/**
 * Estas pruebas tienen que pasar **igual con y sin** `roster.private.ts` presente:
 * en esta máquina el archivo puede existir y en un clon no. Por eso ninguna comprueba
 * un nombre concreto —eso sería meter un dato real en un archivo versionado— sino la
 * propiedad que se cumple en los dos casos: los nombres pueden cambiar, las cifras no.
 */

describe("report.ts — la capa RAW", () => {
  it("tiene una fila por picker del reporte", () => {
    expect(REPORT_ROWS).toHaveLength(30);
  });

  it("cada fila trae el nombre y las 20 columnas", () => {
    for (const row of REPORT_ROWS) {
      expect(row).toHaveLength(REPORT_COLUMNS.length + 1);
    }
  });

  it("no repite nombres", () => {
    const names = REPORT_ROWS.map(([name]) => name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("usa null y nunca 0 para la celda vacía del reporte", () => {
    // Las tres columnas que sí traen ceros de verdad en el documento. En el resto,
    // un 0 sería un "-" mal convertido: alguien sin datos pintado como alguien con
    // rendimiento nulo, que es el fallo que el §15 manda evitar.
    const zeroIsReal = new Set(["inaccuracyWmItem", "inaccuracyPq", "totalOrders"]);

    for (const [name, ...cells] of REPORT_ROWS) {
      cells.forEach((cell, index) => {
        const column = REPORT_COLUMNS[index] as string;
        if (cell === 0 && !zeroIsReal.has(column)) {
          throw new Error(`${name} tiene 0 en ${column}; una celda vacía debe ser null`);
        }
      });
    }
  });

  it("conserva las columnas que el reporte trajo vacías", () => {
    // `rating` y `ausencias` llegan enteras a null. Se conservan a propósito: la capa
    // RAW registra lo que el documento traía, no lo que a la app le sirve. Si algún
    // día vienen con datos, esta prueba avisa de que hay una columna nueva que
    // decidir en vez de que aparezca sola en la UI.
    for (const column of ["rating", "ausencias"] as const) {
      const index = REPORT_COLUMNS.indexOf(column);
      const values = REPORT_ROWS.map((row) => row[index + 1]);
      expect(values.every((value) => value === null)).toBe(true);
    }
  });
});

describe("roster.ts — el cambio de nombres", () => {
  it("devuelve tantas filas como el reporte", async () => {
    const rows = await loadReportRows();
    expect(rows).toHaveLength(REPORT_ROWS.length);
  });

  it("cambia los nombres pero nunca las cifras", async () => {
    const rows = await loadReportRows();

    rows.forEach((row, index) => {
      const [, ...values] = row;
      const [, ...original] = REPORT_ROWS[index] as (typeof REPORT_ROWS)[number];
      expect(values).toEqual(original);
    });
  });

  it("no deja ningún nombre vacío ni repetido", async () => {
    const names = (await loadReportRows()).map(([name]) => name);

    expect(names.every((name) => name.trim().length > 0)).toBe(true);
    expect(new Set(names).size).toBe(names.length);
  });
});
