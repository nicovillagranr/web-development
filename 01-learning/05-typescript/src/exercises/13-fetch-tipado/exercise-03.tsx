import { useEffect, useState } from "react";

/* =============================================================================
 * EJERCICIO 03 — pedir dos cosas a la vez: Promise.all · bloque 13
 *
 * 📌 RECORDATORIO — del 01: fetch no falla con un 404; la respuesta llega igual,
 * con su status, y res.ok dice si vino bien. Del 02: un controller por pasada del
 * efecto, su signal viaja a fetch y la limpieza llama a abort().
 *
 * 🎯 OBJETIVOS
 * · Esperar varias promesas a la vez con Promise.all.
 * · Leer cada resultado por su posición, con su propio tipo.
 * · Cargar dos recursos en un efecto, con un solo signal para los dos.
 *
 * 🟢 CONTEXTO — tu portfolio pide dos cosas a la misma API: /projects, la lista,
 * y /profile, tus datos. Salen del mismo db.json, pero son dos respuestas, cada
 * una con su status. Tu usePortfolioData no espera a una para pedir la otra: las
 * pide a la vez con Promise.all.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · varias promesas, una espera → drills 1–3
 * TEORÍA 2 · las dos en el efecto → drill 4
 * ARMARLO TÚ → drill 5
 *
 * ▸ 5 drills en orden. Prohibidos any, as, el ! de «confía en mí» (x!) y los
 * eslint-disable.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-03.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-03.pistas.md. Drills 1–5: banco, pestaña 13.
 * ============================================================================= */

/* La forma de un proyecto y la ruta de la lista, las mismas del 01 y el 02. El
 * perfil es nuevo: tu /profile trae doce campos, aquí bastan dos. La API sigue
 * sin existir: los tests y el banco responden por ella. */
export type Project = { id: number; name: string; status: string };
export type Profile = { name: string; role: string };

export const API_PROJECTS = "/api/projects";
export const API_PROFILE = "/api/profile";

/* Dos peticiones ya escritas, como tu pedirOFallar del 01: piden, comprueban res.ok
 * y devuelven el JSON con su tipo. Su error dice cuál falló: «HTTP error —
 * profile:404». El signal es opcional: sin él, la petición no se puede cancelar. */

// Creamos una función asíncrona que recibe un parámetro opcional signal de tipo AbortSignal o null,
// y devuelve una promesa que resuelve con un array de objetos Project.
async function pedirProyectos(signal: AbortSignal | null = null): Promise<Project[]> {
  // Hacemos una petición fetch a la API de proyectos, pasando el signal como opción.
  const res = await fetch(API_PROJECTS, { signal });
  // Si la respuesta no es ok (status no está en el rango 200-299), lanzamos un error con el status.
  if (!res.ok) {
    throw new Error(`HTTP error — projects:${res.status}`);
  }
  // Si la respuesta es ok, parseamos el cuerpo de la respuesta como JSON y lo asignamos a la variable data de tipo Project[].
  const data: Project[] = await res.json();
  // Devolvemos el array de proyectos.
  return data;
}

