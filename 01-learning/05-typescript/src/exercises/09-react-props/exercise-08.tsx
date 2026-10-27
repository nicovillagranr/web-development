/* =============================================================================
 * EJERCICIO 08 — props que se excluyen: la unión discriminada · bloque 09
 *
 * 📌 RECORDATORIO — Pick<Usuario, 'id' | 'nombre'> se queda con esas claves, Omit
 * las quita, Partial las vuelve opcionales y Usuario['email'] saca el tipo de una.
 * Omit no avisa si escribes mal la clave (compila y no quita nada); Pick sí protesta.
 *
 * 🎯 OBJETIVOS
 * · Cerrar con una unión discriminada los estados que un tipo no debe admitir.
 * · Estrechar con if, switch o in, y blindar el switch con la guardia never.
 * · Saber por qué una unión sin discriminante deja pasar las dos mitades.
 *
 * 🟢 CONTEXTO — hay componentes con dos modos cuyas props no deben mezclarse: un
 * botón que a veces navega (necesita href) y a veces ejecuta algo (necesita
 * onClick). Con las dos opcionales, el tipo miente: deja escribir un botón sin
 * ninguna y otro con las dos. La regla de fondo, que vale para toda tu carrera: el
 * tipo debe admitir exactamente los estados posibles. Ni uno más.
 *
 * ⚠️ TRAMPA Nº1 — no desestructures en la firma. Con una unión,
 * function Boton({ como, href, onClick }: BotonProps) no compila: href no existe en
 * todos los miembros, y desestructurar es leer la propiedad ya, antes de preguntar.
 * Se recibe props entero, se pregunta, y se desestructura dentro de la rama si apetece.
 *
 * 🗺️ MAPA
 * TEORÍA 0 · una unión de literales en una prop → drill 1
 * TEORÍA 1 · el problema, antes de arreglarlo → drill 2
 * TEORÍA 2 · la unión discriminada → drills 3–4
 * TEORÍA 3 · más de dos miembros: el switch → drill 5
 * TEORÍA 4 · sin discriminante: el operador in → drill 6
 * TEORÍA 5 · narrowing sin JSX y la guardia never → drills 7–8
 * CAPSTONE · un campo de formulario con tres formas → drills 9–10
 *
 * ▸ 10 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/09-react-props/exercise-08.test.tsx
 * pnpm typecheck
 *
 * 📝 El trazado en .tsx es un ejemplo de uso comentado con //.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 0 — una unión de literales en una prop
 *
 * Esto ya lo hiciste (exercise-01, drill 6). Aquí la unión está dentro de una prop:
 * estado solo puede valer una de dos palabras. Todavía no hay dos formas distintas
 * de props, solo dos valores posibles de una.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Insignia — recibe estado con el tipo 'activo' | 'inactivo'. Retorna
 * un <span> con className = el estado, y dentro el texto "Activo" o
 * "Inactivo" según cuál sea.
 * <Insignia estado="activo" />  →  <span class="activo">Activo</span>
 */
export function Insignia({ estado }: { estado: "activo" | "inactivo" }) {
  return <span className={estado}>{estado === "activo" ? "Activo" : "Inactivo"}</span>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el problema, para que lo veas antes de arreglarlo
 *
 * El drill 2 se escribe mal a propósito, con las dos props opcionales:
 * type BotonProps = { texto: string; href?: string; onClick?: () => void }
 *
 * Funciona en los casos buenos; el test documenta los agujeros que deja abiertos.
 *
 * Ejemplos:
 * <Boton texto="Ok" />                       → ni href ni onClick: no hace nada
 * <Boton texto="Ok" href="/a" onClick={f} /> → las dos: ¿navega o ejecuta?
 *
 * Los dos compilan, y ninguno es un caso que hayas decidido soportar: son agujeros.
 * Un tipo con agujeros te obliga a defenderte en ejecución de estados que no
 * deberían poder escribirse.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2) BotonRoto — recibe texto (string), href (string, opcional) y
 * onClick (función sin argumentos que no devuelve nada, opcional).
 * Si hay href, retorna un <a> con ese href y el texto dentro.
 * Si no, retorna un <button> con el onClick puesto y el texto dentro.
 * ⚠️ Escríbelo tal cual. La lección no es el cuerpo: es leer el test y ver
 *    qué deja pasar este tipo que nunca deberías haber podido escribir.
 * <BotonRoto texto="Ir" href="/a" />       →  <a href="/a">Ir</a>
 * <BotonRoto texto="Ok" onClick={f} />     →  <button>Ok</button>
 */
