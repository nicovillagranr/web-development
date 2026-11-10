import { useEffect, useState } from "react";

/* =============================================================================
 * EJERCICIO 01 — pedir datos en un efecto: cargando, listo o error · bloque 13
 *
 * 📌 RECORDATORIO — del 11: async, await y try/catch, como en tu handleSubmit.
 * Del 12: el efecto corre después de pintar, y lo que devuelve es su limpieza.
 *
 * 🎯 OBJETIVOS
 * · Llamar a una función async desde un efecto.
 * · Llevar los tres estados de una petición: cargando, listo y error.
 * · Tipar lo que llega al catch.
 * · Tratar un 404 como un error, aunque fetch no lo haga.
 *
 * 🟢 CONTEXTO — es la primera mitad de tu usePortfolioData: pedir los proyectos
 * al montar y pintar «Cargando…», la lista o el error. Cancelar al desmontar,
 * Promise.all y Zod llegan en los siguientes archivos.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · la función async va dentro del efecto → drill 1
 * ESCALERA · tu efecto del 1, pieza a pieza → peldaños 1a–1j, encima del 1
 * TEORÍA 2 · cargando, listo o error → drills 2–4
 * ARMARLO TÚ → drill 5
 *
 * ▸ 5 drills + 10 peldaños en orden. Prohibidos any, as, el ! de «confía en mí»
 * (x!) y los eslint-disable.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-01.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito, y uno pasa el test con el fallo dentro:
 * ejecuta los tres comandos. Contesta cada ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-01.pistas.md. Drills 1–5 y la escalera: banco, pestaña 13.
 * ============================================================================= */

/* La forma de un proyecto, recortada de tu ProjectSchema, y la ruta de la API.
 * La API no existe: los tests y el banco responden por ella. */
export type Project = { id: number; name: string; status: string };

// API_PROJECTS Es la ruta de la API
export const API_PROJECTS = "/api/projects";

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — la función async va dentro del efecto
 *
 * DEFINICIÓN
 * Una función async siempre devuelve una promesa, aunque no tenga return. Un
 * efecto solo puede devolver nada o su limpieza, así que no puede ser async: la
 * función async se declara dentro del efecto, y el efecto la llama.
 *
 * SINTAXIS — el título de la pestaña con el nombre de tu perfil:
 * useEffect(() => {
 *   async function load() {
 *     const res = await fetch("/api/profile");
 *     const profile: { name: string } = await res.json();
 *     document.title = profile.name;
 *   }
 *   load();
 * }, []);
 *
 * 🧠 ANALOGÍA — el efecto es el recepcionista: no sale él a hacer el recado, se
 * lo encarga a un mensajero (load) y vuelve a su puesto. A React le entrega su
 * limpieza, no la promesa del mensajero.
 *
 * 🗣️ LAS PIEZAS
 * async function → devuelve Promise<…>: un valor que llega más tarde.
 * await          → espera la promesa dentro de la función async, sin parar React.
 * res.json()     → lee el cuerpo de la respuesta; para TypeScript devuelve any.
 *
 * ⚠️ TRAMPA — escribir useEffect(async () => …): el efecto devuelve una promesa,
 * y React la trata como si fuera su limpieza.
 *
 * 💡 El any de res.json() es un agujero: TypeScript se fía de la anotación que
 * le pongas. Zod lo tapa al final de la carpeta.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — tu efecto del 1, pieza a pieza (refuerzo)
 *
 * Tu efecto del 1 junta diez piezas de sintaxis. Cada peldaño trabaja una, casi
 * siempre fuera de React: A · funciones y promesas (1a–1d) · B · fetch (1e–1g) ·
 * C · try, catch y finally (1h–1i) · D · de vuelta en el efecto (1j).
 * Al terminar, vuelve a tu ¿Por qué? del 1.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ A — funciones y promesas
 *
 * DEFINICIÓN
 * Una función devuelve solo lo que va detrás de return; una flecha sin llaves
 * devuelve lo que va detrás de la flecha. async hace que la función devuelva
 * siempre una promesa: un valor que llegará más tarde. await, dentro de otra
 * función async, espera esa promesa y te da el valor.
 *
 * SINTAXIS
 * const doble = (n: number) => { return n * 2; }; // con llaves, return
 * const triple = (n: number) => n * 3;            // sin llaves, lo de detrás
 * const siete = async (): Promise<number> => 7;   // devuelve Promise<number>
 * const usar = async () => {
 *   const n = await siete(); // 7: esperas la promesa y te quedas el valor
 *   siete();                 // la llamas, y la promesa no la recoge nadie
 * };
 *
 * 🧠 ANALOGÍA — la promesa es el resguardo de un pedido: no es la pizza, pero te
 * la cambian por ella. await es esperar en el mostrador. Si tiras el resguardo,
 * la pizza se hace igual, pero nadie la recoge.
 *
 * 🗣️ LAS PIEZAS
 * return     → entrega un valor a quien llamó, y la función termina.
 * Promise<T> → un T que llegará más tarde.
 * await      → solo dentro de async: espera la promesa y te da el T.
 * `…${x}…`   → plantilla de texto: mete x dentro del texto.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1a) etiquetaDe — la etiqueta de un proyecto en la lista: su nombre y su estado,
 * separados por « · ». Para Projex terminado, «Projex · Terminado». Ahora
 * devuelve undefined.
 * ¿Por qué? La plantilla está bien escrita. ¿Adónde va el texto que construye?
 * Devolvía undefined por 2 razones:
 * No tenía return: Devuelve undefined
 * project.state no es una propiedad del objeto Project, por lo que devolvía undefined también.
 */
