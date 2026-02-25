// ================= IMPORTS =================
import {
    FiPause,
    FiPlay,
    FiRefreshCw,
    FiSkipBack,
    FiSkipForward,
    FiVolume2,
    FiVolumeX,
} from "react-icons/fi";
import SettingsHeader from "../../../Components/ui/SettingsHeader.jsx";
import { useRadioPlayer } from "../hooks/useRadioPlayer.jsx";

function getStatusLabel(status) {
    if (status === "loading") return "Loading stream...";
    if (status === "playing") return "Live";
    if (status === "paused") return "Paused";
    if (status === "error") return "Signal error";
    return "Ready";
}

function ControlButton({ children, onClick, ariaLabel }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
            className="h-11 min-w-11 px-3 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 transition-all"
        >
            {children}
        </button>
    );
}

// ================= COMPONENTE =================
function MusicSettings({ isActive, onBack }) {
    const {
        stations,
        activeStation,
        sourceCount,
        sourcePosition,
        isPlaying,
        status,
        volume,
        isMuted,
        error,
        selectStation,
        nextSource,
        prevSource,
        togglePlay,
        setVolume,
        toggleMute,
        retryStation,
    } = useRadioPlayer();

    return (
        <section
            className={`absolute inset-0 z-20 flex flex-col bg-[#1B1C27] text-white transition-transform duration-500 ease-out ${isActive ? "translate-x-0" : "-translate-x-full"}`}
        >
            <SettingsHeader title="Radio online" onBack={onBack} />

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pb-6 space-y-4 no-scrollbar">
                <article className="rounded-3xl backdrop-blur-xl bg-white/10 p-4">
                    <p className="text-sm uppercase tracking-wide text-white/70 mb-2">
                        Current station
                    </p>
                    <h3 className="text-2xl font-medium">{activeStation.label}</h3>
                    <p className="text-sm text-white/70 mt-1">{activeStation.description}</p>
                    <p className="text-xs text-white/60 mt-1">
                        Fuente {sourcePosition}/{sourceCount}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                        <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${status === "playing" ? "bg-emerald-500/30 text-emerald-100" : "bg-white/10 text-white/80"}`}
                        >
                            {getStatusLabel(status)}
                        </span>
                        {error && (
                            <span className="text-xs text-rose-200 bg-rose-500/20 px-2 py-1 rounded-full">
                                {error}
                            </span>
                        )}
                    </div>
                </article>

                <article className="rounded-3xl backdrop-blur-xl bg-white/10 p-4">
                    <p className="text-sm uppercase tracking-wide text-white/70 mb-3">
                        Genres
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        {stations.map((station) => {
                            const isActiveStation = station.id === activeStation.id;
                            return (
                                <button
                                    key={station.id}
                                    type="button"
                                    onClick={() => selectStation(station.id)}
                                    className={`h-16 rounded-xl text-sm font-medium transition-colors ${isActiveStation ? "bg-emerald-500/70 text-white" : "bg-white/10 hover:bg-white/20 text-white/90"}`}
                                >
                                    {station.label}
                                </button>
                            );
                        })}
                    </div>
                </article>

                <article className="rounded-3xl backdrop-blur-xl bg-white/10 p-4">
                    <p className="text-sm uppercase tracking-wide text-white/70 mb-3">
                        Playback
                    </p>

                    <div className="flex items-center justify-center gap-3">
                        <ControlButton onClick={prevSource} ariaLabel="Previous source">
                            <FiSkipBack className="w-5 h-5 mx-auto" />
                        </ControlButton>

                        <ControlButton onClick={togglePlay} ariaLabel={isPlaying ? "Pause" : "Play"}>
                            {isPlaying ? (
                                <FiPause className="w-6 h-6 mx-auto" />
                            ) : (
                                <FiPlay className="w-6 h-6 mx-auto" />
                            )}
                        </ControlButton>

                        <ControlButton onClick={nextSource} ariaLabel="Next source">
                            <FiSkipForward className="w-5 h-5 mx-auto" />
                        </ControlButton>

                        <ControlButton onClick={retryStation} ariaLabel="Retry stream">
                            <FiRefreshCw className="w-5 h-5 mx-auto" />
                        </ControlButton>
                    </div>

                    <div className="mt-4 rounded-2xl bg-black/20 border border-white/10 p-3">
                        <div className="flex items-center justify-between gap-3">
                            <button
                                type="button"
                                onClick={toggleMute}
                                className="h-10 w-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors shrink-0"
                            >
                                {isMuted ? (
                                    <FiVolumeX className="w-5 h-5 mx-auto" />
                                ) : (
                                    <FiVolume2 className="w-5 h-5 mx-auto" />
                                )}
                            </button>

                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={Math.round(volume * 100)}
                                onChange={(event) => setVolume(Number(event.target.value) / 100)}
                                className="w-full accent-emerald-400"
                                aria-label="Volume"
                            />

                            <span className="text-sm tabular-nums w-11 text-right">
                                {Math.round(volume * 100)}%
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}

export default MusicSettings;
