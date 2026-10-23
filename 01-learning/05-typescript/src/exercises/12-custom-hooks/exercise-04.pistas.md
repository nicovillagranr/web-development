# Pistas — exercise-04 · `.current` y `focus()`, viéndolos correr

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Dos starters no compilan (1 y 2): su Pista 3 cita al compilador. En el 4 y el 5 habla el
lint, y su Pista 3 lo cita a él. En los demás, el typecheck calla, y la Pista 3 dice por qué
y trae el dato duro.

---

## Drill 1 — `EmpezarContacto`

<details><summary>Pista 1 — conceptual</summary>

Vuelve al casillero de la Teoría 1. El `focus()`, ¿se lo estás pidiendo al casillero o a lo
que guarda dentro?

</details>

<details><summary>Pista 2 — más concreta</summary>

`nombreRef` es la caja que te da `useRef`, y el `<input>` vive dentro, en su única propiedad.
Ábrela antes de llamar a `focus()`, y protégete del caso en que esté vacía.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2339: Property 'focus' does not exist on type 'RefObject<HTMLInputElement | null>'.
```

`RefObject` es la caja. Tiene una sola propiedad, y no se llama `focus`. En el navegador, el
mismo fallo sale como `TypeError: nombreRef.focus is not a function`.

</details>

<details><summary>Solución</summary>

```tsx
<button type="button" onClick={() => nombreRef.current?.focus()}>
  Empezar
</button>
```

`nombreRef` es el casillero, y el `<input>` está en `nombreRef.current`. El `?.` cubre el
caso en que la caja esté vacía: si es `null`, no hace nada en vez de lanzar un error.

</details>

---

## Drill 2 — `EscribirMensaje`

<details><summary>Pista 1 — conceptual</summary>

Esta vez abres bien la caja. Lo que te pregunta TypeScript es otra cosa: ¿y si la abres y no
hay nada dentro?

</details>

<details><summary>Pista 2 — más concreta</summary>

El tipo de `.current` es `HTMLTextAreaElement | null`. TypeScript no sabe cuándo vas a
pulsar el botón: solo sabe que la caja empieza vacía. Te pide contemplar el `null`, con una
guardia o con el encadenamiento opcional (la Teoría 2 del 03).

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS18047: 'mensajeRef.current' is possibly 'null'.
```

El test pasa: en el navegador, cuando pulsas, el `<textarea>` ya está. Por eso aquí la señal
solo la da el typecheck.

</details>

<details><summary>Solución</summary>

```tsx
<button type="button" onClick={() => mensajeRef.current?.focus()}>
  Escribir mensaje
</button>
```

TypeScript razona con el tipo, no con el momento en que pulsas. La caja vale `null` antes de
que React pinte el `<textarea>`, y vuelve a `null` si un día deja de estar en la página. Hoy
siempre está, pero basta con que alguien lo meta en un `&&` para que `.current.focus()`
reviente, como en el drill 4 del 03.

</details>

---

## Drill 3 — `CorregirCorreo`

<details><summary>Pista 1 — conceptual</summary>

El nombre de la variable no decide nada. ¿Qué decide a qué elemento apunta un ref?

</details>

<details><summary>Pista 2 — más concreta</summary>

React mete en la caja el elemento que lleva el `ref={…}`. Mira en qué `<input>` está puesto.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El typecheck calla: los dos campos son `HTMLInputElement`, así que para TypeScript
cualquiera de los dos cabe en la caja. El test dice dónde acaba el cursor:

```
Expected element with focus:
  <input aria-label="Correo" value="nico@correo" />
Received element with focus:
  <input aria-label="Nombre" value="Nicolás" />
```

</details>

<details><summary>Solución</summary>

```tsx
<input aria-label="Nombre" defaultValue="Nicolás" />
<input ref={correoRef} aria-label="Correo" defaultValue="nico@correo" />
```

Un ref apunta al elemento donde lo enganchas, no al que dice su nombre. `correoRef` estaba
puesto en Nombre, así que la caja guardaba el campo Nombre.

</details>

---

## Drill 4 — `MeGusta`

<details><summary>Pista 1 — conceptual</summary>

Descomenta la traza del manejador: la cuenta sí sube. Entonces, ¿por qué la pantalla no se
entera?

</details>

<details><summary>Pista 2 — más concreta</summary>

Cambiar `.current` no pide un render, y el número que ves es el del último render. Para que
React repinte cuando cambia un valor, ese valor tiene que ser estado.

</details>

<details><summary>Pista 3 — lo que dice el lint</summary>

`pnpm lint` lo marca en `{likesRef.current}`:

```
error  Error: Cannot access refs during render
Accessing a ref value (the `current` property) during render can cause your component
not to update as expected
```

