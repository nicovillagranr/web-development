// ================= CONTEXTO MODULO =================
// Pantalla secundaria — panel de estado del hogar inteligente.
// Layout: header con número hero + filas de módulos apiladas con entrada escalonada.

// ================= IMPORTS =================
import CardHomeCare from "./ui/cards/CardHomeCare";
import CardEnergy from "./ui/cards/CardEnergy";
import CardDevices from "./ui/cards/CardDevices";

// ================= COMPONENT =================
function Screen2() {
    return (
        <section className="h-full px-4 pt-5 pb-4 text-white overflow-y-auto no-scrollbar">

            <header className="mb-5">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[12px] uppercase tracking-[0.22em] text-white/30">
                        Panel del hogar
                    </span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="text-[12px] text-accent font-medium">Activo</span>
                    </div>
                </div>
            </header>

            <div className="flex flex-col gap-2">
                <CardHomeCare />
                <CardEnergy />
                <CardDevices />
            </div>

        </section>
    );
}
export default Screen2;
