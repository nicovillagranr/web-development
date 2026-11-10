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
 * ARMARLO TÚ → drill 5
 *
 * ▸ 5 drills en orden. Prohibidos any, as, el ! de «confía en mí» (x!) y los
 * eslint-disable.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-02.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-02.pistas.md. Drills 1–5: banco, pestaña 13.
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
 *
 */
export async function pedirCancelable(signal: AbortSignal): Promise<Project[]> {
  const res = await fetch(API_PROJECTS, signal);
  const projects: Project[] = await res.json();
  return projects;
}

/* 2) avisoDeCarga — devuelve «2 proyectos cargados», o los que lleguen. Si falla,
 * el mensaje del error, y si la cancelaron, «Carga cancelada». Ahora una
 * cancelación sale como un error más, con su propio mensaje.
 * ¿Por qué? En el catch del starter, ¿qué diferencia hay entre una cancelación y
 * la red caída?
 *
 */
export async function avisoDeCarga(signal: AbortSignal): Promise<string> {
  try {
    const res = await fetch(API_PROJECTS, { signal });
    const projects: Project[] = await res.json();
    return `${projects.length} proyectos cargados`;
  } catch (err) {
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
 *
 */
export function ProyectosAlCerrar() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch(API_PROJECTS, { signal: controller.signal });
        const data: Project[] = await res.json();
        setProjects(data);
        setLoading(false);
      } catch {
        if (controller.signal.aborted) return;
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p>Cargando…</p>;

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
 *
 */
export function CancelacionSilenciosa() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch(API_PROJECTS, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP error — ${res.status}`);
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
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
 *
 */
export function useProyecto(id: number): { project: Project | null; error: string | null } {
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_PROJECTS}/${id}`);
        if (!res.ok) throw new Error(`HTTP error — ${res.status}`);
        const data: Project = await res.json();
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    }

    load();
  }, [id]);

  return { project, error };
}

export function FichaProyecto({ id }: { id: number }) {
  const { project, error } = useProyecto(id);

  if (error) return <p role="alert">{error}</p>;
  if (!project) return <p>Cargando…</p>;

  return (
    <p>
      {project.name} · {project.status}
    </p>
  );
}
