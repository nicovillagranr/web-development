# Pistas — exercise-13d · dónde se pone el freno

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente: si abres tres seguidas, te has leído la solución sin darte cuenta.

En este archivo `pnpm typecheck` no te va a ayudar: no hay ningún tipo mal puesto, así
que toda la señal está en `pnpm test:run`. La pista 3 de cada drill es lo que dice el
test cuando falla.

---

## Drill 1 — `BotonQueSeApaga`

<details><summary>Pista 1 — conceptual</summary>

El componente ya sabe en qué momento está: lo pinta en pantalla. Lo que no hace es
**usar** ese dato para nada más.

El botón y el `<p>` miran el mismo estado. Uno se entera y el otro no.

</details>

<details><summary>Pista 2 — más concreta</summary>

Un `<button>` tiene un atributo propio para quedarse apagado, y admite una expresión que
se recalcula en cada render.

La pregunta que tiene que contestar esa expresión es "¿hay un envío en marcha **ahora
mismo**?" — no "¿ha pasado algo alguna vez?".

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test falla así:

```
expect(element).toBeDisabled()
```

Está mirando el botón justo después del clic, con el envío todavía en marcha, y se lo
encuentra pulsable.

Ojo al segundo test del drill, que ahora mismo está en verde: comprueba que al terminar
el botón **vuelve** a poder pulsarse. Si lo apagas para siempre, apagas ese verde.

</details>

<details><summary>Solución</summary>

```tsx
<button type="button" onClick={enviar} disabled={estado === "enviando"}>
  Enviar
</button>
```

`disabled` recibe un booleano, y como es una expresión se vuelve a calcular en cada
render: al pasar a `"enviando"` da `true` y el botón se apaga; al volver a `"enviado"` da
`false` y se enciende solo. No hace falta acordarse de encenderlo.

</details>

---

## Drill 2 — `DosBotonesUnEnvio`

<details><summary>Pista 1 — conceptual</summary>

Los dos botones llaman a la misma función y mandan el mismo pedido. Desde fuera son la
misma puerta pintada dos veces.

Entonces, ¿por qué solo uno está enterado de que hay un envío en marcha?

</details>

<details><summary>Pista 2 — más concreta</summary>

No hay nada que inventar: lo que le falta al segundo botón es exactamente lo que el
primero ya tiene.

Hazlo, corre el test, y quédate mirando las dos líneas resultantes un segundo antes de
pasar al drill 3. Ese es el drill de verdad.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test falla en la segunda comprobación, la del botón de abajo:

```
expect(element).toBeDisabled()
```

La de arriba pasa. La regla está bien escrita — está escrita en un solo sitio de los dos.

</details>

<details><summary>Solución</summary>

```tsx
<button type="button" onClick={enviar} disabled={estado === "enviando"}>
  Enviar
</button>
<button type="button" onClick={enviar} disabled={estado === "enviando"}>
  Enviar ahora
</button>
```

Funciona, y fíjate en lo que te ha costado: la condición está escrita dos veces. Si mañana
cambia (por ejemplo, tampoco se puede enviar sin texto), hay que acordarse de los dos
sitios. Añade un tercer botón y serán tres. De ahí sale el drill 3.

</details>

---

## Drill 3 — `puedeEnviar`

<details><summary>Pista 1 — conceptual</summary>

La función contesta "¿se puede mandar?", y el starter contesta otra cosa: "¿esto está
recién abierto?".

Son la misma respuesta en dos de los tres momentos y distinta en el tercero. Recorre los
tres y busca dónde se separan.

</details>

<details><summary>Pista 2 — más concreta</summary>

El starter está escrito **en positivo sobre un solo momento**: solo da permiso al estado
inicial. Eso deja fuera a quien ya mandó un pedido y quiere mandar otro.

Solo hay un momento en el que la respuesta es que no. Pregunta por ése.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test falla en la tercera línea:

```
AssertionError: expected false to be true
expect(puedeEnviar("enviado")).toBe(true);
```

`"enviado"` es el pedido que ya llegó. Ahí no hay nada en marcha que proteger.

</details>

<details><summary>Solución</summary>

```ts
export function puedeEnviar(estado: EstadoEnvio): boolean {
  return estado !== "enviando";
}
```

Dicho en voz alta: *"se puede enviar siempre que no haya un envío en marcha"*. Una sola
comparación, en negativo, sobre el único momento que importa.

A partir de aquí la regla vive en un sitio. Los botones dejan de saber la regla y pasan a
**preguntarla**: `disabled={!puedeEnviar(estado)}`.

</details>

---

## Drill 4 — `DosBotonesMismaAccion`

