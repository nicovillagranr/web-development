// ==============================
// EVENTOS EN TYPESCRIPT
// ==============================
// TS: cada tipo de evento tiene su propia interfaz.
// Especificar el tipo correcto da acceso a propiedades específicas
// como event.key (KeyboardEvent) o event.clientX (MouseEvent).

// ==============================
// 1. Eventos del Mouse — MouseEvent
// ==============================

const zona = document.querySelector<HTMLDivElement>("#zona")!;

zona.addEventListener("click", (event: MouseEvent): void => {
  console.log("click — botón:", event.button);
});

zona.addEventListener("dblclick", (event: MouseEvent): void => {
  console.log("doble click en:", (event.target as HTMLElement).id);
});

zona.addEventListener("mousemove", (event: MouseEvent): void => {
  console.log(`mousemove — X: ${event.clientX}, Y: ${event.clientY}`);
});

zona.addEventListener("contextmenu", (event: MouseEvent): void => {
  event.preventDefault(); // cancela el menú contextual
  console.log("clic derecho");
});

// mouseenter / mouseleave — no burbujean (a diferencia de mouseover/mouseout)
zona.addEventListener("mouseenter", (_event: MouseEvent): void => {
  zona.style.background = "#e0e7ff";
});

zona.addEventListener("mouseleave", (_event: MouseEvent): void => {
  zona.style.background = "";
});

// ==============================
// 2. Eventos del Teclado — KeyboardEvent
// ==============================

document.addEventListener("keydown", (event: KeyboardEvent): void => {
  console.log("keydown — tecla:", event.key, "| código:", event.code);

  // Atajos de teclado con modificadores
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    console.log("Ctrl+S interceptado");
  }
});

document.addEventListener("keyup", (event: KeyboardEvent): void => {
  console.log("keyup:", event.key);
});

// ==============================
// 3. Eventos de Formulario — InputEvent / Event
// ==============================

const input = document.querySelector<HTMLInputElement>("#miInput");
if (input !== null) {
  // 'input' event — se dispara con cada cambio de valor
  input.addEventListener("input", (event: Event): void => {
    // event.target es EventTarget; lo casteamos a HTMLInputElement para acceder a .value
    const target = event.target as HTMLInputElement;
    console.log("valor actual:", target.value);
  });

  input.addEventListener("focus", (_event: FocusEvent): void => {
    input.style.outline = "2px solid blue";
  });

  input.addEventListener("blur", (_event: FocusEvent): void => {
    input.style.outline = "";
  });
}

const form = document.querySelector<HTMLFormElement>("#miForm");
if (form !== null) {
  form.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();
    console.log("formulario enviado");
  });
}

// ==============================
// 4. Eventos de la Interfaz — UIEvent / Event
// ==============================

window.addEventListener("resize", (_event: UIEvent): void => {
  console.log(`resize — ${window.innerWidth} × ${window.innerHeight}`);
});

window.addEventListener("scroll", (_event: Event): void => {
  console.log("scrollY:", window.scrollY);
});

window.addEventListener("load", (_event: Event): void => {
  console.log("página cargada completamente");
});

// ==============================
// 5. Timers — tipos de retorno
// ==============================

// setTimeout devuelve ReturnType<typeof setTimeout> (número en browser, Timeout en Node)
const timerId: ReturnType<typeof setTimeout> = setTimeout((): void => {
  console.log("Ejecutado después de 2 segundos");
}, 2000);

const intervalId: ReturnType<typeof setInterval> = setInterval((): void => {
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

const lista = document.querySelector<HTMLUListElement>("#lista");
if (lista !== null) {
  lista.addEventListener("click", (event: MouseEvent): void => {
    const target = event.target as HTMLElement;

    if (target.matches("button[data-remove]")) {
      target.closest("li")?.remove();
    }
  });
}
