// Proyecto 1 — Recordar nombre de usuario
// Al abrir la web, pide el nombre y lo guarda en LocalStorage.
// En visitas futuras, saluda directamente.
// TS: localStorage.getItem() devuelve string | null — el if maneja el null
const usuario = localStorage.getItem("usuario");
if (usuario !== null) {
    console.log(`Bienvenido de nuevo ${usuario}`);
}
else {
    // prompt() también devuelve string | null
    const dato = prompt("Ingresa tu nombre");
    if (dato !== null && dato.trim().length > 0) {
        localStorage.setItem("usuario", dato);
        console.log(`Bienvenido ${dato}`);
    }
    else {
        console.log("Nombre inválido, no se guardó.");
    }
}
export {};
// Para resetear: localStorage.clear();
//# sourceMappingURL=index.js.map