/* eslint-disable react-refresh/only-export-components --
 * Este archivo exporta tipos y funciones normales además del componente del
 * ítem 11. La regla existe por el hot-reload de Vite y aquí no aplica. */

/* =============================================================================
 * PARCIAL 03 — CAZADOR DE BUGS   ·   11 ítems
 * =============================================================================
 *
 * Los otros dos parciales te daban un hueco y tú lo rellenabas.
 * Este no tiene huecos: TODO EL CÓDIGO DE ABAJO COMPILA.
 * `pnpm typecheck` sale en 0 sobre este archivo tal cual está.
 *
 * Y aun así, las 11 funciones están MAL. Tu trabajo es encontrar por qué.
 *
 * CÓMO RESPONDER — cada ítem te pide dos cosas:
 *   1. Una PRUEBA: rellenas la constante `P3_NN_...` con la entrada (o el
 *      valor) que destapa el fallo. El test la ejecuta contra la función rota
 *      y comprueba que efectivamente revienta. No vale acertar de palabra:
 *      hay que dar el dato que lo demuestra.
 *   2. El PORQUÉ: en el comentario `// Por qué:`. Eso lo reviso yo.
 *
 * 👉 El ítem 01 va RESUELTO como ejemplo, con sus dos partes.
 *
 * ❌ No arregles las funciones. Se quedan rotas: son las pruebas del delito.
 * ❌ Nada de `any` ni de `as`.
 * No abras `parcial-03.test.tsx` hasta terminar.
 *
 * ⚠️ AVISO SOBRE EL VERDE: con el examen en blanco, varios tests ya pasan.
 *    Un test que pasa aquí NO dice que hayas acertado: dice que la constante
 *    tiene un valor del tipo correcto. La nota sale de que la prueba REVIENTE
 *    la función, y eso solo ocurre con la entrada buena.
 *
 * De dónde sale cada bicho: los 11 son fallos que ya has cometido, o que
 * aparecieron corrigiéndote, o que están documentados en tus carpetas 01→09.
 * Ninguno es un tema nuevo. El peso está en TS puro porque de FASE 2 solo
 * tienes cerrada la 09.
 * ===========================================================================*/

export type Producto = { id: number; nombre: string; precio: number };

/* ─────────────────────────────────────────────────────────────────────────────
 * 01 — EJEMPLO YA RESUELTO
 * ───────────────────────────────────────────────────────────────────────────*/

// Promete devolver un `T`. Compila. Miente.
export function primero<T>(xs: T[]): T {
  return xs[0]!;
}
export const P3_01_ENTRADA: number[] = [];
// Por qué: la firma promete `T` pase lo que pase, pero `xs[0]` sobre un array
//   vacío es `undefined` en runtime. El `!` no comprueba nada: solo le dice a
//   TS "confía, aquí hay algo", y TS obedece y calla. Con `[]` la función
//   devuelve `undefined` con cara de `T`, y el error explota más adelante, en
//   quien lo use. La forma honesta sería devolver `T | undefined`.

/* ─────────────────────────────────────────────────────────────────────────────
 * 02 — la reserva que se cuela
 * ───────────────────────────────────────────────────────────────────────────*/

// Debe devolver `valor` cuando lo hay, y `reserva` solo cuando NO lo hay.
export function conReserva(valor: number | undefined, reserva: number): number {
  return valor || reserva;
}

// Escribe un `valor` que SÍ existe y aun así acaba devolviendo la reserva:
export const P3_02_ENTRADA: number = 0;
conReserva(P3_02_ENTRADA, 10); // -> 10
conReserva(0, 10); // -> 10

// Por qué: En JavaScript o TypeScript cuando evaluamos con ||, 0 se considera un valor falsy a pesar de seguir siendo un tipo number
// El operador || dice "Si el operador de la izquierda es falso, devuelve el operando de la derecha"
// Por eso en este tipo de funciones, si queremos que nos retorne valor: 0 no debemos usar ||, debemos usar ??

