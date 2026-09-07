# Pistas — exercise-12 · el objeto de errores

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.
>
> Los mensajes de la Pista 3 son los que escupe `pnpm typecheck` sobre el starter,
> literales. Cuando no hay mensaje es porque **ese drill typecheck no lo caza**, y la
> pista lo dice y te manda al test.

---

## Drill 1 — `errorDeAlias`

<details><summary>Pista 1 — conceptual</summary>

El cuerpo hace lo correcto: arranca de un objeto vacío y le mete la clave si hace
falta. Lo que no está bien es la primera línea.

`const errores = {}` no dice "un objeto que iré llenando". Dice algo mucho más
concreto, y la TEORÍA 1 empieza justo con eso.
</details>

<details><summary>Pista 2 — más concreta</summary>

TypeScript le da a esa constante la forma que ve, y lo que ve es un objeto sin
ninguna clave. Todo lo que le metas después es una clave que ese tipo no tiene.

Ya tienes escrito, veinte líneas más arriba, el tipo que sí las tiene. Falta ponerlo
donde se declara la constante.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2339: Property 'alias' does not exist on type '{}'.
```

Léelo entero, sobre todo el final: **`type '{}'`**. Ese es el tipo que se le ha
quedado a `errores`, y no es "objeto cualquiera" — es "objeto sin propiedades".

Ojo: este drill **pasa el test**. En ejecución, JavaScript deja añadir claves a
cualquier objeto tan ricamente. Es uno de los dos verdes de mentira del archivo.
</details>

<details><summary>Solución</summary>

```ts
const errores: Errores = {};
if (alias === "") errores.alias = "El alias es obligatorio";
return errores;
```

Una anotación de cuatro caracteres. Con ella, el objeto pasa a tener tres claves
declaradas —opcionales, así que puede no traer ninguna— y meterle `alias` es
legítimo.

Esto es, letra por letra, el `const errors = {}` de tu `07-Contact`.
</details>

---

## Drill 2 — `errorDeCiudad`

<details><summary>Pista 1 — conceptual</summary>

Este falla en el test y no en el compilador, y esa es toda la lección: **nadie le ha
dicho al compilador qué tiene que devolver esta función**, así que se lo cree todo.

Compara su primera línea con la del drill 1.
</details>

<details><summary>Pista 2 — más concreta</summary>

Dos cosas, y la segunda solo se ve después de arreglar la primera:

1. La función no declara qué devuelve. El drill 1 sí.
2. Dentro hay una errata en el nombre de una clave.

Arregla la 1 y la 2 se cae sola: por eso el enunciado te pide que la próxima errata
se cante ella misma.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

**Nada, y ese es el drill.** Sin tipo de retorno anotado, TypeScript no compara lo
que devuelves contra nada: se limita a mirarlo y decir "pues será eso". Una función
que devuelve `{ ciduad: string }` es una función perfectamente válida.

La señal está en el test:

```
AssertionError: expected { ciduad: 'La ciudad es obligatoria' } to deeply equal
                         { ciudad: 'La ciudad es obligatoria' }
```

En cuanto anotes el retorno, el mensaje cambia de sitio y pasa a ser de tipos.
</details>

<details><summary>Solución</summary>

```ts
export function errorDeCiudad(ciudad: string): Errores {
  return ciudad === "" ? { ciudad: "La ciudad es obligatoria" } : {};
}
```

El `: Errores` es lo que convierte una errata silenciosa en un error en rojo. Sin él,
`ciduad` es una clave tan buena como cualquier otra.

Y fíjate en lo que NO hace falta aquí: ni constante intermedia ni `if`. Cuando el
objeto se conoce entero de una vez, se devuelve entero de una vez.
</details>

---

## Drill 3 — `errorDeBio`

<details><summary>Pista 1 — conceptual</summary>

`bio.length > 60` contesta a la pregunta correcta: *¿es demasiado larga?*. Pero lo
que hay que guardar en el objeto de errores no es la respuesta a esa pregunta.

Mira qué tipo tiene la clave `bio` en el `type Errores`.
</details>

<details><summary>Pista 2 — más concreta</summary>

En `Errores`, cada clave guarda **el texto que se le enseña a la persona**, no un
sí/no. La comprobación sirve para decidir, no para guardarla.

Y hay una segunda mitad: el starter devuelve la clave SIEMPRE. Cuando la bio es
corta, este objeto no tiene que traer la clave `bio` en absoluto.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2322: Type 'boolean' is not assignable to type 'string'.
```

