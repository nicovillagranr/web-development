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
 * TEORÍA 2 · cargando, listo o error → drills 2–4
 * ARMARLO TÚ → drill 5
 *
 * ▸ 5 drills en orden. Prohibidos any, as, el ! de «confía en mí» (x!) y los
 * eslint-disable.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-01.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo. Pistas: exercise-01.pistas.md.
 * Drills 1–5: banco, pestaña 13.
 * ============================================================================= */

/* La forma de un proyecto, recortada de tu ProjectSchema, y la ruta de la API.
 * La API no existe: los tests y el banco responden por ella. */
export type Project = { id: number; name: string; status: string };

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

/* 1) ListaDeProyectos — pide los proyectos al montar. Mientras llegan, pinta
 * «Cargando…»; después, un <li> por proyecto con su nombre. Arregla el efecto
 * sin cambiar lo que hace.
 * ¿Por qué? ¿Qué devuelve una función async, aunque no tenga return? ¿Y qué hace
 * React con lo que devuelve un efecto?
 *
 */
export function ListaDeProyectos() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const res = await fetch(API_PROJECTS);
    const data: Project[] = await res.json();
    setProjects(data);
    setLoading(false);
  }, []);

  if (loading) return <p>Cargando…</p>;

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
 *
 */
export function ProyectosSinRed() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API_PROJECTS);
        const data: Project[] = await res.json();
        setProjects(data);
        setLoading(false);
      } catch {
        setError("No se pudieron cargar los proyectos");
      }
    }
    load();
  }, []);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p role="alert">{error}</p>;

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
 *
 */
export function MotivoDelError() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API_PROJECTS);
        const data: Project[] = await res.json();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p role="alert">{error}</p>;

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
 * ¿Por qué? Con el 404, fetch no saltó al catch. ¿Por qué, si la petición salió
 * mal?
 *
 */
export function ProyectosQueNoEstan() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API_PROJECTS);
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p role="alert">{error}</p>;

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
 *
 */
export function useProjects(): { projects: Project[]; loading: boolean; error: string | null } {
  return { projects: [], loading: true, error: null };
}

export function SeccionProyectos() {
  const { projects, loading, error } = useProjects();

  if (loading) return <p>Cargando…</p>;
  if (error) return <p role="alert">{error}</p>;

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
