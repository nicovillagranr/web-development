// ================= CONTEXTO MODULO =================
// Panel lateral de ajustes de Spotify — versión demo.
// Muestra aviso de sección no disponible. Sin lógica de conexión.
// ================= IMPORTS =================
import { useCallback } from "react";
import { SiSpotify } from "react-icons/si";
import SettingsHeader from "@ui/SettingsHeader.jsx";
import { useEscapeKey } from "@hooks/useEscapeKey.jsx";

const PANEL_BASE = "absolute inset-0 z-20 flex flex-col bg-[#0D0F1A] text-white transition-transform duration-500 ease-out";

// ================= COMPONENT =================
function SpotifySettings({ isActive, onBack }) {
    const handleClose = useCallback(() => onBack?.(), [onBack]);

    useEscapeKey(isActive, handleClose);

    return (
        <section className={`${PANEL_BASE} ${isActive ? "translate-x-0" : "-translate-x-full"}`}>

            <SettingsHeader title="Spotify" onBack={handleClose} />

            <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <SiSpotify size={32} className="text-[#1DB954]" />
                <p className="text-sm font-medium">Sección en demo</p>
                <p className="text-sm leading-relaxed">La integración con Spotify está desactivada en esta versión.</p>
            </div>
        </section>
    );
}
export default SpotifySettings;
