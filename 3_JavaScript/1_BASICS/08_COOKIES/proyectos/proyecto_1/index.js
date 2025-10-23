// 1. Enunciado:
// - Recordar nombre de usuario
// - Al abrir tu web, pide el nombre del usuario.
// - Guárdalo en LocalStorage y muéstralo automáticamente en visitas futuras.

// Pedimos el dato
let usuario = localStorage.getItem("usuario");

if(usuario){
    console.log(`Bienvenido de nuevo ${usuario}`);
}else{
    let dato = prompt("Ingresa tu nombre")
    localStorage.setItem("usuario" , dato)
    console.log(`Bienvenido ${dato}`);
}
// localStorage.clear()