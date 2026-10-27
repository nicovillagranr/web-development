/* =============================================================================
 * EJERCICIO 05 — composición: pasar JSX por props · bloque 09
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
 * · Combinar children con props normales, y hacerlo opcional.
 * · Abrir varias zonas con slots nombrados, tipados como ReactNode.
 * · Distinguir un elemento (<Estrella />) de un componente (Estrella).
 *
 * 🟢 CONTEXTO — en el 01 viste que children es una prop más: lo que escribes entre
 * la apertura y el cierre llega en props.children, tipado como ReactNode. Eso
 * resuelve un hueco, pero un componente real suele tener varias zonas: cabecera,
 * cuerpo, pie, una barra lateral… y children es solo una.
 *
 * 🗺️ MAPA
 * TEORÍA 0 · children a secas → drill 1
 * TEORÍA 1 · children conviviendo con props normales → drills 2–3
 * TEORÍA 2 · slots nombrados → drills 4–5
 * TEORÍA 3 · slot opcional → drill 6
 * TEORÍA 4 · el elemento frente al componente → drills 7–8
 * CAPSTONE · una página con tres slots → drills 9–10
 *
 * ▸ 10 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/09-react-props/exercise-05.test.tsx
 * pnpm typecheck
 *
 * 📝 El trazado en .tsx es un ejemplo de uso comentado con //.
 * ============================================================================= */

import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 0 — children a secas
 *
 * Repaso del drill 8 del 01, para tener el gesto fresco antes de multiplicarlo:
 * <Caja><p>Hola</p></Caja> equivale a Caja({ children: <p>Hola</p> }).
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Marco — recibe children (ReactNode). Retorna un <article> con
 * className="marco" y el children dentro, tal cual llega.
 * <Marco><p>Hola</p></Marco>  →  <article class="marco"><p>Hola</p></article>
 */
export function Marco({ children }: { children: ReactNode }) {
  return <article className="marco">{children}</article>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — children conviviendo con props normales
 *
 * DEFINICIÓN
 * children no desplaza a las demás props: viaja en el mismo objeto. Un dato por
 * atributo y el contenido por el medio, a la vez.
 *
 * SINTAXIS
 * <Tarjeta titulo="Perfil"><p>Ana</p></Tarjeta>
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2) Tarjeta — recibe titulo (string) y children (ReactNode). Retorna un
 * <section> que contenga, en este orden: un <h3> con el título, y el children.
 * <Tarjeta titulo="Perfil"><p>Ana</p></Tarjeta>
 *   →  <section><h3>Perfil</h3><p>Ana</p></section>
 */
export function Tarjeta({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section>
      <h3>{titulo}</h3>
      {children}
    </section>
  );
}

/* 3) CajaOpcional — recibe children opcional (children?: ReactNode).
 * Si no llega children, early return de un <p>Vacío</p>.
 * Si llega, retorna un <div> con el children dentro.
 * Sí: children también admite el ?. No es una prop privilegiada.
 * <CajaOpcional />                       →  <p>Vacío</p>
 * <CajaOpcional><b>Hola</b></CajaOpcional> →  <div><b>Hola</b></div>
 */
