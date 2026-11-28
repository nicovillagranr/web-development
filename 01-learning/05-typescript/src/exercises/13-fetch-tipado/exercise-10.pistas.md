# Pistas — exercise-10 · tu useWeather, tipado

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cinco salen rojos en el test. El 2 y el 3, además, en el compilador: son los que leen
arrays por índice. De los peldaños del 3, el 3a sale rojo en el test, el 3b y el 3c en los
dos, y el 3d solo en el compilador. De los del 5, el 5a sale rojo en los dos, y del 5b al 5d,
en el test.

Los drills 1–4 y los peldaños 3a–3d son funciones sueltas, sin red. Los peldaños 5a–5d y el
5 usan una red de mentira. Con polling (5c, 5d y 5), el test vuelve a pedir cada 0,3 s.
Valparaíso contesta el clima en 0,03 s y el aire en 0,02 s; Santiago, el clima en 0,08 s y
el aire en 0,2 s, para que dé tiempo a cambiar de ciudad con su aire en camino.

---

## Drill 1 — `HorasSchema`

<details><summary>Pista 1 — conceptual</summary>

Para el schema, cada campo que nombra es obligatorio mientras no digas lo contrario. ¿Cómo
se lo dices de is_day?

</details>

<details><summary>Pista 2 — más concreta</summary>

Lo que va detrás de is_day no cambia: sigue siendo un array de números. Solo le falta la
marca de la Teoría 1, que dice que el campo puede no venir.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: Una respuesta sin is_day tiene que pasar el parse: expected [Function] to not throw an error but '[\n  {\n    "expected": "array",\n   …' was thrown
```

Zod esperaba un array en is_day y no encontró nada. Con .nullable() sale el mismo error: la
respuesta no trae is_day con null, sino sin is_day.

</details>

<details><summary>Solución</summary>

```ts
is_day: z.array(z.number()).optional(),
```

Si is_day falta, el parse lo deja pasar; si viene, comprueba que sean números. Y Horas pasa a
tener `is_day?: number[] | undefined`: ahora el tipo también dice que puede faltar.

</details>

---

## Drill 2 — `temperaturaDe`

<details><summary>Pista 1 — conceptual</summary>

El compilador ya te dice qué pasa. Lee su mensaje y pregúntate qué es ese undefined en el
mundo real.

</details>

<details><summary>Pista 2 — más concreta</summary>

temperaturas[i] puede no existir, y Math.round solo acepta number. Guarda el elemento en una
constante, pregunta si es undefined (si lo es, devuelve null) y, debajo, redondéalo.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2345: Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
```

Y el test: `AssertionError: La hora 5 no está en el array: null: expected NaN to be null`.
Math.round(undefined) no lanza: devuelve NaN, un número que no es ningún número. Si
preguntas con `if (!grados)`, falla el último caso: 0 °C también es falsy.

</details>

<details><summary>Solución</summary>

```ts
const grados = temperaturas[i];
if (grados === undefined) return null;
return Math.round(grados);
```

Debajo del if, TypeScript sabe que grados ya no es undefined, y Math.round lo acepta. La
pregunta es por undefined y no por falsy, para que 0 siga siendo una temperatura.

</details>

---

## Peldaño 3a — `maximasPorDia`

<details><summary>Pista 1 — conceptual</summary>

La fecha la saca map de time, vuelta a vuelta. La máxima sale de otro array, y en el starter
siempre del mismo sitio.

</details>

<details><summary>Pista 2 — más concreta</summary>

map le pasa a su flecha dos cosas por vuelta: el elemento y su posición. Pídele también la
posición y úsala para leer temperature_2m_max.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: Cada fecha va con la máxima de su misma posición: expected [ …(3) ] to deeply equal [ …(3) ]

    {
      "fecha": "2026-11-24",
-     "max": 27,
+     "max": 24,
    },
```

El 24 de noviembre sale con la máxima del 23. El 25 parece bien, pero es casualidad: su 23,5
también redondea a 24.

El compilador calla: leer siempre la posición 0 es código válido, solo que lee el día que no
es.

</details>

<details><summary>Solución</summary>

```ts
return dias.time.map((fecha, i) => ({ fecha, max: temperaturaDe(dias.temperature_2m_max, i) }));
```

La fecha i de time va con la máxima i de temperature_2m_max: lo único que las une es la
posición. Con un 0 fijo, todas leían la primera.

</details>

---

## Peldaño 3b — `rangoDelDia`

<details><summary>Pista 1 — conceptual</summary>

Es tu drill 2 con dos valores, y cualquiera de los dos puede ser un hueco. El starter solo
pregunta por uno.

</details>

<details><summary>Pista 2 — más concreta</summary>

El if tiene que salir con «sin dato» si falta la mínima o si falta la máxima: las dos
preguntas en la misma condición, unidas con ||.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2345: Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
```

