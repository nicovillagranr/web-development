# Pistas — exercise-10 · tu MapModal en tres hooks

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cuatro salen rojos en el test. Además, al 1 lo marca el compilador, al 2 el lint y
al 3 un aviso del lint: su Pista 3 cita ese mensaje. El 4 solo lo marca el test, y los
cuatro peldaños de su escalera (4a–4d) también.

---

## Drill 1 — `useBloquearScroll`

<details><summary>Pista 1 — conceptual</summary>

El préstamo está bien escrito: anota, cambia y devuelve. Lo que falla es dónde vive.
¿Quién llama a la función que devuelve tu hook?

</details>

<details><summary>Pista 2 — más concreta</summary>

El préstamo tiene que ir dentro de un efecto, y la limpieza es lo que devuelve ese efecto.
El hook en sí no devuelve nada: solo llama a useEffect.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2322: Type '() => void' is not assignable to type 'void'.
```

Y el test, al cerrar la foto:

```
AssertionError: expected 'hidden' to be '' // Object.is equality
```

</details>

<details><summary>Solución</summary>

```tsx
export function useBloquearScroll(): void {
  useEffect(() => {
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, []);
}
```

El cuerpo del hook corre en cada render de FotoAmpliada, pero solo le entrega el efecto a
React. El cuerpo del efecto corre al nacer (con `[]`, una sola vez) y su limpieza al morir,
porque React sí sabe cuándo muere el componente. En el starter, la función que devolvía el
hook llegaba a FotoAmpliada, que la tiraba: nadie la llamaba.

</details>

---

## Drill 2 — `useFocoQueVuelve`

<details><summary>Pista 1 — conceptual</summary>

ConfirmacionDeEnvio le da al hook lo que hay en entendidoRef en el momento de llamarlo.
¿En qué momento lo llama, y qué hay en la caja entonces?

</details>

<details><summary>Pista 2 — más concreta</summary>

Que el hook reciba la caja entera, el ref, y que abra la caja con .current dentro del
efecto, cuando el botón ya está pintado. El tipo de un ref es RefObject, y se importa de
react.

</details>

<details><summary>Pista 3 — lo que dice el lint</summary>

```
error  Error: Cannot access refs during render
>   useFocoQueVuelve(entendidoRef.current);
                     ^^^^^^^^^^^^^^^^^^^^ Cannot access ref value during render
```

Y el test, al abrir: el foco tenía que estar en «Entendido» y se quedó en «Enviar».

</details>

<details><summary>Solución</summary>

```tsx
import { useEffect, useRef, useState, type RefObject } from "react";

export function useFocoQueVuelve(destinoRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const anterior = document.activeElement;
    destinoRef.current?.focus();
    return () => {
      if (anterior instanceof HTMLElement) anterior.focus();
    };
  }, [destinoRef]);
}

// en ConfirmacionDeEnvio:
useFocoQueVuelve(entendidoRef);
```

Mientras ConfirmacionDeEnvio se pinta por primera vez, la caja está vacía: React mete el
botón después de pintar. Con `.current` en la llamada, el hook recibía `null` y se quedaba
con él. Con la caja entera, el efecto la abre cuando ya corre, con el botón dentro.

</details>

---

## Drill 3 — `useTeclaEscape`

<details><summary>Pista 1 — conceptual</summary>

Cada render, MensajeRapido le pasa al hook una función que ve el mensaje de ese render.
¿Con cuál de todas ellas se queda tu efecto?

</details>

<details><summary>Pista 2 — más concreta</summary>

La función que recibe el hook la usa el efecto, así que va en su array de dependencias.
Así, cuando llega una nueva, el efecto quita el oyente viejo y pone uno con la nueva.

</details>

<details><summary>Pista 3 — lo que dicen el lint y el test</summary>

```
warning  React Hook useEffect has a missing dependency: 'alPulsar'. Either include it
or remove the dependency array.
```

Y el test, después de escribir «Hola» y pulsar Escape:

```
TestingLibraryElementError: Unable to find an accessible element with the role "dialog"
and name "Mensaje rápido"
```

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const alPulsarTecla = (event: KeyboardEvent) => {
    if (event.key === "Escape") alPulsar();
  };
  document.addEventListener("keydown", alPulsarTecla);
  return () => document.removeEventListener("keydown", alPulsarTecla);
}, [alPulsar]);
```