<details><summary>Pista 1 — conceptual</summary>

Lee los dos `onClick` seguidos, línea por línea. Son casi iguales — y ese "casi" es todo
el drill.

Uno de los dos deja el pedido en un momento del que ya no sale nunca.

</details>

<details><summary>Pista 2 — más concreta</summary>

No arregles la copia mala. Si lo haces, el test se pone verde y mañana vuelven a
separarse.

Lo que había en el drill 1 y no hay aquí es **un nombre**: una función declarada una vez
en el cuerpo del componente, que los dos botones puedan llamar.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test no falla con una comparación, falla por quedarse esperando:

```
Error: Test timed out in 5000ms.
```

Está esperando a que aparezca el texto `Enviado` después de usar el botón de abajo. No
aparece nunca: ese botón arranca el envío y no lo termina, así que el pedido se queda en
`"enviando"` para siempre.

</details>

<details><summary>Solución</summary>

```tsx
const enviar = async () => {
  setEstado("enviando");
  await mandarAlServidor();
  setEstado("enviado");
};

// …
<button type="button" onClick={enviar}>Enviar</button>
<button type="button" onClick={enviar}>Enviar ahora</button>
```

Ahora no hay dos versiones que puedan desincronizarse: hay **una acción** y dos botones
que la piden. Es imposible que uno se olvide de un paso, porque ninguno de los dos tiene
pasos propios.

</details>

---

## Drill 5 — `FormularioConEnter`

<details><summary>Pista 1 — conceptual</summary>

Cuenta las puertas. Hay un botón… y hay otra cosa que también manda el pedido, sin tocar
el botón: por eso el componente se llama así.

Y esa segunda puerta no tiene interruptor. No existe forma de "apagar" una tecla.

</details>

<details><summary>Pista 2 — más concreta</summary>

Las dos puertas terminan en el mismo sitio: las dos acaban ejecutando `enviar`.

Si el freno no puede estar en la puerta, ponlo donde las dos pasan. Ya tienes escrita la
pregunta que hay que hacer ahí — es el drill 3.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test falla así:

```
Unable to find an element with the text: Arrancados: 1
```

y en la pantalla que imprime debajo se lee `Arrancados: 2`. Es decir: con un envío ya en
marcha, un Enter arrancó otro. El botón estaba apagado, y dio igual.

Si el contador ya se queda en 1 y el test sigue fallando así:

```
AssertionError: viajes que le llegaron al servidor: expected 2 to be 1
```

has frenado el contador y no el envío: el número no sube, pero el segundo viaje sale igual.

</details>

<details><summary>Solución</summary>

```tsx
const enviar = async () => {
  if (!puedeEnviar(estado)) return;
  setArrancados((n) => n + 1);
  setEstado("enviando");
  await mandarAlServidor();
  setEstado("enviado");
};
```

El `disabled` del botón se queda donde está: sigue siendo útil, porque le dice al usuario
que ahora no toca. Pero quien **garantiza** que no hay dos envíos es la primera línea de
`enviar`, y esa cubre el botón, la tecla y lo que se añada mañana.

</details>

---

## Drill 6 — `SalidaSiempreEncendida`

<details><summary>Pista 1 — conceptual</summary>

Aquí no puedes usar el truco de los drills 1 y 2: el enunciado te prohíbe apagar el botón,
y no es un capricho del ejercicio — una salida de emergencia apagada no es una salida de
emergencia.

Así que la pregunta ya no es *cuándo* frenar, sino **dónde cabe el freno** cuando la
puerta tiene que quedarse abierta.

</details>

<details><summary>Pista 2 — más concreta</summary>

El botón llama a `cancelar`, y `cancelar` hoy no se pregunta nada: hace su trabajo en
cuanto la llaman.

Es el mismo movimiento del drill 5, con otra acción.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test falla así:

```
expect(element).not.toBeInTheDocument()
expected document not to contain element, found <p>
```

Ese `<p>` es el que dice `Pedido cancelado`. Apareció en mitad del envío, que es justo lo
que no podía pasar.

</details>

<details><summary>Solución</summary>

```tsx
const cancelar = () => {
  if (estado === "enviando") return;
  setCancelado(true);
};
```

Y el botón se queda tal cual, encendido:

```tsx
<button type="button" onClick={cancelar}>Cancelar pedido</button>
```

Esta es la frase que resume el archivo entero: **`disabled` avisa, la guarda protege.**
El atributo es información para el usuario —"esto ahora no"— y se puede quitar sin que el
programa corra peligro. La guarda es la que sostiene la regla, y si la quitas no queda
nada.

</details>
