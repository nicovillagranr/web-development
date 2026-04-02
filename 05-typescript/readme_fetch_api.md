# Guía Práctica: Fetch API en JavaScript

Este documento te sirve como punto de partida para entender Fetch API, dominar los conceptos clave y empezar a aplicarlo en proyectos reales.

---

## 1. ¿Qué es Fetch API?
Fetch es una interfaz nativa del navegador para hacer solicitudes HTTP de forma moderna y basada en promesas. Permite consumir APIs, enviar datos y manejar respuestas sin depender de librerías externas.

---

## 2. Solicitud GET básica
```js
fetch("https://api.example.com/data")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Flujo principal:
1. `fetch()` envía la solicitud.
2. La respuesta llega como un objeto `Response`.
3. Se transforma usando `.json()`.
4. Se maneja la data.

---

## 3. Uso con async/await
```js
async function getData() {
  try {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

---

## 4. Envío de datos con POST
```js
async function sendData() {
  const payload = {
    name: "Nico",
    age: 22
  };

  const res = await fetch("https://api.example.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  console.log(data);
}
```

### Claves:
- `method`: tipo de solicitud.
- `headers`: información adicional.
- `body`: datos enviados.

---

## 5. Manejo de errores como un profesional
Fetch no lanza error por códigos como 400 o 500, solo por fallos de red.

```js
async function safeFetch(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Solicitud fallida:", err.message);
  }
}
```

---

## 6. Parámetros en URLs
```js
const city = "Santiago";
const url = `https://api.example.com/weather?city=${city}`;
```

---

## 7. Fetch con AbortController (cancelar solicitudes)
```js
const controller = new AbortController();
const signal = controller.signal;

fetch("https://api.example.com/data", { signal })
  .then(res => res.json())
  .then(data => console.log(data));

// Cancelar
controller.abort();
```

---

## 8. Control avanzado: timeout manual
```js
function fetchWithTimeout(url, ms) {
  const controller = new AbortController();

  const timeout = setTimeout(() => controller.abort(), ms);

  return fetch(url, { signal: controller.signal })
    .finally(() => clearTimeout(timeout));
}
```

---

## 9. Casos de uso reales
### a) Webs que consumen APIs públicas
- Clima
- Noticias
- Criptomonedas
- Pokémon API

### b) Formularios conectados a un backend
- Login
- Registro
- Contacto

### c) Dashboards y paneles administrativos
- Listar datos
- Editar
- Eliminar

---

## 10. Buenas prácticas
- Siempre manejar errores.
- Validar respuestas antes de usarlas.
- Usar `async/await` para código más claro.
- No mezclar `then` con `async`.
- Evitar duplicar URLs usando variables base.
- Mantener funciones de API separadas del UI.

---

## 11. Mini proyecto sugerido
Construye un *Weather Widget*:
1. Input de ciudad.
2. Consumir API de clima.
3. Renderizar temperatura y descripción.
4. Mostrar loading y manejar errores.

---

## 12. Recursos recomendados
- MDN: Fetch API
- MDN: Response y Request
- HTTP Status Codes

---

## 13. Próximos pasos
- Practicar con APIs reales.
- Integrar Fetch en proyectos React usando `useEffect`.
- Aprender manejo de estados de carga y error.
- Conectar un backend propio.

---

Este README queda listo para usar como referencia mientras desarrollas tus primeros proyectos con Fetch API.

