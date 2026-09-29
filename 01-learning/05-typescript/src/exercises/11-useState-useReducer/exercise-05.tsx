import { useState } from "react";

/* =============================================================================
 * EJERCICIO 05 — qué sale de un spread   ·  bloque 11
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · predecir qué claves trae una copia con spread, y con qué valor
 *   · saber qué clave gana cuando se escribe dos veces
 *   · copiar un objeto anidado sin perder lo que no tocas
 *   · elegir a qué nivel del objeto va cada spread
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * Todo lo del `04` y el `04b` está hecho de spreads. Si al leer `{ ...estado, … }`
 * tienes que pararte a pensar qué sale, cada reducer cuesta el doble. Aquí solo
 * hay spreads, sin reducer ni reglas, hasta que leerlos sea automático.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · qué copia el spread y quién pisa   →  drills 1 a 5 (predecir)
 *   TEORÍA 2 · copiar al nivel correcto           →  drills 6 a 10 (escribir)
 *
 * ▸ EJERCICIO — 10 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-05.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los 10 fallan en el test; dos
 *   dan además error de tipos. Los drills 1 a 5 llevan una línea `// ¿Por qué?`
 *   que el test no lee: esa la reviso yo.
 *   ¿Atascado? Las pistas están en `exercise-05.pistas.md`, de una en una.
 *
 * 👁️ `TarjetaPerfil` (drill 10) está montado en `src/App.tsx`.
 * ===========================================================================*/

// La ficha de todo el archivo. No se toca.
export type Tema = "claro" | "oscuro";
export type Preferencias = { tema: Tema; idioma: string };
// -> { tema: "claro" | "oscuro"; idioma: string }
export type Perfil = { nombre: string; ciudad: string; preferencias: Preferencias };
// -> { nombre: string; ciudad: string; preferencias: { tema: "claro" | "oscuro"; idioma: string } }

export const ana: Perfil = {
  nombre: "Ana",
  ciudad: "Santiago",
  preferencias: { tema: "claro", idioma: "Español" },
};

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — qué copia el spread y quién pisa
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `...x` dentro de `{ }` copia todas las claves de `x`, en ese punto. Si una
 *   clave aparece dos veces, gana la que está escrita MÁS A LA DERECHA.
 *
 * EJEMPLO
 *     const luz = { color: "rojo", brillo: 50 };
 *     { ...luz, color: "verde" }   // → { color: "verde", brillo: 50 }
 *     { color: "verde", ...luz }   // → { color: "rojo",  brillo: 50 }  ← pisa luz
 *
 * 🧠 ANALOGÍA — dictarle a alguien que rellena una ficha: si dices "color verde"
 *    y después "copia todo lo de la luz", lo último que dictaste es lo que queda.
 *
 * ⚠️ TRAMPA — pisar una clave que es un objeto la cambia ENTERA. Lo que no
 *    escribas dentro del objeto nuevo no se "rellena" con lo que había.
 * ───────────────────────────────────────────────────────────────────────────── */

// Del 1 al 5: predice sin ejecutar. Todos parten de `ana`, justo arriba.
// 📌 ana = { nombre: "Ana", ciudad: "Santiago", preferencias: { tema: "claro", idioma: "Español" } }

// 1)  const r = { ...ana } ¿Qué vale r.ciudad?
export const respuesta1: string = "Santiago";
// ¿Por qué? Porque el objeto nuevo + spread copia todas las claves de ana con sus valores, entonces la ciudad sigue siendo "Santiago".

// 2)  const r = { ...ana, ciudad: "Talca" };    ¿Qué vale r.nombre?
export const respuesta2: string = "Ana";
// ¿Por qué? Porque el spread copia todas las claves de ana, y luego se sobrescribe la clave ciudad con "Talca". La clave nombre no se toca, así que sigue siendo "Ana".

// 3)  const r = { ciudad: "Talca", ...ana };    ¿Qué vale r.ciudad?
export const respuesta3: string = "Santiago";
// ¿Por qué? El sprad está al final del objeto, lo que significa que todo lo que estaba antes se pisa con las claves original y sus valores.

// 4)  const r = { ...ana, preferencias: { tema: "oscuro" } };
//     ¿Qué vale r.preferencias.idioma? (en JavaScript; TypeScript lo marcaría)
export const respuesta4: string | undefined = undefined;
// ¿Por qué? Porque `...ana` copia solo el primer nivel y `preferencias` se reemplaza por completo.
// Como el nuevo objeto no tiene `idioma`, `r.preferencias.idioma` es `undefined`.

// 5)  const r = { ...ana } ¿r === ana es true o false?
export const respuesta5: boolean = false;
// ¿Por qué? Porque el spread crea un nuevo objeto, por lo que r no es el mismo objeto que ana.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — copiar al nivel correcto
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Cada nivel del objeto que cambias necesita su propia copia. El spread de
 *   fuera copia la ficha; el de dentro copia el objeto anidado que vas a tocar.
 *
 * SINTAXIS
 *     { ...ficha, anidado: { ...ficha.anidado, clave: valor } }
 *        ↑ nivel 1           ↑ nivel 2           ↑ lo que cambia
 *
 * 🧠 ANALOGÍA — una carpeta con un sobre dentro. Para cambiar una hoja del sobre:
 *    carpeta nueva, sobre nuevo, y la hoja nueva. Si solo cambias la carpeta,
 *    el sobre sigue siendo el viejo; si metes un sobre vacío, pierdes las hojas.
 *
 * ⚠️ TRAMPA — el spread de dentro va con `ficha.anidado`, no con `ficha`. Y la
 *    clave que cambias va dentro del nivel al que pertenece, no fuera.
 * ───────────────────────────────────────────────────────────────────────────── */

