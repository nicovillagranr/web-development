# Pistas — exercise-11 · un objeto para todo el formulario

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.
>
> Los mensajes de la Pista 3 son los que escupe `pnpm typecheck` sobre el starter,
> literales. Cuando no hay mensaje es porque **ese drill typecheck no lo caza**, y la
> pista lo dice y te manda al test.

---

## Drill 1 — `conAliasCambiado`

<details><summary>Pista 1 — conceptual</summary>

Esto ya lo resolviste en la escalera F, pero sobre arrays: `push` cambiaba el que te
habían dado en vez de fabricar otro. Un objeto tiene el mismo problema y la misma
solución, con otra sintaxis.
</details>

<details><summary>Pista 2 — más concreta</summary>

Hay dos cosas distintas: **cambiar el valor de una clave** y **fabricar otro objeto
que tenga esa clave distinta**. Te piden la segunda, y el `📌 RECORDATORIO` de arriba
tiene la forma dibujada.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Nada. Este drill typecheck no lo caza: escribir en una propiedad de un objeto es
código perfectamente válido.

El dato duro está en el test, y son estas dos líneas:

```ts
expect(original).toEqual(BASE)       // el que te dieron, intacto
expect(siguiente).not.toBe(original) // y no puede ser el mismo objeto
```

`toBe` compara identidad, no contenido: pregunta si son **el mismo objeto en memoria**.
</details>

<details><summary>Solución</summary>

```ts
export function conAliasCambiado(perfil: Perfil, alias: string): Perfil {
  return { ...perfil, alias };
}
```

`{ ...perfil }` fabrica un objeto nuevo copiando las tres claves; `alias` a
continuación pisa la suya. El que te pasaron no se toca, así que `toEqual(BASE)` sigue
valiendo y `not.toBe` también.

`alias` a secas es la forma corta de `alias: alias` — se llaman igual la clave y la
variable.
</details>

---

## Drill 2 — `conCampoCambiado`

<details><summary>Pista 1 — conceptual</summary>

El cuerpo está bien. El problema es la **puerta de entrada**: tal como está, esta
función acepta que le pidas pisar un campo que no existe, y no se queja.

El enunciado te dice el ejemplo: `"ciduad"`.
</details>

<details><summary>Pista 2 — más concreta</summary>

`campo` está tipado como "cualquier texto", y lo que quieres es "cualquiera de las
claves de `Perfil`". Ese tipo tiene nombre y aparece en la lista `🗣️ LAS PIEZAS` de la
TEORÍA 1.

Ojo: no lo escribas a mano como una unión de tres literales. Hay un operador que lo
saca del propio `type`, y así no se te desincroniza el día que `Perfil` cambie.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
exercise-11.test.tsx(46,5): error TS2578: Unused '@ts-expect-error' directive.
```

Se lee al revés de lo que parece. El test tiene un `@ts-expect-error` sobre una línea
que **debería** fallar al compilar. Como tu firma se traga cualquier texto, esa línea
compila tan ricamente, la directiva se queda sin trabajo, y TypeScript avisa de que
sobra.

O sea: el error no es "te pasaste", es "no estás filtrando nada".
</details>

<details><summary>Solución</summary>

```ts
export function conCampoCambiado(
  perfil: Perfil,
  campo: keyof Perfil,
  valor: string,
): Perfil {
  return { ...perfil, [campo]: valor };
}
```

`keyof Perfil` es el tipo `"alias" | "ciudad" | "bio"`, calculado a partir del propio
`type`. Con eso, `"ciduad"` deja de compilar, la directiva del test recupera su
trabajo, y `TS2578` desaparece.
</details>

---

## Drill 3 — `conCampoSiEsValido`

<details><summary>Pista 1 — conceptual</summary>

El drill 2 exige una clave de verdad. Este recibe un texto cualquiera. Alguien tiene
que hacer de aduana entre los dos, y ese alguien es esta función.

Piensa qué tiene que pasar **antes** de poder llamar al drill 2 con tranquilidad.
</details>

<details><summary>Pista 2 — más concreta</summary>

Es el mismo movimiento que hiciste con el `<select>` del `exercise-09`: comprobar en
tiempo de ejecución que el texto es uno de los valores esperados. TypeScript sigue esa
comprobación y, dentro del `if`, deja de verlo como "cualquier texto".

Eso se llama **estrechar** (narrowing). Y acuérdate del otro camino: si no es válido,
el enunciado dice que devuelvas el perfil **que te dieron**, no una copia.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Mientras el drill 2 siga roto, **nada**: si `campo` allí acepta cualquier texto, aquí
tampoco protesta. Es el efecto dominó de hacer la escalera en orden.

En cuanto arregles el 2, aparece esto:

```
exercise-11.tsx(118,35): error TS2345: Argument of type 'string' is not assignable
to parameter of type 'keyof Perfil'.
```

Traducido: "me estás dando un texto y yo solo acepto una de las tres claves".

El dato duro del test es la otra mitad:

```ts
expect(siguiente).toBe(original)   // con clave inválida, el MISMO objeto
```
</details>

<details><summary>Solución</summary>

```ts
export function conCampoSiEsValido(
  perfil: Perfil,
  campo: string,
  valor: string,
): Perfil {
  if (campo === "alias" || campo === "ciudad" || campo === "bio") {
    return conCampoCambiado(perfil, campo, valor);
  }
  return perfil;
}
```

Dentro del `if`, TypeScript ya sabe que `campo` solo puede ser una de las tres, o sea
`keyof Perfil`, y por eso la llamada al drill 2 compila. Fuera, devolvemos el mismo
objeto sin fabricar nada — por eso el test usa `toBe` y no `toEqual`.
</details>

---

## Drill 4 — `longitudDe`

<details><summary>Pista 1 — conceptual</summary>

La firma del starter solo admite una de las dos cosas que el enunciado dice que le
pueden pasar. No hace falta tocar el cuerpo.

Y no, no se arregla con dos funciones ni con un `if`.
</details>

<details><summary>Pista 2 — más concreta</summary>

Necesitas un tipo que signifique "un texto **o** una lista de textos, y no sé cuál".
Eso es una **unión**, y su símbolo está en la primera línea de `🗣️ LAS PIEZAS` de la
TEORÍA 2.

Lo que hace que el cuerpo siga funcionando sin preguntar nada es que `.length` lo
tienen los dos lados.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
exercise-11.test.tsx(71,23): error TS2345: Argument of type 'string[]' is not
assignable to parameter of type 'string'.
```

