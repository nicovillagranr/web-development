import { useReducer } from "react";

/* =============================================================================
 * EJERCICIO 07 — el tipo dice qué casos existen   ·  bloque 11
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · escribir como unión los valores que puede tomar un dato
 *   · usar el `never` del `default` como alarma de un `case` que falta
 *   · cambiar cualquier campo con un solo `case`, usando `keyof` y `[campo]`
 *   · distinguir lo que el tipo caza de lo que solo caza el test
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * En el `04` usaste tres piezas sin pararte en ellas: la `Fase` como unión, el
 * `default` con `never` (que borraste dos veces) y el `campo: keyof Datos` de
 * "escribir". Aquí cada una tiene su teoría, y las tres responden a la misma
 * pregunta: qué casos deja existir el tipo, y quién avisa cuando falta uno.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · la unión nombra los valores posibles         →  drills 1, 2
 *   TEORÍA 2 · `never`, la alarma del caso que falta        →  drills 3 a 5
 *   TEORÍA 3 · `keyof` + `[campo]`: un case, todos los campos →  drills 6 a 8
 *   REFUERZO · `[campo]: valor`, en escalera                  →  drills 9 a 15
 *
 * ▸ EJERCICIO — 15 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-07.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito. 2 de los 15 pasan el test con el
 *   fallo dentro: corre siempre los dos comandos. Los drills 2, 4, 8 y 10 llevan
 *   una línea `// ¿Por qué?` que reviso yo.
 *   ¿Atascado? Las pistas están en `exercise-07.pistas.md`, de una en una.
 *
 * 👁️ `FormReserva` (drill 8) está montado en `src/App.tsx`.
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — la unión nombra los valores posibles
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Una unión de textos es un tipo que solo acepta los valores que nombras, letra
 *   por letra. `string` acepta cualquier texto; la unión, solo los de su lista.
 *
 * SINTAXIS
 *     type Talla = "S" | "M" | "L";        // cada `|` se lee "o"
 *
 * EJEMPLO
 *     const t: Talla = "M";      // ✅
 *     const u: Talla = "XL";     // ❌ no está en la lista
 *     const s: string = t;       // ✅ toda Talla es un texto
 *
 * 🧠 ANALOGÍA — el menú del día con tres platos: pides uno de los tres, no "lo
 *    que haya". `string` es la carta abierta.
 *
 * 🗣️ LAS PIEZAS
 *     `"M"` → tipo literal  ·  `"S" | "M" | "L"` → unión de literales
 *
 * ⚠️ TRAMPA — con `string`, la errata `"reservda"` compila, y un `switch` sobre
 *    ese dato nunca está completo: siempre queda algún texto sin su `case`.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `Mesa` — las tres situaciones de una mesa del restaurante: "libre",
//    "reservada" y "ocupada". `puedeReservar`, justo debajo, ya está bien escrita:
//    cuando `Mesa` lo esté, deja de dar error.
export type Mesa = "libre" | "reservada" | "ocupada";

export function puedeReservar(mesa: Mesa): boolean {
  switch (mesa) {
    case "libre":
      return true;
    case "reservada":
    case "ocupada":
      return false;
    default: {
      const _exhaustivo: never = mesa;
      return _exhaustivo;
    }
  }
}

// 2) Predice: `elegida` sale de un <select>, y `e.target.value` siempre es `string`.
//        const elegida: string = "libre";
//        const mesa: Mesa = elegida;
//    ¿La segunda línea compila?
export type Compila = "compila" | "no compila";
export const respuesta2: Compila = "no compila";
// ¿Por qué? elegida es un string general que puede ser cualquier cadena de texto, mientras que Mesa es un tipo específico que solo acepta los valores "libre", "reservada" o "ocupada". Por lo tanto, TypeScript no permite asignar un string general a un tipo más restringido sin una verificación explícita de que el valor es uno de los permitidos.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — `never`, la alarma del caso que falta
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   En un `switch`, cada `case` descarta un valor de la unión. Al `default` llega
 *   lo que nadie atendió; si se atendieron todos, no llega nada, y "nada" en
 *   TypeScript se llama `never`. Guardarlo en una variable `never` es la alarma:
 *   si un `case` falta, ese valor no cabe ahí y el typecheck lo marca.
 *
 * SINTAXIS
 *     default: {
 *       const _exhaustivo: never = talla;   // solo compila si no queda ninguna
 *       return _exhaustivo;
 *     }
 *
 * EJEMPLO — con `Talla`:
 *     case "S" · case "M"             →  al default llega "L"    ❌ alarma
 *     case "S" · case "M" · case "L"  →  al default llega never  ✅
 *
 * 🧠 ANALOGÍA — el guardia que recorre el último vagón al final de la línea: si
 *    queda un pasajero, toca el silbato. Si no queda nadie, no hace nada.
 *
 * ⚠️ TRAMPA — el `default` nunca se ejecuta, y por eso parece código que sobra.
 *    No está para ejecutarse: está para que el typecheck lo lea.
 * ───────────────────────────────────────────────────────────────────────────── */

