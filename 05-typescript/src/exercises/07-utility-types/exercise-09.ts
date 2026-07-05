/* =============================================================================
 * EJERCICIO 09 — utility types (6/?): `Readonly<T>`
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Ya viste `readonly` y `as const` en 01-tipos-basicos, propiedad a propiedad.
 * `Readonly<T>` hace lo mismo pero de golpe a TODO un tipo: lo sella entero.
 * Es la herramienta de los tipos "solo lectura" (configs, constantes, y — verás
 * en FASE 2 — las props de un componente React, que son Readonly por dentro).
 *
 *
 * ▸ EXPLICACIÓN — qué es `Readonly<T>`
 * ----------------------------------------------------------------------------
 * `Readonly<T>` toma un tipo `T` y devuelve una copia con TODAS sus propiedades
 * marcadas como `readonly`: se pueden LEER, pero no REASIGNAR después de crear
 * el objeto.
 *
 *     type Punto      = { x: number; y: number }
 *     type PuntoFijo  = Readonly<Punto>
 *     //   resultado:    { readonly x: number; readonly y: number }
 *
 *     const p: Readonly<Punto> = { x: 1, y: 2 }
 *     p.x          // ✅ leer: OK
 *     p.x = 9      // ❌ error: "Cannot assign to 'x' because it is read-only"
 *
 * 🧠 ANALOGÍA: un documento PLASTIFICADO. Lo ves perfectamente, pero no puedes
 *    escribir encima. Si quieres "cambiar" algo, haces uno NUEVO (un spread:
 *    `{ ...p, x: 9 }`), no rayas el original.
 *
 * 🔧 POR DENTRO (mapped type con el modificador `readonly`):
 *        type Readonly<T> = { readonly [K in keyof T]: T[K] }
 *
 * ⚠️ OJO — es un muro de COMPILACIÓN, no de runtime. `Readonly` desaparece al
 *    compilar (type erasure): no "congela" el objeto de verdad (eso sería
 *    `Object.freeze`). Solo impide que TÚ escribas `p.x = 9` en el editor. Por
 *    eso varios de estos drills se ven ROJOS sobre todo en `pnpm typecheck`.
 *
 * ⚠️ Y es SUPERFICIAL (shallow): sella el primer nivel. Si una propiedad es otro
 *    objeto, ese objeto interno NO queda readonly. (Para hoy trabajamos planos.)
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Cada starter va MAL a propósito → typecheck y/o test ROJOS. Corre el test tras
 * cada uno:
 *     pnpm test:run src/exercises/07-utility-types/exercise-09.test.ts
 * ===========================================================================*/


type Config = { tema: string; idioma: string; fuente: number }

/* ---------------------------------------------------------------------------
 * BLOQUE A — `Readonly` en el RETORNO: entregar algo sellado
 * ---------------------------------------------------------------------------
 * La función devuelve una copia que quien la recibe NO debe poder reasignar.
 * El rojo aquí es de TIPO: el test intenta mutar el resultado y eso DEBE fallar.
 * -------------------------------------------------------------------------- */

// 1) `congelarConfig` — recibe una Config y la devuelve SELLADA (solo lectura).
//    Devuelve una COPIA nueva (spread), no el mismo objeto.
//    👉 Dos arreglos: el tipo de retorno (ahora promete una Config mutable) y el
//       cuerpo (ahora devuelve el MISMO objeto en vez de una copia).
//      congelarConfig({ tema: "claro", idioma: "es", fuente: 14 })
//        → { tema: "claro", idioma: "es", fuente: 14 }  (pero ya no se puede reasignar)
export function congelarConfig(c: Config): Readonly<Config> {
  return { tema: c.tema, idioma: c.idioma, fuente: c.fuente }
}

type Punto = { x: number; y: number }

// 2) `congelarPunto` — refuerzo, otro tipo: devuelve el Punto sellado (copia).
//      congelarPunto({ x: 3, y: 4 }) → { x: 3, y: 4 }  (solo lectura)
export function congelarPunto(p: Punto): Readonly<Punto> {
  return { x: p.x, y: p.y }
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — `Readonly` en el PARÁMETRO: "prometo que NO lo toco"
 * ---------------------------------------------------------------------------
 * Marcar el parámetro como Readonly te OBLIGA a trabajar inmutable: si intentas
 * `p.x = ...` dentro, el compilador te frena. La salida es un objeto NUEVO.
 * -------------------------------------------------------------------------- */

// 3) `moverDerecha` — recibe un Punto que NO debe mutar y devuelve uno nuevo con
//    `x` aumentado en 1.
//    👉 Dos arreglos: el tipo del parámetro (ahora es mutable y el starter lo
//       MUTA con `p.x = ...`) y el cuerpo (debe devolver un objeto NUEVO por
//       spread, sin tocar el original).
//      moverDerecha({ x: 0, y: 0 }) → { x: 1, y: 0 }  (y el original sigue { x: 0, y: 0 })
export function moverDerecha(p: Readonly<Punto>): Punto {
  return { ...p, x: p.x + 1 }
}
moverDerecha({ x: 0, y: 0 }) // → { x: 1, y: 0 }
moverDerecha({ x: 5, y: 5 }) // → { x: 6, y: 5 }

type Caja = { ancho: number; alto: number }

// 4) `escalar` — refuerzo: recibe una Caja que NO debe mutar y un `factor`;
//    devuelve una caja NUEVA con ambas medidas multiplicadas.
//      escalar({ ancho: 2, alto: 3 }, 10) → { ancho: 20, alto: 30 }
export function escalar(c: Readonly<Caja>, factor: number): Caja {
  return { ...c, ancho: c.ancho * factor, alto: c.alto * factor }
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: actualización inmutable de un objeto sellado
 * ---------------------------------------------------------------------------
 * Recibes una base SELLADA (Readonly) y devuelves una copia SELLADA con un campo
 * cambiado. No puedes tocar la base: tienes que crear otra (spread + pisar).
 * -------------------------------------------------------------------------- */

// type Config = { tema: string; idioma: string; fuente: number }

// 5) `cambiarTema` — recibe una Config sellada y un `tema` nuevo; devuelve una
//    Config NUEVA (también sellada) con el tema cambiado y el resto igual.
//    👉 Arreglos: tipo del parámetro (sellado), tipo de retorno (sellado) y el
//       cuerpo (el starter muta la base; usa spread).
//      cambiarTema({ tema: "claro", idioma: "es", fuente: 14 }, "oscuro")
//        → { tema: "oscuro", idioma: "es", fuente: 14 }
export function cambiarTema(base: Readonly<Config>, tema: string): Readonly<Config> {
  return { ...base, tema: tema, idioma: base.idioma, fuente: base.fuente }
}
cambiarTema({ tema: 'claro', idioma: 'es', fuente: 14 }, 'oscuro') // → { tema: "oscuro", idioma: "es", fuente: 14 } inmutable
