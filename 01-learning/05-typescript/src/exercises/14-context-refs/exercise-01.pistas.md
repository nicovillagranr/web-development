# Pistas — exercise-01 · el contexto: crear, proveer y leer

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

El 1 solo sale rojo en el compilador: al ejecutar, el tema sí es "claro" u "oscuro". Del 2 al 5
salen rojos en el test, y el 3, además, en el compilador.

---

## Drill 1 — `TemaContext`

<details><summary>Pista 1 — conceptual</summary>

Fondo funciona al ejecutar. Lo que falla es lo que TypeScript cree que lleva el contexto.

</details>

<details><summary>Pista 2 — más concreta</summary>

createContext saca el tipo del valor por defecto, y de "claro" saca string. Dile tú el tipo del
tema, entre <>.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Record<Tema, string>'.
  No index signature with a parameter of type 'string' was found on type 'Record<Tema, string>'.
```

FONDO solo tiene dos claves, claro y oscuro, y un string cualquiera no sirve de clave. El test
pasa porque al ejecutar el tema sí es una de las dos.

</details>

<details><summary>Solución</summary>

```ts
export const TemaContext = createContext<Tema>("claro");
```

Con <Tema>, el contexto lleva un Tema y useContext devuelve un Tema: FONDO[tema] ya es una de sus
dos claves. Y de paso, un Provider con value="gris" deja de compilar.

</details>

---

## Drill 2 — `AppConUsuario`

<details><summary>Pista 1 — conceptual</summary>

Los dos componentes leen el mismo contexto, pero solo uno está dentro del Provider.

</details>

<details><summary>Pista 2 — más concreta</summary>

useContext busca el Provider más cercano por encima. Sube el Provider para que envuelva la cabecera
y el menú.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: La cabecera también tiene que oír el nombre: tiene que estar dentro del Provider: expect(element).toHaveTextContent()
Expected element to have text content:
  Hola, Nico
Received:
  Hola, Invitado
```

El compilador calla: un componente fuera del Provider es código válido, solo que lee el valor por
defecto.

</details>

<details><summary>Solución</summary>

```tsx
<UsuarioContext value={nombre}>
  <header>
    <Saludo />
  </header>
  <aside>
    <MenuDeCuenta />
  </aside>
</UsuarioContext>
```

Saludo estaba al lado del Provider, no dentro. Subía por el árbol, no encontraba ninguno y leía el
valor por defecto, «Invitado».

</details>

---

## Drill 3 — `AppDeAdmin`

<details><summary>Pista 1 — conceptual</summary>

Insignia lee lo que da el Provider, no una mezcla con el valor por defecto.

</details>

<details><summary>Pista 2 — más concreta</summary>

El value tiene que ser un Sesion entero: nombre y rol.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el test</summary>

```
error TS2741: Property 'rol' is missing in type '{ nombre: string; }' but required in type 'Sesion'.
```

```
Error: El rol no sale del valor por defecto: el Provider tiene que dar el objeto entero: expect(element).toHaveTextContent()
Expected element to have text content:
  Nico · admin
Received:
  Nico ·
```

</details>

<details><summary>Solución</summary>

```tsx
<SesionContext value={{ nombre: "Nico", rol: "admin" }}>
```

Las llaves de fuera son las de JSX; las de dentro, el objeto. El value sustituye entero al valor
por defecto: si no trae rol, Insignia no tiene rol, aunque el valor por defecto sí lo tenga.

</details>

---

## Drill 4 — `AppConTema`

<details><summary>Pista 1 — conceptual</summary>

El botón cambia el estado, pero el Provider no se entera.

</details>

<details><summary>Pista 2 — más concreta</summary>

El value del Provider está escrito a mano. Dale el estado.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: Al pulsar, el Provider tiene que dar el tema nuevo: expect(element).toHaveTextContent()
Expected element to have text content:
  Tema oscuro
Received:
  Tema claro
```

El compilador calla: "claro" es un valor válido para el contexto.

</details>

<details><summary>Solución</summary>

```tsx
<TemaContext value={tema}>
```

Al pulsar, el estado cambia y AppConTema vuelve a pintar. Ahora el Provider da el tema nuevo, y
React repinta a Fondo, que lo lee.

</details>

---

## Drill 5 — `Pagina`

<details><summary>Pista 1 — conceptual</summary>

Faltan dos cosas: que alguien provea el idioma y que Enlace lo lea.

</details>

<details><summary>Pista 2 — más concreta</summary>

Pagina envuelve lo que pinta en un Provider de IdiomaContext con su idioma. Enlace lee el contexto
con useContext y elige su texto de INICIO con él.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: Pagina va en inglés: el enlace tiene que decir «Home»: expect(element).toHaveTextContent()
Expected element to have text content:
  Home
Received:
  Inicio
```

Después, el test monta Enlace solo, dentro de un IdiomaContext en inglés: si Enlace recibe el
idioma por una prop, esa parte falla.

</details>

<details><summary>Solución</summary>

```tsx
export function Enlace() {
  const idioma = useContext(IdiomaContext);
  return <a href="/">{INICIO[idioma]}</a>;
}

export function Pagina({ idioma }: { idioma: Idioma }) {
  return (
    <IdiomaContext value={idioma}>
      <nav lang={idioma}>
        <Menu />
      </nav>
    </IdiomaContext>
  );
}
```

Menu no se entera de nada: el idioma va de Pagina a Enlace por el contexto. Es lo que hace tu
DatasetProvider con las pantallas de Store Pulse.

</details>
