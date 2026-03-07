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
            <article className="rounded-2xl bg-black/35 backdrop-blur-xl border border-white/10 p-3">
                <header className="pointer-events-none mb-3">
                    <h2 className="text-lg flex items-center gap-2">
                        <FiHome className="w-5 h-5 text-emerald-300" aria-hidden="true" />
                        Casa
                    </h2>
                    <p className="mt-1 text-xs text-white/75">
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
