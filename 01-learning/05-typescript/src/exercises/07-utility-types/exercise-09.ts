/* =============================================================================
 * EJERCICIO 09 — utility types (6/?): Readonly<T> · bloque 07
 *
 * 🎯 OBJETIVOS
 * · Sellar un tipo entero con Readonly<T>: se lee, pero no se reasigna.
 * · Trabajar inmutable con un parámetro sellado: la salida es un objeto nuevo.
 *
 * 🟢 CONTEXTO — ya viste readonly y as const en 01-tipos-basicos, propiedad a
 * propiedad. Readonly<T> hace lo mismo, pero de golpe a todo un tipo: lo sella
 * entero. Es la herramienta de los tipos de solo lectura: configs, constantes y, lo
 * verás en FASE 2, las props de un componente React, que son Readonly por dentro.
 *
 * 🗺️ MAPA
 * TEORÍA · qué es Readonly<T> → base de todo el archivo
 * BLOQUE A · Readonly en el retorno: entregar algo sellado → drills 1–2
 * BLOQUE B · Readonly en el parámetro: «prometo que no lo toco» → drills 3–4
 * BLOQUE C · capstone: actualización inmutable de un objeto sellado → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/07-utility-types/exercise-09.test.ts
 * pnpm typecheck
 *
 * Cada starter va mal a propósito: typecheck y/o test en rojo. Corre el test tras
 * cada uno.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — qué es Readonly<T>
 *
 * DEFINICIÓN
 * Readonly<T> toma un tipo T y devuelve una copia con todas sus propiedades
 * marcadas como readonly: se pueden leer, pero no reasignar después de crear el
 * objeto.
 *
 * Ejemplos:
 * Readonly<Punto>  → { readonly x: number; readonly y: number }
 * p.x, con p de tipo Readonly<Punto>     → ✅ leer: OK
 * p.x = 9, con p de tipo Readonly<Punto> → ❌ «Cannot assign to 'x' because it is
 *                                          a read-only property»
 *
 * 🧠 ANALOGÍA — un documento plastificado: lo ves perfectamente, pero no puedes
 * escribir encima. Si quieres «cambiar» algo, haces uno nuevo con un spread,
 * { ...p, x: 9 }; no rayas el original.
 *
 * ⚠️ TRAMPA — es un muro de compilación, no de ejecución. Readonly desaparece al
 * compilar (type erasure): no congela el objeto de verdad (eso sería
 * Object.freeze), solo impide que tú escribas p.x = 9 en el editor. Por eso varios
 * de estos drills se ven rojos sobre todo en pnpm typecheck.
 *
 * ⚠️ TRAMPA — y es superficial (shallow): sella el primer nivel. Si una propiedad
 * es otro objeto, ese objeto interno no queda readonly. Hoy se trabaja con planos.
 *
 * 💡 Por dentro es un mapped type con el modificador readonly:
 * type Readonly<T> = { readonly [K in keyof T]: T[K] }
 * ───────────────────────────────────────────────────────────────────────────── */

type Config = { tema: string; idioma: string; fuente: number };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — Readonly en el retorno: entregar algo sellado
 *
 * La función devuelve una copia que quien la recibe no debe poder reasignar. El
 * rojo aquí es de tipo: el test intenta mutar el resultado, y eso debe fallar.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) congelarConfig — recibe una Config y la devuelve sellada (solo lectura).
 * Devuelve una copia nueva (spread), no el mismo objeto.
 * 👉 Dos arreglos: el tipo de retorno (ahora promete una Config mutable) y el
 *    cuerpo (ahora devuelve el mismo objeto en vez de una copia).
 *   congelarConfig({ tema: "claro", idioma: "es", fuente: 14 })
 *     → { tema: "claro", idioma: "es", fuente: 14 }  (pero ya no se puede reasignar)
 */
export function congelarConfig(c: Config): Readonly<Config> {
  return { tema: c.tema, idioma: c.idioma, fuente: c.fuente };
}

type Punto = { x: number; y: number };

/* 2) congelarPunto — refuerzo, otro tipo: devuelve el Punto sellado (copia).
 * congelarPunto({ x: 3, y: 4 }) → { x: 3, y: 4 }  (solo lectura)
 */
export function congelarPunto(p: Punto): Readonly<Punto> {
  return { x: p.x, y: p.y };
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — Readonly en el parámetro: «prometo que no lo toco»
 *
 * Marcar el parámetro como Readonly te obliga a trabajar inmutable: si intentas
 * p.x = … dentro, el compilador te frena. La salida es un objeto nuevo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) moverDerecha — recibe un Punto que no debe mutar y devuelve uno nuevo con
 * x aumentado en 1.
 * 👉 Dos arreglos: el tipo del parámetro (ahora es mutable y el starter lo
 *    muta con p.x = ...) y el cuerpo (debe devolver un objeto nuevo por
 *    spread, sin tocar el original).
 *   moverDerecha({ x: 0, y: 0 }) → { x: 1, y: 0 }  (y el original sigue { x: 0, y: 0 })
 */
export function moverDerecha(p: Readonly<Punto>): Punto {
  return { ...p, x: p.x + 1 };
}
moverDerecha({ x: 0, y: 0 }); // → { x: 1, y: 0 }
moverDerecha({ x: 5, y: 5 }); // → { x: 6, y: 5 }

type Caja = { ancho: number; alto: number };

/* 4) escalar — refuerzo: recibe una Caja que no debe mutar y un factor;
 * devuelve una caja nueva con ambas medidas multiplicadas.
 *   escalar({ ancho: 2, alto: 3 }, 10) → { ancho: 20, alto: 30 }
 */
export function escalar(c: Readonly<Caja>, factor: number): Caja {
  return { ...c, ancho: c.ancho * factor, alto: c.alto * factor };
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — capstone: actualización inmutable de un objeto sellado
 *
 * Recibes una base sellada (Readonly) y devuelves una copia sellada con un campo
 * cambiado. No puedes tocar la base: tienes que crear otra (spread + pisar).
 * ───────────────────────────────────────────────────────────────────────────── */

// type Config = { tema: string; idioma: string; fuente: number }

/* 5) cambiarTema — recibe una Config sellada y un tema nuevo; devuelve una
 * Config nueva (también sellada) con el tema cambiado y el resto igual.
 * 👉 Arreglos: tipo del parámetro (sellado), tipo de retorno (sellado) y el
 *    cuerpo (el starter muta la base; usa spread).
 *   cambiarTema({ tema: "claro", idioma: "es", fuente: 14 }, "oscuro")
 *     → { tema: "oscuro", idioma: "es", fuente: 14 }
 */
export function cambiarTema(base: Readonly<Config>, tema: string): Readonly<Config> {
  return { ...base, tema: tema, idioma: base.idioma, fuente: base.fuente };
}
cambiarTema({ tema: "claro", idioma: "es", fuente: 14 }, "oscuro"); // → { tema: "oscuro", idioma: "es", fuente: 14 } inmutable
