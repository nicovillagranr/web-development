import { useReducer } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — el drill 2 del `exercise-04`, donde te atascaste:
 *
 *     case "escribir":
 *       return { ...estado, datos: { ...estado.datos, [accion.campo]: accion.valor } };
 *
 * Los datos cambian bien. La fase no la nombra nadie, así que sale igual que
 * entró, y si entró "enviado", el aviso se queda puesto aunque sigas escribiendo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 04b — refuerzo: una copia con una regla dentro   ·  bloque 11
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · predecir qué sale de un spread cuando no nombras una clave
 *   · cambiar un campo solo si venía con cierto valor, y dejarlo igual si no
 *   · juntar en un solo `return` el cambio de un dato y la regla de otro campo
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * El drill 2 del `04` pide dos cosas en un solo objeto: cambiar un dato y aplicar
 * una regla a la fase. Aquí van por separado, una por escalón, y se juntan al final.
 * El dominio es otro (una nota con el aviso "Guardado"), pero la regla es la misma.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · lo que no nombras, se copia tal cual     →  drills 1 a 3
 *   TEORÍA 2 · una regla que mira cómo venía el campo    →  drills 4 a 7
 *   TEORÍA 3 · la misma regla, dentro de un `case`       →  drills 8, 9
 *
 * ▸ EJERCICIO — 9 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-04b.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los 9 compilan: toda la señal
 *   está en el test. El drill 3 lleva una línea `// ¿Por qué?` que el test no lee.
 *   ¿Atascado? Las pistas están en `exercise-04b.pistas.md`, de una en una.
 *
 * 👁️ `EditorNota` (drill 9) está montado en `src/App.tsx`.
 * ===========================================================================*/
/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — lo que no nombras, se copia tal cual
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `{ ...x, clave: valor }` copia todas las claves de `x` y después pisa solo
 *   las que escribes detrás. Las que no escribes salen con el valor que traían.
 *
 * SINTAXIS
 *     { ...luz, color: "verde" }
 *       ↑ copia todo    ↑ pisa solo `color`
 *
 * EJEMPLO
 *     const luz = { color: "rojo", encendida: true };
 *     const otra = { ...luz, color: "verde" };
 *     // otra → { color: "verde", encendida: true }   ← `encendida` no se nombró
 *
 * 🧠 ANALOGÍA — fotocopiar una ficha y tapar con corrector UNA casilla. Todas
 *    las demás salen como en el original, también las que ya no deberían valer.
 *
 * ⚠️ TRAMPA — el spread no sabe nada de tus reglas. Si cambias el título, no va
 *    a "darse cuenta" de que el aviso "Guardado" ya no toca: copia lo que había.
 * ───────────────────────────────────────────────────────────────────────────── */

// Las piezas de este archivo. No se tocan.

// Un tipe que sólo puede ser uno de estos tres strings. El test lo comprueba.
export type EstadoNota = "editando" | "guardando" | "guardado";

// Un type que es un objeto con dos claves, ambas strings. El test lo comprueba.
export type Contenido = { titulo: string; cuerpo: string };

// Un type que es un objeto con dos claves: `contenido` (un objeto) y `estado` (un string). El test lo comprueba.
export type Nota = { contenido: Contenido; estado: EstadoNota };

// 1) `marcarEditando` — devuelve una copia de la nota con el estado en "editando",
//    venga como venga. El contenido no se toca.
export function marcarEditando(nota: Nota): Nota {
  // 1. Creamos un objeto nuevo
  // 2. Copiamos todas las claves de la nota original
  // 3. En la clave estado, la pisamos con "editando"
  return { ...nota, estado: "editando" };
}
// marcarEditando({ contenido: { titulo: "Lista", cuerpo: "pan" }, estado: "guardado" })

// 2) `cambiarTitulo` — devuelve una copia con el título nuevo. El cuerpo y el
//    estado salen como entraron, y la nota original no cambia.
//    📌 type Contenido = { titulo: string; cuerpo: string }
export function cambiarTitulo(nota: Nota, titulo: string): Nota {
  // 1. Creamos un objeto nuevo
  // 2. Copiamos todas las claves de la nota original
  // 3. En la clave contenido, la pisamos con un objeto nuevo
  // 4. Copiamos todas las claves del contenido original
  // 5. En la clave titulo, la pisamos con el título nuevo
  return { ...nota, contenido: { ...nota.contenido, titulo: titulo } };
}
// cambiarTitulo({ contenido: { titulo: "Lista", cuerpo: "pan" }, estado: "guardado" }, "Compra")