// 3) `textoDeMesa` — el texto del cartel de cada mesa: "Mesa libre", "Mesa
//    reservada" o "Mesa ocupada".
export function textoDeMesa(mesa: Mesa): string {
  switch (mesa) {
    case "libre":
      return "Mesa libre";
    case "reservada":
      return "Mesa reservada";
    case "ocupada":
      return "Mesa ocupada";
    default: {
      const _exhaustivo: never = mesa;
      return _exhaustivo;
    }
  }
}
// textoDeMesa("ocupada")

// 4) Predice: con el 3 resuelto, alguien cambia su `default` por `return "";`.
//    Meses después, `Mesa` gana un cuarto valor, "bloqueada", y nadie toca
//    `textoDeMesa`. ¿Quién avisa de que le falta ese `case`?
export type QuienAvisa = "el typecheck" | "nadie";
export const respuesta4: QuienAvisa = "nadie";
// ¿Por qué? El default silencia el error: Al poner default: return "";, le estás diciendo a TypeScript: "Cualquier valor que no haya atrapado en los case anteriores, simplemente manéjalo aquí devolviendo un string vacío".

// 5) `mesaReducer` — los papeles que mueven una mesa. "reservar" y "sentar" ya
//    están bien. Falta "liberar": la mesa vuelve a "libre", venga de donde venga.

// export type Mesa = "libre" | "reservada" | "ocupada";
export type AccionMesa = { tipo: "reservar" } | { tipo: "sentar" } | { tipo: "liberar" };