Fíjate en que el error sale en el **archivo de test**, no en el tuyo. Es normal: tu
función compila perfectamente, lo que no compila es el test intentando usarla como
dice el enunciado. Cuando la señal aparece en el `.test.tsx`, casi siempre es que tu
firma se ha quedado corta.
</details>

<details><summary>Solución</summary>

```ts
export function longitudDe(valor: string | string[]): number {
  return valor.length;
}
```

`string | string[]` acepta las dos. Dentro, TypeScript no sabe cuál de las dos te han
pasado, así que solo te deja usar lo que **ambas** tienen — y `.length` está en las
dos, con el mismo tipo `number`. Por eso no hace falta ningún `if`.
</details>

---

## Drill 5 — `nombreYValor`

<details><summary>Pista 1 — conceptual</summary>

Es literalmente el drill 4 otra vez. Lo único que cambia es de qué están hechas las
dos mitades de la unión: allí eran dos formas de texto, aquí son dos elementos del DOM.

Si el 4 te salió, este es copiar el movimiento.
</details>

<details><summary>Pista 2 — más concreta</summary>

Los dos nombres que te hacen falta están escritos en el `EJEMPLO` de la TEORÍA 2, tal
cual. Van en el parámetro `elemento`, separados por el mismo símbolo del drill 4.

Y funciona por lo mismo: `name` y `value` los llevan los dos elementos.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
exercise-11.test.tsx(86,25): error TS2379: Argument of type 'HTMLTextAreaElement' is
not assignable to parameter of type 'HTMLInputElement' with
'exactOptionalPropertyTypes: true'.
```

Ignora la coletilla del `exactOptionalPropertyTypes`: es un ajuste del `tsconfig` de
este repo y no tiene que ver con lo que fallas. Lo que importa es la primera línea —
le estás dando un `<textarea>` a algo que solo admite `<input>`.
</details>

<details><summary>Solución</summary>

```ts
export function nombreYValor(elemento: HTMLInputElement | HTMLTextAreaElement): {
  name: string;
  value: string;
} {
  return { name: elemento.name, value: elemento.value };
}
```

Misma idea que el 4. Dentro de la función no sabes cuál de los dos elementos te han
dado, y no te hace falta: `name` y `value` están garantizados por los dos lados.

Prueba a escribir `elemento.rows` y mira cómo te para — `rows` solo lo tiene el
`<textarea>`, y por eso la unión no te lo deja.
</details>

---

## Drill 6 — `datosDelCampo`

<details><summary>Pista 1 — conceptual</summary>

Este es **el** drill del archivo. Todo lo anterior existe para que llegues aquí con la
pieza en la mano.

Lo que recibes ya no es el elemento: es el evento que lo envuelve. Y el evento lleva
escrito por dentro de qué elemento viene.
</details>

<details><summary>Pista 2 — más concreta</summary>

`ChangeEvent<T>` es un tipo **genérico**: esa `T` entre `<>` es un hueco que rellenas
tú, y lo que pongas ahí es lo que TypeScript entiende que es `e.target`.

Hasta ahora siempre has rellenado ese hueco con **un** elemento. Nada te obliga a eso:
en el hueco cabe exactamente lo mismo que cabía en el parámetro del drill 5.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
exercise-11.test.tsx(96,47): error TS2345: Argument of type
'ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>' is not assignable to
parameter of type 'ChangeEvent<HTMLInputElement, Element>'.
```

