// Fetch (AJAX) y Peticiones a servicios / APIs REST — TypeScript
// TS: tipamos la respuesta de la API con una interfaz para detectar errores en compilación

// Interfaz que representa un usuario de JSONPlaceholder
interface Usuario {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

// querySelector<T> — le decimos a TS que el elemento es un HTMLDivElement
const divUsuarios = document.querySelector<HTMLDivElement>("#usuarios")!;

// getUsuarios() retorna Promise<Response> — lo indicamos explícitamente
function getUsuarios(): Promise<Response> {
  return fetch("https://jsonplaceholder.typicode.com/users");
}

// listadoUsuarios recibe Usuario[] — TS verifica que accedamos solo a propiedades existentes
function listadoUsuarios(usuarios: Usuario[]): void {
  for (let i: number = 0; i < usuarios.length; i++) {
    const nombre = document.createElement("h4");
    nombre.innerHTML = `${i} ${usuarios[i].name}`;
    divUsuarios.appendChild(nombre);
  }

  // Ocultamos el Loading después de mostrar todos los usuarios
  const loading = document.querySelector<HTMLElement>(".loading");
  if (loading !== null) {
    loading.style.display = "none";
  }
}

// Encadenamos las promesas con tipos inferidos
getUsuarios()
  .then((data: Response) => data.json())
  .then((users: Usuario[]) => {
    listadoUsuarios(users);
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error("Error al obtener usuarios:", error.message);
    }
  });
