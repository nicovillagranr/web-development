import type { VideoGame } from "../../../data";

export const GameItem = (game: Omit<VideoGame, "id">) => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition">
            <div className="relative overflow-hidden group">
                <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-45 object-cover transition-[transform,opacity] duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-50"
                />

                <div className="absolute inset-0 bg-black flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none">
                    <p className="text-4xl pointer-events-none">🎮</p>
                </div>
            </div>

            <div className="px-6 py-3">
                <h2 className="text-xl font-bold text-white">{game.title}</h2>
                <h3 className="text-sm text-gray-400">{game.subtitle}</h3>
                <p className="mt-2 text-gray-300">{game.description}</p>
            </div>
        </div>
    )
}