// 3) Predice, sin ejecutar: ¿con qué estado sale `r`?
//      const nota: Nota = { contenido: { titulo: "Lista", cuerpo: "pan" }, estado: "guardado" };
//      const r = { ...nota, contenido: { ...nota.contenido, titulo: "Compra" } };
export const respuesta3: EstadoNota = "guardado";
// ¿Por qué? Lo que se pisa es el contenido, no el estado. El spread copia todo lo demás tal cual, y eso incluye el estado.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — una regla que mira cómo venía el campo
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Si el valor nuevo de un campo depende del que tenía, la pregunta se hace
 *   sobre el valor que ENTRA. Se puede preguntar antes del `return` (un `if`) o
 *   dentro del objeto (un ternario en esa clave).
 *
 * EJEMPLO — "si la luz está en rojo, pasa a verde; si no, se queda como esté":
 *     if (luz.color !== "rojo") return luz;                          // fuera
 *     return { ...luz, color: "verde" };
 *
 *     return { ...luz, color: luz.color === "rojo" ? "verde" : luz.color }; // dentro
 *
 * 🧠 ANALOGÍA — el aviso "Guardado" de Google Docs: se apaga al teclear, pero
 *    solo si estaba encendido. Si pone "Guardando…", teclear no lo interrumpe.
 *
 * ⚠️ TRAMPA — olvidar el "si no". `color: "verde"` a secas no es una regla: cambia
 *    la luz también cuando ya estaba en ámbar.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `trasEscribir` — solo la regla, sin objeto: recibe el estado de una nota y*
//    devuelve el que tiene que quedar después de teclear. Si venía "guardado",*
//    queda "editando"; cualquier otro se queda igual.*

export function trasEscribir(estado: EstadoNota): EstadoNota {
  // 1. Si el estado entrante es "guardado", devuelve "editando"*
  // 2. Si no, devuelve el mismo estado que entró*
  // 3. Esto es útil en interfaces donde queremos avisar que existen cambios*
  //    que todavía no se han guardado.*
  //    Ejemplo: modificamos nuestro perfil, guardamos el nombre, pero después*
  //    nos damos cuenta de que también queríamos cambiar el correo.*
  //    Al volver a escribir en el correo, "guardado" pasa a "editando",*
  //    indicando que hay cambios nuevos que debemos guardar.*
  return estado === "guardado" ? "editando" : estado;
}

// 5) `alEscribir` — la misma regla sobre la nota entera, con un `if` antes del
//    `return`. Si no venía "guardado", no pasó nada: devuelve la MISMA nota.
export function alEscribir(nota: Nota): Nota {
  // 1. En este caso se repite la misma lógica que el drill 4, pero con otra sintaxis: un `if` antes del `return`.
  // Si el estado entrante es "guardado", devuelve una copia de la nota con el estado en "editando". Si no, devuelve la misma nota que entró.
  if (nota.estado === "guardado") {
    return { ...nota, estado: "editando" };
  }
  return nota;
}
// alEscribir({ contenido: { titulo: "", cuerpo: "" }, estado: "guardando" })

// 6) `alEscribirDentro` — lo mismo que el 5, pero sin `if`: la regla va dentro del
//    objeto, en la clave `estado`. Aquí siempre sale una copia, y eso vale.
//    Restricción: sin `if`. El test no puede comprobarlo; lo reviso yo.
export function alEscribirDentro(nota: Nota): Nota {
  // 1. En este caso se repite la misma lógica que el drill 5, pero con otra sintaxis: un ternario dentro del `return`.
  // Si el estado entrante es "guardado", devuelve una copia de la nota con el estado en "editando". Si no, devuelve una copia de la nota con el mismo estado que entró.
  return { ...nota, estado: nota.estado === "guardado" ? "editando" : nota.estado };
}
// alEscribirDentro({ contenido: { titulo: "", cuerpo: "" }, estado: "guardado" })

// 7) `escribirTitulo` — las dos mitades juntas: pone el título nuevo (como el 2)
//    y aplica la regla del estado (como el 4). Un solo `return`. La mitad del
//    título ya está en el starter: te falta la otra.

// export type Contenido = { titulo: string; cuerpo: string };
// export type Nota = { contenido: Contenido; estado: EstadoNota };

