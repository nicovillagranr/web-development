// API de Rick & Morty — async/await con TypeScript
// TS: tipamos la respuesta de la API con interfaces.

const UrlApi: string = "https://rickandmortyapi.com/api/character";
const cardsContainer = document.querySelector<HTMLDivElement>(".cards__container")!;

// Interfaz que describe cada personaje de la API
interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown"; // literal union type
  image: string;
}

// Interfaz que describe la respuesta completa de la API
interface ApiResponse {
  results: Character[];
}

// async function devuelve Promise<void> cuando no retorna un valor útil
async function getCharacters(): Promise<void> {
  try {
    const respuesta: Response = await fetch(UrlApi);

    if (!respuesta.ok) {
      throw new Error(`HTTP error: ${respuesta.status}`);
    }

    // res.json() devuelve Promise<any>; casteamos al tipo correcto
    const { results }: ApiResponse = await respuesta.json() as ApiResponse;

    results.forEach(crearCard);
  } catch (error: unknown) {
    // TS: 'error' es unknown en modo strict — debemos verificar el tipo antes de usar
    if (error instanceof Error) {
      console.error("Error de solicitud:", error.message);
    }
  }
}

getCharacters();

// Destructuring tipado: TS verifica que name, status e image existan en Character
function crearCard({ name, status, image }: Character): void {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h5");
  title.textContent = name;

  const statusCharacter = document.createElement("p");
  statusCharacter.textContent = status;
  // El operador ternario con literal union — TS sabe que status puede ser "Alive"
  statusCharacter.classList.add(status === "Alive" ? "alive" : "dead");

  const characterImage = document.createElement("img");
  characterImage.src = image;
  characterImage.alt = name;

  card.append(title, statusCharacter, characterImage);
  cardsContainer.appendChild(card);
}
