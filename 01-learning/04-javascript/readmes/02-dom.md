# README – Manipulación del DOM

## Descripción
Permite crear, eliminar y modificar elementos HTML en tiempo real para actualizar la interfaz sin recarga.

## Ejemplo en JavaScript
```html
<div id="app"></div>
<button id="agregar">Agregar tarjeta</button>

<script>
document.getElementById("agregar").addEventListener("click", () => {
  const card = document.createElement("div");
  card.className = "card";
  card.textContent = "Soy una tarjeta generada dinámicamente.";
  document.getElementById("app").appendChild(card);
});
</script>
```