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
 *     pnpm typecheck
 *
 *   Todos los starters de este archivo están rotos a propósito.
 *   ¿Atascado? Las pistas están en `exercise-02.pistas.md`, de una en una.
 *
 * ⚠️ Corre LOS DOS comandos. 4 de los 6 starters dan error de tipos, pero **2
 *    fallan solo por lógica y typecheck se los traga enteros**. No te digo cuáles.
 *    Que typecheck calle no significa que esté bien.
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

// 1) `BotonPelado` — un `<button>` "Avisar" que ejecute `alPulsar` cuando alguien
//    lo pulse. Una vez por clic, y ni una sola vez antes: al pintarse el
//    componente no tiene que pasar nada todavía.
export function BotonPelado({ alPulsar }: { alPulsar: () => void }) {
  return (
    <button onClick={alPulsar}>
      Avisar
    </button>
  )
}
// <BotonPelado alPulsar={() => console.log("pulsado")} />

// 2) `BotonAvisaTipo` — el mismo botón "Avisar", pero ahora el manejador se
//    escribe DENTRO del hueco y tiene que pasarle a `avisar` el tipo del evento.
//    Lo que sale es un texto: "click".
//    No anotes `e`. Aquí es exactamente donde se ve el tipado contextual, y
//    escribir el tipo a mano te lo taparía.
export function BotonAvisaTipo({ avisar }: { avisar: (t: string) => void }) {
  return (
    <button onClick={(e) => avisar(e.type)}>
      Avisar
    </button>
  )
}
// <BotonAvisaTipo avisar={(t) => console.log(t)} />   // "click"

// 3) `BotonAvisaDobleClic` — el mismo botón, pero que reaccione al DOBLE clic y
//    no a uno suelto. Avisa igual que el anterior, con el tipo del evento; fíjate
//    en que el texto que sale cambia solo, porque lo trae el evento y no lo
//    escribes tú.
//    Aviso: typecheck no te va a ayudar en este. Los dos huecos aceptan la misma
//    función, así que el fallo no es de tipos y solo lo caza el test.
export function BotonAvisaDobleClic({ avisar }: { avisar: (t: string) => void }) {
  return (
    <button onDoubleClick={(e) => avisar(e.type)}>
      Avisar
    </button>
  )
}
// <BotonAvisaDobleClic avisar={(t) => console.log(t)} />   // "dblclick"


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

// 4) `CampoAvisaTecla` — cambiamos de elemento y de gesto: un `<input>` que, al
//    teclear, le pase a `avisar` la tecla que se ha pulsado. Otro elemento y otro
//    hueco significan otro evento, con otros campos dentro.
export function CampoAvisaTecla({ avisar }: { avisar: (t: string) => void }) {
  return (
    <input onKeyDown={(e) => avisar(e.key)} />
  )
}
// <CampoAvisaTecla avisar={(t) => console.log(t)} />   // "a"

// 5) `BotonAvisaNativo` — un `<button>` "Avisar", y esta vez mira bien la firma
//    de `avisar`: no pide un texto, pide un `MouseEvent` entero. Y no el que te
//    da el hueco, sino el DEL NAVEGADOR — este archivo no importa nada de React,
//    así que ese nombre se refiere al global del DOM. El que React te pasa lo
//    lleva guardado dentro: sácalo de ahí y entrégaselo.
export function BotonAvisaNativo({ avisar }: { avisar: (nativo: MouseEvent) => void }) {
  return (
    <button onClick={(e) => avisar(e.nativeEvent)}>
      Avisar
    </button>
  )
}
// <BotonAvisaNativo avisar={(n) => console.log(n.type)} />   // "click"

// 6) `BotonAvisaConId` — el cierre. Un `<button>` "Avisar" que avise con las dos
//    cosas que tiene a mano ahí dentro, el `id` que llega por props y el tipo del
//    evento, pegadas con dos puntos: con `id="guardar"`, un clic manda
//    "guardar:click".
//    Aviso: typecheck va a callar aunque te quede a medias, porque medio texto
//    sigue siendo un texto perfectamente válido. Solo el test lo caza.
export function BotonAvisaConId({ id, avisar }: { id: string; avisar: (texto: string) => void }) {
  return (
    <button id={id} onClick={(evento) => avisar(`${id}:${evento.type}`)}>
      Avisar
    </button>
  )
}
// <BotonAvisaConId id="guardar" avisar={(t) => console.log(t)} />   // "guardar:click"

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 6 estén en verde: en todos ellos el manejador vivía DENTRO del
 * hueco, y por eso `e` llegaba tipada sola. En el 03 lo sacas fuera, el contexto
 * desaparece, y el cartel lo escribes tú.
 * ───────────────────────────────────────────────────────────────────────────── */
