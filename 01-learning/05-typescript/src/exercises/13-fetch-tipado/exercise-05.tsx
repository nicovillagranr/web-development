import { useEffect, useState } from "react";
import { z } from "zod";

/* =============================================================================
 * EJERCICIO 05 — no esperar para siempre: el timeout · bloque 13
 *
 * 📌 RECORDATORIO — del 02: un controller por pasada del efecto, su signal viaja
 * a fetch, la limpieza llama a abort() y el catch se calla si
 * controller.signal.aborted. Del 04: lo que llega se valida con .parse.
 *
 * 🎯 OBJETIVOS
 * · Cortar una petición que tarda demasiado con AbortSignal.timeout.
 * · Juntar el desmontaje y el límite en una sola señal con AbortSignal.any.
 * · Distinguir en el catch «el usuario se fue» de «la API no contestó».
 *
 * 🟢 CONTEXTO — si Vercel se cuelga, fetch espera sin fin y tu portada se queda
 * en «Cargando…». Tu usePortfolioData no espera más de TIMEOUT_MS: junta el
 * controller del desmontaje con un reloj de 4 s en una sola señal (l.44-47).
 *
 * 🗺️ MAPA
 * TEORÍA 1 · una señal con reloj → drills 1–2
 * ESCALERA · el límite del 1, pieza a pieza → peldaños 1a–1d, debajo del 1
 * TEORÍA 2 · dos motivos, una señal → drills 3–4
 * TU HOOK → drill 5
 *
 * ▸ 5 drills + 4 peldaños en orden. Prohibidos el tipo any, as, el ! de «confía
 * en mí» (x!) y los eslint-disable. Los límites llegan como parámetro, en
 * milisegundos.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-05.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-05.pistas.md. Drills 1–5 y la escalera: banco, pestaña 13.
 * ============================================================================= */

/* Las formas del 04, con sus schemas. La API sigue sin existir: los tests y el
 * banco responden por ella, y aquí pueden tardar lo que quieran. */
export const ProjectSchema = z.object({ id: z.number(), name: z.string(), status: z.string() });
export const ProjectsSchema = z.array(ProjectSchema);
export const ProfileSchema = z.object({ name: z.string(), role: z.string() });

export type Project = z.infer<typeof ProjectSchema>;
export type Profile = z.infer<typeof ProfileSchema>;

export const API_PROJECTS = "/api/projects";
export const API_PROFILE = "/api/profile";

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — una señal con reloj
 *
 * DEFINICIÓN
 * AbortSignal.timeout(ms) crea una señal que se aborta sola cuando pasan esos
 * milisegundos. Si viaja a fetch y la respuesta no llegó a tiempo, la petición se
 * corta y la promesa rechaza con un error de name «TimeoutError». Un abort() a
 * mano rechaza con «AbortError»: el name dice quién cortó.
 *
 * SINTAXIS — el clima, con 3 s de paciencia:
 * const res = await fetch("/api/clima", { signal: AbortSignal.timeout(3000) });
 *
 * 🧠 ANALOGÍA — pedir a domicilio avisando «si en 40 minutos no llegó, lo anulo».
 * No miras el reloj cuando llega la pizza: el pedido se anula solo en el minuto 40.
 *
 * 🗣️ LAS PIEZAS
 * AbortSignal.timeout(ms) → una señal sin mando: nadie llama a abort(), salta sola.
 * err.name                → «TimeoutError» si saltó el reloj; «AbortError» si fue abort().
 *
 * ⚠️ TRAMPA — el reloj empieza a contar cuando nace la señal, no cuando sale la
 * petición. Una señal creada antes de tiempo llega a fetch con el reloj gastado.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) pedirConLimite — pide la lista a API_PROJECTS y la devuelve validada, sin
 * esperar más de limiteMs: si la API no contestó a tiempo, la petición se corta y
 * falla con TimeoutError. Ahora el límite no corta nada.
 * ¿Por qué? Con el starter, un límite de 0,5 s y una API que tarda 30 s, ¿en qué
 * segundo falla pedirConLimite?
 * Falla en el segundo 30, porque el starter no tiene implementado el límite de tiempo, por lo que la petición espera a que la API responda aunque tarde mucho más de 0,5 s.
 */

