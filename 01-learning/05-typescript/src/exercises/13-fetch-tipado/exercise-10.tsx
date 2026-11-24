import { useEffect } from "react";
import { z } from "zod";

/* =============================================================================
 * EJERCICIO 10 — tu useWeather, tipado · bloque 13
 *
 * 📌 RECORDATORIO — del 04: un schema de Zod comprueba la forma al ejecutar con
 * .parse, y z.infer saca de él el tipo. Del 07 al 09: el controller en el efecto, el
 * contador del reintento y el intervalo del polling.
 *
 * 🎯 OBJETIVOS
 * · Marcar en un schema el campo que la API puede no mandar.
 * · Leer arrays paralelos por índice cuando el elemento puede no existir.
 * · Juntar en un hook el fetch validado, el reintento y el polling.
 *
 * 🟢 CONTEXTO — Open-Meteo no manda una lista de horas: manda un array por dato
 * (time, temperature_2m…), y la hora i es el elemento i de cada uno. Tu useWeather
 * se pasa 140 líneas cruzándolos (l.14-140). Y tu tsconfig tiene
 * noUncheckedIndexedAccess: con esa opción, TypeScript no da por hecho que el
 * elemento i exista.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · el campo que puede faltar → drill 1
 * TEORÍA 2 · arrays paralelos por índice → drills 2–4
 * TU HOOK → drill 5
 *
 * ▸ 5 drills en orden. Prohibidos el tipo any, as, el ! de «confía en mí» (x!) y
 * los eslint-disable.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-10.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-10.pistas.md. Drills 1–5: banco, pestaña 13.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el campo que puede faltar
 *
 * DEFINICIÓN
 * Un z.object exige cada campo que nombra: si la respuesta trae uno de menos, .parse
 * lanza, aunque lo demás esté bien. Si la API a veces no lo manda, se marca con
 * .optional(): el parse lo deja pasar, y z.infer le pone ? en el tipo.
 *
 * SINTAXIS — un proyecto que puede no tener demo:
 * const ProyectoSchema = z.object({
 *   nombre: z.string(),
 *   demo: z.string().optional(),
 * });
 * type Proyecto = z.infer<typeof ProyectoSchema>;
 * // { nombre: string; demo?: string | undefined }
 *
 * 🧠 ANALOGÍA — un formulario: los campos con asterisco son obligatorios, y
 * .optional() le quita el asterisco a uno.
 *
 * 🗣️ LAS PIEZAS
 * z.array(z.number()) → un array de números: Open-Meteo manda uno por dato.
 * .optional()         → el campo puede faltar. Si viene, se comprueba igual.
 *
 * ⚠️ TRAMPA — .optional() acepta que el campo falte, no que venga con null. Para
 * null está .nullable().
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) HorasSchema — el bloque hourly de Open-Meteo: time, temperature_2m e is_day, un
 * array por dato. is_day puede no venir (tu comentario de la l.15). Ahora, una
 * respuesta sin is_day revienta el parse.
 * ¿Por qué? En el starter, ¿qué le exige el schema a is_day?
 *
 */
export const HorasSchema = z.object({
  time: z.array(z.string()),
  temperature_2m: z.array(z.number()),
  is_day: z.array(z.number()),
});

export type Horas = z.infer<typeof HorasSchema>;

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — arrays paralelos por índice
 *
 * DEFINICIÓN
 * Con arrays paralelos, la hora i se arma con el elemento i de cada array, y nada
 * asegura que todos tengan el mismo largo, ni que i exista. Con
 * noUncheckedIndexedAccess, arr[i] tiene tipo T | undefined: TypeScript te obliga a
 * decidir qué pasa con el hueco antes de usarlo. Comprobado que no es undefined, el
 * tipo se estrecha a T.
 *
 * SINTAXIS — el nombre del proyecto i, o un texto si no está:
 * const nombres = ["Projex", "NexusAI"];
 * const nombre = nombres[i]; // string | undefined
 * if (nombre === undefined) return "Sin nombre";
 * return nombre.toUpperCase(); // aquí nombre ya es string
 *
 * 🧠 ANALOGÍA — un casillero numerado: que exista el número 7 no quiere decir que
 * haya algo dentro. TypeScript te hace mirar antes de sacar.
 *
 * 🗣️ LAS PIEZAS
 * noUncheckedIndexedAccess → la opción del tsconfig que suma | undefined a arr[i].
 * arr?.[i]                 → el elemento i si arr existe; si no, undefined.
 * x === undefined          → la pregunta que estrecha: debajo, x ya no lo es.
 *
 * ⚠️ TRAMPA — undefined quiere decir «no sé», no «no». Tratar el hueco como false o
 * como 0 es inventarse el dato.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2) temperaturaDe — la temperatura de la hora i, redondeada, o null si esa hora no
 * está en el array.
 * ¿Por qué? En el starter, ¿qué le llega a Math.round cuando i no existe?
 *
 */
export function temperaturaDe(temperaturas: number[], i: number): number | null {
  return Math.round(temperaturas[i]);
}

/* El bloque daily de Open-Meteo, un array por dato, y un día como lo pinta la
 * tarjeta. Ya están bien. */
export const DiasSchema = z.object({
  time: z.array(z.string()),
  temperature_2m_min: z.array(z.number()),
  temperature_2m_max: z.array(z.number()),
});

