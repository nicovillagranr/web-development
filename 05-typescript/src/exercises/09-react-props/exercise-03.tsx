/* =============================================================================
 * EJERCICIO 03 — RENDERIZADO CONDICIONAL: decidir QUÉ se pinta (o si se pinta)
 * =============================================================================
 *
 * 🟢 EL CONCEPTO — y una distinción que ya se te coló una vez
 * ----------------------------------------------------------------------------
 * En el 01 cambiaste el VALOR de un atributo según una prop:
 *
 *     <button disabled={deshabilitado ?? false}>   ← el botón SIEMPRE se pinta;
 *                                                     solo cambia un atributo suyo
 *
 * Eso NO es renderizado condicional. El botón está ahí en los dos casos.
 *
 * RENDERIZADO CONDICIONAL es otra cosa: decidir **qué elemento se pinta**, o
 * **si se pinta algo o nada**:
 *
 *     {estaLogueado ? <Perfil /> : <Login />}   ← una cosa U OTRA
 *     {hayError && <Alerta />}                   ← algo O NADA
 *
 * 🧠 ANALOGÍA (para no volver a confundirlo):
 *     · cambiar un atributo   = la puerta SIEMPRE está; cambias si tiene pestillo.
 *     · render condicional    = decides si HAY puerta, o si pones puerta o ventana.
 *
 *
 * 🧱 LA HERRAMIENTA DE FONDO: `null` significa "no pintes nada"
 * ----------------------------------------------------------------------------
 * ¿Recuerdas que `ReactNode` (lo miraste en @types/react) incluía `null`? Por eso
 * un componente puede `return null` y React no pinta nada. Es totalmente válido:
 * "esta vez no hay nada que mostrar". Esa es la base de todo lo condicional.
 *
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 10. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/09-react-props/exercise-03.test.tsx
 *     pnpm typecheck
 *
 * 📝 Trazado en .tsx = ejemplo de uso comentado con `//` (un <Componente /> suelto
 *    no ejecuta nada).
 * ===========================================================================*/

/* eslint-disable @typescript-eslint/no-empty-object-type, no-empty-pattern --
 * ANDAMIAJE DEL STARTER: los huecos `{}` sin rellenar disparan estas dos reglas.
 * 🧹 Al cerrar los 10 drills, BORRA estas 4 líneas y corre `pnpm lint`. */


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 0 — CALENTAMIENTO: `return null` = no pintar nada
 * ════════════════════════════════════════════════════════════════════════════
 */