// Creamos una función asincrónica llamada pedirConLimite que recibe un parámetro limiteMs de tipo number y devuelve una promesa que resuelve en un array de Project.
export async function pedirConLimite(limiteMs: number): Promise<Project[]> {
  // Paso 1: Creamos una señal que se aborta automáticamente después de limiteMs milisegundos.
  const signal = AbortSignal.timeout(limiteMs);

  // Paso 2: Hacemos una petición fetch a la API_PROJECTS y esperamos su respuesta.
  const res = await fetch(API_PROJECTS, { signal });

  // Paso 3: Si la respuesta no es ok, lanzamos un error indicando el estado HTTP de la respuesta.
  if (!res.ok) {
    throw new Error(`HTTP error — projects:${res.status}`);
  }

  // Paso 4: Obtenemos los datos de la respuesta en formato JSON y los guardamos en la variable data.
  const data: unknown = await res.json();

  // Paso 5: Validamos los datos obtenidos con el esquema ProjectsSchema y los devolvemos.
  return ProjectsSchema.parse(data);
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — el límite del 1, pieza a pieza (refuerzo)
 *
 * El 1 junta dos ideas: lo que va debajo de un await espera a la respuesta, y
 * para cortar a tiempo alguien tiene que apretar el botón mientras se espera.
 * Cada peldaño trabaja una: A · lo de debajo del await (1a–1b) · B · un botón con
 * alarma (1c) · C · la señal que se aprieta sola (1d). Al terminar, vuelve al 1.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ A — lo de debajo del await espera
 *
 * DEFINICIÓN
 * await pausa la función hasta que la promesa termina. Las líneas de debajo no
 * corren mientras tanto: corren cuando la respuesta ya llegó, tarde lo que tarde.
 *
 * SINTAXIS — el clima, con una API que tarda 3 s:
 * console.log("sale la petición");       // corre en el segundo 0
 * const res = await fetch("/api/clima"); // aquí la función se queda esperando
 * console.log("ya llegó");               // corre en el segundo 3
 *
 * 🧠 ANALOGÍA — mirar el reloj cuando la pizza ya está en tu mano te dice cuánto
 * tardó, pero ya no la puedes anular: llegó.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1a) cuantoTarda — devuelve cuántos milisegundos tardó la API en contestar. Ahora
 * devuelve 0, tarde lo que tarde.
 * ¿Por qué? Con el starter y una API que tarda 5 s, ¿en qué segundo corre la línea
 * de fin?
 * La línea corre al inicio y no tarda nada, por más que el fetch tarde algo
 * Si queremos que de verdad mida el tiempo del fetch, este debe ir entre el inicio y el final, luego le restamos el inicio al final para sacar el resultado
 */

// Creamos una función asincrónica llamada cuantoTarda que devuelve una promesa que resuelve en un número.
export async function cuantoTarda(): Promise<number> {
  // Guardamos el tiempo actual en la variable inicio.
  const inicio = Date.now();
  // Hacemos una petición fetch a la API_PROJECTS y esperamos su respuesta.
  await fetch(API_PROJECTS);
  // Guardamos el tiempo actual en la variable fin.
  const fin = Date.now();
  // Devolvemos la diferencia entre fin e inicio, que representa el tiempo transcurrido en milisegundos.
  return fin - inicio;
}

/* 1b) pedirYAnular — pide la lista y la anula sin esperar a que llegue: tiene que
 * fallar con AbortError. Ahora la lista llega entera y devuelve su status, 200.
 * ¿Por qué? Con el starter y una API que tarda 5 s, ¿en qué segundo corre
 * controller.abort()?
 * Con el starter, el controller.abort() se ejecuta en el momento en que la data es recibida, por lo que la petición no se anula a tiempo y devuelve el status 200. Para que la petición se anule correctamente, el controller.abort() debe ejecutarse antes de que la respuesta llegue.
 */

