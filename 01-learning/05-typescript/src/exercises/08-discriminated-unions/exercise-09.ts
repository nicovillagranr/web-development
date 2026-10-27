/* =============================================================================
 * EJERCICIO 09 — enrutar por variante y agregar por etiqueta · bloque 08
 *
 * 🎯 OBJETIVOS
 * · Usar el switch sobre el tag como centralita: un manejador por variante.
 * · Contar por variante con un acumulador que tiene una casilla por tag.
 *
 * 🟢 CONTEXTO — un uso muy común de las uniones discriminadas es enrutar: llega un
 * objeto que puede ser de varios canales, y cada uno se trata de forma distinta y
 * lee campos distintos.
 *
 * 🗺️ MAPA
 * TEORÍA · la unión como centralita → base de todo el archivo
 * BLOQUE A · leer el campo propio de cada canal → drills 1–3
 * BLOQUE B · enrutar (con never) y agregar → drills 4–5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/08-discriminated-unions/exercise-09.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — una unión como centralita: un manejador por cada canal
 *
 * DEFINICIÓN
 * El switch sobre el tag se convierte en una centralita que manda cada caso a su
 * manejador, y en cada case solo existen los campos de esa variante.
 *
 * SINTAXIS
 * type Notificacion =
 *   | { canal: "email"; para: string; asunto: string }
 *   | { canal: "sms";   telefono: string; texto: string }
 *   | { canal: "push";  deviceId: string; titulo: string };
 *
 * function enrutar(n: Notificacion): string {
 *   switch (n.canal) {
 *     case "email": return `EMAIL→${n.para}`; // n.para solo existe aquí
 *     case "sms":   return `SMS→${n.telefono}`;
 *     case "push":  return `PUSH→${n.deviceId}`;
 *     default: { const _: never = n; return _; }
 *   }
 * }
 *
 * 🧠 ANALOGÍA — la sala de clasificación de correos: un operario reparte los envíos
 * por cintas según su etiqueta. El switch (n.canal) es el operario; cada case, una
 * cinta.
 * ───────────────────────────────────────────────────────────────────────────── */

export type Notificacion =
  | { canal: "email"; para: string; asunto: string }
  | { canal: "sms"; telefono: string; texto: string }
  | { canal: "push"; deviceId: string; titulo: string };

/* ▸ BLOQUE A — leer el campo propio de cada canal */

/* 1) destinatario — a dónde va: email → para, sms → telefono, push →
 * deviceId. Usa switch (n.canal).
 * destinatario({ canal: "sms", telefono: "600", texto: "hola" }) → "600"
 */
export function destinatario(n: Notificacion): string {
  switch (n.canal) {
    case "email":
      return n.para;
    case "sms":
      return n.telefono;
    case "push":
      return n.deviceId;
  }
}

/* 2) vistaPrevia — el texto principal: email → asunto, sms → texto,
 * push → titulo.
 * vistaPrevia({ canal: "email", para: "a@b.com", asunto: "Hola" }) → "Hola"
 */
export function vistaPrevia(n: Notificacion): string {
  switch (n.canal) {
    case "email":
      return n.asunto;
    case "sms":
      return n.texto;
    case "push":
      return n.titulo;
  }
}

/* 3) esInstantanea — true para "sms" y "push", false para "email".
 * esInstantanea({ canal: "push", deviceId: "d1", titulo: "T" }) → true
 */
export function esInstantanea(n: Notificacion): boolean {
  return n.canal === "sms" || n.canal === "push";
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — enrutar (con never) y agregar
 *
 * Para contar o agrupar por variante, el objeto acumulador suele tener una clave
 * por cada valor del tag: { email: 0, sms: 0, push: 0 }. Su tipo «rima» con la
 * unión: una casilla por canal. Es el panel de contadores de la pared de la sala
 * de correos (cartas: 12, paquetes: 5, urgentes: 3).
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) enrutar — una línea de envío por canal, con switch + default y el
 * guardia const _exhaustivo: never = n:
 *   email → `EMAIL a ${para}: ${asunto}`
 *   sms   → `SMS a ${telefono}: ${texto}`
 *   push  → `PUSH a ${deviceId}: ${titulo}`
 */
export function enrutar(n: Notificacion): string {
  switch (n.canal) {
    case "email":
      return `EMAIL a ${n.para}: ${n.asunto}`;
    case "sms":
      return `SMS a ${n.telefono}: ${n.texto}`;
    case "push":
      return `PUSH a ${n.deviceId}: ${n.titulo}`;
    default: {
      const _exhaustivo: never = n;
      return _exhaustivo;
    }
  }
}

/* 5) Capstone resumenEnvios — cuenta cuántas notificaciones hay de cada canal.
 * Devuelve un objeto con una casilla por canal (parte de { email:0, sms:0, push:0 }).
 * resumenEnvios([
 *   { canal: "email", para: "a", asunto: "x" },
 *   { canal: "sms", telefono: "1", texto: "y" },
 *   { canal: "email", para: "b", asunto: "z" },
 * ]) → { email: 2, sms: 1, push: 0 }
 */

// export type Notificacion =
// | { canal: "email"; para: string; asunto: string }
// | { canal: "sms"; telefono: string; texto: string }
// | { canal: "push"; deviceId: string; titulo: string }

export function resumenEnvios(ns: Notificacion[]): { email: number; sms: number; push: number } {
  return ns.reduce(
    (acumulador, noti) => {
      switch (noti.canal) {
        case "email":
          return { ...acumulador, email: acumulador.email + 1 };
        case "sms":
          return { ...acumulador, sms: acumulador.sms + 1 };
        case "push":
          return { ...acumulador, push: acumulador.push + 1 };
        default: {
          const _exhaustivo: never = noti;
          return _exhaustivo;
        }
      }
    },
    { email: 0, sms: 0, push: 0 },
  );
}
