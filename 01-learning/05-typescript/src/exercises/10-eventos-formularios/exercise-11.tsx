import { useState } from "react";
import type { ChangeEvent } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — el objeto con el que trabaja todo el archivo:
 *
 *     type Perfil = { alias: string; ciudad: string; bio: string }
 *     const perfil: Perfil = { alias: "nico", ciudad: "Santiago", bio: "" }
 *
 * Tres campos, los tres texto. Cuando alguien escribe en uno, el perfil que ya
 * existe NO cambia: se fabrica otro igual salvo por esa clave.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 11 — un objeto para todo el formulario             ·  ampliación 1/5
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · fabricar otro objeto con una clave pisada, sin tocar el que te dieron
 *   · escribir un tipo que abarque dos cosas distintas a la vez
 *   · llevar tres campos y un <textarea> con un único manejador
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Los diez anteriores montan un `useState` por campo, y ningún formulario de verdad
 * hace eso: con tres campos el estado es un objeto y el manejador es uno solo.
 * La escalera sube despacio: los seis primeros drills son funciones sueltas, sin
 * React a la vista, para que el tipo se entienda sin el ruido del JSX.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · pisar una clave copiando  →  drills 1, 2, 3
 *   TEORÍA 2 · un tipo que abarca dos    →  drills 4, 5, 6      (sin React)
 *   TEORÍA 3 · un manejador para todos   →  drills 7, 8, 9, 10
 *
 * ▸ EJERCICIO — 10 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-11.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters de este archivo están rotos a propósito.
 *   ¿Atascado? Las pistas están en `exercise-11.pistas.md`, de una en una.
 *
 * ⚠️ 5 de los 10 pasan el test con el fallo dentro. En esos, la señal está solo en
 *    `pnpm typecheck`, y a veces sale apuntando al `.test.tsx` en vez de a este
 *    archivo: es el test usándolo mal porque la firma no da para tanto.
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — pisar una clave copiando
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   El spread de objeto `{ ...original }` fabrica un objeto NUEVO con las mismas
 *   claves. Lo que escribas después del spread pisa la clave que se llame igual.
 *   Y si el nombre de esa clave no lo sabes hasta que se ejecuta, se escribe entre
 *   corchetes: eso es una CLAVE COMPUTADA.
 *
 * SINTAXIS
 *     { ...perfil, alias: "otro" }      ← la clave la sabes al escribir
 *     { ...perfil, [campo]: "otro" }    ← la clave la trae una variable
 *                   └ se lee el valor de `campo` y ESE es el nombre de la clave
 *
 * EJEMPLO
 *     const campo = "ciudad"
 *     { ...perfil, [campo]: "Iquique" }   → { alias: "nico", ciudad: "Iquique", bio: "" }
 *     { ...perfil, campo: "Iquique" }     → le añade una clave literal `campo` 😬
 *
 * 🧠 ANALOGÍA (de apoyo) — el formulario en papel. No lo tachas: sacas otra copia y
 *    rellenas esa línea distinta. El original se queda como estaba, y por eso los
 *    puedes comparar.
 *
 * 🗣️ LAS PIEZAS
 *     spread de objeto → `{ ...perfil }`, copia las claves de primer nivel
 *     clave computada  → `[campo]:`, el nombre sale de una variable
 *     `keyof Perfil`   → el tipo de "cualquiera de las claves de `Perfil`"
 *
 * ⚠️ TRAMPA — `perfil.alias = "otro"` compila sin una queja y el test tarda en
 *    delatarlo, porque el valor SÍ queda cambiado. Lo que rompe es lo otro: el
 *    objeto que te dieron ya no es el que era.
 * ───────────────────────────────────────────────────────────────────────────── */

// 📌 El type de todo el archivo:
type Perfil = { alias: string; ciudad: string; bio: string };

// 1) `conAliasCambiado` — recibe un perfil y un alias nuevo, y devuelve OTRO perfil
//    igual salvo por el alias. El que te dan tiene que quedarse exactamente como
//    estaba.
export function conAliasCambiado(perfil: Perfil, alias: string): Perfil {
  return { ...perfil, alias };
}
// conAliasCambiado({ alias: "nico", ciudad: "Santiago", bio: "" }, "nv") -> { alias: "nv", ciudad: "Santiago", bio: "" }