/* ─────────────────────────────────────────────────────────────────────────────
 * 03 — la vista previa que no oculta nada
 * ───────────────────────────────────────────────────────────────────────────*/

export type Articulo = { id: number; titulo: string; cuerpo: string };

// La preview de un artículo NO debe llevar el cuerpo entero: solo id y título.
export type ArticuloPreview = Omit<Articulo, "cuerop">;

export function aPreview(a: Articulo): ArticuloPreview {
  return { ...a };
}
// Escribe el nombre de la propiedad que se cuela en la preview sin permiso:
export const P3_03_CLAVE_FILTRADA: string = "cuerpo";
// Por qué: La que se cuela es el cuerpo, porque está mal escrita en el Omit.
// En caso de que en un futuro el type incluya la propiedad "cuerop" esta se va a omitir, pero por ahora sale el type completo sin omitir nada

/* ─────────────────────────────────────────────────────────────────────────────
 * 04 — el switch con red de seguridad
 * ───────────────────────────────────────────────────────────────────────────*/

export type Peticion =
  | { fase: "cargando" }
  | { fase: "listo"; datos: string[] }
  | { fase: "error"; mensaje: string }
  | { fase: "cancelado" };

export function describir(p: Peticion): string {
  switch (p.fase) {
    case "cargando":
      return "cargando…";
    case "listo":
      return `${p.datos.length} elementos`;
    case "error":
      return p.mensaje;
    default:
      return "sin datos";
  }
}
// Escribe una petición para la que esta función da una respuesta sin sentido:
export const P3_04_ENTRADA: Peticion = { fase: "cancelado" };
// Por qué: El switch no contempla la fase "cancelado", por lo que la respuesta por defecto es "sin datos"

/* ─────────────────────────────────────────────────────────────────────────────
 * 05 — la conversión en cadena
 * ───────────────────────────────────────────────────────────────────────────*/

// Convierte una lista de textos a una lista de números.
export function aNumeros(textos: string[]): number[] {
  return textos.map(parseInt);
}
// Escribe una lista de textos que salga con basura dentro:
export const P3_05_ENTRADA: string[] = ["10", "10", "10"];
// const pruebaNumerica = ["1", "2"];
// aNumeros(P3_05_ENTRADA)  // -> [10, NaN, 2]
// aNumeros(pruebaNumerica) // -> [1, NaN]   ← NO [1, 2]

// Por qué: (RESUELTO POR EL COACH — ejemplo guiado)
//   El fallo no está en `parseInt` ni en los textos: los tres son números
//   perfectamente válidos por sí solos. El fallo está en ENTREGAR la función.
//
//   `textos.map(parseInt)` ENTREGA `parseInt`; quien la LLAMA es `.map`, y
//   `.map` llama siempre con TRES argumentos: (elemento, índice, array).
//   `parseInt` acepta dos (texto, radix), así que se queda con los dos
//   primeros → el ÍNDICE aterriza en el hueco del `radix`.
//
//   El `radix` es la BASE en la que hay que leer el texto (válidas: 2 a 36).
//   Nadie quiso poner una base ahí, pero `.map` mete una sola, y encima
//   distinta en cada vuelta:
//     vuelta 1 → parseInt("10", 0) → la base 0 significa "decide tú" → 10  ✅
//     vuelta 2 → parseInt("10", 1) → la base 1 no existe (rango 2-36) → NaN
//     vuelta 3 → parseInt("10", 2) → "10" leído en BINARIO           → 2   ☠️
//
//   La 3ª es la venenosa: no es `NaN`, es un número con pinta de correcto.
//   Y la 1ª sale bien de chiripa, que es lo que hace que no sospeches nada.
//   Arreglo: llamarla tú, `textos.map((t) => parseInt(t, 10))`, o `Number(t)`.