En el Math.round(max) de la última línea. Y el test:

```
AssertionError: Al día 2 le falta la máxima: «sin dato»: expected '11–NaN °C' to be 'sin dato'
```

</details>

<details><summary>Solución</summary>

```ts
if (min === undefined || max === undefined) return "sin dato";
```

Si cualquiera de las dos es undefined, el return sale antes. Debajo solo llega el caso en que
ninguna lo es, y TypeScript lo sabe: ahí min y max ya son number.

</details>

---

## Peldaño 3c — `fechasConMaxima`

<details><summary>Pista 1 — conceptual</summary>

map nunca cambia el largo: si entran tres fechas, salen tres cosas. Lo más que puede hacer con
el día sin máxima es poner null en su sitio.

</details>

<details><summary>Pista 2 — más concreta</summary>

El que quita elementos de un array es filter: se queda con los que hacen que su flecha
devuelva true. Puedes ponerlo detrás del map, para quitar los null, o en lugar del map,
preguntando por la máxima de i.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2322: Type '(string | null)[]' is not assignable to type 'string[]'.
```

Y el test:

```
AssertionError: Al último día le falta la máxima: su fecha no sale: expected [ '2026-11-23', '2026-11-24', null ] to deeply equal [ '2026-11-23', '2026-11-24' ]
```

</details>

<details><summary>Solución</summary>

```ts
return dias.time
  .map((fecha, i) => (dias.temperature_2m_max[i] === undefined ? null : fecha))
  .filter((fecha) => fecha !== null);
```

map marca el día con null y filter lo aparta. TypeScript deduce solo que fecha !== null deja
strings (lo hace desde la 5.5), así que el resultado ya es string[]. También vale sin map:

```ts
return dias.time.filter((_fecha, i) => dias.temperature_2m_max[i] !== undefined);
```

El _ delante de fecha les dice al compilador y al lint que no la usas a propósito.

</details>

---

## Peldaño 3d — `diasConMaxima`

<details><summary>Pista 1 — conceptual</summary>

El test pasa: al ejecutar, filter ya quita los null. Lo que falla es lo que TypeScript cree
que queda después.

</details>

<details><summary>Pista 2 — más concreta</summary>

Con : boolean, la flecha del filter solo dice sí o no, y TypeScript no saca de ahí nada sobre
el tipo. Para que sepa qué queda, el retorno de la flecha tiene que ser un predicado, como en
el bloque 05.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2322: Type '({ fecha: string; max: number; } | null)[]' is not assignable to type 'Maxima[]'.
```

Fíjate en el | null: después del filter, TypeScript sigue creyendo que puede haber null.

</details>

<details><summary>Solución</summary>

```ts
.filter((dia): dia is Maxima => dia !== null);
```

Al ejecutar hace lo mismo que con boolean. Lo que cambia es la promesa: si la flecha devuelve
true, dia es Maxima, así que lo que queda es Maxima[]. Quitar el : boolean también funciona,
porque TypeScript deduce el predicado de dia !== null por su cuenta, como en el 3c.

TypeScript no comprueba que la flecha cumpla la promesa: (dia): dia is Maxima => true también
compila, y miente. Es la última línea de tu drill 3.

</details>

---

## Drill 3 — `armarPronostico`

<details><summary>Pista 1 — conceptual</summary>

Es el drill 2 dos veces por día. Lo nuevo es qué hacer con un día al que le falta algo:
map siempre devuelve un elemento por cada uno que recibe.

</details>

<details><summary>Pista 2 — más concreta</summary>

