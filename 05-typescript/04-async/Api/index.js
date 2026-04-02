// API de Rick & Morty — async/await con TypeScript
// TS: tipamos la respuesta de la API con interfaces.
const UrlApi = "https://rickandmortyapi.com/api/character";
const cardsContainer = document.querySelector(".cards__container");
// async function devuelve Promise<void> cuando no retorna un valor útil
async function getCharacters() {
    try {
        const respuesta = await fetch(UrlApi);
        if (!respuesta.ok) {
            throw new Error(`HTTP error: ${respuesta.status}`);
        }
        // res.json() devuelve Promise<any>; casteamos al tipo correcto
        const { results } = await respuesta.json();
        results.forEach(crearCard);
    }
    catch (error) {
        // TS: 'error' es unknown en modo strict — debemos verificar el tipo antes de usar
        if (error instanceof Error) {
            console.error("Error de solicitud:", error.message);
        }
    }
}
getCharacters();
// Destructuring tipado: TS verifica que name, status e image existan en Character
function crearCard({ name, status, image }) {
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
export {};
//# sourceMappingURL=index.js.map