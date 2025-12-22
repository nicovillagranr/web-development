const UrlApi = "https://rickandmortyapi.com/api/character";
const cardsContainer = document.querySelector(".cards__container");

async function getCharacters() {
    try {
        const respuesta = await fetch(UrlApi);
        const { results } = await respuesta.json();

        results.forEach(crearCard);
    } catch (error) {
        console.error("Error de solicitud", error);
    }
}
getCharacters();

function crearCard({ name, status, image }) {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h5");
    title.textContent = name;

    const statusCharacter = document.createElement("p");
    statusCharacter.textContent = status;
    statusCharacter.classList.add(status === "Alive" ? "alive" : "dead");

    const characterImage = document.createElement("img");
    characterImage.src = image;
    characterImage.alt = name;

    card.append(title, statusCharacter, characterImage);
    cardsContainer.appendChild(card);
}