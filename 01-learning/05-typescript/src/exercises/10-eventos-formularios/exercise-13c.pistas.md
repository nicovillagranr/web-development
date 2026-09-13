# Pistas — exercise-13c · una acción, varias puertas

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente: si abres tres seguidas, te has leído la solución sin darte cuenta.

Aquí `pnpm typecheck` tampoco te va a ayudar: no hay ningún tipo mal puesto, así que toda
la señal está en `pnpm test:run`. La pista 3 de cada drill es lo que dice el test cuando
falla.

---

## Drill 1 — `PanelConDosSalidas`

<details><summary>Pista 1 — conceptual</summary>

Las dos salidas hacen lo mismo de boquilla: las dos cierran. Míralas de una en una y
apunta **todo** lo que cambia cada una, no solo lo que se ve en pantalla.

Cerrar no es una cosa, son dos. Una de las salidas solo hace la primera.

</details>

<details><summary>Pista 2 — más concreta</summary>

Que las dos hagan lo mismo se puede conseguir de dos maneras: copiando las líneas que
faltan en la que va corta, o dejando de tener las líneas escritas dos veces.

La segunda es la que evita que mañana vuelvan a separarse cuando cerrar pase a hacer una
tercera cosa. El resto del archivo da por hecho que existe una función `cerrar`.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test abre el panel, escribe, cierra con la ✕, y vuelve a abrirlo:

```
Expected the element to have value:

Received:
  hola
```

La nota del intento anterior sigue ahí. La misma prueba con "Cancelar" pasa.

</details>

<details><summary>Solución</summary>

```tsx
const cerrar = () => {
  setAbierto(false);
  setNota("");
};
```

Y las dos salidas llaman a esa función: `onClick={cerrar}` en "Cancelar" y en la ✕.

Lo que había antes no era un error de escritura, era el sitio: con la operación repetida
en cada botón, mantenerlas iguales depende de que te acuerdes. Con una sola función, las
dos salidas hacen lo mismo porque **son** lo mismo. Eso es el punto de encuentro, y el
resto del archivo va de lo que se puede poner ahí.

</details>

---

## Drill 2 — `PanelQueEscuchaEscape`

<details><summary>Pista 1 — conceptual</summary>

El botón "Cancelar" se apaga durante el guardado y respeta la regla. La tecla no se puede
apagar, así que la regla tiene que alcanzarla de otra forma.

Pregúntate en qué punto se cruzan el clic en "Cancelar" y la pulsación de Escape.

</details>

<details><summary>Pista 2 — más concreta</summary>

`disabled` es un freno que vive en un botón: solo detiene lo que pasa por ese botón. Lo
que tiene que valer para los dos caminos se pone donde los dos caminos ya se juntan, y
eso es la primera línea de `cerrar`.

La pregunta que hay que hacer ahí está escrita arriba del archivo y ya sabe contestar.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test pulsa Guardar y, mientras la respuesta no ha vuelto, teclea Escape dentro del
campo:

```
TestingLibraryElementError: Unable to find a label with the text of: Nota
```

Busca el campo del panel y ya no está: el panel se cerró en mitad del guardado.

</details>

<details><summary>Solución</summary>

```tsx
const cerrar = () => {
  if (!puedeCerrar(estado)) return;
  setAbierto(false);
  setNota("");
  setEstado("idle");
};
```

El `return` temprano corta antes de tocar nada, y corta para todo el que llame: el clic,
la tecla, y lo que se añada mañana. El `disabled` del botón no sobra ni compite: avisa al
usuario de que ahora no toca. Uno informa, el otro hace cumplir la regla.

Escribirlo como `if (puedeCerrar(estado)) { ... }`, envolviendo las tres líneas, vale
exactamente igual — es la forma que usaste en el `13b`. Lo que importa es que la pregunta
esté dentro de la función, no en los botones.

</details>

---

## Drill 3 — `PanelConTresSalidas`

<details><summary>Pista 1 — conceptual</summary>

Aquí la guarda está bien escrita, palabra por palabra, y el panel se cierra igual. Si el
freno funciona, lo que falla es quién pasa por delante de él.

Recorre las tres salidas y ve siguiéndolas con el dedo hasta ver dónde acaba cada una.

</details>

<details><summary>Pista 2 — más concreta</summary>

Dos de las tres salidas terminan llamando a `cerrar`. La tercera hace el trabajo por su
cuenta, con las mismas tres líneas copiadas dentro del `onClick`.

Una guarda solo protege lo que entra por su puerta. Lo que va por fuera ni la ve.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test pulsa Guardar y, sin esperar a la respuesta, pulsa la ✕:

```
TestingLibraryElementError: Unable to find a label with the text of: Nota
```

El mismo mensaje del drill 2, por el mismo motivo y con otra puerta. Con el panel quieto,
las tres salidas pasan.

</details>

<details><summary>Solución</summary>

```tsx
<button type="button" aria-label="Cerrar" onClick={cerrar}>
  ✕
</button>
```

La ✕ tenía la operación copiada dentro, así que se saltaba la guarda sin enterarse.
Apuntándola a `cerrar` entra por la misma puerta que las otras dos.

Fíjate en lo que ha pasado en los tres drills: primero hubo que **crear** el punto de
encuentro, luego **poner el freno ahí**, y aquí el fallo ya no es el freno sino un camino
que no pasaba por él. Cuando revises un formulario tuyo, esa es la pregunta: cuántas
maneras hay de llegar a esta acción, y si todas pasan por el mismo sitio.

</details>
