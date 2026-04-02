# README – Audio y Video API

## Descripción
Permite controlar, analizar y reaccionar a contenido multimedia desde JavaScript.

## Ejemplo en JavaScript
```html
<video id="video" width="300" controls>
  <source src="video.mp4" type="video/mp4">
</video>
<button id="mutear">Mutear</button>

<script>
const video = document.getElementById("video");

document.getElementById("mutear").addEventListener("click", () => {
  video.muted = !video.muted;
});
</script>
```