import { useEffect, useState } from "react";

/* =============================================================================
 * EJERCICIO 02 — cancelar la petición: AbortController en la limpieza · bloque 13
 *
 * 📌 RECORDATORIO — del 01: la función async va dentro del efecto, y una petición
 * acaba en listo o en error. Del 12: la limpieza corre al desmontar y antes de
 * repetir el efecto, y en pnpm dev StrictMode hace un ensayo nada más montar:
 * monta, limpia y vuelve a montar.
 *
 * 🎯 OBJETIVOS
 * · Cancelar un fetch con AbortController.
 * · Distinguir en el catch una cancelación de un error de verdad.
 * · Cancelar en la limpieza del efecto la petición que ya no hace falta.
 *
 * 🟢 CONTEXTO — tu useProjects del 01 espera la respuesta aunque ya nadie la
 * quiera. Si cierras la sección, la petición sigue viva; si pides otra cosa antes
 * de que llegue, la vieja puede llegar tarde y pisar a la nueva. Tu
 * usePortfolioData lo resuelve con las piezas de este archivo.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · el mando de la petición → drills 1–2
 * TEORÍA 2 · cancelar en la limpieza → drills 3–4
 * ESCALERA · el catch del 4, pieza a pieza → peldaños 4a–4i, debajo del 4
 * ARMARLO TÚ → drill 5
 *
 * ▸ 5 drills + 9 peldaños en orden. Prohibidos any, as, el ! de «confía en mí»
 * (x!) y los eslint-disable.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-02.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-02.pistas.md. Drills 1–5 y la escalera: banco, pestaña 13.
 * ============================================================================= */

/* La forma de un proyecto y la ruta de la API, las mismas del 01. La API sigue
 * sin existir: los tests y el banco responden por ella. */
export type Project = { id: number; name: string; status: string };

export const API_PROJECTS = "/api/projects";

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el mando de la petición
 *
 * DEFINICIÓN
 * Un AbortController cancela una petición en vuelo. Su signal viaja a fetch
 * dentro de las opciones, y llamar a abort() la cancela: la promesa de fetch
 * rechaza, y la cancelación llega al catch como si fuera un error. Para
 * distinguirla, signal.aborted pasa a true en cuanto se llama a abort().
 *
 * SINTAXIS — pedir tu perfil con un mando, y cancelarlo antes de que llegue:
 * const controller = new AbortController();
 * const peticion = fetch("/api/profile", { signal: controller.signal });
 * controller.abort();        // peticion rechaza, aunque la red vaya bien
 * controller.signal.aborted; // → true
 *
 * 🧠 ANALOGÍA — el pedido a domicilio otra vez: abort() es llamar para anularlo.
 * El repartidor da media vuelta y te llega «pedido cancelado», que no se lee
 * igual que «no encontramos tu dirección»: no falló nada, lo anulaste tú.
 *
 * 🗣️ LAS PIEZAS
 * AbortController    → el mando. Uno por petición, con new.
 * controller.signal  → la señal que escucha la petición: es la que viaja a fetch.
 * controller.abort() → aprieta el botón: cancela lo que escucha esa señal.
 * signal.aborted     → true si ya se apretó el botón.
 *
 * ⚠️ TRAMPA — pintar la cancelación como un error más: el usuario vería un aviso
 * rojo por algo que no falló.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) pedirCancelable — pide la lista a API_PROJECTS y la devuelve, pero con el
 * signal que recibe, para que quien la llame pueda cancelarla. Ahora cancelar no
 * cancela nada: la lista llega igual.
 * ¿Por qué? En el starter, fetch recibe el signal: ¿por qué no le hace caso?
 * Como segundo parámetro, fetch no espera una función, sino un objeto de configuración (RequestInit)
 * Para que fetch pueda cancelar la petición cuando lo necesite, pasamos signal dentro de ese objeto
 */
// Función asíncrona que recibe un AbortSignal y devuelve una promesa con un array de Project.
export async function pedirCancelable(signal: AbortSignal): Promise<Project[]> {
  // Realizamos la petición HTTP a la API_PROJECTS.
  // El objeto { signal } permite que fetch escuche las solicitudes de cancelación.
  const res = await fetch(API_PROJECTS, { signal });

  // Convertimos la respuesta HTTP a formato JSON y tipamos el resultado como un array de Project.
  const projects: Project[] = await res.json();

  // Devolvemos el array de proyectos obtenido desde la API.
  return projects;
}

/* 2) avisoDeCarga — devuelve «2 proyectos cargados», o los que lleguen. Si falla,
 * el mensaje del error, y si la cancelaron, «Carga cancelada». Ahora una
 * cancelación sale como un error más, con su propio mensaje.
 * ¿Por qué? En el catch del starter, ¿qué diferencia hay entre una cancelación y
 * la red caída?
 * La diferencia está en que nosotros estamos buscando específicamente la cancelación del abort, por eso usamos un if especificando nuestra búsqueda y un return para el "por defecto"
 */

