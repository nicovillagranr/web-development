import { useEffect, useState } from "react";
import { z } from "zod";

/* =============================================================================
 * EJERCICIO 04 — no le creas a la API: validar con Zod · bloque 13
 *
 * 📌 RECORDATORIO — del 03, drill 7: .json() devuelve any, y TypeScript se cree
 * el tipo que le anotes. const data: Project[] = await res.json() no comprueba
 * nada: es una promesa tuya, y si la API manda otra cosa, nadie avisa.
 *
 * 🎯 OBJETIVOS
 * · Describir la forma de unos datos con un schema de Zod.
 * · Comprobarla al ejecutar con .parse, y sacar el tipo del schema con z.infer.
 * · Validar la respuesta de la API antes de devolverla o guardarla.
 *
 * 🟢 CONTEXTO — tu usePortfolioData no se fía de /projects ni de /profile: pasa
 * cada respuesta por ProjectsSchema.parse y ProfileSchema.parse (l.67-68). Si la
 * API cambia de forma, el error salta en la puerta, no en mitad del render.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · el schema y su tipo → drills 1–3
 * TEORÍA 2 · validar en la puerta → drill 4
 * TU HOOK → drill 5
 *
 * ▸ 5 drills en orden. Prohibidos any, as, el ! de «confía en mí» (x!) y los
 * eslint-disable. Zod ya está instalado e importado arriba.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-04.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-04.pistas.md. Drills 1–5: banco, pestaña 13.
 * ============================================================================= */

/* Las formas del 03, ahora como schemas. Los tipos ya no se escriben a mano: salen
 * de los schemas con z.infer. La API sigue sin existir: los tests y el banco
 * responden por ella. */
export const ProjectSchema = z.object({ id: z.number(), name: z.string(), status: z.string() });
export const ProjectsSchema = z.array(ProjectSchema);
export const ProfileSchema = z.object({ name: z.string(), role: z.string() });

export type Project = z.infer<typeof ProjectSchema>;
export type Profile = z.infer<typeof ProfileSchema>;

export const API_PROJECTS = "/api/projects";
export const API_PROFILE = "/api/profile";

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el schema y su tipo
 *
 * DEFINICIÓN
 * Un schema de Zod describe la forma de unos datos con valores que existen al
 * ejecutar, no solo para TypeScript. .parse(datos) comprueba los datos contra esa
 * forma: si encajan, te los devuelve con su tipo; si no, lanza un ZodError que
 * dice qué campo falló. Y z.infer saca el tipo del schema: una fuente para los dos.
 *
 * SINTAXIS — un clima cualquiera:
 * const ClimaSchema = z.object({ ciudad: z.string(), grados: z.number() });
 * type Clima = z.infer<typeof ClimaSchema>; // { ciudad: string; grados: number }
 * const clima = ClimaSchema.parse(datos);   // datos: unknown → clima: Clima
 *
 * 🧠 ANALOGÍA — anotar el tipo es creerle al repartidor que la caja trae lo que
 * pediste. .parse es abrirla en la puerta: si falta algo, lo devuelves ahí mismo.
 *
 * 🗣️ LAS PIEZAS
 * z.object({ … })         → un objeto con esas claves, cada una con su schema.
 * z.array(Schema)         → un array donde cada elemento cumple Schema.
 * z.string() · z.number() → un texto · un número.
 * Schema.parse(datos)     → los datos con su tipo, o un ZodError.
 * z.infer<typeof Schema>  → el tipo de TypeScript que describe Schema.
 *
 * ⚠️ TRAMPA — .parse no te devuelve tus datos tal cual: devuelve un objeto nuevo
 * con solo las claves que declaraste. Lo que el schema no nombra, se pierde.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) ContactoSchema — describe tus datos de contacto tal como llegan de /profile:
 * { email: "nico@ejemplo.com", github: "nicovillagranr", years: 2 }. Ahora .parse
 * rechaza un contacto que está bien.
 * ¿Por qué? Si el contacto está bien, ¿por qué el starter lo rechaza?
 * Porque desde la API years no viene en tipo string, sino en tipo number. Por eso el starter lo rechaza, ya que espera un string y recibe un number.
 */
