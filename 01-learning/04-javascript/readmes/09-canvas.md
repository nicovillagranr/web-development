# README – Canvas y WebGL

## Descripción
Permite dibujar, animar o generar gráficos interactivos directamente en el navegador.

## Ejemplo en JavaScript
```html
<canvas id="canvas" width="300" height="300"></canvas>

<script>
const ctx = document.getElementById("canvas").getContext("2d");

let x = 0;

function animar() {
  ctx.clearRect(0, 0, 300, 300);
  ctx.fillStyle = "purple";
  ctx.fillRect(x, 100, 50, 50);
  x = (x + 2) % 300;
  requestAnimationFrame(animar);
}

animar();
</script>
```