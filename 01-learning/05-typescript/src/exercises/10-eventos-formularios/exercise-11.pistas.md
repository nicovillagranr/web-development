# Pistas — exercise-11 · un objeto para todo el formulario

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.
>
> Los mensajes de la Pista 3 son los que escupe `pnpm typecheck` sobre el starter,
> literales. Cuando no hay mensaje es porque **ese drill typecheck no lo caza**, y la
> pista lo dice.

---

## Drill 1 — `conAliasCambiado`

<details><summary>Pista 1 — conceptual</summary>

Esto ya lo resolviste en la escalera F, pero sobre arrays: `push` cambiaba el que te
habían dado en vez de fabricar otro. Un objeto tiene el mismo problema y la misma
solución, con otra sintaxis.
</details>

<details><summary>Pista 2 — más concreta</summary>

Hay dos cosas distintas: **cambiar el valor de una clave** y **fabricar otro objeto
que tenga esa clave distinta**. Te piden la segunda, y el `📌 RECORDATORIO` de arriba
tiene la forma dibujada.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Nada. Este drill typecheck no lo caza: escribir en una propiedad de un objeto es
código perfectamente válido.

El dato duro está en el test, y son estas dos líneas:

```ts
expect(original).toEqual(BASE)      // el que te dieron, intacto
expect(siguiente).not.toBe(original) // y no puede ser el mismo objeto
```

`toBe` compara identidad, no contenido: pregunta si son **el mismo objeto en
memoria**.
</details>

<details><summary>Solución</summary>

```ts
return { ...perfil, alias };
```

El spread copia las tres claves a un objeto nuevo, y `alias` —que aquí es la forma
corta de `alias: alias`— pisa la que se llama igual. El original ni se entera.
</details>

---

## Drill 2 — `conCampoCambiado`

<details><summary>Pista 1 — conceptual</summary>

El cuerpo del starter ya está bien: fabrica otro objeto y pisa la clave que le digan.
Lo que hay que mirar es la **firma**, y en concreto qué está dispuesto a aceptar el
segundo parámetro.
</details>

<details><summary>Pista 2 — más concreta</summary>

Tal como está, cualquier texto es un campo válido: `"ciduad"` entra sin protestar y
te devuelve un perfil con una cuarta clave que nadie va a leer nunca. Necesitas el
tipo que significa "una de las claves de `Perfil`, y solo esas". Está en `🗣️ LAS
PIEZAS` de la TEORÍA 1.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Este es el único drill del archivo cuya señal está **solo** en `pnpm typecheck`, y
además el error sale en el archivo de test, no en el tuyo:

```
exercise-11.test.tsx: error TS2578: Unused '@ts-expect-error' directive.
```

Léelo del revés: el test dice "la línea de abajo NO debe compilar" y el compilador
contesta que compila tan ricamente. Eso es el fallo.
</details>

<details><summary>Solución</summary>

```ts
export function conCampoCambiado(
  perfil: Perfil,
  campo: keyof Perfil,
  valor: string,
): Perfil {
  return { ...perfil, [campo]: valor };
}
```

`keyof Perfil` es exactamente `"alias" | "ciudad" | "bio"`, escrito de forma que no
haya que mantenerlo a mano cuando `Perfil` cambie.
</details>

---

## Drill 3 — `PerfilQueEscribe`

<details><summary>Pista 1 — conceptual</summary>

Pregúntate qué guarda este `useState`: ¿un alias, o un perfil? La respuesta está en
el `useState<Perfil>` de la primera línea, y el manejador la está contradiciendo.
</details>

<details><summary>Pista 2 — más concreta</summary>

Al setter no le puedes entregar el trozo que cambió: le entregas el estado completo
tal y como debe quedar. Y para construir ese estado completo ya tienes una función
escrita — es el drill 1, y el enunciado te pide reutilizarla.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2345: Argument of type '{ alias: string; }' is not assignable to parameter
of type 'SetStateAction<Perfil>'.
  Type '{ alias: string; }' is missing the following properties from type 'Perfil':
  ciudad, bio
```

La segunda línea lo dice entero: le estás dando un objeto al que le faltan dos
claves.
</details>

<details><summary>Solución</summary>

```tsx
setPerfil((prev) => conAliasCambiado(prev, e.target.value));
```

La forma funcional (`prev => …`) es la que garantiza que copias del perfil que hay
guardado en ese momento, no del que capturó el render.
</details>

---

## Drill 4 — `PerfilDosCampos`

<details><summary>Pista 1 — conceptual</summary>

Escribe en el campo Ciudad y mira el `<p>` del alias. Un solo manejador no es un
manejador que haga siempre lo mismo: es uno que averigua sobre qué campo le han
llamado.
</details>

<details><summary>Pista 2 — más concreta</summary>

Ese dato viaja en el propio campo y lo tienes en el JSX, escrito en los dos
`<input>`. Del evento salen las dos mitades: cuál y qué. Y ojo, lo que llegue de ahí
es un texto cualquiera hasta que lo compruebes — el `<select>` del `exercise-09`
tenía este mismo problema, y lo resolviste sin `as`.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Nada, mientras le pases un literal escrito a mano. El día que le pases `e.target.name`
sin comprobar, dirá esto:

```
error TS2345: Argument of type 'string' is not assignable to parameter of type
'keyof Perfil'.
```

Y ese error es el ejercicio, no un obstáculo: te está diciendo que el navegador no
ha leído tu tipo.
</details>

<details><summary>Solución</summary>

```tsx
const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  if (name === "alias" || name === "ciudad") {
    setPerfil((prev) => conCampoCambiado(prev, name, value));
  }
};
```

Dentro del `if`, TypeScript ya sabe que `name` solo puede ser una de esas dos, y
`"alias" | "ciudad"` sí encaja en `keyof Perfil`. Es narrowing, el mismo del 09.
</details>

---

## Drill 5 — `PerfilConBio`

<details><summary>Pista 1 — conceptual</summary>

Al `<textarea>` le estás entregando un manejador escrito para otro elemento. Los dos
tienen `value` y los dos disparan `change`, pero no son el mismo tipo de elemento y
React lo sabe.
</details>

<details><summary>Pista 2 — más concreta</summary>

Son dos cosas, y las dos están en el manejador: la **firma** tiene que admitir los dos
elementos —hay una forma de decir "uno u otro" que llevas usando desde el bloque de
uniones— y el **cuerpo** todavía no contempla el tercer campo.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2322: Type '(e: ChangeEvent<HTMLInputElement>) => void' is not assignable to
type 'ChangeEventHandler<HTMLTextAreaElement, HTMLTextAreaElement>'.
  Types of parameters 'e' and 'event' are incompatible.
    Type 'ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>' is not assignable to
    type 'ChangeEvent<HTMLInputElement, Element>'.
```

La última línea es el resumen: llega un evento de `<textarea>` donde tu función pide
uno de `<input>`.
</details>

<details><summary>Solución</summary>

```tsx
const alEscribir = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  if (name === "alias" || name === "ciudad" || name === "bio") {
    setPerfil((prev) => conCampoCambiado(prev, name, value));
  }
};
```

La unión va **dentro** de los `<>`: el evento es uno solo, lo que puede variar es el
elemento del que viene.
</details>
