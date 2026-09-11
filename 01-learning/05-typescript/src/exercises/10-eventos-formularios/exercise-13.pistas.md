# Pistas — exercise-13 · el estado del envío

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente: si abres tres seguidas, te has leído la solución sin darte cuenta.

Dos de los nueve drills pueden dejarte el test en verde con el fallo todavía dentro, así
que corre `pnpm typecheck` aunque `pnpm test:run` no se queje.

---

## Drill 1 — `textoDelBoton`

<details><summary>Pista 1 — conceptual</summary>

La función tiene dos cosas mal y una es la causa de la otra.

Piensa en qué le permite el tipo actual del parámetro: mientras acepte cualquier texto,
comparar `estado` con **cualquier** cadena es una comparación legítima para el
compilador, aunque esa cadena no vaya a llegar nunca. Nadie te va a avisar.

Estrecha primero la entrada. El segundo fallo se enciende solo cuando lo hagas.

</details>

<details><summary>Pista 2 — más concreta</summary>

El tipo que necesitas ya está escrito arriba del todo del archivo, con sus tres valores.
No hay que crearlo: hay que usarlo, en el sitio donde ahora pone `string`.

Cuando lo pongas, mira las tres comparaciones del cuerpo una por una y compáralas letra a
letra con los tres valores del tipo. Una de las tres no está en la lista.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Antes de tocar nada, `pnpm typecheck` te señala el archivo de test, no el ejercicio:

```
exercise-13.test.tsx(28,5): error TS2578: Unused '@ts-expect-error' directive.
```

Ese test espera que llamar a la función con un texto inventado NO compile. Como ahora sí
compila, la directiva sobra.

Y en cuanto anotes el parámetro, aparece el segundo:

```
error TS2367: This comparison appears to be unintentional because the types
'EstadoEnvio' and '"submiting"' have no overlap.
```

</details>

<details><summary>Solución</summary>

```ts
export function textoDelBoton(estado: EstadoEnvio): string {
  if (estado === "submitting") return "Enviando...";
  if (estado === "success") return "Enviado";
  return "Enviar mensaje";
}
```

Dos cambios: el tipo del parámetro y la `t` que le faltaba a `"submiting"`.

Y el orden importa más que los cambios. Con `estado: string` la errata es invisible:
comparar un texto cualquiera con `"submiting"` es legal, simplemente da `false` siempre y
el botón se queda en "Enviar mensaje" para siempre. Con `EstadoEnvio` el compilador sabe
que esa comparación **no puede ser cierta nunca**, y te lo dice en la línea exacta.

Eso es lo que compras al estrechar un tipo: los fallos dejan de ser silenciosos.

</details>

---

## Drill 2 — `PanelDeEstado`

<details><summary>Pista 1 — conceptual</summary>

Vuelve a la ⚠️ TRAMPA de la TEORÍA 1: un valor inicial no te regala el tipo estrecho.

`useState("idle")` guarda un texto, sí, pero React no tiene forma de adivinar que solo
quieres esos tres. Lo que infiere es lo más ancho que encaja con lo que le diste.

Con el tipo ancho dentro, uno de los tres botones guarda algo que no existe y nadie
protesta.

</details>

<details><summary>Pista 2 — más concreta</summary>

Al `useState` se le puede decir el tipo por delante, con la misma sintaxis que usaste en
el `12b` para `useState<Credenciales>({...})`: entre picos, antes del paréntesis.

Hecho eso, lee los tres `setEstado` del JSX y compáralos con los tres valores del tipo,
igual que hiciste con las comparaciones del drill 1.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test falla al pulsar "Enviar", pero el fallo no está ahí:

```
Unable to find an element with the text: Enviando...
```

Y `pnpm typecheck`, una vez el drill 1 está resuelto, apunta a la línea del `<p>`:

```
error TS2345: Argument of type 'string' is not assignable to parameter of type 'EstadoEnvio'.
```

