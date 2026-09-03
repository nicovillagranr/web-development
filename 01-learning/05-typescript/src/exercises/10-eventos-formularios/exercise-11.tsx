import { useState } from "react";
import type { ChangeEvent } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — el objeto con el que trabaja todo el archivo:
 *
 *     type Perfil = { alias: string; ciudad: string; bio: string }
 *     const perfil: Perfil = { alias: "nico", ciudad: "Santiago", bio: "" }
 *
 * Tres campos, los tres texto. Cuando alguien escribe en uno, el perfil que ya
 * existe NO cambia: se fabrica otro igual salvo por esa clave — la escalera F
 * otra vez, pero sobre un objeto y no un array.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 11 — un objeto para todo el formulario             ·  ampliación 1/5
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · fabricar otro objeto con una clave pisada, sin tocar el que te dieron
 *   · recibir la clave a cambiar como parámetro, y decir por qué `string` no vale
 *   · llevar tres campos y un `<textarea>` con un único manejador
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Los diez anteriores montan un `useState` por campo, y ningún formulario de verdad
 * hace eso: con tres campos el estado es un objeto y el manejador es uno solo.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · pisar una clave copiando  →  drills 1, 2
 *   TEORÍA 2 · un manejador para todos   →  drills 3, 4, 5
 *
 * ▸ EJERCICIO — 5 drills en escalera, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-11.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters de este archivo están rotos a propósito.
 *   ¿Atascado? Las pistas están en `exercise-11.pistas.md`, de una en una.
 *
 * ⚠️ 2 de los 5 pasan el test con el fallo dentro y 2 no dan señal de typecheck.
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — pisar una clave copiando
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   El spread de objeto `{ ...original }` fabrica un objeto NUEVO con las mismas
 *   claves. Lo que escribas después del spread pisa la clave que se llame igual.
 *   Y si el nombre de esa clave no lo sabes hasta que se ejecuta, se escribe
 *   entre corchetes: eso es una CLAVE COMPUTADA.
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
 * 🧠 ANALOGÍA (de apoyo) — el formulario en papel. No lo tachas: sacas otra copia
 *    y rellenas esa línea distinta. El original se queda como estaba, y por eso
 *    puedes compararlos.
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

// 📌 El type de los seis drills:
type Perfil = { alias: string; ciudad: string; bio: string };

// 1) `conAliasCambiado` — recibe un perfil y un alias nuevo, y devuelve OTRO perfil
//    igual salvo por el alias. El que te dan tiene que quedarse exactamente como
//    estaba.
//    El starter escribe encima del que le pasaron.
export function conAliasCambiado(perfil: Perfil, alias: string): Perfil {
  perfil.alias = alias;
  return perfil;
}
// conAliasCambiado({ alias: "nico", ciudad: "Santiago", bio: "" }, "nv")

// 2) `conCampoCambiado` — lo mismo, pero ahora QUÉ campo se pisa llega como
//    parámetro. Un `"ciudad"` con el valor "Iquique" devuelve el perfil con la
//    ciudad cambiada y lo demás intacto.
//    El cuerpo del starter está bien; lo que falla es la firma. Fíjate en qué está
//    dispuesto a aceptar el segundo parámetro: tal como está, `"ciduad"` también
//    es un campo válido.
export function conCampoCambiado(
  perfil: Perfil,
  campo: string,
  valor: string,
): Perfil {
  return { ...perfil, [campo]: valor };
}
// conCampoCambiado({ alias: "nico", ciudad: "Santiago", bio: "" }, "ciudad", "Iquique")

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — un manejador para todos
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
 *     `name`               → el atributo del campo; llega SIEMPRE como `string`
 *     `ChangeEvent<T>`     → el evento; la `T` dice qué elemento cambió
 *     `A | B` en la `T`    → un manejador que sirve a dos elementos distintos
 *
 * ⚠️ TRAMPA — `e.target.name` es un `string` cualquiera, no una clave de tu tipo.
 *    El navegador no ha leído tu `Perfil`. Si escribes `name="ciduad"` en el JSX,
 *    nadie protesta: el campo simplemente deja de funcionar y no hay error.
 * ───────────────────────────────────────────────────────────────────────────── */

// 3) `PerfilQueEscribe` — un `<input>` para el alias y un `<p>` que muestra el alias
//    guardado. Escribes y el `<p>` va cambiando. El estado es el perfil entero, no
//    solo el alias: arranca en alias "", ciudad "Santiago" y bio "".
//    Restricción: para actualizar, reutiliza el drill 1. No repitas el spread aquí.
export function PerfilQueEscribe() {
  const [perfil, setPerfil] = useState<Perfil>({
    alias: "",
    ciudad: "Santiago",
    bio: "",
  });

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setPerfil({ alias: e.target.value });
  };

  return (
    <div>
      <input aria-label="Alias" value={perfil.alias} onChange={alEscribir} />
      <p>{perfil.alias}</p>
    </div>
  );
}
// <PerfilQueEscribe />

// 4) `PerfilDosCampos` — dos `<input>`, uno para el alias y otro para la ciudad, y
//    UN solo manejador para los dos. Debajo, un `<p>` con el alias y otro con la
//    ciudad. Arranca igual que el drill 3.
//    El manejador tiene que averiguar a qué campo escribir, y el dato para saberlo
//    viaja en el propio campo. Lo que llegue de ahí no es una clave de `Perfil`
//    hasta que lo compruebes — como el `<select>` del 09, y sin `as`.
export function PerfilDosCampos() {
  const [perfil, setPerfil] = useState<Perfil>({
    alias: "",
    ciudad: "Santiago",
    bio: "",
  });

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setPerfil((prev) => conCampoCambiado(prev, "alias", e.target.value));
  };

  return (
    <div>
      <input
        name="alias"
        aria-label="Alias"
        value={perfil.alias}
        onChange={alEscribir}
      />
      <input
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

// 5) `PerfilConBio` — los dos campos del drill 4 más un `<textarea>` para la bio,
//    y sigue habiendo un solo manejador. Debajo, un `<p>` por cada uno de los tres.
//    Un `<textarea>` no es un `<input>`: el manejador que sirve a los dos tiene que
//    decirlo en su firma.
export function PerfilConBio() {
  const [perfil, setPerfil] = useState<Perfil>({
    alias: "",
    ciudad: "Santiago",
    bio: "",
  });

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "alias" || name === "ciudad") {
      setPerfil((prev) => conCampoCambiado(prev, name, value));
    }
  };

  return (
    <div>
      <input
        name="alias"
        aria-label="Alias"
        value={perfil.alias}
        onChange={alEscribir}
      />
      <input
        name="ciudad"
        aria-label="Ciudad"
        value={perfil.ciudad}
        onChange={alEscribir}
      />
      <textarea
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

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 5 estén en verde, abre el `handleChange` de tu `ContactForm.jsx`: es
 * el drill 5 con otros nombres. Lo que le falta para compilar en TypeScript lo
 * acabas de escribir aquí — salvo el objeto de errores, que es el 12.
 * ───────────────────────────────────────────────────────────────────────────── */
