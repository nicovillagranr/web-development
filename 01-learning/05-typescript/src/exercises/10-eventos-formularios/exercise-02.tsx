/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — los dos `e` de este archivo, con su forma dibujada:
 *
 *   onClick    →  e = {                 ← la caja entera es `e`
 *                   type: "click",      ← un campo suyo, y ESTE sí es un string
 *                   nativeEvent: …,     ← el evento del navegador, envuelto
 *                 }                       (recortado: trae ~25 campos más)
 *
 *   onKeyDown  →  e = {
 *                   type: "keydown",
 *                   key: "a",           ← esto SOLO lo trae el de teclado
 *                 }
 *
 * ⚠️ `e` y `e.type` no son la misma cosa ni tienen el mismo tipo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 02 — el evento llega solo                        ·  2/10 del bloque
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · escribir un manejador dentro del hueco JSX sin anotar `e`
 *   · decir QUIÉN le pone el tipo a `e`, y por qué cada hueco da uno distinto
 *   · sacar un campo del evento sin confundirlo con el evento entero
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Primer archivo con React. En el 01 el que llamaba era una función escrita tres
 * líneas más arriba; aquí el que llama es React, y lo que te pasa es un objeto:
 * el EVENTO. El gesto es el mismo que ya tienes —entregas, no llamas—; lo nuevo
 * es que aquí el tipo te lo dan hecho, y conviene saber quién te lo está dando.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · el tipo lo pone el hueco     →  drills 1, 2, 3
 *   TEORÍA 2 · cada hueco trae su evento    →  drills 4, 5, 6
 *
 * ▸ EJERCICIO — 6 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-02.test.tsx
 *     pnpm typecheck     ← córrelo también: 4 de los 6 starters dan error de
 *                          tipos; el 3 y el 6 fallan por LÓGICA y solo los caza
 *                          el test. Que typecheck calle no significa que esté bien.
 *
 * 📝 LAS TRACES DE ESTE ARCHIVO VAN COMENTADAS, Y NO ES UNA MANÍA. En el 01, que
 *    era `.ts`, descomentar una trace la ejecutaba. Aquí no: escribir
 *    `<BotonAvisaTipo avisar={…} />` solo fabrica un objeto que DESCRIBE el
 *    elemento — el componente no se llama, así que no imprime nada. Y ni `lint` ni
 *    `typecheck` protestan, porque no está mal escrito: simplemente no hace nada.
 *    Es `avisar` vs `avisar()` un piso más arriba:
 *        <Boton />  es la receta   ·   renderizar es cocinar
 *    Lo único que ejecuta de verdad estos componentes es el test.
 * ===========================================================================*/


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el tipo lo pone el HUECO: tipado contextual
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Cuando escribes una función sin anotar sus parámetros, TS mira el SITIO donde
 *   la estás escribiendo y saca el tipo de ahí. A ese sitio se le llama el
 *   contexto, y al mecanismo, TIPADO CONTEXTUAL. `onClick=` ya lleva declarado
 *   qué recibe la función que metas dentro, así que tu `e` nace tipada sin que tú
 *   escribas nada. No es magia ni adivinación: está declarado en `@types/react`.
 *
 * SINTAXIS
 *     <button onClick={(e) => console.log(e.type)}>Avisar</button>
 *                       ↑ sin anotar, y aun así TS sabe qué es
 *
 * EJEMPLO — el mismo código dentro y fuera del hueco
 *     const suelto = (e) => e.type          // ❌ aquí no hay contexto que valga
 *     <button onClick={(e) => e.type}>      // ✅ aquí el hueco se lo da
 *
 * 🧠 ANALOGÍA (de apoyo) — el molde. A la masa no le dices qué forma tiene: se la
 *    da el molde donde la echas. `onClick=` es el molde.
 *
 * 🗣️ LAS PIEZAS
 *     tipado contextual  → que el tipo salga del sitio, no de una anotación tuya
 *     e                  → el parámetro. Su tipo lo pone React, no tú
 *     e.type             → acceso a propiedad. ESTO es un `string`; `e` no lo es
 *
 * ⚠️ TRAMPA — el tipo lo da el HUECO, no el nombre que le pongas a la variable.
 *    Saca esa misma función fuera del JSX y el contexto desaparece: `e` se queda
 *    sin tipo. Eso es exactamente el archivo 03, y ahí lo escribirás tú.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `BotonPelado` — QUÉ CONSTRUIR: un `<button>` con el texto "Avisar" que