// 1) `Marca` — recibe `visible` (boolean). Si es true retorna un <span> con el
//    texto "NUEVO"; si es false retorna `null` (no pinta nada).
//    Usa un `if` normal y dos `return`, como cualquier función de FASE 1.
//    <Marca visible={true} />   →  <span>NUEVO</span>
//    <Marca visible={false} />  →  (nada en el DOM)
export function Marca({ visible }: { visible: boolean }) {
  return (
    visible ? <span>NUEVO</span> : null
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — TERNARIO: elegir entre DOS salidas
 * ════════════════════════════════════════════════════════════════════════════
 * El ternario `cond ? A : B` cabe dentro de las llaves del JSX (es una expresión,
 * como viste en el 01). Sirve cuando SIEMPRE se pinta algo, pero una cosa u otra.
 */

// 2) `Estado` — recibe `activo` (boolean). Retorna un <span> cuyo texto es
//    "En línea" si activo, o "Desconectado" si no. UN solo <span>, el ternario
//    va DENTRO, sobre el texto.
//    <Estado activo={true} />   →  <span>En línea</span>
//    <Estado activo={false} />  →  <span>Desconectado</span>
export function Estado({ }: {}) {
  return <span></span>
}

// 3) `Acceso` — recibe `logueado` (boolean). Retorna, a nivel del return, uno de
//    DOS elementos distintos: <p>Bienvenido</p> si logueado, o <a>Entrar</a> si
//    no. Aquí el ternario elige el ELEMENTO entero, no solo un texto.
//    <Acceso logueado={true} />   →  <p>Bienvenido</p>
//    <Acceso logueado={false} />  →  <a>Entrar</a>
export function Acceso({ }: {}) {
  return <p></p>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — `&&`: pintar ALGO o NADA
 * ════════════════════════════════════════════════════════════════════════════
 * Cuando no hay "plan B", no fuerces un ternario con `: null`. El patrón idiomático
 * es `cond && <X/>`: si `cond` es true, se evalúa a `<X/>`; si es false, se evalúa
 * a `false` — y `false` en JSX no pinta nada (otra vez ReactNode).
 */

// 4) `AvisoError` — recibe `mensaje` (string, OPCIONAL). Retorna un <div> que
//    SIEMPRE se pinta, y DENTRO, solo si hay mensaje, un <p> con el mensaje.
//    Usa `{mensaje && <p>{mensaje}</p>}` dentro del div.
//    <AvisoError />                      →  <div></div>
//    <AvisoError mensaje="Falló algo" /> →  <div><p>Falló algo</p></div>
export function AvisoError({ }: {}) {
  return <div></div>
}

// 5) `Insignia` — recibe `contador` (number). Retorna un <span> que SIEMPRE se
//    pinta y, solo si `contador` es mayor que 0, un <b> con el número dentro.
//    ⚠️ Fíjate: la condición es `contador > 0`, que da un BOOLEANO. En el drill 8
//    verás por qué NO puedes escribir `contador && ...` a secas aquí.
//    <Insignia contador={0} />  →  <span></span>
//    <Insignia contador={3} />  →  <span><b>3</b></span>
export function Insignia({ }: {}) {
  return <span></span>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — EARLY RETURN: cortar arriba para no anidar
 * ════════════════════════════════════════════════════════════════════════════
 * Cuando un caso es "no hay nada / está cargando", devuélvelo ARRIBA con un
 * return temprano. El resto del componente queda plano, sin envolverlo en un
 * ternario gigante. Es el mismo guard `if (x === undefined) return` del 04-objetos.
 */

// 6) `Perfil` — recibe `nombre` (string, OPCIONAL). Si NO hay nombre, early
//    return de un <p>Cargando...</p>. Si lo hay, retorna un <h2> con el nombre.
//    <Perfil />              →  <p>Cargando...</p>
//    <Perfil nombre="Ana" /> →  <h2>Ana</h2>
export function Perfil({ }: {}) {
  return <h2></h2>
}

// 7) `Lista` — recibe `items` (string[]). Si el array está VACÍO, early return
//    de un <p>Sin resultados</p>. Si no, retorna un <ul> con un <li> por item
//    (con su `key`). Enlaza el estado-vacío del 03 con las listas (que verás a
//    fondo en el 04).
//    <Lista items={[]} />              →  <p>Sin resultados</p>
//    <Lista items={["a", "b"]} />      →  <ul><li>a</li><li>b</li></ul>
export function Lista({ }: {}) {
  return <ul></ul>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — ⚠️ LA TRAMPA DEL `&&` CON NÚMEROS (bug real famoso)
 * ════════════════════════════════════════════════════════════════════════════
 * `cond && <X/>` funciona porque `false` no se pinta. PERO si `cond` no es un
 * booleano sino un NÚMERO, y ese número es `0`... entonces `0 && <X/>` se evalúa
 * a `0`, y `0` SÍ se pinta (es un ReactNode válido, como viste). Resultado: un
 * "0" fantasma en pantalla. TS no protesta (number es ReactNode legal); React
 * tampoco. Solo lo caza un test o el ojo.
 *
 *   {lista.length && <Panel/>}     ❌ con lista vacía pinta "0"
 *   {lista.length > 0 && <Panel/>} ✅ la comparación fuerza un booleano
 */

// 8) 🐛 `CarritoRoto` vs 🩹 `CarritoBien` — la trampa lado a lado.
//    Los dos reciben `cantidad` (number) y retornan un <div> que dentro muestra,
//    "si hay cantidad", un <b>Tienes {cantidad}</b>.
//      · `CarritoRoto` escribe la condición como `{cantidad && <b>...</b>}`
//      · `CarritoBien` la escribe como `{cantidad > 0 && <b>...</b>}`
//    Con `cantidad={0}`:
//      CarritoRoto → <div>0</div>   ❌ el 0 se coló como texto
//      CarritoBien → <div></div>    ✅ nada, como debe ser
export function CarritoRoto({ }: {}) {
  return <div></div>
}
export function CarritoBien({ }: {}) {
  return <div></div>
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 5 — CAPSTONE: varias condiciones tejidas
 * ════════════════════════════════════════════════════════════════════════════
 * Sin concepto nuevo: early return + ternario + `&&` con guardas correctas.
 */

// 9) Define el tipo `NotificacionProps` y expórtalo (el test lo importa). Debe tener:
//      · `cargando`  boolean, obligatoria
//      · `mensaje`   string, opcional
//      · `noLeidas`  number, obligatoria
export type NotificacionProps = {}

// 10) `Notificacion` — usa `NotificacionProps` y, EN ESTE ORDEN de decisiones:
//       a. si `cargando` es true → early return <p>Cargando...</p>
//       b. si no, retorna un <section> que contenga:
//            · un <span> con el `mensaje` si lo hay, o "Sin novedades" si no
//              (ternario sobre el texto)
//            · SOLO si `noLeidas > 0`, un <b> con el texto `noLeidas` + " sin leer"
//              (⚠️ usa `noLeidas > 0 &&`, no `noLeidas &&` — la trampa del bloque 4)
//     <Notificacion cargando={true}  noLeidas={0} />
//       →  <p>Cargando...</p>
//     <Notificacion cargando={false} noLeidas={0} />
//       →  <section><span>Sin novedades</span></section>
//     <Notificacion cargando={false} mensaje="Hola" noLeidas={2} />
//       →  <section><span>Hola</span><b>2 sin leer</b></section>
export function Notificacion({ }: NotificacionProps) {
  return <section></section>
}