El typecheck calla: es un número dentro de una caja de números, todo en regla.

</details>

<details><summary>Solución</summary>

```tsx
export function MeGusta() {
  const [likes, setLikes] = useState(0);

  return (
    <button type="button" onClick={() => setLikes(likes + 1)}>
      {likes} me gusta
    </button>
  );
}
```

El setter guarda el número nuevo y pide un render, así que el botón se repinta con él. Con
el ref, la cuenta subía en silencio. Al pulsar "Repintar el padre", el número saltaba de
golpe porque ese render volvía a leer la caja. La pantalla dependía de que otro repintara
por ti, y eso es lo que avisa el lint.

</details>

---

## Drill 5 — `FormularioQueNaceEnfocado`

<details><summary>Pista 1 — conceptual</summary>

¿En qué momento corre una línea suelta en el cuerpo de la función? ¿Y qué hay en la caja en
ese momento, la primera vez?

</details>

<details><summary>Pista 2 — más concreta</summary>

En el render del montaje, `.current` es `null`: el campo todavía es un plano. Y esa línea
vuelve a correr en cada re-render, es decir, con cada tecla en un campo controlado. Necesitas
que corra una vez, después de pintar: un efecto con la lista adecuada.

</details>

<details><summary>Pista 3 — lo que dice el lint</summary>

`pnpm lint` lo marca en `nombreRef.current?.focus()`:

```
error  Error: Cannot access refs during render
Refs should only be accessed outside of render, such as in event handlers or effects.
```

El dato duro: en el montaje la línea corre y no hace nada. Al escribir en Correo vuelve a
correr, y esta vez la caja está llena: te arrastra a Nombre.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  nombreRef.current?.focus();
}, []);
```

El efecto corre después de pintar, así que la caja ya tiene el campo. Y con `[]` corre solo
en el montaje. Sin la lista correría después de cada render y te robaría el cursor con cada
tecla, igual que el starter.

</details>

---

## Drill 6 — `NotaRapida`

<details><summary>Pista 1 — conceptual</summary>

Descomenta las dos trazas y pulsa "Añadir nota". ¿Qué sale primero, el manejador o el render
con `abierta = true`? ¿Y qué valía la caja en el manejador?

</details>

<details><summary>Pista 2 — más concreta</summary>

El setter pide el render para cuando termine el manejador. Cuando corre el `focus()`, el
`<textarea>` todavía no existe y `.current` es `null`. Lo que aparece con un render se enfoca
en un efecto que corra cuando `abierta` cambie.

</details>

<details><summary>Pista 3 — el dato duro</summary>

La traza del manejador imprime `null`. El typecheck calla: con el `?.`, el `null` no rompe
nada, solo hace que no pase nada. El test lo ve así:

```
Expected element with focus:
  <textarea aria-label="Nota" />
Received element with focus:
  <button type="button">Añadir nota</button>
```

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  if (abierta) notaRef.current?.focus();
}, [abierta]);

// y en el botón: onClick={() => setAbierta(true)}
```

El efecto corre después del render que pinta el `<textarea>`, así que la caja ya lo tiene. Sin
el `if` también funcionaría: con la nota cerrada la caja está vacía y el `?.` no hace nada. Con
el `if` dices lo que quieres decir, como en tu 17.

</details>

---

## Drill 7 — `FiltrosConVuelta`

<details><summary>Pista 1 — conceptual</summary>

Cuando pulsas "Aplicar", ¿"Filtrar proyectos" ya está en la página? Compáralo con el
`<textarea>` del 6 en el momento del clic.

</details>

<details><summary>Pista 2 — más concreta</summary>

"Filtrar proyectos" no se va nunca: está antes, durante y después del panel. Así que el
manejador de "Aplicar" puede enfocarlo en el acto, en la línea siguiente al setter. Lo que el
setter hace desaparecer es "Aplicar", no "Filtrar proyectos".

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El typecheck calla. El test:

```
Expected element with focus:
  <button type="button">Filtrar proyectos</button>
Received element with focus:
  <body>
```

"Aplicar" tenía el foco y desapareció con el panel. Cuando el elemento con foco se va de la
página, el foco cae al `<body>`: se pierde.

</details>

<details><summary>Solución</summary>

```tsx
<button
  type="button"
  onClick={() => {
    setAbierto(false);
    filtrarRef.current?.focus();
  }}
>
  Aplicar
</button>
```

El timbre abre una puerta que ya existe. En el 6, la puerta (el `<textarea>`) llegaba con la
obra siguiente, y el `focus()` del manejador encontraba la caja vacía. Aquí "Filtrar proyectos"
está en la caja desde el montaje.

