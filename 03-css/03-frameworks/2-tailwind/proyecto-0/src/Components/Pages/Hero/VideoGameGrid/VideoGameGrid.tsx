// Import de la data
import type { VideoGame } from "../../../data";

// Import de componentes
import { GameItem } from "../GameItem/GameItem";

interface Props {
    games: VideoGame[]
}

export const VideoGameGrid = ({ games }: Props) => {
    return (
        <>
            <section className="min-h-screen max-w-screen bg-gray-900">
                <div className="max-w-6xl mx-auto flex flex-col justify-center items-center gap-8">

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {games.map(game => {
                            return (
                                <GameItem key={game.id} {...game} />
                            );
                        })}
                    </div>

                </div>
            </section>
        </>
    )
}
