import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — los dos objetos de este archivo · ampliación 2/5
 *
 *     const perfil:  Perfil  = { alias: "nico", ciudad: "Santiago", bio: "" }
 *     const errores: Errores = { alias: "El alias es obligatorio" }
 *
 * El perfil SIEMPRE tiene sus tres claves. El de errores casi nunca las tiene
 * todas: cuando el formulario está bien, es `{}`.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * 12 · EL OBJETO DE ERRORES
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · decir por qué `{}` no sirve para ir metiéndole claves
 *   · escribir un tipo cuyas claves pueden faltar, y leerlas sin que se queje
 *   · fabricar el objeto de errores de un formulario entero con una función
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * De los 21 errores de tipos de tu `07-Contact`, DOCE son este archivo: un
 * `useState({})` y un `const errors = {}` a los que después se les meten claves.
 * No es un fallo de React ni de formularios — es un objeto sin forma declarada.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · un objeto sin forma       →  drills 1, 2, 3
 *   TEORÍA 2 · la clave que puede faltar →  drills 4, 5, 6
 *   TEORÍA 3 · comprobar antes de usar   →  drills 7, 8, 9, 10
 *
 * ▸ EJERCICIO — 10 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-12.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters de este archivo están rotos a propósito.
 *   ¿Atascado? Las pistas están en `exercise-12.pistas.md`, de una en una.
 *
 * ⚠️ 2 de los 10 pasan el test con el fallo dentro: ahí la señal está solo en
 *    `pnpm typecheck`. Corre siempre los dos.
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — un objeto sin forma
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Cuando escribes `const x = {}`, TypeScript no infiere "un objeto al que ya le
 *   meteré cosas": infiere el tipo `{}`, que significa un objeto SIN NINGUNA
 *   clave. Meterle una después es escribir una clave que ese tipo no tiene.
 *
 * SINTAXIS
 *     const a = {}              ← su tipo es `{}`: cero claves
 *     const b: Errores = {}     ← su tipo es Errores: tres claves, opcionales
 *          └───┬────┘  la anotación es lo único que cambia entre las dos
 *
 * EJEMPLO
 *     a.alias = "vacío"         ← rechazado: `{}` no tiene esa clave
 *     b.alias = "vacío"         ← permitido: Errores sí la tiene
 *
 * 🧠 ANALOGÍA (de apoyo) — el formulario en papel, mirando las LÍNEAS impresas.
 *    Un `{}` es la hoja en blanco: no hay dónde escribir "ciudad". `Errores` es la
 *    hoja con sus tres líneas ya impresas, aunque las dejes todas vacías.
 *
 * 🗣️ LAS PIEZAS
 *     `{}`             → el tipo del objeto sin claves
 *     anotación        → el `: Errores` detrás del nombre; es lo que da la forma
 *     tipo de retorno  → la anotación de una función, detrás de los paréntesis
 *
 * ⚠️ TRAMPA — una función sin tipo de retorno anotado no se queja de nada: se
 *    inventa la forma a partir de lo que devuelves, erratas incluidas. Anotarlo no
 *    es decorar, es poner a alguien a comprobar lo que escribiste.
 * ───────────────────────────────────────────────────────────────────────────── */

// 📌 Los dos types de todo el archivo:
type Perfil = { alias: string; ciudad: string; bio: string };
type Errores = { alias?: string; ciudad?: string; bio?: string };

// 1) `errorDeAlias` — recibe un alias y devuelve el objeto de errores que le toca:
//    si viene vacío, `{ alias: "El alias es obligatorio" }`; si trae algo, un
//    objeto de errores sin ninguna clave.
//    El starter arranca de un objeto vacío y le mete la clave después. Es
//    literalmente lo que hace tu `07-Contact`.
export function errorDeAlias(alias: string): Errores {
  const errores = {};
  if (alias === "") errores.alias = "El alias es obligatorio";
  return errores;
}
// errorDeAlias("") -> { alias: "El alias es obligatorio" }
// errorDeAlias("nico") -> {}

// 2) `errorDeCiudad` — lo mismo para la ciudad, con el mensaje "La ciudad es
//    obligatoria", pero devolviendo el objeto de una pieza en vez de por pasos.
//    Tal como está, nadie le comprueba nada, así que el fallo que lleva dentro lo
//    canta el test y no el compilador. Arréglalo de manera que la próxima errata
//    se cante sola.
export function errorDeCiudad(ciudad: string) {
  return ciudad === "" ? { ciduad: "La ciudad es obligatoria" } : {};
}
// errorDeCiudad("") -> { ciudad: "La ciudad es obligatoria" }
// errorDeCiudad("Santiago") -> {}

