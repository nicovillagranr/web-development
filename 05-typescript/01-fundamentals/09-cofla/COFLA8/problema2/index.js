// ============================================================================
// COFLA 8 — Problema B — Visualización de fechas de examen
// ============================================================================
const alumnos = [
    { nombre: "Lucas Dalto", email: "Soydalto@gmail.com", materia: "Fisica" },
    { nombre: "Lando Norris", email: "Soylando@gmail.com", materia: "Mecánica" },
    { nombre: "Charles Leclerc", email: "leclerccharles@gmail.com", materia: "Economía" },
    { nombre: "Carlos Sainz", email: "SainzCarlos@gmail.com", materia: "Matemática" },
    { nombre: "Lewis Hamilton", email: "lewishamilton@gmail.com", materia: "Historia" },
];
const boton = document.querySelector(".boton-confirmar");
const gridContainer = document.querySelector(".grid-container");
for (const alumno of alumnos) {
    const htmlCode = `
    <div class="grid-item nombre">${alumno.nombre}</div>
    <div class="grid-item email">${alumno.email}</div>
    <div class="grid-item materia">${alumno.materia}</div>
    <div class="grid-item semana">
      <select class="semana-elegida">
        <option value="Semana 1">Semana 1</option>
        <option value="Semana 2">Semana 2</option>
      </select>
    </div>`;
    gridContainer.innerHTML += htmlCode;
}
boton.addEventListener("click", () => {
    const confirmar = confirm("¿Quieres confirmar tu horario?");
    if (confirmar) {
        boton.remove();
        // TS: querySelectorAll devuelve NodeListOf<Element>; hacemos cast
        const elementos = document.querySelectorAll(".semana");
        const selects = document.querySelectorAll(".semana-elegida");
        elementos.forEach((elemento, i) => {
            elemento.innerHTML = selects[i].value;
        });
    }
});
export {};
//# sourceMappingURL=index.js.map