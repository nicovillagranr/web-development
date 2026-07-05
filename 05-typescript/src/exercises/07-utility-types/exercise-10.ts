/* =============================================================================
 * EJERCICIO 10 — utility types (7/?): `Required<T>`
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * `Partial<T>` AFLOJA: pone un `?` en cada propiedad (todas opcionales).
 * `Required<T>` es su ESPEJO exacto: QUITA el `?` de todas (todas obligatorias).
 * Es la herramienta del momento "ya no es un borrador, ahora va en serio": un
 * objeto que se llenaba a trozos y que, antes de publicarse/guardarse, debe estar
 * COMPLETO.
 *
 *
 * ▸ EXPLICACIÓN — qué es `Required<T>`
 * ----------------------------------------------------------------------------
 * `Required<T>` toma un tipo `T` y devuelve una copia con TODAS sus propiedades
 * OBLIGATORIAS (les arranca el `?`).
 *
 *     type Borrador   = { titulo?: string; cuerpo?: string; autor?: string }
 *     type Publicable = Required<Borrador>
 *     //   resultado:    { titulo: string; cuerpo: string; autor: string }
 *     //                    ▲ ya no hay ningún `?`: los tres son obligatorios
 *
 * 🧠 ANALOGÍA: un formulario en dos fases. Mientras es BORRADOR puedes dejar
 *    campos en blanco (`Partial`). Pero el botón "PUBLICAR" exige que estén TODOS
 *    rellenos (`Required`): si falta uno, no te deja enviar.
 *
 * 🔧 POR DENTRO (mapped type con el modificador `-?`, que RESTA la opcionalidad):
 *        type Required<T> = { [K in keyof T]-?: T[K] }
 *    Compáralo con `Partial<T> = { [K in keyof T]?: T[K] }`. El `?` añade
 *    opcionalidad; el `-?` la quita. Son la misma maquinaria al revés.
 *
 * 💼 CASO REAL: validar antes de guardar. Recoges datos parciales de un
 *    formulario (`Partial`), los completas con defaults, y la función que
 *    finalmente persiste exige `Required<...>`: el tipo te GARANTIZA que ningún
 *    campo viene `undefined`, así que dentro NO necesitas `?.` ni `??`.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Cada starter va MAL a propósito → typecheck y/o test ROJOS. Corre el test tras
 * cada uno:
 *     pnpm test:run src/exercises/07-utility-types/exercise-10.test.ts
 * ===========================================================================*/


type Borrador = { titulo?: string; cuerpo?: string; autor?: string }

/* ---------------------------------------------------------------------------
 * BLOQUE A — `Required` en el PARÁMETRO: exigir el objeto COMPLETO
 * ---------------------------------------------------------------------------
 * Con `Required` en la puerta, quien llama está OBLIGADo a traer todos los
 * campos; y dentro tú trabajas tranquilo porque ninguno puede ser `undefined`.
 * -------------------------------------------------------------------------- */

// 1) `publicar` — recibe un borrador que YA debe estar completo y devuelve el
//    texto publicado.
//    👉 Dos arreglos: el tipo del parámetro (ahora acepta campos opcionales, así
//       que el test podría colar un borrador a medias) y el cuerpo (devuelve "").
//      publicar({ titulo: "Hola", cuerpo: "texto", autor: "Ana" }) → "Hola por Ana"
export function publicar(b: Required<Borrador>): string {
  return `${b.titulo} por ${b.autor}`
}
publicar({ titulo: 'Hola', cuerpo: 'texto', autor: 'Ana' }) // return: "Hola por Ana"

type Pedido = { producto?: string; cantidad?: number }

// 2) `confirmar` — refuerzo: recibe un pedido COMPLETO y devuelve el resumen.
//      confirmar({ producto: "Té", cantidad: 3 }) → "3x Té"
export function confirmar(p: Required<Pedido>): string {
  return `${p.cantidad}x ${p.producto}`
}
confirmar({ producto: 'Té', cantidad: 3 }) // return: "3x Té"


/* ---------------------------------------------------------------------------
 * BLOQUE B — `Required` en el RETORNO: prometer que sale COMPLETO
 * ---------------------------------------------------------------------------
 * La función construye y devuelve un objeto con TODAS las propiedades. El tipo de
 * retorno `Required<...>` te obliga a no dejarte ninguna.
 * -------------------------------------------------------------------------- */

// 3) `crearBorrador` — recibe los tres campos sueltos y devuelve un borrador
//    COMPLETO (ya publicable).
//    👉 Dos arreglos: el tipo de retorno (ahora permite huecos) y el cuerpo (el
//       starter se deja `cuerpo` y `autor`).
//      crearBorrador("Hola", "texto", "Ana")
//        → { titulo: "Hola", cuerpo: "texto", autor: "Ana" }
export function crearBorrador(titulo: string, cuerpo: string, autor: string): Required<Borrador> {
  return { titulo, cuerpo, autor }
}

// 4) `crearPedido` — refuerzo: devuelve un pedido COMPLETO.
//      crearPedido("Té", 3) → { producto: "Té", cantidad: 3 }
export function crearPedido(producto: string, cantidad: number): Required<Pedido> {
  return { producto, cantidad }
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: de borrador a medias → completo (Partial-ish + defaults)
 * ---------------------------------------------------------------------------
 * Aquí se juntan las dos caras: ENTRA un borrador con huecos; unos `defaults`
 * COMPLETOS (Required) rellenan lo que falte; y SALE algo COMPLETO (Required).
 * Reaparece tu `??`: cada campo es "el del borrador, o si falta, el default".
 * -------------------------------------------------------------------------- */

// 5) `completar` — recibe un `borrador` con posibles huecos y unos `defaults`
//    completos; devuelve un borrador COMPLETO usando el valor del borrador cuando
//    está, y el default cuando falta.
//    👉 Arreglos: el tipo de `defaults` (debe estar completo), el tipo de retorno
//       (completo) y el cuerpo (el starter ignora el borrador y devuelve los
//       defaults tal cual). Pista: `borrador.titulo ?? defaults.titulo`, etc.
//      completar({ titulo: "Mío" }, { titulo: "X", cuerpo: "C", autor: "A" })
//        → { titulo: "Mío", cuerpo: "C", autor: "A" }
export function completar(borrador: Borrador, defaults: Required<Borrador>): Required<Borrador> {
  return { titulo: borrador.titulo ?? defaults.titulo, cuerpo: borrador.cuerpo ?? defaults.cuerpo, autor: borrador.autor ?? defaults.autor }
}
