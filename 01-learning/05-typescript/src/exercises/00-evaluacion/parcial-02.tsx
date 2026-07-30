/* eslint-disable react-refresh/only-export-components --
 * Este archivo exporta tipos y funciones normales además del componente de la
 * PARTE F. La regla existe por el hot-reload de Vite y aquí no aplica.
 *
 * (El `@typescript-eslint/no-unused-vars` que acompañaba a esta línea era
 *  andamiaje del examen —los cuerpos sin responder no usaban sus parámetros— y
 *  se retiró al corregirlo: ya no hace falta.) */

/* =============================================================================
 * PARCIAL 02 — Consolidación FASE 1 + props   ·   12 ítems
 * =============================================================================
 *
 * CÓMO RESPONDER (cada ítem tiene UN solo hueco):
 *   • Tipos  → reemplaza `SIN_RESPONDER` por el tipo correcto.
 *   • Elegir → reemplaza el texto por la letra: "a", "b" o "c".
 *   • Código → completa el cuerpo o la firma donde dice "// completa aquí".
 *   • Donde diga "Por qué:", escribe tu razonamiento en el comentario.
 *
 * 👉 El ítem A1 ya está RESUELTO como ejemplo. Los demás, en blanco. En orden.
 *
 * Reglas: ❌ nada de `any`, ❌ nada de `as X` (salvo `as const` donde se indique).
 * No abras `parcial-02.test.tsx`: tiene las respuestas. Cuando termines, te corrijo.
 *
 * Qué se mide y de dónde sale:
 *   A → inferencia y lectura de tipos      (01-tipos-basicos · 07-utility-types)
 *   B → objetos e inmutabilidad            (04-objetos)
 *   C → funciones de orden superior        (02-funciones · 03-arrays)
 *   D → genéricos y utility types          (06-generics-basicos · 07-utility-types)
 *   E → uniones discriminadas y narrowing  (05-unions-narrowing · 08-discriminated-unions)
 *   F → props de un componente             (09-react-props)
 * ===========================================================================*/

import type { ReactNode } from "react";

/** Marcador de hueco sin responder. Reemplázalo por tu respuesta.
 *  Mientras quede algún `SIN_RESPONDER`, el ítem cuenta como no hecho.
 *  🧹 Al acabar, comenta esta línea: si el archivo sigue compilando, no te
 *     quedaba ninguno. */
// type SIN_RESPONDER = "";

/* ─────────────────────────────────────────────────────────────────────────────
 * PARTE A — ¿Qué tipo hay aquí? (no se ejecuta nada, solo predices)
 * ───────────────────────────────────────────────────────────────────────────*/

// A1) ¿Qué tipo da `(typeof ROLES)[number]`?   ◄── EJEMPLO YA RESUELTO
export const ROLES = ["admin", "editor", "lector"] as const;
export type A1 = "admin" | "editor" | "lector";
// Por qué: `as const` congela el array y guarda cada elemento como su literal en
//   vez de ensancharlo a `string`. `[number]` significa "el tipo de un elemento
//   cualquiera", así que el resultado es la UNIÓN de los tres literales.

// A2) ¿Qué tipo tiene `validadores[0]`?  (el repo usa `noUncheckedIndexedAccess`)
//     Ojo a las DOS cosas que hay que juntar aquí.
export const validadores: Array<(t: string) => boolean> = [(t) => t.length > 0, (t) => t.trim() === t,];
export type A2 = ((t: string) => boolean) | undefined;
// Por qué: `validadores` está declarado como `Array<(t: string) => boolean>`, o sea
//   un array cuyos elementos son funciones que reciben un string y devuelven un
//   booleano. `[0]` saca UNO de esos elementos, así que lo que queda en la mano es
//   la función, no su resultado: el booleano solo aparecería al llamarla.
//   Y lleva `| undefined` porque con `noUncheckedIndexedAccess` TS no da por hecho
//   que la posición 0 exista — el array podría estar vacío. Los paréntesis son
//   obligatorios: sin ellos, el `| undefined` se pegaría al valor de retorno en vez
//   de a la función entera.


