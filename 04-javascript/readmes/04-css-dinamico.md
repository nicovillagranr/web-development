# README – CSS Dinámico

## Descripción
Permite cambiar estilos en tiempo real usando clases o variables CSS sin modificar archivos estáticos.

## Ejemplo en JavaScript
```html
<style>
  :root {
    --color-principal: blue;
  }
  body {
    background: var(--color-principal);
  }
</style>

<button id="tema">Cambiar tema</button>

<script>
document.getElementById("tema").addEventListener("click", () => {
  document.documentElement.style.setProperty("--color-principal", "crimson");
});
</script>
```