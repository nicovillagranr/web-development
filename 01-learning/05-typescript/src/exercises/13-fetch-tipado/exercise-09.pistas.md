# Pistas — exercise-09 · el polling

Cuatro niveles por drill y por peldaño. Ábrelas **de una en una** y vuelve al archivo entre
una y la siguiente.

Los cinco drills y los seis peldaños salen rojos en el test, y el compilador no ve nada en
ningún starter. El 3 tiene además un aviso del lint.

Los drills 1–3 y el peldaño 4a no piden nada a la red, y su test usa un reloj falso:
adelanta el tiempo de golpe y cuenta lo que se apunta. En los demás, Santiago tarda 0,2 s y
Valparaíso 0,03 s, y el test vuelve a pedir cada 0,1 s. En el 4c y el 5c, cada 0,4 s: así
la respuesta tardía de Santiago se ve antes de que la tape la vuelta siguiente.

---

## Drill 1 — `useTicQueNoPara`

<details><summary>Pista 1 — conceptual</summary>

El intervalo no se entera de que el componente se fue. Alguien tiene que pararlo, y React
solo hace lo que el efecto le deja preparado.

</details>

<details><summary>Pista 2 — más concreta</summary>

Para pararlo hace falta su id, así que guarda lo que devuelve setInterval. Y el efecto
devuelve la limpieza: una función que, cuando React la llame, pare el intervalo de ese id.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: Desmontado el componente, el intervalo tiene que estar parado: ni un «tic» más: expected [ 'tic', 'tic', 'tic', 'tic', …(2) ] to deeply equal [ 'tic', 'tic', 'tic' ]
```

Tres «tic» de más: los 3 s que el test esperó con el componente ya desmontado.

</details>

<details><summary>Solución</summary>

```ts
useEffect(() => {
  const id = setInterval(() => apuntar("tic"), 1000);
  return () => clearInterval(id);
}, [apuntar]);
```

React guarda la función que devuelve el efecto y la llama al desmontar. En pnpm dev, el
ensayo de StrictMode monta, desmonta y vuelve a montar: con el starter quedaban dos
intervalos vivos, y salían dos «tic» por segundo.

</details>

---

## Drill 2 — `useTicQueNoArranca`

<details><summary>Pista 1 — conceptual</summary>

El intervalo nace bien. Lee la última línea del efecto despacio: ¿qué le devuelve a React?

</details>

<details><summary>Pista 2 — más concreta</summary>

`return clearInterval(id)` llama a clearInterval ahí mismo, mientras el efecto corre, y le
devuelve a React lo que devuelve esa llamada: undefined. El intervalo muere antes de su
primer «tic», y React no tiene ninguna limpieza que llamar. Tiene que recibir una función.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: Montado durante 3 s, el intervalo tiene que haber apuntado tres «tic»: expected [] to deeply equal [ 'tic', 'tic', 'tic' ]
```

TypeScript no se queja: un efecto puede no devolver nada, y undefined cuenta como nada.

</details>

<details><summary>Solución</summary>

```ts
return () => clearInterval(id);
```

Con la flecha delante, el efecto devuelve una función sin llamarla. React la guarda y la
llama al desmontar.

</details>

---

## Drill 3 — `useSegundos`

<details><summary>Pista 1 — conceptual</summary>

El intervalo nació en el primer render, y la función que corre es la de ese render. ¿Qué
segundos conoce esa función?

</details>

<details><summary>Pista 2 — más concreta</summary>

Dentro del intervalo, segundos vale 0 para siempre: cada vuelta hace setSegundos(0 + 1). Sin
tocar las deps, la función no puede leer el valor nuevo. Pero React sí lo conoce, y te lo
pasa si a setSegundos le das una función en vez de un número.

</details>

<details><summary>Pista 3 — lo que dicen el test y el lint</summary>

```
AssertionError: A los 3 s, la cuenta tiene que ir en 3: expected 1 to be 3 // Object.is equality
```

```
React Hook useEffect has a missing dependency: 'segundos'. Either include it or remove the dependency array. You can also do a functional update 'setSegundos(s => ...)' if you only need 'segundos' in the 'setSegundos' call  react-hooks/exhaustive-deps
```

El lint ofrece las dos salidas. La primera, poner segundos en las deps, es la ⚠️ TRAMPA: el
test cuenta cuántas veces nace el intervalo, y con segundos en las deps nace cuatro veces en
3 s.

</details>

<details><summary>Solución</summary>

```ts
const id = setInterval(() => setSegundos((anterior) => anterior + 1), 1000);
```

React llama a la flecha con el valor más nuevo, sea cual sea el render en que nació el
intervalo. En el 08 daba igual cuál de las dos formas usaras; aquí, con un intervalo, solo
funciona esta.

</details>

---

## Peldaño 4a — `useRelojQueSeQueda`

<details><summary>Pista 1 — conceptual</summary>

Es tu drill 1, pero aquí no desmontas: cambias de ciudad. Para el efecto de Santiago, eso
también es su final.

</details>

<details><summary>Pista 2 — más concreta</summary>

