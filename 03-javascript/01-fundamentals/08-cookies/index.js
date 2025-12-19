// =======================================
// storage.js
// Hoja de referencia rápida de almacenamiento en el navegador
// =======================================

// -------------------------
// LocalStorage
// -------------------------
// Persiste incluso si cierras el navegador. Límite ~5MB por dominio.
// Solo guarda strings, usa JSON para objetos o arrays.

localStorage.setItem("nombre", "Nico");          // Guardar
console.log(localStorage.getItem("nombre"));     // Leer -> "Nico"
localStorage.removeItem("nombre");               // Eliminar un dato
localStorage.clear();                            // Vaciar todo

// Guardar un objeto (convertir a JSON)
const juego = { titulo: "The Last of Us", año: 2013 };
localStorage.setItem("juego", JSON.stringify(juego));

// Recuperar un objeto (parsear JSON)
const recuperado = JSON.parse(localStorage.getItem("juego"));
console.log(recuperado.titulo); // "The Last of Us"


// -------------------------
// SessionStorage
// -------------------------
// Igual que localStorage pero dura solo mientras la pestaña esté abierta.

sessionStorage.setItem("tema", "oscuro");
console.log(sessionStorage.getItem("tema")); // "oscuro"
sessionStorage.clear();


// -------------------------
// Cookies
// -------------------------
// Texto plano en formato clave=valor.
// Se envían al servidor automáticamente en cada request.
// Limitadas en tamaño (~4KB) y número (~20 por dominio).

// Crear una cookie (con expiración y path)
document.cookie = "usuario=Nico; expires=Fri, 31 Dec 2027 23:59:59 GMT; path=/";

// Leer todas las cookies (devuelve un string con todas)
console.log(document.cookie);

// Helper para obtener una cookie por nombre
function getCookie(nombre) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${nombre}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Ejemplo: guardar y leer un tema
document.cookie = "tema=oscuro; path=/";
console.log(getCookie("tema")); // "oscuro"

// Borrar una cookie (poner fecha expirada)
document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";


// -------------------------
// Cuándo usar cada uno
// -------------------------
// - localStorage -> preferencias, carritos, configuraciones simples
// - sessionStorage -> estados temporales de la pestaña (ej: formulario a medio llenar)
// - cookies -> autenticación, datos que deban enviarse al servidor automáticamente