Traducido: `textoDelBoton` ya solo acepta los tres estados, y lo que le estás pasando es
un texto cualquiera.

</details>

<details><summary>Solución</summary>

```tsx
export function PanelDeEstado() {
  const [estado, setEstado] = useState<EstadoEnvio>("idle");

  return (
    <div>
      <p>{textoDelBoton(estado)}</p>
      <button onClick={() => setEstado("submitting")}>Enviar</button>
      <button onClick={() => setEstado("success")}>Terminar</button>
      <button onClick={() => setEstado("idle")}>Reiniciar</button>
    </div>
  );
}
```

Los picos son lo único que hace falta añadir, y con ellos el `setEstado("sucess")` del
botón "Terminar" deja de compilar.

Este es el bug **real** que tiene el formulario de contacto de Projex ahora mismo: el
estado del envío está sin anotar, así que una errata en el `set` compila, se guarda, y el
mensaje de éxito no aparece nunca. No lo caza ningún test porque no hay nada roto que
ejecutar — solo un texto que no coincide con ninguna de las comparaciones de abajo.

</details>

---

## Drill 3 — `FormularioAviso`

<details><summary>Pista 1 — conceptual</summary>

Ahora mismo el formulario pasa de quieto a enviado sin pisar el estado del medio, así que
en pantalla no hay ningún rato de espera: hay un salto.

Dos preguntas, en este orden. ¿Cuándo empieza el envío, exactamente? Y ¿cómo sabe tu
código que ya terminó, si `enviarAlServidor()` no devuelve el resultado sino la promesa
de tenerlo?

</details>

<details><summary>Pista 2 — más concreta</summary>

El manejador tiene que hacer tres cosas en tres momentos distintos: marcar que el envío
arrancó, quedarse esperando a que la promesa termine, y solo entonces marcar el éxito.

Para que una función pueda quedarse esperando dentro, hay que marcarla — y la marca va
delante de sus paréntesis, en la misma línea del `const`. Sin esa marca, la palabra que
espera no se puede usar.

Las dos palabras están en la SINTAXIS de la TEORÍA 2.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test que falla dice esto:

```
Expected element to have text content:
  Enviando...
Received:
  Enviado
```

O sea: el estado del medio existe en el tipo, pero tu componente no pasa por él ni un
instante. Salta directo al final porque nadie está esperando a la promesa.

Y si pones la palabra que espera sin marcar la función, el compilador te para antes:

```
error TS1308: 'await' expressions are only allowed within async functions and at
the top levels of modules.
```

Fuera de ese caso, aquí `typecheck` calla: un manejador que no espera a nadie es código
perfectamente legal, solo que hace lo que no quieres.

</details>

<details><summary>Solución</summary>

```tsx
const alEnviar = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setEstado("submitting");
  await enviarAlServidor();
  setEstado("success");
};
```

`async` marca la función como "esta tarda" y habilita el `await` de dentro. El `await`
deja **esta** función en pausa hasta que la promesa termina; el resto de la página sigue
viva, que es justo lo que te va a morder en el drill 4.

Fíjate en que el JSX no cambia nada: el botón ya decía `{textoDelBoton(estado)}` y el
aviso ya estaba colgado de `estado === "success"`. Al mover bien el estado, la pantalla se
mueve sola. Eso es lo que significa "pintar a partir del estado".

</details>

---

## Drill 4 — `FormularioSinDobleEnvio`

<details><summary>Pista 1 — conceptual</summary>

Que tu función esté detenida en el `await` no detiene al usuario: el botón sigue ahí,
entero y pulsable, durante todo el viaje al servidor. Cada clic arranca su propio envío.

Y ya tienes en el estado el dato que dice si hay un envío en marcha. El botón todavía no
lo mira.

</details>

<details><summary>Pista 2 — más concreta</summary>

Un `<button>` tiene un atributo que lo apaga: mientras está puesto, el navegador no le
manda el clic a nadie.