Recorre dias.time con forEach (te da fecha e i), saca min y max a constantes, y si alguna es
undefined sáltate ese día con un return. Los días completos los vas metiendo con push en un
array de Dia que devuelves al final.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2345: Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
```

Dos veces: la mínima y la máxima. El test, con el día al que le falta la máxima:

```
AssertionError: Al último día le falta la máxima: ese día no sale: expected [ { fecha: '2026-11-23', …(2) }, …(2) ] to deeply equal [ { fecha: '2026-11-23', …(2) }, …(1) ]
```

Con el starter salían los tres días, y el último con max: NaN.

</details>

<details><summary>Solución</summary>

```ts
const pronostico: Dia[] = [];
dias.time.forEach((fecha, i) => {
  const min = dias.temperature_2m_min[i];
  const max = dias.temperature_2m_max[i];
  if (min === undefined || max === undefined) return;
  pronostico.push({ fecha, min: Math.round(min), max: Math.round(max) });
});
return pronostico;
```

El return de dentro sale de la flecha de ese día, no de armarPronostico: forEach sigue con el
siguiente. Con flatMap también se puede: `[]` para saltar el día, `[dia]` para meterlo.

</details>

---

## Drill 4 — `esDeDia`

<details><summary>Pista 1 — conceptual</summary>

Mira la ⚠️ TRAMPA de la Teoría 2. Con `=== 1`, ¿qué devuelve el starter cuando is_day no
trae la hora i?

</details>

<details><summary>Pista 2 — más concreta</summary>

Son dos preguntas en orden. Primero, ¿trae is_day la hora i? Si la trae, manda ella. Si no,
la segunda: ¿trae time la hora i? Si la trae, saca la hora con new Date(…).getHours() y
compárala con 7 y 20. Si tampoco, false.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: is_day no trae la hora 2: decide time, y son las 10:00: expected false to be true // Object.is equality
```

El compilador no dice nada en el starter: comparar undefined con 1 es legal. Te hablará si le
pasas horas.time[i] a new Date sin comprobarlo antes:

```
error TS2769: No overload matches this call.
```

new Date acepta un string, pero no un string | undefined.

</details>

<details><summary>Solución</summary>

```ts
const luz = horas.is_day?.[i];
if (luz !== undefined) return luz === 1;
const hora = horas.time[i];
if (hora === undefined) return false;
const enPunto = new Date(hora).getHours();
return enPunto >= 7 && enPunto < 20;
```

Es tu resolveIsDayValue (l.17-23) tipado: allí el hueco también se resolvía mirando la hora.
La diferencia es que aquí TypeScript te obliga a decidir qué pasa si tampoco está time[i].

</details>

---

## Peldaño 5a — `useClimaQueOlvidaElAire`

<details><summary>Pista 1 — conceptual</summary>

La tarjeta pinta tres cosas, y salen de dos sitios distintos. En el starter, cargar solo va
a uno de los dos.

</details>

<details><summary>Pista 2 — más concreta</summary>

Pide también el aire con pedirAire, con el mismo signal. Después, guarda en setClima un
objeto nuevo que junte lo de las dos: los grados y los días de pedirClima, y el aire.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el test</summary>

```
error TS2345: Argument of type '{ grados: number; dias: Dia[]; }' is not assignable to parameter of type 'SetStateAction<Clima | null>'.
  Property 'aire' is missing in type '{ grados: number; dias: Dia[]; }' but required in type 'Clima'.
```

```
Error: La API del aire contesta 32: alguien tiene que pedírselo: expect(element).toHaveTextContent()
Expected element to have text content:
  Aire: 32
Received:
  Aire: sin dato
```

Sale «sin dato» porque al ejecutar clima.aire es undefined, y la tarjeta pinta
clima.aire ?? "sin dato".

</details>

<details><summary>Solución</summary>

```ts
const { grados, dias } = await pedirClima(lat, lon, controller.signal);
const aire = await pedirAire(lat, lon, controller.signal);
setClima({ grados, aire, dias });
```

pedirClima devuelve un objeto con grados y dias. Las llaves de const { grados, dias } los
sacan a dos variables, igual que hace TarjetaWeather con lo que devuelve useWeather. Con
Promise.all también vale: las dos salen a la vez.

Poner aire: null a mano compila, pero miente: la API del aire sí contesta.

</details>

---

## Peldaño 5b — `useAireConMandoPropio`

<details><summary>Pista 1 — conceptual</summary>

Al cambiar de ciudad, React corre la limpieza del efecto de Santiago. Mira qué controller
alcanza esa limpieza, y cuál lleva el aire.

</details>

<details><summary>Pista 2 — más concreta</summary>

mandoDelAire nace dentro de cargar, y la limpieza solo ve el controller del efecto. Haz que
el aire escuche el mismo signal que el clima.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: Ya estás en Valparaíso: el aire de Santiago, que venía en camino, no puede pisarlo: expect(element).not.toBeInTheDocument()
expected document not to contain element, found <p>
  24
   °C