// 2) `conCampoCambiado` — lo mismo, pero ahora QUÉ campo se pisa llega como
//    parámetro. Un `"ciudad"` con el valor "Iquique" devuelve el perfil con la
//    ciudad cambiada y lo demás intacto.
//    Fíjate en qué está dispuesto a aceptar ese parámetro: si acepta cualquier
//    texto, `"ciduad"` también es un campo válido y nadie protesta.
export function conCampoCambiado(
  perfil: Perfil,
  campo: keyof Perfil, // "alias" | "ciudad" | "bio"
  valor: string,
): Perfil {
  return { ...perfil, [campo]: valor };
}
// conCampoCambiado({ alias: "nico", ciudad: "Santiago", bio: "" }, "ciudad", "Iquique") -> { alias: "nico", ciudad: "Iquique", bio: "" }
// conCampoCambiado({ alias: "nico", ciudad: "Santiago", bio: "" }, "ciduad", "x") -> { alias: "nico", ciudad: "Santiago", bio: "" , ciduad: "x"}
// conCampoCambiado({ alias: "nico", ciudad: "Santiago", bio: "" }, "bio", "x") -> { alias: "nico", ciudad: "Santiago", bio: "x" }

// 3) `conCampoSiEsValido` — el de arriba pero blindado por fuera: aquí `campo` sí
//    llega como un `string` cualquiera, porque viene de sitios que no han leído tu
//    `Perfil`. Si resulta ser una de las tres claves, pisa esa; si no lo es,
//    devuelve el perfil que te dieron sin fabricar nada.
//    Comprobarlo es lo que convierte ese `string` en una clave a ojos de TypeScript.
export function conCampoSiEsValido(
  perfil: Perfil,
  campo: string,
  valor: string,
): Perfil {
  switch (campo) {
    case "alias":
      return { ...perfil, alias: valor };
    case "ciudad":
      return { ...perfil, ciudad: valor };
    case "bio":
      return { ...perfil, bio: valor };
    default:
      return perfil;
  }
}
// conCampoSiEsValido({ alias: "nico", ciudad: "Santiago", bio: "" }, "ciduad", "x") ->
// { alias: "nico", ciudad: "Santiago", bio: "" } Aquí se activa el default
//conCampoSiEsValido({ alias: "nico", ciudad: "Santiago", bio: "" }, "alias", "x") ->
// { alias: "x", ciudad: "Santiago", bio: "" }

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — un tipo que abarca dos
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Una UNIÓN `A | B` describe un valor que es una de las dos cosas, y no sabes
 *   cuál. Lo que SÍ puedes hacer sin averiguarlo es usar lo que las dos tienen en
 *   común: eso está garantizado por los dos lados.
 *
 * SINTAXIS
 *     function f(x: string | string[]): number { return x.length }
 *                   └───────┬───────┘                     └ lo tienen los dos
 *                       la unión
 *
 * EJEMPLO — un `<input>` y un `<textarea>` son elementos distintos, pero los dos
 *   llevan `name` y `value`. Una unión de los dos deja leer justo esos:
 *     function nombreDe(el: HTMLInputElement | HTMLTextAreaElement) {
 *       return el.name                 ← permitido: los dos lo tienen
 *       // return el.rows              ← prohibido: solo lo tiene el textarea
 *     }
 *
 * 🧠 ANALOGÍA (de apoyo) — "un vehículo con matrícula": moto o camión, no sabes
 *    cuál. Puedes pedirle la matrícula a los dos. Pedirle el remolque, no.
 *
 * 🗣️ LAS PIEZAS
 *     `A | B`              → unión: uno de los dos, sin decidir cuál
 *     `ChangeEvent<T>`     → un tipo GENÉRICO; la `T` es un hueco que rellenas tú
 *     `ChangeEvent<A | B>` → el hueco relleno con una unión: un evento que sirve
 *                            para los dos elementos
 *
 * ⚠️ TRAMPA — cuando un manejador no le encaja a un elemento, la salida fácil es
 *    escribir un segundo manejador. Eso no arregla el tipo: lo esquiva, y te deja
 *    dos copias de la misma lógica que mantener. Lo que hay que ensanchar es la
 *    `T`, no el número de funciones.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `longitudDe` — devuelve cuántos elementos tiene lo que le pasen, y le pueden