Al pasar a Valparaíso, React llama a la limpieza del efecto de Santiago justo antes de
correr el de Valparaíso. El starter no le deja ninguna: guarda el id del reloj y devuelve una
limpieza que lo pare.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: Ya estás en Valparaíso: el reloj de Santiago no puede seguir apuntando: expected [ 'pido Santiago', …(3) ] to deeply equal [ Array(2) ]
```

Después de pasar a Valparaíso, el test espera dos «pido Valparaíso». Con el starter llegan
cuatro líneas: «pido Santiago» y «pido Valparaíso», dos veces, porque los dos relojes siguen
vivos.

</details>

<details><summary>Solución</summary>

```ts
useEffect(() => {
  const id = setInterval(() => apuntar(`pido ${ciudad}`), 1000);
  return () => clearInterval(id);
}, [ciudad, apuntar]);
```

Al cambiar ciudad, React llama primero a la limpieza que dejó Santiago, y para su reloj.
Después corre el efecto con Valparaíso, que arranca un reloj nuevo. Solo queda uno vivo.

</details>

---

## Peldaño 4b — `useClimaQueLlegaTarde`

<details><summary>Pista 1 — conceptual</summary>

Aquí no hay reloj: lo único vivo es la petición que va en camino. ¿Quién la corta cuando
cambias de ciudad?

</details>

<details><summary>Pista 2 — más concreta</summary>

El controller ya existe, y su signal ya va en la petición, pero nadie lo usa para cortarla.
El sitio es la limpieza: React la llama al pasar a Valparaíso, justo cuando la de Santiago
todavía va en camino. Es lo que cerraste en el 07.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: Ya estás en Valparaíso: la respuesta de Santiago, que venía en camino, no puede pisarlo: expect(element).not.toBeInTheDocument()
```

En el test, Valparaíso llega a los 0,03 s y Santiago a los 0,2 s. Como nadie cortó
Santiago, su setGrados llega el último y gana: se ven 24 °C.

</details>

<details><summary>Solución</summary>

```ts
cargar();
return () => controller.abort();
```

abort() hace que la petición de Santiago rechace al momento. Cae en el catch, que se calla,
y su setGrados ya no corre nunca.

</details>

---

## Peldaño 4c — `useClimaQueSeCruza`

<details><summary>Pista 1 — conceptual</summary>

Cuenta lo que deja vivo el efecto de Santiago, y tacha lo que ya para la limpieza. ¿Qué
queda sin tachar?

</details>

<details><summary>Pista 2 — más concreta</summary>

Quedan dos cosas vivas, y la limpieza para una: el reloj. La petición que iba en camino
llega igual, y su setGrados pisa a Valparaíso, como en el 4b. La limpieza tiene que cortar
también esa, sin dejar de parar el reloj.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: Ya estás en Valparaíso: la respuesta de Santiago, que venía en camino, no puede pisarlo: expect(element).not.toBeInTheDocument()
```

Aquí el test vuelve a pedir cada 0,4 s. Santiago llega a los 0,2 s y se queda en pantalla
hasta la vuelta siguiente de Valparaíso. Si cambias una línea de la limpieza por la otra,
en vez de sumarla, sale otro mensaje: «El reloj de Santiago tiene que seguir parado».

</details>

<details><summary>Solución</summary>

```ts
return () => {
  clearInterval(id);
  controller.abort();
};
```

Dos cosas vivas, dos líneas: clearInterval hace que no salga ninguna vuelta más, y abort()
corta la que va en camino.

</details>

---

## Drill 4 — `useClimaQueSigue`

<details><summary>Pista 1 — conceptual</summary>

La limpieza ya hace un trabajo. Cuenta cuántas cosas deja vivas cada ejecución del efecto.

</details>

<details><summary>Pista 2 — más concreta</summary>

Son dos: la petición que está en camino y el intervalo. abort() corta la primera; el
intervalo sigue llamando a cargar con lat y lon de Santiago. Las peticiones que hace nacen
ya canceladas, porque usan el mismo controller, pero se siguen haciendo. Guarda el id del
intervalo y páralo también.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: Ya estás en Valparaíso: nadie tiene que volver a pedir Santiago: expected 8 to be 2 // Object.is equality
```

Dos peticiones de Santiago son las buenas: la del ensayo de StrictMode y la de verdad. Las
otras seis las hicieron los dos intervalos de Santiago, el del ensayo y el de verdad, que
nadie paró.

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

Si cambias abort() por clearInterval() en vez de sumarlo, el test también falla: la
petición de Santiago que estaba en camino llegaría tarde y pisaría a Valparaíso.

</details>

---

## Peldaño 5a — `useClimaConAvisoQueNoSeVa`

<details><summary>Pista 1 — conceptual</summary>

Es el aviso pegado del 08, pero ahora el reintento no lo pulsa nadie: lo hace el reloj.

</details>

<details><summary>Pista 2 — más concreta</summary>