export const etiquetaDe = (project: Project) => {
  return `${project.name} · ${project.status}`;
};

/* 1b) contarProyectos — cuántos proyectos hay en la lista. Es async a propósito,
 * para ver qué hace async con lo que devuelves: en código real, una función que
 * no espera nada no sería async.
 * ¿Por qué? Si su return entrega un número, ¿qué devuelve la función entera?
 * Devuelve una promesa de tipo number.
 * El starter estaba mal, ya que como es una función asíncrona esta debería devolver una promesa envolviendo el tipo de dato que en este caso es un <number>
 */
// Cómo la función que se devolverá es asíncrona debemos especificar el tipo de retorno que dará. En este caso el type es de tipo Promesa<number>
export const contarProyectos = async (projects: Project[]): Promise<number> => {
  // Usamos .length, que sirve para cualquier array y devuelve un number: cuántos elementos tiene
  return projects.length;
};

/* 1c) avisoDeProyectos — el aviso de la cabecera: «Tienes 3 proyectos» para una
 * lista de tres. Cuenta con el contarProyectos del 1b. Ahora sale «Tienes
 * [object Promise] proyectos».
 * ¿Por qué? Cuando llamas a contarProyectos, ¿qué te da: el número, o qué?
 * Me da una promesa, el número llega después
 */
export const avisoDeProyectos = async (projects: Project[]): Promise<string> => {
  // Para obtener la cantidad de proyectos dentro de esta función, llamamos a la función hermana contarProyectos
  // PERO. Como contarProyectos también es una función asíncrona, debemos ponerle await para que esta función esté a la espera de esos datos para funcionar.
  const total = await contarProyectos(projects);
  // Retornamos un string con el número dentro; el async lo envuelve en Promise<string>
  return `Tienes ${total} proyectos`;
};

/* 1d) RegistrarVisita — al montar, avisa a la API de que alguien abrió tu
 * portfolio, y pinta «Gracias por pasarte». registrarVisita ya está bien. Ahora,
 * en StrictMode, revienta al montarse.
 * ¿Por qué? ¿Qué le devolvía a React la flecha del efecto del starter?
 * Le devolvía una promesa, y React no sabe qué hacer con eso.
 */

// Creamos la función registrarVisita.
// Es asíncrona (async), por lo que devuelve una Promise<void>.
const registrarVisita = async () => {
  // Enviamos una solicitud POST a la API para registrar una visita.
  // await espera a que fetch resuelva su promesa antes de continuar.
  // No necesitamos guardar la respuesta porque no la utilizamos.
  await fetch("/api/visits", { method: "POST" });
};