export function BotonRoto({
  texto,
  href,
  onClick,
}: {
  texto: string;
  href?: string;
  onClick?: () => void;
}) {
  return href ? <a href={href}>{texto}</a> : <button onClick={onClick}>{texto}</button>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — la unión discriminada
 *
 * DEFINICIÓN
 * Una unión de formas exactas, cada una completa por su cuenta, unidas por |, con
 * un campo que las distingue: el discriminante, un tipo literal que solo puede
 * valer una cosa en cada miembro. Al preguntar por él, TS estrecha, y dentro de esa
 * rama sabe qué props hay y cuáles no. Ya la usaste en 05-unions-narrowing/07, el
 * patrón reducer.
 *
 * SINTAXIS
 * type Cliente =
 *   | { tipo: 'particular'; dni: string }
 *   | { tipo: 'empresa'; cif: string }
 *
 * if (c.tipo === 'empresa') c.cif // en esta rama, TS sabe que hay cif
 *
 * 🧠 ANALOGÍA — el formulario del banco: la casilla de arriba, particular o
 * empresa, decide qué mitad se rellena, DNI o CIF, nunca los dos. Así «empresa sin
 * CIF» es imposible de entregar, en vez de un error que alguien ve tres semanas
 * después. Y no puedes abrir las dos mitades a la vez: primero miras la casilla.
 *
 * ⚠️ TRAMPA — el discriminante tiene que ser un tipo literal ('enlace'), no string.
 * Con como: string no hay nada que estrechar: props.como === 'enlace' sería una
 * comparación cualquiera, no una pregunta que TS sepa responder.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) Define y exporta los tres tipos:
 *   · EnlaceProps = { como: 'enlace';  texto: string; href: string }
 *   · AccionProps = { como: 'accion';  texto: string; onClick: () => void }
 *   · BotonProps  = la unión de los dos anteriores
 * (Los dos primeros escríbelos tal cual; el tercero es una línea con |.)
 */
export type EnlaceProps = {
  como: "enlace";
  texto: string;
  href: string;
};
export type AccionProps = {
  como: "accion";
  texto: string;
  onClick: () => void;
};
export type BotonProps = EnlaceProps | AccionProps;

/* 4) Boton — usa BotonProps. Recibe props entero (no desestructures en la
 * firma: es la trampa nº1 de la cabecera). Pregunta por props.como:
 *   · 'enlace' → un <a> con el href y el texto dentro
 *   · 'accion' → un <button> con el onClick y el texto dentro
 * <Boton como="enlace" texto="Ir" href="/a" />    →  <a href="/a">Ir</a>
 * <Boton como="accion" texto="Ok" onClick={f} />  →  <button>Ok</button>
 */
export function Boton(props: BotonProps) {
  if (props.como === "enlace") {
    return <a href={props.href}>{props.texto}</a>;
  }
  return <button onClick={props.onClick}>{props.texto}</button>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — más de dos miembros: el switch
 *
 * DEFINICIÓN
 * Con tres o más, el if/else encadenado se hace ilegible. El switch sobre el
 * discriminante es el idioma estándar, y es literalmente el reducer de
 * 05-unions-narrowing/07, que también será useReducer en React.
 *
 * SINTAXIS
 * switch (props.tipo) {
 *   case 'error':
 *     return … // aquí existe props.codigo
 * }
 *
 * 💡 Cada rama ve props distintas: en 'error' existe codigo, y en 'exito' ni
 * siquiera se puede escribir props.codigo (TS lo tacha).
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) Define y exporta MensajeProps como la unión de estas tres formas:
 * · { tipo: 'exito';    detalle: string }
 * · { tipo: 'error';    codigo: number }
 * · { tipo: 'cargando' }                    ← sí: un miembro sin datos
 */
