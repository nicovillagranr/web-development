/* =============================================================================
 * EJERCICIO 02 — props opcionales y valores por defecto · bloque 09
 *
 * 📌 RECORDATORIO — recortar tipos en vez de copiarlos, con
 * type Usuario = { id: number; nombre: string; email: string; activo: boolean }:
 * Pick<Usuario, 'id' | 'nombre'> → { id: number; nombre: string }: quédate con estas.
 * Omit<Usuario, 'email'>         → { id, nombre, activo }: quita estas.
 * Partial<Usuario>               → { id?, nombre?, email?, activo? }: todas opcionales.
 * Usuario['email']               → string: el tipo de una propiedad, suelto.
 * La misma idea en el HTML: ComponentProps<'span'> son las props nativas de un
 * <span>, y en function X({ mia, ...resto }), resto es lo que va al DOM. Las claves
 * van entre comillas y se separan con |. Omit no avisa si escribes mal la clave
 * (Omit<Usuario, 'emial'> compila y no quita nada); Pick sí protesta.
 *
 * 🎯 OBJETIVOS
 * · Marcar una prop como opcional y saber que por dentro es T | undefined.
 * · Darle un valor por defecto, con ?? en el cuerpo o con = en la firma.
 * · Elegir ?? y no || cuando un 0 o un "" son datos válidos.
 *
 * 🟢 CONTEXTO — en el 01 aprendiste el caso feliz: la prop siempre llega. Pero
 * muchas props son opcionales, y el que usa tu componente puede ponerlas o no:
 * <Aviso texto="Guardado" /> va sin tipo; <Aviso texto="Error" tipo="alerta" />,
 * con él. Dentro del cuerpo hay que decidir qué valor usar cuando no vino.
 *
 * 🗺️ MAPA
 * TEORÍA 0 · una prop opcional es T | undefined por dentro → drill 1
 * TEORÍA 1 · valor por defecto con ?? en el cuerpo → drills 2–3
 * TEORÍA 2 · valor por defecto en la firma → drills 4–5
 * TEORÍA 3 · ?? frente a ||: el bug del 0 y el "" → drills 6–8
 * CAPSTONE · varias opcionales con defaults coherentes → drills 9–10
 *
 * ▸ 10 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/09-react-props/exercise-02.test.tsx
 * pnpm typecheck
 *
 * 📝 Un <Componente /> suelto a nivel de módulo no ejecuta nada: solo construye un
 * descriptor que se descarta. Aquí la línea de trazado es un ejemplo de uso
 * comentado con //, no código vivo.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 0 — una prop opcional es T | undefined por dentro
 *
 * DEFINICIÓN
 * Una prop se marca como opcional con ? en el tipo, como ya viste con BotonProps.
 * La consecuencia que importa: dentro del cuerpo, esa prop no es string, es
 * string | undefined, porque si nadie la puso vale undefined. Antes de usarla
 * tienes que decidir qué valor usar cuando no vino: eso es dar un valor por
 * defecto, y hay dos formas (teorías 1 y 2). Aquí todavía no: solo para sentir
 * que la prop puede no venir.
 *
 * SINTAXIS
 * type AvisoProps = { texto: string; tipo?: string } // el ? es «se puede omitir»
 *
 * 🧠 ANALOGÍA — pides un café. «Con leche» es opcional. Si no dices nada, la
 * cafetería tiene una regla: si no especifica, va solo. El valor por defecto es esa
 * regla de la casa: lo que se sirve cuando el cliente no eligió.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Etiqueta — recibe texto (string, obligatoria) y color (string,
 * opcional). Retorna un <span> con el texto dentro y el style={{ color }}.
 * Si color no llega, el navegador ya usa su color por defecto — aquí no
 * pones defecto tú, solo pasas lo que haya (aunque sea undefined).
 * <Etiqueta texto="Hola" />               →  <span>Hola</span>
 * <Etiqueta texto="Hola" color="red" />   →  <span style="color: red">Hola</span>
 */
