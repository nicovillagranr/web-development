/* =============================================================================
 * EJERCICIO 07 — tipos básicos (7/?): typeof como operador de tipo · bloque 01
 *
 * 🎯 OBJETIVOS
 * · Derivar un tipo de un valor con typeof, en vez de escribirlo a mano.
 * · Usar el tipo derivado como parámetro y como retorno.
 *
 * 🟢 CONTEXTO — a veces ya tienes un valor que es la «fuente de la verdad» (un
 * objeto de config, unos defaults) y quieres un tipo con esa misma forma.
 * Escribirlo a mano lo duplica: el día que cambias el objeto, el tipo se queda
 * viejo. typeof, en posición de tipo, deriva el tipo del valor, y se mantiene solo.
 *
 * 🗺️ MAPA
 * TEORÍA · los dos typeof → base de todo el archivo
 * BLOQUE A · el tipo derivado como parámetro → drills 1–2
 * BLOQUE B · el tipo derivado como retorno → drills 3–4
 * BLOQUE C · capstone: recibir y devolver el mismo tipo derivado → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/01-tipos-basicos/exercise-07.test.ts
 * pnpm typecheck
 *
 * El hueco principal de cada bloque es el type … = typeof …. Los starters tienen el
 * tipo escrito a mano e incompleto: en cuanto el cuerpo necesita un campo que
 * falta, salta el rojo.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — los dos typeof
 *
 * DEFINICIÓN
 * Es la misma palabra en dos mundos distintos. typeof x === "string" es el typeof
 * de JS (en ejecución): devuelve un string con el nombre del tipo, y lo usaste para
 * estrechar. type T = typeof x es el typeof de TS (en posición de tipo): toma el
 * valor x y te da su tipo.
 *
 * SINTAXIS
 * const CONFIG = { host: "localhost", port: 3000 }
 * type Config = typeof CONFIG // { host: string; port: number }
 *
 * 🧠 ANALOGÍA — un molde sacado de la pieza: en vez de tallar el molde a mano (y
 * rezar para que case), lo sacas de la pieza original. Si la pieza cambia, vuelves
 * a sacar el molde, y encaja perfecto.
 *
 * ⚠️ TRAMPA — sobre un const con objeto, typeof ensancha (port: number, no 3000).
 * Para conservar los literales exactos se combina con as const: eso es justo el
 * ejercicio 08.
 *
 * 💡 Por dentro, typeof valor solo funciona sobre valores (const, function…), no
 * sobre tipos, y el tipo derivado es exactamente la forma del valor: ni un campo de
 * más (no puedes inventar protocolo si no está en el objeto) ni de menos.
 *
 * 💡 Caso real: const DEFAULTS = {…}; type Settings = typeof DEFAULTS. Tu función
 * de configuración acepta Settings, y nunca se desincroniza de los defaults reales.
 * ───────────────────────────────────────────────────────────────────────────── */

const CONFIG_BASE = { host: "localhost", port: 3000, https: false };

/* 👉 Hueco clave del bloque A/C: deriva el tipo del valor de arriba en vez de
 * escribirlo a mano. El starter solo declara { host: string }. */
type Config = typeof CONFIG_BASE;

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — usar el tipo derivado como parámetro
 *
 * En cuanto el cuerpo lee c.port, un Config incompleto no compila: te empuja a
 * derivarlo bien.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) describirConfig — "host:puerto".
 * 👉 Arregla type Config (arriba) con typeof y completa el cuerpo (el
 *    starter solo devuelve el host).
 *   describirConfig({ host: "localhost", port: 3000, https: false }) → "localhost:3000"
 */
export function describirConfig(c: Config): string {
  return `${c.host}:${c.port}`;
}

/* 🧹 Lint: PERFIL_BASE es solo fuente del tipo (nadie usa su valor, a diferencia
 * de CONFIG_BASE, que además se esparce en el drill 3). ESLint no cuenta los usos
 * en posición de tipo como uso del valor, así que lo marca como «sin usar». No es
 * un bug: el valor existe a propósito, es la única fuente de la verdad. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- se consume como tipo con `typeof PERFIL_BASE`
const PERFIL_BASE = { usuario: "ana", nivel: 7 };

/* 👉 Mismo hueco para el bloque A (drill 2): deriva en vez de escribir a mano. */
type Perfil = typeof PERFIL_BASE;

/* 2) resumenPerfil — "usuario (nivel N)".
 * resumenPerfil({ usuario: "ana", nivel: 7 }) → "ana (nivel 7)"
 */
export function resumenPerfil(p: Perfil): string {
  return `${p.usuario} (nivel ${p.nivel})`;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — usar el tipo derivado como retorno (te obliga a no dejarte campos)
 *
 * Si prometes devolver Config, tienes que construir el objeto completo: un objeto a
 * medias no cuela.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) configPorDefecto — construye la config inicial completa.
 * 👉 El starter devuelve { host } a secas; con el tipo bien derivado, eso ya
 *    ni compila (faltan port y https).
 *   configPorDefecto() → { host: "localhost", port: 3000, https: false }
 */
export function configPorDefecto(): Config {
  return { ...CONFIG_BASE };
}

/* 4) perfilPorDefecto — refuerzo con el otro tipo derivado.
 * perfilPorDefecto() → { usuario: "invitado", nivel: 0 }
 */
export function perfilPorDefecto(): Perfil {
  return { usuario: "invitado", nivel: 0 };
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — capstone: recibir y devolver el mismo tipo derivado (copia + pisa)
 *
 * Entra un Config, sale un Config nuevo con el puerto cambiado: spread para
 * copiar, sin mutar el original.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) conPuerto — copia la config cambiando solo el puerto.
 * conPuerto({ host: "localhost", port: 3000, https: false }, 8080)
 *   → { host: "localhost", port: 8080, https: false }
 */
export function conPuerto(c: Config, port: number): Config {
  return { ...c, port };
}
