// =======================================
// ALMACENAMIENTO EN EL NAVEGADOR — TYPESCRIPT
// =======================================
// TS: localStorage, sessionStorage y document.cookie son APIs del navegador
// con tipos completos en la lib DOM. localStorage.getItem() devuelve string | null.

// -------------------------
// LocalStorage
// -------------------------
// Persiste incluso si cierras el navegador. Límite ~5MB por dominio.
// Solo guarda strings; usa JSON para objetos o arrays.

localStorage.setItem("nombre", "Nico");

// getItem() devuelve string | null — TypeScript lo hace explícito
const nombreGuardado: string | null = localStorage.getItem("nombre");
console.log(nombreGuardado); // "Nico"

localStorage.removeItem("nombre");
localStorage.clear();

// Guardar un objeto (convertir a JSON)
interface Juego {
  titulo: string;
  año: number;
}
const juego: Juego = { titulo: "The Last of Us", año: 2013 };
localStorage.setItem("juego", JSON.stringify(juego));

// Recuperar un objeto — JSON.parse devuelve 'any'; hacemos cast para tiparlo
const juegoRaw: string | null = localStorage.getItem("juego");
if (juegoRaw !== null) {
  const recuperado: Juego = JSON.parse(juegoRaw) as Juego;
  console.log(recuperado.titulo); // "The Last of Us"
}

// Helper genérico para guardar y leer cualquier tipo desde localStorage
function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage<T>(key: string): T | null {
  const raw: string | null = localStorage.getItem(key);
  return raw !== null ? (JSON.parse(raw) as T) : null;
}

// Uso:
saveToStorage<Juego>("juego2", { titulo: "God of War", año: 2018 });
const juego2: Juego | null = loadFromStorage<Juego>("juego2");
console.log(juego2?.titulo); // "God of War"

// -------------------------
// SessionStorage
// -------------------------
// Igual que localStorage pero dura solo mientras la pestaña esté abierta.

sessionStorage.setItem("tema", "oscuro");
const tema: string | null = sessionStorage.getItem("tema");
console.log(tema); // "oscuro"
sessionStorage.clear();

// -------------------------
// Cookies
// -------------------------
// Texto plano en formato clave=valor.
// Se envían al servidor automáticamente en cada request.

document.cookie = "usuario=Nico; expires=Fri, 31 Dec 2027 23:59:59 GMT; path=/";
console.log(document.cookie);

// Helper para obtener una cookie por nombre — devuelve string | undefined
function getCookie(nombre: string): string | undefined {
  const value: string = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${nombre}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
}

document.cookie = "tema=oscuro; path=/";
console.log(getCookie("tema")); // "oscuro"

// Borrar una cookie (poner fecha expirada)
document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

// -------------------------
// Cuándo usar cada uno
// -------------------------
// - localStorage   → preferencias, carritos, configuraciones simples
// - sessionStorage → estados temporales de la pestaña (ej: formulario a medio llenar)
// - cookies        → autenticación, datos que deban enviarse al servidor automáticamente