/* ─────────────────────────────────────────────────────────────────────────────
 * 06 — el campeón sin arranque
 * ───────────────────────────────────────────────────────────────────────────*/

export function masBarato(ps: Producto[]): Producto | undefined {
  return ps.reduce((mejor, actual) => (actual.precio < mejor.precio ? actual : mejor));
}
// Escribe una lista de productos con la que esta función LANZA un error:
export const P3_06_ENTRADA: Producto[] = [];
// Por qué:
//   ① MECANISMO — `reduce` sin valor inicial coge el acumulador del PRIMER
//     elemento del array.
//   ② POR QUÉ ROMPE CON ESTA ENTRADA — en `[]` no hay primer elemento del que
//     cogerlo, así que ni llega a empezar: lanza `TypeError: Reduce of empty
//     array with no initial value`. La firma promete `Producto | undefined`
//     —dos finales posibles— y con `[]` no ocurre ninguno de los dos: no
//     devuelve nada, revienta.
//   ③ POR QUÉ TS NO LO CAZA — porque NO MODELA las excepciones. Ve un `return`
//     que produce un `Producto`, la firma admite `Producto | undefined`, y
//     devolver menos de lo prometido es legal. Que ese `return` a veces no
//     llegue a ejecutarse es invisible para el sistema de tipos: no existe
//     forma de escribir "esto puede lanzar" en un tipo.

/* ─────────────────────────────────────────────────────────────────────────────
 * 07 — el orden con efectos secundarios
 * ───────────────────────────────────────────────────────────────────────────*/

// Debe devolver una lista NUEVA ordenada, dejando la original como estaba.
export function ordenarPorPrecio(ps: Producto[]): Producto[] {
  return ps.sort((a, b) => a.precio - b.precio);
}
// Escribe una lista que quede DESTROZADA solo por haber llamado a la función:
export const P3_07_ENTRADA: Producto[] = [{ id: 1, nombre: "Té", precio: 200 }, { id: 2, nombre: "Cola", precio: 100 }];
// Por qué: La entrada y el arreglo `[...ps]` los
//   acertó él; esto es su razonamiento completado)
//   MECANISMO — `.sort()` NO fabrica una lista nueva: ordena el array EN EL
//     SITIO y devuelve una referencia a ESE MISMO array. En toda la función
//     existe una sola lista con tres nombres: `ps`, la que se reordena y la que
//     sale por el `return`. No hay manera de escribir `.sort()` que respete el
//     original — muta siempre, se escriba como se escriba.
//   POR QUÉ ROMPE CON ESTA ENTRADA — los dos productos están escritos en orden
//     de id (1, 2) pero con los precios al revés (200, 100), así que ordenar
//     por precio los mueve de sitio. Al llamar a la función, el array de QUIEN
//     LLAMA queda reordenado. El daño no está en lo que devuelve —el test ni
//     siquiera guarda el resultado— sino en el efecto secundario sobre lo que
//     se le pasó.
//   POR QUÉ TS NO LO CAZA — los tipos no expresan mutación. `ps: Producto[]` y
//     el retorno `Producto[]` son ambos ciertos; nada en ellos dice si la
//     función toca el argumento, y no existe forma de escribir "no modifico lo
//     que me das". La única defensa real está en el tipo del parámetro: con
//     `readonly Producto[]`, TS SÍ rechazaría el `.sort()`, porque ese método
//     no existe en un array de solo lectura.
//   Arreglo: `return [...ps].sort(...)` — copias primero y el sort se ceba con
//     la copia. El original ni se entera.

/* ─────────────────────────────────────────────────────────────────────────────
 * 08 — el portero que deja pasar a cualquiera
 * ───────────────────────────────────────────────────────────────────────────*/