export function Etiqueta({ texto, color }: { texto: string; color?: string }) {
  return (
    // el color es opcional. Puede decir blue o undefined y no dará error
    <span style={{ color }}>{texto}</span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — valor por defecto con ?? (en el cuerpo)
 *
 * DEFINICIÓN
 * La primera forma de dar un defecto: dentro del cuerpo, con ?? (del 04-objetos).
 * «Si la prop vino, úsala; si no, este otro valor.»
 *
 * SINTAXIS
 * <p>Hola, {nombre ?? "invitado"}</p>
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2) Saludo — recibe nombre (string, opcional). Retorna un <p> que dice
 * "Hola, " + el nombre, y si no vino nombre usa "invitado".
 * <Saludo />                →  <p>Hola, invitado</p>
 * <Saludo nombre="Nico" />  →  <p>Hola, Nico</p>
 */
export function Saludo({ nombre }: { nombre?: string }) {
  return <p>Hola, {nombre ?? "invitado"}</p>;
}

/* 3) Precio — recibe moneda (string, opcional, defecto "€") y cantidad
 * (number, obligatoria). Retorna un <b> con la cantidad y la moneda pegada
 * detrás con un espacio: cantidad + " " + moneda.
 * <Precio cantidad={10} />               →  <b>10 €</b>
 * <Precio cantidad={10} moneda="$" />    →  <b>10 $</b>
 */
export function Precio({ moneda = "€", cantidad }: { moneda?: string; cantidad: number }) {
  return (
    <b>
      {cantidad} {moneda}
    </b>
  );
}
//<Precio moneda="$" cantidad={10} />
//<Precio cantidad={10}></Precio>

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — valor por defecto en la desestructuración (en la firma)
 *
 * DEFINICIÓN
 * La segunda forma, la más habitual en React: pones el defecto en la propia firma,
 * al sacar la prop. Así, en el cuerpo ya nunca es undefined.
 *
 * SINTAXIS
 * function Boton({ tamano = 'medio' }: { tamano?: string }) { ... }
 * Si no vino, tamano ya vale 'medio' aquí dentro.
 *
 * 🗣️ LAS PIEZAS
 * = 'medio' → a la izquierda, en el valor.
 * ?         → a la derecha, en el tipo.
 * Son dos sitios distintos diciendo lo mismo desde su lado: «esto se puede omitir».
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) Boton — recibe texto (string) y tamano (opcional, defecto 'medio').
 * Usa el defecto en la firma (no ?? en el cuerpo). Retorna un <button> con
 * el texto dentro y className igual a tamano.
 * <Boton texto="Ok" />                  →  <button class="medio">Ok</button>
 * <Boton texto="Ok" tamano="grande" />  →  <button class="grande">Ok</button>
 */
export function Boton({ texto, tamano = "medio" }: { texto: string; tamano?: string }) {
  return <button className={tamano}>{texto}</button>;
}

/* 5) Avatar — recibe nombre (string) y tamanoPx (number, opcional,
 * defecto 40). Retorna un <img> con alt={nombre} y width={tamanoPx}.
 * Defecto en la firma otra vez, pero ahora el defecto es un número.
 * <Avatar nombre="Ana" />               →  <img alt="Ana" width="40">
 * <Avatar nombre="Ana" tamanoPx={80} /> →  <img alt="Ana" width="80">
 */
export function Avatar({ nombre, tamanoPx = 40 }: { nombre: string; tamanoPx?: number }) {
  return <img alt={nombre} width={tamanoPx} />;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — ?? frente a ||: el bug del 0 y el ""
 *
 * DEFINICIÓN
 * Los dos rellenan un hueco, pero disparan con distinta sensibilidad. || pisa
 * cualquier valor falsy; ?? solo pisa null y undefined. Con datos que pueden ser 0
 * o "" legítimos, || miente. Este es el corazón del ejercicio.
 *
 * SINTAXIS
 * valor ?? defecto // defecto solo si valor es null o undefined
 * valor || defecto // defecto si valor es cualquier cosa falsy
 *
 * Ejemplos — con una cantidad que vale 0:
 * cantidad ?? 1 → 0
 * cantidad || 1 → 1 (el 0, que es un dato, se trata como vacío)
 *
 * ⚠️ TRAMPA — con textos casi nunca notas la diferencia. Con números te muerde:
 * una cantidad de 0 es un dato legítimo, y cantidad || 1 la pisa con 1. Es un bug
 * real y muy común, y aquí lo vas a provocar y a evitar. Los falsy que || se come
 * también incluyen "" y false, que son válidos.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) Contador — recibe valor (number, opcional). Retorna un <span> con el
 * número, y si no vino usa 0. Usa ?? (no ||). Piensa: si alguien pasa
 * valor={0}, tiene que salir 0 — no el defecto.
 * <Contador />            →  <span>0</span>
 * <Contador valor={0} />  →  <span>0</span>   ← el 0 que tú pasaste, no el defecto
 * <Contador valor={5} />  →  <span>5</span>
 */