// Creamos una función asincrónica llamada pedirYAnular que devuelve una promesa que resuelve en un número.
export async function pedirYAnular(): Promise<number> {
  // Creamos un nuevo AbortController para poder abortar la petición si es necesario.
  const controller = new AbortController();
  // Programamos una función que se ejecutará después de 0 milisegundos para abortar la petición.
  setTimeout(() => controller.abort(), 0);
  // Hacemos una petición fetch a la API_PROJECTS y esperamos su respuesta.
  const res = await fetch(API_PROJECTS, { signal: controller.signal });
  // Devolvemos el estado de la respuesta.
  return res.status;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ B — un botón con alarma
 *
 * DEFINICIÓN
 * Un AbortController no corta nada por estar creado: corta cuando alguien llama a
 * abort(). setTimeout deja una función programada para dentro de X ms y sigue de
 * largo, sin esperar: la función programada corre aunque tu código esté parado en
 * un await.
 *
 * SINTAXIS
 * setTimeout(() => console.log("pasaron 3 s"), 3000);
 * console.log("esto sale primero"); // setTimeout no espera: solo deja programado
 *
 * 🧠 ANALOGÍA — al hacer el pedido pones una alarma en el celular para el minuto
 * 40. Si suena y la pizza no llegó, llamas para anularla.
 * ───────────────────────────────────────────────────────────────────────────── */

// Creamos una función asincrónica llamada pedirConAlarma que recibe un parámetro limiteMs de tipo number y devuelve una promesa que resuelve en un array de Project.
/* 1c) pedirConAlarma — pide la lista y la devuelve validada, pero si a los limiteMs
 * no llegó, la anula: falla con AbortError. Ahora espera la lista entera y falla
 * después, con un Error suyo. El starter es tu primer intento del 1.
 * ¿Por qué? En el starter, ¿quién llama a controller.abort()?
 * Realmente nadie lo está llamando con ese starter, sólo está creado a la espera de...
 */
export async function pedirConAlarma(limiteMs: number): Promise<Project[]> {
  // Paso 1: Guardamos el tiempo actual en la variable inicio.
  const inicio = Date.now();

  // Paso 2: Creamos un nuevo AbortController para poder abortar la petición si es necesario.
  const controller = new AbortController();

  // Paso 3: Programamos una función que llamará a controller.abort() después de limiteMs para abortar la petición.
  setTimeout(() => controller.abort(), limiteMs);

  // Paso 4: Hacemos una petición fetch a la API_PROJECTS y esperamos su respuesta.
  const res = await fetch(API_PROJECTS, { signal: controller.signal });

  // Si el tiempo transcurrido desde inicio es mayor que limiteMs, lanzamos un error indicando que la API tardó demasiado.
  if (Date.now() - inicio > limiteMs) {
    throw new Error("La API tardó demasiado");
  }

  // Si la hay respuesta negativa del servidor, lanzamos un error con el estado HTTP.
  if (!res.ok) {
    throw new Error(`HTTP error — projects:${res.status}`);
  }

  // Paso 5: Obtenemos los datos de la respuesta en formato JSON y los guardamos en la variable data.
  const data: unknown = await res.json();

  // Paso 6: Validamos los datos obtenidos con el esquema ProjectsSchema y los devolvemos.
  return ProjectsSchema.parse(data);
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ C — la señal que se aprieta sola
 *
 * Es la TEORÍA 1, de arriba. El 1c ya corta a tiempo, pero con un abort() que
 * llamó tu alarma, y el error sale como AbortError. AbortSignal.timeout(ms) nace
 * con su propia alarma, y cuando corta, el error sale como TimeoutError: el name
 * dice quién cortó.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1d) pedirConReloj — igual que el 1c, pero quien lea el error tiene que saber que
 * cortó un reloj: TimeoutError. Ahora corta a tiempo, pero con AbortError.
 * ¿Por qué? En el starter el que corta es un reloj: ¿por qué el error sale como
 * AbortError?
 * Porque AbortController solamente sabe que recibió un abort() y no sabe si fue por el reloj o por el usuario, entonces lanza un AbortError. Para que salga un TimeoutError, debemos usar AbortSignal.timeout() que es una señal que se auto-aborta y lanza un TimeoutError.
 */

// Creamos una función asincrónica llamada pedirConReloj que recibe un parámetro limiteMs de tipo number y devuelve una promesa que resuelve en un array de Project.
export async function pedirConReloj(limiteMs: number): Promise<Project[]> {
  // Paso 1: Creamos una señal que se aborta automáticamente después de limiteMs milisegundos.
  const signal = AbortSignal.timeout(limiteMs);

  // Paso 2: Hacemos una petición fetch a la API_PROJECTS y esperamos su respuesta.
  const res = await fetch(API_PROJECTS, { signal });

  // Paso 3: Si la respuesta no es ok, lanzamos un error indicando el estado HTTP de la respuesta.
  if (!res.ok) {
    throw new Error(`HTTP error — projects:${res.status}`);
  }

  // Paso 4: Obtenemos los datos de la respuesta en formato JSON y los guardamos en la variable data.
  const data: unknown = await res.json();

  // Paso 5: Validamos los datos obtenidos con el esquema ProjectsSchema y los devolvemos.
  return ProjectsSchema.parse(data);
}

/* Pide la lista con el signal que recibe y la devuelve validada. */
async function pedirLista(signal: AbortSignal): Promise<Project[]> {
  const res = await fetch(API_PROJECTS, { signal });
  if (!res.ok) {
    throw new Error(`HTTP error — projects:${res.status}`);
  }
  const data: unknown = await res.json();
  return ProjectsSchema.parse(data);
}

/* 2) pedirConReintento — tu API en Vercel a veces responde el primer 500 mientras
 * despierta. Si el primer intento falla, pide la lista otra vez. Cada intento tiene
 * su propio límite de limiteMs. Ahora el segundo intento se corta aunque la API ya
 * conteste bien. Aquí no hay ninguna línea mal escrita.
 * ¿Por qué? Con el starter, si el primer intento falla a los 0,9 s y el límite es
 * 1,5 s, ¿cuánto reloj le queda al segundo intento cuando sale?
 * Le queda 0,6 s de reloj al segundo intento, porque el primer intento tardó 0,9 s y el límite total es de 1,5 s. Por lo tanto, el segundo intento se corta después de 0,6 s aunque la API ya haya contestado bien.
 */
export async function pedirConReintento(limiteMs: number): Promise<Project[]> {
  // Intentamos pedir la lista con el límite de tiempo especificado.
  try {
    return await pedirConReloj(limiteMs);

    // Si ocurre un error, verificamos si es un TimeoutError.
  } catch {
    return await pedirConReloj(limiteMs);
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — dos motivos, una señal
 *
 * DEFINICIÓN
 * En un efecto ya tienes una señal: la del controller, que se aborta al desmontar.
 * El límite es otra, y fetch solo acepta una. AbortSignal.any([a, b]) crea una
 * señal nueva que se aborta en cuanto se aborta cualquiera de las de la lista, con
 * el motivo de la que saltó.
 *
 * SINTAXIS — el clima en un efecto, con 3 s de paciencia:
 * const controller = new AbortController();
 * const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(3000)]);
 * const res = await fetch("/api/clima", { signal });
 *
 * 🧠 ANALOGÍA — la luz del pasillo con un interruptor en cada punta: cualquiera de
 * los dos la apaga. Para saber cuál fue, miras los interruptores, no la bombilla.
 *
 * ⚠️ TRAMPA — en el catch, la señal combinada está abortada tanto si el usuario
 * se fue como si saltó el reloj. Para saber si se fue, pregunta a la suya.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) pedirCancelableConLimite — pide la lista y la devuelve validada. Se corta si
 * quien la llama cancela con su signal, o si pasan limiteMs sin respuesta, lo que
 * llegue antes. Ahora no llega a salir ninguna petición.
 * ¿Por qué? Con tu arreglo, si quien llama cancela a los 0,3 s y el límite es 2 s,
 * ¿cuál de las dos señales se abortó, y qué le pasa a la que viaja en fetch?
 * La señal que se abortó es la del llamador, y la que viaja en fetch también se aborta porque es una señal combinada que se aborta si cualquiera de las señales se aborta. Por lo tanto, la petición se corta y no llega a completarse.
 */

