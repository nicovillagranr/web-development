# README – Meta Tags Dinámicos

## Descripción
Este módulo describe cómo modificar meta tags en tiempo real para actualizar SEO, Open Graph y propiedades visuales del navegador sin recargar la página.

## Ejemplo en JavaScript
```html
<head>
  <title>Producto A</title>
  <meta name="description" content="Descripción inicial">
  <meta property="og:title" content="Producto A">
</head>
<body>
  <button id="cambiar">Cambiar Metadata</button>
</body>

<script>
document.getElementById("cambiar").addEventListener("click", () => {
  document.title = "Producto B";

  const description = document.querySelector('meta[name="description"]');
  description.setAttribute("content", "Nuevo contenido dinámico para SEO.");

  const ogTitle = document.querySelector('meta[property="og:title"]');
  ogTitle.setAttribute("content", "Producto B");
});
</script>
```