// Creamos y exportamos el componente RegistrarVisita.
export function RegistrarVisita() {
  // useEffect permite ejecutar código después de que React monta el componente.
  useEffect(() => {
    // Ejecutamos la función asíncrona para registrar la visita.
    // Importante: no usamos return, así que no entregamos la promesa a React.
    registrarVisita();

    // Array de dependencias vacío, el efecto se ejecuta sólo cuando se monta el componente.
  }, []);

  // Renderizamos el contenido visual del componente.
  return (
    <>
      {/* Mensaje que verá el usuario en pantalla. */}
      <p>Gracias por pasarte</p>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ B — fetch
 *
 * DEFINICIÓN
 * await fetch(url) te da un Response: el sobre, con el status y el cuerpo sin
 * abrir. Leer el cuerpo es otra promesa, res.json(), y para TypeScript es any:
 * se fía de la anotación que le pongas. throw corta la función y la hace
 * fallar; return la termina bien, devuelva lo que devuelva.
 *
 * SINTAXIS — tu perfil:
 * const res = await fetch("/api/profile");            // Response
 * if (!res.ok) throw new Error(`HTTP error — ${res.status}`);
 * const profile: { name: string } = await res.json(); // el cuerpo, ya leído
 *
 * 🧠 ANALOGÍA — fetch es el cartero: te trae el sobre. Abrirlo (res.json()) es
 * otro paso, y también lleva su rato.
 *
 * 🗣️ LAS PIEZAS
 * Response   → la respuesta: status, ok y el cuerpo por leer.
 * res.ok     → true si el status está entre 200 y 299.
 * res.json() → Promise<any>: el cuerpo, leído como JSON.
 * throw x    → la función falla con x, y quien la espera recibe el error.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1e) pedirProyectos — pide la lista a API_PROJECTS y la devuelve. Ahora
 * devuelve la respuesta entera en vez de la lista.
 * ¿Por qué? ¿Qué te da await fetch(…): los proyectos, o qué?
 * Te da un Response, no los proyectos. ¿Cómo hacemos para obtener los proyectos?
 * Lo que debemos hacer es leer el cuerpo de la respuesta y convertir eso en un array de proyectos.
 */
// Creamos y exportamos la función pedirProyectos.
// Es asíncrona (async), por lo que devuelve una promesa.
// Promise<Project[]> indica que la promesa se resolverá con un array de proyectos.
export const pedirProyectos = async (): Promise<Project[]> => {
  // Ejecutamos fetch para solicitar los proyectos a la API.
  // await espera a que fetch resuelva su promesa.
  // res representa la respuesta HTTP del servidor: el sobre.
  const res = await fetch(API_PROJECTS); // El sobre.

  // res.json() lee y convierte el cuerpo de la respuesta a formato JavaScript.
  // await espera a que termine esa conversión.
  // data contiene los proyectos recibidos: el sobre, abierto.
  const data: Project[] = await res.json();

  // Devolvemos el array de proyectos.
  // Como la función es async, ese array se entrega mediante una promesa.
  return data;
};

/* 1f) nombresDeProyectos — pide la lista y devuelve solo los nombres:
 * ["Projex", "Smart Cooler", …]. La API manda proyectos enteros, con la forma de
 * Project. Ahora devuelve los proyectos enteros, y TypeScript no se queja.
 * ¿Por qué? ¿Por qué TypeScript se creyó que data eran nombres?
 * TypeScript no está comprobando realmente qué datos llegaron desde la API, nosotros le estamos indicando qué tipo de data esperamos recibir en la línea 255.
 */
// Project = { id: number; name: string; status: string }

// Creamos y exportamos la función nombresDeProyectos.
// Es asíncrona (async), por lo que devuelve una promesa.
// Promise<string[]> indica que la promesa se resolverá con un array de strings.
export const nombresDeProyectos = async (): Promise<string[]> => {
  // Hacemos la petición a la API para obtener los proyectos.
  const res = await fetch(API_PROJECTS);

  // Convertimos el cuerpo de la respuesta a JavaScript.
  // data contiene un array de proyectos.
  const data: Project[] = await res.json();

  // Recorremos el array de proyectos con map().
  // Extraemos únicamente la propiedad name de cada proyecto.
  // Devolvemos un nuevo array que contiene solamente los nombres.
  return data.map((project) => project.name);
};

/* 1g) pedirOFallar — como pedirProyectos, pero si la API responde con un error
 * (un 404, un 500) tiene que fallar con «HTTP error — 404», o el status que sea.
 * Ahora, con un 404, no falla.
 * ¿Por qué? Con el 404, ¿qué hacía el starter con el Error que construía?
 * El problema estaba en el return. Un objeto Error no es el tipo de dato que debería devolver la función, por eso tuvimos que usar throw.
 */

// Creamos y exportamos la función pedirOFallar.
export const pedirOFallar = async (): Promise<Project[]> => {
  // Hacemos la petición a la API.
  const res = await fetch(API_PROJECTS);
  // En el caso que la petición no sea OK, lanzamos un error.
  if (!res.ok) {
    throw new Error(`HTTP error — ${res.status}`);
  }
  // Si la petición es OK, leemos el cuerpo y lo convertimos en un array de proyectos.
  const data: Project[] = await res.json();
  // Retornamos los proyectos: el sobre, abierto.
  return data;
};

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ C — try, catch y finally
 *
 * DEFINICIÓN
 * try vigila solo las líneas que hay entre sus llaves: si una lanza, el resto del
 * try se salta y corre el catch. finally corre siempre, al final, haya ido bien
 * o mal.
 *
 * SINTAXIS
 * try {
 *   const res = await fetch("/api/profile"); // si la red cae, lanza aquí…
 *   console.log("llegó");                    // …esta se salta…
 * } catch {
 *   console.log("falló");                    // …y corre esta
 * } finally {
 *   console.log("fin");                      // y esta, siempre
 * }
 *
 * 🧠 ANALOGÍA — la red del trapecista: solo protege lo que pasa encima de ella.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1h) mensajeDeCarga — pide la lista y devuelve «2 proyectos cargados», o los
 * que lleguen. Con la red caída no tiene que fallar: devuelve «Sin conexión».
 * Ahora, con la red caída, falla igual. Aquí no hay ninguna línea mal escrita.
 * ¿Por qué? Con la red caída, ¿qué línea lanza el error, y quién lo atrapa?
 * Con la red caída, fetch() no puede conectarse al servidor y su promesa se rechaza.
 * El catch captura ese error y devuelve el mensaje "Sin conexión".
 */
