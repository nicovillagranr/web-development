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
// TypeScript no lo caza porque valor || reserva sí devuelve un number, que es
// exactamente lo que promete la firma. El tipo es correcto, lo que sale mal es el
// valor. Que un 0 sea falsy es cosa del runtime, y TS no distingue un 0 de un 7.

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
// TypeScript no lo caza porque Omit acepta cualquier texto como clave a omitir,
// exista o no en el tipo. Si la clave no existe no omite nada, y el tipo que sale
// es perfectamente válido: idéntico a Articulo. Omit no está roto, obedece; el
// fallo es que nadie comprueba que la llave sea real.

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
// TypeScript no lo caza porque el default recoge todo lo que sobra, así que la
// función siempre devuelve un string y la firma se cumple. Y precisamente el
// default es lo que apaga la comprobación de exhaustividad: sin él, TS avisaría
// de que falta el case "cancelado". Lo peor es que "sin datos" suena verosímil,
// así que el fallo tampoco se nota mirando la pantalla.

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

// Por qué: el fallo no está en parseInt ni en los textos, los tres son números
// válidos por sí solos. El fallo está en entregar la función en vez de llamarla.
// textos.map(parseInt) entrega parseInt, y quien la llama es .map. Y .map llama
// siempre con tres argumentos, (elemento, índice, array), mientras que parseInt
// solo acepta dos, así que el índice se cuela en el hueco del radix.
// El radix es la base en la que hay que leer el texto, y solo valen de 2 a 36.
// Por eso con ["10","10","10"] sale [10, NaN, 2]: en la vuelta 0 la base es 0,
// que significa "decide tú" y da 10; en la vuelta 1 la base 1 no existe y da NaN;
// y en la vuelta 2 lee "10" en binario y da 2, que es el peor de los tres porque
// no es basura evidente, es un número con pinta de correcto.
// Ojo, que falte la base no es lo que rompe nada: parseInt("2") a secas devuelve
// 2 sin problema. Lo que rompe es una base presente y mala.
// TypeScript no lo caza porque los tipos encajan: parseInt recibe un string y
// devuelve un number, que es justo lo que .map espera de su callback.
// El arreglo es llamarla tú: textos.map((t) => parseInt(t, 10)), o Number(t).

/* ─────────────────────────────────────────────────────────────────────────────
 * 06 — el campeón sin arranque
 * ───────────────────────────────────────────────────────────────────────────*/

export function masBarato(ps: Producto[]): Producto | undefined {
  return ps.reduce((mejor, actual) => (actual.precio < mejor.precio ? actual : mejor));
}
// Escribe una lista de productos con la que esta función LANZA un error:
export const P3_06_ENTRADA: Producto[] = [];
// Por qué: reduce sin valor inicial coge el acumulador del primer elemento del
// array. Con [] no hay primer elemento del que cogerlo, así que no llega ni a
// empezar y lanza TypeError: Reduce of empty array with no initial value.
// El contrato de la función es devolver o un Producto hecho y derecho o un
// undefined, y con [] no se cumple ninguna de las dos cosas: no devuelve nada,
// revienta.
// TypeScript no lo caza porque no modela las excepciones. Ve un return que
// produce un Producto y una firma que admite Producto | undefined, y devolver
// menos de lo que prometes es legal. Que ese return a veces no llegue a
// ejecutarse no hay forma de escribirlo en un tipo, así que es invisible.

/* ─────────────────────────────────────────────────────────────────────────────
 * 07 — el orden con efectos secundarios
 * ───────────────────────────────────────────────────────────────────────────*/