export const ContactoSchema = z.object({
  email: z.string(),
  github: z.string(),
  years: z.number(),
});

/* 2) leerPerfil — recibe lo que llegó de /profile, sin tipo, y devuelve un Profile
 * comprobado: si le falta un campo, tiene que lanzar. Ahora TypeScript protesta, y
 * un perfil a medias pasa sin más.
 * ¿Por qué? ¿Por qué TypeScript no deja guardar data en una variable Profile?
 * Porque data es de tipo unknown, y TypeScript no permite asignar un valor de tipo unknown a una variable de tipo Profile sin una verificación previa. Por eso, al intentar asignar data directamente a una variable de tipo Profile, TypeScript protesta y requiere que se realice una validación o conversión antes de la asignación.
 */

// Creamos una función que recibe datos de tipo unknown y devuelve un objeto de tipo Profile. Utilizamos el método parse del ProfileSchema para validar los datos y asegurarnos de que cumplen con la forma esperada. Si los datos no cumplen con el schema, se lanzará un error.
export function leerPerfil(data: unknown): Profile {
  const profile = ProfileSchema.parse(data);
  return profile;
}

/* 3) ciudadDe — devuelve la ciudad del perfil, «Santiago, CL», que llega en la
 * clave based. La API sí la manda, pero el starter no la encuentra.
 * ¿Por qué? Si data trae based, ¿por qué no lo trae lo que devuelve .parse?
 * Porque el ProfileSchema no incluye la clave based en su definición. Al usar .parse con ProfileSchema, solo se validan y devuelven las claves definidas en el schema (name y role), y cualquier clave adicional como based se descarta. Por eso, aunque data tenga la clave based, no se encuentra en el objeto resultante de .parse.
 */
export const PerfilConCiudadSchema = z.object({
  name: z.string(),
  role: z.string(),
  based: z.string(),
});

export function ciudadDe(data: unknown): string {
  const perfil = PerfilConCiudadSchema.parse(data);
  return perfil.based;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — validar en la puerta
 *
 * DEFINICIÓN
 * El sitio para validar es justo donde los datos entran: después de res.ok y
 * antes de devolverlos o guardarlos en el estado. Si la forma no encaja, .parse
 * lanza, y ese ZodError sale por el mismo catch que un 404 o la red caída.
 *
 * SINTAXIS — el clima, comprobado al llegar:
 * const res = await fetch("/api/clima");
 * if (!res.ok) throw new Error(`HTTP error — ${res.status}`);
 * return ClimaSchema.parse(await res.json());
 *
 * 🧠 ANALOGÍA — revisas la caja en la puerta, no cuando ya está en la despensa y
 * alguien abre un paquete vacío.
 *
 * ⚠️ TRAMPA — validar después de guardar en el estado: la pantalla ya pintó lo
 * que llegó, roto.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) pedirProyectosValidados — pide la lista a API_PROJECTS y la devuelve
 * comprobada con ProjectsSchema. Si llega un proyecto sin status, tiene que
 * fallar. Ahora devuelve lo que llegue.
 * ¿Por qué? Con el starter y un proyecto sin status, ¿quién se entera, y cuándo?
 * Nadie en la función: TypeScript se cree la anotación Project[] y la función devuelve la lista tal cual. Se entera el componente cuando pinta el status: sale vacío (undefined), lejos de la petición y sin un error que diga qué campo faltó.
 */

