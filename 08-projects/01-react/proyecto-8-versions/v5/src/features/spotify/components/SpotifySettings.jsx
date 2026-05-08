// ================= CONTEXTO MODULO =================
// Panel lateral de ajustes de Spotify — versión demo.
// Muestra aviso de sección no disponible. Sin lógica de conexión.
// ================= IMPORTS =================
import { useCallback } from "react";
import { SiSpotify } from "react-icons/si";
import SettingsHeader from "@ui/SettingsHeader.jsx";
import { useEscapeKey } from "@hooks/useEscapeKey.jsx";
import s from "./SpotifySettings.module.css";

// ================= COMPONENT =================
function SpotifySettings({ isActive, onBack }) {
    const handleClose = useCallback(() => onBack?.(), [onBack]);

    useEscapeKey(isActive, handleClose);

    return (
        <section className={`${s["spotify-settings"]} ${isActive ? s["spotify-settings--active"] : s["spotify-settings--hidden"]}`}>

            <SettingsHeader title="Spotify" onBack={handleClose} />

            <div className={s["spotify-settings__content"]}>
                <SiSpotify size={32} className={s["spotify-settings__icon"]} />
                <p className={s["spotify-settings__title"]}>Sección en demo</p>
                <p className={s["spotify-settings__desc"]}> La integración con Spotify está desactivada en esta versión.</p>
            </div>
        </section>
    );
}
export default SpotifySettings;
