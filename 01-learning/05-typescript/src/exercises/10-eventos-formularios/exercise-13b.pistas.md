# Pistas — exercise-13b · el mismo envío, mirado despacio

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente: si abres tres seguidas, te has leído la solución sin darte cuenta.

En este archivo `pnpm typecheck` no te va a ayudar: no hay ningún tipo mal puesto, así
que toda la señal está en `pnpm test:run`. La pista 3 de cada drill es lo que dice el
test cuando falla.

---

## Drill 1 — `bloqueaElBoton`

<details><summary>Pista 1 — conceptual</summary>

La pregunta que tiene que contestar esta función es **"¿hay un envío en marcha ahora
mismo?"**. El starter contesta otra distinta: "¿el formulario ha dejado de estar como al
principio?".

Son la misma respuesta en dos de los tres momentos, y distinta en el tercero. Recorre los
tres y busca en cuál se separan.

</details>

<details><summary>Pista 2 — más concreta</summary>

El starter está escrito por negación: bloquea **todo lo que no sea** el estado inicial.
Eso mete dentro del bloqueo un momento en el que el envío ya volvió.

Piensa en qué le pasa al usuario que acaba de mandar un comentario y quiere mandar otro.

Se arregla preguntando en positivo por un solo momento, no descartando otro.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test falla en la tercera línea, la del momento en que la respuesta ya volvió:

```
AssertionError: expected true to be false // Object.is equality
```

Tu función dice que en ese momento hay que bloquear. Las otras dos líneas pasan.

</details>

<details><summary>Solución</summary>

```ts
export function bloqueaElBoton(estado: EstadoEnvio): boolean {
  return estado === "submitting";
}
```

`estado !== "idle"` es cierto en `submitting` **y** en `success`, así que el botón se
quedaba apagado para siempre después del primer envío: el usuario no podía mandar un
segundo comentario nunca más.

Lo que hace de verdad esta función es **traducir un momento a una decisión**. Por eso vive
fuera del componente: se puede leer, probar y arreglar sin renderizar nada.

</details>

---

## Drill 2 — `puedeLimpiar`

<details><summary>Pista 1 — conceptual</summary>

Aquí hay dos condiciones que se tienen que cumplir a la vez: una habla del texto y la otra
del momento. El starter tiene las dos escritas, así que el fallo no es que falte una.

Mira solo la del momento, y pregúntate a cuántos de los tres momentos le está diciendo
que sí.

</details>

<details><summary>Pista 2 — más concreta</summary>

Momentos en los que **no** hay un envío en marcha hay dos, no uno: antes de pulsar y
después de que vuelva la respuesta. En los dos se puede limpiar tranquilamente.

Tu condición solo admite el primero. Está escrita como "el momento tiene que ser este",
cuando lo que quieres decir es "el momento tiene que no ser aquel".

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test falla en la línea del envío ya terminado, `puedeLimpiar("success", "hola")`:

```
AssertionError: expected false to be true // Object.is equality
```

Tu función dice que ahí no se puede limpiar. Las otras cuatro líneas pasan.

</details>

<details><summary>Solución</summary>

```ts
export function puedeLimpiar(estado: EstadoEnvio, comentario: string): boolean {
  return estado !== "submitting" && comentario !== "";
}
```

Con `estado === "idle"` el botón de limpiar dejaba de funcionar justo después de enviar,
que es cuando más sentido tiene: el usuario acaba de mandar algo y quiere el campo libre
para lo siguiente.

Fíjate en que la comparación es la misma que la del drill 1, dada la vuelta. **Esa es la
pregunta de este archivo entero:** el envío en marcha es lo único que hay que vigilar, y
todo lo demás se deduce de ahí.

</details>

---

## Drill 3 — `ContadorQueSigueVivo`

<details><summary>Pista 1 — conceptual</summary>

Ese recuento no cuenta clics, cuenta **envíos terminados**. Así que la línea que lo sube
solo puede correr en un momento: cuando el servidor ya contestó.

Busca en el manejador la frontera que separa el antes del después, y mira de qué lado cayó
tu línea.

</details>

<details><summary>Pista 2 — más concreta</summary>

Un manejador `async` con un `await` dentro se parte en dos mitades que corren en momentos
distintos:

- lo que está **encima** del `await` corre en el instante del clic;
- lo que está **debajo** corre cuando la promesa termina, doscientos milisegundos después.

Tu subida está encima. Tiene que estar debajo, junto a la línea que ya marca el final.

