/* =============================================================================
 * EJERCICIO 09 — props-función con argumentos: la cafetera, tercer acto · bloque 09
 *
 * 📌 RECORDATORIO — Pick<Usuario, 'id' | 'nombre'> se queda con esas claves, Omit
 * las quita, Partial las vuelve opcionales y Usuario['email'] saca el tipo de una.
 * Omit no avisa si escribes mal la clave (compila y no quita nada); Pick sí protesta.
 *
 * 🎯 OBJETIVOS
 * · Envolver una prop-función en una flecha para entregarla con su argumento dentro.
 * · Llamar a un callback opcional con ?.() sin que explote.
 * · Distinguir el callback que avisa (void) del que devuelve algo que el hijo pinta.
 *
 * 🟢 CONTEXTO — en el exercise-01 (drill 9) tipaste tu primera prop-función,
 * onAccion: () => void, y funcionaba porque no necesitaba saber nada. Pero en
 * cuanto la lista tiene diez filas, el padre necesita saber cuál:
 * onSeleccionar: (id: number) => void. Y aparece el problema de todo el ejercicio:
 * el id lo sabe el hijo, y la función la escribió el padre. ¿Dónde se juntan?
 *
 * 🗺️ MAPA
 * TEORÍA 0 · la prop-función sin argumentos → drill 1
 * TEORÍA 1 · el envoltorio, sin React de por medio → drill 2
 * TEORÍA 2 · el mismo envoltorio, dentro del JSX → drills 3–4
 * TEORÍA 3 · el objeto entero, dentro de un .map → drills 5–6
 * TEORÍA 4 · el callback opcional: ?.() → drill 7
 * TEORÍA 5 · no toda prop-función es un evento → drill 8
 * CAPSTONE · una lista con tres acciones distintas → drills 9–10
 *
 * ▸ 10 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/09-react-props/exercise-09.test.tsx
 * pnpm typecheck
 *
 * 📝 El trazado en .tsx es un ejemplo de uso comentado con //.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 0 — la prop-función sin argumentos
 *
 * Repaso del exercise-01/drill 9, para tener el gesto fresco. Aquí sí se entrega
 * pelada, porque no hay nada que decirle.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) BotonSimple — recibe texto (string) y onAccion (función sin
 * argumentos que no devuelve nada). Retorna un <button> con el texto dentro
 * que, al hacer clic, ejecute onAccion.
 * <BotonSimple texto="Ok" onAccion={avisar} />  →  <button>Ok</button>
 */
export function BotonSimple({ texto, onAccion }: { texto: string; onAccion: () => void }) {
  return <button onClick={onAccion}>{texto}</button>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el envoltorio, sin React de por medio
 *
 * DEFINICIÓN
 * La solución es una tercera cosa: entregar una función nueva, el envoltorio, que
 * no recibe nada y que por dentro ya sabe el id. Antes de escribirla dentro de un
 * onClick, constrúyela desnuda: una función que fabrica otra función con un dato
 * ya metido dentro. Este drill es el corazón del ejercicio.
 *
 * 🧠 ANALOGÍA — la nota para el camarero. No le das el café (ejecutar) ni la
 * cafetera vacía sin decirle qué (entregar la función pelada): le das una nota,
 * «cuando suene el timbre, sirve el café de la mesa 4», con la mesa ya escrita.
 *
 * ⚠️ TRAMPA — fíjate en la firma que se te pide: entra un number y una función, y
 * sale otra función (() => void). No sale un resultado: sale una instrucción.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2) hacerManejador — recibe id (number) y onSeleccionar (una función que
 * recibe un number y no devuelve nada). Retorna una función sin argumentos
 * que, cuando se la llame, ejecute onSeleccionar con ese id.
 * ⚠️ Anota el tipo de retorno: es () => void.
 * ⚠️ Llamar a hacerManejador no debe ejecutar nada todavía. Solo fabrica.
 * const manejar = hacerManejador(7, elegir)   ← aquí no se llamó a elegir
 * manejar()                                   ← aquí sí: elegir(7)
 */