Ese atributo no se pone a mano ni se quita a mano. Es una pregunta sobre el estado, escrita
donde va el valor del atributo, y su respuesta es `true` exactamente en uno de los tres
estados.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El primer test lo dice en seco:

```
expect(element).toBeDisabled()

Received element is not disabled:
  <button type="submit" />
```

El segundo cuenta los envíos que llegaron a terminar:

```
Unable to find an element with the text: /Enviados:\s*1/
```

...porque en pantalla pone `Enviados: 2`. Los dos clics entraron.

`typecheck` no tiene nada que decir en este drill: un botón sin apagar es HTML válido.
Toda la señal está en el test.

</details>

<details><summary>Solución</summary>

```tsx
<button type="submit" disabled={estado === "submitting"}>
  {textoDelBoton(estado)}
</button>
```

`estado === "submitting"` se evalúa en cada render y devuelve un `boolean`, que es justo
lo que `disabled` espera. No hay que sincronizar nada ni acordarse de volver a
habilitarlo: cuando el estado deja de ser `submitting`, la respuesta pasa a `false` sola.

Este drill es un bug abierto de Projex, y ahí es peor que aquí: el botón "Enviar mensaje"
vive en otro componente, atado al formulario por el atributo `form`, y **no recibe el
estado**. No es que se le olvidara el `disabled` — es que desde donde está no puede saber
que hay un envío en marcha.

</details>

---

## Drill 5 — `FormularioQueVuelveAIdle`

<details><summary>Pista 1 — conceptual</summary>

El aviso dice "Mensaje enviado correctamente" y en el momento en que el usuario teclea una
letra más, deja de ser verdad: ya hay un mensaje nuevo a medias que nadie ha enviado.

El manejador de cambio hoy solo se ocupa del texto. También sabe en qué estado está el
envío, y puede decidir sobre él.

</details>

<details><summary>Pista 2 — más concreta</summary>

En `alEscribir`, después de guardar lo que se escribió, hace falta una condición: si el
formulario venía de un envío con éxito, devuélvelo a quieto.

Tiene que ser una condición, no una línea suelta: devolverlo a quieto siempre también
estaría mal. Los otros dos tests del drill lo miran por los dos lados — escribir antes de
haber enviado nada, y escribir con un envío todavía en marcha. En los dos casos el botón
tiene que quedarse donde estaba.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test escribe, envía, espera al aviso y escribe una letra más:

```
expected document not to contain element, found <p
  role="status"
>
  Mensaje enviado correctamente
</p> instead
```

Y comprueba además que el campo conserva `"hola!"`: devolver el formulario a quieto no
puede llevarse por delante lo que el usuario lleva escrito.

Aquí `typecheck` tampoco habla — los tres estados son válidos en cualquier momento, y
elegir el equivocado no es un error de tipos, es un error de criterio.

</details>

<details><summary>Solución</summary>

```tsx
const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
  setMensaje(e.target.value);
  if (estado === "success") setEstado("idle");
};
```

Son dos estados independientes en el mismo manejador: uno guarda el texto y el otro cuenta
en qué punto del envío estamos. El `if` no está por ahorrar repintados, está para que el
reset alcance solo al estado que tiene algo que caducar: sin él, teclear en mitad de un
envío devolvería el formulario a `"idle"` y el botón dejaría de decir "Enviando...".

Esta línea sí está en el Projex de verdad, y es la misma idea: `if (status === "success")
setStatus("idle")`. Un aviso de éxito no es un cartel permanente, es la respuesta a un
envío concreto, y caduca en cuanto el usuario vuelve a tocar el formulario.

</details>

---

# Escalera del 5

Cuatro pasos que separan lo que el drill 5 hacía todo junto. Si el 5 se te atravesó, la
respuesta está en alguno de estos cuatro, y el escalón donde te tropieces es el
diagnóstico: no hace falta que lo adivines antes de empezar.

