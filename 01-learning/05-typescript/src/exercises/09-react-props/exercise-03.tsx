/* =============================================================================
 * EJERCICIO 03 — renderizado condicional: decidir qué se pinta · bloque 09
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
 * · Distinguir cambiar un atributo de decidir qué elemento se pinta.
 * · Elegir entre return null, el ternario, && y el early return.
 * · Evitar el 0 fantasma de && con números.
 *
 * 🟢 CONTEXTO — en el 01 cambiaste el valor de un atributo según una prop:
 * <button disabled={deshabilitado ?? false}> se pinta siempre, y solo cambia un
 * atributo suyo. Eso no es renderizado condicional, y es una distinción que ya se
 * te coló una vez. Renderizado condicional es decidir qué elemento se pinta, o si
 * se pinta algo o nada.
 *
 * 🗺️ MAPA
 * TEORÍA 0 · return null es no pintar nada → drill 1
 * TEORÍA 1 · el ternario: una de dos salidas → drills 2–3
 * TEORÍA 2 · &&: algo o nada → drills 4–5
 * TEORÍA 3 · early return → drills 6–7
 * TEORÍA 4 · la trampa del && con números → drill 8
 * CAPSTONE · varias condiciones tejidas → drills 9–10
 *
 * ▸ 10 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/09-react-props/exercise-03.test.tsx
 * pnpm typecheck
 *
 * 📝 El trazado en .tsx es un ejemplo de uso comentado con //: un <Componente />
 * suelto no ejecuta nada.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 0 — return null es no pintar nada
 *
 * DEFINICIÓN
 * Renderizado condicional es decidir qué elemento se pinta, o si se pinta algo o
 * nada. La herramienta de fondo es null: ReactNode (lo miraste en @types/react)
 * incluye null, así que un componente puede hacer return null y React no pinta
 * nada. Es totalmente válido, «esta vez no hay nada que mostrar», y es la base de
 * todo lo condicional.
 *
 * SINTAXIS
 * {estaLogueado ? <Perfil /> : <Login />} // una cosa u otra
 * {hayError && <Alerta />} // algo o nada
 *
 * 🧠 ANALOGÍA — para no volver a confundirlo: cambiar un atributo es que la puerta
 * siempre está y cambias si tiene pestillo; el render condicional es decidir si hay
 * puerta, o si pones puerta o ventana.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Marca — recibe visible (boolean). Si es true retorna un <span> con el
 * texto "NUEVO"; si es false retorna null (no pinta nada).
 * Usa un if normal y dos return, como cualquier función de FASE 1.
 * <Marca visible={true} />   →  <span>NUEVO</span>
 * <Marca visible={false} />  →  (nada en el DOM)
 */
export function Marca({ visible }: { visible: boolean }) {
  return visible ? <span>NUEVO</span> : null;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el ternario: elegir entre dos salidas
 *
 * DEFINICIÓN
 * El ternario cond ? A : B cabe dentro de las llaves del JSX, porque es una
 * expresión, como viste en el 01. Sirve cuando siempre se pinta algo, pero una cosa
 * u otra.
 *
 * SINTAXIS
 * <span>{activo ? "En línea" : "Desconectado"}</span>
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2) Estado — recibe activo (boolean). Retorna un <span> cuyo texto es
 * "En línea" si activo, o "Desconectado" si no. Un solo <span>, el ternario
 * va dentro, sobre el texto.
 * <Estado activo={true} />   →  <span>En línea</span>
 * <Estado activo={false} />  →  <span>Desconectado</span>
 */
export function Estado({ activo }: { activo: boolean }) {
  return <span>{activo ? "En línea" : "Desconectado"}</span>;
}

/* 3) Acceso — recibe logueado (boolean). Retorna, a nivel del return, uno de
 * dos elementos distintos: <p>Bienvenido</p> si logueado, o <a>Entrar</a> si
 * no. Aquí el ternario elige el elemento entero, no solo un texto.
 * <Acceso logueado={true} />   →  <p>Bienvenido</p>
 * <Acceso logueado={false} />  →  <a>Entrar</a>
 */
