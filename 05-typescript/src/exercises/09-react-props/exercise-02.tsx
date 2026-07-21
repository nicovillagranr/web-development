/* =============================================================================
 * EJERCICIO 02 — Props OPCIONALES y valores por DEFECTO
 * =============================================================================
 *
 * 🟢 EL CONCEPTO
 * ----------------------------------------------------------------------------
 * En el 01 aprendiste el caso feliz: la prop siempre llega. Pero muchas props
 * son OPCIONALES — el que usa tu componente puede ponerlas o no:
 *
 *     <Aviso texto="Guardado" />                  ← sin `tipo`
 *     <Aviso texto="Error" tipo="alerta" />       ← con `tipo`
 *
 * Marcas una prop como opcional con `?` en el tipo (ya lo viste con `BotonProps`):
 *
 *     type AvisoProps = { texto: string; tipo?: string }
 *                                            └─ el `?` = "se puede omitir"
 *
 * ⚠️ LA CONSECUENCIA QUE IMPORTA: dentro del cuerpo, `tipo` NO es `string`. Es
 *    `string | undefined`. Porque si nadie la puso, vale `undefined`. Así que
 *    antes de usarla tienes que decidir QUÉ VALOR usar cuando no vino. Eso es
 *    "dar un valor por defecto", y hay dos formas de hacerlo (bloques 1 y 2).
 *
 * 🧠 ANALOGÍA: pides un café. "Con leche" es opcional. Si no dices nada, la
 *    cafetería tiene una regla: "si no especifica, va solo". El valor por defecto
 *    es esa regla de la casa — lo que se sirve cuando el cliente no eligió.
 *
 *
 * 🍎 EL CORAZÓN DEL EJERCICIO (bloque 3): `??` vs `||`
 * ----------------------------------------------------------------------------
 * Los dos rellenan un hueco, pero disparan con distinta sensibilidad:
 *
 *     valor ?? defecto   → usa `defecto` SOLO si `valor` es null o undefined
 *     valor || defecto   → usa `defecto` si `valor` es CUALQUIER cosa falsy
 *                          (y eso incluye `0`, `""` y `false`, que son VÁLIDOS)
 *
 * Con textos casi nunca notas la diferencia. Con NÚMEROS te muerde: una cantidad
 * de `0` es un dato legítimo, pero `cantidad || 1` lo trata como "vacío" y lo
 * pisa con 1. Este es un bug real y muy común. Aquí lo vas a provocar y a evitar.
 *
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 10. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/09-react-props/exercise-02.test.tsx
 *     pnpm typecheck
 *
 * 📝 TRAZADO EN .tsx: recuerda que un `<Componente />` suelto a nivel de módulo
 *    NO ejecuta nada (solo construye un descriptor que se descarta). Aquí la
 *    "línea de trazado" es un ejemplo de uso comentado con `//`, no código vivo.
 * ===========================================================================*/

/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 0 — CALENTAMIENTO: una prop opcional es `T | undefined` por dentro
 * ════════════════════════════════════════════════════════════════════════════
 * Sin valores por defecto todavía. Solo para SENTIR que la prop puede no venir.
 */

