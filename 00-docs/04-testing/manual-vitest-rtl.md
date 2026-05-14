# Manual de Testing — Vitest + React Testing Library

> **Audiencia:** vos mismo dentro de 3 meses, cuando ya hayas olvidado cómo se configuraba esto.
> **Objetivo:** llegar de "nunca escribí un test" a "puedo testear un componente React solo".

---

## Parte 1 — La intuición primero (antes del código)

### ¿Qué es un test?

Un test es **código que ejecuta otro código y verifica que el resultado sea el esperado**. Si el resultado coincide → ✅ pasa. Si no → ❌ falla con un mensaje que te dice qué se esperaba y qué pasó.

Nada más. No hay magia.

### ¿Por qué se testea?

1. **Confianza al refactorizar.** Cambiás algo, corrés los tests, si están verdes sabés que no rompiste lo que ya funcionaba.
2. **Documentación viva.** Un test bien escrito dice "este componente se usa así y devuelve esto" mejor que cualquier README.
3. **En entrevistas:** "¿tenés experiencia con tests?" es pregunta de filtro. Tener tests reales en tu portfolio te diferencia del 80% de juniors.

### ¿Qué NO es testear?

- No es escribir un test por cada función (eso lleva a tests inútiles).
- No es perseguir 100% de coverage (métrica engañosa).
- No es testear que React funciona (React ya está testeado por Meta).

### La pregunta que guía todo test

> **"¿Qué pasaría si esto se rompe sin que me dé cuenta?"**

Si la respuesta es "nada importante" → no lo testees.
Si la respuesta es "un usuario verá algo roto" o "una entrevista lo encontraría" → testealo.

---

## Parte 2 — El vocabulario que necesitás

Memorizá estos 7 términos. Todo lo demás se deriva.

| Término         | Qué es                                                                                  |
| --------------- | --------------------------------------------------------------------------------------- |
| **Test runner** | El programa que ejecuta tus tests y reporta los resultados. En nuestro caso: Vitest.    |
| **Suite**       | Un archivo `.test.jsx` que agrupa varios tests relacionados.                            |
| **Test (`it`)** | Una función con nombre que prueba **un solo comportamiento**.                           |
| **Assertion**   | Una afirmación dentro del test: `expect(algo).toBe(otraCosa)`.                          |
| **Matcher**     | El método encadenado a `expect`: `.toBe`, `.toHaveAttribute`, `.toBeInTheDocument`.     |
| **Mock**        | Un objeto falso que reemplaza algo real (una API, una prop, una función).               |
| **jsdom**       | Una simulación del navegador (DOM) que corre en Node, sin abrir Chrome.                 |

---

## Parte 3 — La anatomía de un test

Todo test, sin excepción, tiene tres fases. En inglés se llaman **AAA**: Arrange, Act, Assert.

```js
it("descripción de lo que se prueba en un idioma humano", () => {
  // 1. ARRANGE — preparo el escenario
  const project = { name: "Glossy", path: "https://x.com", ... };
  render(<ProjectCard project={project} />);

  // 2. ACT — ejecuto la acción a probar
  //    (a veces no hace falta: si solo verifico render, esta fase es vacía)
  const link = screen.getByLabelText(/abrir demo/i);

  // 3. ASSERT — verifico el resultado
  expect(link).toHaveAttribute("href", "https://x.com/");
});
```

**Regla de oro:** un test prueba **una sola cosa**. Si tu test tiene 5 `expect`, probablemente debería ser 5 tests.

### Naming de tests

El nombre del test es **una oración que describe el comportamiento**, no una etiqueta técnica.

❌ Mal: `it("ProjectCard works", ...)`
❌ Mal: `it("test 1", ...)`
✅ Bien: `it("usa loading=eager cuando priority es true", ...)`
✅ Bien: `it("no renderiza el link al repo si project.repo es null", ...)`

Si no podés escribir el nombre, es señal de que no sabés qué estás testeando.

---

## Parte 4 — Setup desde cero (paso a paso)

### Paso 1: Instalar las dependencias