// A3) ¿Qué tipo tiene `Partial<typeof PERFIL>["edad"]`?
export const PERFIL = { nombre: "Nico", edad: 23, activo: true };
export type A3 = number | undefined;
// Por qué: En el nuevo objeto que se crea se extrae el tipo de la propiedad `edad` y esta con el Partial quedará como un tipo number, pero será opcional, no obligatoria
//   Y el `["edad"]` del final saca esa propiedad FUERA del objeto: lo que queda en la
//   mano no es un objeto, es el tipo de la propiedad a solas. Al salir sola ya no hay
//   dónde poner el `?` —el `?` necesita un objeto donde vivir—, así que "opcional" se
//   reescribe de la única forma posible: `number | undefined`.

/* ─────────────────────────────────────────────────────────────────────────────
 * PARTE B — Objetos e inmutabilidad
 * ───────────────────────────────────────────────────────────────────────────*/

export type Producto = { id: number; nombre: string; precio: number };

// B1) Devuelve una COPIA del producto con el precio rebajado un `pct` por
//     ciento, sin tocar el original. Anota tú el tipo de retorno.
//       rebajar({ id: 1, nombre: "Té", precio: 100 }, 25) -> { id: 1, nombre: "Té", precio: 75 }
export function rebajar(p: Producto, pct: number) {
  return { ...p, precio: p.precio * (1 - pct / 100) };
}
rebajar({ id: 1, nombre: "Coca Cola", precio: 100 }, 25) // { id: 1, nombre: "Coca Cola", precio: 75 }

// B2) ¿Cuál de estas tres líneas MUTA el objeto original? Pon la letra.
//     (a)  const copia = { ...p, precio: 0 }
//     (b)  const copia = p;  copia.precio = 0
//     (c)  const copia = Object.assign({}, p, { precio: 0 })
export const B2 = "b";
// Por qué esa muta y las otras dos no:
//   (b) MUTA. `const copia = p` no fabrica un objeto: copia la REFERENCIA, o sea la
//       dirección donde vive. Después de esa línea hay dos nombres para un único
//       objeto, así que `copia.precio = 0` escribe en `p`. Se comprueba con
//       `copia === p`, que da `true`: `===` compara identidad, no contenido.
//   (a) NO muta. El spread construye un objeto NUEVO copiándole los valores de `p`;
//       el `precio: 0` de después pisa la copia, nunca el original.
//   (c) NO muta, pero no por mérito de `Object.assign`: esa función ESCRIBE dentro de
//       su primer argumento y lo devuelve. Aquí es inofensiva porque el destino es un
//       `{}` recién creado. Con `Object.assign(p, { precio: 0 })` mutaría como (b).

/* ─────────────────────────────────────────────────────────────────────────────
 * PARTE C — Funciones de orden superior
 * ───────────────────────────────────────────────────────────────────────────*/

export type Empleado = { nombre: string; salario: number; activo: boolean };

// C1) Devuelve los NOMBRES de los empleados que estén activos Y cobren `minimo`
//     o más. Escribe también el tipo de retorno.
//       nombresBienPagados([...], 2000) → ["Ana", "Luis"]
export function nombresBienPagados(emps: Empleado[], minimo: number): string[] {
  return emps.filter(e => e.activo && e.salario >= minimo).map(e => e.nombre);
}

// C2) `unirRutas` recibe CUALQUIER cantidad de trozos de ruta —argumentos
//     sueltos, NO un array— y los une con "/". Completa la firma y el cuerpo.
//       unirRutas("api", "v1", "users") → "api/v1/users"
//       unirRutas("solo") → "solo"
export function unirRutas(...trozos: string[]): string {
  return trozos.join('/');
}
unirRutas('api', 'v1', 'users') // -> "api/v1/users"
unirRutas('solo') // -> "solo"
unirRutas("") // -> ""


// C3) `creaEtiquetador` devuelve una FUNCIÓN que pega el prefijo capturado a lo
//     que reciba. Anota el tipo de retorno (que es una función).
//       const conHash = creaEtiquetador("#");   conHash("ts") → "#ts"
export function creaEtiquetador(prefijo: string): (etiqueta: string) => string {
  return (etiqueta: string) => `${prefijo}${etiqueta}`
}
const conHashtag = creaEtiquetador('#');
conHashtag('ts')
/* ─────────────────────────────────────────────────────────────────────────────
* PARTE D — Genéricos y utility types
* ───────────────────────────────────────────────────────────────────────────*/