// Creamos una función asincrónica llamada pedirCancelableConLimite que recibe un parámetro signal de tipo AbortSignal y un parámetro limiteMs de tipo number, y devuelve una promesa que resuelve en un array de Project.
export async function pedirCancelableConLimite(
  signal: AbortSignal,
  limiteMs: number,
): Promise<Project[]> {
  // Paso 1: Hacemos una petición fetch a la API_PROJECTS y esperamos su respuesta, usando AbortSignal.any para combinar la señal del llamador y un límite de tiempo.
  const res = await fetch(API_PROJECTS, {
    // Paso 2: Combinamos la señal del llamador con una señal de tiempo límite usando AbortSignal.any. Para qué sirve esto?
    // Esto permite que la petición se aborte si cualquiera de las dos señales se aborta, ya sea porque el llamador canceló la operación o porque se alcanzó el límite de tiempo.
    signal: AbortSignal.any([signal, AbortSignal.timeout(limiteMs)]),
  });

  // Paso 3: Si la respuesta no es ok, lanzamos un error indicando el estado HTTP de la respuesta.
  if (!res.ok) {
    throw new Error(`HTTP error — projects:${res.status}`);
  }
  // Paso 4: Obtenemos los datos de la respuesta en formato JSON y los guardamos en la variable data.
  const data: unknown = await res.json();
  // Paso 5: Validamos los datos obtenidos con el esquema ProjectsSchema y los devolvemos.
  return ProjectsSchema.parse(data);
}

