# Pistas — exercise-01 · entregar una función no es ejecutarla

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.
>
> Los mensajes de la Pista 3 son los que escupe `pnpm typecheck` sobre el starter,
> literales. Cuando no hay mensaje es porque **ese drill typecheck no lo caza**, y la
> pista lo dice.

---

## Drill 1 — `guardarEnLista`

<details><summary>Pista 1 — conceptual</summary>

Lee el tipo de retorno en voz alta: "un array de funciones que devuelven un string".
Ahora mira qué estás metiendo dentro del array.
</details>

<details><summary>Pista 2 — más concreta</summary>

Estás metiendo el resultado de haberla llamado. Los `()` no son decoración: son la
operación que cambia un valor por otro.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type 'string' is not assignable to type '() => string'.
```
</details>

<details><summary>Solución</summary>

```ts
return [receta]
```
</details>

---

## Drill 2 — `ejecutar`

<details><summary>Pista 1 — conceptual</summary>

El tipo de retorno es `string`. ¿Lo que devuelves es un texto, o algo que sabe
fabricar un texto?
</details>

<details><summary>Pista 2 — más concreta</summary>

Es lo segundo. Enciende el fuego.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type '() => string' is not assignable to type 'string'.
```

Le has dado el papel donde pedían comida.
</details>

<details><summary>Solución</summary>

```ts
return receta()
```
</details>

---

## Drill 3 — `entregar`

<details><summary>Pista 1 — conceptual</summary>

Compara este tipo de retorno con el del drill 2. Son distintos, y el trabajo también.
</details>

<details><summary>Pista 2 — más concreta</summary>

Aquí piden exactamente lo mismo que te dieron. No hay que tocar nada: apaga el fuego.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type 'string' is not assignable to type '() => string'.
```

Fíjate en que es **el mismo par de tipos que el drill 2, con los lados cambiados**.
Esa diferencia de lados es la diferencia entre ejecutar y entregar.
</details>

<details><summary>Solución</summary>

```ts
return receta
```
</details>

---

## Drill 4 — `entregarPelado`

<details><summary>Pista 1 — conceptual</summary>

`llamaConTexto` quiere que le des una función, y la va a llamar él. Tú no tienes que
llamarla.
</details>

<details><summary>Pista 2 — más concreta</summary>

Compara las dos firmas: `llamaConTexto` pide `(t: string) => void` y `avisar` **es**
`(t: string) => void`. Encajan enteras. Quítate de en medio.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Dos errores en la misma línea, y hay que leerlos juntos:

```
TS2554: Expected 1 arguments, but got 0.
TS2345: Argument of type 'void' is not assignable to parameter of type '(t: string) => void'.
```

El primero: la llamaste sin darle el texto. El segundo: lo que llegó fue el retorno,
que es nada, donde se pedía la función.
</details>

<details><summary>Solución</summary>

```ts
llamaConTexto(avisar)
```

Esto es literalmente el `onClick={avisar()}` que en el 02 escribirías sin verlo.
</details>

---

## Drill 5 — `entregarEnvuelto`

<details><summary>Pista 1 — conceptual</summary>

Lo que llega es un texto y lo que `avisarLargo` quiere es un número. Alguien tiene que
hacer la conversión, y no va a ser ninguno de los dos.
</details>

<details><summary>Pista 2 — más concreta</summary>

Ese alguien eres tú: una función de una línea que reciba el texto, calcule lo que
haga falta y llame a `avisarLargo` con el resultado.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: … Types of parameters 'n' and 't' are incompatible.
  Type 'string' is not assignable to type 'number'.
```

TS te está nombrando los dos parámetros que no casan, uno de cada firma.
</details>

<details><summary>Solución</summary>

```ts
llamaConTexto((dato) => avisarLargo(dato.length))
```
</details>

---

## Drill 6 — `entregarSacandoDelObjeto`

<details><summary>Pista 1 — conceptual</summary>

El envoltorio está bien puesto. Lo que falla es lo que metes dentro del sobre.
</details>

<details><summary>Pista 2 — más concreta</summary>

Estás pasando la caja entera. `avisar` quiere un texto, y ese texto es **un campo**
de la caja.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: Argument of type '{ type: string; }' is not assignable to parameter of type 'string'.
```

Es la confusión objeto-vs-propiedad, la que más cara te ha salido en este bloque.
</details>

<details><summary>Solución</summary>

```ts
llamaConObjeto((suceso) => avisar(suceso.type))
```
</details>

---

## Drill 7 — `avisarEnMayusculas`

<details><summary>Pista 1 — conceptual</summary>

El envoltorio ya está. Lo que no está es la transformación: reenvía el texto tal cual
lo recibió.
</details>

<details><summary>Pista 2 — más concreta</summary>

Los strings tienen un método que devuelve una copia en mayúsculas. Aplícalo **antes**
de pasárselo a `avisar`.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** Los tipos ya casan: entra un string y sale un
string. Que sea el string equivocado no es asunto suyo. Solo el test lo caza.
</details>

<details><summary>Solución</summary>

```ts
llamaConTexto((t) => avisar(t.toUpperCase()))
```
</details>

---

## Drill 8 — `avisarNombre`

<details><summary>Pista 1 — conceptual</summary>

Del `Usuario` que llega solo cabe una pieza en `avisar`. Mira su firma y mira los
campos disponibles.
</details>

<details><summary>Pista 2 — más concreta</summary>

`avisar` pide un `string`, y en `Usuario` hay más de un campo pero solo uno de ese
tipo en el primer nivel.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
```