// 6) `mudarse` — devuelve una copia del perfil con la ciudad nueva.
export function mudarse(perfil: Perfil, ciudad: string): Perfil {
  // 1. Se crea un objeto nuevo
  // 2. Se copian todas las claves de Perfil (nombre, ciudad, preferencias)
  // 3. Se sobrescribe o se pisa la clave ciudad con el nuevo valor
  return { ...perfil, ciudad: ciudad };
}
// mudarse(ana, "Talca") -> { nombre: "Ana", ciudad: "Talca", preferencias: { tema: "claro", idioma: "Español" } }

// 7) `renombrarYMudar` — devuelve una copia con el nombre y la ciudad nuevos, a
//    la vez. Un solo spread.
export function renombrarYMudar(perfil: Perfil, nombre: string, ciudad: string): Perfil {
  // 1. Se crea un objeto nuevo
  // 2. Se copian todas las claves de Perfil (nombre, ciudad, preferencias)
  // 3. Se sobrescriben o se pisan las claves nombre y ciudad con los nuevos valores
  return { ...perfil, nombre: nombre, ciudad: ciudad };
}
// renombrarYMudar(ana, "Bea", "Talca")

// 8) `cambiarTema` — devuelve una copia con el tema nuevo. El idioma se conserva.
//    📌 type Preferencias = { tema: Tema; idioma: string }
export function cambiarTema(perfil: Perfil, tema: Tema): Perfil {
  // 1. Se crea un objeto nuevo
  // 2. Se copian todas las claves de Perfil (nombre, ciudad, preferencias)
  // 3. Se sobrescribe o se pisa la clave completa preferencias con un nuevo objeto que contiene el tema actualizado y el idioma original
  return { ...perfil, preferencias: { ...perfil.preferencias, tema } };
}
// cambiarTema(ana, "oscuro")

// 9) `restablecer` — las preferencias vuelven a las de fábrica (`deFabrica`),
//    enteras. El nombre y la ciudad se quedan como estaban.
export const deFabrica: Preferencias = { tema: "claro", idioma: "Español" };

export function restablecer(perfil: Perfil): Perfil {
  // 1. Se crea un objeto nuevo
  // 2. Se copian todas las claves de Perfil (nombre, ciudad, preferencias)
  // 3. En la clave preferencias se asigna un nuevo objeto que contiene las preferencias de fábrica
  // Es importante crear un nuevo objeto para evitar crear conflictos de mutabilidad, ya que si dejamos sólo preferencias: deFabrica, cualquier cambio en las preferencias de un perfil afectaría a todos los perfiles que compartan la misma referencia de objeto de fábrica.
  return { ...perfil, preferencias: { ...deFabrica } };
}
// restablecer(cambiarTema(ana, "oscuro"))

// 10) `TarjetaPerfil` — un botón por cada forma de copiar del archivo: "Mudarse de
//     Santiago a Talca" pisa una clave de la ficha; "Modo oscuro" e "Idioma: English" pisan
//     una clave de dentro de `preferencias`; "Restablecer preferencias" las
//     sustituye enteras. Ninguno deshace lo que cambiaron los otros.

// La ficha de todo el archivo. No se toca.
// export type Tema = "claro" | "oscuro";
// export type Preferencias = { tema: Tema; idioma: string };
// export type Perfil = { nombre: string; ciudad: string; preferencias: Preferencias };

// export const ana: Perfil = {
// nombre: "Ana",
// ciudad: "Santiago",
// preferencias: { tema: "claro", idioma: "Español" },
// };

export function TarjetaPerfil() {
  // Definimos el estado inicial de un Perfil, este tiene la forma del type Perfil definido más arriba:
  const [perfil, setPerfil] = useState<Perfil>(ana);

  return (
    <div>
      {/* Párrafo que renderiza los datos del perfil */}
      <p>
        {perfil.nombre} · {perfil.ciudad}
      </p>
      {/* Párrafo que renderiza las preferencias del perfil */}
      <p>
        Tema: {perfil.preferencias.tema} · Idioma: {perfil.preferencias.idioma}
      </p>

      {/* Botón para mudarse a Talca */}
      <button onClick={() => setPerfil({ ...perfil, ciudad: "Talca" })}>
        Mudarse de Santiago a Talca
      </button>

      {/* Botón para cambiar el tema a oscuro */}
      <button
        onClick={() =>
          setPerfil({ ...perfil, preferencias: { ...perfil.preferencias, tema: "oscuro" } })
        }
      >
        Modo oscuro
      </button>

      {/* Botón para cambiar el idioma a English */}
      <button
        onClick={() =>
          setPerfil({ ...perfil, preferencias: { ...perfil.preferencias, idioma: "English" } })
        }
      >
        Idioma: English
      </button>

      {/* Botón para restablecer las preferencias */}
      <button onClick={() => setPerfil({ ...perfil, preferencias: { ...deFabrica } })}>
        Restablecer preferencias
      </button>
    </div>
  );
}
// <TarjetaPerfil />