Con `[]`, el efecto corría una sola vez y su oyente llamaba siempre a la flecha del primer
render, que veía el mensaje vacío: cerraba sin preguntar. Con `[alPulsar]`, cada flecha
nueva hace limpiar el efecto y correrlo otra vez, y el oyente siempre llama a la última.

</details>

---

## Drill 4 — `MapModal`

<details><summary>Pista 1 — conceptual</summary>

Al copiar, el padre se vuelve a pintar y le pasa un onClose nuevo. ¿Qué parte del efecto
depende de onClose, y qué partes se están repitiendo sin necesitarlo?

</details>

<details><summary>Pista 2 — más concreta</summary>

Borra el efecto entero y llama a tus tres hooks arriba del componente: el del scroll sin
nada, el del foco con la caja de la ✕, y el del Escape con onClose. Cada uno trae su propio
array de dependencias.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Después de pulsar «Copiar dirección»:

```
Error: expect(element).toHaveFocus()

Expected element with focus:
  <button
  type="button"
>
  Copiar dirección
</button>
Received element with focus:
  <button
  aria-label="Cerrar mapa"
  type="button"
>
  ×
</button>
```

</details>

<details><summary>Solución</summary>

```tsx
export function MapModal({ onClose, onCopiar }: { onClose: () => void; onCopiar: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useBloquearScroll();
  useFocoQueVuelve(closeButtonRef);
  useTeclaEscape(onClose);

  return (/* el mismo JSX */);
}
```

Con un solo efecto y `[onClose]`, el onClose nuevo repetía los tres préstamos: la limpieza
devolvía el foco a «Ver mapa» y el efecto lo volvía a poner en la ✕. Partido en tres, los
tres hooks corren en cada render, pero solo vuelve a correr el efecto de useTeclaEscape, el
único que depende de onClose: quita el oyente viejo y pone el nuevo. Los otros dos tienen
`[]` y `[destinoRef]`, y la caja es la misma en todos los renders.

</details>

---

## Peldaño 4a — `MapaQueSalta`

<details><summary>Pista 1 — conceptual</summary>

El efecto solo hace el préstamo del foco. Al pulsar «Copiar dirección», ¿qué cambia de su
array? ¿Y lo usa el efecto para algo?

</details>

<details><summary>Pista 2 — más concreta</summary>

El array dice cuándo repetir el préstamo. Este solo tiene que correr al nacer y deshacerse al
morir: no depende de nada que cambie entre renders.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Después de pulsar «Copiar dirección»:

```
Error: expect(element).toHaveFocus()

Expected element with focus:
  <button
  type="button"
>
  Copiar dirección
</button>
Received element with focus:
  <button
  aria-label="Cerrar mapa"
  type="button"
>
  ×
</button>
```

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const anterior = document.activeElement;
  cerrarRef.current?.focus();
  return () => {
    if (anterior instanceof HTMLElement) anterior.focus();
  };
}, []);
```

Con `[onClose]`, cada onClose nuevo hacía correr la limpieza (el foco vuelve a «Ver mapa») y
después el cuerpo (el foco, otra vez a la ✕). Con `[]`, el cuerpo solo corre al nacer y la
limpieza al morir.

</details>

---

## Peldaño 4b — `MapaConEscape`

<details><summary>Pista 1 — conceptual</summary>

Prueba los dos arrays, `[onClose]` y `[]`, y mira qué se rompe con cada uno. ¿Hay alguno que
les sirva a los dos préstamos a la vez?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un efecto tiene un solo array. Si dos préstamos necesitan arrays distintos, cada uno va en su
propio useEffect, con el suyo.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Con el starter, después de pulsar «Copiar dirección», el mismo error que en el 4a: el foco
está en la ✕. Con `[]`, el foco ya no salta, pero al pulsar Escape:

```
TestingLibraryElementError: Unable to find an element with the text: Copias al cerrar: 1.
```

Y el lint:

```
warning  React Hook useEffect has a missing dependency: 'onClose'. Either include it or remove the dependency array.
```

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const anterior = document.activeElement;
  cerrarRef.current?.focus();
  return () => {
    if (anterior instanceof HTMLElement) anterior.focus();
  };
}, []);

useEffect(() => {
  const alPulsarTecla = (event: KeyboardEvent) => {
    if (event.key === "Escape") onClose();
  };
  document.addEventListener("keydown", alPulsarTecla);
  return () => document.removeEventListener("keydown", alPulsarTecla);
}, [onClose]);
```