Léelo al revés: te está diciendo qué campo cogiste.
</details>

<details><summary>Solución</summary>

```ts
llamaConUsuario((u) => avisar(u.nombre))
```
</details>

---

## Drill 9 — `avisarEdad`

<details><summary>Pista 1 — conceptual</summary>

El objeto que llega es idéntico al del drill 8. Lo único que ha cambiado está en la
firma de `avisar`.
</details>

<details><summary>Pista 2 — más concreta</summary>

Ahora pide un `number`. La firma del destino es lo único que decide qué campo sacar.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

El espejo exacto del drill 8.
</details>

<details><summary>Solución</summary>

```ts
llamaConUsuario((u) => avisar(u.edad))
```
</details>

---

## Drill 10 — `avisarAlias`

<details><summary>Pista 1 — conceptual</summary>

Mira el tipo `Usuario` otra vez, despacio. Uno de sus campos no es un valor suelto:
es otra caja.
</details>

<details><summary>Pista 2 — más concreta</summary>

El starter se para en esa caja intermedia y la entrega entera. Hay que seguir un
nivel más: dos puntos, no uno.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: Argument of type '{ alias: string; }' is not assignable to parameter of type 'string'.
```

Es el drill 6 un piso más abajo: `cuenta` también es una caja, aunque esté dentro de
otra.
</details>

<details><summary>Solución</summary>

```ts
llamaConUsuario((u) => avisar(u.cuenta.alias))
```
</details>

---

## Drill 11 — `avisarResumen`

<details><summary>Pista 1 — conceptual</summary>

Dentro del envoltorio puedes hacer lo que quieras antes de llamar a `avisar`,
incluido usar dos campos en vez de uno.
</details>

<details><summary>Pista 2 — más concreta</summary>

Una template string con los dos campos. Copia la forma exacta del enunciado,
paréntesis y espacio incluidos.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** Un texto a medias es un texto perfectamente válido.
Solo el test compara la forma exacta.
</details>

<details><summary>Solución</summary>

```ts
llamaConUsuario((u) => avisar(`${u.nombre} (${u.edad})`))
```
</details>

---

## Drill 12 — `listarConPosicion`

<details><summary>Pista 1 — conceptual</summary>

`.forEach` te pasa el índice, y el índice de un array no es lo mismo que la posición
que lee una persona.
</details>

<details><summary>Pista 2 — más concreta</summary>

El array cuenta desde 0 y la lista de la pantalla empieza en 1. Haz la cuenta al
construir el texto.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** Cualquier número interpolado produce un string
válido. Este fallo no es de tipos sino de lógica.
</details>

<details><summary>Solución</summary>

```ts
COLORES.forEach((color, i) => avisar(`${i + 1}. ${color}`))
```
</details>

---

## Drill 13 — `avisarCadaColor`

<details><summary>Pista 1 — conceptual</summary>

`.forEach` pasa tres argumentos siempre. La pregunta es si tú estás obligado a
recogerlos todos.
</details>

<details><summary>Pista 2 — más concreta</summary>

No lo estás: **una función puede declarar menos parámetros de los que le pasan**, y
los que no declares se descartan solos. Declara solo el que necesitas.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** Recoger los tres es legal. No sobra un tipo: sobra
trabajo. Y el texto que sale es el que lo delata, en el test.
</details>

<details><summary>Solución</summary>

```ts
COLORES.forEach((color) => avisar(color))
```

Es la cura de `["10","10","10"].map(parseInt)`: `.map((s) => parseInt(s, 10))` declara
una sola mano y los otros dos argumentos pasan de largo.
</details>

---

## Drill 14 — `entregarQueRetorna`

<details><summary>Pista 1 — conceptual</summary>

Parece que las firmas no encajan porque `medir` devuelve algo y el hueco no espera
retorno. Pregúntate si a `void` le importa lo que devuelvas.
</details>

<details><summary>Pista 2 — más concreta</summary>

No le importa: `void` significa "no miro tu retorno", no "no devuelvas nada". El
parámetro casa, así que puedes entregarla como en el drill 4 y no hay dentro donde
equivocarse.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador, y ese es el tema del drill.** El starter envuelve y
dentro devuelve un `number` sin que TS diga una palabra, porque en un hueco `=> void`
cualquier retorno vale. Ese silencio es el peligro: `void` te deja escribir dentro lo
que quieras y el compilador no te cubre ahí.
</details>

<details><summary>Solución</summary>

```ts
llamaConTexto(medir)
```
</details>
