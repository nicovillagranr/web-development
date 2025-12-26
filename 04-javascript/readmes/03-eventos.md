# README – Manejo de Eventos

## Descripción
Los eventos permiten reaccionar a acciones del usuario como clics, teclado, scroll o foco, generando interacción dinámica.

## Ejemplo en JavaScript
```html
<input id="buscador" placeholder="Escribe aquí...">
<p id="log"></p>

<script>
document.getElementById("buscador").addEventListener("keyup", event => {
  document.getElementById("log").textContent = `Entrada actual: ${event.target.value}`;
});
</script>
```