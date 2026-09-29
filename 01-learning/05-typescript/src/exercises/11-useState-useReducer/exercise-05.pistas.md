# Pistas — exercise-05 · qué sale de un spread

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Del 1 al 5 no hay error de compilador que citar: la Pista 3 es lo que responde el test o
el dato que lo cierra. Si dudas en una predicción, **ejecútala**: pega las dos líneas en
la consola del navegador (F12) y mira qué sale. Así se te desbloqueó la copia superficial
en el `03b`.

---

## Drill 1 — `respuesta1`

<details><summary>Pista 1 — conceptual</summary>

Dentro de las llaves solo está `...ana`. ¿Qué claves de `ana` quedan fuera?

</details>

<details><summary>Pista 2 — más concreta</summary>

El spread copia **todas** las claves con su valor. Mira qué ciudad tiene `ana`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected '' to be 'Santiago'
```

</details>

<details><summary>Solución</summary>

`"Santiago"`. `{ ...ana }` es una fotocopia entera: todas las claves y los mismos valores.

</details>

---

## Drill 2 — `respuesta2`

<details><summary>Pista 1 — conceptual</summary>

Se pisa una clave. ¿Es la que te preguntan?

</details>

<details><summary>Pista 2 — más concreta</summary>

Lo que no se escribe detrás del spread sale con el valor que traía `ana`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected '' to be 'Ana'
```

</details>

<details><summary>Solución</summary>

`"Ana"`. Solo se pisa `ciudad`; `nombre` sale de la fotocopia tal cual. Es el drill 3 del
`04b` con otra ficha.

</details>

---

## Drill 3 — `respuesta3`

<details><summary>Pista 1 — conceptual</summary>

Aquí `ciudad` aparece dos veces: una escrita a mano y otra dentro de `...ana`. ¿Cuál se
escribe después?

</details>

<details><summary>Pista 2 — más concreta</summary>

Se lee de izquierda a derecha, y cada clave repetida pisa a la anterior. `...ana` va
después de `ciudad: "Talca"`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'Talca' to be 'Santiago'
```

</details>

<details><summary>Solución</summary>

`"Santiago"`. El spread está a la derecha, así que su `ciudad` pisa a `"Talca"`. Por eso
en los reducers el spread va **primero** y los cambios **después**.

</details>

---

## Drill 4 — `respuesta4`

<details><summary>Pista 1 — conceptual</summary>

`preferencias` se pisa con un objeto nuevo. ¿Qué claves tiene ese objeto nuevo?

</details>

<details><summary>Pista 2 — más concreta</summary>

El objeto nuevo solo tiene `tema`. Pisar no mezcla: sustituye entero. Y leer una clave que
no existe en JavaScript no da error.

</details>

<details><summary>Pista 3 — el dato duro</summary>

En JavaScript, leer una propiedad que no existe devuelve `undefined`. TypeScript lo
marcaría como error, porque a ese objeto le falta `idioma` para ser `Preferencias`.

</details>

<details><summary>Solución</summary>

`undefined`. El sobre viejo con `tema` e `idioma` se tira, y se mete uno nuevo que solo
tiene `tema`. Nadie copió el idioma: para eso hace falta el segundo spread
(`...ana.preferencias`), que es la Teoría 2.

</details>

---

## Drill 5 — `respuesta5`

<details><summary>Pista 1 — conceptual</summary>

`===` entre objetos no pregunta "¿se parecen?". ¿Qué pregunta?

</details>

<details><summary>Pista 2 — más concreta</summary>

Las llaves `{ }` siempre crean un objeto nuevo, aunque dentro vaya exactamente lo mismo.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected true to be false
```

</details>

<details><summary>Solución</summary>

`false`. Es una fotocopia, no la ficha original: mismo contenido, otro papel. Por eso en un
reducer "no pasó nada" se dice con `return estado` y no con `{ ...estado }`.

</details>