//    entregue `alPulsar` al hueco `onClick`, tal cual. Las firmas encajan, así
//    que va pelada: es el drill 4 del 01 con React de por medio.
//    🔧 STARTER ROTO A PROPÓSITO: le pone los `()` y la llama al PINTAR, no al
//       pulsar. `TS2322: Type 'void' is not assignable to type
//       'MouseEventHandler<HTMLButtonElement> | undefined'` — le diste el retorno
//       (que es nada) donde se pedía la función. El `| undefined` está porque
//       `onClick` es opcional: puedes no ponerlo, pero si lo pones va función.
//       Y el test lo caza por el otro lado: comprueba que `alPulsar` NO se ha
//       llamado todavía al renderizar.
//    📎 onClick espera: (e: MouseEvent<HTMLButtonElement>) => void   ← se PIDE
//       alPulsar: () => void                                        ← TIENES
//       (una función que acepta MENOS parámetros encaja: los sobrantes se tiran)
//    → click en el botón   →   alPulsar se llama una vez
export function BotonPelado({ alPulsar }: { alPulsar: () => void }) {
  return (
    <button onClick={alPulsar}>
      Avisar
    </button>
  )
}
<BotonPelado alPulsar={() => console.log("pulsado")} />

// 2) `BotonAvisaTipo` — QUÉ CONSTRUIR: un `<button>` "Avisar" que escriba el
//    manejador DENTRO del hueco y le pase a `avisar` el campo `type` del evento.
//    No anotes `e`: el hueco ya lo hace. Aquí es donde ves el tipado contextual.
//    🔧 STARTER ROTO A PROPÓSITO: entrega la caja entera en vez del campo.
//       `TS2345: Argument of type 'MouseEvent<HTMLButtonElement, MouseEvent>' is
//       not assignable to parameter of type 'string'`. No te falta un tipo: te
//       falta un punto.
//    📎 e: MouseEvent<HTMLButtonElement>   ← lo que te DA el hueco (la caja)
//       avisar: (t: string) => void       ← lo que PIDE tu destino (un campo)
//    → click   →   avisar recibe "click"
export function BotonAvisaTipo({ avisar }: { avisar: (t: string) => void }) {
  return (
    <button onClick={(e) => avisar(e.type)}>
      Avisar
    </button>
  )
}
<BotonAvisaTipo avisar={(t) => console.log(t)} />   // "click"

// 3) `BotonAvisaDobleClic` — QUÉ CONSTRUIR: el mismo botón "Avisar", pero que
//    reaccione al DOBLE clic. El hueco se llama `onDoubleClick`. Pásale otra vez
//    `e.type` — y fíjate en que el texto que sale lo trae el evento, no lo
//    escribes tú.
//    🔧 STARTER ROTO A PROPÓSITO: usa el hueco `onClick`, así que salta con
//       cualquier clic suelto y avisa "click". Typecheck calla —los dos huecos
//       aceptan la misma función—, o sea que este fallo es de elección, no de
//       tipos, y solo lo caza el test.
//    📎 onClick       → salta con un clic       → e.type vale "click"
//       onDoubleClick → salta con doble clic    → e.type vale "dblclick"
//    → doble clic   →   avisar recibe "dblclick"
export function BotonAvisaDobleClic({ avisar }: { avisar: (t: string) => void }) {
  return (
    <button onDoubleClick={(e) => avisar(e.type)}>
      Avisar
    </button>
  )
}
<BotonAvisaDobleClic avisar={(t) => console.log(t)} />   // "dblclick"


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — cada hueco trae SU evento
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   No existe UN tipo de evento: existe una familia. El hueco donde escribes el
 *   manejador decide cuál te llega, y cada uno trae campos distintos. El de ratón
 *   no tiene `.key`; el de teclado sí. Por eso el tipado contextual es útil de
 *   verdad: no te da "un evento", te da EL que corresponde a ese hueco.
 *
 * SINTAXIS
 *     <button onClick={(e) => …}>       e trae type, nativeEvent, currentTarget…
 *     <input onKeyDown={(e) => …} />    e trae ADEMÁS key, altKey, shiftKey…
 *
 * EJEMPLO
 *     <button onClick={(e) => e.key} />      // ❌ en ese molde no hay teclas
 *     <input onKeyDown={(e) => e.key} />     // ✅ "a"
 *
 * 🗣️ LAS PIEZAS
 *     evento sintético → el objeto que te pasa React. Es un ENVOLTORIO
 *     e.nativeEvent    → el evento de verdad del navegador, guardado dentro
 *
 * ⚠️ TRAMPA — `e` no es el evento del navegador: es el de React, que lo envuelve.
 *    Casi siempre da igual, pero los dos se llaman `MouseEvent` y NO son el mismo
 *    tipo. El del navegador es el global; el de React hay que importarlo. Cuando
 *    veas un error con `MouseEvent` a los dos lados, es esto.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `CampoAvisaTecla` — QUÉ CONSTRUIR: un `<input>` que, al pulsar una tecla,