Directo: donde va un texto le estás poniendo un sí/no. Lo que el compilador **no**
te dice es la otra mitad —que la clave sobra cuando la bio es corta—, porque
`{ bio: "…" }` es un `Errores` perfectamente válido. Esa la caza el test.
</details>

<details><summary>Solución</summary>

```ts
export function errorDeBio(bio: string): Errores {
  return bio.length > 60
    ? { bio: "La bio no puede pasar de 60 caracteres" }
    : {};
}
```

El booleano decide qué rama se toma; el mensaje es lo que se guarda. Y la rama corta
devuelve `{}`: sin clave, no hay error.
</details>

---

## Drill 4 — `hayErrores`

<details><summary>Pista 1 — conceptual</summary>

La idea es buena: "si no es el objeto vacío, hay errores". El problema es que en
JavaScript esa frase no se puede escribir con `!==`.

Dos objetos escritos por separado nunca son el mismo objeto, aunque lleven lo mismo
dentro.
</details>

<details><summary>Pista 2 — más concreta</summary>

`===` y `!==` sobre objetos no miran el contenido: miran si son **el mismo** objeto
en memoria. `{} === {}` es `false`. Así que `errores !== {}` es `true` siempre, con
errores y sin ellos.

Para saber si un objeto está vacío hay que preguntarle por lo único que lo distingue
de otro: sus claves. Está en 🗣️ LAS PIEZAS de la TEORÍA 2.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2839: This condition will always return 'true' since JavaScript compares
objects by reference, not value.
```

Este mensaje es un regalo: no solo dice que está mal, dice **por qué** y te da el
vocabulario. *By reference, not value* — por referencia, no por valor.

Y es el único drill del archivo que además sale en `pnpm lint`, con el mismo
diagnóstico dicho de otra forma:

```
error  Unexpected comparison to newly constructed object. These two values can
never be equal  no-constant-binary-expression
```

Dos herramientas distintas señalando la misma línea. Cuando eso pasa, no es una
cuestión de estilo.
</details>

<details><summary>Solución</summary>

```ts
export function hayErrores(errores: Errores): boolean {
  return Object.keys(errores).length > 0;
}
```

`Object.keys` devuelve un array con los nombres de las claves que el objeto SÍ trae.
Si ese array está vacío, no hay errores.
</details>

---

## Drill 5 — `mensajeDe`

<details><summary>Pista 1 — conceptual</summary>

La firma promete devolver un `string`. Lee otra vez la TEORÍA 2 y pregúntate qué tipo
tiene exactamente lo que sale de leer una clave opcional.

No es `string`. Es `string` **o** otra cosa.
</details>

<details><summary>Pista 2 — más concreta</summary>

`errores[campo]` puede devolver `undefined`, porque las tres claves de `Errores` son
opcionales. Y `undefined` no es un `string`.

El enunciado ya te dice qué hacer en ese caso. Lo que falta es preguntarlo antes de
devolver.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2322: Type 'string | undefined' is not assignable to type 'string'.
```

Ahí tienes el tipo real de lo que estás leyendo, escrito por el compilador:
`string | undefined`. Es la unión del `11`, pero esta vez con `undefined` en el otro
lado en lugar de un elemento del DOM.
</details>

<details><summary>Solución</summary>

```ts
export function mensajeDe(errores: Errores, campo: keyof Errores): string {
  const mensaje = errores[campo];
  if (mensaje === undefined) return "";
  return mensaje;
}
```

