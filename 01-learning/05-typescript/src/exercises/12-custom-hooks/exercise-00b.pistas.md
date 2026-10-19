# Pistas — exercise-00b · la identidad

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 9 starters compilan, así que ninguna Pista 3 cita al compilador: en las predicciones
es un dato duro que acota la respuesta, y en los drills 6 y 9, lo que dice el test.

---

## Drill 1 — el ternario con dos `Campo`

<details><summary>Pista 1 — conceptual</summary>

No mires las etiquetas: mira qué hay en el sitio del ternario antes y después de pulsar.
¿Qué TIPO de componente es, en las dos ramas?

</details>

<details><summary>Pista 2 — más concreta</summary>

Las dos ramas pintan un `Campo`, y el ternario ocupa un solo sitio. Mismo tipo en el
mismo sitio: para React es el mismo `Campo`, que solo recibe una `etiqueta` nueva.

</details>

<details><summary>Pista 3 — el dato duro</summary>

La etiqueta sí cambia a "Empresa". Lo que preguntas es qué pasa con el estado.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta1: Queda = "se conserva";
```

React no sabe que escribiste dos `<Campo />` distintos en el código: en el sitio del
ternario ve un `Campo` antes y un `Campo` después. Lo actualiza con la prop nueva y su
`texto` se queda. Es un fallo real de formularios: el usuario cambia de "persona" a
"empresa" y el nombre se le queda puesto en el campo de la razón social.

</details>

---

## Drill 2 — el ternario partido en dos `&&`

<details><summary>Pista 1 — conceptual</summary>

Cuenta los sitios de `<section>`, como en la SINTAXIS de la Teoría 1. ¿En cuál está el
`Campo` antes de pulsar, y en cuál después?

</details>

<details><summary>Pista 2 — más concreta</summary>

Cada `&&` ocupa su propio sitio aunque dé `false`. Antes, el `Campo` está en el sitio 3
y el 2 está vacío; después, al revés.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Es lo contrario que en el 1, con el mismo `Campo` y las mismas etiquetas.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta2: Queda = "se borra";
```

En el sitio 3 había un `Campo` y ahora no hay nada: se desmonta y su estado se va con
él. En el sitio 2 no había nada y ahora hay un `Campo`: se monta uno nuevo, con `""`.
El tipo es el mismo, pero el sitio no. Por eso la identidad son las dos cosas juntas.

</details>

---

## Drill 3 — `Campo` definido dentro de `Formulario`

<details><summary>Pista 1 — conceptual</summary>

Cada render es una llamada nueva a `Formulario`, desde cero (Teoría 1 del 00). ¿Qué le
pasa a la función `Campo`, que está escrita dentro?

</details>

<details><summary>Pista 2 — más concreta</summary>

En cada render nace una función `Campo` NUEVA. Para React, una función distinta es un
tipo distinto: en el mismo sitio, tipo nuevo → desmonta el `<input>` viejo y monta
otro. Y un `<input>` recién montado no tiene el foco.

</details>

<details><summary>Pista 3 — el dato duro</summary>

La primera tecla sí llega. El texto vive en el padre, así que lo que entra no se borra.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta3: string = "H";
```

La "H" llama a `setTexto`, el padre se renderiza y crea otro `Campo`. React ve un tipo
nuevo en el sitio, quita el `<input>` (y con él el foco) y pone otro. El texto vive en
el padre, así que la "H" se queda, pero "ola" se teclea sobre nada. El arreglo es
sacar `Campo` fuera de `Formulario`. El lint del cuaderno lo caza solo:

```
Error: Cannot create components during render
Components created during render will reset their state each time they are created.
```

</details>

---

## Drill 4 — "Volver a montar"

<details><summary>Pista 1 — conceptual</summary>

`MeGusta` sigue en el mismo sitio y es del mismo tipo. ¿Qué otra cosa cambia al pulsar
"Volver a montar"?

</details>

<details><summary>Pista 2 — más concreta</summary>

`setVez(vez + 1)` cambia la `key` de `MeGusta`. Mismo tipo, mismo sitio, key distinta:
es otro componente.

</details>

<details><summary>Pista 3 — el dato duro</summary>

No depende de cuántas veces pulsaste "Me gusta".

</details>

<details><summary>Solución</summary>

```ts
export const respuesta4: number = 0;
```

Al cambiar la key, React desmonta el `MeGusta` que llevaba 2 y monta otro, con
`useState(0)` desde cero. Es lo que hace la tarjeta del drill 15 del 02 en el banco: el
botón no "reinicia" nada, cambia la identidad del componente.

</details>

---

## Drill 5 — el índice como key

<details><summary>Pista 1 — conceptual</summary>

Con `key={i}`, React reconoce cada tarjeta por su posición en la lista, no por su
proyecto. ¿Qué posición tenía Projex, y quién la ocupa al quitarlo?

</details>

<details><summary>Pista 2 — más concreta</summary>

Antes: key 0 = Projex (con el aviso), key 1 = Smart Cooler, key 2 = Store Pulse.
Después: key 0 = Smart Cooler, key 1 = Store Pulse. La key 2 desaparece.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El aviso no desaparece: el `PortfolioItem` que lo tenía sigue montado.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta5: DondeAviso = "Smart Cooler";
```