</details>

---

## Drill 8 — `MenuQueRobaAlNacer`

<details><summary>Pista 1 — conceptual</summary>

Descomenta la traza y monta el menú en el banco. ¿Corre el efecto al nacer, sin que nadie haya
pulsado nada? ¿Con qué `abierto`? ¿Y con qué `abierto` corre cuando pulsas "Cerrar menú"?

</details>

<details><summary>Pista 2 — más concreta</summary>

Al nacer y al cerrar, el efecto ve lo mismo: `abierto = false`. Con esa foto, ningún `if` de
dentro del efecto puede separar los dos momentos. El único código que corre SOLO cuando alguien
cierra el menú es el manejador de "Cerrar menú". Y "Abrir menú" ya está en la página (tu 7).

</details>

<details><summary>Pista 3 — el dato duro</summary>

El typecheck calla. El test:

```
Expected element with focus:
  <input aria-label="Campo de fuera" />
Received element with focus:
  <button type="button">Abrir menú</button>
```

Y la traza, en `pnpm dev`, nada más montarse: `efecto · abierto = false`, dos veces.

</details>

<details><summary>Solución</summary>

```tsx
function cerrar() {
  setAbierto(false);
  abrirRef.current?.focus();
}

// sin el useEffect, y en el botón: onClick={cerrar}
```

El efecto corre al nacer con `abierto = false`, igual que después de cerrar, así que la vuelta
en el efecto también se dispara al nacer. El manejador solo corre cuando alguien pulsa "Cerrar
menú": al nacer no hay nadie pulsando, y no hay nada que robe el foco.

</details>

---

## Drill 9 — `MenuConBandera`

<details><summary>Pista 1 — conceptual</summary>

Descomenta la traza y monta el menú de las dos maneras. ¿Cuántas pasadas da el efecto al nacer
en `pnpm dev`, y cuántas en producción? ¿Qué lee la bandera en cada una?

</details>

<details><summary>Pista 2 — más concreta</summary>

La bandera no sabe qué es el montaje: se salta la primera pasada del efecto, y nada más. En
producción, al nacer solo hay una, y por eso parece que funciona. En `pnpm dev` hay dos, y la
segunda llega al `if (!abierto)`. No hay forma de afinar la bandera para que valga en los dos
sitios: lo que está mal es el sitio de la vuelta, el mismo que en el 8.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El typecheck calla. En producción el test pasa; en `pnpm dev`, no:

```
Expected element with focus:
  <input aria-label="Campo de fuera" />
Received element with focus:
  <button type="button">Abrir menú</button>
```

La traza, en `pnpm dev`, nada más montarse:

```
efecto · bandera = true · abierto = false
efecto · bandera = false · abierto = false
```

</details>

<details><summary>Solución</summary>

```tsx
function cerrar() {
  setAbierto(false);
  abrirRef.current?.focus();
}

// sin el useEffect ni la bandera, y en el botón: onClick={cerrar}
```

La bandera es la libreta del vigilante: "la primera ronda no cuenta". Funciona mientras al
nacer haya una sola ronda, y el ensayo de StrictMode le hace dar dos. Con la vuelta en el
manejador no hace falta saltarse nada, porque al nacer no hay nadie pulsando.

</details>

---

## Drill 10 — `ContactoQueNaceAbierto`

<details><summary>Pista 1 — conceptual</summary>

Monta el abierto "como en producción" en el banco, con la traza descomentada. ¿Cuántas pasadas
da el efecto al nacer? ¿Cuál de ellas se salta la bandera?

</details>

<details><summary>Pista 2 — más concreta</summary>

Naciendo abierto, la primera pasada del efecto es justo la que tenía que enfocar Nombre, y la
bandera se la salta. En `pnpm dev` funciona de casualidad, porque hay una segunda pasada que la
bandera deja pasar. Y el `if (abierto)` ya decide bien él solo: naciendo cerrado no hace nada,
dé las pasadas que dé.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El typecheck calla. Montado sin StrictMode y naciendo abierto:

```
Expected element with focus:
  <input aria-label="Nombre" />
Received element with focus:
  <body>
```

El campo está en la página, pero nadie lo enfocó.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  if (abierto) {
    nombreRef.current?.focus();
  }
}, [abierto]);