export type Dias = z.infer<typeof DiasSchema>;
export type Dia = { fecha: string; min: number; max: number };

/* 3) armarPronostico — de los arrays de daily, la lista de días con su mínima y su
 * máxima redondeadas. Si a un día le falta la mínima o la máxima, ese día no sale.
 * ¿Por qué? En el starter, si a temperature_2m_max le falta el último día, ¿qué sale
 * en ese día?
 *
 */
export function armarPronostico(dias: Dias): Dia[] {
  return dias.time.map((fecha, i) => ({
    fecha,
    min: Math.round(dias.temperature_2m_min[i]),
    max: Math.round(dias.temperature_2m_max[i]),
  }));
}

/* 4) esDeDia — si la hora i es de día, para elegir el icono. is_day dice 1 (día) o 0
 * (noche). Si no trae la hora i, decide la hora de time: de día desde las 7 y antes
 * de las 20, como tu resolveIsDayValue (l.17-23). Sin ninguna de las dos, false.
 * ¿Por qué? En el starter, si is_day no trae la hora i, ¿qué devuelve, y qué quería
 * decir ese hueco?
 *
 */
export function esDeDia(horas: Horas, i: number): boolean {
  return horas.is_day?.[i] === 1;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TU HOOK — tu useWeather, tipado
 *
 * El 07, el 08 y el 09 en un solo efecto: el clima validado con Zod, el aire, el
 * reintento y el polling. Es tu l.145-302 sin el reloj ni useMemo. pedirClima y
 * pedirAire ya están bien, y las dos escuchan el signal que les pases. useState no
 * está en el import de arriba: lo añades tú.
 * ───────────────────────────────────────────────────────────────────────────── */

export const API_CLIMA = "https://api.open-meteo.com/v1/forecast";
export const API_AIRE = "https://air-quality-api.open-meteo.com/v1/air-quality";

const PronosticoSchema = z.object({
  current_weather: z.object({ temperature: z.number() }),
  daily: DiasSchema,
});

const AireSchema = z.object({ current: z.object({ us_aqi: z.number() }) });

/* Pide la temperatura de ahora y los días de lat y lon, validados. Si algo falla,
 * lanza. */
export async function pedirClima(
  lat: number,
  lon: number,
  signal: AbortSignal,
): Promise<{ grados: number; dias: Dia[] }> {
  const res = await fetch(
    `${API_CLIMA}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_min,temperature_2m_max&timezone=auto`,
    { signal },
  );
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  const data = PronosticoSchema.parse(await res.json());
  return { grados: Math.round(data.current_weather.temperature), dias: armarPronostico(data.daily) };
}

/* Pide la calidad del aire de lat y lon. Es complementaria: si falla, devuelve null y
 * el clima sigue. Si la cancelan, lanza, como las demás. */
export async function pedirAire(lat: number, lon: number, signal: AbortSignal): Promise<number | null> {
  try {
    const res = await fetch(`${API_AIRE}?latitude=${lat}&longitude=${lon}&current=us_aqi`, { signal });
    if (!res.ok) return null;
    return Math.round(AireSchema.parse(await res.json()).current.us_aqi);
  } catch (error) {
    if (signal.aborted) throw error;
    return null;
  }
}

/* Lo que pinta la tarjeta, y lo que devuelve el drill 5. aire es null si no llegó. */
export type Clima = { grados: number; aire: number | null; dias: Dia[] };
export type EstadoDelClima = {
  clima: Clima | null;
  cargando: boolean;
  error: string | null;
  reintentar: () => void;
};

/* 5) useWeather — TarjetaWeather enseña la temperatura, el aire y los días de lat y
 * lon, con «Cargando…» al empezar y al reintentar. Cada cadaMs vuelve a pedir; si una
 * vuelta falla, el aviso «No fue posible obtener el clima» con «Reintentar». Al cambiar
 * de ciudad, todo lo de la vieja se cancela y deja de pedirse. La tarjeta ya está bien.
 * ¿Por qué? Con tu arreglo, ¿qué controller corta la petición del aire de Santiago, y
 * quién lo aborta?
 *
 */
export function useWeather(lat: number, lon: number, cadaMs: number): EstadoDelClima {
  useEffect(() => {}, [lat, lon, cadaMs]);
  return { clima: null, cargando: true, error: null, reintentar: () => {} };
}

export function TarjetaWeather({ lat, lon, cadaMs }: { lat: number; lon: number; cadaMs: number }) {
  const { clima, cargando, error, reintentar } = useWeather(lat, lon, cadaMs);

  if (cargando) return <p>Cargando…</p>;
  if (error) {
    return (
      <div>
        <p role="alert">{error}</p>
        <button type="button" onClick={reintentar}>
          Reintentar
        </button>
      </div>
    );
  }
  if (clima === null) return <p>Cargando…</p>;
  return (
    <div>
      <p>{clima.grados} °C</p>
      <p>Aire: {clima.aire ?? "sin dato"}</p>
      <ul>
        {clima.dias.map((dia) => (
          <li key={dia.fecha}>
            {dia.fecha}: {dia.min}–{dia.max} °C
          </li>
        ))}
      </ul>
    </div>
  );
}