export function esNumero(x: unknown): x is number {
  return typeof x === "string";
}
export function formatear(x: unknown): string {
  if (esNumero(x)) return x.toFixed(2);
  return "-";
}
// Escribe algo que NO es un número, pase el portero, y reviente en `formatear`:
export const P3_08_ENTRADA: unknown = "Hola";
// Por qué: La entrada `"Hola"` la acertó él, y también
//   que el portero solo debería dejar pasar cuando `x` sea de tipo number)
//   MECANISMO — la comprobación `typeof x === "string"` no está mal hecha: es
//     impecable… para averiguar si algo es un STRING. Lo que miente es la
//     ETIQUETA. La firma `x is number` promete "si devuelvo true, puedes tratar
//     `x` como número", y el cuerpo contesta a otra pregunta distinta y entrega
//     esa respuesta bajo ese cartel. Ojo al matiz: un predicado SÍ debe devolver
//     un booleano — el problema no es QUÉ tipo devuelve, sino A QUÉ PREGUNTA
//     responde.
//   POR QUÉ ROMPE CON ESTA ENTRADA — `"Hola"` es un string, así que el portero
//     devuelve `true`. Dentro del `if`, TS ESTRECHA `x` a `number` porque se fía
//     del predicado, y aprueba `x.toFixed(2)` con total confianza. En runtime
//     eso sigue siendo un string → `TypeError: x.toFixed is not a function`.
//   POR QUÉ TS NO LO CAZA — TypeScript NO VERIFICA el cuerpo de un predicado de
//     tipo. Lee la promesa `x is number` y se la cree, sin comprobar si el
//     cuerpo la respalda. Es la misma familia que `as` y que el `!` del ítem 01:
//     las tres formas de decirle al compilador "confía en mí", y las tres le
//     pasan a quien escribe la responsabilidad que el compilador tenía.
//     Por eso `"Hola"` no se cuela por un agujero: entra por la puerta
//     principal, con el visto bueno del sistema de tipos.
//   Arreglo: que el cuerpo compruebe lo que la firma promete
//     (`typeof x === "number"`) — o, para formas complejas, describirla una vez
//     con Zod y que la comprobación se genere sola en vez de escribirla a mano.


/* ─────────────────────────────────────────────────────────────────────────────
 * 09 — el parche que nunca llega
 * ───────────────────────────────────────────────────────────────────────────*/

export type Ajustes = {
  tema: string;
  idioma: string;
  fuente: number
};

export const AJUSTES_BASE: Ajustes = { tema: "claro", idioma: "es", fuente: 16 };

// Debe aplicar el parche ENCIMA de la base y devolver los ajustes resultantes.
export function fusionar(base: Ajustes, parche: Partial<Ajustes>): Ajustes {
  return { ...parche, ...base };
}
// Escribe un parche que cambie algo de `AJUSTES_BASE`... y comprueba que no cambia:
export const P3_09_PARCHE: Partial<Ajustes> = {};
// Por qué:

/* ─────────────────────────────────────────────────────────────────────────────
 * 10 — el buscador que no encuentra
 * ───────────────────────────────────────────────────────────────────────────*/

export const CATALOGO: Producto[] = [
  { id: 1, nombre: "Té", precio: 100 },
  { id: 2, nombre: "Café", precio: 250 },
];

export function incluye(lista: Producto[], p: Producto): boolean {
  return lista.includes(p);
}
// Escribe un producto que SÍ está en el catálogo y que la función no encuentra:
export const P3_10_ENTRADA: Producto = { id: 9, nombre: "Cacao", precio: 300 };
// Por qué:

/* ─────────────────────────────────────────────────────────────────────────────
 * 11 — el aviso que se pinta solo
 * ───────────────────────────────────────────────────────────────────────────*/

// Debe pintar el <span> SOLO cuando hay pendientes, y nada cuando no los hay.
export function Aviso({ cantidad }: { cantidad: number }) {
  return <div>{cantidad && <span>{cantidad} pendientes</span>}</div>;
}
// Escribe una cantidad que no pinte el <span>... y aun así ensucie la pantalla:
export const P3_11_ENTRADA: number = 3;
// Por qué:
