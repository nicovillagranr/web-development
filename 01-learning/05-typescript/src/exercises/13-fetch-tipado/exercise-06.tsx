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
 * ESCALERA · las dos señales del 4 → peldaños 4a–4c, debajo del 4
 * ESCALERA · tu hook del 5, pieza a pieza → peldaños 5a–5c, antes del 5
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

/* Lo que pinta la portada: tus datos, y si vienen del snapshot (deRespaldo). */
export type Portada = { projects: Project[]; profile: Profile; deRespaldo: boolean };

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
async function pedirEnVivo(
  signal: AbortSignal,
): Promise<{ projects: Project[]; profile: Profile }> {
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
 * snapshot   → una copia de tus datos guardada en el build, en el mismo servidor
 *              que la app: si la página cargó, el archivo está.
 * deRespaldo → true cuando lo que se ve viene del snapshot y no de la API. En tu
 *              portfolio se llama stale: «pasado», en inglés.
 *
 * ⚠️ TRAMPA — un error dentro del catch no vuelve a caer en el mismo catch.

//  ─────────────────────────────────────────────────────────────────────────────
//  ─────────────────────────────────────────────────────────────────────────────
//  ─────────────────────────────────────────────────────────────────────────────

/* 1) leerSnapshot — pide API_SNAPSHOT con el signal que recibe y lo devuelve
 * validado entero: la fecha, tu lista y tu perfil. Ahora lo valida como si fuera
 * solo la lista.
 */
export async function leerSnapshot(signal: AbortSignal): Promise<Snapshot> {
  // Qué es un snapshot? Un snapshot es una copia de tus datos guardada en el build, en el mismo servidor que la app.
  // Si la página cargó, el archivo está disponible para ser leído.
  // Creamos una variable para almacenar el snapshot que obtenemos de la API.
  const snapshot = await pedirJson(API_SNAPSHOT, signal);
  return SnapshotSchema.parse(snapshot);
}

//  ─────────────────────────────────────────────────────────────────────────────
//  ─────────────────────────────────────────────────────────────────────────────
//  ─────────────────────────────────────────────────────────────────────────────

/* 2) pedirConRespaldo — pide tus datos en vivo con el signal que recibe. Si eso
 * falla, por lo que sea, lee el snapshot y devuelve sus datos con deRespaldo en true; si
 * no, los de la API con deRespaldo en false. Ahora, si falla en vivo, falla entera,
 * aunque el snapshot esté bien.
 * ¿Por qué? Con el starter y la API caída, ¿quién lee el snapshot?
 *
 */
export async function pedirConRespaldo(signal: AbortSignal): Promise<Portada> {
  try {
    // Intento principal: API en vivo
    const vivo = await pedirEnVivo(signal);
    // -> Se llama a pedirEnVivo con la señal proporcionada.
    // Esta función solicita los proyectos y el perfil en paralelo,
    // y valida los datos recibidos mediante Zod.

    // Si los datos llegan correctamente, devolvemos un objeto
    // con los datos obtenidos y deRespaldo: false, indicando que
    // provienen de la API en vivo.
    return { ...vivo, deRespaldo: false };
  } catch {
    // Falló la API
    const snapshot = await leerSnapshot(signal);
    // -> Se llama a leerSnapshot con la señal proporcionada.
    // Esta función recupera el archivo JSON de respaldo y valida
    // su estructura completa mediante SnapshotSchema.

    // Devolvemos los proyectos y el perfil del snapshot,
    // junto con deRespaldo: true, indicando que estamos utilizando
    // los datos de respaldo en lugar de los datos en vivo.
    return {
      projects: snapshot.projects,
      profile: snapshot.profile,
      deRespaldo: true,
    };
  }
}

/* Lo que recibe el drill 3: apunta lo que se pintaría, como texto. */
type Apuntar = (cambio: string) => void;

/* 3) cargarConRespaldo — el load de tu hook, sin estado. Apunta «en vivo» si
 * llegaron los datos de la API, «snapshot» si llegaron los del respaldo, y «error:»
 * con el mensaje si fallan los dos. Si el usuario se fue, nada. Ahora, si fallan
 * los dos, el error se escapa sin apuntar nada.
 * ¿Por qué? En el starter, cuando leerSnapshot lanza, ¿qué catch lo atrapa?
 * Ahora leerSnapshot tiene su propio catch que captura su error y apunta el mensaje. Si el usuario se fue, no apunta nada.
 */
export async function cargarConRespaldo(signal: AbortSignal, apuntar: Apuntar): Promise<void> {
  try {
    // Intentar API en vivo
    await pedirEnVivo(signal);
    apuntar("en vivo");
  } catch {
    // Comprobar si el usuario se fue
    if (signal.aborted) return;
    try {
      // Intentar snapshot
      await leerSnapshot(signal);
      apuntar("snapshot");
    } catch (error) {
      // Capturar el fallo del snapshot
      if (signal.aborted) return;
      apuntar(`error: ${error instanceof Error ? error.message : "Error desconocido"}`);
    }
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
 * snapshot, con deRespaldo en true. Ahora, con la API lenta, falla con TimeoutError
 * aunque el snapshot esté bien.
 * ¿Por qué? Con el starter y la API lenta, cuando sale el plan B, ¿cuánto vale
 * aborted en la señal que lleva?
 *
 */
export async function pedirConLimiteYRespaldo(
  signal: AbortSignal,
  limiteMs: number,
): Promise<Portada> {
  // Combinamos la señal del desmontaje con una señal de tiempo límite usando AbortSignal.any. Esto permite que la petición se aborte si cualquiera de las dos señales se aborta, ya sea porque el componente se desmontó o porque se alcanzó el límite de tiempo.
  const combinada = AbortSignal.any([signal, AbortSignal.timeout(limiteMs)]);

  try {
    // Hacemos la petición en vivo con la señal combinada.
    // Si la petición se completa antes de que se alcance el límite de tiempo o que el componente se desmonte,
    // devolvemos los datos obtenidos con deRespaldo en false.
    const vivo = await pedirEnVivo(combinada);
    return { ...vivo, deRespaldo: false };
  } catch {
    // Si la petición en vivo falla (por ejemplo, por un timeout o un error de red),
    // hacemos la petición del snapshot con la señal del desmontaje.
    // Esto asegura que si el componente se desmonta mientras se está leyendo el snapshot,
    // la petición se abortará y no se intentará actualizar el estado del componente.
    const snapshot = await leerSnapshot(signal);
    return { projects: snapshot.projects, profile: snapshot.profile, deRespaldo: true };
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — las dos señales del 4, pieza a pieza (refuerzo)
 *
 * Cada señal se aborta por un solo motivo. A · en vivo hay dos motivos para cortar,
 * y por eso va la combinada (4a–4b) · B · el respaldo tiene uno, y va la señal que
 * sigue viva (4c). Al terminar, vuelve a leer tu 4.
 *
 * 📌 EnVivo es lo que devuelve pedirEnVivo: { projects, profile }, ya validados.
 * ───────────────────────────────────────────────────────────────────────────── */
type EnVivo = { projects: Project[]; profile: Profile };
/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ A — en vivo: dos motivos para cortar
 *
 * DEFINICIÓN
 * fetch escucha una sola señal, y corta la espera si esa señal se aborta mientras
 * espera. Mirar otra señal con un if antes de pedir no es escucharla: si se aborta
 * después, nadie se entera. Para cortar por dos motivos, los dos tienen que ir
 * dentro de la señal que recibe fetch: eso es la combinada.
 *
 * SINTAXIS — el clima, que corta si te vas o a los 3 s, lo que pase antes:
 * const reloj = AbortSignal.timeout(3000);
 * pedirClima(AbortSignal.any([signal, reloj]));
 *
 * 🧠 ANALOGÍA — esperas a alguien en el aeropuerto y te vas por dos motivos: que te
 * escriba que no viene, o que pase una hora. Mirar el reloj solo al llegar no
 * sirve: las dos alarmas tienen que estar puestas mientras esperas.
 *
 * 🗣️ LAS PIEZAS
 * signal                  → la de quien llama: se aborta si el usuario se va.
 * AbortSignal.timeout(ms) → el reloj: se aborta solo a los ms, si Vercel tarda.
 * AbortSignal.any([a, b]) → la combinada: se aborta con la primera de las dos.
 *
 * ⚠️ TRAMPA — un if (x.aborted) antes del await mira la señal una vez, al salir.
 * Durante la espera ya no la mira nadie.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4a) enVivoConReloj — pide tus datos en vivo. signal es la del usuario y reloj, la
 * del límite: tiene que cortar por cualquiera de las dos, lo que pase antes. Ahora,
 * si Vercel tarda, espera lo que tarde.
 * ¿Por qué? En el starter, con Vercel tardando y nadie cancelando, ¿quién corta la
 * petición?
 * Nadie, el reloj solo se mira al principio.
 * Solo se ve si el reloj se abortó, no si tardó más que lo definido por el reloj.
 * Por eso en mi ajuste, hacemos una combinada del signal junto con el reloj
 */

// Creamos una función asíncrona llamada enVivoConReloj que recibe dos señales de aborto: signal y reloj. Esta función devuelve una promesa que resuelve con un objeto EnVivo, que contiene los proyectos y el perfil obtenidos de la API en vivo.
export async function enVivoConReloj(signal: AbortSignal, reloj: AbortSignal): Promise<EnVivo> {
  // Combinamos 2 señales para abortar la petición: Si el tiempo límite se alcanza o si el usuario se va, la petición se abortará.
  const combinada = AbortSignal.any([signal, reloj]);
  // Hacemos la petición en vivo con la señal combinada. Si la petición se completa antes de que se alcance el límite de tiempo o que el usuario se vaya, devolvemos los datos obtenidos.
  return await pedirEnVivo(combinada);
}

/* 4b) enVivoConSalida — lo mismo que el 4a, pero aquí falla el otro motivo: si el
 * usuario se va mientras espera, la petición sigue.
 * ¿Por qué? En el starter, si el usuario se va mientras espera, ¿quién corta la
 * petición?
 * Nadie, la petición sigue esperando a que la API responda. Por eso en mi ajuste, hacemos una verificación de si el signal está abortado antes de hacer la petición.
 */
export async function enVivoConSalida(signal: AbortSignal, reloj: AbortSignal): Promise<EnVivo> {
  const combinada = AbortSignal.any([signal, reloj]);
  return await pedirEnVivo(combinada);
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ B — el respaldo: la señal que sigue viva
 *
 * DEFINICIÓN
 * El respaldo tiene un solo motivo para cortar: que el usuario se vaya. Reloj no le
 * hace falta, porque el snapshot vive en el mismo servidor que la app. Y la
 * combinada ya no sirve: si estás en el catch porque saltó el reloj, quedó
 * abortada para siempre.
 *
 * SINTAXIS — el clima de ayer, con lo que queda vivo en el catch:
 * leerClimaDeAyer(signal); // solo se corta si te vas
 *
 * 🧠 ANALOGÍA — la alarma de «ya no espero más» sonó y sigue sonando. Si pones la
 * comida de repuesto con esa misma alarma, la sacas del fuego al instante.
 *
 * ⚠️ TRAMPA — una señal nueva sin mando, new AbortController().signal, tampoco vale:
 * nace viva, pero si el usuario se va, nadie la corta.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4c) respaldoConLaQueQueda — pide en vivo con combinada, que ya trae los dos
 * motivos. Si falla, lee el snapshot: tiene que llegar, y cortarse si el usuario se
 * va. Ahora, si en vivo falló porque saltó el reloj, el snapshot falla al instante
 * aunque esté bien.
 * ¿Por qué? De los dos motivos que lleva la combinada, ¿cuál no le hace falta al
 * snapshot?
 * En el snapshot no hace falta el reloj, porque si le queremos dar la oportunidad de cargar los datos, no queremos que se corte por el tiempo límite. Solo necesitamos la señal del usuario para poder abortar la lectura si el usuario abandona la página.
 */

// signal: El usuario abandona la página
// reloj: El tiempo límite para la petición en vivo
// combinada: La combinación de signal y reloj, que se aborta si cualquiera de los dos se aborta

// Creamos una función asíncrona que recibe dos señales de aborto: signal y combinada.
// Esta función devuelve una promesa que resuelve con un objeto EnVivo, que contiene los proyectos y el perfil obtenidos de la API en vivo o del snapshot.
export async function respaldoConLaQueQueda(
  signal: AbortSignal,
  combinada: AbortSignal,
): Promise<EnVivo> {
  try {
    // Hacemos la petición en vivo con la señal combinada.
    // Esta señal contempla dos motivos de cancelación:
    // que el usuario abandone la página o que se agote el tiempo límite.
    return await pedirEnVivo(combinada);
  } catch {
    // Si falla la petición en vivo, intentamos recuperar los datos desde el snapshot.
    // Aquí utilizamos solamente signal porque NO NECESITAMOS PONERLE UN TECHO
    // DE TIEMPO AL SNAPSHOT. ¿Por qué haríamos eso?
    // El timeout ya cumplió su función: cancelar la petición en vivo si tarda demasiado.
    // Ahora queremos darle al snapshot la oportunidad de cargar los datos,
    // pero manteniendo la posibilidad de cancelar su lectura si el usuario abandona la página.
    const snapshot = await leerSnapshot(signal);

    // Retornamos los proyectos y el perfil obtenidos del snapshot.
    return { projects: snapshot.projects, profile: snapshot.profile };
  }
}
/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — tu hook del 5, pieza a pieza (antes del 5)
 *
 * El 5 mete el plan B en el load de tu hook, con estado. Cada bloque trabaja una
 * pieza: A · el plan B dentro del load (5a) · B · la guardia de cada catch (5b) ·
 * C · qué estado deja cada camino (5c). Sin reloj: ese ya lo practicaste arriba.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ A — el plan B dentro del load
 *
 * DEFINICIÓN
 * En el hook, el plan B va en el catch del load, como en tu 3: con su propio
 * try/catch y con la señal del controller. Lo que cambia es el final de cada
 * camino: en vez de apuntar, guarda en el estado.
 *
 * SINTAXIS — el clima en un hook, y si no, el de ayer:
 * async function load() {
 *   try {
 *     setClima(await pedirClima(controller.signal));
 *   } catch {
 *     if (controller.signal.aborted) return;
 *     try {
 *       setClima(await leerClimaDeAyer(controller.signal));
 *     } catch (err) {
 *       if (controller.signal.aborted) return;
 *       setError(err instanceof Error ? err.message : "Error desconocido");
 *     }
 *   }
 * }
 *
 * 🧠 ANALOGÍA — el congelador de la Teoría 1, pero lo que sacas va directo al plato.
 *
 * ⚠️ TRAMPA — un setError en el catch de fuera se rinde antes de abrir el congelador.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5a) usePerfilConRespaldo — PerfilConRespaldo enseña tu nombre y tu rol. Si la API
 * falla, los del snapshot; si falla también el snapshot, el aviso con su error.
 * Ahora, si la API falla, enseña el error aunque el snapshot esté bien.
 * PerfilConRespaldo ya está bien: solo falla el hook.
 * ¿Por qué? En el starter, con la API caída, ¿qué hace el catch con el fallo?
 * Se rinde, guarda el error y ni señal del snapshot
 */

// Creamos un hook personalizado llamado usePerfilConRespaldo que devuelve un objeto con el perfil y el error.
export function usePerfilConRespaldo(): { profile: Profile | null; error: string | null } {
  // Seteamos el estado inicial del perfil como type Profile o null, y parte como null.
  const [profile, setProfile] = useState<Profile | null>(null);
  // Seteamos el estado inicial del error como type string o null, y parte como null.
  const [error, setError] = useState<string | null>(null);

  // Una vez montado el componente, ejecutamos el efecto para cargar los datos del perfil.
  useEffect(() => {
    // Creamos un controlador de aborto para poder cancelar la petición si el componente se desmonta.
    const controller = new AbortController();

    // Una vez montado el componente, ejecutamos la función load para cargar los datos del perfil.
    async function load() {
      // try para ejecutar código que podría fallar
      try {
        // Pedimos los datos del perfil a la API usando la función pedirJson y la señal del controlador.
        const data = await pedirJson(API_PROFILE, controller.signal);
        // Una vez lleguen los datos, los validamos usando ProfileSchema de Zod
        const perfilValidado = ProfileSchema.parse(data);
        // Si la validación es exitosa, actualizamos el estado del perfil con los datos validados.
        setProfile(perfilValidado);
        // Si ocurre un error durante la petición o la validación, entramos en el catch.
      } catch {
        // Si la petición a la API falla, primero comprobamos si el usuario
        // abandonó la página. Si es así, detenemos la ejecución y no intentamos
        // cargar el snapshot.
        if (controller.signal.aborted) return;

        // Intentamos recuperar los datos del perfil desde el snapshot,
        // ya que la fuente principal (la API) ha fallado.
        try {
          const snapshot = await leerSnapshot(controller.signal);

          // Si el snapshot se carga correctamente, actualizamos el estado
          // del perfil con los datos de respaldo.
          setProfile(snapshot.profile);
        } catch (errorSnapshot) {
          // Si el snapshot también falla, comprobamos si el usuario abandonó
          // la página durante la lectura. Si es así, no actualizamos ningún estado.
          if (controller.signal.aborted) return;

          // Si ambas fuentes fallaron, guardamos el error del snapshot
          // para que la interfaz pueda mostrar un mensaje de aviso.
          setError(errorSnapshot instanceof Error ? errorSnapshot.message : "Error desconocido");
        }
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { profile, error };
}

export function PerfilConRespaldo() {
  const { profile, error } = usePerfilConRespaldo();

  if (error) {
    return <p role="alert">{error}</p>;
  }
  if (!profile) {
    return <p>Cargando…</p>;
  }

  return (
    <p>
      {profile.name} · {profile.role}
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ B — la guardia de cada catch
 *
 * DEFINICIÓN
 * A un catch se llega por cualquier fallo, también porque el usuario se fue. Y en
 * el plan B hay dos: si se va mientras espera a la API, cae en el de fuera; si se
 * va mientras se lee el snapshot, en el de dentro. Cada catch, antes de tocar nada,
 * pregunta si se fue.
 *
 * Ejemplos — dónde estabas cuando el usuario se fue:
 * esperando a la API  → se corta la petición en vivo → catch de fuera
 * leyendo el snapshot → se corta la lectura          → catch de dentro
 *
 * 🧠 ANALOGÍA — cancelas un pedido y te lo pueden anular en dos momentos: en la
 * cocina o ya en el reparto. Si solo el cocinero mira las cancelaciones, el
 * repartidor te toca el timbre igual.
 *
 * ⚠️ TRAMPA — cuando empieza el snapshot, la guardia de fuera ya pasó: no vuelve a
 * mirar.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5b) cargarConGuardias — tu cargarConRespaldo del 3: apunta «en vivo», «snapshot» o
 * «error:» con el mensaje; si el usuario se fue, nada. Ahora, si se va mientras se
 * lee el snapshot, apunta el error de la cancelación.
 * ¿Por qué? En el starter, si el usuario se va mientras se lee el snapshot, ¿qué
 * catch apunta el error?
 * Al catch de dentro, y apunta el error de la cancelación
 */

// Creamos una función asíncrona llamada cargarConGuardias que recibe una señal de aborto y una función apuntar.
export async function cargarConGuardias(signal: AbortSignal, apuntar: Apuntar): Promise<void> {
  try {
    await pedirEnVivo(signal);
    apuntar("en vivo");
  } catch {
    if (signal.aborted) return; // ¿El usuario abandonó la App?
    // Intentamos obtener los datos del snapshot usando la función leerSnapshot con la señal proporcionada.
    try {
      await leerSnapshot(signal);
      apuntar("snapshot");
    } catch (err) {
      if (signal.aborted) return; // ¿El usuario abandonó la App?
      // Si ambos intentos fallan, apuntamos el error con su mensaje correspondiente.
      apuntar(`error: ${err instanceof Error ? err.message : "Error desconocido"}`);
    }
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ C — qué estado deja cada camino
 *
 * DEFINICIÓN
 * Cada camino deja el estado tal como lo tiene que pintar el componente. En vivo:
 * los datos, y deRespaldo en false. El snapshot: los datos, y deRespaldo en true.
 * Si fallan los dos: el error. Y el render pregunta primero por el error.
 *
 * SINTAXIS — el orden del render:
 * if (error) return <p role="alert">{error}</p>; // primero: tapa todo lo demás
 * if (!projects) return <p>Cargando…</p>;
 * return <>{deRespaldo && <p>Datos del último deploy</p>} …</>;
 *
 * 🧠 ANALOGÍA — un semáforo con la roja encendida: da igual que la verde también lo
 * esté, el conductor para.
 *
 * 🗣️ LAS PIEZAS
 * error      → no hay nada que enseñar: fallaron los dos caminos.
 * deRespaldo → hay datos que enseñar, del snapshot: se enseñan con el aviso.
 *
 * ⚠️ TRAMPA — que en vivo fallara no es un error para el usuario si el respaldo
 * llegó.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5c) useListaConRespaldo — ListaConRespaldo enseña tu lista. Si la API falla, la del
 * snapshot con el aviso «Datos del último deploy». Ahora, con la API caída, enseña
 * «La API no contestó» aunque el snapshot llegó bien. ListaConRespaldo ya está
 * bien: solo falla el hook.
 * ¿Por qué? En el starter, con la API caída, el snapshot llega. ¿Por qué no ves la
 * lista?
 * Nunca se pinta, el return sale antes de llegar a la lista
 */
export function useListaConRespaldo(): {
  projects: Project[] | null;
  error: string | null;
  deRespaldo: boolean;
} {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deRespaldo, setDeRespaldo] = useState(false);

  // Una vez montado el componente, ejecutamos el efecto para cargar los datos de la API o del snapshot.
  useEffect(() => {
    // Creamos un controlador de aborto para poder cancelar la petición si el componente se desmonta.
    const controller = new AbortController();

    async function load() {
      try {
        // Pedimos la data en vivo
        // Validamos con Zod
        // Si todo va bien, actualizamos el estado con los proyectos obtenidos
        const vivo = await pedirEnVivo(controller.signal);
        ProjectsSchema.parse(vivo.projects);
        setProjects(vivo.projects);
      } catch {
        // Si la petición a la API falla, primero comprobamos si el usuario
        // abandonó la página. Si es así, detenemos la ejecución y no intentamos
        // cargar el snapshot.
        if (controller.signal.aborted) return;

        // Intentamos recuperar los datos del snapshot, ya que la fuente principal (la API) ha fallado.
        try {
          const snapshot = await leerSnapshot(controller.signal);
          ProjectsSchema.parse(snapshot.projects);
          setProjects(snapshot.projects);
          setDeRespaldo(true);
        } catch (err) {
          // Si el snapshot también falla, comprobamos si el usuario abandonó
          // la página durante la lectura. Si es así, no actualizamos ningún estado.
          if (controller.signal.aborted) return;
          // Si ambas fuentes fallaron, guardamos el error del snapshot
          // para que la interfaz pueda mostrar un mensaje de aviso.
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { projects, error, deRespaldo };
}

export function ListaConRespaldo() {
  const { projects, error, deRespaldo } = useListaConRespaldo();

  if (error) return <p role="alert">{error}</p>;
  if (!projects) return <p>Cargando…</p>;

  return (
    <section>
      {deRespaldo && <p>Datos del último deploy</p>}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </section>
  );
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
  deRespaldo: boolean;
} {
  const [projects, setProjects] = useState<Project[]>([]); // Seteamos el estado inicial de projects como un array vacío de tipo Project.
  const [profile, setProfile] = useState<Profile | null>(null); // Seteamos el estado inicial de profile como null, indicando que aún no se ha cargado ningún perfil.
  const [error, setError] = useState<string | null>(null); // Seteamos el estado inicial de error como null, indicando que aún no se ha producido ningún error.
  const [deRespaldo, setDeRespaldo] = useState(false); // Seteamos el estado inicial de deRespaldo como false, indicando que los datos no provienen del snapshot.

  // Una vez montado el componente, ejecutamos el efecto para cargar los datos de la API o del snapshot.
  useEffect(() => {
    const controller = new AbortController(); // Creamos un controlador de aborto para poder cancelar la petición si el componente se desmonta.
    const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(limiteMs)]); // Combinamos la señal del controlador con una señal de tiempo límite usando AbortSignal.any. Esto permite que la petición se aborte si cualquiera de las dos señales se aborta, ya sea porque el componente se desmontó o porque se alcanzó el límite de tiempo.

    async function load() {
      try {
        const vivo = await pedirEnVivo(signal);

        ProjectsSchema.parse(vivo.projects);
        ProfileSchema.parse(vivo.profile);

        setProjects(vivo.projects);
        setProfile(vivo.profile);
      } catch {
        if (controller.signal.aborted) return;

        try {
          const snapshot = await leerSnapshot(controller.signal);

          ProjectsSchema.parse(snapshot.projects);
          ProfileSchema.parse(snapshot.profile);

          setProjects(snapshot.projects);
          setProfile(snapshot.profile);
          setDeRespaldo(true);
        } catch (err) {
          if (controller.signal.aborted) return;

          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      }
    }

    load();

    return () => controller.abort();
  }, [limiteMs]);

  return { projects, profile, error, deRespaldo };
}

export function PortadaConRespaldo({ limiteMs }: { limiteMs: number }) {
  // Llamamos a nuestro hook personalizado usePortfolioConRespaldo con el límite de tiempo proporcionado.
  // Este hook nos devuelve los proyectos, el perfil, cualquier error y un indicador de si los datos provienen del snapshot.
  const { projects, profile, error, deRespaldo } = usePortfolioConRespaldo(limiteMs);

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
      {deRespaldo && <p>Datos del último deploy</p>}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </section>
  );
}
