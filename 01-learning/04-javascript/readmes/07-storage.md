# README – Web Storage

## Descripción
Permite guardar estados, configuraciones o datos del usuario directamente en el navegador.

## Ejemplo en JavaScript
```html
<button id="sumar">Sumar visitas</button>
<p id="contador"></p>

<script>
if (!localStorage.visitas) {
  localStorage.visitas = 0;
}

document.getElementById("sumar").addEventListener("click", () => {
  localStorage.visitas = Number(localStorage.visitas) + 1;
  document.getElementById("contador").textContent = `Visitas: ${localStorage.visitas}`;
});

document.getElementById("contador").textContent =
  `Visitas: ${localStorage.visitas}`;
</script>
```