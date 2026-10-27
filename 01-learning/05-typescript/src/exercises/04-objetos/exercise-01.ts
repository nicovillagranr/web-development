/* =============================================================================
 * EJERCICIO 01 — objetos: shapes, opcionales y readonly por propiedad · bloque 04
 *
 * 📌 RECORDATORIO — los tres primos de Object, sobre obj = { a: 1, b: 5, c: 3 }:
 * Object.keys(obj)    → ["a", "b", "c"]: los nombres (siempre strings)
 * Object.values(obj)  → [1, 5, 3]: los valores
 * Object.entries(obj) → [["a", 1], ["b", 5], ["c", 3]]: los pares [nombre, valor]
 *
 * 🎯 OBJETIVOS
 * · Describir la forma de un objeto con propiedades obligatorias y opcionales (?).
 * · Marcar como readonly solo las propiedades que no deben cambiar.
 *
 * 🟢 CONTEXTO — en el ejercicio 01 vimos EMPTY_USER = { name: "", age: 0 }, y TS lo
 * infirió como { name: string; age: number }. Hasta ahí, bien. Pero los objetos
 * reales tienen más matices: propiedades obligatorias frente a opcionales, e
 * inmutables por separado, no todas a la vez.
 *
 * 🗺️ MAPA
 * TEORÍA · opcionales (?) y readonly por propiedad → drills 1–3
 *
 * ▸ 3 drills en orden. Prohibidos any y as X (salvo as const, si hiciera falta).
 * Usa ? para los opcionales, y readonly por propiedad cuando se pida.
 * pnpm test:run src/exercises/04-objetos/exercise-01.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — opcionales y readonly por propiedad
 *
 * DEFINICIÓN
 * El ? después del nombre marca una propiedad como opcional: su tipo real es, por
 * ejemplo, string | undefined (o tiene un string, o no existe). El readonly antes
 * del nombre marca solo esa propiedad como inmutable; las demás siguen siendo
 * mutables. Es la versión quirúrgica del as const, que congela todo de golpe.
 *
 * SINTAXIS
 * type User = {
 *   name: string;        // obligatoria
 *   nickname?: string;   // opcional: puede no existir
 *   readonly id: string; // existe siempre, no se puede mutar
 * };
 *
 * Ejemplos, con type Producto = { name: string; descuento?: number }:
 * const p1: Producto = { name: "Camiseta" } → ✅ sin descuento
 * p1.descuento.toFixed(2)                   → ❌ 'descuento' is possibly 'undefined'
 * p1.descuento?.toFixed(2)                  → ✅ optional chaining (lo verás más adelante)
 *
 * Ejemplos, con type Cuenta = { readonly id: string; balance: number }:
 * c.balance = 200 → ✅ balance es mutable
 * c.id = "XYZ"    → ❌ cannot assign to 'id' (readonly)
 *
 * 🧠 ANALOGÍA — un formulario de inscripción a un evento: nombre y email son
 * obligatorios, la empresa es opcional (puedes dejarla en blanco), y el número de
 * socio es readonly (te lo asigna el sistema, no lo tocas).
 *
 * 💡 Cuándo usar cada uno: propiedad? cuando puede no existir (filtros, configs con
 * defaults, datos parciales de un formulario); readonly propiedad cuando existe
 * siempre y no debe mutarse tras crearse (identificadores, fechas de creación,
 * claves de un registro). Combinadas, readonly nick?: string, también valen.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Define un tipo User con estas propiedades:
 *   - id: string, no se puede mutar después.
 *   - name: string, obligatoria, mutable.
 *   - email: string, obligatoria, mutable.
 *   - phone: string, opcional (puede no existir).
 *
 * Y exporta una constante juan: User con id="u-1", name="Juan",
 * email="juan@mail.com", sin phone.
 */
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

/* 2) Define un tipo Article con estas propiedades:
 *   - readonly slug: string
 *   - title: string
 *   - body: string
 *   - publishedAt: opcional, string ISO ("2026-05-27")
 *
 * Y una función publicar(article: Article, fechaIso: string) que
 * devuelva un nuevo Article con publishedAt asignado (no mutar el
 * original). Pista: usa spread { ...article, publishedAt: fechaIso }.
 */
export type Article = {
  readonly slug: string;
  title: string;
  body: string;
  publishedAt?: string;
};

export function publicar(article: Article, fechaIso: string) {
  return { ...article, publishedAt: fechaIso };
}

/* 3) Define un tipo Settings para configuración de UI con:
 *   - theme: "light" o "dark" (literal union)
 *   - language: opcional, string
 *   - readonly version: number
 *
 * Y exporta una constante defaultSettings: Settings con theme="light",
 * sin language, version=1.
 */
export type Settings = {
  theme: "light" | "dark";
  language?: string;
  readonly version: number;
};

export const defaultSettings: Settings = {
  theme: "light",
  version: 1,
};