// 3) `errorDeBio` — la bio es opcional, pero si pasa de 60 caracteres devuelve
//    `{ bio: "La bio no puede pasar de 60 caracteres" }`, y si no, un objeto sin
//    claves.
//    Mira qué guarda la clave `bio` según el type. El starter mete ahí otra cosa
//    que también responde a la pregunta, pero que no es lo que se pinta.
export function errorDeBio(bio: string): Errores {
  return { bio: bio.length > 60 };
}
// errorDeBio("hola") -> {}
// errorDeBio("x".repeat(61)) -> { bio: "La bio no puede pasar de 60 caracteres" }

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — la clave que puede faltar
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   La `?` delante de los dos puntos marca una clave OPCIONAL: el objeto puede
 *   traerla o no. Y eso cambia el tipo de lo que lees — ya no es `string`, es
 *   `string | undefined`, porque leerla cuando no está devuelve `undefined`.
 *
 * SINTAXIS
 *     type Errores = { alias?: string }     errores.alias → string | undefined
 *                           └ opcional
 *
 * EJEMPLO
 *     const e: Errores = {}
 *     e.alias                   → undefined, y el tipo lo dice
 *     e.alias.toUpperCase()     → rechazado: ahí podría no haber nada
 *
 * 🧠 ANALOGÍA (de apoyo) — el buzón del edificio. Que exista el buzón no significa
 *    que haya carta dentro. Abrirlo siempre se puede; leer la carta sin mirar
 *    antes si hay alguna, no.
 *
 * 🗣️ LAS PIEZAS
 *     `?`                  → clave opcional: puede faltar
 *     `string | undefined` → lo que sale al leerla
 *     `Object.keys(obj)`   → array con los nombres de las claves que SÍ están
 *
 * ⚠️ TRAMPA — un mensaje vacío (`""`) y una clave que no está son cosas distintas,
 *    y un `if (errores.alias)` las trata igual, porque `""` también es falsy. Cuando
 *    lo que preguntas es *¿está o no está?*, pregúntalo por el valor que sale
 *    cuando no está, no por si "hay algo".
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `hayErrores` — recibe un objeto de errores y responde si tiene alguno. Con
//    `{}` es `false`; en cuanto haya una sola clave, `true`.
export function hayErrores(errores: Errores): boolean {
  return errores !== {};
}
// hayErrores({}) -> false
// hayErrores({ alias: "x" }) -> true

// 5) `mensajeDe` — saca el mensaje de un campo concreto. Si ese campo no tiene
//    error, devuelve texto vacío: quien la llama va a pintar eso en pantalla y no
//    quiere ver ahí la palabra `undefined`.
//    Lee el tipo de retorno y compáralo con lo que sale de leer una clave
//    opcional. No son lo mismo, y el starter los trata como si lo fueran.
export function mensajeDe(errores: Errores, campo: keyof Errores): string {
  return errores[campo];
}
// mensajeDe({ alias: "x" }, "alias") -> "x"
// mensajeDe({}, "alias") -> ""

// 6) `conError` — devuelve OTRO objeto de errores igual al que le das más la clave
//    que le pidas. El que te pasan tiene que quedarse exactamente como estaba.
//    Es la escalera del `11` otra vez; si el starter te suena, es porque ya
//    arreglaste este mismo fallo allí.
export function conError(errores: Errores, campo: keyof Errores, mensaje: string): Errores {
  errores[campo] = mensaje;
  return errores;
}
// conError({}, "bio", "muy larga") -> { bio: "muy larga" }
// conError({ alias: "a" }, "bio", "muy larga") -> { alias: "a", bio: "muy larga" }

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — comprobar antes de usar
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   ESTRECHAR es reducir un tipo ancho a uno más estrecho comprobándolo. Si algo
 *   es `string | undefined` y escribes un `if` que descarta el `undefined`, DENTRO
 *   de esa rama TypeScript ya lo trata como `string`, sin que se lo digas.
 *
 * SINTAXIS
 *     function f(v: string | number): string {
 *       if (typeof v === "number") return String(v)   ← descartas una mitad…
 *       return v.trim()                               ← …y aquí `v` ya es `string`
 *     }
 *
 * EJEMPLO — la comprobación no es burocracia, cambia el tipo. Con `undefined` la
 *   mitad que se descarta se pregunta por su nombre, no con `typeof`:
 *     m.toUpperCase()                    ← rechazado: `m` puede ser undefined
 *     if (m !== undefined) { … }         ← dentro de esa rama ya no puede serlo
 *
 * 🧠 ANALOGÍA (de apoyo) — mirar el buzón antes de leer la carta. Después de
 *    mirar, tú ya sabes que hay carta; el compilador también, y por eso te deja.
 *
 * 🗣️ LAS PIEZAS
 *     estrechamiento → la comprobación que reduce el tipo dentro de una rama
 *     `undefined`    → lo que sale de una clave opcional que no está
 *     `role="alert"` → lo que marca un `<p>` como aviso de error para un lector de
 *                      pantalla; el test los busca por ahí
 *
 * ⚠️ TRAMPA — pintar `{errores.alias}` en el JSX no da error de tipos, porque
 *    React sabe pintar `undefined` (no pinta nada). Pero el `<p>` sí se crea, y
 *    queda un aviso de error vacío en la página para quien la lea a ciegas.
 * ───────────────────────────────────────────────────────────────────────────── */