//    pasar dos cosas distintas: un texto o una lista de textos. Con "abc" son 3, y
//    con ["a", "b"] son 2.
//    Sin `if` y sin preguntar cuál de las dos es: lo que necesitas lo tienen las dos.
export function longitudDe(valor: string | string[]): number {
  return valor.length;
}
// longitudDe("abc") -> 3
// longitudDe(["a", "b"]) -> 2

// 5) `nombreYValor` — recibe un campo del DOM, que puede ser un `<input>` o un
//    `<textarea>`, y devuelve lo único que le interesa a un formulario:
//    `{ name, value }`.
//    Es el drill 4 otra vez, con la unión hecha de dos elementos en vez de dos
//    formas de texto.
export function nombreYValor(
  elemento: HTMLInputElement | HTMLTextAreaElement,
): {
  name: string;
  value: string;
} {
  return { name: elemento.name, value: elemento.value };
}
// nombreYValor(document.createElement("textarea")) -> { name: "", value: "" }
// nombreYValor(document.createElement("input")) -> { name: "", value: "" }

// 6) `datosDelCampo` — lo mismo, pero partiendo del evento en vez del elemento:
//    recibe el `ChangeEvent` de un campo que se acaba de teclear y devuelve su
//    `{ name, value }`. Este es el que van a usar los manejadores de abajo, así que
//    tiene que valer para los `<input>` Y para el `<textarea>`.
//    El hueco de `ChangeEvent<...>` admite lo mismo que admitía el parámetro del 5.
export function datosDelCampo(
  evento: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
): {
  name: string;
  value: string;
} {
  return nombreYValor(evento.target);
}
// datosDelCampo(e) -> { name: "", value: "" }

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — un manejador para todos
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Un `<input name="alias">` lleva encima el nombre del campo al que pertenece.
 *   Por eso un solo manejador puede servir a varios campos: saca del evento el
 *   nombre y el valor, y con esos dos datos ya sabe qué clave pisar.
 *
 * SINTAXIS
 *     const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
 *       const { name, value } = e.target
 *              └ "alias"      └ lo tecleado
 *     }
 *
 * EJEMPLO — el mismo manejador en dos campos distintos:
 *     <input name="alias"  onChange={alEscribir} />   → name === "alias"
 *     <input name="ciudad" onChange={alEscribir} />   → name === "ciudad"
 *
 * 🧠 ANALOGÍA (de apoyo) — el sobre con el destinatario escrito. El cartero es uno
 *    solo y no necesita una ruta por vecino: cada sobre dice a qué puerta va.
 *
 * 🗣️ LAS PIEZAS
 *     `name`      → el atributo del campo; llega SIEMPRE como `string`
 *     `e.target`  → el elemento que disparó el evento, ya tipado por la `T`
 *     el drill 3  → lo que convierte ese `string` en una clave de `Perfil`
 *
 * ⚠️ TRAMPA — `e.target.name` es un `string` cualquiera, no una clave de tu tipo.
 *    El navegador no ha leído tu `Perfil`. Si escribes `name="ciduad"` en el JSX,
 *    nadie protesta: el campo simplemente deja de funcionar y no hay error.
 * ───────────────────────────────────────────────────────────────────────────── */

// 📌 Recuerda: type Perfil = { alias: string; ciudad: string; bio: string }

// 7) `PerfilQueEscribe` — un `<input>` con `aria-label="Alias"` y un `<p>` debajo que
//    muestra el alias guardado. Escribes y el `<p>` va cambiando. El estado es el
//    perfil entero, no solo el alias: arranca en alias "", ciudad "Santiago", bio "".
//    Para actualizar, reutiliza el drill 1. No repitas el spread aquí.
export function PerfilQueEscribe() {
  const [perfil, setPerfil] = useState<Perfil>({
    alias: "",
    ciudad: "Santiago",
    bio: "",
  });

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setPerfil(conAliasCambiado(perfil, e.target.value));
  };

  return (
    <div>
      <input
        placeholder="Alias"
        aria-label="Alias"
        value={perfil.alias}
        onChange={alEscribir}
      />
      <p>{perfil.alias}</p>
    </div>
  );
}
// <PerfilQueEscribe />

