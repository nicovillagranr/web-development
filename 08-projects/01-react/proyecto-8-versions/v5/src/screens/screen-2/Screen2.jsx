// ================= CONTEXTO MODULO =================
// Pantalla secundaria — panel de estado del hogar inteligente.
// Layout: header con número hero + filas de módulos apiladas con entrada escalonada.

// ================= IMPORTS =================
import CardHomeCare from "./ui/cards/CardHomeCare";
import CardEnergy from "./ui/cards/CardEnergy";
import CardDevices from "./ui/cards/CardDevices";

import s from "./Screen2.module.css";

// ================= COMPONENT =================
function Screen2() {
    return (
        <section className={`${s.screen2} no-scrollbar`}>

            {/* ── Header: conteo global + estado del sistema ── */}
            <header className={s.screen2__header}>
                <div className={s["screen2__header-row"]}>
                    <span className={s.screen2__title}>
                        Panel del hogar
                    </span>
                    <div className={s.screen2__status}>
                        <span className={s["screen2__status-dot"]} />
                        <span className={s["screen2__status-label"]}>Activo</span>
                    </div>
                </div>
            </header>

            {/* ── Filas de módulos con entrada escalonada ── */}
            <div className={s.screen2__cards}>
                <CardHomeCare />
                <CardEnergy />
                <CardDevices />
            </div>

        </section>
    );
}
export default Screen2;