Léelo comparando los dos `<...>`: el que llega abarca dos elementos y el que tú
declaras abarca uno. El envoltorio es el mismo, lo que no encaja es el relleno.
</details>

<details><summary>Solución</summary>

```ts
export function datosDelCampo(
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
): { name: string; value: string } {
  return nombreYValor(e.target);
}
```

La unión entra **dentro** del genérico. Con eso, `e.target` pasa a ser
`HTMLInputElement | HTMLTextAreaElement`, que es justo lo que el drill 5 sabe recibir,
y las dos piezas encajan sin un solo `as`.
</details>

---

## Drill 7 — `PerfilQueEscribe`

<details><summary>Pista 1 — conceptual</summary>

Lee lo que hace el starter y lee lo que pide el enunciado. Guarda algo, sí, pero no lo
que le piden y no donde le piden.

Fíjate en qué `<p>` mira el test.
</details>

<details><summary>Pista 2 — más concreta</summary>

Dos cosas que arreglar, y son independientes:

1. la clave en la que escribe — el enunciado dice que reutilices el **drill 1**, que
   ya sabe cuál es;
2. lo que guarda dentro de ella.

Y una que ya está bien y no hay que tocar: el estado es el perfil entero, no un
`useState` por campo.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Nada, y aquí no hay truco: guardar un texto válido en una clave válida es correcto
para TypeScript aunque sea la clave equivocada. Los tipos no saben lo que querías
hacer.

La señal es el test:

```ts
expect(screen.getByText("nv")).toBeInTheDocument()
```

En el navegador se ve igual de claro: escribes en el campo y el `<p>` no se inmuta.
</details>

<details><summary>Solución</summary>

```tsx
const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
  const nuevoAlias = e.target.value;
  setPerfil((prev) => conAliasCambiado(prev, nuevoAlias));
};
```

`e.target.value` es lo que hay escrito en el campo justo después de la tecla. El drill
1 fabrica el perfil siguiente a partir del que hubiera, y `setPerfil` lo guarda.

Lo de `(prev) => ...` en vez de usar `perfil` directamente: le pides a React el valor
más reciente en lugar del que capturó este render. Con un solo campo da igual, pero es
la forma que no se rompe cuando llegan dos cambios seguidos.
</details>

---

## Drill 8 — `PerfilDosCampos`

<details><summary>Pista 1 — conceptual</summary>

El manejador es uno solo y se lo comen dos campos, así que dentro de él tiene que
haber una pregunta que ahora no está: **¿desde cuál de los dos me han llamado?**

Ese dato no te lo tienes que inventar: viaja en el propio elemento.
</details>

<details><summary>Pista 2 — más concreta</summary>

El atributo `name` del JSX es el que lleva esa información, y llega al manejador
dentro de `e.target`. El starter lo tira: solo se queda con el valor.

Lo que saques de ahí es un `string` cualquiera a ojos de TypeScript, así que no se lo
puedes pasar al drill 2. Para eso escribiste el **drill 3**.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Nada. El starter compila perfectamente: le pasa `"alias"`, que es una clave válida, y
la firma está bien puesta.

La señal es el test:

```ts
expect(screen.getByLabelText("Ciudad")).toHaveValue("Iquique")
```

Y en el navegador: el campo Ciudad no acepta nada de lo que teclees, mientras que lo
que escribas ahí aparece en el `<p>` del alias. Ese síntoma cruzado es la firma del
fallo.
</details>

<details><summary>Solución</summary>

```tsx
const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setPerfil((prev) => conCampoSiEsValido(prev, name, value));
};
```

`name` te dice a qué clave va y `value` qué se guarda. El drill 3 se encarga de la
desconfianza: comprueba que ese texto sea una clave de verdad antes de pisar nada.

Por eso el drill 3 existía: es la aduana entre lo que dice el navegador y lo que
acepta tu tipo.
</details>

---

## Drill 9 — `PerfilConBio`

<details><summary>Pista 1 — conceptual</summary>

El cuerpo del manejador está bien y no hay que tocarlo. El problema es a quién dice
que sirve.

Ahora hay tres campos colgando del mismo manejador, y uno de los tres no es de la
misma clase que los otros dos.
</details>

