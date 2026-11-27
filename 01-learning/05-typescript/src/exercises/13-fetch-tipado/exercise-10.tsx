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
 * ESCALERA · tu drill 3, pieza a pieza → peldaños 3a–3d, antes del 3
 * TU HOOK → drill 5
 *
 * ▸ 5 drills en orden. Prohibidos el tipo any, as, el ! de «confía en mí» (x!) y
 * los eslint-disable.
 * pnpm test:run src/exercises/13-fetch-tipado/exercise-10.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito, y uno pasa el test con el fallo dentro:
 * ejecuta los tres comandos. Contesta cada ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-10.pistas.md. Drills 1–5 y peldaños: banco, pestaña 13.
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
 * En el starter, is_day tenía que venir sí o sí: era obligatorio, y una respuesta
 * sin is_day reventaba el parse. Con mi arreglo sigue siendo number (0 o 1), pero
 * opcional.
 */
export const HorasSchema = z.object({
  time: z.array(z.string()),
  temperature_2m: z.array(z.number()),
  is_day: z.array(z.number()).optional(),
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

// Una función que recibe un array de temperaturas y un índice i, y devuelve la temperatura redondeada en ese índice o null si no existe.
export function temperaturaDe(temperaturas: number[], i: number): number | null {
  // Utilizamos un operador ternario para cubrir ambos casos
  return temperaturas[i] === undefined ? null : Math.round(temperaturas[i]);
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

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — tu drill 3, pieza a pieza (antes del 3)
 *
 * Tu drill 3 hace cuatro cosas a la vez. Cada peldaño trae una sola, con una pieza
 * rota: A · el i que cruza los arrays (3a) · B · los dos huecos (3b) · C · el día que
 * no sale (3c) · D · lo que TypeScript sabe de lo que queda (3d). Al terminar, vuelve
 * a tu 3 y búscale cada pieza.
 *
 * 🧠 ANALOGÍA — map es una fotocopiadora: por cada hoja que entra, sale una. filter es
 * la mano que aparta las que salieron en blanco.
 *
 * 📌 Del bloque 05 (ejercicios 07 y 08): en .filter((x): x is string => x !== null),
 * x is string es un predicado. Le promete a TypeScript que, si la flecha devuelve
 * true, x es string.
 * ───────────────────────────────────────────────────────────────────────────── */

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/* ▸ A — el i que cruza los arrays */
/* 📌 Dias, el molde: un array por dato, y la columna i es el día i. Con los datos del test:
 * {
 *   time:               ["2026-11-23", "2026-11-24", "2026-11-25"], // string[]
 *   temperature_2m_min: [11.6,         12.4,         10.9],         // number[]
 *   temperature_2m_max: [24.2,         26.8,         23.5],         // number[]
 * }
 */
/* 3a) maximasPorDia — cada fecha de time con su máxima redondeada, o null si a ese día
 * le falta. temperaturaDe es la tuya del 2: no se toca. Ahora todos los días salen con
 * la misma máxima.
 * ¿Por qué? ¿Qué une una fecha de time con su máxima, si están en arrays distintos?
 * El .map crea un array de la misma longitud que time, y el i del map es el índice que cruza los arrays.
 */

// Primero, usamos .map sobre la propiedad time del objeto días.
// Por cada fecha, obtenemos su índice i y usamos la función temperaturaDe para obtener la máxima correspondiente.
// Si la máxima no existe, temperaturaDe devuelve null.
export function maximasPorDia(dias: Dias): { fecha: string; max: number | null }[] {
  return dias.time.map((fecha, i) => ({ fecha, max: temperaturaDe(dias.temperature_2m_max, i) }));
}
maximasPorDia({
  time: ["2026-06-01", "2026-06-02"],
  temperature_2m_min: [12, 14],
  temperature_2m_max: [24],
});
// { fecha: "2026-06-01", max: 24 },

maximasPorDia({
  time: ["2026-06-01", "2026-06-02"],
  temperature_2m_min: [12, 14],
  temperature_2m_max: [24],
});
// { fecha: "2026-06-02", max: null },

maximasPorDia({
  time: ["2026-06-01", "2026-06-02"],
  temperature_2m_min: [12, 14],
  temperature_2m_max: [24, 26],
});
// { fecha: "2026-06-01", max: 24 },
// { fecha: "2026-06-02", max: 26}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/* ▸ B — los dos huecos */
/* 📌 Dias, el molde: un array por dato, y la columna i es el día i. Con los datos del test:
 * {
 *   time:               ["2026-11-23", "2026-11-24", "2026-11-25"], // string[]
 *   temperature_2m_min: [11.6,         12.4,         10.9],         // number[]
 *   temperature_2m_max: [24.2,         26.8,         23.5],         // number[]
 * }
 */
/* 3b) rangoDelDia — la mínima y la máxima del día i, redondeadas, como «12–24 °C». Si le
 * falta cualquiera de las dos, «sin dato».
 * ¿Por qué? Debajo de tu if, ¿por qué TypeScript ya deja pasar max a Math.round?
 * No lo dejaba pasar, porque max podía ser undefined. Si lo es, la función llega
 * hasta la tercera línea: el if lo cubre y el return sale. A la cuarta solo llega
 * max como number, y TypeScript lo entiende.
 */
export function rangoDelDia(dias: Dias, i: number): string {
  const min = dias.temperature_2m_min[i]; // Sacamos la temperatura mínima del día i
  const max = dias.temperature_2m_max[i]; // Sacamos la temperatura máxima del día i
  if (min === undefined || max === undefined) return "sin dato"; // Si cualquiera de las dos es undefined, devolvemos "sin dato"
  return `${Math.round(min)}–${Math.round(max)} °C`; // Una vez que sabemos que min y max existen, los redondeamos y formateamos la cadena de salida
}
rangoDelDia(
  {
    time: ["2026-06-01", "2026-06-02"],
    temperature_2m_min: [12, 14],
    temperature_2m_max: [15, 24],
  },
  0,
);
// "12–15 °C"

rangoDelDia(
  {
    time: ["2026-06-01", "2026-06-02"],
    temperature_2m_min: [12, 14],
    temperature_2m_max: [15, 24],
  },
  1,
);
// "14–24 °C"

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/* ▸ C — el día que no sale */

/* 📌 Dias, el molde: un array por dato, y la columna i es el día i. Con los datos del test:
 * {
 *   time:               ["2026-11-23", "2026-11-24", "2026-11-25"], // string[]
 *   temperature_2m_min: [11.6,         12.4,         10.9],         // number[]
 *   temperature_2m_max: [24.2,         26.8,         23.5],         // number[]
 * }
 */
/* 3c) fechasConMaxima — las fechas de los días que traen la máxima. Si a un día le
 * falta, su fecha no sale.
 * ¿Por qué? Si time trae tres fechas y a una le falta la máxima, ¿cuántos elementos
 * devuelve un map de time?
 * Devuelve tres elementos, uno por cada fecha. El map no filtra nada, solo transforma. Por eso necesitamos un filter después para eliminar los días que no tienen máxima.
 */

// Función que recibe como parámetro un objeto Dias y devuelve un array de strings con las fechas que tienen máxima definida.
export function fechasConMaxima(dias: Dias): string[] {
  return (
    dias.time
      // Recorremos todas las fechas.
      // "fecha" contiene la fecha actual e "i" su posición en el array.
      .map((fecha, i) => {
        // Buscamos la temperatura máxima que corresponde a esa fecha.
        // Usamos el mismo índice porque ambos arrays están relacionados
        // por posición.
        const max = dias.temperature_2m_max[i];

        // Si no existe una temperatura máxima para ese día,
        // devolvemos null como señal de que debemos descartarlo después.
        if (max === undefined) return null;

        // Si sí existe una temperatura máxima, conservamos la fecha.
        return fecha;
      })

      // Ahora revisamos los resultados del map.
      // Conservamos únicamente los elementos que no sean null.
      .filter((fecha): fecha is string => fecha !== null)
  );

  // "fecha is string" es una indicación para TypeScript:
  // después de comprobar que fecha no es null,
  // puede tratarla como un string.
  // Así entiende que el resultado final es string[] y no
  // un array que podría contener null.
}

// fechasConMaxima({
// time: ["2026-06-01", "2026-06-02"],
// temperature_2m_min: [12, 14],
// temperature_2m_max: [15],
// });
// ["2026-06-01"]

// fechasConMaxima({
// time: ["2026-06-01", "2026-06-02"],
// temperature_2m_min: [12, 14],
// temperature_2m_max: [15, 24],
// });
// ["2026-06-01", "2026-06-02"]

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* ▸ D — lo que TypeScript sabe de lo que queda */

/* Lo que devuelve el 3d: una fecha con su máxima, que aquí ya no puede faltar. */
export type Maxima = { fecha: string; max: number };

/* 📌 Dias, el molde: un array por dato, y la columna i es el día i. Con los datos del test:
 * {
 *   time:               ["2026-11-23", "2026-11-24", "2026-11-25"], // string[]
 *   temperature_2m_min: [11.6,         12.4,         10.9],         // number[]
 *   temperature_2m_max: [24.2,         26.8,         23.5],         // number[]
 * }
 */
/* 3d) diasConMaxima — cada fecha con su máxima redondeada, sin los días a los que les
 * falta.
 * ¿Por qué? El filter del starter ya quitaba los null al ejecutar. ¿Qué no sabía
 * TypeScript?
 *
 */
export function diasConMaxima(dias: Dias): Maxima[] {
  return dias.time
    .map((fecha, i) => {
      const max = dias.temperature_2m_max[i];
      if (max === undefined) return null;
      return { fecha, max: Math.round(max) };
    })
    .filter((dia): dia is Maxima => dia !== null);
}
// diasConMaxima({
// time: ["2026-06-01", "2026-06-02"],
// temperature_2m_min: [12, 14],
// temperature_2m_max: [15],
// });
// [{ fecha: "2026-06-01", max: 15 }]

// diasConMaxima({
// time: ["2026-06-01", "2026-06-02"],
// temperature_2m_min: [12, 14],
// temperature_2m_max: [15, 24],
// });
// [{ fecha: "2026-06-01", max: 15 }, { fecha: "2026-06-02", max: 24 }]

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/* 📌 Dias, el molde: un array por dato, y la columna i es el día i. Con los datos del test:
 * {
 *   time:               ["2026-11-23", "2026-11-24", "2026-11-25"], // string[]
 *   temperature_2m_min: [11.6,         12.4,         10.9],         // number[]
 *   temperature_2m_max: [24.2,         26.8,         23.5],         // number[]
 * }
 */
/* 3) armarPronostico — de los arrays de daily, la lista de días con su mínima y su
 * máxima redondeadas. Si a un día le falta la mínima o la máxima, ese día no sale.
 * ¿Por qué? En el starter, si a temperature_2m_max le falta el último día, ¿qué sale
 * en ese día?
 * Sale undefined, y al hacer Math.round(undefined) revienta. Con mi arreglo, ese día no sale en el pronóstico.
 */

// Función que recibe un objeto Dias y devuelve un array de objetos Dia, filtrando aquellos días que no tienen temperatura mínima o máxima.
export function armarPronostico(dias: Dias): Dia[] {
  // Recorremos el array de días y accedemos a time, el nombre del día
  return dias.time
    .map((fecha, i) => {
      const min = dias.temperature_2m_min[i];
      const max = dias.temperature_2m_max[i];
      if (min === undefined || max === undefined) {
        return null;
      }
      return { fecha, min: Math.round(min), max: Math.round(max) };
    })
    .filter((dia): dia is Dia => dia !== null);
}

armarPronostico({
  time: ["2026-06-01", "2026-06-02"],
  temperature_2m_min: [12, 14],
  temperature_2m_max: [15],
});
// [{ fecha: "2026-06-01", min: 12, max: 15 }]

armarPronostico({
  time: ["2026-06-01", "2026-06-02"],
  temperature_2m_min: [12, 14],
  temperature_2m_max: [15, 24],
});
// [{ fecha: "2026-06-01", min: 12, max: 15 }, { fecha: "2026-06-02", min: 14, max: 24 }]

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/* 4) esDeDia — si la hora i es de día, para elegir el icono. is_day dice 1 (día) o 0
 * (noche). Si no trae la hora i, decide la hora de time: de día desde las 7 y antes
 * de las 20, como tu resolveIsDayValue (l.17-23). Sin ninguna de las dos, false.
 * ¿Por qué? En el starter, si is_day no trae la hora i, ¿qué devuelve, y qué quería
 * decir ese hueco?
 *
 */
export function esDeDia(horas: Horas, i: number): boolean {
  // Buscamos el valor de is_day que corresponde a la posición i.
  // Usamos ?. porque is_day es opcional y podría no existir.
  // Si no existe, valor será undefined.
  const valor = horas.is_day?.[i];

  // Si el valor es 1, sabemos que es de día.
  if (valor === 1) return true;

  // Si el valor es 0, sabemos que es de noche.
  if (valor === 0) return false;

  // Si no encontramos el dato en is_day, buscamos la hora
  // correspondiente en el array time, usando la misma posición i.
  const tiempo = horas.time[i];

  // Si tampoco existe esa posición en time, no tenemos información
  // suficiente para determinar si es de día. Por eso devolvemos false.
  if (tiempo === undefined) return false;

  // Convertimos el texto de tiempo en un objeto Date
  // Obtenemos la hora exacta accediendo a la propiedad getHours() del objeto Date.
  // Ejemplo: "2026-06-01T14:00" → 14
  const hora = new Date(tiempo).getHours();

  // Consideramos que es de día desde las 07:00 hasta antes de las 20:00.
  // Ejemplo: 07:00 → true, 19:59 → true, 20:00 → false.
  return hora >= 7 && hora < 20;
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

// Hook que recibe como parámetros la latitud, longitud y un signal de abort para cancelar las solicitudes si es necesario.
// Este hook retorna una promesa que devuelve un objeto con la temperatura actual y un array de días con sus temperaturas mínimas y máximas.
export async function pedirClima(
  lat: number,
  lon: number,
  signal: AbortSignal,
): Promise<{ grados: number; dias: Dia[] }> {
  const res = await fetch(
    `${API_CLIMA}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_min,temperature_2m_max&timezone=auto`,
    { signal },
  );
  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status}`);
  }
  const data = PronosticoSchema.parse(await res.json());
  return {
    grados: Math.round(data.current_weather.temperature),
    dias: armarPronostico(data.daily),
  };
}
// Santiago de Chile
pedirClima(-33.45, -70.66, new AbortController().signal).then(console.log).catch(console.error);
// { grados: 15, dias: [ { fecha: '2026-06-01', min: 12, max: 15 }, { fecha: '2026-06-02', min: 14, max: 24 } ] }

/* Pide la calidad del aire de lat y lon. Es complementaria: si falla, devuelve null y
 * el clima sigue. Si la cancelan, lanza, como las demás. */
export async function pedirAire(lat: number, lon: number, signal: AbortSignal): Promise<number | null> {
  try {
    const res = await fetch(`${API_AIRE}?latitude=${lat}&longitude=${lon}&current=us_aqi`, {
      signal,
    });
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

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
