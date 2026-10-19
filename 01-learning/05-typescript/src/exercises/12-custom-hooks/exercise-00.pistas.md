# Pistas — exercise-00 · el ciclo de vida

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 9 starters compilan, así que ninguna Pista 3 cita al compilador: en las predicciones
es un dato duro que acota la respuesta, y en los drills 6 y 8, lo que dice el test.

---

## Drill 1 — cuántas veces pinta `Contador`

<details><summary>Pista 1 — conceptual</summary>

No cuentes clics: cuenta cuántas veces React LLAMA a la función `Contador`. Cada llamada
pasa por la línea del `registrar`.

</details>

<details><summary>Pista 2 — más concreta</summary>

De las tres cosas que provocan un render (Teoría 1), aquí aparecen dos: el montaje, y
un setter que recibe un valor nuevo en cada clic.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Es más que el número de clics.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta1: number = 3;
```

Uno al montarse y uno por cada clic: `setClics(clics + 1)` recibe un valor nuevo cada
vez, y eso le pide a React que vuelva a llamar a la función.

</details>

---

## Drill 2 — `MeGusta` con una variable

<details><summary>Pista 1 — conceptual</summary>

Para que el número del botón cambie en la página, React tiene que volver a llamar a
`MeGusta`. ¿Quién se lo pide?

</details>

<details><summary>Pista 2 — más concreta</summary>

`likes = likes + 1` cambia la variable, pero no es un setter: React no se entera. Y
aunque algo provocara un render, mira la primera línea de la función: ¿con qué valor
nace `likes` en cada llamada?

</details>

<details><summary>Pista 3 — el dato duro</summary>

Dentro del manejador, `likes` sí llega a valer 2. En la página, no.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta2: number = 0;
```

Cambiar una variable no pide un render, así que la página se queda como estaba. Y si
algo lo provocara, la función correría desde cero y `likes` volvería a nacer en 0. Por
eso lo que tiene que sobrevivir entre renders va en `useState`: React lo guarda fuera
de la función.

</details>

---

## Drill 3 — cuántas veces pinta `Info`

<details><summary>Pista 1 — conceptual</summary>

El clic cambia el estado de `Contacto`, no el de `Info`. Pero `Info` está dentro de
`Contacto`.

</details>

<details><summary>Pista 2 — más concreta</summary>

La tercera causa de un render (Teoría 1): que se renderice el padre. Para la segunda
pregunta, piensa en el plano: ¿el `<p>` que describe `Info` sale distinto la segunda
vez?

</details>

<details><summary>Pista 3 — el dato duro</summary>

`Info` no tiene estado ni props que cambien, y aun así se registra más de una vez.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta3: number = 2;
```

Una al montarse y otra cuando `Contacto` se renderiza por `setAbierto(true)`: renderizar
al padre renderiza a sus hijos. Pero lo que ves dentro de `Info` no cambia: describe el
mismo `<p>Santiago, Chile</p>`, React lo compara y no toca ese trozo de la página.
Renderizar es preguntar; cambiar la página es otra cosa.

</details>

---

## Drill 4 — el zoom al volver a abrir

<details><summary>Pista 1 — conceptual</summary>

Cerrar el mapa no lo esconde: lo quita de la página. ¿Qué le pasa al estado de algo que
deja de existir?

</details>

<details><summary>Pista 2 — más concreta</summary>

Al volver a abrirlo, el `&&` monta un `Mapa` NUEVO (Teoría 2). Su `useState(1)` usa el
valor inicial, porque para él es la primera vez.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Los dos clics no cuentan para nada en la respuesta.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta4: number = 1;
```

El primer `Mapa` llegó a zoom 3 y se desmontó al cerrarlo: su estado se fue con él. El
que aparece al volver a abrir es otro, y nace con `useState(1)`.

</details>

---

## Drill 5 — cuándo nace y cuándo pinta el mapa

<details><summary>Pista 1 — conceptual</summary>

Hay dos marcas distintas: "nace" solo puede salir cuando el componente se crea, y
"pinta" cada vez que React llama a la función.

</details>

<details><summary>Pista 2 — más concreta</summary>

La función que se le pasa a `useState` corre una sola vez, al montar (Teoría 2). Repasa
el recorrido en cuatro pasos: abrir (monta), clic (renderiza), cerrar (desmonta), abrir
(monta). ¿Cuál de esos pasos llama a la función `Mapa`?

</details>

<details><summary>Pista 3 — el dato duro</summary>

Son 5 registros, y "nace" sale dos veces.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta5: string[] = ["nace", "pinta", "pinta", "nace", "pinta"];
```

Abrir: nace y pinta. Clic: solo pinta, porque el estado ya existe. Cerrar: nada, porque
desmontar no llama a la función; React quita el componente sin preguntarle. Abrir otra
vez: un `Mapa` nuevo, que nace y pinta. Si quisieras hacer algo justo al desmontarse,
eso es la limpieza de un efecto: el 02.

</details>

---

## Drill 6 — `ContactoConMapa`

<details><summary>Pista 1 — conceptual</summary>

El estado vive lo que vive el componente que lo tiene. El mapa se monta y se desmonta;
¿hay alguien aquí que esté en la página todo el rato?

</details>

<details><summary>Pista 2 — más concreta</summary>

Sube el `zoom` al padre, que no se desmonta nunca, y pásaselo al mapa por props junto
con una función para acercar. Es el mismo reparto que tu `Contact` con `MapModal`:
el padre guarda `isMapOpen` y le pasa `onClose`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
TestingLibraryElementError: Unable to find an accessible element with the role "button" and name "Zoom 3"
```