export type MensajeProps =
  { tipo: "exito"; detalle: string } | { tipo: "error"; codigo: number } | { tipo: "cargando" };

/* Mensaje — usa MensajeProps. switch sobre props.tipo. Retorna un <p>
 * con className = el tipo y dentro:
 *   · 'exito'    → el detalle
 *   · 'error'    → "Error " + el codigo
 *   · 'cargando' → "Cargando…"
 * <Mensaje tipo="error" codigo={404} />  →  <p class="error">Error 404</p>
 */
export function Mensaje(props: MensajeProps) {
  switch (props.tipo) {
    case "exito":
      return <p className="exito">{props.detalle}</p>;
    case "error":
      return <p className="error">Error {props.codigo}</p>;
    case "cargando":
      return <p className="cargando">Cargando…</p>;
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 4 — sin discriminante: el operador in
 *
 * DEFINICIÓN
 * A veces no puedes, o no quieres, añadir un campo tipo. Entonces se pregunta
 * directamente si la propiedad está presente. in también estrecha, y dentro del
 * componente funciona igual de bien.
 *
 * SINTAXIS
 * if ('onCerrar' in props) { … } // entre comillas: es una clave, no una variable
 *
 * 🧠 ANALOGÍA — es preguntar «¿esta carpeta trae hoja de CIF?» en vez de mirar la
 * casilla de arriba. Funciona, pero te fías de que las carpetas estén completas.
 *
 * ⚠️ TRAMPA — el precio, que el test te enseña en el drill 6c: una unión sin
 * discriminante no impide que te manden las dos mitades.
 * { texto: 'x', segundos: 3, onCerrar: f } compila. Sí, compila. Contra una unión,
 * un objeto literal solo choca con propiedades que no existan en ningún miembro;
 * onCerrar existe en uno, así que pasa. Con discriminante, TS elige primero el
 * miembro por el valor literal (como: 'enlace' → solo EnlaceProps) y luego revisa
 * contra ese, que sí prohíbe lo del otro.
 *
 * 💡 La conclusión del ejercicio entero: in sirve para leer una unión ajena; el
 * discriminante explícito es lo que cierra el agujero al escribirla. Si el tipo es
 * tuyo, ponle discriminante.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) Define y exporta AvisoProps como la unión de estas dos formas:
 * · { texto: string; onCerrar: () => void }   ← aviso que se cierra a mano
 * · { texto: string; segundos: number }       ← aviso que se va solo
 */
export type AvisoProps =
  { texto: string; onCerrar: () => void } | { texto: string; segundos: number };

/* Aviso — usa AvisoProps. Retorna un <div> con el texto y, según el
 * miembro (pregunta con in):
 *   · si trae onCerrar → un <button> con el texto "Cerrar" que lo ejecute
 *   · si no              → un <small> con los segundos + "s"
 * <Aviso texto="Guardado" onCerrar={f} />  →  <div>Guardado<button>Cerrar</button></div>
 * <Aviso texto="Guardado" segundos={3} />  →  <div>Guardado<small>3s</small></div>
 */
export function Aviso(props: AvisoProps) {
  if ("onCerrar" in props) {
    return (
      <div>
        {props.texto}
        <button onClick={props.onCerrar}>Cerrar</button>
      </div>
    );
  }
  return (
    <div>
      {props.texto}
      <small>{props.segundos}s</small>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 5 — narrowing sin JSX, y la guardia never
 *
 * DEFINICIÓN
 * El narrowing no tiene nada que ver con React: es TS puro operando sobre un
 * objeto, y estos dos drills lo aíslan. never es «el tipo de lo que no puede
 * pasar»: si trataste todos los miembros, en el default a TS no le queda ninguno,
 * el tipo de props allí es never y la asignación compila.
 *
 * SINTAXIS
 * default: {
 *   const imposible: never = props
 *   return imposible
 * }
 *
 * 💡 El día que alguien añada un cuarto miembro y olvide su case, ese miembro llega
 * hasta el default, ya no es never, y el compilador te tacha esa línea. Un error
 * hoy, en vez de un hueco en blanco en producción dentro de seis meses.
 *
 * 🧠 ANALOGÍA — el recuento de la caja al cerrar: no sirve para vender; sirve para
 * que, si falta algo, te enteres esta noche y no en la auditoría.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 7) describirBoton — recibe props: BotonProps (la unión del drill 3) y
 * retorna un string. No pinta nada, no hay JSX aquí.
 *   · 'enlace' → "Enlace a " + el href
 *   · 'accion' → "Acción: " + el texto
 * describirBoton({ como: 'enlace', texto: 'Ir', href: '/a' })  →  'Enlace a /a'
 */
export function describirBoton(props: BotonProps) {
  switch (props.como) {
    case "enlace":
      return `Enlace a ${props.href}`;
    case "accion":
      return `Acción: ${props.texto}`;
    default: {
      const imposible: never = props;
      return imposible;
    }
  }
}

/* 8) etiquetaDe — recibe props: MensajeProps (drill 5) y retorna un string
 * con un switch sobre props.tipo:
 *   · 'exito' → "Todo bien"   · 'error' → "Falló"   · 'cargando' → "Esperando"
 * …y un default con la guardia never explicada arriba.
 * etiquetaDe({ tipo: 'cargando' })  →  'Esperando'
 */
export function etiquetaDe(props: MensajeProps) {
  switch (props.tipo) {
    case "exito":
      return "Todo bien";
    case "error":
      return "Falló";
    case "cargando":
      return "Esperando";
    default: {
      const imposible: never = props;
      return imposible;
    }
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ CAPSTONE — un campo de formulario con tres formas
 *
 * Se junta todo lo de la carpeta: unión discriminada + narrowing + una lista con
 * .map y key (del 04) dentro de una de las ramas. Es el patrón con el que se
 * construyen los formularios por configuración en el mundo real.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 9) Define y exporta CampoProps como la unión de estas tres formas. Las tres
 * comparten etiqueta (string), pero cada una trae lo suyo:
 *   · { clase: 'texto';     etiqueta: string; valor: string }
 *   · { clase: 'numero';    etiqueta: string; valor: number; maximo: number }
 *   · { clase: 'seleccion'; etiqueta: string; opciones: string[] }
 */
export type CampoProps =
  | { clase: "texto"; etiqueta: string; valor: string }
  | { clase: "numero"; etiqueta: string; valor: number; maximo: number }
  | { clase: "seleccion"; etiqueta: string; opciones: string[] };

/* 10) Campo — usa CampoProps. Retorna un <label> que contenga siempre la
 * etiqueta primero y, después, según la clase (usa switch + guardia
 * never):
 *   · 'texto'     → <input type="text" defaultValue={valor} />
 *   · 'numero'    → <input type="number" defaultValue={valor} max={maximo} />
 *   · 'seleccion' → <select> con un <option> por cada opción; el value y
 *                   el texto de cada uno son la opción, y la key también.
 * ⚠️ defaultValue (y no value) porque todavía no hay estado: eso es la
 *    carpeta 11. Con value y sin onChange, React protesta en consola.
 * <Campo clase="texto" etiqueta="Nombre" valor="Ana" />
 *   →  <label>Nombre<input type="text" value="Ana"></label>
 * <Campo clase="seleccion" etiqueta="Color" opciones={['rojo', 'azul']} />
 *   →  <label>Color<select><option value="rojo">rojo</option>…</select></label>
 */
export function Campo(props: CampoProps) {
  switch (props.clase) {
    case "texto":
      return (
        <label>
          {props.etiqueta}
          <input type="text" defaultValue={props.valor} />
        </label>
      );
    case "numero":
      return (
        <label>
          {props.etiqueta}
          <input type="number" defaultValue={props.valor} max={props.maximo} />
        </label>
      );
    case "seleccion":
      return (
        <label>
          {props.etiqueta}
          <select>
            {props.opciones.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </label>
      );
    default: {
      const imposible: never = props;
      return imposible;
    }
  }
}
