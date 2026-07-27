// ================= IMPORTS =================
import { SiSpotify } from "react-icons/si";
import Card from "../Card";

// ================= COMPONENT =================
function CardSpotify({ onClick, className = "", ...props }) {
    return (
        <Card
            as="button"
            onClick={onClick}
            className={`w-full h-full flex items-center justify-center gap-2 bg-[#1DB954]/15 border border-[#1DB954]/25 ${className}`}
            {...props}
        >
            <SiSpotify size={20} className="text-[#1DB954]" />
            <span className="text-xs text-white/70">Conectar Spotify</span>
        </Card>
    );
}
export default CardSpotify;