/* 4) ListaConLimite — pinta «Cargando…» y después tus proyectos. Si la API no
 * contesta en limiteMs, el aviso «La API tardó demasiado»; si se desmonta antes,
 * nada. Ahora, con la API lenta, se queda en «Cargando…» para siempre.
 * ¿Por qué? Con el starter y el límite vencido, ¿cuánto vale signal.aborted en el
 * catch, y qué hace entonces la primera línea?
 * En el catch, signal.aborted vale true porque la señal combinada se ha abortado debido al límite de tiempo. Por lo tanto, la primera línea del catch retorna sin hacer nada, lo que hace que el componente se quede en "Cargando..." para siempre.
 */

// Creamos un componente funcional llamado ListaConLimite que recibe un parámetro limiteMs de tipo number y devuelve un elemento JSX.
export function ListaConLimite({ limiteMs }: { limiteMs: number }) {
  // Seteamos el estado de projects como un array de Project o null
  const [projects, setProjects] = useState<Project[] | null>(null);
  // Seteamos el estado de error como un string o null
  const [error, setError] = useState<string | null>(null);

  // Una vez montado el componente, ejecutamos el efecto que carga la lista de proyectos.
  useEffect(() => {
    // Paso 1: Creamos un nuevo AbortController para poder abortar la petición si es necesario.
    const controller = new AbortController();
    // Paso 2: Combinamos la señal del controller con una señal de tiempo límite usando AbortSignal.any. Para qué sirve esto?
    // Esto permite que la petición se aborte si cualquiera de las dos señales se aborta, ya sea porque el componente se desmontó o porque se alcanzó el límite de tiempo.
    const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(limiteMs)]);

    // Paso 3: Definimos una función asincrónica llamada load que se encargará de pedir la lista de proyectos y manejar los errores.
    const load = async () => {
      // Ejecuta el código que podría producir un error.
      // Si todo sale bien, continúa normalmente.
      try {
        const lista = await pedirLista(signal);
        setProjects(lista);

        // Captura el error si algo falla dentro del try.
        // Permite manejarlo sin que la aplicación se interrumpa inesperadamente.
      } catch (err) {
        // Si la señal combinada se abortó y el motivo es AbortError, significa que el usuario se fue (el componente se desmontó), por lo que no hacemos nada y retornamos.
        if (signal.aborted && signal.reason.name === "AbortError") {
          return;
        }

        // Si la señal combinada se abortó y el motivo es TimeoutError, significa que la API tardó demasiado, por lo que seteamos el estado de error con un mensaje adecuado.
        if (err instanceof Error && err.name === "TimeoutError") {
          setError("La API tardó demasiado");
          return;
        }

        // Cualquier otro error, este podría ser un error de validación de Zod o un error de red, por lo que seteamos el estado de error con el mensaje del error.
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      }
    };

    // Llamamos a la función
    load();
    // Paso 4: Retornamos una función de limpieza que aborta la señal del controller cuando el componente se desmonta.
    return () => controller.abort();
    // Array de dependencias del efecto: si limiteMs cambia, se vuelve a ejecutar el efecto.
  }, [limiteMs]);

  if (error) {
    return <p role="alert">{error}</p>;
  }
  if (!projects) {
    return <p>Cargando…</p>;
  }

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TU HOOK — el usePortfolioValidado del 04, con límite
 *
 * Es tu usePortfolioData sin el snapshot: un reloj para toda la carga, las dos
 * peticiones con la misma señal, y el catch que distingue quién cortó.
 * ───────────────────────────────────────────────────────────────────────────── */

/* Pide, comprueba res.ok y devuelve el JSON sin fingir un tipo. */
async function pedirJson(url: string, signal: AbortSignal): Promise<unknown> {
  // Hacemos una petición fetch a la URL proporcionada y esperamos su respuesta, usando la señal proporcionada para poder abortar la petición si es necesario.
  const res = await fetch(url, { signal });
  // Si la respuesta no es ok, lanzamos un error indicando el estado HTTP de la respuesta.
  if (!res.ok) {
    throw new Error(`HTTP error — ${url}:${res.status}`);
  }
  // Obtenemos los datos de la respuesta en formato JSON y los guardamos en la variable data.
  const data: unknown = await res.json();
  // Validamos los datos obtenidos con el esquema ProjectsSchema y los devolvemos.
  return data;
}