export function Acceso({ logueado }: { logueado: boolean }) {
  return (
    // Si logueado viene con true, se renderiza el <p>, si viene con false se renderiza el <a>.
    logueado ? <p>Bienvenido</p> : <a>Entrar</a>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — &&: pintar algo o nada
 *
 * DEFINICIÓN
 * Cuando no hay plan B, no fuerces un ternario con : null. El patrón idiomático es
 * cond && <X/>: si cond es true, se evalúa a <X/>; si es false, se evalúa a false,
 * y false en JSX no pinta nada (otra vez ReactNode).
 *
 * SINTAXIS
 * {mensaje && <p>{mensaje}</p>}
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) AvisoError — recibe mensaje (string, opcional). Retorna un <div> que
 * siempre se pinta, y dentro, solo si hay mensaje, un <p> con el mensaje.
 * Usa {mensaje && <p>{mensaje}</p>} dentro del div.
 * <AvisoError />                      →  <div></div>
 * <AvisoError mensaje="Falló algo" /> →  <div><p>Falló algo</p></div>
 */
export function AvisoError({ mensaje }: { mensaje?: string }) {
  return (
    // El div se renderizará siempre, pero si hay mensaje se renderizará el <p>.
    // Si no hay mensaje no se renderizará el <p>.
    <div>{mensaje && <p>{mensaje}</p>}</div>
  );
}

/* 5) Insignia — recibe contador (number). Retorna un <span> que siempre se
 * pinta y, solo si contador es mayor que 0, un <b> con el número dentro.
 * ⚠️ Fíjate: la condición es contador > 0, que da un booleano. En el drill 8
 * verás por qué no puedes escribir contador && ... a secas aquí.
 * <Insignia contador={0} />  →  <span></span>
 * <Insignia contador={3} />  →  <span><b>3</b></span>
 */
export function Insignia({ contador }: { contador: number }) {
  return (
    // El span se renderizará siempre, pero si el contador es mayor a 0 se renderizará el <b>.
    <span>{contador > 0 && <b>{contador}</b>}</span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — early return: cortar arriba para no anidar
 *
 * DEFINICIÓN
 * Cuando un caso es «no hay nada» o «está cargando», devuélvelo arriba con un
 * return temprano. El resto del componente queda plano, sin envolverlo en un
 * ternario gigante. Es el mismo guard if (x === undefined) return del 04-objetos.
 *
 * SINTAXIS
 * if (nombre === undefined) return <p>Cargando...</p>;
 * return <h2>{nombre}</h2>;
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) Perfil — recibe nombre (string, opcional). Si no hay nombre, early
 * return de un <p>Cargando...</p>. Si lo hay, retorna un <h2> con el nombre.
 * <Perfil />              →  <p>Cargando...</p>
 * <Perfil nombre="Ana" /> →  <h2>Ana</h2>
 */
export function Perfil({ nombre }: { nombre?: string }) {
  if (nombre === undefined) return <p>Cargando...</p>;
  return <h2>{nombre}</h2>;
}

/* 7) Lista — recibe items (string[]). Si el array está vacío, early return
 * de un <p>Sin resultados</p>. Si no, retorna un <ul> con un <li> por item
 * (con su key). Enlaza el estado-vacío del 03 con las listas (que verás a
 * fondo en el 04).
 * <Lista items={[]} />              →  <p>Sin resultados</p>
 * <Lista items={["a", "b"]} />      →  <ul><li>a</li><li>b</li></ul>
 */
export function Lista({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p>Sin resultados</p>;
  }
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 4 — la trampa del && con números (bug real famoso)
 *
 * DEFINICIÓN
 * cond && <X/> funciona porque false no se pinta. Pero si cond no es un booleano
 * sino un número, y ese número es 0, entonces 0 && <X/> se evalúa a 0, y 0 sí se
 * pinta: es un ReactNode válido. Resultado: un «0» fantasma en pantalla.
 *
 * Ejemplos:
 * {lista.length && <Panel/>}     → ❌ con lista vacía pinta "0"
 * {lista.length > 0 && <Panel/>} → ✅ la comparación fuerza un booleano
 *
 * ⚠️ TRAMPA — TS no protesta (number es ReactNode legal), y React tampoco. Solo lo
 * caza un test o el ojo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 8) 🐛 CarritoRoto vs 🩹 CarritoBien — la trampa lado a lado.
 * Los dos reciben cantidad (number) y retornan un <div> que dentro muestra,
 * "si hay cantidad", un <b>Tienes {cantidad}</b>.
 *   · CarritoRoto escribe la condición como {cantidad && <b>...</b>}
 *   · CarritoBien la escribe como {cantidad > 0 && <b>...</b>}
 * Con cantidad={0}:
 *   CarritoRoto → <div>0</div>   ❌ el 0 se coló como texto
 *   CarritoBien → <div></div>    ✅ nada, como debe ser
 */
export function CarritoRoto({ cantidad }: { cantidad: number }) {
  return <div>{cantidad && <b>Tienes {cantidad}</b>}</div>;
}
export function CarritoBien({ cantidad }: { cantidad: number }) {
  return <div>{cantidad > 0 && <b>Tienes {cantidad}</b>}</div>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ CAPSTONE — varias condiciones tejidas
 *
 * Sin concepto nuevo: early return, ternario y && con las guardas correctas.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 9) Define el tipo NotificacionProps y expórtalo (el test lo importa). Debe tener:
 * · cargando  boolean, obligatoria
 * · mensaje   string, opcional
 * · noLeidas  number, obligatoria
 */
export type NotificacionProps = {
  cargando: boolean;
  mensaje?: string;
  noLeidas: number;
};

/* 10) Notificacion — usa NotificacionProps y, en este orden de decisiones:
 *   a. si cargando es true → early return <p>Cargando...</p>
 *   b. si no, retorna un <section> que contenga:
 *        · un <span> con el mensaje si lo hay, o "Sin novedades" si no
 *          (ternario sobre el texto)
 *        · solo si noLeidas > 0, un <b> con el texto noLeidas + " sin leer"
 *          (⚠️ usa noLeidas > 0 &&, no noLeidas && — la trampa del bloque 4)
 * <Notificacion cargando={true}  noLeidas={0} />
 *   →  <p>Cargando...</p>
 * <Notificacion cargando={false} noLeidas={0} />
 *   →  <section><span>Sin novedades</span></section>
 * <Notificacion cargando={false} mensaje="Hola" noLeidas={2} />
 *   →  <section><span>Hola</span><b>2 sin leer</b></section>
 */
export function Notificacion({ cargando, mensaje, noLeidas }: NotificacionProps) {
  return (
    // Si cargando es true, se renderizará un <p>
    cargando ? (
      <p>Cargando...</p>
    ) : (
      // Si no, se renderizará un <section>
      // Si no hay mensaje, se renderizará "Sin novedades". Si hay mensaje se renderizará el mensaje
      // Si no hay noLeidas, no se renderizará el <b>. Si hay noLeidas, se renderizará el <b>
      <section>
        <span>{mensaje || "Sin novedades"}</span>
        {noLeidas > 0 && <b>{noLeidas} sin leer</b>}
      </section>
    )
  );
}