// Creamos la función asíncrona mensajeDeCarga, que devuelve una promesa de tipo string.
export const mensajeDeCarga = async (): Promise<string> => {
  // try: contiene el código que intentaremos ejecutar y cuyas posibles excepciones queremos capturar.
  try {
    // Hacemos la petición a la API.
    const res = await fetch(API_PROJECTS);

    // Comprobamos si la respuesta HTTP fue satisfactoria.
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    // Convertimos la respuesta en un array de proyectos.
    const data: Project[] = await res.json();

    // Devolvemos la cantidad de proyectos cargados.
    return `${data.length} proyectos cargados`;

    // catch: captura los errores producidos dentro del try y permite definir cómo reaccionar ante ellos.
  } catch {
    // Si ocurre un error de conexión, HTTP o lectura de datos,
    // devolvemos este mensaje.
    return "Sin conexión";
  }
};

/* 1i) cargarConAvisos — avisa «cargando» al empezar, «error» si falla y «listo»
 * al terminar, haya ido bien o mal. Ahora, con la red caída, «listo» no llega.
 * Sin escribir avisar("listo") dos veces: con dos copias, un cambio futuro
 * tendría que acordarse de las dos.
 * ¿Por qué? En el starter, ¿en qué caso llegaba «listo» y en cuál no?
 * listo salía siempre que el fetch salía bien.
 * Si había un error 404 0 500 sí salía listo, ya que el starter ni siquiera abarcaba esos casos.
 * En los casos donde no salía listo era en fallos de conexión.
 */