En estos cuatro `pnpm typecheck` no dice nada, porque no hay ningún tipo mal puesto. La
señal está solo en los tests, así que las Pistas 3 de aquí abajo citan lo que imprime
`pnpm test:run`, no el compilador.

---

## Drill 5a — `CampoQueSeMarca`

<details><summary>Pista 1 — conceptual</summary>

El componente ya guarda los dos estados que necesita, y el texto del `<p>` ya sale del
segundo. No falta ninguna pieza: falta que una de ellas cambie en otro momento.

Vuelve al enunciado y subraya **cuándo** tiene que quedar marcado el campo. Luego busca en
el componente en qué momento se marca ahora. No es el mismo momento.

</details>

<details><summary>Pista 2 — más concreta</summary>

El marcado está colgado de un evento que ocurre cuando el campo **pierde el foco**, y el
test escribe sin salir del campo, así que ese evento no llega nunca.

Un manejador no tiene un límite de un cambio de estado por evento. El que ya se ejecuta al
escribir puede encargarse de las dos cosas.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
5a) CampoQueSeMarca — la primera tecla marca el campo sin perder el texto
TestingLibraryElementError: Unable to find an element with the text: tecleado
```

Y en el volcado que imprime debajo se ve el `<input>` con `value="Nico"`, o sea que la
mitad del trabajo sí ocurrió: el texto se guardó y la marca no.

</details>

<details><summary>Solución</summary>

```tsx
const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
  setNombre(e.target.value);
  setTecleado(true);
};
```

Dos llamadas en el mismo evento, sin condición ninguna: la primera guarda el texto y la
segunda deja constancia de que el campo ya se usó. React agrupa las dos en un solo
repintado, así que no hay ningún coste por hacerlo así.

Y el `onBlur` del starter no era una tontería: marcar el campo al salir de él es un patrón
real y muy común, porque permite avisar del error justo cuando el usuario termina de
escribir. De hecho las librerías de formularios lo llaman `touched` y significa
exactamente eso, salir del campo. Aquí el estado se llama `tecleado` y promete otra cosa,
así que dejar el `onBlur` puesto hace que mienta: entrar y salir sin escribir nada deja el
`<p>` diciendo "tecleado". El test no lo mira, pero el nombre sí.

</details>

---

## Drill 5b — `AvisoQueSeVa`

<details><summary>Pista 1 — conceptual</summary>

Busca las dos direcciones del aviso. Encenderlo ya tiene su sitio, el botón. Apagarlo no
tiene ninguno todavía.

La pregunta que lo resuelve: de todo lo que ocurre en este componente, ¿quién es el único
que se entera de que el usuario acaba de escribir?

</details>

<details><summary>Pista 2 — más concreta</summary>

El apagado va dentro del manejador del `onChange`, en la línea de al lado de donde se
guarda el texto. Es el mismo movimiento del 5a con el booleano al revés: allí marcabas,
aquí desmarcas.

El enunciado te dice que aquí no hace falta condición. Aprovéchalo: escríbelo suelto y
comprueba que pasa. En el 5c se verá por qué no siempre se puede.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
5b) AvisoQueSeVa — teclear apaga el aviso y conserva lo escrito
Error: expect(element).not.toBeInTheDocument()

expected document not to contain element, found <p role="status">Guardado</p> instead
```

El test escribió una letra más y el aviso seguía en pantalla.

</details>

<details><summary>Solución</summary>

```tsx
const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
  setNota(e.target.value);
  setGuardado(false);
};
```

Un aviso de "Guardado" no describe el campo, describe **un momento**: el momento en que se
guardó. En cuanto el contenido cambia, ese momento ya pasó y el cartel es falso. Apagarlo
desde el mismo evento que cambia el contenido es lo que mantiene el aviso honesto.

Fíjate en que el reset va suelto, sin `if`. Aquí se puede porque solo hay dos situaciones
posibles, guardado o no guardado, y poner `false` donde ya había `false` no le hace daño a
nadie.

</details>

---

