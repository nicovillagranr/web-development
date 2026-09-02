# Pistas — exercise-02

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.

**Aviso sobre las pistas 3 de este archivo.** En los demás, la pista 3 cita el error
literal de `tsc`. Aquí solo el drill 1 tiene uno: los otros cuatro compilan sin una
queja y fallan al ejecutarse. En su lugar va el dato duro — normalmente, qué valor
sale de verdad frente al que esperabas.

---

## Drill 1 — `GuardarNombre`

<details><summary>Pista 1 — conceptual</summary>

El starter hace dos cosas: guardar, y luego vaciar el input con lo que le devolvió el
paso de guardar. La primera está bien. La segunda parte de una suposición sobre qué
sale de llamar a un setter.

Vete al recordatorio del principio del archivo y lee la firma de `setN` entera,
incluida la parte de después de la flecha.
</details>

<details><summary>Pista 2 — más concreta</summary>

Un setter no te entrega nada; su tipo de retorno lo dice. Así que `loGuardado` no
contiene el texto: contiene la nada.

Pero fíjate en lo que pide el enunciado — que el input se quede **vacío**. Para eso ni
siquiera necesitabas recuperar nada: sabes exactamente con qué valor tiene que quedarse
el campo.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2345: Argument of type 'void' is not assignable to parameter of type
'SetStateAction<string>'.
```

`void` es lo que salió de `setGuardado(texto)`. Le estás pasando "nada" a un setter
que pide un `string`.
</details>

<details><summary>Solución</summary>

```tsx
const guardar = () => {
  setGuardado(texto)
  setTexto("")
}
```

El texto que había que guardar ya lo tenías en `texto`; no hacía falta que nadie te lo
devolviera. Y vaciar el campo es ponerle la cadena vacía, que es su valor inicial.
</details>

---

## Drill 2 — `ContadorConAviso`

<details><summary>Pista 1 — conceptual</summary>

El número de arriba sale bien y el aviso va un paso por detrás, aunque las dos líneas
están pegadas y en el orden correcto. Eso descarta que sea un problema de orden.

La pregunta que lo desbloquea: entre la primera línea y la segunda, ¿ha cambiado `n`?
</details>

<details><summary>Pista 2 — más concreta</summary>

`n` es una constante de este render. Llamar al setter programa un render nuevo, pero no
reescribe la constante que tienes delante: dentro de esta función `n` vale lo mismo de
la primera línea a la última.

El valor que quieres poner en el aviso lo has escrito ya, una línea más arriba, dentro
de la llamada al setter.
</details>

<details><summary>Pista 3 — el dato duro</summary>

`pnpm typecheck` está en silencio: leer `n` ahí es legal. Lo que sale al ejecutar, con
`n` valiendo 0 y tras un click:

| lo que se ve | lo que espera el test |
|---|---|
| el `<p>` del número → `1` | `1` ✅ |
| el `<p>` del aviso → `Ahora vale 0` | `Ahora vale 1` ❌ |

Un render de retraso, exactamente.
</details>

<details><summary>Solución</summary>

```tsx
const sumar = () => {
  setN(n + 1)
  setAviso(`Ahora vale ${n + 1}`)
}
```

`n + 1` es el valor que va a tener el estado en el próximo render, y lo puedes calcular
tú aquí mismo. Lo que no puedes es esperar a que `n` cambie solo a mitad de la función.
</details>

---

## Drill 3 — `ContadorDoble`

<details><summary>Pista 1 — conceptual</summary>

Hay dos llamadas al setter y el número sube uno. No es que la segunda no se ejecute:
se ejecuta. El problema es qué valor calcula cada una.

Escribe al lado, a mano, cuánto vale `n` en cada una de las dos líneas cuando el
contador está a 0. Vas a ver que las dos escriben lo mismo.
</details>

<details><summary>Pista 2 — más concreta</summary>

Las dos llamadas leen la misma constante, así que las dos piden guardar `1`, y la
segunda pisa a la primera.

Lo arregla la otra forma del setter, la que está en la teoría 2: en vez de entregarle
un número ya calculado, le entregas una función. React la llama con el valor más
reciente, así que la segunda ya no ve el valor de partida.
</details>

<details><summary>Pista 3 — el dato duro</summary>

Typecheck en silencio otra vez. Al ejecutar, partiendo de 0:

```
setN(n + 1); setN(n + 1)          →  n = 1   (0+1 y 0+1)
setN(a => a + 1); setN(a => a + 1) →  n = 2   (0→1, y luego 1→2)
```

El test pulsa dos veces y espera `4`.
</details>

<details><summary>Solución</summary>

```tsx
const sumarDos = () => {
  setN((a) => a + 1)
  setN((a) => a + 1)
}
```

`a` no lo pones tú: lo pone React al llamar a la función, y le pasa el valor más
reciente. Por eso la segunda llamada ya parte de 1 y no de 0.
</details>

---

## Drill 4 — `RegistroDoble`

<details><summary>Pista 1 — conceptual</summary>

Es el drill 3 con un array en lugar de un número. Si aquel lo tienes cerrado, este es
el mismo cambio; si no, ciérralo antes.

Cuenta cuántos `<li>` salen tras un click y compáralo con los dos que pide el enunciado.
</details>

<details><summary>Pista 2 — más concreta</summary>

Las dos llamadas parten del mismo `clicks`, así que las dos construyen un array de un
solo elemento y con el mismo texto — porque `clicks.length` también vale lo mismo en
las dos.

Necesitas que la segunda vea lo que dejó la primera. Y ojo: dentro de la función
actualizadora hay que usar el parámetro que te dan, no la constante de fuera. Si dejas
`clicks.length` dentro, no habrás arreglado nada.
</details>

<details><summary>Pista 3 — el dato duro</summary>

Lo que sale al ejecutar, tras un click:

| starter | esperado |
|---|---|
| 1 `<li>`, con texto `Click 1` | 2 `<li>`: `Click 1` y `Click 2` |

Y tras el segundo click el starter sigue mostrando uno solo, porque vuelve a
reconstruir la lista desde el mismo punto.
</details>

<details><summary>Solución</summary>

```tsx
const registrarDos = () => {
  setClicks((a) => [...a, `Click ${a.length + 1}`])
  setClicks((a) => [...a, `Click ${a.length + 1}`])
}
```

Las dos llamadas usan `a`, el array más reciente que les pasa React. La segunda ya ve
el elemento que metió la primera, así que cuenta bien y no la pisa.
</details>

---

## Drill 5 — `ContadorConTope`

<details><summary>Pista 1 — conceptual</summary>

Este junta las dos mitades del archivo. Ya sabes que las dos llamadas tienen que pasar
a la forma funcional; lo nuevo es que aquí, además, hay una **decisión** —el tope— y esa
decisión también está mirando el valor equivocado.

Pregúntate quién tiene el dato bueno en el momento de decidir si se puede subir.
</details>

<details><summary>Pista 2 — más concreta</summary>

Si dejas el `n >= 3` fuera y solo cambias la suma, las dos llamadas seguirán preguntando
por el valor de este render y el tope se saltará por uno.

La función actualizadora no tiene por qué ser una sola expresión de suma: recibe el
valor más reciente, así que dentro de ella puedes comprobar el tope y devolver ese mismo
valor sin tocarlo cuando ya se llegó.
</details>

<details><summary>Pista 3 — el dato duro</summary>

Typecheck en silencio. Lo que da el starter frente a lo que pide el test:

| click | starter | esperado |
|---|---|---|
| 1.º | 1 | 2 |
| 2.º | 2 | 3 |
| 3.º | 3 | 3 |

O sea: falla por partida doble, sube de uno en uno **y** el tope no se aplica donde toca.
</details>

<details><summary>Solución</summary>

```tsx
const sumarDos = () => {
  setN((a) => (a >= 3 ? a : a + 1))
  setN((a) => (a >= 3 ? a : a + 1))
}
```

Devolver `a` tal cual cuando ya se alcanzó el tope es una forma válida de decir "déjalo
como está". La comparación usa `a`, el valor más reciente, así que la segunda llamada se
entera de lo que hizo la primera y el contador se planta exactamente en 3.
</details>
