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
 * TEORÍA 2 · dos motivos, una señal → drills 3–4
 * TU HOOK → drill 5
 *
 * ▸ 5 drills en orden. Prohibidos el tipo any, as, el ! de «confía en mí» (x!) y
 * los eslint-disable. Los límites llegan como parámetro, en milisegundos.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-05.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-05.pistas.md. Drills 1–5: banco, pestaña 13.
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
 *
 */
export async function pedirConLimite(limiteMs: number): Promise<Project[]> {
  const inicio = Date.now();
  const res = await fetch(API_PROJECTS);
  if (Date.now() - inicio > limiteMs) throw new Error("La API tardó demasiado");
  if (!res.ok) throw new Error(`HTTP error — projects:${res.status}`);
  const data: unknown = await res.json();
  return ProjectsSchema.parse(data);
}

/* Pide la lista con el signal que recibe y la devuelve validada. */
async function pedirLista(signal: AbortSignal): Promise<Project[]> {
  const res = await fetch(API_PROJECTS, { signal });
  if (!res.ok) throw new Error(`HTTP error — projects:${res.status}`);
  const data: unknown = await res.json();
  return ProjectsSchema.parse(data);
}

/* 2) pedirConReintento — tu API en Vercel a veces responde el primer 500 mientras
 * despierta. Si el primer intento falla, pide la lista otra vez. Cada intento tiene
 * su propio límite de limiteMs. Ahora el segundo intento se corta aunque la API ya
 * conteste bien. Aquí no hay ninguna línea mal escrita.
 * ¿Por qué? Con el starter, si el primer intento falla a los 0,9 s y el límite es
 * 1,5 s, ¿cuánto reloj le queda al segundo intento cuando sale?
 *
 */
export async function pedirConReintento(limiteMs: number): Promise<Project[]> {
  const signal = AbortSignal.timeout(limiteMs);
  try {
    return await pedirLista(signal);
  } catch {
    return await pedirLista(signal);
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
 *
 */
export async function pedirCancelableConLimite(
  signal: AbortSignal,
  limiteMs: number,
): Promise<Project[]> {
  const res = await fetch(API_PROJECTS, { signal: [signal, AbortSignal.timeout(limiteMs)] });
  if (!res.ok) throw new Error(`HTTP error — projects:${res.status}`);
  const data: unknown = await res.json();
  return ProjectsSchema.parse(data);
}

/* 4) ListaConLimite — pinta «Cargando…» y después tus proyectos. Si la API no
 * contesta en limiteMs, el aviso «La API tardó demasiado»; si se desmonta antes,
 * nada. Ahora, con la API lenta, se queda en «Cargando…» para siempre.
 * ¿Por qué? Con el starter y el límite vencido, ¿cuánto vale signal.aborted en el
 * catch, y qué hace entonces la primera línea?
 *
 */
export function ListaConLimite({ limiteMs }: { limiteMs: number }) {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(limiteMs)]);

    async function load() {
      try {
        const lista = await pedirLista(signal);
        setProjects(lista);
      } catch (err) {
        if (signal.aborted) return;
        if (err instanceof Error && err.name === "TimeoutError") {
          setError("La API tardó demasiado");
          return;
        }
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    }

    load();
    return () => controller.abort();
  }, [limiteMs]);

  if (error) return <p role="alert">{error}</p>;
  if (!projects) return <p>Cargando…</p>;

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
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP error — ${url}:${res.status}`);
  const data: unknown = await res.json();
  return data;
}

/* 5) usePortfolioConLimite — PortadaConLimite enseña tu nombre y tu rol con la
 * lista debajo. Si la API no contesta en limiteMs, el aviso «La API tardó
 * demasiado»; si los datos no encajan, el aviso con el error de Zod, como en el
 * 04; si se desmonta antes, nada. Ahora espera a la API lo que tarde.
 * PortadaConLimite ya está bien: solo falla el hook.
 * ¿Por qué? Con tu arreglo y la API colgada, ¿cuántas peticiones corta el reloj?
 *
 */
export function usePortfolioConLimite(limiteMs: number): {
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
          pedirJson(API_PROJECTS, controller.signal),
          pedirJson(API_PROFILE, controller.signal),
        ]);
        const projectsOk = ProjectsSchema.parse(lista);
        const profileOk = ProfileSchema.parse(perfil);
        setProjects(projectsOk);
        setProfile(profileOk);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    }

    load();
    return () => controller.abort();
  }, [limiteMs]);

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
