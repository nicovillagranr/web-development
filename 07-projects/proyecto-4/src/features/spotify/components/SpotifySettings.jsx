// ================= CONTEXTO MODULO =================
// Panel lateral de ajustes de Spotify — versión demo.
// Muestra aviso de sección no disponible. Sin lógica de conexión.
// ================= IMPORTS =================
import { useCallback, useEffect } from "react";
import { SiSpotify } from "react-icons/si";
import SettingsHeader from "@ui/SettingsHeader.jsx";

// ================= COMPONENT =================
function SpotifySettings({ isActive, onBack }) {
    const handleClose = useCallback(() => onBack?.(), [onBack]);

    useEffect(() => {
        if (!isActive) return;
        const handleKeyDown = (e) => { if (e.key === "Escape") handleClose(); };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isActive, handleClose]);

    return (
        <section
            className={`absolute inset-0 z-20 flex flex-col bg-[#0D0F1A] text-white transition-transform duration-500 ease-out ${isActive ? "translate-x-0" : "-translate-x-full"}`}
        >
            <SettingsHeader title="Spotify" onBack={handleClose} />

            <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <SiSpotify size={32} className="text-[#1DB954]/40" />
                <p className="text-sm font-medium text-white/60">Sección en demo</p>
                <p className="text-xs text-white/30 leading-relaxed">
                    La integración con Spotify está desactivada en esta versión.
                </p>
            </div>
        </section>
    );
}
export default SpotifySettings;
