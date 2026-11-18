import { useEffect, useState } from "react";
import { z } from "zod";

/* =============================================================================
 * EJERCICIO 06 — el plan B: si falla en vivo, el snapshot · bloque 13
 *
 * 📌 RECORDATORIO — del 05: las peticiones en vivo llevan la señal combinada
 * (desmontaje + reloj), y el catch se calla si el usuario se fue. Del 04: lo que
 * llega se valida con .parse.
 *
 * 🎯 OBJETIVOS
 * · Intentar un camino de respaldo dentro del catch, con su propio try/catch.
 * · Darle al respaldo la señal que le toca: la del desmontaje, sin el reloj.
 * · Avisar de que lo que se ve viene del snapshot.
 *
 * 🟢 CONTEXTO — si Vercel se cae o tarda más de 4 s, tu portada no enseña un
 * error: lee /data-snapshot.json, una copia de tus datos que el build guarda en el
 * mismo Hostinger que la app. Es la mitad de abajo de tu usePortfolioData
 * (l.72-113 de usePortfolioDataWithFallback.js).
 *
 * 🗺️ MAPA
 * TEORÍA 1 · el plan B dentro del catch → drills 1–3
 * TEORÍA 2 · la señal del plan B → drill 4
 * TU HOOK → drill 5
 *
 * ▸ 5 drills en orden. Prohibidos el tipo any, as, el ! de «confía en mí» (x!) y
 * los eslint-disable.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-06.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-06.pistas.md. Drills 1–5: banco, pestaña 13.
 * ============================================================================= */

/* Las formas del 04 y del 05. El snapshot trae tu lista, tu perfil y la fecha en que
 * se generó, y su schema está hecho con los otros dos. La API y el snapshot siguen
 * sin existir: los tests y el banco responden por ellos. */
export const ProjectSchema = z.object({ id: z.number(), name: z.string(), status: z.string() });
export const ProjectsSchema = z.array(ProjectSchema);
export const ProfileSchema = z.object({ name: z.string(), role: z.string() });
export const SnapshotSchema = z.object({
  generatedAt: z.string(),
  projects: ProjectsSchema,
  profile: ProfileSchema,
});

export type Project = z.infer<typeof ProjectSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Snapshot = z.infer<typeof SnapshotSchema>;

/* Lo que pinta la portada: tus datos, y si vienen del snapshot (stale). */
export type Portada = { projects: Project[]; profile: Profile; stale: boolean };

export const API_PROJECTS = "/api/projects";
export const API_PROFILE = "/api/profile";
export const API_SNAPSHOT = "/data-snapshot.json";