error solo se escribe cuando una vuelta falla. Cuando una sale bien, nadie lo vuelve a poner
a null, y la tarjeta pregunta primero por error: nunca llega a la temperatura. La vuelta que
sale bien tiene que borrar el aviso.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: La vuelta siguiente salió bien: el aviso tiene que irse: expect(element).not.toBeInTheDocument()
```

Valparaíso contesta 16,8, luego un 500 y luego 18,2. Con el starter, el aviso del 500 sigue
ahí cuando ya llegó el 18,2.

</details>

<details><summary>Solución</summary>

```ts
try {
  setGrados(await pedirTemperatura(lat, lon, controller.signal));
  setError(null);
} catch {
```

Cada vuelta que sale bien deja error en null, así que el aviso dura solo hasta la siguiente
vuelta buena.

</details>

---

## Peldaño 5b — `useClimaConFalsaAlarma`

<details><summary>Pista 1 — conceptual</summary>

Al cambiar de ciudad, la limpieza aborta la petición de Santiago. ¿Por dónde sale una
petición abortada?

</details>

<details><summary>Pista 2 — más concreta</summary>

Una petición abortada rechaza, así que cae en el mismo catch que un 500. Antes de poner el
aviso, el catch tiene que preguntarle al signal si la cancelaron: la guardia del 05 y del 06.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: Nada falló: la limpieza canceló la petición de Santiago, y una cancelada no deja aviso: expect(element).not.toBeInTheDocument()
```

El test mira la pantalla 5 ms después de pasar a Valparaíso. Valparaíso todavía no llegó,
pero el aviso ya está puesto.

</details>

<details><summary>Solución</summary>

```ts
} catch {
  if (controller.signal.aborted) return;
  setError("No fue posible obtener el clima");
}
```

Si el signal está abortado, el fallo lo provocó tu propia limpieza: el catch se calla. Un
500 de verdad no aborta el signal, así que sigue poniendo el aviso.

</details>

---

## Peldaño 5c — `useClimaConMandoPorVuelta`

<details><summary>Pista 1 — conceptual</summary>

Mira dónde nace el controller y desde dónde lo tiene que alcanzar la limpieza.

</details>

<details><summary>Pista 2 — más concreta</summary>

Cada vuelta crea su controller dentro de cargar. La limpieza está fuera de cargar y no ve
ninguno, así que no puede abortar la petición de Santiago que va en camino. Es la TRAMPA de
la Teoría 2: un solo controller por ejecución del efecto sirve para todas sus vueltas, y la
limpieza sí lo alcanza.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: Ya estás en Valparaíso: la respuesta de Santiago, que venía en camino, no puede pisarlo: expect(element).not.toBeInTheDocument()
```

El mismo fallo que el 4c, por otro motivo: allí faltaba la línea, y aquí la línea no tiene
a quién llamar.

</details>

<details><summary>Solución</summary>

```ts
useEffect(() => {
  const controller = new AbortController();

  async function cargar() {
    try {
      setGrados(await pedirTemperatura(lat, lon, controller.signal));
      setError(null);
    } catch {
      if (controller.signal.aborted) return;
      setError("No fue posible obtener el clima");
    }
  }

  cargar();
  const id = setInterval(cargar, cadaMs);
  return () => {
    clearInterval(id);
    controller.abort();
  };
}, [lat, lon, cadaMs]);
```

El controller nace una vez por ejecución, fuera de cargar: todas las vueltas de Santiago
usan su signal, y la limpieza de Santiago lo alcanza. Una vez abortado, las vueltas que
quedaran nacerían ya canceladas, pero clearInterval hace que no salga ninguna más.

</details>

---

## Drill 5 — `useClimaQueSeRefresca`

<details><summary>Pista 1 — conceptual</summary>

Es tu useClima del 07 más la limpieza del 4. ¿Qué tiene que poner a cero cada vuelta que sale
bien?

</details>

<details><summary>Pista 2 — más concreta</summary>

Dos useState: grados y error. El efecto, como el del 4 arreglado, con cargar en su try/catch
y su guardia. Cuando una vuelta sale bien, borra el aviso de la que falló antes (el drill 3
del 08).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
TestingLibraryElementError: Unable to find an element with the text: 17 °C.
```

Con el starter, grados es siempre null. Después, el test prueba tres cosas, cada una con su
mensaje: que a la vuelta siguiente se pinte la temperatura nueva, que una vuelta buena borre
el aviso de la mala, y que al cambiar de ciudad y al desmontar nadie siga pidiendo.

</details>

<details><summary>Solución</summary>

```ts
export function useClimaQueSeRefresca(lat: number, lon: number, cadaMs: number): ClimaAlDia {
  const [grados, setGrados] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      try {
        setGrados(await pedirTemperatura(lat, lon, controller.signal));
        setError(null);
      } catch {
        if (controller.signal.aborted) return;
        setError("No fue posible obtener el clima");
      }
    }

    cargar();
    const id = setInterval(cargar, cadaMs);
    return () => {
      clearInterval(id);
      controller.abort();
    };
  }, [lat, lon, cadaMs]);

  return { grados, error };
}
```

Al desmontar, clearInterval hace que no salga ninguna vuelta más, y abort() corta la que
estaba en camino. Su catch la reconoce por signal.aborted y no deja aviso.

</details>