//    le pase a `avisar` la tecla pulsada. El hueco es `onKeyDown` y el campo,
//    `e.key`. Otro elemento, otro hueco, otro evento.
//    🔧 STARTER ROTO A PROPÓSITO: pide `e.key` desde el hueco `onClick`, y ahí
//       no hay teclas. `TS2339: Property 'key' does not exist on type
//       'MouseEvent<HTMLInputElement, MouseEvent>'`. Léelo entero: te está
//       diciendo qué molde has elegido.
//    📎 onClick   → e: MouseEvent<…>      → type, nativeEvent…  sin `key`
//       onKeyDown → e: KeyboardEvent<…>   → …y ADEMÁS `key`
//    → tecleas "a"   →   avisar recibe "a"
export function CampoAvisaTecla({ avisar }: { avisar: (t: string) => void }) {
  return (
    <input onKeyDown={(e) => avisar(e.key)} />
  )
}
<CampoAvisaTecla avisar={(t) => console.log(t)} />   // "a"

// 5) `BotonAvisaNativo` — QUÉ CONSTRUIR: un `<button>` "Avisar" que le pase a
//    `avisar` el evento DEL NAVEGADOR, no el de React. Está guardado dentro, en
//    `e.nativeEvent`.
//    ⚠️ Mira la firma de la prop: pide un `MouseEvent`, pero ese `MouseEvent` es
//       el GLOBAL del navegador — este archivo no importa nada de React, así que
//       el nombre se refiere al del DOM.
//    🔧 STARTER ROTO A PROPÓSITO: entrega el envoltorio en vez de la carta.
//       `TS2345: Argument of type 'MouseEvent<HTMLButtonElement, MouseEvent>' is
//       not assignable to parameter of type 'MouseEvent'`. Los DOS homónimos cara
//       a cara, y debajo TS te dice en qué se diferencian: `is missing the
//       following properties … layerX, layerY, offsetX, offsetY, and 16 more`.
//    📎 e: MouseEvent<HTMLButtonElement>   ← el de React (envoltorio)
//       e.nativeEvent: MouseEvent          ← el del DOM   (la carta de dentro)
//       avisar: (nativo: MouseEvent) => void   ← pide la carta
//    → click   →   avisar recibe un MouseEvent de verdad del navegador
export function BotonAvisaNativo({ avisar }: { avisar: (nativo: MouseEvent) => void }) {
  return (
    <button onClick={(e) => avisar(e.nativeEvent)}>
      Avisar
    </button>
  )
}
<BotonAvisaNativo avisar={(n) => console.log(n.type)} />   // "click"

// 6) `BotonAvisaConId` — QUÉ CONSTRUIR: un `<button>` "Avisar" que avise con el
//    `id` que le llega por props Y el tipo del evento, pegados con dos puntos:
//    "guardar:click". Dentro del hueco tienes las dos cosas a mano.
//    🔧 STARTER ROTO A PROPÓSITO: envuelve bien —eso está correcto— pero dentro
//       solo usa el `id` y se olvida del evento, así que avisa "guardar" a secas.
//       Typecheck calla, porque `id` ya es un `string` perfectamente válido: este
//       fallo no es de tipos, es de haberte dejado media pieza. Solo el test lo
//       caza. Dentro del envoltorio sigue habiendo tipado contextual, así que la
//       `e` que declares llegará tipada sola.
//    📎 dentro del hueco tienes las DOS fuentes a mano:
//       id: string                          ← viene de las props
//       e.type: string                      ← viene del evento
//    → click con id="guardar"   →   avisar recibe "guardar:click"
export function BotonAvisaConId({ id, avisar }: { id: string; avisar: (texto: string) => void }) {
  return (
    <button id={id} onClick={(evento) => avisar(`${id}:${evento.type}`)}>
      Avisar
    </button>
  )
}
<BotonAvisaConId id="guardar" avisar={(t) => console.log(t)} />   // "guardar:click"

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde: en todos ellos el manejador vivía DENTRO del
 * hueco, y por eso `e` llegaba tipada sola. En el 03 lo sacas fuera, el contexto
 * desaparece, y el cartel lo escribes tú.
 * ───────────────────────────────────────────────────────────────────────────── */