export function hacerManejador(id: number, onSeleccionar: (id: number) => void) {
  return () => onSeleccionar(id);
}
// hacerManejador(7, () => { })

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — el mismo envoltorio, ahora dentro del JSX
 *
 * DEFINICIÓN
 * onClick={() => onSeleccionar(id)} es exactamente lo que acabas de escribir en el
 * drill 2, solo que sin darle nombre y puesto en el sitio donde se usa. No puedes
 * entregar onSeleccionar a secas, porque quien la va a llamar es el DOM, y el DOM
 * llama a los manejadores con un evento, no con tu id. Y no puedes llamarla tú al
 * escribirla, porque entonces se ejecuta al pintar.
 *
 * Ejemplos:
 * onClick={onSeleccionar}           → ❌ el DOM le pasaría el evento, no el id
 * onClick={onSeleccionar(id)}       → ❌ se ejecuta al pintar, no al hacer clic
 * onClick={() => onSeleccionar(id)} → ✅ al clic, llama a la tuya con el id
 *
 * 💡 Buena noticia, y contraste con FASE 1: las dos ❌ no compilan. La primera,
 * porque el evento del DOM no es un number; la segunda, porque onSeleccionar(id)
 * vale void, y void no es una función que se pueda poner en un onClick. En
 * 02-funciones la cafetera te dejaba pasar y explotaba en ejecución; aquí tienes
 * una capa más vigilando. Aprovéchala: lee el error, no adivines.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) BotonId — recibe id (number), texto (string) y onSeleccionar (una
 * función que recibe un number y no devuelve nada). Retorna un <button> con
 * el texto dentro que, al hacer clic, llame a onSeleccionar con el id.
 * <BotonId id={7} texto="Elegir" onSeleccionar={elegir} />
 *   →  clic  →  elegir(7)
 */
export function BotonId({
  id,
  texto,
  onSeleccionar,
}: {
  id: number;
  texto: string;
  onSeleccionar: (id: number) => void;
}) {
  return <button onClick={() => onSeleccionar(id)}>{texto}</button>;
}

/* 4) BotonRenombrar — recibe id (number), nombre (string) y onRenombrar
 * (una función que recibe un number y un string, y no devuelve nada).
 * Retorna un <button> con el nombre dentro que, al clic, llame a
 * onRenombrar con el id y el nombre, en ese orden.
 * ⚠️ TS empareja los argumentos por posición, no por nombre (la lección de
 *    mapConIndice en 02-funciones/06). Invertirlos aquí sí lo caza el
 *    compilador: number y string no se parecen.
 * <BotonRenombrar id={7} nombre="Ana" onRenombrar={renombrar} />
 *   →  clic  →  renombrar(7, 'Ana')
 */
