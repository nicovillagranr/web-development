# Introducción a React

## ¿Qué es React?

React es una **librería de JavaScript** enfocada en construir interfaces de usuario mediante **componentes reutilizables**.

> React no es un framework completo.

No incluye por defecto:

- Router
- Manejo de estado global
- Fetching de datos

Esto le da **flexibilidad**, pero obliga a elegir herramientas externas según el proyecto.

---

## Comparación con otros frameworks

|                      | React     | Angular            | Vue                  |
| -------------------- | --------- | ------------------ | -------------------- |
| Tipo                 | Librería  | Framework completo | Framework progresivo |
| Curva de aprendizaje | Media     | Alta               | Baja                 |
| Mercado laboral      | Alto (#1) | Medio (#2)         | Medio (#3)           |
| Mantenido por        | Meta      | Google             | Comunidad            |

### Diferencia estructural

- **Angular** → arquitectura tipo MVC (HTML + CSS + lógica separada)
- **React** → componentes (HTML + CSS + lógica en una sola unidad)

Esto hace que React sea más modular y reutilizable.

---

## ¿Cuándo usar React?

Usa React cuando:

- Necesitas una app a medida
- Quieres control total del stack
- Buscas simplicidad y modularidad
- Estás construyendo una SPA (Single Page Application)
- La aplicación requiere alta interactividad
- El SEO no es una prioridad principal
- Estás trabajando en:
  - dashboards
  - herramientas internas
  - apps con lógica compleja en el cliente

> React permite construir aplicaciones centradas en la experiencia del usuario y el manejo eficiente del estado.

### Nota sobre el contexto real

React es muy común en aplicaciones internas (privadas), donde:

- Los usuarios ya están autenticados
- No se necesita indexación en buscadores
- La prioridad es la funcionalidad, no el SEO

Sin embargo, React también se usa en aplicaciones públicas.  
Cuando el SEO o la primera carga son críticos, suelen utilizarse frameworks como Next.js.

---

## Frameworks basados en React

React por sí solo no cubre todas las necesidades de una aplicación moderna.  
Por eso existen frameworks que extienden sus capacidades:

- **Next.js**
  - Sirve para Apps privadas o publicas
  - Perfecto para gente que ya sabe React
  - Permite SSR (Server Side Rendering) y SSG (Static Site Generation)
  - Mejora el SEO y la performance inicial
  - Integra backend y frontend en un mismo proyecto
  - Necesito todo lo que me brinda?
  - Necesito SEO
  - Tiene su forma de pensar diferente - CSR - SSR - SSG

- **Remix**
  - SSR
  - SEO
  - Performance
  - Data Fetching
  - Routing
  - Comodidad
  - No hay trabajo

---

## Rendering: CSR, SSR, SSG

### CSR — Client Side Rendering

El navegador recibe un HTML casi vacío y JavaScript construye la UI.

- Ejemplo: React con Vite
- Ventajas:
  - Alta interactividad
- Desventajas:
  - Peor SEO
  - Mayor tiempo de carga inicial

---

### SSR — Server Side Rendering

El servidor genera el HTML completo en cada request.

- Ejemplo: Next.js
- Ventajas:
  - Mejor SEO
  - Mejor tiempo de carga percibido
- Desventajas:
  - Mayor carga en el servidor

---

### SSG — Static Site Generation

El HTML se genera en build time.

- Ejemplo: Next.js (`generateStaticParams`)
- Ventajas:
  - Muy rápido
- Desventajas:
  - No ideal para contenido dinámico

---

## React vs Next.js

| Usa React puro cuando... | Usa Next.js cuando...             |
| ------------------------ | --------------------------------- |
| No necesitas SEO         | Necesitas SEO (blog, landing)     |
| Haces dashboards o tools | Necesitas SSR o SSG               |
| Prototipo rápido         | Proyecto en producción            |
| Backend separado         | Quieres backend + frontend juntos |

---

## Conceptos clave de React

### Componentes

Funciones que retornan JSX. Son la unidad fundamental de React.

```jsx
function Card({ title, description }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
```