export function Contador({ valor }: { valor?: number }) {
  return (
    // el 0 es el defecto
    <span>{valor ?? 0}</span>
  );
}

/* 7) CampoTexto — recibe valor (string, opcional). Retorna un <input> con
 * value igual al valor, y si no vino, "". Usa ??. El caso peligroso: un
 * string vacío "" es un valor legítimo (el usuario borró el campo) — con ||
 * lo confundirías con "no hay valor". Aquí el defecto y el vacío coinciden en
 * "", pero el hábito de ?? es el que evita el bug cuando no coinciden.
 * (readOnly va puesto para que React no se queje del input controlado.)
 * <CampoTexto />              →  <input value="">
 * <CampoTexto valor="hola" /> →  <input value="hola">
 */
export function CampoTexto({ valor }: { valor?: string }) {
  return <input value={valor ?? ""} readOnly />;
}

/* 8) 🐛 PrecioRoto vs 🩹 PrecioBien — el bug lado a lado, para verlo.
 * Los dos reciben descuento (number, opcional) y retornan un <b> con el
 * número. PrecioRoto usa || 100 (defecto 100); PrecioBien usa ?? 100.
 * Con descuento={0} (un 0% de descuento es un dato real):
 *   PrecioRoto  → <b>100</b>  ❌ el || se comió el 0 y puso el defecto
 *   PrecioBien  → <b>0</b>    ✅ el ?? respetó el 0
 */
export function PrecioRoto({ descuento }: { descuento?: number }) {
  return (
    // BUG: el `||` reemplaza TODO lo que sea "falsy", y el 0 es falsy.
    // Así que cuando llega descuento={0}, `0 || 100` da 100 — el `||` confunde
    // "el usuario puso un 0 de verdad" con "no hay valor". Ahí está lo roto.
    <b>{descuento || 100}</b>
  );
}
export function PrecioBien({ descuento }: { descuento?: number }) {
  return (
    // BIEN: el `??` solo reemplaza null o undefined, nada más. El 0 no es ni
    // null ni undefined, así que `0 ?? 100` da 0 — respeta el descuento real.
    // Solo saltaría al 100 si descuento no viniera (undefined).
    <b>{descuento ?? 100}</b>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ CAPSTONE — varias opcionales con defaults coherentes
 *
 * Junta todo: tipo con nombre, tres opcionales, defaults en la firma, y una que es
 * number (donde el 0 importa). Sin concepto nuevo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 9) Define el tipo TarjetaProps y expórtalo (el test lo importa). Debe tener:
 * · titulo     string, obligatoria
 * · subtitulo  string, opcional
 * · destacada  boolean, opcional
 * · margen     number, opcional
 */
export type TarjetaProps = {
  titulo: string;
  subtitulo?: string;
  destacada?: boolean;
  margen?: number;
};

/* 10) Tarjeta — usa TarjetaProps con estos defectos en la firma:
 *   · subtitulo → '' (vacío)     · destacada → false     · margen → 0
 * Retorna un <article> con:
 *   · className "destacada" si destacada es true, o "" si no (usa ternario)
 *   · style={{ margin: margen }}
 *   · dentro: un <h3> con el título y un <p> con el subtítulo
 * Ojo: margen={0} tiene que dar margin 0, no el defecto. El defecto en la
 * firma ya lo maneja bien (0 se pasa tal cual; solo undefined dispara el
 * defecto) — otra razón por la que el defecto-en-firma es más seguro que ||.
 * <Tarjeta titulo="Hola" />
 *   →  <article class="" style="margin: 0px"><h3>Hola</h3><p></p></article>
 * <Tarjeta titulo="Hola" subtitulo="Mundo" destacada margen={8} />
 *   →  <article class="destacada" style="margin: 8px"><h3>Hola</h3><p>Mundo</p></article>
 */
export function Tarjeta({ titulo, subtitulo = "", destacada = false, margen = 0 }: TarjetaProps) {
  return (
    <article className={destacada ? "destacada" : ""} style={{ margin: margen }}>
      <h3>{titulo}</h3>
      <p>{subtitulo}</p>
    </article>
  );
}