// 7) `enMayusculas` — recibe el mensaje de un campo, que puede no existir, y lo
//    devuelve en mayúsculas. Si no hay mensaje, texto vacío.
export function enMayusculas(mensaje: string | undefined): string {
  return mensaje.toUpperCase();
}
// enMayusculas("uy") -> "UY"
// enMayusculas(undefined) -> ""

// 8) `validar` — recibe el perfil entero y devuelve TODOS sus errores en un solo
//    objeto: `{}` si está bien, y una clave por cada campo que falle.
//    Restricción: aquí no se vuelve a escribir ninguna de las tres reglas. Ya están
//    escritas más arriba, una por drill, y esta función solo las junta.
export function validar(perfil: Perfil): Errores {
  return { ...errorDeAlias(perfil.alias) };
}
// validar({ alias: "", ciudad: "", bio: "" }) -> { alias: "…", ciudad: "…" }
// validar({ alias: "nico", ciudad: "Santiago", bio: "" }) -> {}

// 9) `AliasConError` — un `<input>` con `aria-label="Alias"` y debajo el aviso de
//    su error en un `<p role="alert">`, que solo existe cuando hay error. El estado
//    son DOS cosas, cada una en su `useState`: el perfil y los errores. Al escribir
//    se guarda el alias y se vuelve a validar ese campo con el drill 1.
//    Arranca con alias "", ciudad "Santiago", bio "", y sin ningún error.
export function AliasConError() {
  const [perfil, setPerfil] = useState<Perfil>({
    alias: "",
    ciudad: "Santiago",
    bio: "",
  });
  const [errores, setErrores] = useState({});

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setPerfil({ ...perfil, alias: e.target.value });
    setErrores(errorDeAlias(e.target.value));
  };

  return (
    <div>
      <input aria-label="Alias" value={perfil.alias} onChange={alEscribir} />
      {errores.alias !== undefined && <p role="alert">{errores.alias}</p>}
    </div>
  );
}
// <AliasConError />

// 10) `PerfilValidado` — los tres campos ("Alias", "Ciudad" y un `<textarea>`
//     "Bio") dentro de un `<form>` con un botón "Guardar". Aquí no se valida al
//     escribir: solo al enviar. Cada campo lleva debajo su `<p role="alert">`, y un
//     aviso solo existe si ese campo tiene error.
//     Restricción: el envío son dos líneas —cortar el refresco del navegador y
//     guardar lo que devuelva el drill 8— y los avisos se pintan con el drill 5.
export function PerfilValidado() {
  const [perfil, setPerfil] = useState<Perfil>({
    alias: "",
    ciudad: "Santiago",
    bio: "",
  });
  const [errores, setErrores] = useState<Errores>({});

  const alEscribir = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const alEnviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrores(validar(perfil));
  };

  return (
    <form onSubmit={alEnviar}>
      <input name="alias" aria-label="Alias" value={perfil.alias} onChange={alEscribir} />
      <p role="alert">{mensajeDe(errores, "alias")}</p>
      <input name="ciudad" aria-label="Ciudad" value={perfil.ciudad} onChange={alEscribir} />
      <p role="alert">{mensajeDe(errores, "ciudad")}</p>
      <textarea name="bio" aria-label="Bio" value={perfil.bio} onChange={alEscribir} />
      <p role="alert">{mensajeDe(errores, "bio")}</p>
      <button type="submit">Guardar</button>
    </form>
  );
}
// <PerfilValidado />

/* ─────────────────────────────────────────────────────────────────────────────
 * Con esto tienes escrito el `validate` de tu `ContactForm.jsx` y el objeto de
 * errores que hoy es `{}`. Lo que le falta es el estado del envío —`"idle"`,
 * `"enviando"`, `"ok"`—, y eso es el 13.
 * ───────────────────────────────────────────────────────────────────────────── */