/* Pide, comprueba res.ok y devuelve el JSON sin fingir un tipo. */
async function pedirJson(url: string, signal: AbortSignal): Promise<unknown> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP error — ${url}:${res.status}`);
  const data: unknown = await res.json();
  return data;
}

/* Tu fetchLive sin el reloj: pide tu lista y tu perfil a la vez, con el signal que
 * recibe, y los devuelve validados. Si algo falla, lanza. */
async function pedirEnVivo(signal: AbortSignal): Promise<{ projects: Project[]; profile: Profile }> {
  const [lista, perfil] = await Promise.all([
    pedirJson(API_PROJECTS, signal),
    pedirJson(API_PROFILE, signal),
  ]);
  return { projects: ProjectsSchema.parse(lista), profile: ProfileSchema.parse(perfil) };
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el plan B dentro del catch
 *
 * DEFINICIÓN
 * Un catch no tiene por qué rendirse: puede intentar otro camino, el respaldo.
 * Pero lo que falle dentro del catch ya no lo atrapa su try: sale de la función,
 * como si no hubiera try. Por eso el plan B lleva su propio try/catch, dentro del
 * catch.
 *
 * SINTAXIS — el clima en vivo, y si no, el de ayer:
 * try {
 *   return await pedirClima();
 * } catch {
 *   try {
 *     return await leerClimaDeAyer();
 *   } catch {
 *     return null; // ni en vivo ni el de ayer
 *   }
 * }
 *
 * 🧠 ANALOGÍA — si el restaurante no contesta, abres el congelador. Si el
 * congelador también está vacío, ya no queda otro plan: ahí sí te quedas sin cenar.
 *
 * 🗣️ LAS PIEZAS
 * snapshot → una copia de tus datos guardada en el build, en el mismo servidor que
 *            la app: si la página cargó, el archivo está.
 * stale    → «pasado»: true cuando lo que se ve viene del snapshot y no de la API.
 *
 * ⚠️ TRAMPA — un error dentro del catch no vuelve a caer en el mismo catch.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) leerSnapshot — pide API_SNAPSHOT con el signal que recibe y lo devuelve
 * validado entero: la fecha, tu lista y tu perfil. Ahora lo valida como si fuera
 * solo la lista.
 */
export async function leerSnapshot(signal: AbortSignal): Promise<Snapshot> {
  return ProjectsSchema.parse(await pedirJson(API_SNAPSHOT, signal));
}

/* 2) pedirConRespaldo — pide tus datos en vivo con el signal que recibe. Si eso
 * falla, por lo que sea, lee el snapshot y devuelve sus datos con stale en true; si
 * no, los de la API con stale en false. Ahora, si falla en vivo, falla entera,
 * aunque el snapshot esté bien.
 * ¿Por qué? Con el starter y la API caída, ¿quién lee el snapshot?
 *
 */
export async function pedirConRespaldo(signal: AbortSignal): Promise<Portada> {
  try {
    const vivo = await pedirEnVivo(signal);
    return { ...vivo, stale: false };
  } catch {
    throw new Error("La API no contestó");
  }
}

/* Lo que recibe el drill 3: apunta lo que se pintaría, como texto. */
type Apuntar = (cambio: string) => void;

/* 3) cargarConRespaldo — el load de tu hook, sin estado. Apunta «en vivo» si
 * llegaron los datos de la API, «snapshot» si llegaron los del respaldo, y «error:»
 * con el mensaje si fallan los dos. Si el usuario se fue, nada. Ahora, si fallan
 * los dos, el error se escapa sin apuntar nada.
 * ¿Por qué? En el starter, cuando leerSnapshot lanza, ¿qué catch lo atrapa?
 *
 */
export async function cargarConRespaldo(signal: AbortSignal, apuntar: Apuntar): Promise<void> {
  try {
    await pedirEnVivo(signal);
    apuntar("en vivo");
  } catch {
    if (signal.aborted) return;
    await leerSnapshot(signal);
    apuntar("snapshot");
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — la señal del plan B
 *
 * DEFINICIÓN
 * Cuando salta el reloj, la señal combinada queda abortada para siempre. Si el
 * plan B sale con ella, nace cortado: fetch rechaza al instante, sin llegar a
 * salir. El plan B lleva solo la señal del desmontaje: si el usuario se fue, sí hay
 * que cortarlo; el reloj ya hizo su trabajo.
 *
 * SINTAXIS — el clima con 3 s de paciencia, y el de ayer de respaldo:
 * const combinada = AbortSignal.any([controller.signal, AbortSignal.timeout(3000)]);
 * pedirClima(combinada);              // en vivo: al desmontar o a los 3 s
 * leerClimaDeAyer(controller.signal); // el respaldo: solo al desmontar
 *
 * 🧠 ANALOGÍA — tu entrada al concierto vence a las 21:00. Si llegas tarde y
 * pruebas por la puerta de atrás con la misma entrada, tampoco te dejan pasar.
 *
 * ⚠️ TRAMPA — en el catch tienes las dos señales a mano, y la que llevas usando
 * todo el rato es la combinada.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) pedirConLimiteYRespaldo — como el 2, pero en vivo no espera más de limiteMs, y
 * quien llama puede cancelar con su signal. Si en vivo no contesta a tiempo, el
 * snapshot, con stale en true. Ahora, con la API lenta, falla con TimeoutError
 * aunque el snapshot esté bien.
 * ¿Por qué? Con el starter y la API lenta, cuando sale el plan B, ¿cuánto vale
 * aborted en la señal que lleva?
 *
 */
export async function pedirConLimiteYRespaldo(
  signal: AbortSignal,
  limiteMs: number,
): Promise<Portada> {
  const combinada = AbortSignal.any([signal, AbortSignal.timeout(limiteMs)]);
  try {
    const vivo = await pedirEnVivo(combinada);
    return { ...vivo, stale: false };
  } catch {
    const snapshot = await leerSnapshot(combinada);
    return { projects: snapshot.projects, profile: snapshot.profile, stale: true };
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TU HOOK — tu usePortfolioData con red de seguridad
 *
 * Es tu usePortfolioDataWithFallback entero: en vivo con reloj, y si falla por lo
 * que sea, el snapshot, con su propio try/catch y la señal del desmontaje.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) usePortfolioConRespaldo — PortadaConRespaldo enseña tu nombre y tu rol con la
 * lista debajo. Si en vivo falla o no contesta en limiteMs, los datos del snapshot
 * con el aviso «Datos del último deploy»; si falla también el snapshot, el aviso
 * con su error; si se desmonta antes, nada. Ahora, si en vivo falla, enseña el
 * error. PortadaConRespaldo ya está bien: solo falla el hook.
 * ¿Por qué? Con tu arreglo y la API caída, si cierras la portada mientras se lee el
 * snapshot, ¿qué señal corta esa lectura?
 *
 */
export function usePortfolioConRespaldo(limiteMs: number): {
  projects: Project[];
  profile: Profile | null;
  error: string | null;
  stale: boolean;
} {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(limiteMs)]);

    async function load() {
      try {
        const vivo = await pedirEnVivo(signal);
        setProjects(vivo.projects);
        setProfile(vivo.profile);
        setStale(false);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    }

    load();
    return () => controller.abort();
  }, [limiteMs]);

  return { projects, profile, error, stale };
}

export function PortadaConRespaldo({ limiteMs }: { limiteMs: number }) {
  const { projects, profile, error, stale } = usePortfolioConRespaldo(limiteMs);

  if (error) return <p role="alert">{error}</p>;
  if (!profile) return <p>Cargando…</p>;

  return (
    <section>
      <h3>
        {profile.name} · {profile.role}
      </h3>
      {stale && <p>Datos del último deploy</p>}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </section>
  );
}
