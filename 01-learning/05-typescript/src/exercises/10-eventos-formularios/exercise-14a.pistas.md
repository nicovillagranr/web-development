# Pistas — exercise-14a · una caja nueva cada letra

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente: si abres tres seguidas, te has leído la solución sin darte cuenta.

Aquí casi toda la señal está en el test. Solo el drill 2 rompe el compilador, y es el único
cuya Pista 3 empieza por un `TS####`.

---

## Drill 1 — `copiaDe`

<details><summary>Pista 1 — conceptual</summary>

Dos cajas pueden tener lo mismo dentro y no ser la misma caja.

Si te presto la mía y me la devuelves, da igual lo que hayas hecho: sigue siendo la mía, y
cualquier cambio que le hicieras me lo llevo puesto. El drill pide la otra situación.

</details>

<details><summary>Pista 2 — más concreta</summary>

Devolver el parámetro tal cual no fabrica nada: pone el mismo objeto en dos manos.

Lo que hace falta es una forma de escribir un objeto nuevo cuyas claves salgan de otro, sin
teclear las tres a mano. Está en el `11`, TEORÍA 1, y son tres puntos.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected { name: 'Nico', …(2) } not to be { name: 'Nico', …(2) } // Object.is equality
```

Fíjate en que los dos lados se imprimen **idénticos**. No se queja de lo que hay dentro:
`toEqual` pasa. Se queja de `toBe`, que pregunta otra cosa — si son el mismo objeto — y hoy
la respuesta es que sí.

</details>

<details><summary>Solución</summary>

```ts
export function copiaDe(datos: Datos): Datos {
  return { ...datos };
}
```

El spread lee las claves de `datos` y las escribe en un objeto recién fabricado. Lo de dentro
coincide, y por eso `toEqual` sigue pasando; el objeto es otro, y por eso `not.toBe` también.

</details>

---

## Drill 2 — `conCorreo`

<details><summary>Pista 1 — conceptual</summary>

El campo del correo se llama de una manera concreta dentro de la caja, y el parámetro que
trae el valor nuevo se llama de otra. No tienen por qué coincidir, y aquí no coinciden.

</details>

<details><summary>Pista 2 — más concreta</summary>

Cuando escribes `{ ...datos, algo }` en lugar de `{ ...datos, algo: valor }`, JavaScript
entiende que la clave **y** el valor se llaman igual. Eso es lo que está pasando: se está
creando una clave con el nombre del parámetro.

Mira cómo se llama el campo en el `type Datos` de arriba, y nómbralo tú.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Este es el único drill del archivo que no compila:

```
exercise-14a.tsx(62,22): error TS2353: Object literal may only specify known properties, and 'correo' does not exist in type 'Datos'.
```

Y el test lo cuenta desde el otro lado, enseñándote las claves que salieron:

```
AssertionError: expected [ Array(4) ] to deeply equal [ 'email', 'message', 'name' ]
+   "correo",
```

Cuatro claves donde tenía que haber tres.

</details>

<details><summary>Solución</summary>

```ts
export function conCorreo(datos: Datos, correo: string): Datos {
  return { ...datos, email: correo };
}
```

A la izquierda de los dos puntos va cómo se llama el campo **en la caja**; a la derecha, de
dónde sacas el valor. El atajo `{ ...datos, correo }` solo vale cuando esas dos cosas se
llaman igual.

</details>

---

## Drill 3 — `conCampo`

<details><summary>Pista 1 — conceptual</summary>

El starter funciona para el primer campo y se rinde con los demás: cuando no es ese, escribe
siempre en el mismo sitio. Podrías añadir un caso por campo y quedaría resuelto… hasta que la
caja gane un cuarto.

La pregunta del drill es cómo escribir **uno solo** que sirva para los tres.

</details>

<details><summary>Pista 2 — más concreta</summary>

El nombre del campo ya lo tienes: llega en `campo`. El problema es que al escribirlo a la
izquierda de los dos puntos, JavaScript lo toma como una palabra literal en vez de leer lo
que hay dentro de la variable.

Hay una forma de decirle "lee esta variable y **ese** es el nombre de la clave". Está en el
`11`, TEORÍA 1, con su nombre técnico, y se distingue por un par de corchetes.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected { name: 'Nico', email: 'Hey', …(1) } to deeply equal { name: 'Nico', …(2) }
- Expected
+ Received
-   "message": "Hey",
+   "email": "Hey",
```

Le pediste que pisara `message` y pisó `email`. El valor llegó bien: lo que no llegó es
**dónde** tenía que ir.

</details>

<details><summary>Solución</summary>

```ts
export function conCampo(datos: Datos, campo: keyof Datos, valor: string): Datos {
  return { ...datos, [campo]: valor };
}
```