```bash
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Cada paquete tiene **una sola responsabilidad**:

- **vitest:** corre los tests, reporta resultados.
- **@testing-library/react:** te da `render()` (montar componente) y `screen` (buscar elementos).
- **@testing-library/jest-dom:** matchers extra (`toBeInTheDocument`, `toHaveAttribute`, `toBeDisabled`, etc.).
- **jsdom:** el DOM virtual donde se monta el componente.

### Paso 2: Configurar Vitest

En `vite.config.js` agregás el bloque `test`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",       // los tests corren en DOM virtual, no en Node puro
    globals: true,              // permite usar `it`, `expect`, `describe` sin importarlos
    setupFiles: "./test/setup.js", // archivo que se ejecuta antes de cada suite
  },
});
```

### Paso 3: Crear el archivo de setup

`test/setup.js`:

```js
import "@testing-library/jest-dom";
```

Esa única línea registra los matchers extra. Sin eso, `toBeInTheDocument()` da error.

### Paso 4: Agregar scripts en `package.json`

```json
"scripts": {
  "test": "vitest",
  "test:run": "vitest run",
  "test:ui": "vitest --ui"
}
```

- `npm test` → modo watch (se queda corriendo, re-ejecuta al guardar).
- `npm run test:run` → una sola corrida (lo que se usa en CI).
- `npm run test:ui` → abre una UI en el navegador (opcional, instalando `@vitest/ui`).

### Paso 5: Probar que funciona

Crear `src/sanity.test.js`:

```js
it("1 + 1 = 2", () => {
  expect(1 + 1).toBe(2);
});
```

Correr `npm test`. Si ves ✅ verde, el setup está listo. Borrá el archivo y empezá con los tests reales.

---

## Parte 5 — Las dos funciones que vas a usar el 90% del tiempo

### `render(<Component />)`

Monta el componente en el DOM virtual. Después de llamarla, el componente **existe** (aunque no lo veas).

```js
render(<ProjectCard project={mockProject} index={0} />);
```

**Importante:** no devuelve nada que necesites guardar en una variable. El componente queda accesible vía `screen`.

### `screen` — la API de búsqueda

Es un objeto con métodos para buscar elementos. Tres familias:

| Prefijo    | Comportamiento                                                |
| ---------- | ------------------------------------------------------------- |
| `getBy*`   | Busca y devuelve. Si no encuentra → **falla el test**.        |
| `queryBy*` | Busca. Si no encuentra → devuelve `null` (no falla).          |
| `findBy*`  | Espera asincrónicamente hasta encontrarlo (para tests async). |

**Cuándo usar cada uno:**

- `getBy*` → "esto **debe** existir". El caso normal.
- `queryBy*` → "esto **no** debe existir" (`expect(...).toBeNull()`).
- `findBy*` → "esto va a aparecer después de un fetch/promise".

### Los métodos de búsqueda más usados (en orden de prioridad)

Testing Library tiene una **filosofía**: testear como un usuario, no como el código. Por eso te empuja a buscar en este orden:

1. **`getByRole("button", { name: /enviar/i })`** — el más recomendado. Busca por rol semántico + accessible name.
2. **`getByLabelText(/email/i)`** — para inputs con label asociado.
3. **`getByText(/hola mundo/i)`** — texto visible.
4. **`getByAltText(/preview/i)`** — para imágenes.
5. **`getByTestId("submit-btn")`** — último recurso. Implica agregar `data-testid="..."` en el JSX. **Evitar si se puede.**

**¿Por qué este orden?** Porque un test que busca por `role` o `label` también verifica que tu HTML sea accesible. Si tu componente no tiene buenos roles, los tests duelen — y eso es una señal, no un bug.

---

## Parte 6 — `expect` y los matchers

`expect(algo)` envuelve un valor. Después encadenás un matcher que afirma algo sobre ese valor.

### Matchers básicos (vienen de Vitest)