// La función avisoDeCarga() es una función asíncrona que recibe un objeto AbortSignal como parámetro,
// realiza una petición HTTP a la API_PROJECTS y devuelve una Promise<string>.
// Si la petición es exitosa, devuelve un mensaje indicando la cantidad de proyectos cargados.
// Si ocurre un error (incluida una cancelación), captura la excepción y devuelve su mensaje.

export async function avisoDeCarga(signal: AbortSignal): Promise<string> {
  // Ejecuta el código que podría producir un error.
  // Si todo sale bien, continúa normalmente.
  try {
    // Paso 1: Hacemos el llamado a la API con 2 parámetros:
    // 1. API_PROJECTS: la URL del endpoint al que queremos hacer la petición.
    // 2. { signal }: objeto de configuración que permite a fetch escuchar una señal de cancelación (AbortSignal).
    const res = await fetch(API_PROJECTS, { signal });

    // Paso 2: Leemos el cuerpo de la respuesta, lo convertimos de JSON a objeto de JS y lo guardamos en la const data
    const data: Project[] = await res.json();

    // Paso 3: Retornamos la data en formato string
    return `${data.length} proyectos cargados`;

    // Captura el error si algo falla dentro del try.
    // Permite manejarlo sin que la aplicación se interrumpa inesperadamente.
  } catch (err) {
    // Si el error capturado es una instancia de Error y además su propiedad name es "AbortError",
    // significa que la petición fue cancelada. Le devolvemos al usuario "Carga cancelada".
    if (err instanceof Error && err.name === "AbortError") {
      return "Carga cancelada";
    }

    // Si el error no corresponde a una cancelación, devolvemos su mensaje original.
    // Si no es una instancia de Error, devolvemos un mensaje genérico.
    return err instanceof Error ? err.message : "Error desconocido";
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — cancelar en la limpieza
 *
 * DEFINICIÓN
 * Cada pasada del efecto crea su propio controller, y su limpieza llama a
 * abort(): al desmontar o al repetir el efecto, la petición que ya no sirve se
 * cancela. Y esa petición cancelada no toca el estado: en el catch, si su signal
 * está abortado, se sale sin más.
 *
 * SINTAXIS — tu perfil, cancelable:
 * useEffect(() => {
 *   const controller = new AbortController();
 *   async function load() {
 *     try {
 *       const res = await fetch("/api/profile", { signal: controller.signal });
 *       setProfile(await res.json());
 *     } catch (err) {
 *       if (controller.signal.aborted) return;
 *       setError(err instanceof Error ? err.message : "Error desconocido");
 *     }
 *   }
 *   load();
 *   return () => controller.abort();
 * }, []);
 *
 * 🧠 ANALOGÍA — si te mudas antes de que llegue el pedido, lo anulas al salir por
 * la puerta: eso es la limpieza. Y el aviso de «cancelado» no lo apuntas como una
 * queja contra la tienda.
 *
 * ⚠️ TRAMPA — el ensayo de StrictMode cancela siempre la primera petición. Si la
 * cancelada toca el estado, aunque sea desde un finally, la pantalla se entera de
 * algo que no pasó.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) ProyectosAlCerrar — pinta «Cargando…» y después la lista, como en el 01. Si
 * la sección se cierra antes de que lleguen, la petición tiene que cancelarse. El
 * controller ya está creado y su signal llega a fetch. Ahora, al cerrar, la
 * petición sigue viva.
 * ¿Por qué? ¿Por qué el controller se crea en el efecto, y no dentro de load?
 * Porque el AbortController necesita vivir en el mismo contexto que administra el ciclo de vida del componente, y ese contexto es el useEffect.
 */
export function ProyectosAlCerrar() {
  // Inicializamos projects como un array vacío de objetos Project.
  // setProjects nos permitirá actualizar ese estado cuando recibamos los datos de la API.
  const [projects, setProjects] = useState<Project[]>([]);
  // Inicializamos loading en true para mostrar una pantalla de carga
  // mientras esperamos la respuesta de la API.
  const [loading, setLoading] = useState(true);

  // Ejecutamos el efecto después del primer renderizado del componente.
  useEffect(() => {
    // Creamos un AbortController para poder cancelar la petición HTTP si el componente se desmonta antes de recibir la respuesta.
    const controller = new AbortController();

    // Creamos una función asíncrona encargada de solicitar los proyectos a la API
    // y actualizar los estados projects y loading según el resultado.
    const load = async () => {
      // Ejecuta el código que podría producir un error.
      // Si todo sale bien, continúa normalmente.
      try {
        const res = await fetch(API_PROJECTS, { signal: controller.signal });
        const data: Project[] = await res.json();
        setProjects(data);
        setLoading(false);

        // Captura el error si algo falla dentro del try.
        // Permite manejarlo sin que la aplicación se interrumpa inesperadamente.
      } catch {
        // Comprobamos si la petición fue cancelada.
        // Si el signal está abortado, salimos de la función para no continuar ejecutando código innecesario.
        if (controller.signal.aborted) {
          return;
        }
        setLoading(false);
      }
    };
    load();
    // Cancelamos la petición al desmontar el componente para evitar
    // mantener solicitudes innecesarias en segundo plano.
    return () => controller.abort();
    // Array de dependencias vacío. El efecto se ejecuta cuando se monta y demonta el componente.
  }, []);

  // Estado inicial de loading en true. Renderizamos un mensaje de cargando
  if (loading) {
    return <p>Cargando…</p>;
  }

  // Solicitud exitosa. Renderizamos la lista de proyectos.
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}

/* 4) CancelacionSilenciosa — en pnpm dev, nada más abrirse, la sección enseña un
 * aviso rojo, aunque la API va bien. La petición cancelada no tiene que tocar el
 * estado: ni error ni loading. Un error de verdad, como la red caída, tiene que
 * seguir saliendo en el role="alert".
 * ¿Por qué? Con el starter, ¿por qué el aviso no se va cuando llega la lista?
 * Porque la petición cancelada del ensayo cae en el catch y guarda su mensaje en error, y la buena solo toca projects y loading: nadie vuelve error a null. Como el if (error) va antes de la lista, el aviso se queda aunque la lista haya llegado.
 */
export function CancelacionSilenciosa() {
  // Inicializamos projects como un array vacío de objetos Project.
  // setProjects nos permitirá actualizar ese estado cuando recibamos los datos de la API.
  const [projects, setProjects] = useState<Project[]>([]);
  // Inicializamos loading en true para mostrar una pantalla de carga
  // mientras esperamos la respuesta de la API.
  const [loading, setLoading] = useState(true);
  // Inicializamos error como null, luego lo actualizaremos con la función setError.
  const [error, setError] = useState<string | null>(null);

  // Ejecutamos el efecto después del primer renderizado del componente.
  useEffect(() => {
    // Creamos un AbortController para poder cancelar la petición HTTP si el componente se desmonta antes de recibir la respuesta.
    const controller = new AbortController();

    // Creamos una función asíncrona encargada de solicitar los proyectos a la API
    // y actualizar los estados projects y loading según el resultado.
    const load = async () => {
      // Ejecuta el código que podría producir un error.
      // Si todo sale bien, continúa normalmente.
      try {
        // Hacemos la petición HTTP a la API_PROJECTS, pasando el signal del controller para poder cancelarla si es necesario.
        const res = await fetch(API_PROJECTS, { signal: controller.signal });
        // Comprobamos si la respuesta HTTP es exitosa (código de estado 2xx). Si no lo es, lanzamos un error con el código de estado.
        if (!res.ok) {
          throw new Error(`HTTP error — ${res.status}`);
        }
        // Convertimos la respuesta HTTP a formato JSON y tipamos el resultado como un array de Project.
        const data: Project[] = await res.json();
        // Actualizamos el estado projects con los datos obtenidos de la API.
        setProjects(data);
        // Actualizamos el estado loading a false, indicando que la carga ha finalizado.
        setLoading(false);
      } catch (err) {
        // Comprobamos si la petición fue cancelada.
        // Si fue así, salimos sin modificar ningún estado.
        if (controller.signal.aborted) {
          return;
        }
        // Si fue un error real, guardamos su mensaje.
        setError(err instanceof Error ? err.message : "Error desconocido");
        setLoading(false);
      }
    };
    // Llamamos a la función load() para iniciar la carga de proyectos.
    load();
    // Cancelamos la petición al desmontar el componente para evitar
    // mantener solicitudes innecesarias en segundo plano.
    return () => controller.abort();
  }, []);

  // Render inicial, mientras loading sea true
  if (loading) {
    return <p>Cargando…</p>;
  }

  // Si error pasa de null a string, lo pintamos
  if (error) {
    return <p role="alert">{error}</p>;
  }

  // Solicitud exitosa. Renderizamos la lista de proyectos.
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — el catch del 4, pieza a pieza (refuerzo)
 *
 * El catch de tu drill 4 junta varias piezas, y el 5 las lleva a un efecto que se
 * repite. Cada peldaño trabaja una: A · lo que llega al catch (4a) · B · los tres
 * caminos de una carga (4b–4e) · C · de vuelta en el componente, con id (4f–4i).
 * Al terminar, vuelve a tu ¿Por qué? del 4.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ A — lo que llega al catch
 *
 * DEFINICIÓN
 * Al catch llega lo que se lanzó, sea lo que sea: un Error, un texto suelto o el
 * motivo de una cancelación. Por eso err es unknown, y TypeScript no deja leerle
 * nada hasta comprobar qué es.
 *
 * SINTAXIS — el nombre del error, o «sin nombre»:
 * catch (err) {
 *   const nombre = err instanceof Error ? err.name : "sin nombre";
 * }
 *
 * 🗣️ LAS PIEZAS
 * unknown              → «no sé qué es»: no deja leer nada sin comprobar antes.
 * err instanceof Error → true si err es un Error; dentro, ya se puede leer .name.
 * c ? a : b            → si c, a; si no, b. Un if/else que da un valor.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4a) mensajeDe — el texto del aviso: el mensaje del error si es un Error, o
 * «Error desconocido» si llegó otra cosa, como un texto suelto.
 */
export function mensajeDe(err: unknown): string {
  // Comprobamos si err es una instancia de Error.
  // Si lo es, devolvemos su mensaje; si no, devolvemos un mensaje genérico.
  return err instanceof Error ? err.message : "Error desconocido";
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ B — los tres caminos de una carga
 *
 * DEFINICIÓN
 * Una carga acaba por uno de tres caminos: bien, error o cancelada. Los dos
 * primeros apagan loading; la cancelada no toca nada. return dentro del catch
 * sale de la función entera, pero el finally corre igual, también después de
 * ese return.
 *
 * SINTAXIS
 * try {
 *   await fetch("/api/profile");
 * } catch {
 *   return;               // sale de la función entera…
 * } finally {
 *   console.log("fin");   // …pero el finally corre igual
 * }
 * console.log("después"); // con el return de arriba, esta ya no corre
 *
 * Aquí no hay estado: cada función recibe apuntar y apunta el set que haría tu
 * componente. Lo que esperan los tests, por camino:
 * bien      → setProjects(2 proyectos) · setLoading(false)
 * error     → setError(Failed to fetch) · setLoading(false)
 * cancelada → nada
 *
 * 🧠 ANALOGÍA — el pedido que anulaste tú: no apuntas una queja ni lo marcas como
 * entregado. La hoja del pedido se queda como estaba.
 *
 * ⚠️ TRAMPA — una guardia que no corta: si llega tarde, o si detrás hay un finally,
 * la cancelada apunta igual.
 * ───────────────────────────────────────────────────────────────────────────── */
// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------

/* Lo que reciben los peldaños de B: apunta un cambio de estado, como texto. */
type Apuntar = (cambio: string) => void;

/* 4b) cargarB — la cancelada no tiene que apuntar nada. Ahora apunta el error,
 * con el texto de la cancelación, y apaga loading, como si fuera un fallo.
 * ¿Por qué? Si esto fuera tu componente, ¿qué vería el usuario después de esa
 * cancelación?
 * No vería nada, porque la cancelación no debería afectar el estado del componente. Sin embargo, en este caso, la cancelación está siendo tratada como un error, lo que provoca que se apunte un mensaje de error y se apague el estado de carga, lo que podría confundir al usuario.
 * En el banco de pruebas(Componente padre), si tenemos un render condicional que le dice al usuario "Apunta: Nada"
 */

// Creamos una función asíncrona llamada cargarB que recibe un AbortSignal y una función Apuntar como parámetros.
export async function cargarB(signal: AbortSignal, apuntar: Apuntar): Promise<void> {
  // Ejecuta el código que podría producir un error.
  // Si todo sale bien, continúa normalmente.
  try {
    // Paso 1: Hacemos el llamado a la API con 2 parámetros:
    // 1. API_PROJECTS: la URL del endpoint al que queremos hacer la petición.
    // 2. { signal }: objeto de configuración que permite a fetch escuchar una señal de cancelación (AbortSignal).
    const res = await fetch(API_PROJECTS, { signal });
    // Paso 2: Leemos el cuerpo de la respuesta, lo convertimos de JSON a objeto de JS y lo guardamos en la const data
    const data: Project[] = await res.json();
    // Paso 3: Apuntamos la cantidad de proyectos obtenidos.
    apuntar(`setProjects(${data.length} proyectos)`);
    // Paso 4: Apuntamos que la carga ha finalizado.
    apuntar("setLoading(false)");

    // Captura el error si algo falla dentro del try.
  } catch (err) {
    // Comprobamos si la petición fue cancelada.
    // Si fue así, salimos sin modificar ningún estado.
    if (signal.aborted) {
      return;
    }
    // Si fue un error real, apuntamos su mensaje.
    apuntar(`setError(${err instanceof Error ? err.message : "Error desconocido"})`);
    apuntar("setLoading(false)");
  }
}

// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------

/* 4c) cargarC — aquí la guardia ya está, pero la cancelada todavía apunta algo.
 * Tiene que no apuntar nada, y la red caída, lo de siempre.
 */

// Creamos una función asíncrona llamada cargarC que recibe un AbortSignal y una función Apuntar como parámetros.
export async function cargarC(signal: AbortSignal, apuntar: Apuntar): Promise<void> {
  // Ejecuta el código que podría producir un error.
  // Si todo sale bien, continúa normalmente.
  try {
    // Paso 1: Hacemos el llamado a la API con 2 parámetros:
    // 1. API_PROJECTS: la URL del endpoint al que queremos hacer la petición.
    // 2. { signal }: objeto de configuración que permite a fetch escuchar una señal de cancelación (AbortSignal).
    const res = await fetch(API_PROJECTS, { signal });
    // Paso 2: Comprobamos si la respuesta HTTP es exitosa (código de estado 2xx). Si no lo es, lanzamos un error con el código de estado.
    if (!res.ok) {
      throw new Error(`HTTP error — ${res.status}`);
    }
    // Paso 3: Leemos el cuerpo de la respuesta, lo convertimos de JSON a objeto de JS y lo guardamos en la const data
    const data: Project[] = await res.json();
    // Paso 4: Apuntamos la cantidad de proyectos obtenidos.
    apuntar(`setProjects(${data.length} proyectos)`);
    // Paso 5: Apuntamos que la carga ha finalizado.
    apuntar("setLoading(false)");

    // Captura el error si algo falla dentro del try.
  } catch (err) {
    // Comprobamos si la petición fue cancelada.
    // Si lo fue, salimos sin modificar ningún estado.
    if (signal.aborted) return;
    // Si fue un error real, apuntamos su mensaje.
    // ¿Qué tipo de error puede ser?
    // Puede ser un error de red, un error de servidor o cualquier otro tipo de error que ocurra durante la ejecución del bloque try.
    apuntar(`setError(${err instanceof Error ? err.message : "Error desconocido"})`);
    apuntar("setLoading(false)");
  }
}

// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------

/* 4d) cargarD — loading se apaga en un finally. La cancelada no tiene que apuntar
 * nada, y ahora apunta setLoading(false). Bien y error lo siguen apagando.
 * ¿Por qué? Si la cancelada sale del catch con return, ¿por qué llega a apuntar?
 * Porque el finally se ejecuta siempre, incluso si el catch tiene un return. El flujo de ejecución pasa por el finally antes de salir de la función, lo que provoca que se ejecute el código dentro del finally, incluyendo la llamada a apuntar("setLoading(false)").
 */

// Creamos una función asíncrona llamada cargarD que recibe un AbortSignal y una función Apuntar como parámetros.
export async function cargarD(signal: AbortSignal, apuntar: Apuntar): Promise<void> {
  // Ejecuta el código que podría producir un error.
  // Si todo sale bien, continúa normalmente.
  try {
    // Paso 1: Hacemos el llamado a la API con 2 parámetros:
    // 1. API_PROJECTS: la URL del endpoint al que queremos hacer la petición.
    // 2. { signal }: objeto de configuración que permite a fetch escuchar una señal de cancelación (AbortSignal).
    const res = await fetch(API_PROJECTS, { signal });
    // Paso 2: Comprobamos si la respuesta HTTP es exitosa (código de estado 2xx). Si no lo es, lanzamos un error con el código de estado.
    const data: Project[] = await res.json();
    // Paso 3: Apuntamos la cantidad de proyectos obtenidos.
    apuntar(`setProjects(${data.length} proyectos)`);
    // Paso 4: Apuntamos que la carga ha finalizado.
    apuntar("setLoading(false)");

    // Captura el error si algo falla dentro del try.
  } catch (err) {
    if (signal.aborted) {
      return;
    }
    apuntar(`setError(${err instanceof Error ? err.message : "Error desconocido"})`);
    apuntar("setLoading(false)");
  }
}

// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------

/* 4e) cargarE — sin finally. La cancelada ya no apunta nada y la red caída va
 * bien, pero ahora el camino bueno no apaga loading.
 */

// Creamos una función asíncrona llamada cargarE que recibe un AbortSignal y una función Apuntar como parámetros.
export async function cargarE(signal: AbortSignal, apuntar: Apuntar): Promise<void> {
  // Ejecuta el código que podría producir un error.
  // Si todo sale bien, continúa normalmente.
  try {
    // Paso 1: Hacemos el llamado a la API con 2 parámetros:
    // 1. API_PROJECTS: la URL del endpoint al que queremos hacer la petición.
    // 2. { signal }: objeto de configuración que permite a fetch escuchar una señal de cancelación (AbortSignal).
    const res = await fetch(API_PROJECTS, { signal });
    // Paso 2: Comprobamos si la respuesta HTTP es exitosa (código de estado 2xx). Si no lo es, lanzamos un error con el código de estado.
    const data: Project[] = await res.json();
    // Paso 3: Apuntamos la cantidad de proyectos obtenidos.
    apuntar(`setProjects(${data.length} proyectos)`);
    // Paso 4: Apuntamos que la carga ha finalizado.
    apuntar("setLoading(false)");

    // Captura el error si algo falla dentro del try.
  } catch (err) {
    if (signal.aborted) {
      return;
    }
    // Si fue un error real, apuntamos su mensaje.
    apuntar(`setError(${err instanceof Error ? err.message : "Error desconocido"})`);
    // Apuntamos que la carga ha finalizado.
    apuntar("setLoading(false)");
  }
}
// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ C — de vuelta en el componente, ahora con id
 *
 * DEFINICIÓN
 * Si el efecto usa id, id va en su array: cada vez que cambia, React corre la
 * limpieza de la pasada anterior y después el efecto nuevo. Cada pasada tiene sus
 * propias variables, su id y su controller, y su limpieza ve las suyas, aunque
 * corra cuando id ya vale otra cosa.
 *
 * SINTAXIS — una sala de chat que cambia de canal:
 * useEffect(() => {
 *   conectar(canal);
 *   return () => desconectar(canal); // el canal de ESTA pasada
 * }, [canal]);
 *
 * 🧠 ANALOGÍA — cada pasada es un pedido con su propio resguardo. Al cambiar de
 * pedido, anulas el viejo con su resguardo, no con el del nuevo.
 * ───────────────────────────────────────────────────────────────────────────── */

// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------

/* 4f) NombreDelProyecto — pinta el nombre del proyecto con el id que recibe, y lo
 * pide a API_PROJECTS/id. Ahora, si id cambia, se queda con el nombre del primero.
 * Le hacía falta el id dentro del array de dependencias del efecto, para que React corra la limpieza de la pasada anterior y después el efecto nuevo.
 */

// Creamos un componente funcional llamado NombreDelProyecto que recibe un objeto con la propiedad id.
export function NombreDelProyecto({ id }: { id: number }) {
  // Seteamos el estado nombre como null inicialmente, y lo tipamos como string o null.
  const [nombre, setNombre] = useState<string | null>(null);

  // Una vez que el componente se monta o cuando el id cambia, ejecutamos el efecto.
  useEffect(() => {
    // Creamos una función asíncrona llamada load que se encargará de realizar la petición a la API para obtener el nombre del proyecto correspondiente al id proporcionado.
    const load = async () => {
      // Realizamos la petición HTTP a la API_PROJECTS/id para obtener los datos del proyecto.
      const res = await fetch(`${API_PROJECTS}/${id}`);
      // Convertimos la respuesta HTTP a formato JSON y tipamos el resultado como un objeto Project.
      const project: Project = await res.json();
      // Actualizamos el estado nombre con el nombre del proyecto obtenido de la API.
      setNombre(project.name);
    };
    // Llamamos a la función load para iniciar la carga del nombre del proyecto.
    load();
    // Array de dependencias que indica a React que este efecto debe ejecutarse cada vez que el valor de id cambie.
  }, [id]);

  return (
    <>
      <p>{nombre ?? "Cargando…"}</p>
    </>
  );
}

// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------

/* 4g) RastroDeId — apunta «pide N» cada vez que el efecto corre con un id, y
 * «suelta N» cuando esa pasada se limpia, con su id. Ahora no apunta ningún
 * «suelta».
 * ¿Por qué? Al pasar del 1 al 2, ¿por qué se apunta «suelta 1» y no «suelta 2», si
 * cuando corre la limpieza id ya vale 2?
 * Porque cada pasada del efecto tiene su propio contexto y sus propias variables. Cuando se ejecuta la limpieza de la pasada anterior, el valor de id en ese contexto sigue siendo el que tenía cuando se creó esa pasada (en este caso, 1). Por lo tanto, al ejecutar la limpieza, se apunta "suelta 1" y no "suelta 2", ya que la limpieza está asociada a la pasada anterior del efecto.
 */

// Creamos un componente funcional llamado RastroDeId que recibe un objeto con las propiedades id y apuntar.
export function RastroDeId({ id, apuntar }: { id: number; apuntar: Apuntar }) {
  // Ejecutamos el efecto después del primer renderizado del componente y cada vez que el id o la función apuntar cambien.
  useEffect(() => {
    // Apuntamos que se está pidiendo el proyecto con el id actual.
    apuntar(`pide ${id}`);

    // Retornamos una función de limpieza que se ejecutará cuando el componente se desmonte o cuando el id cambie.
    return () => {
      apuntar(`suelta ${id}`);
    };
    // Array de dependencias que indica a React que este efecto debe ejecutarse cada vez que el valor de id o la función apuntar cambien.
  }, [id, apuntar]);

  return null;
}

// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------

/* 4h) ProyectosQueNoLlegan — pide la lista y la pinta, como el 3. Ahora, en pnpm
 * dev y en el test, se queda en «Cargando…» para siempre, aunque la API va bien.
 * El try y el catch están bien.
 * ¿Por qué? ¿Cuántos controllers crea el starter, y cuántas peticiones hace con el
 * ensayo de StrictMode?
 * Porque el starter crea un nuevo AbortController cada vez que se monta el componente, y en el ensayo de StrictMode, React monta y desmonta el componente dos veces para detectar efectos secundarios. Esto provoca que la primera petición sea cancelada antes de que llegue la respuesta, y la segunda petición también sea cancelada si el componente se desmonta nuevamente. Como resultado, el estado de loading nunca se actualiza a false y el componente se queda en "Cargando..." para siempre.
 */

// Creamos un componente funcional llamado ProyectosQueNoLlegan que se encargará de solicitar y mostrar la lista de proyectos.
export function ProyectosQueNoLlegan() {
  // Seteamos el estado projects como un array vacío de objetos Project.
  const [projects, setProjects] = useState<Project[]>([]);
  // Seteamos el estado loading como true inicialmente, indicando que la carga de proyectos está en progreso.
  const [loading, setLoading] = useState(true);
  // Seteamos el estado error como null inicialmente, indicando que no hay errores al inicio.
  const [error, setError] = useState<string | null>(null);

  // Una vez que el componente se monta, ejecutamos el efecto para cargar los proyectos.
  useEffect(() => {
    // Creamos un AbortController para poder cancelar la petición HTTP si el componente se desmonta antes de recibir la respuesta.
    const mando = new AbortController();

    // Creamos una función asíncrona llamada load que se encargará de realizar la petición a la API para obtener la lista de proyectos.
    const load = async () => {
      // Ejecuta el código que podría producir un error.
      // Si todo sale bien, continúa normalmente.
      try {
        // Realizamos la petición HTTP a la API_PROJECTS, pasando el signal del mando para poder cancelarla si es necesario.
        const res = await fetch(API_PROJECTS, { signal: mando.signal });
        // Comprobamos si la respuesta HTTP es exitosa (código de estado 2xx). Si no lo es, lanzamos un error con el código de estado.
        if (!res.ok) {
          throw new Error(`HTTP error — ${res.status}`);
        }
        // Convertimos la respuesta HTTP a formato JSON y tipamos el resultado como un array de Project.
        const data: Project[] = await res.json();
        // Actualizamos el estado projects con los datos obtenidos de la API.
        setProjects(data);
        // Actualizamos el estado loading a false, indicando que la carga ha finalizado.
        setLoading(false);

        // Captura el error si algo falla dentro del try.
      } catch (err) {
        if (mando.signal.aborted) {
          return;
        }
        setError(err instanceof Error ? err.message : "Error desconocido");
        setLoading(false);
      }
    };

    // Llamamos a la función load para iniciar la carga de proyectos.
    load();
    // Cancelamos la petición al desmontar el componente para evitar
    // mantener solicitudes innecesarias en segundo plano.
    return () => mando.abort();
  }, []);

  // Render inicial, mientras loading sea true
  if (loading) {
    return <p>Cargando…</p>;
  }
  // Si error pasa de null a string, lo pintamos
  if (error) {
    return <p role="alert">{error}</p>;
  }

  // Solicitud exitosa. Renderizamos la lista de proyectos.
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}

/* 4i) FichaQueNoEscucha — pasa de Projex a Smart Cooler antes de que llegue Projex:
 * tiene que quedarse Smart Cooler, y la petición de Projex, cancelada. Ya tiene
 * controller, limpieza y guardia, pero Projex llega tarde y la pisa igual.
 * ¿Por qué? Si la limpieza llama a abort(), ¿por qué la petición de Projex llega?
 * Porque el fetch del starter no recibe el signal del controller: abort() aprieta el botón, pero nadie lo escucha. La petición de Projex sigue, llega a los 2,5 s y su setProject pisa a Smart Cooler.
 */

// Creamos un componente funcional llamado FichaQueNoEscucha que recibe un objeto con la propiedad id.
export function FichaQueNoEscucha({ id }: { id: number }) {
  // Seteamos el estado project como null inicialmente, y lo tipamos como Project o null.
  const [project, setProject] = useState<Project | null>(null);
  // Seteamos el estado loading como true inicialmente, indicando que la carga de proyectos está en progreso.
  const [loading, setLoading] = useState(true);
  // Seteamos el estado error como null inicialmente, y lo tipamos como string o null.
  const [error, setError] = useState<string | null>(null);

  // Una vez que el componente se monta o cuando el id cambia, ejecutamos el efecto.
  useEffect(() => {
    // Creamos un AbortController para poder cancelar la petición HTTP si el componente se desmonta o si el id cambia antes de recibir la respuesta.
    const controller = new AbortController();

    // Creamos una función asíncrona llamada load que se encargará de realizar la petición a la API para obtener el proyecto correspondiente al id proporcionado.
    const load = async () => {
      // Ejecuta el código que podría producir un error.
      // Si todo sale bien, continúa normalmente.
      try {
        // Realizamos la petición HTTP a la API_PROJECTS/id, pasando el signal del controller para poder cancelarla si es necesario.
        const res = await fetch(`${API_PROJECTS}/${id}`, { signal: controller.signal });
        // Comprobamos si la respuesta HTTP es exitosa (código de estado 2xx). Si no lo es, lanzamos un error con el código de estado.
        if (!res.ok) {
          throw new Error(`HTTP error — ${res.status}`);
        }
        // Convertimos la respuesta HTTP a formato JSON y tipamos el resultado como un objeto Project.
        const data: Project = await res.json();
        // Actualizamos el estado project con los datos obtenidos de la API.
        setProject(data);
        setLoading(false);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        setError(err instanceof Error ? err.message : "Error desconocido");
        setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, [id]);

  if (error) {
    return <p role="alert">{error}</p>;
  }
  if (loading) {
    return <p>Cargando…</p>;
  }
  if (!project) {
    return <p>No se encontró el proyecto.</p>;
  }

  return (
    <>
      <p>
        {project.name} · {project.status}
      </p>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ARMARLO TÚ — las tres piezas juntas
 *
 * El controller, la limpieza que lo aborta y el catch que se calla, en un hook
 * cuyo efecto se repite: cada vez que cambia el id, hay una petición nueva.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) useProyecto — FichaProyecto enseña el proyecto con el id que recibe, y lo
 * pide a API_PROJECTS/id (/api/projects/2). Si pasas de Projex a Smart Cooler
 * antes de que llegue Projex, tiene que quedarse Smart Cooler, y la petición de
 * Projex, cancelada. Ahora Projex llega tarde y la pisa. FichaProyecto ya está
 * bien: solo falla el hook.
 * ¿Por qué? Con el starter, ¿por qué gana Projex, si Smart Cooler se pidió después?
 * Al no haber AbortController, la petición de Projex sigue viva y puede actualizar el estado del componente incluso después de que se haya solicitado Smart Cooler. Esto provoca que el estado del componente se sobrescriba con los datos de Projex, aunque Smart Cooler se haya solicitado después.
 */

// Creamos un hook personalizado llamado useProyecto que recibe un id de tipo number y devuelve un objeto con el proyecto correspondiente y un posible error.
export function useProyecto(id: number): { project: Project | null; error: string | null } {
  // Inicializamos el estado project como null, y lo tipamos como Project o null.
  const [project, setProject] = useState<Project | null>(null);
  // Inicializamos el estado error como null, y lo tipamos como string o null.
  const [error, setError] = useState<string | null>(null);

  // Ejecutamos el efecto después del primer renderizado del componente y cada vez que el id cambie.
  useEffect(() => {
    // Creamos un AbortController para poder cancelar la petición HTTP si el componente se desmonta o si el id cambia antes de recibir la respuesta.
    const controller = new AbortController();

    // Creamos una función asíncrona llamada load que se encargará de realizar la petición a la API para obtener el proyecto correspondiente al id proporcionado.
    const load = async () => {
      // Ejecuta el código que podría producir un error.
      // Si todo sale bien, continúa normalmente.
      try {
        // Realizamos la petición HTTP a la API_PROJECTS/id, pasando el signal del controller para poder cancelarla si es necesario.
        const res = await fetch(`${API_PROJECTS}/${id}`, { signal: controller.signal });
        // Comprobamos si la respuesta HTTP es exitosa (código de estado 2xx). Si no lo es, lanzamos un error con el código de estado.
        if (!res.ok) {
          throw new Error(`HTTP error — ${res.status}`);
        }
        // Convertimos la respuesta HTTP a formato JSON y tipamos el resultado como un objeto Project.
        const data: Project = await res.json();
        // Actualizamos el estado project con los datos obtenidos de la API.
        setProject(data);

        // Captura el error si algo falla dentro del try.
      } catch (err) {
        // Comprobamos si la petición fue cancelada.
        // Si fue así, salimos sin modificar ningún estado.
        if (controller.signal.aborted) {
          return;
        }
        // Si fue un error real, guardamos su mensaje.
        // Si err es una instancia de Error, obtenemos su mensaje; si no, usamos un mensaje genérico.
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    };
    // Llamamos a la función load para iniciar la carga del proyecto correspondiente al id proporcionado.
    load();
    // Cancelamos la petición al desmontar el componente o al cambiar el id para evitar
    // mantener solicitudes innecesarias en segundo plano.
    return () => controller.abort();

    // Array de dependencias que indica a React que este efecto debe ejecutarse cada vez que el valor de id cambie.
  }, [id]);

  // Devolvemos un objeto con el proyecto obtenido y un posible error.
  return { project, error };
}

// Creamos un componente funcional llamado FichaProyecto que recibe un id de tipo number como prop y utiliza el hook useProyecto para obtener el proyecto correspondiente y un posible error.
export function FichaProyecto({ id }: { id: number }) {
  const { project, error } = useProyecto(id);

  // Si hay un error, renderizamos un mensaje de alerta con el contenido del error.
  if (error) {
    return <p role="alert">{error}</p>;
  }
  // Si el proyecto aún no ha sido cargado, renderizamos un mensaje de carga.
  if (!project) {
    return <p>Cargando…</p>;
  }

  // Si el proyecto ha sido cargado correctamente, renderizamos un párrafo con el nombre y el estado del proyecto.
  return (
    <p>
      {project.name} · {project.status}
    </p>
  );
}
