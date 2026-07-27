# README – Service Workers y PWA

## Descripción
Permiten cache inteligente, modo offline, push notifications y convertir un sitio en una PWA.

## Ejemplo en JavaScript

**service-worker.js**
```js
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("v1").then(cache => {
      return cache.addAll(["/", "/index.html"]);
    })
  );
});
```

**Registro del SW**
```html
<script>
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}
</script>
```