// Creamos una función asíncrona que recibe la lista de proyectos desde la API y la valida utilizando el método parse del ProjectsSchema. Si algún proyecto no cumple con el schema, se lanzará un error.
export async function pedirProyectosValidados(): Promise<Project[]> {
  // Hacemos la petición a la API de proyectos y verificamos si la respuesta es correcta. Si no lo es, lanzamos un error con el estado HTTP.
  const res = await fetch(API_PROJECTS);
  // Si la hay respuesta negativa del servidor, lanzamos un error con el estado HTTP.
  if (!res.ok) {
    throw new Error(`HTTP error — projects:${res.status}`);
  }
  // Obtenemos los datos de la respuesta en formato JSON y los validamos utilizando el método parse del ProjectsSchema. Si los datos no cumplen con el schema, se lanzará un error.
  const data: unknown = await res.json();
  return ProjectsSchema.parse(data);
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TU HOOK — el usePortfolio del 03, con Zod
 *
 * Ahora las peticiones devuelven unknown, que es lo que de verdad sabes de lo que
 * llega. Es tu usePortfolioData sin el timeout ni el snapshot.
 * ───────────────────────────────────────────────────────────────────────────── */

/* Pide, comprueba res.ok y devuelve el JSON sin fingir un tipo. */

// Creamos una función asíncrona que recibe una URL y un AbortSignal opcional. Realiza una petición fetch a la URL proporcionada y verifica si la respuesta es correcta. Si no lo es, lanza un error con el estado HTTP. Luego, obtiene los datos de la respuesta en formato JSON y los devuelve como tipo unknown.
async function pedirJson(url: string, signal: AbortSignal | null = null): Promise<unknown> {
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(`HTTP error — ${url}:${res.status}`);
  }

  const data: unknown = await res.json();

  return data;
}

/* 5) usePortfolioValidado — PortadaValidada enseña tu nombre y tu rol con la
 * lista debajo, como la Portada del 03. Si la API manda algo que no encaja con
 * los schemas, como un perfil sin role, tiene que salir el aviso con el error de
 * Zod, no una portada rota. Ahora TypeScript protesta, y el perfil roto se pinta.
 * PortadaValidada ya está bien: solo falla el hook.
 * ¿Por qué? Con tu arreglo y un perfil sin role, ¿por qué camino llega el error
 * hasta el aviso?
 * ProfileSchema.parse lanza un ZodError dentro del try y la ejecución salta al catch. Como no se abortó, sigue; como un ZodError es un Error, setError guarda su mensaje. Con error en el estado, PortadaValidada pinta el aviso en vez de la portada.
 */

// Creamos un hook personalizado que maneja el estado de los proyectos, el perfil y los errores. Utiliza useEffect para realizar las peticiones a la API y validar los datos utilizando Zod. Si ocurre un error durante la petición o la validación, se guarda en el estado de error.
export function usePortfolioValidado(): {
  projects: Project[];
  profile: Profile | null;
  error: string | null;
} {
  // Seteamos el estado inicial de los proyectos como un array vacío de tipo Project
  const [projects, setProjects] = useState<Project[]>([]);
  // Seteamos el estado inicial del perfil como null, ya que aún no se ha cargado
  const [profile, setProfile] = useState<Profile | null>(null);
  // Seteamos el estado inicial del error como null, ya que aún no ha ocurrido ningún error
  const [error, setError] = useState<string | null>(null);

  // Una vez montado el componente, ejecutamos el efecto
  useEffect(() => {
    // Creamos un nuevo AbortController para poder cancelar las peticiones si el componente se desmonta
    const controller = new AbortController();

    // Creamos una función asíncrona que realiza las peticiones a la API y valida los datos utilizando Zod. Si ocurre un error durante la petición o la validación, se guarda en el estado de error.
    const load = async () => {
      try {
        const [lista, perfil] = await Promise.all([
          pedirJson(API_PROJECTS, controller.signal),
          pedirJson(API_PROFILE, controller.signal),
        ]);
        setProjects(ProjectsSchema.parse(lista));
        setProfile(ProfileSchema.parse(perfil));
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    };

    load();
    return () => controller.abort();
  }, []);

  return { projects, profile, error };
}

export function PortadaValidada() {
  const { projects, profile, error } = usePortfolioValidado();

  // Si hay un error, lo renderizamos
  if (error) {
    return <p role="alert">{error}</p>;
  }
  // Si el perfil aún no se ha cargado, mostramos un mensaje de carga
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