// sin la bandera
```

Aquí la ronda del nacimiento no molesta: es justo la que necesitas. El `if (abierto)` decide
por la foto, así que hace lo mismo en una pasada que en dos: nace abierto y enfoca, nace cerrado
y no hace nada. Y a la ida no le vale el manejador: naciendo abierto, nadie pulsa nada.

</details>

---

## Drill 11 — `ConfirmarEnvio`

<details><summary>Pista 1 — conceptual</summary>

Hay dos trabajos con el foco: la ida a "Confirmar" y la vuelta a "Enviar". Para cada uno,
pregúntate: cuando pasa, ¿el destino ya está en la página?

</details>

<details><summary>Pista 2 — más concreta</summary>

"Confirmar" llega con un render, así que la ida va en un efecto que mire `confirmando` (tu 6 y
tu 10). "Enviar" está siempre, así que la vuelta va en el manejador de "Volver a editar" (tu 7 y
tu 8). El starter las tiene en el sitio cambiado.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El typecheck calla. El test:

```
Expected element with focus:
  <input aria-label="Campo de fuera" />
Received element with focus:
  <button type="button">Enviar</button>
```

Si solo arreglas la ida, el test sigue rojo aquí mismo: la vuelta del efecto roba al nacer.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  if (confirmando) {
    confirmarRef.current?.focus();
  }
}, [confirmando]);

function volverAEditar() {
  setConfirmando(false);
  enviarRef.current?.focus();
}

// "Enviar": onClick={() => setConfirmando(true)} · "Volver a editar": onClick={volverAEditar}
```

La ida va al efecto porque "Confirmar" todavía no existe cuando corre el manejador de "Enviar".
La vuelta va al manejador porque "Enviar" ya existe, y porque así no se dispara al nacer.

</details>

---

## Drill 12 — `AvisoDescartable`

<details><summary>Pista 1 — conceptual</summary>

Descomenta la traza del efecto y monta el componente. ¿Corre el efecto al nacer? ¿Con qué
`visible`?

</details>

<details><summary>Pista 2 — más concreta</summary>

Al montarse, `visible` es `false` y el `if (!visible)` se cumple: el efecto no distingue "nací
cerrado" de "me acaban de cerrar". Quien sí sabe que lo acaban de cerrar es quien lo cierra. Y
en ese momento, ¿"Ver aviso" ya está en la página?

</details>

<details><summary>Pista 3 — el dato duro</summary>

Una bandera (`useRef(true)`) tampoco sirve: el test monta en StrictMode, y la segunda pasada
del efecto roba el foco igual (tu drill 9). El typecheck calla. El test:

```
Expected element with focus:
  <input aria-label="Campo de fuera" />
Received element with focus:
  <button type="button">Ver aviso</button>
```

</details>

<details><summary>Solución</summary>

```tsx
function descartar() {
  setVisible(false);
  verRef.current?.focus();
}

// sin el useEffect, y en el botón: onClick={descartar}
```

"Ver aviso" está siempre en la página, así que la vuelta cabe en el manejador: el timbre abre
una puerta que ya existe. Y como el manejador solo corre cuando alguien pulsa "Descartar", al
nacer no hay nada que robe el foco.

</details>

---

## Drill 13 — `BuscadorQueNaceAbierto`

<details><summary>Pista 1 — conceptual</summary>

Hay dos trabajos con el foco, la ida y la vuelta, y un tercero: no robarlo al nacer. Busca en
la escalera (del 7 al 11) cuál de los tres se parece a cada uno, y luego mira dónde los tiene
puestos el starter.

</details>

<details><summary>Pista 2 — más concreta</summary>

El campo aparece con un render, así que el manejador de "Abrir buscador" llega tarde (tu
drill 6). "Abrir buscador" está siempre en la página, así que la vuelta cabe en el manejador
de "Cerrar buscador" (tu drill 7). Y la bandera ya la conoces del 9 y el 10.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

Montado sin StrictMode y naciendo abierto:

```
Expected element with focus:
  <input
  aria-label="Ciudad"
/>
Received element with focus:
  <body>
```

El campo está en la página, pero nadie lo enfocó.

</details>

<details><summary>Solución</summary>

```tsx
export function BuscadorQueNaceAbierto({ abiertoAlInicio }: { abiertoAlInicio: boolean }) {
  const [abierto, setAbierto] = useState(abiertoAlInicio);
  const abrirRef = useRef<HTMLButtonElement>(null);
  const campoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (abierto) {
      campoRef.current?.focus();
    }
  }, [abierto]);

  function cerrar() {
    setAbierto(false);
    abrirRef.current?.focus();
  }

  // en el JSX: onClick={() => setAbierto(true)} en "Abrir buscador",
  // y onClick={cerrar} en "Cerrar buscador"
}
```

Es tu 17 con otras piezas. La ida va en un efecto porque el campo llega con un render. La
vuelta va en el manejador porque "Abrir buscador" ya está en la página. Y sin bandera,
porque el `if (abierto)` ya decide por la foto: nace abierto y enfoca, nace cerrado y no
hace nada, sean una o dos las pasadas.

</details>
