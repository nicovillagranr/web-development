import type { VideoGame } from "../../data";
import GameItem from "../GameItem/GameItem";

import "./VideoGameGrid.css"

interface Props {
    games: VideoGame[]
}

const VideoGameGrid = ({ games }: Props) => {
    return (
        <>
            <section className="page-container">

                <div className="max-w-6xl mx-auto flex flex-col justify-center items-center gap-8">

                    <h1 className="text-2xl text-white font-bold uppercase">Feature Games</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {games.map(game => {
                            return (
                                <GameItem key={game.id} {...game} />
                            );
                        })}
                    </div>

                </div>

            </section>

            <section className="page-container">

            </section>
        </>
    )
}
export default VideoGameGrid