// Debe devolver una lista NUEVA ordenada, dejando la original como estaba.
export function ordenarPorPrecio(ps: Producto[]): Producto[] {
  return ps.sort((a, b) => a.precio - b.precio);
}
// Escribe una lista que quede DESTROZADA solo por haber llamado a la función:
export const P3_07_ENTRADA: Producto[] = [{ id: 1, nombre: "Té", precio: 200 }, { id: 2, nombre: "Cola", precio: 100 }];
// Por qué: .sort() no fabrica una lista nueva. Ordena la que le das en el sitio,
// y encima devuelve esa misma lista, no una copia. Así que aquí solo existe un
// array con tres nombres: ps, el que se reordena y el que sale por el return.
// Muta siempre, se escriba como se escriba.
// Con esta entrada los dos productos están puestos en orden de id pero con los
// precios al revés, así que ordenar por precio los mueve de sitio y el array de
// quien llama queda cambiado. El daño no está en lo que devuelve, está en lo que
// le hace a lo que le pasas: el test ni siquiera guarda el resultado.
// TypeScript no lo caza porque los tipos no dicen nada sobre si una función toca
// su argumento. ps: Producto[] y el retorno Producto[] son los dos ciertos, y no
// existe forma de escribir "no modifico lo que me das".
// Lo único que ayuda es poner el parámetro como readonly Producto[]: ahí sí TS
// rechaza el .sort(), porque ese método no existe en un array de solo lectura.
// El arreglo es return [...ps].sort(...): copias primero, el sort se ceba con la
// copia y el original ni se entera.

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
// Por qué: la comprobación typeof x === "string" no está mal escrita, está
// perfectamente escrita. El problema es que responde a otra pregunta.
// La firma x is number promete que si devuelve true puedes tratar x como número,
// y lo que el cuerpo comprueba es si es un string. Un predicado sí debe devolver
// un booleano, eso está bien; lo que está mal es a qué pregunta contesta.
// Con "Hola" el portero devuelve true, TypeScript estrecha x a number dentro del
// if y aprueba x.toFixed(2), que en runtime sigue siendo un string y da
// TypeError: x.toFixed is not a function.
// TypeScript no lo caza porque no comprueba el cuerpo de un predicado de tipo:
// lee la promesa de la firma y se la cree. Es la misma familia que as y que el !
// del ítem 01, las tres formas de decirle "confía en mí" y que obedezca.
// Por eso "Hola" no se cuela por ningún agujero, entra por la puerta principal
// con el visto bueno del sistema de tipos.
// El arreglo es que el cuerpo compruebe lo que la firma promete
// (typeof x === "number"), o para formas más complejas describirla una vez con
// Zod y que la comprobación se genere sola en vez de escribirla a mano.

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
export const P3_09_PARCHE: Partial<Ajustes> = { tema: "oscuro" };
// Por qué: el spread copia, y lo que se escribe después pisa. En
// { ...parche, ...base } el último es base, así que base gana y el parche se
// queda tapado. Para que funcionara habría que darle la vuelta al orden:
// { ...base, ...parche }.
// Con { tema: "oscuro" } el parche pide un cambio de verdad respecto a la base,
// que tiene tema: "claro", pero sale igual que entró y el resultado es idéntico a
// AJUSTES_BASE. Y no falla de forma visible en ningún momento: devuelve un
// Ajustes completo y válido, solo que los ajustes de siempre.
// TypeScript no lo caza porque vigila formas. Los dos órdenes producen la misma
// forma exacta, así que no tiene nada de lo que quejarse. Lo único que cambia son
// los valores en tiempo de ejecución, y los valores TS no los sigue.
// No es un error de tipos, es un error de intención: la firma promete devolver un
// Ajustes y lo cumple; lo que incumple es el comentario de arriba, y los
// comentarios no los comprueba nadie. Es el mismo hueco que en
// 04-objetos/exercise-04, donde un precio rebajado a -10 también es un number
// perfectamente válido.
// Descartado: que AJUSTES_BASE sea const no tiene nada que ver. Con let el bug es
// idéntico, const no congela el contenido (BASE.tema = "otro" funciona sobre una
// const), solo impide reasignar la variable entera, y además fusionar nunca
// escribe en la base, solo la lee. Para inmutabilidad de verdad: readonly en
// compilación u Object.freeze en runtime.

/* ─────────────────────────────────────────────────────────────────────────────
 * 10 — el buscador que no encuentra
 * ───────────────────────────────────────────────────────────────────────────*/
// export type Producto = { id: number; nombre: string; precio: number };

export const CATALOGO: Producto[] = [
  { id: 1, nombre: "Té", precio: 100 },
  { id: 2, nombre: "Café", precio: 250 },
];

export function incluye(lista: Producto[], p: Producto): boolean {
  return lista.includes(p);
}
// Escribe un producto que SÍ está en el catálogo y que la función no encuentra:
export const P3_10_ENTRADA: Producto = { id: 1, nombre: "Té", precio: 100 };
// Por qué: .includes no compara contenidos, compara identidad. Pregunta si es el
// mismo objeto, no si dice lo mismo. Cada { } que escribes fabrica un objeto
// nuevo aunque lleve dentro exactamente lo mismo que otro: {a:1} === {a:1} da
// false.
// Por eso este producto, que tiene los mismos valores que CATALOGO[0] pero está
// tecleado aparte, no lo encuentra. Si en vez de escribirlo se sacara del array
// (CATALOGO[0]) sí daría true, porque entonces sí es el mismo objeto.
// La intuición falla porque con strings y números .includes funciona bien: los
// primitivos se comparan por valor ("Té" === "Té" es true). Solo cambia de
// comportamiento cuando le pasas objetos, y no avisa de que ha cambiado.
// TypeScript no lo caza porque vigila formas, igual que en el 09: lista es
// Producto[], p es Producto, .includes acepta un Producto y devuelve boolean.
// Todo encaja. Identidad y contenido son cosas de runtime, no de tipos.
// El arreglo sería comparar a mano lo que importa:
// lista.some(x => x.id === p.id)

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