Después del `if`, el `undefined` ya está descartado y el compilador trata `mensaje`
como `string` sin que se lo digas. Eso es estrechar, y es la TEORÍA 3 entera.
</details>

---

## Drill 6 — `conError`

<details><summary>Pista 1 — conceptual</summary>

Este ya lo has arreglado antes, en el `11`. La función devuelve un objeto con la
clave puesta, sí — pero devuelve **el mismo** objeto que le pasaron, con una línea
tachada encima.

El enunciado pide otro.
</details>

<details><summary>Pista 2 — más concreta</summary>

`errores[campo] = mensaje` escribe sobre el objeto de quien te llamó. Quien te lo
prestó no esperaba recuperarlo cambiado.

Lo que hace falta es fabricar uno nuevo con las claves del viejo más la que te piden.
La herramienta es la misma que usaste en el drill 1 del `11`, y el nombre de la clave
llega como parámetro, así que va entre corchetes.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

**Nada.** Mutar un objeto que te han pasado es JavaScript perfectamente legal y
TypeScript no tiene nada que objetar: la clave existe y el valor es del tipo correcto.

La señal es el test, y son dos assertions distintas:

```
expected { alias: 'a', bio: 'muy larga' } to deeply equal { alias: 'a' }
```

—el original cambió— y `expect(siguiente).not.toBe(original)`, que comprueba que son
dos objetos y no uno.
</details>

<details><summary>Solución</summary>

```ts
return { ...errores, [campo]: mensaje };
```

Spread para copiar lo que había, clave computada para pisar la que te piden. Idéntico
al `conCampoCambiado` del `11`: cambia el tipo, no el mecanismo.
</details>

---

## Drill 7 — `enMayusculas`

<details><summary>Pista 1 — conceptual</summary>

`toUpperCase()` es un método de los textos. Lo que te llega puede no ser un texto.

Antes de pedirle nada, hay que descartar el caso en que no hay nada.
</details>

<details><summary>Pista 2 — más concreta</summary>

Es la TEORÍA 3 en su versión más pequeña: una comprobación que descarta la mitad
`undefined` de la unión, y a partir de ahí el compilador ya te deja llamar al método.

El enunciado dice qué devolver cuando no hay mensaje.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS18048: 'mensaje' is possibly 'undefined'.
```

*Possibly* — posiblemente. No dice que esté mal siempre: dice que hay un camino por
el que llega vacío, y que ese camino revienta. Y revienta de verdad: en el test verás
`TypeError: Cannot read properties of undefined (reading 'toUpperCase')`.
</details>

<details><summary>Solución</summary>

```ts
export function enMayusculas(mensaje: string | undefined): string {
  if (mensaje === undefined) return "";
  return mensaje.toUpperCase();
}
```

Una línea de guardia arriba y el resto de la función ya trabaja con un `string` de
verdad. Es el mismo patrón del drill 5.
</details>

---

## Drill 8 — `validar`

<details><summary>Pista 1 — conceptual</summary>

Valida un campo de tres. Los otros dos ni se miran.

Y la restricción del enunciado te dice cómo arreglarlo sin escribir una sola regla
nueva: las tres ya están escritas.
</details>

<details><summary>Pista 2 — más concreta</summary>

Cada uno de los drills 1, 2 y 3 devuelve un `Errores` con cero o una clave. Lo que
falta es juntar los tres en uno solo.

Y juntar objetos ya sabes hacerlo: es lo mismo que copiar uno, pero con tres. El
spread admite varios seguidos dentro de las mismas llaves.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

**Nada.** `{ ...errorDeAlias(perfil.alias) }` es un `Errores` impecable — solo que
incompleto. Devolver menos claves de las que hacen falta no es un error de tipos,
porque las tres son opcionales: `{}` también vale.

La señal es el test:

```
expected { alias: 'El alias es obligatorio' } to deeply equal
         { alias: 'El alias es obligatorio', ciudad: 'La ciudad es obligatoria' }