```js
expect(x).toBe(5);                  // igualdad estricta (===)
expect(obj).toEqual({ a: 1 });      // igualdad profunda
expect(arr).toHaveLength(3);
expect(value).toBeTruthy();
expect(value).toBeNull();
expect(arr).toContain("React");
expect(fn).toThrow();
```

### Matchers de DOM (vienen de @testing-library/jest-dom)

```js
expect(element).toBeInTheDocument();
expect(element).toHaveAttribute("href", "https://x.com");
expect(element).toHaveTextContent("Hola");
expect(element).toHaveClass("active");
expect(input).toBeDisabled();
expect(input).toBeChecked();
expect(input).toHaveValue("texto");
```

### Negar un matcher

Cualquier matcher se puede negar con `.not`:

```js
expect(element).not.toBeInTheDocument();
expect(button).not.toBeDisabled();
```

---

## Parte 7 — Tu primer test real, comentado línea por línea

Imaginá testear `ProjectCard.jsx`. El componente recibe un `project` y muestra nombre, descripción, link al demo.

```js
// 1. Importar lo necesario
import { render, screen } from "@testing-library/react";
import ProjectCard from "./ProjectCard";

// 2. Crear un mock que represente un project válido típico
const project = {
  name: "Glossy Touch",
  path: "https://glossy.example.com",
  description: "Landing premium",
  stack: ["React 19", "Tailwind v4"],
  type: "Landing",
  status: "online",
  image: "/preview.png",
  deploy: "Vercel",
  repo: "https://github.com/x/glossy",
};

// 3. Escribir el test
it("muestra el nombre y la descripción del proyecto", () => {
  // ARRANGE: monto el componente con el mock
  render(<ProjectCard project={project} index={0} />);

  // ACT: (sin acción — solo verifico render)

  // ASSERT: busco los textos en pantalla
  expect(screen.getByText("Glossy Touch")).toBeInTheDocument();
  expect(screen.getByText("Landing premium")).toBeInTheDocument();
});
```

Si guardás eso en `ProjectCard.test.jsx` y corrés `npm test`, Vitest detecta el archivo, monta el componente, busca los textos, y reporta verde si los encuentra.

---

## Parte 8 — Patrones que vas a repetir mil veces

### Patrón A: Verificar atributo de un link

```js
it("el link de demo abre en pestaña nueva", () => {
  render(<ProjectCard project={project} index={0} />);
  const link = screen.getByLabelText(/abrir demo/i);
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
});
```

### Patrón B: Verificar que algo NO existe (renderizado condicional)

```js
it("no muestra el botón de repo si project.repo es null", () => {
  const sinRepo = { ...project, repo: null };
  render(<ProjectCard project={sinRepo} index={0} />);
  expect(screen.queryByLabelText(/repositorio/i)).toBeNull();
});
```

⚠️ Acá usás `queryBy*` (no `getBy*`), porque `getBy*` falla si no encuentra y vos justamente querés que no encuentre.

### Patrón C: Verificar comportamiento según una prop

```js
it("usa loading=eager cuando priority=true", () => {
  render(<ProjectCard project={project} index={0} priority />);
  const img = screen.getByAltText(/preview de glossy/i);
  expect(img).toHaveAttribute("loading", "eager");
});

it("usa loading=lazy cuando priority=false (default)", () => {
  render(<ProjectCard project={project} index={0} />);
  const img = screen.getByAltText(/preview de glossy/i);
  expect(img).toHaveAttribute("loading", "lazy");
});
```

### Patrón D: Simular un click (con userEvent)

```js
import userEvent from "@testing-library/user-event";

it("llama a onSelect al hacer click", async () => {
  const onSelect = vi.fn(); // vi.fn() crea una función espía
  render(<MyButton onClick={onSelect} />);

  await userEvent.click(screen.getByRole("button"));

  expect(onSelect).toHaveBeenCalledTimes(1);
});
```

---

## Parte 9 — Qué testear y qué NO

### ✅ Testeá

