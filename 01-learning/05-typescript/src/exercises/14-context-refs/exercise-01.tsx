import { createContext, useContext, useState } from "react";

/* =============================================================================
 * EJERCICIO 01 — el contexto: crear, proveer y leer · bloque 14
 *
 * 📌 RECORDATORIO — de la 09: un componente recibe sus datos por props. Pasar una
 * prop por componentes que no la usan, solo para que llegue a uno de más abajo, se
 * llama prop drilling: pasarla de mano en mano.
 *
 * 🎯 OBJETIVOS
 * · Crear un contexto y darle su tipo con createContext<T>.
 * · Proveer un valor con <Contexto value> y leerlo con useContext.
 * · Saber qué valor lee cada componente según dónde está el Provider.
 *
 * 🟢 CONTEXTO — Tu Store Pulse comparte el dataset con todas sus pantallas desde
 * <DatasetContext value={state}> (DatasetProvider.tsx, l.36), y tu Sport Mindset
 * comparte el carrito con <CartContext.Provider>. Los dos hacen lo mismo: que un
 * valor llegue lejos sin pasarlo de mano en mano.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · crear el contexto y su tipo → drill 1
 * TEORÍA 2 · proveer y leer → drills 2–4
 * ARMARLO TÚ → drill 5
 *
 * ▸ 5 drills en orden. Prohibidos el tipo any, as, el ! de «confía en mí» (x!) y
 * los eslint-disable.
 * pnpm test:run src/exercises/14-context-refs/exercise-01.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito, y uno pasa el test con el fallo dentro:
 * ejecuta los tres comandos. Contesta cada ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-01.pistas.md. Drills 1–5: banco, pestaña 14.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — crear el contexto y su tipo
 *
 * DEFINICIÓN
 * createContext crea un contexto: un canal por el que un valor llega a cualquier
 * componente de más abajo sin pasar por props. Recibe el valor por defecto, el que
 * lee quien no tenga un Provider encima. TypeScript saca el tipo del contexto de
 * ese valor, salvo que se lo digas tú entre <>.
 *
 * SINTAXIS
 * type Moneda = "CLP" | "USD";
 * const MonedaContext = createContext<Moneda>("CLP"); // fuera de los componentes
 *
 * Ejemplos:
 * createContext("CLP")         → Context<string>: vale cualquier texto
 * createContext<Moneda>("CLP") → Context<Moneda>: solo "CLP" o "USD"
 * createContext<Moneda>("EUR") → error: "EUR" no es una Moneda
 *
 * 🧠 ANALOGÍA — el contexto es una radio. El Provider es la emisora y useContext
 * es el receptor: cualquier receptor dentro del alcance de la emisora la sintoniza.
 * Sin emisora cerca, el receptor oye la señal de fábrica, el valor por defecto.
 *
 * 🗣️ LAS PIEZAS
 * createContext → crea el contexto. Va fuera de los componentes, una sola vez.
 * Context<T>    → el tipo de lo que devuelve: un contexto que lleva un T.
 *
 * ⚠️ TRAMPA — sin <T>, TypeScript ensancha el valor por defecto: de "CLP" saca
 * string, no Moneda. El contexto acepta cualquier texto, y quien lo lee recibe un
 * string.
 * ───────────────────────────────────────────────────────────────────────────── */

type Tema = "claro" | "oscuro";

/* El color de fondo de cada tema. Ya está bien. */
const FONDO: Record<Tema, string> = { claro: "#ffffff", oscuro: "#1d1d1f" };

/* 1) TemaContext — el contexto del tema de la página: "claro" u "oscuro", y "claro"
 * si nadie lo provee. Fondo lo lee y pinta el color de ese tema.
 * ¿Por qué? En el starter, ¿qué tipo saca TypeScript para el tema que lee Fondo?
 *
 */
export const TemaContext = createContext("claro");

