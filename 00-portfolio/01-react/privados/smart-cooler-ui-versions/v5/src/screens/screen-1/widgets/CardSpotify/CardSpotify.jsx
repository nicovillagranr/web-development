// ================= IMPORTS =================
import { SiSpotify } from "react-icons/si";
import Card from "../Card";
import s from "./CardSpotify.module.css";

// ================= COMPONENT =================
function CardSpotify({ onClick, className = "", ...props }) {
    return (
        <Card as="button" onClick={onClick} className={`${s["card-spotify"]} ${className}`} {...props}>
            <SiSpotify size={20} className={s["card-spotify__icon"]} />
            <span className={s["card-spotify__label"]}>Conectar Spotify</span>
        </Card>
    );
}
export default CardSpotify;