<details><summary>Pista 2 — más concreta</summary>

Es el drill 6, aplicado. Ahí ensanchaste el hueco de `ChangeEvent<...>` para que
abarcase los dos elementos; aquí toca hacer lo mismo en la firma de `alEscribir`.

Un aviso, porque es la salida que apetece: **añadir un segundo manejador solo para el
`<textarea>` calla el error, pero no resuelve el drill.** El enunciado pide uno, y el
test se llama "el mismo manejador sirve también al `<textarea>`". Está en la `⚠️
TRAMPA` de la TEORÍA 2.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
exercise-11.tsx(320,9): error TS2322: Type '(e: ChangeEvent<HTMLInputElement>) => void'
is not assignable to type 'ChangeEventHandler<HTMLTextAreaElement, HTMLTextAreaElement>'.
```

Ojo con dónde te apunta: la línea es el `onChange` del `<textarea>`, pero lo que está
mal no está ahí. El JSX es correcto — el `<textarea>` pide un manejador de
`<textarea>` y tú le das uno que solo acepta `<input>`. Lo que hay que cambiar es la
**declaración** de `alEscribir`, veinte líneas más arriba.
</details>

<details><summary>Solución</summary>

```tsx
const alEscribir = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setPerfil((prev) => conCampoSiEsValido(prev, name, value));
};
```

Un solo manejador que declara servir a los dos tipos de elemento. Dentro no cambia
nada: `name` y `value` los tienen los dos, que es exactamente por lo que la unión
funciona.
</details>

---

## Drill 10 — `PerfilCompacto`

<details><summary>Pista 1 — conceptual</summary>

El 9 y el 10 se comportan igual a propósito: mismos campos, mismos `aria-label`,
mismos `<p>`. El test no puede distinguirlos. Lo único que cambia es **quién lee el
evento**.

En el 9 lo abre el manejador. En el 10 no lo abre nadie aquí: se lo pasa entero a una
función que ya escribiste. La regla para saber si lo cumpliste es literal — la `e`
aparece **una sola vez** en el cuerpo, y es como argumento de otra función. Si te
queda un `e.target.algo`, todavía no está.
</details>

<details><summary>Pista 2 — más concreta</summary>

Sube al drill 6: recibe el evento entero y devuelve `{ name, value }`, que es
exactamente el par de datos que aquí estarías sacando a mano.

Ojo al desarmar lo que devuelve, que es donde se atasca: **los nombres que escribas
tienen que ser las claves reales del objeto**, no nombres que elijas tú.

```ts
const { name, value } = datosDelCampo(e);          // ✅
const { nombre, valor } = datosDelCampo(e);        // ❌ esas claves no existen
const { name: nombre, value: valor } = datos...    // ✅ renombrar lleva dos puntos
```
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Normalmente **nada**, y esa es la gracia del drill: copiar el manejador del 9 y leer
`e.target.name` a mano es código perfectamente válido. Typecheck no tiene de qué
quejarse, y el test tampoco, porque el comportamiento es idéntico.

La señal de que falta el drill 6 no es un error. Es esto:

```bash
grep -n "datosDelCampo(" exercise-11.tsx     # → solo su definición. Cero llamadas.
```

Un peldaño de la escalera al que no sube ningún peldaño posterior es un peldaño de
adorno.

Si typecheck **sí** habla, es por lo otro: inventaste los nombres al desarmar.

```
error TS2339: Property 'nombre' does not exist on type '{ name: string; value: string; }'.
```
</details>

<details><summary>Solución</summary>

```tsx
const alEscribir = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name: nombre, value: valor } = datosDelCampo(e);
  setPerfil(conCampoSiEsValido(perfil, nombre, valor));
};
```

Dos líneas, y las dos son llamadas a piezas que ya tenías: el drill 6 saca los datos
del evento y el drill 3 decide si se pisa la clave. Sin renombrar (`const { name,
value } = ...`) es igual de correcto y más corto.

Este es el manejador final: si abres el `handleChange` de tu `ContactForm.jsx`, es
este con otros nombres.

📌 **Sobre `prev`.** La solución del drill 9, aquí arriba, actualiza con
`setPerfil((prev) => ...)` y ésta con `setPerfil(conCampoSiEsValido(perfil, ...))`.
Las dos son correctas: con un campo controlado y **una** actualización por evento,
leer `perfil` del render vale. La de `prev` deja de ser opcional en dos casos
concretos:

- dos `setPerfil` en el mismo evento — el segundo lee el `perfil` viejo y pisa al primero
- actualizar después de un `await` o dentro de un `setTimeout` — ese `perfil` es el
  del render en que se programó, no el de ahora
</details>