// 1) `Etiqueta` — recibe `texto` (string, OBLIGATORIA) y `color` (string,
//    OPCIONAL). Retorna un <span> con el texto dentro y el `style={{ color }}`.
//    Si `color` no llega, el navegador ya usa su color por defecto — aquí NO
//    pones defecto tú, solo pasas lo que haya (aunque sea undefined).
//    <Etiqueta texto="Hola" />               →  <span>Hola</span>
//    <Etiqueta texto="Hola" color="red" />   →  <span style="color: red">Hola</span>
export function Etiqueta({ texto, color }: { texto: string, color?: string }) {
  return (
    // el color es opcional. Puede decir blue o undefined y no dará error
    <span style={{ color }}>
      {texto}
    </span>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — VALOR POR DEFECTO con `??` (en el cuerpo)
 * ════════════════════════════════════════════════════════════════════════════
 * La primera forma de dar defecto: dentro del cuerpo, con `??` (del 04-objetos).
 * "Si la prop vino, úsala; si no, este otro valor."
 */

// 2) `Saludo` — recibe `nombre` (string, OPCIONAL). Retorna un <p> que dice
//    `Hola, ` + el nombre, y si no vino nombre usa "invitado".
//    <Saludo />                →  <p>Hola, invitado</p>
//    <Saludo nombre="Nico" />  →  <p>Hola, Nico</p>
export function Saludo({ nombre }: { nombre?: string }) {
  return <p>Hola, {nombre ?? "invitado"}</p>
}

// 3) `Precio` — recibe `moneda` (string, OPCIONAL, defecto "€") y `cantidad`
//    (number, OBLIGATORIA). Retorna un <b> con la cantidad y la moneda pegada
//    detrás con un espacio: `cantidad + " " + moneda`.
//    <Precio cantidad={10} />               →  <b>10 €</b>
//    <Precio cantidad={10} moneda="$" />    →  <b>10 $</b>
export function Precio({ moneda = "€", cantidad }: { moneda?: string, cantidad: number }) {
  return (
    <b>
      {cantidad} {moneda}
    </b>
  )
}
//<Precio moneda="$" cantidad={10} />
//<Precio cantidad={10}></Precio>

/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — VALOR POR DEFECTO en la DESESTRUCTURACIÓN (en la firma)
 * ════════════════════════════════════════════════════════════════════════════
 * La segunda forma, la más habitual en React: pones el defecto en la propia
 * firma, al sacar la prop. Así en el cuerpo ya nunca es `undefined`.
 *
 *     function Boton({ tamano = 'medio' }: { tamano?: string }) { ... }
 *                            └─ si no vino, `tamano` YA vale 'medio' aquí dentro
 *
 * Ojo a la doble cara: el `= 'medio'` va en la IZQUIERDA (el valor), el `?` va
 * en la DERECHA (el tipo). Son dos sitios distintos diciendo lo mismo desde su
 * lado: "esto se puede omitir".
 */

// 4) `Boton` — recibe `texto` (string) y `tamano` (OPCIONAL, defecto 'medio').
//    Usa el DEFECTO EN LA FIRMA (no `??` en el cuerpo). Retorna un <button> con
//    el texto dentro y `className` igual a `tamano`.
//    <Boton texto="Ok" />                  →  <button class="medio">Ok</button>
//    <Boton texto="Ok" tamano="grande" />  →  <button class="grande">Ok</button>
export function Boton({ texto, tamano = "medio" }: { texto: string, tamano?: string }) {
  return (
    <button className={tamano}>
      {texto}
    </ button>
  )
}

// 5) `Avatar` — recibe `nombre` (string) y `tamanoPx` (number, OPCIONAL,
//    defecto 40). Retorna un <img> con `alt={nombre}` y `width={tamanoPx}`.
//    Defecto en la firma otra vez, pero ahora el defecto es un NÚMERO.
//    <Avatar nombre="Ana" />               →  <img alt="Ana" width="40">
//    <Avatar nombre="Ana" tamanoPx={80} /> →  <img alt="Ana" width="80">
export function Avatar({ nombre, tamanoPx = 40 }: { nombre: string, tamanoPx?: number }) {
  return (
    <img alt={nombre} width={tamanoPx} />
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — ⚠️ `??` vs `||`: el bug del `0` y el `""`
 * ════════════════════════════════════════════════════════════════════════════
 * Aquí está el corazón. `||` pisa cualquier valor FALSY; `??` solo pisa
 * null/undefined. Con datos que pueden ser `0` o `""` legítimos, `||` MIENTE.
 */

// 6) `Contador` — recibe `valor` (number, OPCIONAL). Retorna un <span> con el
//    número, y si no vino usa 0. USA `??` (NO `||`). Piensa: si alguien pasa
//    `valor={0}`, tiene que salir 0 — no el defecto.
//    <Contador />            →  <span>0</span>
//    <Contador valor={0} />  →  <span>0</span>   ← el 0 que TÚ pasaste, no el defecto
//    <Contador valor={5} />  →  <span>5</span>
export function Contador({ valor }: { valor?: number }) {
  return (
    // el 0 es el defecto
    <span>
      {valor ?? 0}
    </span>
  )
}

// 7) `CampoTexto` — recibe `valor` (string, OPCIONAL). Retorna un <input> con
//    `value` igual al valor, y si no vino, "". USA `??`. El caso peligroso: un
//    string vacío "" es un valor legítimo (el usuario borró el campo) — con `||`
//    lo confundirías con "no hay valor". Aquí el defecto y el vacío coinciden en
//    "", pero el hábito de `??` es el que evita el bug cuando NO coinciden.
//    (`readOnly` va puesto para que React no se queje del input controlado.)
//    <CampoTexto />              →  <input value="">
//    <CampoTexto valor="hola" /> →  <input value="hola">
export function CampoTexto({ valor }: { valor?: string }) {
  return (
    <input value={valor ?? ""} readOnly />
  )
}

// 8) 🐛 `PrecioRoto` vs 🩹 `PrecioBien` — el bug lado a lado, para VERLO.
//    Los dos reciben `descuento` (number, OPCIONAL) y retornan un <b> con el
//    número. `PrecioRoto` usa `|| 100` (defecto 100); `PrecioBien` usa `?? 100`.
//    Con `descuento={0}` (un 0% de descuento es un dato real):
//      PrecioRoto  → <b>100</b>  ❌ el `||` se comió el 0 y puso el defecto
//      PrecioBien  → <b>0</b>    ✅ el `??` respetó el 0
export function PrecioRoto({ descuento }: { descuento?: number }) {
  return (
    // BUG: el `||` reemplaza TODO lo que sea "falsy", y el 0 es falsy.
    // Así que cuando llega descuento={0}, `0 || 100` da 100 — el `||` confunde
    // "el usuario puso un 0 de verdad" con "no hay valor". Ahí está lo roto.
    <b>{descuento || 100}</b>
  )
}
export function PrecioBien({ descuento }: { descuento?: number }) {
  return (
    // BIEN: el `??` solo reemplaza null o undefined, nada más. El 0 no es ni
    // null ni undefined, así que `0 ?? 100` da 0 — respeta el descuento real.
    // Solo saltaría al 100 si descuento no viniera (undefined).
    <b>{descuento ?? 100}</b>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — CAPSTONE: varias opcionales con defaults coherentes
 * ════════════════════════════════════════════════════════════════════════════
 * Junta todo: tipo con nombre, tres opcionales, defaults en la firma, y una que
 * es number (donde el `0` importa). Sin concepto nuevo.
 */

// 9) Define el tipo `TarjetaProps` y expórtalo (el test lo importa). Debe tener:
//      · `titulo`     string, OBLIGATORIA
//      · `subtitulo`  string, opcional
//      · `destacada`  boolean, opcional
//      · `margen`     number, opcional
export type TarjetaProps = {
  titulo: string,
  subtitulo?: string,
  destacada?: boolean,
  margen?: number
}

// 10) `Tarjeta` — usa `TarjetaProps` con estos DEFECTOS EN LA FIRMA:
//       · `subtitulo` → '' (vacío)     · `destacada` → false     · `margen` → 0
//     Retorna un <article> con:
//       · className "destacada" si `destacada` es true, o "" si no (usa ternario)
//       · style={{ margin: margen }}
//       · dentro: un <h3> con el título y un <p> con el subtítulo
//     Ojo: `margen={0}` tiene que dar margin 0, no el defecto. El defecto en la
//     firma ya lo maneja bien (0 se pasa tal cual; solo `undefined` dispara el
//     defecto) — otra razón por la que el defecto-en-firma es más seguro que `||`.
//     <Tarjeta titulo="Hola" />
//       →  <article class="" style="margin: 0px"><h3>Hola</h3><p></p></article>
//     <Tarjeta titulo="Hola" subtitulo="Mundo" destacada margen={8} />
//       →  <article class="destacada" style="margin: 8px"><h3>Hola</h3><p>Mundo</p></article>
export function Tarjeta({ titulo, subtitulo = '', destacada = false, margen = 0 }: TarjetaProps) {
  return (
    <article className={destacada ? 'destacada' : ''} style={{ margin: margen }}>
      <h3>{titulo}</h3>
      <p>{subtitulo}</p>
    </article>
  )
}