export function Fondo() {
  const tema = useContext(TemaContext);
  return (
    <div data-tema={tema} style={{ background: FONDO[tema] }}>
      Tema {tema}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — proveer y leer
 *
 * DEFINICIÓN
 * <MonedaContext value={…}> provee un valor a todo lo que va entre sus etiquetas,
 * por muy abajo que esté. useContext(MonedaContext) lo lee: sube por el árbol desde
 * el componente que lo llama y se queda con el Provider más cercano por encima. Si
 * no encuentra ninguno, devuelve el valor por defecto. Cuando el value cambia, React
 * vuelve a pintar a todos los que lo leen.
 *
 * SINTAXIS
 * function Precio() {
 *   const moneda = useContext(MonedaContext); // como todo hook, arriba del componente
 *   return <p>1.990 {moneda}</p>;
 * }
 *
 * <MonedaContext value="USD">
 *   <Carrito />  // el Precio que hay dentro de Carrito lee "USD"
 * </MonedaContext>
 * <Precio />     // fuera: lee "CLP", el valor por defecto
 *
 * 🧠 ANALOGÍA — la emisora solo llega a los receptores que están dentro de su
 * alcance. Un receptor que está fuera no la oye, aunque esté justo al lado.
 *
 * 🗣️ LAS PIEZAS
 * <MonedaContext value> → el Provider, en React 19. Antes se escribía
 *                         <MonedaContext.Provider value>, como en tu CartContext.
 * useContext            → el hook que lo lee.
 * value                 → lo que provee: el valor entero, de una vez.
 *
 * ⚠️ TRAMPA — el valor por defecto no rellena lo que le falte al value. Si el
 * contexto lleva un objeto, el Provider tiene que dar el objeto entero: lo que no
 * ponga, no está.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2) AppConUsuario — la cabecera saluda a nombre y el menú dice de quién es la
 * cuenta. Los dos leen UsuarioContext. Ahora la cabecera saluda a «Invitado».
 * ¿Por qué? En el starter, ¿qué Provider encuentra Saludo al subir por el árbol?
 *
 */
export const UsuarioContext = createContext("Invitado");

function Saludo() {
  const nombre = useContext(UsuarioContext);
  return <p>Hola, {nombre}</p>;
}

function MenuDeCuenta() {
  const nombre = useContext(UsuarioContext);
  return <p>Cuenta de {nombre}</p>;
}

export function AppConUsuario({ nombre }: { nombre: string }) {
  return (
    <>
      <header>
        <Saludo />
      </header>
      <UsuarioContext value={nombre}>
        <aside>
          <MenuDeCuenta />
        </aside>
      </UsuarioContext>
    </>
  );
}

type Sesion = { nombre: string; rol: "admin" | "visita" };

/* 3) AppDeAdmin — la insignia dice «Nico · admin». Ahora dice «Nico ·» y se queda
 * sin rol.
 * ¿Por qué? En el starter, ¿qué objeto lee Insignia?
 *
 */
export const SesionContext = createContext<Sesion>({ nombre: "Invitado", rol: "visita" });

function Insignia() {
  const { nombre, rol } = useContext(SesionContext);
  return (
    <p>
      {nombre} · {rol}
    </p>
  );
}

export function AppDeAdmin() {
  return (
    <SesionContext value={{ nombre: "Nico" }}>
      <Insignia />
    </SesionContext>
  );
}

/* 4) AppConTema — el botón cambia el tema entre claro y oscuro, y Fondo lo sigue.
 * Ahora el botón cambia su texto, pero Fondo se queda en claro.
 * ¿Por qué? En el starter, ¿qué value recibe el Provider después de pulsar?
 *
 */
export function AppConTema() {
  const [tema, setTema] = useState<Tema>("claro");

  return (
    <TemaContext value="claro">
      <button type="button" onClick={() => setTema(tema === "claro" ? "oscuro" : "claro")}>
        Pasar a {tema === "claro" ? "oscuro" : "claro"}
      </button>
      <Fondo />
    </TemaContext>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ARMARLO TÚ — del idioma de mano en mano a un contexto
 *
 * Pagina recibe el idioma, y quien lo necesita es Enlace, dos niveles más abajo.
 * Entre los dos está Menu, que no lo usa. IdiomaContext ya está creado.
 * ───────────────────────────────────────────────────────────────────────────── */

type Idioma = "es" | "en";

/* El texto del enlace en cada idioma. Ya está bien. */
const INICIO: Record<Idioma, string> = { es: "Inicio", en: "Home" };

export const IdiomaContext = createContext<Idioma>("es");

/* 5) Pagina — el enlace del menú dice «Inicio» en español y «Home» en inglés,
 * según el idioma de Pagina. Ahora dice «Inicio» siempre.
 * Menu no recibe props, y Enlace tampoco.
 * ¿Por qué? Con tu arreglo, ¿qué componentes tocan el idioma, y cuál no se entera?
 *
 */
export function Enlace() {
  return <a href="/">{INICIO.es}</a>;
}

function Menu() {
  return (
    <ul>
      <li>
        <Enlace />
      </li>
    </ul>
  );
}

export function Pagina({ idioma }: { idioma: Idioma }) {
  return (
    <nav lang={idioma}>
      <Menu />
    </nav>
  );
}