/* 5) usePortfolioConLimite — PortadaConLimite enseña tu nombre y tu rol con la
 * lista debajo. Si la API no contesta en limiteMs, el aviso «La API tardó
 * demasiado»; si los datos no encajan, el aviso con el error de Zod, como en el
 * 04; si se desmonta antes, nada. Ahora espera a la API lo que tarde.
 * PortadaConLimite ya está bien: solo falla el hook.
 * ¿Por qué? Con tu arreglo y la API colgada, ¿cuántas peticiones corta el reloj?
 * Para cortar el reloj, debemos hacer que la señal del reloj se combine con la señal del controller del efecto, de manera que si cualquiera de las dos señales se aborta, la petición se corta. En el starter, la señal del reloj no estaba combinada con la señal del controller, por lo que la petición no se cortaba cuando el componente se desmontaba y el reloj seguía corriendo. Por eso, debemos usar AbortSignal.any para combinar ambas señales y asegurarnos de que la petición se corte correctamente.
 */

// Creamos un hook llamado usePortfolioConLimite que recibe un parámetro limiteMs de tipo number y devuelve un objeto con los proyectos, el perfil y el error.
export function usePortfolioConLimite(limiteMs: number): {
  projects: Project[];
  profile: Profile | null;
  error: string | null;
} {
  // Seteamos el estado de projects como un array de Project vacío.
  const [projects, setProjects] = useState<Project[]>([]);
  // Seteamos el estado de profile como un objeto Profile o null.
  const [profile, setProfile] = useState<Profile | null>(null);
  // Seteamos el estado de error como un string o null.
  const [error, setError] = useState<string | null>(null);

  // Una vez montado el componente, ejecutamos el efecto que carga los proyectos y el perfil.
  useEffect(() => {
    const controller = new AbortController(); // -> Creamos un nuevo AbortController para poder abortar la petición si es necesario.

    // signal es una combinación entre la señal del controller y una señal de tiempo límite usando AbortSignal.any. Esto permite que la petición se aborte si cualquiera de las dos señales se aborta, ya sea porque el componente se desmontó o porque se alcanzó el límite de tiempo.
    const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(limiteMs)]);

    // Definimos una función asincrónica llamada load que se encargará de pedir los proyectos y el perfil, y manejar los errores.
    const load = async () => {
      // Ejecuta el código que podría producir un error.
      // Si todo sale bien, continúa normalmente.
      try {
        // Ambas peticiones comparten la misma señal.
        const [lista, perfil] = await Promise.all([
          pedirJson(API_PROJECTS, signal),
          pedirJson(API_PROFILE, signal),
        ]);
        // Validamos los datos obtenidos con los esquemas ProjectsSchema y ProfileSchema. Si el resultado no coincide con el esquema.
        const projectsOk = ProjectsSchema.parse(lista);
        const profileOk = ProfileSchema.parse(perfil);

        // Setamos los estados de projects y profile con los datos validados.
        setProjects(projectsOk);
        setProfile(profileOk);

        // Captura el error si algo falla dentro del try.
        // Permite manejarlo sin que la aplicación se interrumpa inesperadamente.
      } catch (err) {
        // Si React desmontó el componente, no hacemos nada.
        if (signal.reason?.name === "AbortError") {
          return;
        }

        // Si venció el reloj, mostramos el aviso.
        if (err instanceof Error && err.name === "TimeoutError") {
          setError("La API tardó demasiado");
          return;
        }
        // Si el error es de tipo ZodError o cualquier otro error, mostramos el mensaje correspondiente.
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    };
    load();
    // Cuando se desmonte el componente, abortamos la señal del controller para cancelar cualquier petición pendiente.
    return () => controller.abort();
    // El efecto se vuelve a ejecutar si cambia el valor de limiteMs, lo que permite actualizar el límite de tiempo para las peticiones.
  }, [limiteMs]);

  // Devolvemos un objeto con los proyectos, el perfil y el error.
  return { projects, profile, error };
}

export function PortadaConLimite({ limiteMs }: { limiteMs: number }) {
  const { projects, profile, error } = usePortfolioConLimite(limiteMs);

  if (error) return <p role="alert">{error}</p>;
  if (!profile) return <p>Cargando…</p>;

  return (
    <section>
      <h3>
        {profile.name} · {profile.role}
      </h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </section>
  );
}
