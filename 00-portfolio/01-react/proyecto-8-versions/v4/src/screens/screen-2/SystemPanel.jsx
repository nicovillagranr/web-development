// ================= CONTEXTO MODULO =================
// Pantalla secundaria — panel de estado del hogar inteligente.
// Layout: header con número hero + filas de módulos apiladas con entrada escalonada.

// ================= IMPORTS =================
import CardHomeCare from "./ui/cards/CardHomeCare.jsx";
import CardEnergy from "./ui/cards/CardEnergy.jsx";
import CardDevices from "./ui/cards/CardDevices.jsx";

// ================= COMPONENT =================
function SystemPanel() {
    return (
        <section className="h-full px-4 pt-5 pb-4 text-white overflow-y-auto no-scrollbar">

            {/* ── Header: conteo global + estado del sistema ── */}
            <header className="wizard-enter mb-5">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[12px] uppercase tracking-[0.22em] text-white/30">
                        Panel del hogar
                    </span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="text-[12px] text-accent font-medium">Activo</span>
                    </div>
                </div>

                {/* Divisor con etiqueta */}
                <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-white/8" />
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/20">módulos</span>
                    <div className="h-px flex-1 bg-white/8" />
                </div>
            </header>

            {/* ── Filas de módulos con entrada escalonada ── */}
            <div className="flex flex-col gap-2">
                <CardHomeCare animDelay={80} />
                <CardEnergy   animDelay={150} />
                <CardDevices  animDelay={220} />
            </div>

        </section>
    );
}
export default SystemPanel;