```

Y el chivato de siempre: `grep errorDeCiudad` no encuentra ni una llamada.
</details>

<details><summary>Solución</summary>

```ts
export function validar(perfil: Perfil): Errores {
  return {
    ...errorDeAlias(perfil.alias),
    ...errorDeCiudad(perfil.ciudad),
    ...errorDeBio(perfil.bio),
  };
}
```

Tres spreads seguidos. Cada uno aporta su clave si la tiene y no aporta nada si
devolvió `{}`. Cuando los tres campos están bien, el resultado es `{}` — que es
exactamente lo que `hayErrores` va a leer como "no hay errores".
</details>

---

## Drill 9 — `AliasConError`

<details><summary>Pista 1 — conceptual</summary>

El componente funciona en pantalla. Escribe, borra, y el aviso aparece y desaparece.
Y aun así está mal: es el segundo verde de mentira del archivo.

Mira las dos líneas de `useState` y compáralas entre sí.
</details>

<details><summary>Pista 2 — más concreta</summary>

`useState` adivina el tipo del estado a partir del valor con el que arranca. El perfil
arranca con sus tres claves puestas, así que ahí adivina bien. Los errores arrancan
vacíos.

Es el drill 1 otra vez, en el sitio donde de verdad te pasó: en tu `07-Contact` esto
se llama `useState({})`.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2339: Property 'alias' does not exist on type '{}'.
```

El mismo mensaje del drill 1, dos veces, las dos en la línea del `<p>`. Porque el
problema es el mismo: un objeto que arranca vacío y al que nadie le ha dicho qué
claves puede llegar a tener.

La diferencia con el drill 1 es dónde se pone la forma. Allí era una anotación de
constante; aquí `useState` admite decírselo entre picoparéntesis.
</details>

<details><summary>Solución</summary>

```tsx
const [errores, setErrores] = useState<Errores>({});
```

Nada más. `useState<Errores>({})` arranca igual de vacío, pero ya sabe qué puede
llegar a llevar dentro.

Compáralo con la línea de arriba: `useState<Perfil>({ … })` habría funcionado sin el
`<Perfil>`, porque el valor inicial ya trae las tres claves. Con un objeto vacío no
hay nada que adivinar, y por eso hay que decirlo.
</details>

---

## Drill 10 — `PerfilValidado`

<details><summary>Pista 1 — conceptual</summary>

Los tres `<p role="alert">` están siempre en la página. Vacíos, pero están.

Para quien mira la pantalla no se nota. Para quien la escucha con un lector, hay tres
avisos de error en un formulario que todavía no ha enviado.
</details>

<details><summary>Pista 2 — más concreta</summary>

Un aviso tiene que **existir o no existir**, no estar vacío. Y el JSX tiene una forma
de decir "esto solo si se cumple algo", que ya usaste en el drill 9 de este mismo
archivo.

La condición es la misma pregunta del drill 5: ¿tiene error este campo?
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

**Nada, y es lo interesante.** `{mensajeDe(errores, "alias")}` devuelve un `string`, y
React pinta `string` sin rechistar. Cuando ese texto es `""` no se ve nada en
pantalla, así que ni el compilador ni tus ojos se enteran.

La señal es el test, que cuenta elementos y no texto:

```
expected [ <p />, <p />, <p /> ] to have a length of 0 but got 3
```

Un `<p>` vacío sigue siendo un `<p>`.
</details>

<details><summary>Solución</summary>

```tsx
{errores.alias !== undefined && <p role="alert">{mensajeDe(errores, "alias")}</p>}
```

…y lo mismo para `ciudad` y `bio`. Con `&&`, si la izquierda es falsa el `<p>` no
llega a crearse: no es que se pinte vacío, es que no existe.

Este es el patrón que le falta a tu `ContactForm.jsx`, y la razón por la que existe
`role="alert"`: un lector de pantalla anuncia el aviso en el momento en que aparece.
Si ya estaba ahí desde el principio, no anuncia nada.
</details>