// Creamos una función asíncrona que recibe un parámetro opcional signal de tipo AbortSignal o null,
async function pedirPerfil(signal: AbortSignal | null = null): Promise<Profile> {
  // Hacemos una petición fetch a la API de perfil, pasando el signal como opción.
  const res = await fetch(API_PROFILE, { signal });
  // Si la respuesta no es ok (status no está en el rango 200-299), lanzamos un error con el status.
  if (!res.ok) {
    throw new Error(`HTTP error — profile:${res.status}`);
  }
  // Si la respuesta es ok, parseamos el cuerpo de la respuesta como JSON y lo asignamos a la variable data de tipo Profile.
  const data: Profile = await res.json();
  // Devolvemos el perfil.
  return data;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — varias promesas, una espera
 *
 * DEFINICIÓN
 * Promise.all recibe un array de promesas y devuelve una sola. Se cumple cuando
 * se cumplen todas, con un array de resultados en el orden en que se las pasaste,
 * no en el que llegan. Si una rechaza, la de Promise.all rechaza con ese error,
 * sin esperar a las demás.
 *
 * SINTAXIS — dos peticiones cualquiera, a la vez:
 * const [clima, ciudad] = await Promise.all([pedirClima(), pedirCiudad()]);
 * // clima: Clima · ciudad: Ciudad
 *
 * 🧠 ANALOGÍA — el pedido a domicilio otra vez: pides la pizza y las bebidas a la
 * vez, a dos repartidores, y comes cuando llegan las dos. Con dos await seguidos,
 * las bebidas no se piden hasta que llega la pizza.
 *
 * 🗣️ LAS PIEZAS
 * Promise.all([a, b]) → una promesa con [lo de a, lo de b], en ese orden.
 * [Clima, Ciudad]     → su tipo: TypeScript sabe qué hay en cada posición.
 * const [x, y] = …    → x es la posición 0 e y la 1, se llamen como se llamen.
 *
 * ⚠️ TRAMPA — Promise.all solo se entera de las promesas que rechazan, y la de
 * fetch no rechaza con un 404. Cada respuesta necesita su propio res.ok.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) saludoDelPortfolio — devuelve «Nicolás · 2 proyectos»: el nombre del perfil
 * y cuántos proyectos hay. Las dos peticiones ya salen a la vez, pero TypeScript
 * protesta y el saludo sale mal.
 * ¿Por qué? En el starter, ¿de dónde saca TypeScript el tipo de profile?
 * En el starter, la posición 0 del array es pedirProyectos, y se la lleva profile: por eso TypeScript dice que profile es un Project[]. El nombre de la variable no cuenta; cuenta la posición. Y la posición la da el orden en que se pasaron, no el orden en que llegan.
 */
export async function saludoDelPortfolio(): Promise<string> {
  const [profile, projects] = await Promise.all([pedirPerfil(), pedirProyectos()]);
  return `${profile.name} · ${projects.length} proyectos`;
}

/* 2) pedirALaVez — devuelve { projects, profile }. Ahora pide una detrás de otra:
 * el perfil no sale hasta que llega la lista. Tienen que salir las dos a la vez.
 * ¿Por qué? Si la lista tarda 0,9 s y el perfil 0,6 s, ¿cuánto tarda el starter
 * en devolver, y por qué?
 * «Porque estoy haciendo que dos peticiones independientes dependan innecesariamente una de la otra. El perfil no necesita esperar a que termine la descarga de proyectos para comenzar a solicitarse. Esto genera un tiempo de espera innecesario y empeora el rendimiento de la aplicación».
 */
export async function pedirALaVez(): Promise<{ projects: Project[]; profile: Profile }> {
  const [projects, profile] = await Promise.all([pedirProyectos(), pedirPerfil()]);
  return { projects, profile };
}

/* 3) pedirPortfolio — como tu usePortfolioData: Promise.all directamente sobre
 * los dos fetch. Devuelve { projects, profile }, y si una respuesta viene mal,
 * falla con «HTTP error — profile:404»: el nombre de la que falló y su status.
 * Ahora, con el perfil en 404, no falla.
 * ¿Por qué? Con el perfil en 404, ¿por qué no rechaza el Promise.all del starter?
 * Sí llega una respuesta del perfil: con el 404, la promesa de fetch se cumple con un Response de status 404, así que Promise.all no rechaza. El starter solo comprobaba projectsRes.ok; nadie miraba el ok del perfil, y el cuerpo del 404 salía como si fuera el perfil.
 */