Lo del botón "+1" no lo toques: está ahí para que veas que la página no se ha quedado
congelada mientras esperabas.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
TestingLibraryElementError: Unable to find an element with the text: /Enviados:\s*0/
```

El test mira la pantalla en mitad del envío y no encuentra el recuento en cero, porque
para entonces ya vale uno.

</details>

<details><summary>Solución</summary>

```tsx
const alEnviar = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setEstado("submitting");
  await enviarAlServidor();
  setEnviados((n) => n + 1);
  setEstado("success");
};
```

Un solo movimiento de línea. Antes el recuento subía en el instante del clic, así que la
pantalla afirmaba un envío terminado mientras la petición seguía en el aire — y si esa
petición falla, el recuento se queda mintiendo para siempre.

Lo que el "+1" demuestra es la otra mitad del concepto: `await` deja en pausa **esta
función**, no la página. Los clics siguen entrando, los estados siguen cambiando y React
sigue repintando. Por eso hace falta bloquear a mano lo que no quieras que se toque
durante ese rato, que es de lo que van los dos drills siguientes.

</details>

---

## Drill 4 — `EnvioConBotonApagado`

<details><summary>Pista 1 — conceptual</summary>

El botón está apagándose, pero en el momento equivocado: pruébalo en el navegador y fíjate
en cuándo se apaga y cuándo no.

La decisión de en qué momento toca apagarlo no es de este componente. Ya está tomada en
otro sitio del archivo.

</details>

<details><summary>Pista 2 — más concreta</summary>

Tienes una función que contesta exactamente esta pregunta, y la escribiste en el drill 1.

`disabled` no necesita una comparación escrita ahí mismo: acepta cualquier expresión que
dé un booleano, y la llamada a una función lo es.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
expect(element).toBeDisabled()

Received element is not disabled:
  <button type="submit" />
```

El test pulsa enviar y mira el botón durante la espera: lo encuentra encendido.

</details>

<details><summary>Solución</summary>

```tsx
<button type="submit" disabled={bloqueaElBoton(estado)}>
  {estado === "submitting" ? "Enviando..." : "Enviar"}
</button>
```

El starter apagaba el botón en `success`, o sea justo al revés: lo dejaba pulsable durante
el envío, que es cuando molesta, y lo apagaba al terminar, que es cuando el usuario querría
mandar otro.

Lo importante no es el arreglo, es de dónde sale la condición. El componente no decide
cuándo bloquear: **pregunta**. La regla vive en una función pura que puedes leer de un
vistazo, y el componente se queda solo con el trabajo de pintar.

</details>

---

## Drill 5 — `LimpiarDesdeDosSitios`

<details><summary>Pista 1 — conceptual</summary>

Cuenta cuántas maneras tiene el usuario de llegar hasta `alLimpiar`. Son dos, y el
starter solo vigila una.

El `disabled` está puesto en el botón. Pregúntate qué pasa con el camino que no pasa por
el botón.

</details>

<details><summary>Pista 2 — más concreta</summary>

Un freno solo detiene lo que pasa por donde está puesto. Si tiene que valer para los dos
caminos, hay que ponerlo **donde los dos caminos se juntan**, y eso es una única línea del
archivo: la primera de `alLimpiar`.

La pregunta que ese freno tiene que hacer ya la escribiste en el drill 2. Te falta
decidir qué hacer cuando la respuesta es que no.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
expect(element).toHaveValue(hola)

Expected the element to have value:  hola
Received:
```

El test pulsa enviar y, mientras la respuesta no ha vuelto, teclea Escape dentro del
campo. El campo se le queda vacío.

</details>

<details><summary>Solución</summary>

```tsx
const alLimpiar = () => {
  if (!puedeLimpiar(estado, comentario)) return;
  setComentario("");
};
```

El `return` temprano corta el manejador antes de tocar nada. Da igual quién lo llame: el
clic, la tecla, o cualquier cosa que se añada mañana.

**Y aquí está la respuesta a lo que traías del `13`.** Los dos frenos existen, hacen cosas
distintas y no compiten:

| | Qué hace | Hasta dónde llega |
|---|---|---|
| `disabled` en el botón | le dice al usuario que ahora no toca | solo ese botón |
| la guardia en el manejador | protege la operación | todos los caminos hasta ella |

Por eso en el `13` te pedía la guardia y no el `disabled`: no porque el `disabled` esté
mal, sino porque **apagar el botón te habría escondido si la guardia estaba bien escrita o
no**. Aquí puedes dejar los dos puestos, y de hecho es lo que hace un formulario de
producción: el `disabled` para avisar, la guardia para que la regla se cumpla venga el
clic de donde venga.

</details>