// 8) `PerfilDosCampos` — dos `<input>`, "Alias" y "Ciudad", y UN solo manejador para
//    los dos. Debajo, un `<p>` con el alias y otro con la ciudad. Arranca igual que
//    el 7.
//    El manejador tiene que averiguar a qué campo escribir, y el dato para saberlo
//    viaja en el propio campo. Lo que llegue de ahí no es una clave de `Perfil`:
//    para eso está el drill 3.
export function PerfilDosCampos() {
  const [perfil, setPerfil] = useState<Perfil>({
    alias: "",
    ciudad: "Santiago",
    bio: "",
  });

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setPerfil(conCampoSiEsValido(perfil, e.target.name, e.target.value));
  };

  return (
    <div>
      <input
        placeholder="Alias"
        name="alias"
        aria-label="Alias"
        value={perfil.alias}
        onChange={alEscribir}
      />
      <input
        placeholder="Ciudad"
        name="ciudad"
        aria-label="Ciudad"
        value={perfil.ciudad}
        onChange={alEscribir}
      />
      <p>{perfil.alias}</p>
      <p>{perfil.ciudad}</p>
    </div>
  );
}
// <PerfilDosCampos />

// 9) `PerfilConBio` — los dos campos del 8 más un `<textarea>` con `aria-label="Bio"`,
//    y sigue habiendo UN solo manejador. Debajo, un `<p>` por cada uno de los tres.
//    Un `<textarea>` no es un `<input>`, así que el manejador que sirve a los dos
//    tiene que decirlo en su firma. La TEORÍA 2 entera existe para este drill.
export function PerfilConBio() {
  const [perfil, setPerfil] = useState<Perfil>({
    alias: "",
    ciudad: "Santiago",
    bio: "",
  });

  const alEscribir = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPerfil(conCampoSiEsValido(perfil, e.target.name, e.target.value));
  };

  return (
    <div>
      <input
        placeholder="Alias"
        name="alias"
        aria-label="Alias"
        value={perfil.alias}
        onChange={alEscribir}
      />
      <input
        placeholder="Ciudad"
        name="ciudad"
        aria-label="Ciudad"
        value={perfil.ciudad}
        onChange={alEscribir}
      />
      <textarea
        placeholder="Bio"
        name="bio"
        aria-label="Bio"
        value={perfil.bio}
        onChange={alEscribir}
      />
      <p>{perfil.alias}</p>
      <p>{perfil.ciudad}</p>
      <p>{perfil.bio}</p>
    </div>
  );
}
// <PerfilConBio />

// 10) `PerfilCompacto` — se comporta EXACTAMENTE igual que el 9: mismos tres campos,
//     mismos `aria-label`, mismos `<p>`. Lo único que cambia es el manejador, que
//     aquí no lee nada del evento por su cuenta.
//     Restricción: su cuerpo son dos líneas, y las dos son llamadas a drills que ya
//     escribiste más arriba.
export function PerfilCompacto() {
  const [perfil, setPerfil] = useState<Perfil>({
    alias: "",
    ciudad: "Santiago",
    bio: "",
  });

  const alEscribir = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: nombre, value: valor } = datosDelCampo(e);
    setPerfil(conCampoSiEsValido(perfil, nombre, valor));
  };

  return (
    <div>
      <input
        placeholder="Alias"
        name="alias"
        aria-label="Alias"
        value={perfil.alias}
        onChange={alEscribir}
      />
      <input
        placeholder="Ciudad"
        name="ciudad"
        aria-label="Ciudad"
        value={perfil.ciudad}
        onChange={alEscribir}
      />
      <textarea
        placeholder="Bio"
        name="bio"
        aria-label="Bio"
        value={perfil.bio}
        onChange={alEscribir}
      />
      <p>{perfil.alias}</p>
      <p>{perfil.ciudad}</p>
      <p>{perfil.bio}</p>
    </div>
  );
}
// <PerfilCompacto />

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 10 estén en verde, abre el `handleChange` de tu `ContactForm.jsx`: es
 * el drill 10 con otros nombres. Lo que le falta para compilar en TypeScript lo
 * acabas de escribir aquí — salvo el objeto de errores, que es el 12.
 * ───────────────────────────────────────────────────────────────────────────── */