Los corchetes son la clave computada: se evalúa `campo`, sale `"message"`, y esa cadena pasa a
ser el nombre de la clave. Sin corchetes, la clave se llama literalmente `campo`.

Y `keyof Datos` es lo que impide que alguien te llame con `"emial"`: solo entran los tres
nombres que existen en la caja.

</details>

---

## Drill 4 — `datosDelCampo`

<details><summary>Pista 1 — conceptual</summary>

De un campo de formulario salen dos datos distintos: cómo se llama y qué hay escrito dentro.
El starter los confunde y devuelve el mismo dos veces.

Es el drill más corto del archivo. Léelo despacio y compara lo que devuelve con lo que pide
el nombre de cada clave.

</details>

<details><summary>Pista 2 — más concreta</summary>

`target` trae las dos propiedades ya separadas. No hay que calcular nada: hay que coger cada
una de su sitio.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected { name: 'email', value: 'email' } to deeply equal { Object (name, value) }
- Expected
+ Received
-   "value": "nico@mail.cl",
+   "value": "email",
```

`name` salió bien. `value` salió con el contenido de `name`: las dos claves están leyendo la
misma propiedad.

</details>

<details><summary>Solución</summary>

```ts
export function datosDelCampo(target: { name: keyof Datos; value: string }) {
  return { name: target.name, value: target.value };
}
```

En el `14` esto lo escribiste en una línea, con destructuring: `const { name, value } =
e.target` saca las dos propiedades de golpe y las deja en dos constantes que se llaman igual
que ellas. Es el mismo gesto, escrito más corto.

</details>

---

## Drill 5 — `siguientesDatos`

<details><summary>Pista 1 — conceptual</summary>

Este no tiene nada nuevo: es el drill 3 con los dos últimos parámetros metidos en una caja.

Si el 3 te salió, la única pregunta aquí es de dónde sacas ahora el nombre del campo y el
valor.

</details>

<details><summary>Pista 2 — más concreta</summary>

`cambio` trae las dos cosas: `cambio.name` es el nombre del campo que hay que pisar y
`cambio.value` lo que hay que poner dentro.

Una clave computada no tiene por qué leer una variable suelta; puede leer la propiedad de un
objeto.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected { name: 'Hey', …(2) } to deeply equal { name: 'Nico', …(2) }
- Expected
+ Received
-   "message": "Hey",
-   "name": "Nico",
+   "message": "Quiero una landing",
+   "name": "Hey",
```

Le dijiste `message` y escribió en `name`. El starter tiene el nombre del campo puesto a mano,
así que hace lo mismo le llegue lo que le llegue.

</details>

<details><summary>Solución</summary>

```ts
export function siguientesDatos(
  actuales: Datos,
  cambio: { name: keyof Datos; value: string },
): Datos {
  return { ...actuales, [cambio.name]: cambio.value };
}
```

Copiar lo que había, pisar la que te nombran. Idéntico al drill 3: cambia de dónde salen los
dos datos, no el mecanismo.

</details>

---

## Drill 6 — `DosCamposUnManejador`

<details><summary>Pista 1 — conceptual</summary>

Los dos campos llaman al mismo manejador, y el manejador no puede adivinar cuál de los dos lo
ha llamado… salvo que se lo pregunte al propio evento.

Cada `<input>` lleva puesto el nombre de su campo. Ese dato viaja con el evento.

</details>

<details><summary>Pista 2 — más concreta</summary>

El starter tiene el nombre del campo escrito a mano, así que los dos `<input>` acaban
escribiendo en el mismo sitio.

`e.target` es el elemento que disparó el evento, y trae las dos cosas que necesitas: su
`name` y su `value`. Con eso, el drill 5 ya está resuelto aquí dentro.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected the element to have value:
  Nico
Received:
  l
```

Esa `l` suelta es la última letra de `nico@mail.cl`. El test escribe primero en "Nombre" y
después en "Correo", letra a letra; como el manejador siempre pisa el mismo campo, cada letra
del correo va a parar al nombre y borra lo anterior. Al final queda la última que se tecleó.

</details>

<details><summary>Solución</summary>

```tsx
const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
  setDatos({ ...datos, [e.target.name]: e.target.value });
};
```

O, como lo escribiste en el `14`, sacando antes las dos propiedades:

```tsx
const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setDatos({ ...datos, [name]: value });
};
```

Las dos hacen lo mismo. Y es lo mismo que el drill 5, con el par saliendo del evento en vez
de llegar por parámetro: **por eso un solo manejador puede servir a dos campos** — el que
decide dónde se escribe no es el manejador, es el `name` del elemento que lo llamó.

</details>
