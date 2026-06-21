/* =============================================================================
 * EJERCICIO 07 — tipos básicos (7/?): `typeof` como OPERADOR DE TIPO
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * A veces ya tienes un VALOR que es la "fuente de la verdad" (un objeto de
 * config, unos defaults) y quieres un TIPO con esa misma forma. Escribirlo a mano
 * lo duplica: el día que cambias el objeto, el tipo se queda viejo. `typeof`
 * (en posición de tipo) DERIVA el tipo del valor, y se mantiene solo.
 *
 *
 * ▸ EXPLICACIÓN — los DOS `typeof`
 * ----------------------------------------------------------------------------
 * Es la misma palabra en dos mundos distintos:
 *
 *   - `typeof x === "string"`   → el `typeof` de JS (runtime): devuelve un STRING
 *                                 con el nombre del tipo. Lo usaste para estrechar.
 *   - `type T = typeof x`       → el `typeof` de TS (en posición de TIPO): toma el
 *                                 valor `x` y te da SU TIPO.
 *
 *     const CONFIG = { host: "localhost", port: 3000 }
 *     type Config = typeof CONFIG     // { host: string; port: number }
 *
 * 🧠 ANALOGÍA: un molde sacado de la pieza. En vez de tallar el molde a mano
 *    (y rezar para que case), lo SACAS de la pieza original. Si la pieza cambia,
 *    vuelves a sacar el molde y encaja perfecto.
 *
 * 🔧 POR DENTRO: `typeof valor` solo funciona sobre VALORES (const, function...),
 *    no sobre tipos. El tipo derivado es EXACTAMENTE la forma del valor: ni un
 *    campo de más (no puedes inventar `protocolo` si no está en el objeto) ni de
 *    menos.
 *
 * 💼 CASO REAL: `const DEFAULTS = {...}; type Settings = typeof DEFAULTS`. Tu
 *    función de configuración acepta `Settings` y nunca se desincroniza de los
 *    defaults reales.
 *
 * OJO — sobre un `const` con objeto, `typeof` ENSANCHA (`port: number`, no `3000`).
 *    Si quisieras conservar los literales exactos, se combina con `as const`
 *    (eso es justo el ejercicio 08).
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * El hueco principal de cada bloque es el `type ... = typeof ...`. Los starters
 * tienen el tipo ESCRITO A MANO e incompleto → en cuanto el cuerpo necesita un
 * campo que falta, salta el rojo. Corre el test tras cada uno:
 *     pnpm test:run src/exercises/01-tipos-basicos/exercise-07.test.ts
 * ===========================================================================*/


const CONFIG_BASE = { host: "localhost", port: 3000, https: false }

// 👉 Hueco clave del BLOQUE A/C: deriva el tipo del valor de arriba en vez de
//    escribirlo a mano. El starter solo declara `{ host: string }`.
type Config = { host: string }

/* ---------------------------------------------------------------------------
 * BLOQUE A — usar el tipo derivado como PARÁMETRO
 * ---------------------------------------------------------------------------
 * En cuanto el cuerpo lee `c.port`, un `Config` incompleto no compila: te empuja
 * a derivarlo bien.
 * -------------------------------------------------------------------------- */

// 1) `describirConfig` — "host:puerto".
//    👉 Arregla `type Config` (arriba) con `typeof` y completa el cuerpo (el
//       starter solo devuelve el host).
//      describirConfig({ host: "localhost", port: 3000, https: false }) → "localhost:3000"
export function describirConfig(c: Config): string {
  return ""
}


const PERFIL_BASE = { usuario: "ana", nivel: 7 }

// 👉 Mismo hueco para el BLOQUE A (drill 2): deriva en vez de escribir a mano.
type Perfil = { usuario: string }

// 2) `resumenPerfil` — "usuario (nivel N)".
//      resumenPerfil({ usuario: "ana", nivel: 7 }) → "ana (nivel 7)"
export function resumenPerfil(p: Perfil): string {
  return ""
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — usar el tipo derivado como RETORNO (te obliga a no dejarte campos)
 * ---------------------------------------------------------------------------
 * Si prometes devolver `Config`, tienes que construir el objeto COMPLETO. Un
 * objeto a medias no cuela.
 * -------------------------------------------------------------------------- */

// 3) `configPorDefecto` — construye la config inicial completa.
//    👉 El starter devuelve `{ host }` a secas; con el tipo bien derivado, eso ya
//       ni compila (faltan port y https).
//      configPorDefecto() → { host: "localhost", port: 3000, https: false }
export function configPorDefecto(): Config {
  return {}
}

// 4) `perfilPorDefecto` — refuerzo con el otro tipo derivado.
//      perfilPorDefecto() → { usuario: "invitado", nivel: 0 }
export function perfilPorDefecto(): Perfil {
  return {}
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: recibir y devolver el mismo tipo derivado (copia + pisa)
 * ---------------------------------------------------------------------------
 * Entra un `Config`, sale un `Config` nuevo con el puerto cambiado. Spread para
 * copiar, sin mutar el original.
 * -------------------------------------------------------------------------- */

// 5) `conPuerto` — copia la config cambiando solo el puerto.
//      conPuerto({ host: "localhost", port: 3000, https: false }, 8080)
//        → { host: "localhost", port: 8080, https: false }
export function conPuerto(c: Config, port: number): Config {
  return {}
}
