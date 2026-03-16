// ================= CONTEXTO MODULO =================
// Widget de Spotify para el dashboard.
// Muestra estado de reproducción actual con controles básicos y barra de progreso.
// 3 estados: desconectado | conectado sin reproducción | reproduciendo.
// ================= IMPORTS =================
import { FiMusic, FiPause, FiPlay, FiSkipBack, FiSkipForward } from "react-icons/fi";
import { SiSpotify } from "react-icons/si";
import Card from "./Card.jsx";

// ================= COMPONENT =================
function CardSpotify({
    isConnected,
    spotify,
    onClick,
    onTogglePlayPause,
    onSkipNext,
    onSkipPrev,
    className = "",
    ...props
}) {
    // Estado: desconectado
    if (!isConnected) {
        return (
            <Card
                as="button"
                onClick={onClick}
                className={`w-full h-full flex items-center justify-center gap-2 bg-[#1DB954]/15 border border-[#1DB954]/25 ${className}`}
                {...props}
            >
                <SiSpotify size={16} className="text-[#1DB954]" />
                <span className="text-xs text-white/70">Conectar Spotify</span>
            </Card>
        );
    }

    // Estado: conectado, sin reproducción activa
    if (!spotify) {
        return (
            <Card
                as="button"
                onClick={onClick}
                className={`w-full h-full flex items-center justify-center gap-2 bg-white/5 border border-white/8 ${className}`}
                {...props}
            >
                <FiMusic size={14} className="text-white/30" />
                <span className="text-xs text-white/30">Sin reproducción</span>
            </Card>
        );
    }

    // Estado: reproduciendo
    return (
        <Card
            as="div"
            className={`w-full h-full flex flex-col justify-between bg-surface border border-white/8 p-2.5 ${className}`}
            {...props}
        >
            {/* Fila superior: album art + info + controles */}
            <div className="flex items-center gap-2">
                {/* Album art */}
                {spotify.albumArt ? (
                    <img
                        src={spotify.albumArt}
                        alt={spotify.albumName}
                        className="w-8 h-8 rounded shrink-0 object-cover"
                    />
                ) : (
                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0">
                        <FiMusic size={12} className="text-white/40" />
                    </div>
                )}

                {/* Título y artista */}
                <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium truncate text-white leading-none mb-0.5">
                        {spotify.trackName}
                    </p>
                    <p className="text-[10px] text-white/50 truncate leading-none">
                        {spotify.artistName}
                    </p>
                </div>

                {/* Controles */}
                <div className="flex items-center gap-0.5 shrink-0">
                    <button
                        onClick={(e) => { e.stopPropagation(); onSkipPrev?.(); }}
                        className="w-7 h-7 flex items-center justify-center text-white/50 active:text-white transition-colors"
                    >
                        <FiSkipBack size={12} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onTogglePlayPause?.(); }}
                        className="w-7 h-7 flex items-center justify-center text-white active:scale-90 transition-transform"
                    >
                        {spotify.isPlaying ? <FiPause size={13} /> : <FiPlay size={13} />}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onSkipNext?.(); }}
                        className="w-7 h-7 flex items-center justify-center text-white/50 active:text-white transition-colors"
                    >
                        <FiSkipForward size={12} />
                    </button>
                </div>
            </div>

            {/* Barra de progreso */}
            <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#1DB954] rounded-full transition-all duration-500"
                    style={{ width: `${spotify.progressPercent}%` }}
                />
            </div>
        </Card>
    );
}
export default CardSpotify;