export function BotonRenombrar({
  id,
  nombre,
  onRenombrar,
}: {
  id: number;
  nombre: string;
  onRenombrar: (id: number, nombre: string) => void;
}) {
  return <button onClick={() => onRenombrar(id, nombre)}>{nombre}</button>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — pasar el objeto entero, y hacerlo dentro de un .map
 *
 * DEFINICIÓN
 * Un callback puede recibir lo que quieras: un id, dos datos o el objeto de
 * dominio completo. Lo decides tú al escribir el tipo. Y en una lista es donde todo
 * esto vale la pena: cada <li> fabrica su propia nota, con su id dentro. Diez
 * filas, diez envoltorios, cada uno recordando el suyo.
 *
 * 💡 Eso se llama clausura (closure). No necesitas el nombre para usarlo, pero ya
 * lo has usado.
 * ───────────────────────────────────────────────────────────────────────────── */

export type Usuario = { id: number; nombre: string };

/* 5) FilaUsuario — recibe usuario (Usuario) y onElegir (una función que
 * recibe un Usuario entero y no devuelve nada). Retorna un <li> con un
 * <button> dentro que muestre el nombre y que, al clic, llame a onElegir
 * con el usuario completo.
 * <FilaUsuario usuario={{ id: 7, nombre: 'Ana' }} onElegir={elegir} />
 *   →  clic  →  elegir({ id: 7, nombre: 'Ana' })
 */
export function FilaUsuario({
  usuario,
  onElegir,
}: {
  usuario: Usuario;
  onElegir: (usuario: Usuario) => void;
}) {
  return (
    <li>
      <button onClick={() => onElegir(usuario)}>{usuario.nombre}</button>
    </li>
  );
}

/* 6) ListaUsuarios — recibe usuarios (Usuario[]) y onElegir (misma función
 * del drill 5). Retorna un <ul> con un FilaUsuario por cada usuario,
 * pasándole a cada uno su usuario y el onElegir tal cual (aquí se entrega
 * pelado: no hay nada que meterle todavía, eso ya lo hace la fila).
 * ⚠️ La key va en FilaUsuario, que es lo que devuelve el .map (drill 4
 *    del exercise-04: la key la intercepta React, no llega a las props).
 * <ListaUsuarios usuarios={[{ id: 7, nombre: 'Ana' }]} onElegir={elegir} />
 */
export function ListaUsuarios({
  usuarios,
  onElegir,
}: {
  usuarios: Usuario[];
  onElegir: (usuario: Usuario) => void;
}) {
  return (
    <ul>
      {usuarios.map((usuario) => (
        <FilaUsuario key={usuario.id} usuario={usuario} onElegir={onElegir} />
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 4 — el callback opcional: ?.()
 *
 * DEFINICIÓN
 * Si la prop-función es opcional, su tipo por dentro es
 * ((id: number) => void) | undefined, y undefined() revienta. ?.() es «llámala solo
 * si existe»: el mismo ?. del acceso a propiedades, aplicado a la llamada. Si no
 * existe, la expresión entera vale undefined y no pasa nada.
 *
 * SINTAXIS
 * if (onBorrar) onBorrar(id) // la guardia de siempre
 * onBorrar?.(id)             // lo mismo, en un símbolo
 *
 * ⚠️ TRAMPA — ojo a los paréntesis: onBorrar?.(id), con el punto antes. No es
 * onBorrar?(id), que parece un ternario a medias y no compila.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 7) BotonBorrar — recibe id (number) y onBorrar (función que recibe un
 * number y no devuelve nada, opcional). Retorna un <button> con el texto
 * "Borrar" que, al clic, llame a onBorrar con el id solo si llegó.
 * <BotonBorrar id={7} />              →  clic  →  no pasa nada, no explota
 * <BotonBorrar id={7} onBorrar={f} /> →  clic  →  f(7)
 */
export function BotonBorrar({ id, onBorrar }: { id: number; onBorrar?: (id: number) => void }) {
  return <button onClick={() => onBorrar?.(id)}>Borrar</button>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 5 — no toda prop-función es un evento
 *
 * DEFINICIÓN
 * Todas las de arriba devuelven void: el hijo las llama y no mira el resultado (el
 * tirador de espaldas del exercise-01: dispara y no se gira). Pero una
 * prop-función puede devolver algo que el hijo sí usa. Entonces no es «avisar de
 * que pasó algo»: es «aquí tienes una pieza de comportamiento que me falta». El
 * componente no sabe cómo formatear un precio; quien lo llama, sí.
 *
 * SINTAXIS
 * formatear: (n: number) => string // el hijo pinta lo que esto devuelva
 *
 * 🧠 ANALOGÍA — avisar al camarero de que ya terminaste (void: le da igual qué
 * contestes) frente a pedirle la cuenta (esperas el papel, y sin él no sigues).
 * ───────────────────────────────────────────────────────────────────────────── */

/* 8) Precio — recibe valor (number) y formatear (una función que recibe un
 * number y devuelve un string). Retorna un <span> con el resultado de
 * formatear el valor.
 * ⚠️ Aquí el retorno sí importa: si formatear devolviera void, no habría
 *    nada que pintar. Fíjate en que la firma lo dice.
 * <Precio valor={12} formatear={(n) => `${n} €`} />  →  <span>12 €</span>
 */
export function Precio({ valor, formatear }: { valor: number; formatear: (n: number) => string }) {
  return <span>{formatear(valor)}</span>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ CAPSTONE — una lista con tres acciones distintas
 *
 * Sin concepto nuevo: callbacks con argumento + uno opcional + .map con key + un
 * formateador que devuelve string. Es una lista de tareas de verdad, a la que solo
 * le falta el estado (carpeta 11) para estar viva.
 * ───────────────────────────────────────────────────────────────────────────── */

export type Tarea = { id: number; titulo: string; hecha: boolean };

/* 9) Define el tipo ListaTareasProps y expórtalo. Debe tener:
 * · tareas      Tarea[]
 * · onAlternar  función que recibe un number (el id) y no devuelve nada
 * · onBorrar    igual que la anterior, pero opcional
 * · etiquetaDe  función que recibe una Tarea y devuelve un string
 */
export type ListaTareasProps = {
  tareas: Tarea[];
  onAlternar: (id: number) => void;
  onBorrar?: (id: number) => void;
  etiquetaDe: (tarea: Tarea) => string;
};

/* 10) ListaTareas — usa ListaTareasProps. Si no hay tareas, early return de
 * un <p>Sin tareas</p> (el estado vacío del exercise-03).
 * Si hay, retorna un <ul> con un <li> por tarea (key = el id), y dentro de
 * cada <li>, en este orden:
 *   · un <span> con className="hecha" si la tarea está hecha y
 *     className="pendiente" si no, que contenga etiquetaDe(tarea)
 *   · un <button> con el texto "Alternar" que llame a onAlternar con el id
 *   · un <button> con el texto "Borrar" que llame a onBorrar con el id
 *     solo si llegó
 * <ListaTareas tareas={[]} … />  →  <p>Sin tareas</p>
 */
export function ListaTareas(props: ListaTareasProps) {
  if (props.tareas.length === 0) {
    return <p>Sin tareas</p>;
  }
  return (
    <ul>
      {props.tareas.map((tarea) => (
        <li key={tarea.id}>
          <span className={tarea.hecha ? "hecha" : "pendiente"}>{props.etiquetaDe(tarea)}</span>
          <button onClick={() => props.onAlternar(tarea.id)}>Alternar</button>
          <button onClick={() => props.onBorrar?.(tarea.id)}>Borrar</button>
        </li>
      ))}
    </ul>
  );
}