export function CajaOpcional({ children }: { children?: ReactNode }) {
  return children ? <div>{children}</div> : <p>Vacío</p>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — slots nombrados: JSX que entra por una prop con nombre
 *
 * DEFINICIÓN
 * La respuesta a «varias zonas» no es un mecanismo nuevo: si children puede llevar
 * JSX, cualquier otra prop también puede. Le pones nombre y ya. A eso se le llama
 * slot nombrado, y se tipa exactamente igual que children, con ReactNode, porque es
 * lo mismo: una prop que lleva algo pintable. children no es especial: es el slot
 * que se rellena por posición en vez de por nombre.
 *
 * SINTAXIS
 * type LayoutProps = {
 *   cabecera: ReactNode // un slot con nombre
 *   children: ReactNode // el slot por defecto, el del medio
 * }
 * <Layout cabecera={<h1>Título</h1>}>
 *   <p>Cuerpo</p>
 * </Layout>
 *
 * 🧠 ANALOGÍA — una mochila. children es el bolsillo grande: metes ahí y no hace
 * falta decir dónde. Los slots nombrados son los bolsillos etiquetados (portátil,
 * botella, llaves): bolsillos de la misma mochila, solo que para meter algo tienes
 * que decir en cuál. Cuando necesitas separar contenidos que no deben mezclarse,
 * dejas de tirar todo al bolsillo grande.
 *
 * ⚠️ TRAMPA — las llaves de cabecera={<h1>Hola</h1>} son las de «aquí va una
 * expresión JS», las mismas de total={3}. Es un atributo normal cuyo valor resulta
 * ser JSX; no es sintaxis nueva.
 *
 * 💡 POR QUÉ IMPORTA — componer así evita el componente-monstruo lleno de banderas:
 * <Dialogo tieneBotonCerrar mostrarIcono textoPie="..." iconoTipo="alerta" /> 😖
 * <Dialogo pie={<button>Cerrar</button>}>Contenido</Dialogo> 🙂
 * En el primero, Dialogo tiene que saber pintar todas las variantes posibles. En el
 * segundo, el que llama trae el JSX ya hecho y Dialogo solo decide dónde va: menos
 * props, menos condicionales dentro, y variantes infinitas gratis.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) Layout — recibe cabecera (ReactNode) y children (ReactNode). Retorna
 * un <div> que contenga un <header> con la cabecera dentro, y un <main> con
 * el children dentro (en ese orden).
 * <Layout cabecera={<h1>Web</h1>}><p>Cuerpo</p></Layout>
 *   →  <div><header><h1>Web</h1></header><main><p>Cuerpo</p></main></div>
 */
export function Layout({ cabecera, children }: { cabecera: ReactNode; children: ReactNode }) {
  return (
    <div>
      <header>{cabecera}</header>
      <main>{children}</main>
    </div>
  );
}

/* 5) PanelDoble — recibe izquierda y derecha (las dos ReactNode). No usa
 * children: cuando hay dos zonas simétricas, ninguna es "la del medio", así
 * que las dos llevan nombre. Retorna un <div> con dos <div> dentro:
 * el primero con className="izq" y la izquierda, el segundo con
 * className="der" y la derecha.
 * <PanelDoble izquierda={<p>A</p>} derecha={<p>B</p>} />
 *   →  <div><div class="izq"><p>A</p></div><div class="der"><p>B</p></div></div>
 */
