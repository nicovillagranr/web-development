export interface VideoGame {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string
}

const games: VideoGame[] = [
    {
        id: 1,
        title: "Elden Ring",
        subtitle: "An open-world action RPG",
        description: "Explore the Lands Between and uncover the mysteries of the Elden Ring in this critically acclaimed action RPG from FromSoftware.",
        image: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg"
    },
    {
        id: 2,
        title: "Red Dead Redemption 2",
        subtitle: "An open-world western",
        description: "Experience the story of Arthur Morgan and the Van der Linde gang in this epic tale of life in America's unforgiving heartland.",
        image: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg"
    },
    {
        id: 3,
        title: "The Witcher 3: Wild Hunt",
        subtitle: "An open-world RPG",
        description: "Play as Geralt of Rivia, a monster hunter for hire, and embark on an epic journey through a vast open world.",
        image: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg"
    },
    {
        id: 4,
        title: "Hades",
        subtitle: "A rogue-like dungeon crawler",
        description: "Battle your way through the underworld as Zagreus, the son of Hades, in this critically acclaimed action game.",
        image: "https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg"
    },
    {
        id: 5,
        title: "Cyberpunk 2077",
        subtitle: "An open-world RPG",
        description: "Explore the dystopian Night City and make choices that shape your character's destiny in this highly anticipated game.",
        image: "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg"
    },
    {
        id: 6,
        title: "God of War",
        subtitle: "An action-adventure game",
        description: "Join Kratos and his son Atreus on an epic journey through the realms of Norse mythology.",
        image: "https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg"
    }
]
export { games }