Con `[onClose]`, el foco salta con cada onClose nuevo. Con `[]`, el oyente se queda con el
onClose del primer render, que apunta las copias de entonces: 0. Ningún array les sirve a los
dos, así que cada préstamo va en su efecto, con su array.

</details>

---

## Peldaño 4c — `useModal`

<details><summary>Pista 1 — conceptual</summary>

El salto no viene del componente: viene del efecto que hay dentro del hook. ¿Qué tiene tu
MapModal del 4 que este useModal no tiene?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un hook puede llamar a otros hooks. Dentro de useModal, cada préstamo tiene que ir con su
propio array: tres useEffect, o tus tres hooks del 1 al 3.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Después de pulsar «Copiar dirección», el mismo error que en el 4a:

```
Received element with focus:
  <button
  aria-label="Cerrar mapa"
  type="button"
>
  ×
</button>
```

</details>

<details><summary>Solución</summary>

```tsx
export function useModal(cerrarRef: RefObject<HTMLElement | null>, onClose: () => void): void {
  useBloquearScroll();
  useFocoQueVuelve(cerrarRef);
  useTeclaEscape(onClose);
}
```

Tres useEffect dentro de useModal, cada uno con su array, también valen. El starter ya era
un hook, pero con un solo efecto y `[cerrarRef, onClose]`: el onClose nuevo repetía los tres
préstamos. Lo que arregla el salto es que cada préstamo tenga su propio array; el hook solo
lo empaqueta para que el componente llame a una sola cosa.

</details>

---

## Peldaño 4d — `MenuConTema`

<details><summary>Pista 1 — conceptual</summary>

Es el mismo arreglo del 4, en otro componente. ¿Qué necesita cada uno de tus hooks de este
menú?

</details>

<details><summary>Pista 2 — más concreta</summary>

Borra el efecto y llama a tus tres hooks arriba del componente: el del scroll sin nada, el del
foco con la caja del primer enlace y el del Escape con onClose.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Después de pulsar «Cambiar tema»:

```
Error: expect(element).toHaveFocus()

Expected element with focus:
  <button
  type="button"
>
  Cambiar tema
</button>
Received element with focus:
  <a
  href="#servicios"
>
  Servicios
</a>
```

Si pruebas con `[]`, el foco ya no salta, pero al pulsar Escape:

```
TestingLibraryElementError: Unable to find an element with the text: Tema al cerrar: light.
```

</details>

<details><summary>Solución</summary>

```tsx
const primerEnlaceRef = useRef<HTMLAnchorElement>(null);

useBloquearScroll();
useFocoQueVuelve(primerEnlaceRef);
useTeclaEscape(onClose);
```

Los tres arrays siguen existiendo, pero ahora viven dentro de cada hook: `[]` en el scroll,
el ref en el foco y onClose en el Escape. Al cambiar el tema llega un onClose nuevo, y solo se
repite el efecto de useTeclaEscape. Es lo mismo que hiciste en el 08 con tres efectos, pero
empaquetado y reutilizable.

</details>