export function PanelDoble({ izquierda, derecha }: { izquierda: ReactNode; derecha: ReactNode }) {
  return (
    <div>
      <div className="izq">{izquierda}</div>
      <div className="der">{derecha}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — slot opcional (aquí se junta con el ejercicio 03)
 *
 * DEFINICIÓN
 * Un slot que puede no venir es una prop opcional más: pie?: ReactNode. Y para
 * decidir si se pinta su envoltorio, el && del 03.
 *
 * SINTAXIS
 * {pie && <footer>{pie}</footer>}
 *
 * ⚠️ TRAMPA — aquí sí vale el && sin comparación, porque pie es ReactNode (JSX o
 * undefined), no un número. La trampa del 0 del 03 solo aparece con números.
 * Piensa por qué antes de escribirlo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) Dialogo — recibe titulo (string), children (ReactNode) y pie
 * (ReactNode, opcional). Retorna un <section> con, en este orden:
 *   · un <h2> con el título
 *   · el children
 *   · solo si hay pie, un <footer> con el pie dentro
 * <Dialogo titulo="Aviso"><p>Texto</p></Dialogo>
 *   →  <section><h2>Aviso</h2><p>Texto</p></section>
 * <Dialogo titulo="Aviso" pie={<button>Ok</button>}><p>Texto</p></Dialogo>
 *   →  <section><h2>Aviso</h2><p>Texto</p><footer><button>Ok</button></footer></section>
 */
export function Dialogo({
  titulo,
  children,
  pie,
}: {
  titulo: string;
  children: ReactNode;
  pie?: ReactNode;
}) {
  return (
    <section>
      <h2>{titulo}</h2>
      {children}
      {pie && <footer>{pie}</footer>}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 4 — el elemento frente al componente (vuelve la cafetera)
 *
 * DEFINICIÓN
 * Hay dos cosas que puedes pasar por una prop, y no son la misma. Es exactamente la
 * cafetera del drill 9 del 01 (onClick={onAccion} frente a onClick={onAccion()}),
 * en su otra cara: los <... /> son el gatillo. Con ellos construyes tú; sin ellos
 * entregas la receta y construye React.
 *
 * 🗣️ LAS PIEZAS
 * <Estrella /> → un elemento, ya construido: el resultado. Tipo ReactNode; se
 *                pinta con {icono}.
 * Estrella     → el componente: la función, sin llamar todavía. Tipo
 *                () => ReactNode; se pinta con <Icono />.
 *
 * ⚠️ TRAMPA — si los confundes te avisan las dos capas, cada una a su manera. TS,
 * al escribir: ReactElement no encaja en () => ReactNode. React, en runtime, con
 * este error literal, que verás en la vida real: «Element type is invalid: expected
 * a string (for built-in components) or a class/function (for composite
 * components) but got: <Estrella />». Traducido: «te pedí la receta y me diste el
 * plato».
 *
 * 💡 EL NOMBRE — para usar una prop como etiqueta JSX, su nombre tiene que empezar
 * por mayúscula. <Icono /> es «llama al componente que hay en la variable Icono»;
 * <icono /> sería una etiqueta HTML literal llamada «icono», que no existe. Por eso
 * el drill 8 llama a la prop Icono y no icono: no es capricho de estilo, cambia el
 * significado.
 * ───────────────────────────────────────────────────────────────────────────── */

/* Componente auxiliar ya escrito, para que los drills 7 y 8 tengan algo que pasarse. */
export function Estrella() {
  return <span>★</span>;
}

/* 7) ConIcono — recibe icono (ReactNode: un elemento ya construido) y texto
 * (string). Retorna un <p> con el icono primero y el texto después.
 * <ConIcono icono={<Estrella />} texto="Favorito" />  →  <p><span>★</span>Favorito</p>
 *                  └─ fíjate: aquí sí hay <... />, lo construye quien llama
 */
export function ConIcono({ icono, texto }: { icono: ReactNode; texto: string }) {
  return (
    <p>
      {icono}
      {texto}
    </p>
  );
}

/* 8) ConIconoFn — recibe Icono (una función sin argumentos que retorna
 * ReactNode) y texto (string). Retorna un <p> con el icono primero y el
 * texto después — pero aquí lo construyes tú dentro, con <Icono />.
 * <ConIconoFn Icono={Estrella} texto="Favorito" />  →  <p><span>★</span>Favorito</p>
 *                     └─ sin <... />: entregas la función, no el resultado
 */
export function ConIconoFn({ Icono, texto }: { Icono: () => ReactNode; texto: string }) {
  return (
    <p>
      <Icono />
      {texto}
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ CAPSTONE — una página con tres slots, dos de ellos opcionales
 *
 * Sin concepto nuevo: slots nombrados, children, opcionales y &&. Es el esqueleto
 * de layout que vas a escribir en proyectos reales.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 9) Define el tipo PaginaProps y expórtalo (el test lo importa). Debe tener:
 * · titulo   string, obligatoria
 * · cabecera ReactNode, opcional
 * · children ReactNode, obligatoria
 * · pie      ReactNode, opcional
 */
export type PaginaProps = {
  titulo: string;
  cabecera?: ReactNode;
  children: ReactNode;
  pie?: ReactNode;
};

/* 10) Pagina — usa PaginaProps. Retorna un <div> que contenga, en este orden:
 *   · solo si hay cabecera, un <header> con ella dentro
 *   · siempre, un <h1> con el titulo
 *   · siempre, un <main> con el children dentro
 *   · solo si hay pie, un <footer> con él dentro
 * <Pagina titulo="Inicio"><p>Hola</p></Pagina>
 *   →  <div><h1>Inicio</h1><main><p>Hola</p></main></div>
 * <Pagina titulo="Inicio" cabecera={<nav>Menú</nav>} pie={<small>©</small>}>
 *   <p>Hola</p>
 * </Pagina>
 *   →  <div><header><nav>Menú</nav></header><h1>Inicio</h1>
 *       <main><p>Hola</p></main><footer><small>©</small></footer></div>
 */
export function Pagina({ titulo, cabecera, children, pie }: PaginaProps) {
  return (
    <div>
      {cabecera && <header>{cabecera}</header>}
      <h1>{titulo}</h1>
      <main>{children}</main>
      {pie && <footer>{pie}</footer>}
    </div>
  );
}