// Creamos una función asíncrona que devuelve una promesa que resuelve con un objeto que contiene un array de proyectos y un perfil.
export async function pedirPortfolio(): Promise<{ projects: Project[]; profile: Profile }> {
  // Hacemos dos peticiones fetch a la API de proyectos y perfil a la vez usando Promise.all.
  const [projectsRes, profileRes] = await Promise.all([fetch(API_PROJECTS), fetch(API_PROFILE)]);

  // Si la respuesta de proyectos no es ok (status no está en el rango 200-299), lanzamos un error con el status.
  if (!projectsRes.ok) {
    throw new Error(`HTTP error — projects:${projectsRes.status}`);
  }
  // Si la respuesta de perfil no es ok (status no está en el rango 200-299), lanzamos un error con el status.
  if (!profileRes.ok) {
    throw new Error(`HTTP error — profile:${profileRes.status}`);
  }
  // Si ambas respuestas son ok, parseamos los cuerpos de las respuestas como JSON y los asignamos a las variables projects y profile.
  const projects: Project[] = await projectsRes.json();
  const profile: Profile = await profileRes.json();

  // Devolvemos un objeto que contiene el array de proyectos y el perfil.
  return { projects, profile };
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — las dos en el efecto
 *
 * DEFINICIÓN
 * En el efecto, una sola carga espera las dos peticiones y guarda los dos estados
 * juntos: la pantalla pasa de «Cargando…» a todo, nunca a la mitad. El controller
 * sigue siendo uno por pasada, y su signal viaja a las dos: un abort() las cancela
 * a la vez.
 *
 * SINTAXIS — dentro del load de siempre, el clima y la ciudad:
 * const [clima, ciudad] = await Promise.all([
 *   pedirClima(controller.signal),
 *   pedirCiudad(controller.signal),
 * ]);
 * setClima(clima);
 * setCiudad(ciudad);
 *
 * 🧠 ANALOGÍA — si te mudas, al salir por la puerta anulas los dos pedidos, no
 * solo la pizza.
 *
 * ⚠️ TRAMPA — Promise.all no cancela nada: si una rechaza, la otra sigue en vuelo
 * hasta que alguien llame a abort().
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) CabeceraAlCerrar — pinta «Cargando…» y después tu nombre y tu rol, con la
 * lista debajo. Si la sección se cierra antes de que lleguen, las dos peticiones
 * tienen que cancelarse. Ahora, al cerrar, una sigue viva.
 * ¿Por qué? ¿Qué cancela el abort() del starter, y qué no?
 * El abort del starter sólo cancela la petición de proyectos, porque el signal del controller sólo se pasa a pedirProyectos. La petición de perfil no tiene ningún signal, así que sigue viva aunque el componente se desmonte y se llame a abort(). Su respuesta no la lee nadie: Promise.all ya rechazó con la cancelada de proyectos, así que setProfile no llega a correr. Queda una petición gastando red para nada.
 */

// Creamos un componente funcional llamado CabeceraAlCerrar.
export function CabeceraAlCerrar() {
  // Declaramos dos estados: uno para los proyectos (un array de Project) y otro para el perfil (un objeto Profile o null).
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Una vez que el componente se monta, ejecutamos un efecto que carga los datos.
  useEffect(() => {
    // Creamos un nuevo AbortController para poder cancelar las peticiones si el componente se desmonta.
    const controller = new AbortController();

    // Definimos una función asíncrona llamada load que hace las peticiones a la API.
    const load = async () => {
      // Ejecuta el código que podría producir un error.
      // Si todo sale bien, continúa normalmente.
      try {
        const [lista, perfil] = await Promise.all([
          pedirProyectos(controller.signal),
          pedirPerfil(controller.signal),
        ]);
        setProjects(lista);
        setProfile(perfil);
      } catch {
        // Este drill no pinta errores: la cancelada y los fallos se quedan aquí.
      }
    };
    // Llamamos a la función load para iniciar las peticiones.
    load();
    // La función de limpieza del efecto se ejecuta cuando el componente se desmonta.
    return () => controller.abort();
  }, []);

  if (!profile) {
    return <p>Cargando…</p>;
  }

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

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ARMARLO TÚ — de una petición a dos
 *
 * El hook de la lista que ya sabes escribir, con una segunda petición dentro: las
 * dos a la vez, un solo controller y un solo catch. Es tu usePortfolioData sin
 * Zod, el timeout ni el snapshot.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) usePortfolio — Portada enseña tu nombre y tu rol, con la lista debajo. El
 * hook ya pide la lista; le falta el perfil, de API_PROFILE y a la vez que la
 * lista. Hoy devuelve null y Portada se queda en «Cargando…». Si una de las dos
 * falla, el aviso con su mensaje; al cerrar, ninguna petición viva. Portada ya
 * está bien: solo falla el hook.
 * ¿Por qué? Con el perfil en 404 y la lista bien, ¿llega a correr tu setProjects?
 * No: Promise.all rechaza con el error del perfil, así que la línea de setProjects nunca se ejecuta. El estado de projects se queda en su valor inicial (array vacío) y Portada no muestra ningún proyecto.
 */
export function usePortfolio(): {
  projects: Project[];
  profile: Profile | null;
  error: string | null;
} {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const [lista, perfil] = await Promise.all([
          pedirProyectos(controller.signal),
          pedirPerfil(controller.signal),
        ]);
        setProjects(lista);
        setProfile(perfil);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { projects, profile, error };
}

export function Portada() {
  const { projects, profile, error } = usePortfolio();

  if (error) {
    return <p role="alert">{error}</p>;
  }
  if (!profile) {
    return <p>Cargando…</p>;
  }

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
