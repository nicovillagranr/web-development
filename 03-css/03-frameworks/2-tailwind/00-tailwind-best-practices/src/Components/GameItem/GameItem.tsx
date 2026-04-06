import type { VideoGame } from "../../data";

import "./GameItem.css";

const GameItem = (game: Omit<VideoGame, "id">) => {
    return (
        <div className="card">
            <div className="card-image-container group">
                <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-45 object-cover transition-[transform,opacity] duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-50"
                />

                <div className="card-overlay">
                    <p className="card-icon">🎮</p>
                </div>
            </div>

            <div className="card-content">
                <h2 className="card-title">{game.title}</h2>
                <h3 className="card-subtitle">{game.subtitle}</h3>
                <p className="card-description">{game.description}</p>
            </div>
        </div>
    )
}
export default GameItem