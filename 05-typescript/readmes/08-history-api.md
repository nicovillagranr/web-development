# README – History API

## Descripción
Permite modificar la URL sin recargar la página, ideal para SPAs o navegación dinámica.

## Ejemplo en JavaScript
```html
<button id="productoA">Producto A</button>
<button id="productoB">Producto B</button>
<p id="titulo"></p>

<script>
function actualizarRuta(nombre) {
  history.pushState({ producto: nombre }, "", `?producto=${nombre}`);
  document.getElementById("titulo").textContent = `Estás viendo: ${nombre}`;
}

document.getElementById("productoA").addEventListener("click", () => {
  actualizarRuta("Producto-A");
});
document.getElementById("productoB").addEventListener("click", () => {
  actualizarRuta("Producto-B");
});

window.addEventListener("popstate", e => {
  if (e.state) {
    document.getElementById("titulo").textContent =
      `Estás viendo: ${e.state.producto}`;
  }
});
</script>
```