Falla al final, al volver a abrir: el botón dice "Zoom 1". Y si escondes el mapa en vez
de desmontarlo (con `hidden` o con CSS), el fallo cambia:

```
Error: el mapa sigue en la página: expect(element).not.toBeInTheDocument()
```

</details>

<details><summary>Solución</summary>

```tsx
function MapaConZoom({ zoom, onAcercar }: { zoom: number; onAcercar: () => void }) {
  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <button type="button" onClick={onAcercar}>
        Zoom {zoom}
      </button>
    </div>
  );
}

export function ContactoConMapa() {
  const [abierto, setAbierto] = useState(false);
  const [zoom, setZoom] = useState(1);

  return (
    <section>
      <button type="button" onClick={() => setAbierto(!abierto)}>
        {abierto ? "Cerrar mapa" : "Abrir mapa"}
      </button>
      {abierto && <MapaConZoom zoom={zoom} onAcercar={() => setZoom(zoom + 1)} />}
    </section>
  );
}
```

El mapa sigue montándose y desmontándose, pero ya no guarda nada: el `zoom` vive en
`ContactoConMapa`, que está en la página todo el rato. Al volver a abrir, el mapa nuevo
recibe el zoom por props.

</details>

---

## Drill 7 — lo escrito al abrir el mapa

<details><summary>Pista 1 — conceptual</summary>

Al pulsar "Abrir mapa", ¿qué aparece o desaparece de la página? ¿Está el formulario en
esa lista?

</details>

<details><summary>Pista 2 — más concreta</summary>

`Contacto` se renderiza, así que `Formulario` también (el drill 3). Pero renderizarse no
es desmontarse: sigue en el mismo sitio, y React reutiliza el mismo componente
(Teoría 3).

</details>

<details><summary>Pista 3 — el dato duro</summary>

Lo único que se monta al pulsar es el `<p>Mapa</p>`. Nada se desmonta.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta7: Escrito = "se conserva";
```

`Formulario` se actualiza, no se desmonta: React vuelve a llamar a la función, pero el
`useState("")` ya no usa su valor inicial, porque ese componente ya existe y su estado
también. Es lo que pasa en tu `Contact`: abrir el mapa no te borra el mensaje a medio
escribir.

</details>

---

## Drill 8 — `TarjetaProyecto`

<details><summary>Pista 1 — conceptual</summary>

La tarjeta no se desmonta cuando cambia el título: se actualiza. ¿Qué hace `useState`
con su valor inicial en una actualización?

</details>

<details><summary>Pista 2 — más concreta</summary>

Es la trampa de la Teoría 3. El texto ya se puede calcular con lo que llega por props en
cada render: no hace falta guardarlo en ningún sitio.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
TestingLibraryElementError: Unable to find an accessible element with the role "heading" and name "Proyecto: Smart Cooler"
```

El primer título sale bien; el fallo es después del `rerender`. Ojo: si copias la prop al
estado desde un efecto, el test pasa, pero `pnpm lint` lo marca:

```
Error: Calling setState synchronously within an effect can trigger cascading renders
```

</details>

<details><summary>Solución</summary>

```tsx
export function TarjetaProyecto({ titulo }: { titulo: string }) {
  return <h3>Proyecto: {titulo}</h3>;
}
```

Lo que se puede calcular con las props no va en el estado. Como la función corre en cada
render, el `<h3>` lee el `titulo` que llega en ese momento. El estado sirve para lo que
el componente tiene que recordar por su cuenta, como el zoom del 6.

</details>

---

## Drill 9 — el efecto de tu `PortfolioItem`

<details><summary>Pista 1 — conceptual</summary>

Cuenta las veces que corre el efecto antes de mirar qué hace dentro. El array es
`[showDemoMessage]`: ¿cuántas veces cambia ese valor, montaje incluido?

</details>

<details><summary>Pista 2 — más concreta</summary>

El efecto corre al montar y cada vez que `showDemoMessage` cambia: al pulsar y a los 3
segundos. El primer `registrar` sale SIEMPRE, porque está antes del `if`. Lo que viene
después del `return;` solo corre si `showDemoMessage` es `true`.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Son 5 registros: el efecto corre 3 veces, pero solo una de ellas programa algo.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta9: string[] = [
  "efecto con false",
  "efecto con true",
  "programa",
  "limpieza",
  "efecto con false",
];
```

Montar: el efecto corre con `false` y sale por el `return;` sin programar nada (y sin
limpieza que guardar). Pulsar: actualización con `true`, así que programa. A los 3
segundos, el temporizador pone `false`: otra actualización, la limpieza del efecto
anterior corre primero y el efecto nuevo vuelve a correr con `false`, y sale por el
`return;` otra vez. El efecto sí se repite; lo que no se repite es el temporizador.

</details>
