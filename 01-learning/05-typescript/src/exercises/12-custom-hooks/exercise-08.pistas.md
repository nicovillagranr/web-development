# Pistas — exercise-08 · el efecto como préstamo

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

El 4 compila mal y pasa el test: su Pista 3 cita al compilador. Los demás compilan, y su
Pista 3 trae el dato duro del test.

---

## Drill 1 — `MapaConTitulo`

<details><summary>Pista 1 — conceptual</summary>

El efecto cambia algo que no es suyo y no lo devuelve. ¿Qué parte del efecto corre
cuando el mapa se cierra?

</details>

<details><summary>Pista 2 — más concreta</summary>

Los tres pasos de la teoría: anota el título que había, cámbialo, y devuélvelo en la
función que retorna el efecto.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Con la pestaña en «Contacto · Projex», el test monta el mapa y lo desmonta:

```
AssertionError: expected 'Mapa · Projex' to be 'Contacto · Projex'
```

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const anterior = document.title;
  document.title = "Mapa · Projex";
  return () => {
    document.title = anterior;
  };
}, []);
```

La limpieza corre cuando el mapa muere, se cierre como se cierre: la ✕, Escape, o que el
padre lo quite por su cuenta. El `onClick` de la ✕ solo cubriría el primer caso.

</details>

---

## Drill 2 — `VisorDeFoto`

<details><summary>Pista 1 — conceptual</summary>

La limpieza devuelve el overflow, pero no el que había: devuelve uno inventado. ¿Qué
había cuando la foto se abrió desde el menú?

</details>

<details><summary>Pista 2 — más concreta</summary>

Anota el valor del overflow en el cuerpo del efecto, antes de bloquearlo, y que la
limpieza devuelva lo anotado en vez de la cadena vacía.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Con el overflow en `"hidden"` antes de abrir la foto (el menú), el test la cierra:

```
AssertionError: expected '' to be 'hidden'
```

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const anterior = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = anterior;
  };
}, []);
```

Con el menú abierto, lo anotado es `"hidden"`, y eso es lo que vuelve: el menú sigue
bloqueando. Sin nada abierto, lo anotado es `""`, y el fondo vuelve a moverse. El mismo
código sirve para los dos casos porque no supone nada.

</details>

---

## Drill 3 — `EnvioConfirmado`

<details><summary>Pista 1 — conceptual</summary>

Están los tres pasos, pero no en el orden de la teoría. ¿Qué título hay en la pestaña
en el momento exacto en que se anota?

</details>

<details><summary>Pista 2 — más concreta</summary>

Si anotas después de cambiar, anotas tu propio cambio. Mueve la línea que anota por
encima de la que cambia.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Con la pestaña en «Servicios · Projex», el test monta el aviso y lo desmonta:

```
AssertionError: expected 'Enviado · Projex' to be 'Servicios · Projex'
```

La limpieza sí devolvió algo: devolvió «Enviado · Projex», lo que se anotó.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const anterior = document.title;
  document.title = "Enviado · Projex";
  return () => {
    document.title = anterior;
  };
}, []);
```

Es el mismo fallo que el drill 4 del 06, con el título en vez del foco: anotar tiene que
pasar cuando todavía no has tocado nada.

</details>

---

## Drill 4 — `BuscadorDeProjex`

<details><summary>Pista 1 — conceptual</summary>

En el navegador, `anterior` es el botón «Buscar». Pero TypeScript no ve el navegador: ve
el tipo de `document.activeElement`. ¿Qué tipo es, y qué le falta?

</details>

<details><summary>Pista 2 — más concreta</summary>

Antes de llamar a `focus()`, comprueba en ejecución que `anterior` es un elemento HTML. Esa
comprobación estrecha el tipo dentro del `if`. El `as` está prohibido: afirma, no comprueba.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2339: Property 'focus' does not exist on type 'Element'.
```

El `?.` no lo arregla: quita el `null`, pero lo que queda sigue siendo `Element`.

</details>

<details><summary>Solución</summary>

```tsx
return () => {
  if (anterior instanceof HTMLElement) {
    anterior.focus();
  }
};
```

`document.activeElement` es `Element | null`, y `Element` también incluye los elementos SVG,
que no son `HTMLElement`. El `instanceof` lo comprueba en ejecución, y dentro del `if`
TypeScript ya sabe que tiene `focus()`.

</details>

---

## Drill 5 — `MenuDelMovil`

<details><summary>Pista 1 — conceptual</summary>

Son dos préstamos a la vez, el foco y el overflow, y los dos nacen y mueren con el menú.
¿Qué tienes que anotar antes de tocar nada?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un efecto con `[]`: anota quién tiene el foco y el overflow, bloquea el scroll y enfoca el
enlace del `primerEnlaceRef`. En la limpieza, devuelve los dos. Puede ir en el mismo efecto
del Escape, pero en uno aparte se lee mejor: nace y muere con el menú, sin depender de
`onClose`.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Con el starter, después de abrir el menú:

```
AssertionError: expected '' to be 'hidden'
```

Cuando eso pase, el test sigue con el foco: tiene que estar en «Servicios» con el menú
abierto, y en la hamburguesa después de cerrarlo.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const focoAnterior = document.activeElement;
  const overflowAnterior = document.body.style.overflow;

  document.body.style.overflow = "hidden";
  primerEnlaceRef.current?.focus();

  return () => {
    document.body.style.overflow = overflowAnterior;
    if (focoAnterior instanceof HTMLElement) {
      focoAnterior.focus();
    }
  };
}, []);
```

El menú nace justo después del clic en la hamburguesa, así que el foco todavía está en
ella cuando el efecto lo anota. Por eso no le hace falta ningún ref: lo anotado ya es la
hamburguesa.

</details>