// Creamos la función asíncrona cargarConAvisos que recibe una función que retorna un string y la llamamos avisar.
export const cargarConAvisos = async (avisar: (paso: string) => void) => {
  try {
    // Avisamos que comenzó la carga.
    avisar("cargando");

    // Hacemos la petición a la API.
    const res = await fetch(API_PROJECTS);

    // Si la respuesta HTTP no fue correcta, lanzamos un error.
    if (!res.ok) {
      throw new Error("Error en la petición");
    }

    // Guardamos los datos recibidos.
    const data: Project[] = await res.json();

    // Comunicamos cuántos proyectos recibimos.
    avisar(`${data.length} proyectos`);

    // Retornamos la data
    return data;
  } catch {
    // Si ocurre un error, avisamos.
    avisar("error");
  } finally {
    // Esto se ejecuta tanto si hubo error como si todo salió bien.
    avisar("listo");
  }
};

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ D — de vuelta en el efecto
 *
 * Llamar a una función async no espera: la llamada arranca el recado y la línea
 * siguiente corre enseguida. Lo que va detrás de un await, dentro de la función,
 * corre más tarde, cuando llega la respuesta.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1j) ListaConEspera — tu ListaDeProyectos sin el try: «Cargando…» mientras
 * llegan los datos, y luego la lista. Ahora «Cargando…» no llega a verse: la
 * tarjeta se queda en blanco y, al rato, salen los proyectos. Aquí no hay
 * ninguna línea mal escrita.
 * ¿Por qué? ¿Qué corre antes: el setLoading(false) o el setProjects(data)?
 * Con el starter:
 * Lo que corre antes es el setLoading(false): cargar() no espera, y el setProjects(data) va detrás de dos await, así que corre cuando llega la respuesta.
 */