// D1) `porDefecto` devuelve el valor si existe y, si no, el de reserva. Hoy solo
//     sirve para strings: generalízalo para que funcione con CUALQUIER tipo,
//     manteniendo que los dos argumentos sean del MISMO tipo y que el retorno
//     nunca sea `undefined`. Arregla SOLO la firma, no el cuerpo.
//       porDefecto(undefined, "vacío") → "vacío" (string)
//       porDefecto(5, 0) → 5 (number)
export function porDefecto<T>(valor: T | undefined, reserva: T): T {
  return valor ?? reserva
}
// porDefecto("Hola", 10) // No pasa porque "Hola" define el <T> como string


// Sondas del D2 (ya usadas, se quedan comentadas como registro):
// type Usuario = { id: number; nombre: string; email: string; }
// type X = Pick<Usuario, "emial">
// type X = Omit<Usuario, "emial">
// type X = Partial<Usuario>["emial"]

// D2) Sobre `type Usuario = { id: number; nombre: string; email: string }`,
//     ¿cuál de estas tres líneas COMPILA sin protestar y aun así no hace lo que
//     parece? Pon la letra.
//     (a)  type X = Pick<Usuario, "emial">
//     (b)  type X = Omit<Usuario, "emial">
//     (c)  type X = Partial<Usuario>["emial"]
export const D2 = "b";
// Por qué esa pasa el filtro y qué acaba valiendo `X`:  ⚠️ mitad 🅰 escrita por el coach
//   🅰 POR QUÉ ENTRA. La respuesta está en la FIRMA de cada uno (F12 sobre ellos, viven
//      en `lib.es5.d.ts`). Fíjate solo en lo que va después de cada `extends`:
//        type Pick<T, K extends keyof T>    ← a K se le exige ser una llave REAL de T
//        type Omit<T, K extends keyof any>  ← a K solo se le exige ser string|number|symbol
//      Por eso (a) revienta: "emial" no está en el menú de llaves de Usuario. Y (b) pasa:
//      a `Omit` le basta con que le des UN STRING cualquiera, no comprueba que exista.
//      (c) también revienta, por lo mismo: "emial" no es una propiedad de Partial<Usuario>.
//   🅱 QUÉ VALE X. Una vez dentro, `Omit` se construye con Pick + Exclude:
//        Omit<T,K> = Pick<T, Exclude<keyof T, K>>
//      y `Exclude<"id" | "nombre" | "email", "emial">` no quita NADA, porque estaría
//      omitiendo una propiedad que no existe. Así que el Pick se lleva las TRES llaves
//      y el TIPO resultante es idéntico a `Usuario`, sin cambios.
//      Ojo al vocabulario: `X` no es un objeto, es un TIPO — ahí no se obtiene nada,
//      esa línea se borra al compilar y en runtime no queda rastro de ella.




/* ─────────────────────────────────────────────────────────────────────────────
 * PARTE E — Uniones discriminadas
 * ───────────────────────────────────────────────────────────────────────────*/

export type Peticion =
  | { fase: "cargando" }
  | { fase: "listo"; datos: string[] }
  | { fase: "error"; mensaje: string };

// E1) Devuelve un texto según la fase:
//       cargando → "cargando…"
//       listo    → la cantidad de datos y la palabra "elementos": "3 elementos"
//       error    → el propio `mensaje`
//     Cierra con la guardia de exhaustividad (`never`), para que el día que se
//     añada una fase y no la manejes, salte en compilación y no en producción.
export function describir(p: Peticion): string {
  switch (p.fase) {
    case "cargando":
      return "cargando…";
    case "listo":
      return `${p.datos.length} elementos`;
    case "error":
      return p.mensaje;
    default: {
      const _exhaustiveCheck: never = p;
      return _exhaustiveCheck;
    }
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * PARTE F — Props de un componente
 * ───────────────────────────────────────────────────────────────────────────*/

// F1) Define `TarjetaProps` y tipa el componente con ella:
//       · `titulo`    string, obligatoria
//       · `insignia`  string, OPCIONAL
//       · `children`  cualquier cosa que React sepa pintar
//     `Tarjeta` retorna un <article> con:
//       · el `titulo` dentro de un <h3>
//       · la `insignia` dentro de un <span>, y SOLO si viene
//       · los `children` detrás
export type TarjetaProps = {
  titulo: string,
  insignia?: string,
  children: ReactNode
}
export function Tarjeta({ titulo, insignia, children }: TarjetaProps) {
  return (
    <article>
      <h3>{titulo}</h3>
      {insignia && <span>{insignia}</span>}
      {children}
    </article>
  )
}
