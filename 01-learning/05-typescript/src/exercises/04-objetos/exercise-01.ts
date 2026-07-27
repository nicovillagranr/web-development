/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — los tres primos de `Object` (sobre `{ a: 1, b: 5, c: 3 }`):
 *
 *   Object.keys(obj)     // → ["a", "b", "c"]              los NOMBRES (siempre strings)
 *   Object.values(obj)   // → [1, 5, 3]                    los VALORES (aquí, números)
 *   Object.entries(obj)  // → [["a",1], ["b",5], ["c",3]]  los PARES [nombre, valor]
 *
 * 🧠 Un casillero con etiquetas: keys = las etiquetas · values = lo de dentro ·
 *    entries = etiqueta + contenido, juntos, casillero por casillero.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 01 — Objetos: shapes, opcionales y `readonly` por propiedad
 * =============================================================================
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 * En el ejercicio 01 vimos `EMPTY_USER = { name: "", age: 0 }` y TS lo infirió
 * como `{ name: string; age: number }`. Hasta ahí bien. Pero los objetos
 * reales tienen más matices que necesitas controlar:
 *
 *   - Propiedades OBLIGATORIAS vs OPCIONALES.
 *   - Propiedades INMUTABLES (readonly) por separado, no todas a la vez.
 *
 * Sintaxis básica de un "shape" de objeto:
 *
 *   type User = {
 *     name: string;        // obligatoria
 *     age: number;         // obligatoria
 *     nickname?: string;   // opcional (puede no existir)
 *     readonly id: string; // existe siempre, no se puede mutar
 *   };
 *
 * El `?` después del nombre marca la propiedad como **opcional**. El tipo real
 * de `nickname` ahí dentro es `string | undefined`: o tiene un string, o no
 * existe la propiedad.
 *
 * El `readonly` antes del nombre marca **solo esa propiedad** como inmutable.
 * Las demás (name, age) siguen siendo mutables. Es la versión "quirúrgica" del
 * `as const`, que congela TODO de golpe.
 *
 *
 * ▸ ANALOGÍA — formulario de inscripción
 * ----------------------------------------------------------------------------
 * Piensa en un formulario para inscribirte a un evento:
 *
 *   - Nombre y email: campos OBLIGATORIOS (no puedes enviar sin rellenarlos).
 *   - Empresa: campo OPCIONAL (puedes dejarlo en blanco).
 *   - Número de socio: campo READONLY (te lo asigna el sistema, no lo tocas).
 *
 * En TypeScript:
 *
 *   type Inscripcion = {
 *     name: string;           // obligatorio
 *     email: string;          // obligatorio
 *     empresa?: string;       // opcional → puede no estar
 *     readonly socioId: string; // readonly → no puedes cambiarlo después
 *   };
 *
 *
 * ▸ EJEMPLO 1 — opcional
 * ----------------------------------------------------------------------------
 *
 *   type Producto = { name: string; descuento?: number };
 *
 *   const p1: Producto = { name: "Camiseta" };              // ✅ sin descuento
 *   const p2: Producto = { name: "Pantalón", descuento: 20 }; // ✅ con descuento
 *
 *   // Cuidado: dentro del código, `descuento` puede ser undefined.
 *   p1.descuento.toFixed(2); // ❌ TS: 'descuento' is possibly 'undefined'
 *   p1.descuento?.toFixed(2); // ✅ optional chaining, lo verás más adelante
 *
 *
 * ▸ EJEMPLO 2 — readonly por propiedad
 * ----------------------------------------------------------------------------
 *
 *   type Cuenta = { readonly id: string; balance: number };
 *
 *   const c: Cuenta = { id: "ABC-123", balance: 100 };
 *   c.balance = 200;  // ✅ balance es mutable
 *   c.id = "XYZ";     // ❌ TS: cannot assign to 'id' (readonly)
 *
 * `readonly` aquí solo afecta a `id`. `balance` se puede cambiar libremente.
 * Útil para campos que se asignan UNA vez y nunca cambian: `id`, `createdAt`,
 * `userId`, etc.
 *
 *
 * ▸ CUÁNDO USAR
 * ----------------------------------------------------------------------------
 *
 *   - `propiedad?`         → la propiedad puede no existir (filtros, configs
 *                            con defaults, datos parciales de un formulario).
 *
 *   - `readonly propiedad` → la propiedad existe siempre y no debe mutarse
 *                            después de crearse (identificadores, fechas de
 *                            creación, claves de un registro).
 *
 *   - Las dos combinadas (`readonly nick?: string`) también son válidas si
 *     tiene sentido en tu modelo.
 *
 *
 * ▸ EJERCICIO
 * ----------------------------------------------------------------------------
 *
 * Reglas:
 *   - ❌ No uses `any`, no uses `as X` (excepto `as const` si hiciera falta).
 *   - ✅ Usa `?` para opcionales, `readonly` por propiedad cuando se pida.
 *   - ✅ `pnpm test:run` y `pnpm typecheck` limpios.
 *
 * ===========================================================================*/

// 1) Define un tipo `User` con estas propiedades:
//      - id: string, NO se puede mutar después.
//      - name: string, obligatoria, mutable.
//      - email: string, obligatoria, mutable.
//      - phone: string, OPCIONAL (puede no existir).
//
//    Y exporta una constante `juan: User` con id="u-1", name="Juan",
//    email="juan@mail.com", sin phone.
export type User = {
  readonly id: string;
  name: string;
  email: string;
  phone?: string;
};

export const juan: User = {
  id: "u-1",
  name: "Juan",
  email: "juan@mail.com",
  // Al ser una propiedad opcional, en este caso lo dejamos sin phone
};


// 2) Define un tipo `Article` con estas propiedades:
//      - readonly slug: string
//      - title: string
//      - body: string
//      - publishedAt: opcional, string ISO ("2026-05-27")
//
//    Y una función `publicar(article: Article, fechaIso: string)` que
//    devuelva un NUEVO Article con `publishedAt` asignado (no mutar el
//    original). Pista: usa spread `{ ...article, publishedAt: fechaIso }`.
export type Article = {
  readonly slug: string;
  title: string;
  body: string;
  publishedAt?: string;
};

export function publicar(article: Article, fechaIso: string) {
  return { ...article, publishedAt: fechaIso }
}


// 3) Define un tipo `Settings` para configuración de UI con:
//      - theme: "light" o "dark" (literal union)
//      - language: opcional, string
//      - readonly version: number
//
//    Y exporta una constante `defaultSettings: Settings` con theme="light",
//    sin language, version=1.
export type Settings = {
  theme: "light" | "dark",
  language?: string,
  readonly version: number
};

export const defaultSettings: Settings = {
  theme: "light",
  version: 1
};