// Componente ListaConEspera
export function ListaConEspera() {
  // Seteamos el estado inicial de projects que será un array vacío a la espera de objetos type Project.
  const [projects, setProjects] = useState<Project[]>([]);
  // Seteamos el estado inicial de loading en true, para indicarle al usuario que la respuesta de la API está cargando.
  const [loading, setLoading] = useState(true);

  // Una vez montado el componente, ejecutamos el efecto
  useEffect(() => {
    // Función asincrónica que se ejecuta cuando el componente se monta.
    const cargarProyectos = async () => {
      try {
        // Paso 1: Hacer la petición a la API.
        const res = await fetch(API_PROJECTS);
        // Paso 2: Leer el cuerpo de la respuesta, convertirlo de JSON a JavaScript y guardarlo en una variable.
        const data = await res.json();
        // Paso 3: Seteamos el estado de projects que era un array vacío con la data recibira. Se llena el array con la data.
        setProjects(data);
        // Finally: se ejecuta siempre, haya ido bien o mal.
      } finally {
        // Paso 4: Seteamos el estado de loading en false, para indicarle al usuario que la respuesta de la API ya está cargada.
        setLoading(false);
      }
    };
    // Paso 5: Ejecutamos la función cargarProyectos.
    cargarProyectos();

    // Array de dependencias vacío: El efecto se ejecuta solo cuando el componente se monta.
  }, []);

  // Renderizado condicional: El usuario verá esto sólo cuando la data esté cargando.
  if (loading) {
    return <p>Cargando…</p>;
  }

  // Una vez cargada la data, el componente se renderiza.
  return (
    <ul aria-label="Proyectos">
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}

/* 1) ListaDeProyectos — pide los proyectos al montar. Mientras llegan, pinta
 * «Cargando…»; después, un <li> por proyecto con su nombre. Arregla el efecto
 * sin cambiar lo que hace.
 * ¿Por qué? ¿Qué devuelve una función async, aunque no tenga return? ¿Y qué hace
 * React con lo que devuelve un efecto?
 * Lo que devuelve una función async es una promesa. React la trata como si fuera
 * su limpieza.
 */

export function ListaDeProyectos() {
  // Seteamos el estado inicial de projects que será un array vacío a la espera de objetos type Project.
  const [projects, setProjects] = useState<Project[]>([]);
  // Seteamos el estado inicial de loading en true, para indicarle al usuario que la respuesta de la API está cargando.
  const [loading, setLoading] = useState(true);

  // Una vez montado el componente, ejecutamos el efecto
  useEffect(() => {
    // Función asincrónica que se ejecuta cuando el componente se monta.
    const fetchProjects = async () => {
      try {
        // Paso 1: Hacemos la petición a la API.
        const res = await fetch(API_PROJECTS);
        // Si la respuesta no es OK, lanzamos un error: se salta el resto del try y corre el catch.
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        // Paso 2: Leemos el cuerpo de la respuesta, lo convertimos de JSON a JavaScript y lo guardamos en data.
        const data: Project[] = await res.json();
        // Paso 3: Seteamos el estado de projects que era un array vacío con la data recibira. Se llena el array con la data.
        setProjects(data);
        // Si algo falla (la red, o el error HTTP que lanzamos arriba), lo capturamos y lo mostramos en consola.
      } catch (error) {
        console.error("Error cargando proyectos:", error);
        // Finally: se ejecuta siempre, haya ido bien o mal.
      } finally {
        // Paso 4: Seteamos el estado de loading en false, para indicarle al usuario que la respuesta de la API ya está cargada.
        setLoading(false);
      }
    };
    // Paso 5: Llamamos a la función fetchProjects para que se ejecute.
    fetchProjects();
    // Array de dependencias vacío: El efecto se ejecuta solo una vez, cuando el componente se monta.
  }, []);

  // Mientras loading es true, se renderiza para el usuario el mensaje de cargando.
  if (loading) {
    return <p>Cargando…</p>;
  }

  // Cuando loading es false, se renderiza la lista de proyectos.
  return (
    <ul aria-label="Proyectos">
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — cargando, listo o error
 *
 * DEFINICIÓN
 * Una petición pasa por tres estados: cargando (aún no hay respuesta), listo
 * (llegaron los datos) o error. loading empieza en true y se apaga en los dos
 * finales. Y fetch solo rechaza si la petición no llega: un 404 o un 500 llegan
 * como una respuesta normal, con res.ok en false.
 *
 * SINTAXIS — el perfil, con sus tres estados:
 * try {
 *   const res = await fetch("/api/profile");
 *   if (!res.ok) throw new Error(`HTTP error — ${res.status}`);
 *   setProfile(await res.json());
 * } catch (err) {
 *   setError(err instanceof Error ? err.message : "Error desconocido");
 * } finally {
 *   setLoading(false);
 * }
 *
 * 🧠 ANALOGÍA — el pedido a domicilio: «en camino», «entregado» o «cancelado».
 * Que el repartidor llegue con la bolsa equivocada no es que no haya llegado:
 * hay que abrirla y mirar (res.ok).
 *
 * 🗣️ LAS PIEZAS
 * res.ok      → true si el status está entre 200 y 299.
 * res.status  → el número: 200, 404, 500…
 * catch (err) → err es unknown: con throw se puede lanzar cualquier cosa.
 * finally     → corre siempre, haya ido bien o mal.
 *
 * ⚠️ TRAMPA — apagar loading solo en el camino feliz: si algo falla, la pantalla
 * se queda en «Cargando…» para siempre.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2) ProyectosSinRed — con la red caída tiene que salir «No se pudieron cargar
 * los proyectos» en un role="alert". Ahora se queda en «Cargando…» para siempre.
 * Con la red bien, la lista, como en el 1.
 * ¿Por qué? Con la red caída, ¿qué líneas del try ya no llegaron a correr?
 *  Las líneas que ya no llegarían a correr son las de setProjects(data) y setLoading(false).
 */
export function ProyectosSinRed() {
  // Seteamos el estado inicial de projects que será un array vacío a la espera de objetos type Project.
  const [projects, setProjects] = useState<Project[]>([]);
  // Seteamos el estado inicial de loading en true, para indicarle al usuario que la respuesta de la API está cargando.
  const [loading, setLoading] = useState(true);
  // Seteamos el estado inicial de error en null, con setError le pasamos el mensaje de error y puede pasar a string
  const [error, setError] = useState<string | null>(null);

  // Una vez montado el componente, ejecutamos el efecto
  useEffect(() => {
    // Función asincrónica que se ejecuta cuando el componente se monta.
    const fetchProjects = async () => {
      try {
        // Paso 1: Hacemos la petición a la API.
        const res = await fetch(API_PROJECTS);
        // Si la respuesta no es OK, lanzamos un error: se salta el resto del try y corre el catch.
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        // Paso 2: Leemos el cuerpo de la respuesta, lo convertimos de JSON a JavaScript y lo guardamos en data.
        const data: Project[] = await res.json();

        // Paso 3: Seteamos el estado de projects que era un array vacío con la data recibira. Se llena el array con la data.
        setProjects(data);

        // Si algo falla (la red, o el error HTTP que lanzamos arriba), lo capturamos y lo mostramos en consola.
      } catch (error) {
        console.error("Error cargando proyectos:", error);

        // Seteamos el valor de error de null a string
        setError("No se pudieron cargar los proyectos");

        // Finally: se ejecuta siempre, haya ido bien o mal.
      } finally {
        // Paso 4: Seteamos el estado de loading en false, para indicarle al usuario que la respuesta de la API ya está cargada.
        setLoading(false);
      }
    };
    // Paso 5: Llamamos a la función fetchProjects para que se ejecute.
    fetchProjects();
    // Array de dependencias vacío: El efecto se ejecuta solo una vez, cuando el componente se monta.
  }, []);

  if (loading) {
    return <p>Cargando…</p>;
  }
  if (error) {
    return <p role="alert">{error}</p>;
  }
  if (projects.length === 0) {
    return <p>No hay proyectos</p>;
  }

  return (
    <ul aria-label="Proyectos">
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}

/* 3) MotivoDelError — en vez de un texto fijo, el role="alert" enseña el
 * mensaje del error: «Failed to fetch» si la red está caída. Si lo que llega al
 * catch no es un Error, «Error desconocido».
 * ¿Por qué? ¿Por qué TypeScript no te deja dar por hecho que lo que llega al
 * catch es un Error?
 * Porque TypeScript/JavaScript permite lanzar cualquier tipo de valor, no solamente objetos Error
 * Por eso usamos instanceof Error: "Este valor es una instancia de la clase Error"?
 * - Si responde que sí, podemos acceder a la propiedad "message"
 * - Si responde que no, renderizamos un mensaje genérico: El else que está dentro del catch
 */
export function MotivoDelError() {
  // Seteamos el estado inicial de projects como un array vacío a la espera de objetos de tipo Project
  const [projects, setProjects] = useState<Project[]>([]);
  // Seteamos el estado inicial de loading en true, para indicarle al usuario que la respuesta de la API está cargando.
  const [loading, setLoading] = useState(true);
  // Seteamos el estado inicial de error en null, con setError le pasamos el mensaje de error y puede pasar a string
  const [error, setError] = useState<string | null>(null);

  // Una vez montado el componente, ejecutamos el efecto
  useEffect(() => {
    // Función asíncrona que se ejecuta cuando el componente se monta
    const load = async () => {
      try {
        // Paso 1: Hacemos el llamado a la API
        const res = await fetch(API_PROJECTS);
        // Si la respuesta no es OK, lanzamos un error: Se salta el resto del try y corre el catch
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        // Paso 2: Leemos el cuerpo de la respuesta, lo convertimos de JSON a objeto de JS y lo guardamos en la const data
        const data: Project[] = await res.json();

        // Paso 3: Con la función setProjects, actualizamos el estado de projects con la data
        setProjects(data);

        // Si algo del try lanza (el fetch, el throw o res.json()), se salta lo que queda y corre el catch
      } catch (err) {
        // Comprobamos si lo recibido es realmente un Error.
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        // Finally: se ejecuta siempre, haya ido bien o mal: apagamos loading en los dos caminos
        setLoading(false);
      }
    };
    // Paso 0: Llamamos a la función load
    load();
  }, []);

  // Cuando loading esté en true, pintamos un mensaje de carga al usuario
  if (loading) {
    return <p>Cargando…</p>;
  }

  // Si hay un error, pintamos el mensaje de error
  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <ul aria-label="Proyectos">
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}

/* 4) ProyectosQueNoEstan — la ruta de la API cambió y responde 404, con el cuerpo
 * { message: "Not found" }. Ahora la página revienta al pintar. Tiene que salir
 * el role="alert" con «HTTP error — 404», como en tu usePortfolioData.
/*
 * ¿Por qué, con el 404, fetch no saltó al catch?
 *
 * Porque fetch() no considera los errores HTTP (como 404 o 500)
 * como errores de conexión. La petición se completó y el servidor
 * respondió, aunque lo hizo con un estado HTTP fallido.
 *
 * Por eso necesitamos comprobar res.ok. Si es false, lanzamos
 * un error con throw, que interrumpe el try y hace que se ejecute
 * el catch.
 */
export function ProyectosQueNoEstan() {
  /// Seteamos el estado inicial de projects que será un array vacío a la espera de objetos type Project.
  const [projects, setProjects] = useState<Project[]>([]);
  // Seteamos el estado inicial de loading en true, para indicarle al usuario que la respuesta de la API está cargando.
  const [loading, setLoading] = useState(true);
  // Seteamos el estado inicial de error en null, con setError le pasamos el mensaje de error y puede pasar a string
  const [error, setError] = useState<string | null>(null);

  // Una vez montado el componente, ejecutamos el efecto
  useEffect(() => {
    // Función asíncrona que se ejecuta cuando el componente se monta
    async function load() {
      try {
        // Paso 1: Hacemos el llamado a la API
        const res = await fetch(API_PROJECTS);

        // Si la respuesta no es OK, lanzamos un error: Se salta el resto del try y corre el catch
        if (!res.ok) {
          throw new Error(`HTTP error — ${res.status}`);
        }

        // Paso 2: Leemos el cuerpo de la respuesta, lo convertimos de JSON a objeto de JS y lo guardamos en la const data
        const data: Project[] = await res.json();

        // Paso 3: Con la función setProjects, actualizamos el estado de projects con la data
        setProjects(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <p>Cargando…</p>;
  }
  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <ul aria-label="Proyectos">
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ARMARLO TÚ — la primera mitad de tu usePortfolioData
 *
 * Tu hook pide /projects y /profile a la vez, cancela al desmontar y valida con
 * Zod. Aquí, solo /projects: lo demás llega en los siguientes archivos.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) useProjects — los drills 1 a 4 en un hook, para que cualquier sección lo
 * use. Devuelve { projects, loading, error }: error es el mensaje del error,
 * como en el 3 y el 4, o null. SeccionProyectos ya está bien: solo falla el
 * hook, que hoy se queda siempre en «Cargando…».
 * ¿Por qué? ¿Por qué loading empieza en true, y no en false?
 * Siempre que uno abre una App que necesita data, como Youtube, el usuario está a la espera de recibir los datos que quiere ver.
 * Durante esta espera loading debe ser true, y el desarrollador puede decidir si mostrarle un skeleton temporal para no arruinar la experiencia del usuario o no perderlo.
 */

export function useProjects(): {
  projects: Project[];
  loading: boolean;
  error: string | null;
} {
  // Seteamos el estado inicial de projects como un array vacío.
  const [projects, setProjects] = useState<Project[]>([]);

  // Loading comienza en true porque la petición todavía está pendiente.
  const [loading, setLoading] = useState(true);

  // Error comienza en null y puede pasar a contener un mensaje string.
  const [error, setError] = useState<string | null>(null);

  // Una vez montado el componente, ejecutamos el efecto.
  useEffect(() => {
    // Función asíncrona que realiza la petición.
    const loadProjects = async () => {
      try {
        // Paso 1: Hacemos el llamado a la API.
        const res = await fetch(API_PROJECTS);

        // Si la respuesta no es OK, lanzamos un error.
        if (!res.ok) {
          throw new Error(`HTTP error — ${res.status}`);
        }

        // Paso 2: Leemos y convertimos el cuerpo de la respuesta.
        const data: Project[] = await res.json();

        // Paso 3: Actualizamos el estado con los proyectos recibidos.
        setProjects(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ha ocurrido un error inesperado");
        }
      } finally {
        // La carga termina tanto si la petición tuvo éxito como si falló.
        setLoading(false);
      }
    };

    // Ejecutamos la función asíncrona.
    loadProjects();
  }, []);

  // Devolvemos los estados actuales, no valores fijos.
  return { projects, loading, error };
}

export function SeccionProyectos() {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return <p>Cargando…</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section aria-label="Mis proyectos">
      <h2>Proyectos</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name} · {project.status}
          </li>
        ))}
      </ul>
    </section>
  );
}