- **Lógica de UI condicional:** "si la prop X es Y, se muestra Z".
- **Accesibilidad básica:** "el botón tiene aria-label", "el link tiene href correcto".
- **Hooks custom:** lo que devuelven en distintos estados (loading, error, success).
- **Edge cases:** props vacías, arrays vacíos, valores null.
- **Bugs que ya pasaron:** cuando arreglás un bug, escribí un test que lo cubra para que no vuelva.

### ❌ NO testees

- **Clases de Tailwind/CSS** (frágiles, miden implementación).
- **Animaciones, transitions** (CSS, no lógica).
- **Librerías externas** (React, react-router — ellos ya tienen sus tests).
- **Implementación interna:** "el componente usa useState con un valor inicial X". Lo que importa es el comportamiento visible, no cómo está hecho.
- **Snapshots gigantes:** romper al cambiar 1 carácter, ignorados, inútiles.

**Regla:** testeá el **comportamiento**, no la **implementación**. Si refactorizás internamente y los tests siguen pasando → bien escritos. Si refactorizás y se rompen aunque el componente siga funcionando → mal escritos.

---

## Parte 10 — Errores comunes y cómo debuggear

### "No se encontró el elemento"

```
TestingLibraryElementError: Unable to find an element by: [aria-label="..."]
```

**Causa:** el selector está mal o el componente no renderiza lo esperado.

**Cómo debuggear:** agregás `screen.debug()` antes del assert. Eso imprime el HTML del DOM virtual en consola, así ves qué se renderizó realmente.

```js
render(<ProjectCard project={project} index={0} />);
screen.debug(); // imprime el HTML actual
const link = screen.getByLabelText(/demo/i);
```

### "ReferenceError: it is not defined"

**Causa:** falta `globals: true` en `vite.config.js`, o no estás usando Vitest sino otro runner.

### "TypeError: Cannot read properties of undefined"

**Causa:** alguna prop del componente es `undefined` en el mock. Revisá que el mock incluya todo lo que el componente desestructura.

### Los matchers tipo `toBeInTheDocument` no existen

**Causa:** falta el `setup.js` con `import "@testing-library/jest-dom"`, o `setupFiles` no está en `vite.config.js`.

---

## Parte 11 — El flujo mental cuando vas a testear un componente nuevo

1. **Leé el componente.** ¿Qué props recibe? ¿Qué renderiza condicionalmente? ¿Qué eventos dispara?
2. **Hacé una lista de comportamientos visibles.** No de funciones internas — de cosas que el usuario ve o hace.
3. **Por cada comportamiento, una pregunta:** "¿qué pasaría si esto se rompe sin que me dé cuenta?". Si la respuesta importa, ese es un test.
4. **Escribí el nombre del test antes que el código.** "muestra X cuando Y". Si no podés nombrarlo, no lo entendés todavía.
5. **AAA:** arrange, act, assert. Un solo `expect` por test si es posible (a veces 2-3 si son del mismo comportamiento).
6. **Corré `npm test`** y ajustá hasta que esté verde.

---

## Parte 12 — El switch en la cabeza

El "click" mental llega cuando entendés esto:

> Un test es **un usuario fake automatizado**. `render` lo sienta frente a la pantalla. `screen` le da ojos para buscar cosas. `userEvent.click` le da manos para tocar. `expect` es vos preguntándole "¿viste tal cosa?" y él te responde sí o no.

Cuando dejes de pensar en "el código que estoy testeando" y empieces a pensar en "el usuario que está interactuando con esto", **el switch ya hizo click**. Todo lo demás es práctica.

---

## Apéndice — Recursos para profundizar

- **Testing Library docs:** https://testing-library.com/docs/react-testing-library/intro/
- **Vitest docs:** https://vitest.dev/
- **Kent C. Dodds blog** (creador de Testing Library): https://kentcdodds.com/blog (filtrar por "testing")
- **Common mistakes:** https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

---

**Última actualización:** 2026-05-14
**Próximo paso recomendado:** abrir `00-hosting/src/Components/2-Main/2-Catalog/ProjectCard.jsx`, instalar Vitest, escribir el primer test (Parte 7) y verlo en verde.
