/* =============================================================================
 * EJERCICIO 07 — Narrowing: estrechar un union antes de usarlo
 * =============================================================================
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 * En los ejercicios 05 y 06 aprendiste a CREAR uniones: `string | number`,
 * `"light" | "dark"`, o una propiedad opcional `phone?` (que por dentro es
 * `string | undefined`). Crear el union es la mitad del trabajo. La otra mitad
 * es USARLO sin que TypeScript se queje.
 *
 * El problema: si una variable es `string | number`, NO puedes tratarla como
 * si fuera solo un número:
 *
 *   function doblar(x: string | number) {
 *     return x.toFixed(2); // ❌ TS: 'toFixed' no existe en 'string'
 *   }
 *
 * TS te frena porque `x` PODRÍA ser un string, y los strings no tienen
 * `.toFixed()`. Tiene razón: te está protegiendo de un error en runtime.
 *
 * La solución se llama **narrowing** (estrechamiento): preguntar en tiempo de
 * ejecución "¿de qué tipo es esto realmente AHORA?" con un `if`, y dentro de
 * esa rama TS ya sabe el tipo exacto y te deja usarlo.
 *
 *   function doblar(x: string | number) {
 *     if (typeof x === "number") {
 *       return x.toFixed(2); // ✅ aquí dentro x es 'number', sin duda
 *     }
 *     return x.toUpperCase(); // ✅ aquí x ya solo puede ser 'string'
 *   }
 *
 * `typeof x === "number"` es un **type guard**: TS lo entiende y estrecha el
 * tipo dentro del `if`. Fuera del `if`, vuelve a ser `string | number`.
 *
 *
 * ▸ ANALOGÍA — la caja con etiqueta borrosa
 * ----------------------------------------------------------------------------
 * Imagina que recibes una caja etiquetada "ropa O libros". No puedes doblarla
 * como ropa ni leerla como libro hasta ABRIRLA y mirar qué hay dentro.
 *
 *   - El union `string | number` es la etiqueta borrosa: "podría ser una cosa
 *     u otra".
 *   - El `if (typeof x === "number")` es abrir la caja y comprobar.
 *   - Dentro de esa rama ya SABES que es ropa (number) y puedes doblarla
 *     (usar `.toFixed`) con total seguridad.
 *
 * TypeScript no te deja "doblar la caja cerrada": exige que mires primero.
 *
 *
 * ▸ EJEMPLO 1 — narrowing con `typeof`
 * ----------------------------------------------------------------------------
 *
 *   function describir(valor: string | number): string {
 *     if (typeof valor === "string") {
 *       return `texto de ${valor.length} letras`; // valor: string aquí
 *     }
 *     return `número ${valor.toFixed(0)}`;          // valor: number aquí
 *   }
 *
 *   describir("hola"); // "texto de 4 letras"
 *   describir(3.14);   // "número 3"
 *
 * Los valores válidos para `typeof` son strings: "string", "number",
 * "boolean", "undefined", "object", "function", "symbol", "bigint".
 *
 *
 * ▸ EJEMPLO 2 — narrowing de `undefined` (propiedades opcionales)
 * ----------------------------------------------------------------------------
 * Una propiedad opcional es `T | undefined`. Antes de usarla, descarta el
 * undefined:
 *
 *   function saludar(nombre: string | undefined): string {
 *     if (nombre === undefined) {
 *       return "Hola, invitado";   // rama "no vino nombre"
 *     }
 *     return `Hola, ${nombre}`;     // aquí nombre: string garantizado
 *   }
 *
 *   // También sirve el chequeo de "verdad" (truthiness), que descarta
 *   // undefined, null y "" a la vez:
 *   //   if (!nombre) return "Hola, invitado";
 *   //   return `Hola, ${nombre}`;
 *
 *
 * ▸ CUÁNDO USAR
 * ----------------------------------------------------------------------------
 *   - `typeof x === "..."`  → estrechar entre tipos primitivos de un union
 *                             (string vs number vs boolean...).
 *   - `x === undefined` o `!x` → descartar el caso "no hay valor" de una
 *                             propiedad/parámetro opcional antes de usarlo.
 *   - Patrón general: estrecha PRIMERO, usa DESPUÉS. Nunca uses un método de
 *     un tipo sin haber comprobado que el valor es de ese tipo.
 *
 *
 * ▸ EJERCICIO
 * ----------------------------------------------------------------------------
 *
 * Reglas:
 *   - ❌ No uses `any`, no uses `as X` (type assertions).
 *   - ✅ Estrecha con `typeof` o con un chequeo de `undefined`/truthiness.
 *   - ✅ `pnpm test:run` y `pnpm typecheck` limpios.
 *
 * ===========================================================================*/

// 1) `formatearPrecio(valor: string | number): string`
//    - Si `valor` es number  → devuélvelo con 2 decimales y signo $:  "$19.90"
//      (pista: `"$" + valor.toFixed(2)`).
//    - Si `valor` es string  → devuélvelo tal cual pero recortado de espacios
//      al inicio/fin (pista: `valor.trim()`).
//    Usa `typeof` para estrechar antes de llamar a cada método.
export function formatearPrecio(valor: string | number): string {
  if (typeof valor === "number") {
    return `$${valor.toFixed(2)}`;
  }
  return `${valor.trim()}`;
}


// 2) `saludarUsuario(nombre: string | undefined): string`
//    - Si NO hay nombre (undefined) → devuelve "Hola, invitado".
//    - Si hay nombre               → devuelve `Hola, ${nombre}`.
//    Descarta el `undefined` antes de usar `nombre`.
export function saludarUsuario(nombre: string | undefined): string {
  if (typeof nombre === "undefined") {
    return `Hola, invitado`;
  }
  return `Hola, ${nombre}`;
}


// 3) `longitudMensaje(texto: string, extra?: string): number`
//    Devuelve la cantidad total de caracteres sumando `texto` y, SOLO si
//    `extra` existe, también su longitud.
//    - longitudMensaje("hola")          → 4
//    - longitudMensaje("hola", "mundo") → 9
//    `extra` es opcional (string | undefined): estréchalo antes de leer
//    `extra.length`.
export function longitudMensaje(texto: string, extra?: string): number {
  if (typeof extra === "undefined") {
    return texto.length;
  }
  return texto.length + extra.length;
}
