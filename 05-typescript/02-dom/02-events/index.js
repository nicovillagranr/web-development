// ==============================
// EVENTOS EN TYPESCRIPT
// ==============================
// TS: cada tipo de evento tiene su propia interfaz.
// Especificar el tipo correcto da acceso a propiedades específicas
// como event.key (KeyboardEvent) o event.clientX (MouseEvent).
// ==============================
// 1. Eventos del Mouse — MouseEvent
// ==============================
const zona = document.querySelector("#zona");
zona.addEventListener("click", (event) => {
    console.log("click — botón:", event.button);
});
zona.addEventListener("dblclick", (event) => {
    console.log("doble click en:", event.target.id);
});
zona.addEventListener("mousemove", (event) => {
    console.log(`mousemove — X: ${event.clientX}, Y: ${event.clientY}`);
});
zona.addEventListener("contextmenu", (event) => {
    event.preventDefault(); // cancela el menú contextual
    console.log("clic derecho");
});
// mouseenter / mouseleave — no burbujean (a diferencia de mouseover/mouseout)
zona.addEventListener("mouseenter", (_event) => {
    zona.style.background = "#e0e7ff";
});
zona.addEventListener("mouseleave", (_event) => {
    zona.style.background = "";
});
// ==============================
// 2. Eventos del Teclado — KeyboardEvent
// ==============================
document.addEventListener("keydown", (event) => {
    console.log("keydown — tecla:", event.key, "| código:", event.code);
    // Atajos de teclado con modificadores
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        console.log("Ctrl+S interceptado");
    }
});
document.addEventListener("keyup", (event) => {
    console.log("keyup:", event.key);
});
// ==============================
// 3. Eventos de Formulario — InputEvent / Event
// ==============================
const input = document.querySelector("#miInput");
if (input !== null) {
    // 'input' event — se dispara con cada cambio de valor
    input.addEventListener("input", (event) => {
        // event.target es EventTarget; lo casteamos a HTMLInputElement para acceder a .value
        const target = event.target;
        console.log("valor actual:", target.value);
    });
    input.addEventListener("focus", (_event) => {
        input.style.outline = "2px solid blue";
    });
    input.addEventListener("blur", (_event) => {
        input.style.outline = "";
    });
}
const form = document.querySelector("#miForm");
if (form !== null) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("formulario enviado");
    });
}
// ==============================
// 4. Eventos de la Interfaz — UIEvent / Event
// ==============================
window.addEventListener("resize", (_event) => {
    console.log(`resize — ${window.innerWidth} × ${window.innerHeight}`);
});
window.addEventListener("scroll", (_event) => {
    console.log("scrollY:", window.scrollY);
});
window.addEventListener("load", (_event) => {
    console.log("página cargada completamente");
});
// ==============================
// 5. Timers — tipos de retorno
// ==============================
// setTimeout devuelve ReturnType<typeof setTimeout> (número en browser, Timeout en Node)
const timerId = setTimeout(() => {
    console.log("Ejecutado después de 2 segundos");
}, 2000);
const intervalId = setInterval(() => {
    console.log("Ejecutado cada 1 segundo");
}, 1000);
// Para limpiarlos:
// clearTimeout(timerId);
// clearInterval(intervalId);
// ==============================
// 6. Delegación de eventos — patrón fundamental
// ==============================
// En lugar de agregar listeners a cada elemento, escucha en el padre
// y verifica qué elemento disparó el evento.
const lista = document.querySelector("#lista");
if (lista !== null) {
    lista.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches("button[data-remove]")) {
            target.closest("li")?.remove();
        }
    });
}
export {};
//# sourceMappingURL=index.js.map