---

## Drill 6 — `mudarse`

<details><summary>Pista 1 — conceptual</summary>

El starter pisa una clave. ¿Es la que dice el nombre de la función?

</details>

<details><summary>Pista 2 — más concreta</summary>

La ciudad nueva va en la clave `ciudad`. Como el parámetro se llama igual, vale la forma
abreviada.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { nombre: 'Talca', …(2) } to deeply equal { Object (nombre, ciudad, ...) }
```

La ciudad nueva acabó en `nombre`.

</details>

<details><summary>Solución</summary>

```ts
return { ...perfil, ciudad };
```

</details>

---

## Drill 7 — `renombrarYMudar`

<details><summary>Pista 1 — conceptual</summary>

Las dos claves se pisan, pero ¿con qué valor cada una?

</details>

<details><summary>Pista 2 — más concreta</summary>

Los valores están cruzados. Cada clave va con el parámetro que se llama como ella.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'Talca' to be 'Bea'
```

</details>

<details><summary>Solución</summary>

```ts
return { ...perfil, nombre, ciudad };
```

Detrás de un spread se pueden pisar todas las claves que quieras: cada una en su sitio.

</details>

---

## Drill 8 — `cambiarTema`

<details><summary>Pista 1 — conceptual</summary>

Es el drill 4 hecho código. ¿Qué pierde el sobre nuevo?

</details>

<details><summary>Pista 2 — más concreta</summary>

Dentro del objeto de `preferencias` falta copiar el sobre viejo antes de pisar `tema`. El
spread de dentro va con `perfil.preferencias`.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2741: Property 'idioma' is missing in type '{ tema: Tema; }' but required in type 'Preferencias'.
```

TypeScript te avisa de lo mismo que predijiste en el drill 4: a ese sobre le falta el idioma.

</details>

<details><summary>Solución</summary>

```ts
return { ...perfil, preferencias: { ...perfil.preferencias, tema } };
```

Carpeta nueva (`...perfil`), sobre nuevo (`...perfil.preferencias`) y la hoja que cambia
(`tema`).

</details>

---

## Drill 9 — `restablecer`

<details><summary>Pista 1 — conceptual</summary>

Aquí no quieres conservar nada de las preferencias viejas. ¿Necesitas el spread de dentro?

</details>

<details><summary>Pista 2 — más concreta</summary>

Pisa `preferencias` con el objeto de fábrica, entero. El starter copia las viejas y no
cambia nada.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { Object (nombre, ciudad, ...) } to deeply equal { Object (nombre, ciudad, ...) }
```

Debajo, el diff del test muestra que las preferencias siguen en `"oscuro"` y `"en"`.

</details>

<details><summary>Solución</summary>

```ts
return { ...perfil, preferencias: deFabrica };
```

Es el drill 4, pero a propósito: cuando quieres sustituir el objeto entero, pisarlo sin
copiar es justo lo correcto. El spread de dentro solo va cuando conservas algo.

</details>

---

## Drill 10 — `TarjetaPerfil`

<details><summary>Pista 1 — conceptual</summary>

`tema` existe, pero ¿en qué nivel de la ficha vive?

</details>

<details><summary>Pista 2 — más concreta</summary>

El starter pone `tema` en la carpeta, fuera del sobre. Tiene que ir dentro de
`preferencias`, con su propio spread, como en el drill 8.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2353: Object literal may only specify known properties, and 'tema' does not exist in type 'SetStateAction<Perfil>'.
```

"`Perfil` no tiene ninguna clave `tema`": la tiene `Preferencias`, un nivel más adentro.

</details>

<details><summary>Solución</summary>

```tsx
onClick={() =>
  setPerfil({ ...perfil, preferencias: { ...perfil.preferencias, tema: "oscuro" } })
}
```

O, directamente, `setPerfil(cambiarTema(perfil, "oscuro"))`, reutilizando el drill 8.

</details>
