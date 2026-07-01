/* =============================================================================
 * EJERCICIO 09 — Enrutar por variante y agregar por etiqueta
 * =============================================================================
 *
 * ▸ EXPLICACIÓN — una DU como CENTRALITA: un manejador por cada canal
 * ----------------------------------------------------------------------------
 * Un uso muy común de las uniones discriminadas es "enrutar": llega un objeto
 * que puede ser de varios canales/tipos, y cada uno se trata de forma distinta y
 * lee campos distintos. El `switch` sobre el tag se convierte en una centralita
 * que manda cada caso a su manejador.
 *
 *   type Notificacion =
 *     | { canal: "email"; para: string; asunto: string }
 *     | { canal: "sms";   telefono: string; texto: string }
 *     | { canal: "push";  deviceId: string; titulo: string };
 *
 *   function enrutar(n: Notificacion): string {
 *     switch (n.canal) {
 *       case "email": return `EMAIL→${n.para}`;       // n.para solo existe aquí
 *       case "sms":   return `SMS→${n.telefono}`;
 *       case "push":  return `PUSH→${n.deviceId}`;
 *       default: { const _: never = n; return _; }
 *     }
 *   }
 *
 * Y cuando quieres CONTAR o AGRUPAR por variante, el objeto acumulador suele
 * tener una clave por cada valor del tag: `{ email: 0, sms: 0, push: 0 }`. El
 * tipo del acumulador "rima" con la unión: una casilla por canal.
 *
 *
 * ▸ ANALOGÍA — la sala de clasificación de correos
 * ----------------------------------------------------------------------------
 * Llegan envíos y un operario los reparte por cintas según su etiqueta: cartas a
 * una cinta, paquetes a otra, urgentes a otra. El `switch (n.canal)` es el
 * operario; cada `case` es una cinta. Y el panel de contadores de la pared
 * —cartas: 12, paquetes: 5, urgentes: 3— es el objeto acumulador con una casilla
 * por tipo.
 *
 *
 * ▸ EJERCICIO — drills en escalera. EN ORDEN. ❌ nada de `any` ni `as`.
 *     pnpm test:run src/exercises/08-discriminated-unions/exercise-09.test.ts
 * ===========================================================================*/

export type Notificacion =
  | { canal: "email"; para: string; asunto: string }
  | { canal: "sms"; telefono: string; texto: string }
  | { canal: "push"; deviceId: string; titulo: string }


/* ── BLOQUE A — leer el campo propio de cada canal ─────────────────────────── */

// 1) `destinatario` — a dónde va: email → `para`, sms → `telefono`, push →
//    `deviceId`. Usa `switch (n.canal)`.
//    destinatario({ canal: "sms", telefono: "600", texto: "hola" }) → "600"
export function destinatario(n: Notificacion): string {
  // completa aquí
  return ""
}

// 2) `vistaPrevia` — el texto principal: email → `asunto`, sms → `texto`,
//    push → `titulo`.
//    vistaPrevia({ canal: "email", para: "a@b.com", asunto: "Hola" }) → "Hola"
export function vistaPrevia(n: Notificacion): string {
  // completa aquí
  return ""
}

// 3) `esInstantanea` — true para "sms" y "push", false para "email".
//    esInstantanea({ canal: "push", deviceId: "d1", titulo: "T" }) → true
export function esInstantanea(n: Notificacion): boolean {
  // completa aquí
  return false
}


/* ── BLOQUE B — enrutar (con never) y agregar ──────────────────────────────── */

// 4) `enrutar` — una línea de envío por canal, con `switch` + `default` y el
//    guardia `const _exhaustivo: never = n`:
//      email → `EMAIL a ${para}: ${asunto}`
//      sms   → `SMS a ${telefono}: ${texto}`
//      push  → `PUSH a ${deviceId}: ${titulo}`
export function enrutar(n: Notificacion): string {
  // completa aquí (switch con 3 case + default never)
  return ""
}

// 5) CAPSTONE `resumenEnvios` — cuenta cuántas notificaciones hay de cada canal.
//    Devuelve un objeto con una casilla por canal (parte de { email:0, sms:0, push:0 }).
//    resumenEnvios([
//      { canal: "email", para: "a", asunto: "x" },
//      { canal: "sms", telefono: "1", texto: "y" },
//      { canal: "email", para: "b", asunto: "z" },
//    ]) → { email: 2, sms: 1, push: 0 }
export function resumenEnvios(
  ns: Notificacion[],
): { email: number; sms: number; push: number } {
  // completa aquí (recorre y suma en la casilla de cada canal)
  return { email: 0, sms: 0, push: 0 }
}
