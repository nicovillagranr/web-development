import { REPORT_ROWS, type ReportRow } from "./report.ts";

/**
 * De qué nombres se llama a la gente en la demo.
 *
 * `report.ts` se versiona con nombres de relleno. Los reales, si los hay, viven en
 * `roster.private.ts`, que está en el `.gitignore` y que **no existe en un clon
 * recién hecho**. Este archivo decide cuál de los dos se usa, y su único trabajo de
 * verdad es garantizar que la respuesta en producción sea siempre "los de relleno".
 *
 * ── Las tres barreras, y por qué hacen falta las tres ────────────────────────
 * 1. `.gitignore` — el archivo privado no se sube. Protege del `git add .`.
 * 2. `import.meta.env.DEV` — la rama que carga lo privado se compila a código
 *    muerto en producción, así que el archivo no entra al bundle. Protege del
 *    despliegue.
 * 3. `scripts/check-no-private-data.mjs` — después del build, busca cada nombre
 *    privado dentro de `dist/`. Protege de que las dos anteriores fallen.
 *
 * La tercera es la importante, y no por desconfianza: las dos primeras dependen de
 * que un `.gitignore` esté bien escrito y de que el bundler elimine código muerto
 * como se espera. Las dos cosas son ciertas hoy y ninguna avisa el día que deje de
 * serlo. La tercera **comprueba el resultado** en vez de confiar en el mecanismo, y
 * es la diferencia entre "no debería pasar" y "no pasó".
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * `import.meta.glob` en vez de un `import` normal, y sin `eager`.
 *
 * Un `import` normal de un archivo que puede no existir rompe el build en cualquier
 * clon del repositorio, que es justamente donde el archivo nunca va a estar. `glob`
 * resuelve el patrón al compilar y devuelve un objeto vacío si no hay nada que
 * casar: la ausencia deja de ser un error y pasa a ser un dato.
 *
 * Sin `eager` porque `eager` haría un import estático, y un import estático entra al
 * bundle aunque nadie lo llame. Así queda como `import()` dinámico dentro de una
 * rama que en producción es inalcanzable, y desaparece entero.
 */
const privateRoster = import.meta.glob<{ readonly PRIVATE_NAMES?: readonly string[] }>(
  "./roster.private.ts",
);

const PRIVATE_PATH = "./roster.private.ts";

/**
 * Los nombres reales, o `null` si no toca usarlos.
 *
 * Es asíncrona y no pasa nada: quien la llama es `mockDataSource.load()`, que ya
 * devolvía una promesa. No se añade asincronía a la app, se aprovecha la que había.
 */
async function loadPrivateNames(): Promise<readonly string[] | null> {
  // La guarda que borra la rama entera en producción. `import.meta.env.DEV` lo
  // sustituye Vite por `false` literal al compilar, así que todo lo que hay debajo
  // se convierte en código inalcanzable y el bundler lo elimina con el `import()`
  // incluido. Tiene que ser lo primero de la función: cualquier cosa por encima
  // sobreviviría al recorte.
  if (!import.meta.env.DEV) return null;

  const load = privateRoster[PRIVATE_PATH];
  if (!load) return null;

  const module = await load();
  const names = module.PRIVATE_NAMES;
  if (!names) return null;

  // Un desajuste de longitud significa que el archivo privado se quedó atrás
  // respecto al reporte. Se avisa y se sigue con los de relleno, en vez de emparejar
  // media lista y dejar a la otra media con el nombre de otra persona.
  if (names.length !== REPORT_ROWS.length) {
    console.warn(
      `[roster] ${PRIVATE_PATH} trae ${names.length} nombres y el reporte tiene ` +
        `${REPORT_ROWS.length} filas. Se usan los nombres de relleno.`,
    );
    return null;
  }

  return names;
}

/**
 * Las filas del reporte con los nombres que correspondan.
 *
 * El emparejamiento es **por posición**: la fila `i` toma el nombre `i`. Funciona
 * porque las dos listas están ordenadas alfabéticamente por nombre de pila, igual
 * que el reporte de origen, y porque el archivo privado se genera de esa misma
 * fuente. Es también el motivo de que el desajuste de longitud de arriba aborte en
 * vez de recortar: con listas de distinta longitud, "por posición" deja de
 * significar nada.
 */
export async function loadReportRows(): Promise<readonly ReportRow[]> {
  const names = await loadPrivateNames();
  if (!names) return REPORT_ROWS;

  return REPORT_ROWS.map((row, index): ReportRow => {
    const [, ...values] = row;
    return [names[index] as string, ...values];
  });
}

/** Si la demo está mostrando nombres reales. La UI lo avisa en pantalla. */
export async function isUsingPrivateRoster(): Promise<boolean> {
  return (await loadPrivateNames()) !== null;
}