El `PortfolioItem` con key 0 sigue existiendo, con `showDemoMessage` en `true`: solo le
llega otro `titulo`. React desmonta el de key 2, que era el de Store Pulse. El estado se
queda en el sitio, no con el proyecto: la maleta en la habitación.

</details>

---

## Drill 6 — `PortfolioConQuitar`

<details><summary>Pista 1 — conceptual</summary>

El fallo es el del 5. ¿Qué dato de cada proyecto no cambia aunque cambie su posición?

</details>

<details><summary>Pista 2 — más concreta</summary>

Cada proyecto trae un `id`. Si la key es el `id`, cada `PortfolioItem` va pegado a su
proyecto y no a su posición, como en tu `Portfolio.tsx`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: el aviso de Projex ha saltado a otra tarjeta: expect(element).not.toBeInTheDocument()
```

La segunda parte del test pulsa "Ver detalle" en Store Pulse y quita el primero: el
aviso tiene que seguir en la tarjeta de Store Pulse.

</details>

<details><summary>Solución</summary>

```tsx
{proyectos.map((proyecto) => (
  <PortfolioItem key={proyecto.id} titulo={proyecto.titulo} />
))}
```

Al quitar Projex desaparece la key 1, así que React desmonta SU `PortfolioItem`, con su
aviso y (por la limpieza) su temporizador. Smart Cooler y Store Pulse conservan sus keys
y no se enteran. El índice solo vale de key si la lista nunca cambia de orden ni de
tamaño.

</details>

---

## Drill 7 — `Sala` con key

<details><summary>Pista 1 — conceptual</summary>

Al cambiar la key hay dos salas: la norte se va y la sur llega. Mira el orden de la
DEFINICIÓN de la Teoría 3.

</details>

<details><summary>Pista 2 — más concreta</summary>

El montaje da dos registros. El cambio a "sur" da tres: uno de la sala nueva al pintar,
uno de la vieja al irse y otro de la nueva al entrar.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Son 5 registros, y "pinta norte" sale una sola vez.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta7: string[] = [
  "pinta norte",
  "conecta norte",
  "pinta sur",
  "desconecta norte",
  "conecta sur",
];
```

Primero React pinta la sala nueva ("pinta sur"); después corre la limpieza de la vieja
("desconecta norte") y al final el efecto de la nueva ("conecta sur"). La sala norte no
se vuelve a pintar: React ya no la llama.

</details>

---

## Drill 8 — `Sala` sin key, con contador

<details><summary>Pista 1 — conceptual</summary>

Sin key, ¿la sala sur es OTRA `Sala` o la misma con otra prop? Mira el tipo y el sitio.

</details>

<details><summary>Pista 2 — más concreta</summary>

Es la misma: solo se actualiza. El efecto se repite porque cambió algo de su lista
(`nombre`), pero eso no toca el estado.

</details>

<details><summary>Pista 3 — el dato duro</summary>

No es 0.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta8: number = 2;
```

Que el efecto se repita no significa que el componente sea nuevo: es la tabla del 00,
"actualizar → render · limpieza y efecto, solo si cambió algo de su lista". El estado
nace una vez, al montar, y sin key no hay montaje nuevo. Con la key del 7 mostraría 0.

</details>

---

## Drill 9 — `ProyectoDestacado`

<details><summary>Pista 1 — conceptual</summary>

`PortfolioItem` no se toca. ¿Cómo puede el padre conseguir que cada proyecto llegue con
una tarjeta recién montada?

</details>

<details><summary>Pista 2 — más concreta</summary>

Es lo que hace tu `Routes` con `key={location.pathname}`: una key que cambia cuando
cambia lo que se enseña. Cada proyecto trae un `id`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: el aviso de Projex ha pasado a Smart Cooler: expect(element).not.toBeInTheDocument()
```

Y después mira `vi.getTimerCount()`: el temporizador de Projex tiene que haberse
cancelado al irse su tarjeta.

</details>

<details><summary>Solución</summary>

```tsx
<PortfolioItem key={proyecto.id} titulo={proyecto.titulo} />
```

Al pulsar "Siguiente proyecto" cambia la key: React desmonta el `PortfolioItem` de
Projex, y su limpieza cancela el temporizador (el `clearTimeout`); después monta uno
nuevo para Smart Cooler, con `showDemoMessage` en `false`. Es el ciclo completo de la
Teoría 3 con tu propio código.

</details>
