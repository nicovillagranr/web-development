# README – Fetch y Consumo de APIs

## Descripción
Transforma aplicaciones estáticas en sistemas dinámicos conectados a datos reales.

## Ejemplo en JavaScript
```html
<ul id="lista"></ul>

<script>
async function cargarUsuarios() {
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await respuesta.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  data.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.name;
    lista.appendChild(li);
  });
}

cargarUsuarios();
</script>
```