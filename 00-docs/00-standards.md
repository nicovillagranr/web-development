# 01-standards.md

**Guía de estándares y buenas prácticas del repositorio Front-End**

Este documento establece las reglas de estilo, organización,
arquitectura y calidad que guían todos los proyectos dentro de este
repositorio. Su objetivo es mantener consistencia, claridad y
profesionalismo a lo largo del tiempo.

## 1. Convenciones de código

### JavaScript / React

-   Usar camelCase para variables y funciones.
-   Usar PascalCase para componentes de React.
-   Usar kebab-case para nombres de archivos.
-   Preferir const y let sobre var.
-   Evitar funciones demasiado largas; dividir en funciones pequeñas y
    reutilizables.
-   Los imports van siempre al inicio del archivo, ordenados por origen.
-   No dejar console.log en código destinado a producción.
-   Comillas simples `' '` como estándar.
-   Mantener un máximo de 100 o 120 caracteres por línea.
-   Evitar lógica compleja dentro del JSX; extraer funciones fuera del
    render.

### HTML

-   Usar etiquetas semánticas siempre que sea posible.
-   Mantener el contenido estructurado y limpio.
-   Todo contenido multimedia debe tener alternativas accesibles.

### CSS

-   Usar kebab-case para clases.
-   Practicar consistencia en spacing, colores y tipografías.
-   Evitar IDs para estilos, preferir clases.
-   Uso moderado de !important (solo cuando sea estrictamente
    necesario).

## 2. Estructura general recomendada

    src/
      components/
      pages/
      hooks/
      utils/
      services/
      assets/
      styles/

## 3. Estándar de estilos

-   Definir sistema de colores y tipografías desde el inicio.
-   Usar variables en :root.
-   Usar rem como unidad base.
-   Breakpoints:

```{=html}
<!-- -->
```
    mobile: 480px
    tablet: 768px
    desktop: 1024px
    large-desktop: 1440px

## 4. Buenas prácticas generales

-   Escribir código simple y claro.
-   Evitar duplicación innecesaria.
-   Extraer lógica compleja fuera de componentes.
-   Documentar funciones complejas.
-   Mantener commits pequeños.
-   Evitar dependencias innecesarias.
-   Minimizar renders innecesarios.

## 5. Control de versiones

### Ramas

-   main
-   dev
-   feature/nombre
-   fix/nombre

### Commits

    tipo(scope): descripción

## 6. Testing

-   Tests unitarios para funciones críticas.
-   Tests de render para componentes importantes.

## 7. Accesibilidad

-   Todas las imágenes con alt.
-   Inputs con label.
-   Contraste mínimo AA.
-   Foco visible.
-   Semántica correcta.

## 8. Performance

-   Lazy loading.
-   Assets optimizados.
-   Minimizar renders.
-   code-splitting.
-   Optimizar imágenes.

## 9. Documentación interna

-   README por proyecto.
-   Explicar intención en comentarios.

## 10. Filosofía del repositorio

Mantener orden, claridad, buenas prácticas y crecimiento técnico
sostenido.