export function escribirTitulo(nota: Nota, titulo: string): Nota {
  // 1. Creamos un objeto nuevo
  // 2. Copiamos todas las claves de la nota original
  // 3. En la clave contenido, la pisamos con un objeto nuevo
  // 4. Copiamos todas las claves del contenido original
  // 5. En la clave titulo, la pisamos con el título nuevo
  // 6. En la clave estado, aplicamos la regla: si venía "guardado", pasa a "editando"; si no, se queda igual.
  return {
    ...nota,
    contenido: { ...nota.contenido, titulo: titulo },
    estado: nota.estado === "guardado" ? "editando" : nota.estado,
  };
}
/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — la misma regla, dentro de un `case`
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   El cuerpo de un `case` es un cuerpo de función como los de arriba. Lo que
 *   antes llegaba por parámetro ahora viaja dentro de la acción.
 *
 * EJEMPLO
 *     escribirTitulo(nota, "Compra")                    // función
 *     { tipo: "escribir", campo: "titulo", valor: "Compra" }  // papel del reducer
 *
 * 🗣️ LAS PIEZAS
 *     `keyof Contenido`  → "titulo" | "cuerpo"
 *     `[campo]: valor`   → clave calculada: la clave es lo que valga `campo`
 *                          (tu `[name]: value` del `handleChange` de Projex)
 * ───────────────────────────────────────────────────────────────────────────── */

// 8) `escribir` — como el 7, pero para cualquier campo del contenido: el que diga
//    `campo`. Un solo `return`, con las dos mitades.

// export type Contenido = { titulo: string; cuerpo: string };
// export type Nota = { contenido: Contenido; estado: EstadoNota };

export function escribir(nota: Nota, campo: keyof Contenido, valor: string): Nota {
  // 1. Creamos un objeto nuevo
  // 2. Copiamos todas las claves de la nota original
  // 3. En la clave contenido, la pisamos con un objeto nuevo
  // 4. Copiamos todas las claves del contenido original
  // 5. En la clave que indique `campo`, pisamos el valor con `valor`
  //    `[campo]` significa que usamos el valor de la variable `campo` como clave.
  //    Si `campo` vale "titulo", es como escribir `titulo: valor`.
  //    Si `campo` vale "cuerpo", es como escribir `cuerpo: valor`.
  return {
    ...nota,
    contenido: { ...nota.contenido, [campo]: valor },
    estado: nota.estado === "guardado" ? "editando" : nota.estado,
  };
}
// escribir({ contenido: { titulo: "Lista", cuerpo: "pan" }, estado: "guardado" }, "cuerpo", "leche")
// -> { contenido: { titulo: "Lista", cuerpo: "leche" }, estado: "editando" }

// 9) El `case "escribir"` de `notaReducer` tiene el mismo defecto que el drill 2
//    del `04`. Arréglalo aquí. El `case "guardar"` y `EditorNota` ya están bien.

// export type Contenido = { titulo: string; cuerpo: string };
// export type Nota = { contenido: Contenido; estado: EstadoNota };

export type AccionNota =
  { tipo: "escribir"; campo: keyof Contenido; valor: string } | { tipo: "guardar" };

export const notaInicial: Nota = { contenido: { titulo: "", cuerpo: "" }, estado: "editando" };

export function notaReducer(nota: Nota, accion: AccionNota): Nota {
  switch (accion.tipo) {
    case "escribir":
      // 1. Creamos un objeto nuevo.
      // 2. Copiamos todas las claves de la nota original.
      // 3. En `contenido`, creamos otro objeto nuevo.
      // 4. Copiamos todos los campos del contenido original.
      // 5. En la clave que indique `campo`, pisamos el valor con `valor`.
      //    `[campo]` significa que usamos el valor de la variable `campo` como clave.
      //    Si `campo` vale "titulo", es como escribir `titulo: valor`.
      //    Si `campo` vale "cuerpo", es como escribir `cuerpo: valor`.
      // 6. Si la nota estaba "guardado", pasa a "editando" porque ahora
      //    tiene cambios que todavía no se han guardado.
      // 7. Si no estaba "guardado", conserva el estado que ya tenía.

      return {
        ...nota,
        contenido: { ...nota.contenido, [accion.campo]: accion.valor },
        estado: nota.estado === "guardado" ? "editando" : nota.estado,
      };

    case "guardar":
      return {
        ...nota,
        estado: "guardado",
      };

    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
// notaReducer(
//   { contenido: { titulo: "", cuerpo: "" }, estado: "guardado" },
//   { tipo: "escribir", campo: "titulo", valor: "a" }
// )
// -> { contenido: { titulo: "a", cuerpo: "" }, estado: "editando" }

export function EditorNota() {
  const [nota, pedir] = useReducer(notaReducer, notaInicial);

  return (
    <div>
      <input
        placeholder="Título"
        aria-label="Título"
        value={nota.contenido.titulo}
        onChange={(e) => pedir({ tipo: "escribir", campo: "titulo", valor: e.target.value })}
      />
      <button onClick={() => pedir({ tipo: "guardar" })}>Guardar</button>
      <p role="status">{nota.estado === "guardado" ? "Guardado" : ""}</p>
    </div>
  );
}
// <EditorNota />
