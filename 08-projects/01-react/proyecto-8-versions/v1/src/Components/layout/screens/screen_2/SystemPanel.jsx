// ================= CONTEXTO MODULO =================
// Pantalla secundaria tipo consola para energia del hogar.
// Muestra accesos rapidos en tarjetas clickeables.

// ================= IMPORTS =================
import { FiHome } from "react-icons/fi";

// Import de UI
import CardHomeCare from "./ui/cards/CardHomeCare.jsx";
import CardEnergy from "./ui/cards/CardEnergy.jsx";
import CardDevices from "./ui/cards/CardDevices.jsx";
import CardAlerts from "./ui/cards/CardAlerts.jsx";

// ================= COMPONENT =================
function SystemPanel() {
    return (
        <section className="h-full px-4 py-3 text-white overflow-y-auto no-scrollbar">
            <article className="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.07] p-3">
                <header className="pointer-events-none mb-3">
                    <h2 className="text-base font-medium tracking-wide flex items-center gap-2">
                        <FiHome className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                        Casa
                    </h2>
                    <p className="mt-0.5 text-[11px] text-white/50 tracking-wide">
                        Prototipo visual del panel de hogar inteligente.
                    </p>
                </header>

                <div className="grid grid-cols-2 grid-rows-2 gap-3">
                    <CardHomeCare />
                    <CardEnergy />
                    <CardDevices />
                    <CardAlerts />
                </div>
            </article>
        </section >
    );
}
export default SystemPanel;