## Drill 5c — `AvisoConEnvioLento`

<details><summary>Pista 1 — conceptual</summary>

Esta vez el reset ya está escrito, y está en el manejador correcto. Lo que falla no es
dónde está, es **cuándo** se aplica.

Coge los tres estados del envío de uno en uno y pregúntate en cada uno: si el usuario
teclea ahora mismo, ¿hay algo que caducar? Vas a encontrar un solo sí.

</details>

<details><summary>Pista 2 — más concreta</summary>

De los tres estados, solo uno tiene un aviso en pantalla que pueda envejecer. En los otros
dos el reset no arregla nada, y en uno de ellos además destruye información: borra el hecho
de que hay un envío en marcha.

El reset tiene que quedar dentro de una condición que mire el estado de ahora. Y mira cuál
de los dos tests se queja: el que falla es el de escribir **durante** el envío, no el de
después.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
5c) AvisoConEnvioLento — escribir durante el envío no lo saca de enviando
Error: expect(element).toHaveTextContent()

Expected element to have text content:
  Enviando...
Received:
  Enviar mensaje
```

El botón había vuelto a "Enviar mensaje" en mitad de un envío que seguía en el aire.

</details>

<details><summary>Solución</summary>

```tsx
const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
  setMensaje(e.target.value);
  if (estado === "success") {
    setEstado("idle");
  }
};
```

Esta es la línea del drill 5, y aquí se ve por qué la condición no es un adorno. Sin ella
el reset se aplica en los tres estados, y en `"submitting"` eso miente dos veces: el botón
vuelve a ofrecerse para enviar, y el usuario deja de saber que su primer envío sigue de
camino. El envío no se cancela, solo se queda sin nadie que lo cuente.

La forma de leerla en voz alta: *si lo que había en pantalla era un aviso de éxito, ese
aviso acaba de caducar*. Los otros dos estados no tienen nada que caducar.

</details>

---

## Drill 5d — `BotonLimpiarProtegido`

<details><summary>Pista 1 — conceptual</summary>

Mismo mecanismo que el 5c y otro evento. Aquí el que necesita preguntar algo antes de
ponerse a trabajar es el manejador de "Limpiar".

Piensa qué tiene de malo vaciar el campo justo en ese momento, y te sale la pregunta que
hay que hacer.

</details>

<details><summary>Pista 2 — más concreta</summary>

La condición es la inversa de la del 5c. Allí preguntabas si había algo que caducar y
actuabas cuando la respuesta era sí. Aquí preguntas si hay un envío en marcha, y cuando la
respuesta es sí el manejador se marcha sin hacer nada.

Con `return` a secas se sale de un manejador antes de tiempo. No hace falta envolver el
resto en un `else`.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
5d) BotonLimpiarProtegido — durante el envío, Limpiar no hace nada
Error: expect(element).toHaveValue(hola)

Expected the element to have value:
  hola
Received:

```

Recibido vacío: el clic entró y se llevó el texto por delante.

</details>

<details><summary>Solución</summary>

```tsx
const alLimpiar = () => {
  if (estado === "submitting") return;
  setMensaje("");
};
```

Se llama **guardia de salida**: la primera línea del manejador decide si hay trabajo que
hacer, y si no lo hay se va. Es la misma idea del 5c escrita al revés, y se usa mucho
porque deja el cuerpo del manejador sin sangrar.

Por qué no vale `disabled` aquí: apagar el botón también evitaría el desastre, pero el
problema no es que el botón sea pulsable, es que la acción no debe ocurrir en ese estado.
Un botón apagado delega la regla en el navegador, y la regla se pierde en cuanto alguien
llama a `alLimpiar` desde otro sitio. La guardia viaja con la función.

El drill 4 sí era el caso de `disabled`, y la diferencia entre los dos merece un minuto:
allí el objetivo era **decirle al usuario** que no insistiera, y aquí es **proteger un
estado** de una acción que lo contradice.

</details>