</p> instead
```

El clima de Santiago ya había llegado al cambiar, así que ahí la limpieza no tenía nada que
cortar. El aire seguía en camino con su propio mando y, al llegar, guarda Santiago encima de
Valparaíso. El compilador calla.

</details>

<details><summary>Solución</summary>

```ts
const aire = await pedirAire(lat, lon, controller.signal);
```

Y fuera la línea de mandoDelAire. Un solo controller por ejecución del efecto, y las dos
peticiones escuchan su signal: la limpieza corta las dos. Es tu 5c del 09 con dos peticiones,
y el bug que cazaste en tu useWeather en el 07.

</details>

---

## Peldaño 5c — `useClimaQueSigueEnSantiago`

<details><summary>Pista 1 — conceptual</summary>

Es tu 4 del 09. Al pasar a Valparaíso, la limpieza apaga una cosa y deja otra viva.

</details>

<details><summary>Pista 2 — más concreta</summary>

El intervalo de Santiago sigue llamando a cargar. Guarda su id y páralo en la limpieza, junto
al abort.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: Ya estás en Valparaíso: nadie tiene que volver a pedir Santiago: expected 4 to be 2 // Object.is equality
```

Las nuevas de Santiago nacen canceladas, porque su controller ya está abortado: no pisan
nada, pero se siguen haciendo. Van de dos en dos por el ensayo de StrictMode.

</details>

<details><summary>Solución</summary>

```ts
cargar();
const id = setInterval(cargar, cadaMs);
return () => {
  clearInterval(id);
  controller.abort();
};
```

La limpieza tiene que deshacer todo lo que montó el efecto: el intervalo y el controller.

</details>

---

## Peldaño 5d — `useReintentoQueEspera`

<details><summary>Pista 1 — conceptual</summary>

Con el polling, el starter acaba pidiendo otra vez, pero cuando le toca al intervalo.
reintentar enciende «Cargando…» y nada más.

</details>

<details><summary>Pista 2 — más concreta</summary>

Es el reintento de tu 5 del 08: un contador intento que reintentar sube y que va en las deps
del efecto, para que el efecto corra otra vez al momento.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: «Reintentar» tiene que pedir ya, sin esperar a la vuelta siguiente del polling: expect(element).not.toBeInTheDocument()
expected document not to contain element, found <p>
  Cargando…
</p> instead
```

El test mira a los 0,1 s del clic, y el intervalo vuelve a pedir cada 0,3 s.

</details>

<details><summary>Solución</summary>

```ts
const [intento, setIntento] = useState(0);
// …
}, [lat, lon, cadaMs, intento]);

function reintentar() {
  setCargando(true);
  setIntento((anterior) => anterior + 1);
}
```

Al subir intento cambia una dep: React corre la limpieza (para el intervalo y aborta) y el
efecto otra vez. Pide ya, y arranca un intervalo nuevo.

</details>

---

## Drill 5 — `useWeather`

<details><summary>Pista 1 — conceptual</summary>

Es el 5 del 08 (el reintento) con la limpieza del 5 del 09 (el polling). Lo nuevo es que
cargar pide dos cosas, el clima y el aire, con el mismo signal.

</details>

<details><summary>Pista 2 — más concreta</summary>

Cuatro useState: clima, cargando (empieza en true), error e intento. En cargar, primero
pedirClima, después pedirAire, los dos con controller.signal, y setClima con lo de los dos.
La limpieza para el intervalo y aborta el controller. En las deps, lat, lon, cadaMs e
intento.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
TestingLibraryElementError: Unable to find an element with the text: 17 °C.
```

Con el starter, cargando es siempre true. Después, el test prueba que la vuelta siguiente
pinte la temperatura nueva, que «Reintentar» pida ya y no a la vuelta siguiente del polling,
que un aire caído no tumbe el clima, y que al cambiar de ciudad lo de Santiago quede
cancelado, el aire también.

</details>

<details><summary>Solución</summary>

```ts
export function useWeather(lat: number, lon: number, cadaMs: number): EstadoDelClima {
  const [clima, setClima] = useState<Clima | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      try {
        const { grados, dias } = await pedirClima(lat, lon, controller.signal);
        const aire = await pedirAire(lat, lon, controller.signal);
        setClima({ grados, aire, dias });
        setError(null);
      } catch {
        if (controller.signal.aborted) return;
        setError("No fue posible obtener el clima");
      }
      setCargando(false);
    }

    cargar();
    const id = setInterval(cargar, cadaMs);
    return () => {
      clearInterval(id);
      controller.abort();
    };
  }, [lat, lon, cadaMs, intento]);

  function reintentar() {
    setCargando(true);
    setIntento((anterior) => anterior + 1);
  }

  return { clima, cargando, error, reintentar };
}
```

Y en el import de arriba, `import { useEffect, useState } from "react";`. Los dos bugs de tu
useWeather se van con el mismo arreglo. El aire usa el signal del controller del efecto, así
que la limpieza lo corta. Y si el clima de Santiago se cancela antes de llegar, su await
lanza, el catch se lo salta todo y el aire ni sale. Con Promise.all también vale: salen a la
vez, y la limpieza corta las dos.

</details>