export function mesaReducer(mesa: Mesa, accion: AccionMesa): Mesa {
  switch (accion.tipo) {
    case "reservar":
      return mesa === "libre" ? "reservada" : mesa;
    case "sentar":
      return mesa === "ocupada" ? mesa : "ocupada";
    case "liberar":
      return mesa === "reservada" || mesa === "ocupada" ? "libre" : mesa;
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
// mesaReducer("ocupada", { tipo: "liberar" })

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — `keyof` + `[campo]`: un case, todos los campos
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `keyof T` es la unión de las claves de `T`. Y en un objeto literal, `[campo]`
 *   entre corchetes usa como clave el VALOR de la variable. Juntos: una función
 *   cambia cualquier campo, y TypeScript solo acepta claves que existen.
 *
 * SINTAXIS
 *     type Clave = keyof Ficha;                 // "nombre" | "edad"
 *     return { ...ficha, [clave]: valor };      // la clave la pone `clave`
 *
 * EJEMPLO
 *     const clave = "edad";
 *     { [clave]: 30 }   // → { edad: 30 }
 *
 * 🧠 ANALOGÍA — "escribe en la casilla 3" sirve para cualquier casilla de un
 *    formulario; `keyof` es la lista de casillas que existen de verdad.
 *
 * 🗣️ LAS PIEZAS
 *     `keyof Reserva` → operador `keyof`  ·  `[campo]` → clave calculada
 *
 * ⚠️ TRAMPA — los corchetes tienen dos trabajos: `ficha[clave]` LEE un valor, y
 *    `{ [clave]: valor }` ESCRIBE una clave. Misma pieza, dos lados del `=`.
 * ───────────────────────────────────────────────────────────────────────────── */

// La reserva del drill 6 al 8. No se toca.
export type Reserva = { nombre: string; telefono: string; comentario: string };
export const reservaVacia: Reserva = { nombre: "", telefono: "", comentario: "" };

// 6) `CampoReserva` — los nombres de los campos de `Reserva`, sacados del propio
//    tipo para que, si `Reserva` gana un campo, este tipo lo gane solo.
//    `etiquetaDe`, debajo, ya está bien escrita.
export type CampoReserva = keyof Reserva;

const etiquetas = { nombre: "Nombre", telefono: "Teléfono", comentario: "Comentario" };

export function etiquetaDe(campo: CampoReserva): string {
  return etiquetas[campo];
}
// etiquetaDe("telefono")

// 📌 El papel "escribir" lleva qué campo cambia y su texto nuevo.
// export type Reserva = { nombre: string; telefono: string; comentario: string };
// export const reservaVacia: Reserva = { nombre: "", telefono: "", comentario: "" };
export type AccionReserva =
  { tipo: "escribir"; campo: CampoReserva; valor: string } | { tipo: "vaciar" };

// 7) "escribir" — una copia de la reserva con el campo que dice el papel cambiado
//    por su valor. Los otros dos campos, como estaban. "vaciar" ya está bien.
export function reservaReducer(reserva: Reserva, accion: AccionReserva): Reserva {
  // 1. Usamos un switch para manejar los diferentes tipos de acción.
  switch (accion.tipo) {
    case "escribir":
      // En el caso que la acción sea "escribir":
      // 1. Creamos un objeto nuevo
      // 2. Copiamos todas las propiedades de la reserva original
      // 3. En el objeto nuevo, nos preparamos para pisar el valor de la propiedad que nos dice accion.campo
      // 4. Asignamos a esa propiedad el valor que nos dice accion.valor
      return { ...reserva, [accion.campo]: accion.valor };
    case "vaciar":
      return reservaVacia;
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
// reservaReducer({nombre: "Nico", telefono: "912", comentario: "Una mesa al lado de la ventana."}, {tipo: "escribir", campo: "comentario", valor: "Una mesa al pasillo por favor."})
// -> {nombre: "Nico", telefono: "912", comentario: "Una mesa al pasillo por favor."}

// reservaReducer(reservaVacia, ({tipo: "escribir", campo: "nombre", valor: "Hola, me gustaría reservar una mesa."}))
// -> {nombre: "Hola, me gustaría reservar una mesa.", telefono: "", comentario: ""}

// reservaReducer({nombre: "Nico", telefono: "912", comentario: "Una mesa al lado de la ventana."}, {tipo: "vaciar"}) -> {nombre: "", telefono: "", comentario: ""}

// 8) `FormReserva` — lo que escribes en "Teléfono" acaba en "Nombre", y el campo
//    del teléfono se queda vacío. El reducer de arriba no se toca.
export function FormReserva() {
  // reserva -> el estado actual; en el primer render es reservaVacia { nombre: "", telefono: "", comentario: "" }
  // hacerReserva -> función que recibe una acción (el papel) y se la entrega al reducer
  // useReducer -> hook que recibe un reducer y un estado inicial, y devuelve el estado actual y la función para actualizarlo
  const [reserva, hacerReserva] = useReducer(reservaReducer, reservaVacia);

  return (
    <div>
      <input
        aria-label="Nombre"
        placeholder="Nombre"
        value={reserva.nombre}
        onChange={(e) => hacerReserva({ tipo: "escribir", campo: "nombre", valor: e.target.value })}
      />
      <input
        aria-label="Teléfono"
        placeholder="Teléfono"
        value={reserva.telefono}
        onChange={(e) =>
          hacerReserva({ tipo: "escribir", campo: "telefono", valor: e.target.value })
        }
      />
      <input
        aria-label="Comentario"
        placeholder="Comentario"
        value={reserva.comentario}
        onChange={(e) =>
          hacerReserva({ tipo: "escribir", campo: "comentario", valor: e.target.value })
        }
      />
      <button onClick={() => hacerReserva({ tipo: "vaciar" })}>Vaciar</button>
    </div>
  );
}
// ¿Por qué el typecheck no avisó de este fallo?
// <FormReserva />

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ REFUERZO — `[campo]: valor`, en escalera
 * ─────────────────────────────────────────────────────────────────────────────
 * Tres escalones, uno por pieza de `[accion.campo]: accion.valor`:
 *   A · los corchetes: la clave sale de una variable      →  drills 9 a 11
 *   B · el papel: `campo` y `valor` viajan dentro de él   →  drills 12, 13
 *   C · la sustitución: qué objeto sale al final          →  drills 14, 15
 *
 * LA SUSTITUCIÓN, paso a paso — con el papel { campo: "nombre", valor: "Bea" }:
 *     { ...ficha, [papel.campo]: papel.valor }
 *     { ...ficha, ["nombre"]:    "Bea" }       // se leen las piezas del papel
 *     { ...ficha, nombre:        "Bea" }       // los corchetes ya hicieron lo suyo
 *
 * 🧠 ANALOGÍA — la nota del garzón: "casilla: nombre · escribir: Bea". No escribes
 *    en una casilla fija: lees en la nota en cuál. Los corchetes son ese "lee".
 * ───────────────────────────────────────────────────────────────────────────── */

// ── A · los corchetes ──

// 9) Predice:
//        const clave = "edad";
//        const ficha = { [clave]: 30 };
//    ¿Cómo se llama la clave de `ficha`?
export type NombreDeClave = "clave" | "edad";
export const respuesta9: NombreDeClave = "edad";

// 10) Predice: lo mismo, pero sin corchetes.
//        const clave = "edad";
//        const ficha = { clave: 30 };
//     ¿Cómo se llama ahora la clave de `ficha`?
export const respuesta10: NombreDeClave = "clave";
// ¿Por qué?
// Sin los corchetes, TypeScript interpreta `clave` como un nombre literal de propiedad, no como una variable que contiene el nombre de la propiedad.
// Por lo tanto, la clave del objeto `ficha` es literalmente "clave", no "edad".

// 11) `soloUnCampo` — un objeto con UNA sola clave: la que llega en `campo`, con el
//     texto de `valor`. Con "telefono" y "912" sale `{ telefono: "912" }`.
//     📌 `Partial<Reserva>` es una `Reserva` con todas sus claves opcionales.

// export type Reserva = { nombre: string; telefono: string; comentario: string };
// export type CampoReserva = keyof Reserva;

// export type AccionReserva =
// { tipo: "escribir"; campo: CampoReserva; valor: string } | { tipo: "vaciar" };

export function soloUnCampo(campo: CampoReserva, valor: string): Partial<Reserva> {
  // 1. Creamos un objeto que será parcial, osea que no tener todas las propiedades de Reserva
  // 2. La propiedad que dice `campo` se asigna dinámicamente usando corchetes, y su valor es el valor pasado como argumento.
  // 3. Con : valor asignamos el valor a la propiedad dinámica.
  return { [campo]: valor };
}
// soloUnCampo("telefono", "912") -> { telefono: "912" }
// soloUnCampo("comentario", "Ventana") -> { comentario: "Ventana" }

// ── B · el papel ──

// 📌 El papel de "escribir", solo: es la primera variante de `AccionReserva`.
export type PapelEscribir = {
  tipo: "escribir";
  campo: CampoReserva;
  valor: string;
};

export const papelComentario: PapelEscribir = {
  tipo: "escribir",
  campo: "comentario",
  valor: "Ventana",
};

// 12) Predice: ¿qué valen `papelComentario.campo` -> "comentario"
// y `papelComentario.valor` -> "Ventana"
// en ese orden?
export const respuesta12: [string, string] = ["comentario", "Ventana"];

// 13) `desdePapel` — lo mismo que el 11, pero las dos piezas vienen dentro de un
//     papel. Con `papelComentario` sale `{ comentario: "Ventana" }`.
export function desdePapel(papel: PapelEscribir): Partial<Reserva> {
  // 1. Creamos un objeto parcial de Reserva
  // 2. La propiedad que dice `campo` se asigna dinámicamente usando corchetes, y su valor es el valor del papel.
  // 3. Con : papel.valor asignamos el valor a la propiedad dinámica.
  return { [papel.campo]: papel.valor };
}
// desdePapel(papelComentario) -> { comentario: "Ventana" }

// ── C · la sustitución ──

// 14) Predice: haz tú la sustitución, paso a paso. ¿Qué objeto sale?
//        const ana: Reserva = { nombre: "Ana", telefono: "", comentario: "" };
//        const papel: PapelEscribir = { tipo: "escribir", campo: "telefono", valor: "912" };
//        { ...ana, [papel.campo]: papel.valor }
export const respuesta14: Reserva = { nombre: "Ana", telefono: "912", comentario: "" };

// 15) `cambiar` — el `case "escribir"` del drill 7, desde cero: una copia de la
//     reserva con el campo del papel cambiado por su valor.
export function cambiar(reserva: Reserva, papel: PapelEscribir): Reserva {
  return { ...reserva, [papel.campo]: papel.valor };
}
// cambiar(reservaVacia, papelComentario)
