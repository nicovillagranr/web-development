// ================= CONTEXTO MODULO =================
// Pantalla secundaria tipo consola para energia del hogar.
// Muestra accesos rapidos en tarjetas clickeables.

// ================= IMPORTS =================
import { FiChevronRight, FiHome } from "react-icons/fi";

// ================= COMPONENT =================
function ScreenRight() {
    const panels = [
        {
            id: "home-care",
            title: "Home Care",
            description: "Servicios del hogar operando sin fallas.",
            metric: "Estado: OK",
        },
        {
            id: "energy-live",
            title: "Energia",
            description: "Consumo actual y comparacion con el promedio.",
            metric: "2.4 kWh hoy",
        },
        {
            id: "devices",
            title: "Dispositivos",
            description: "Control rapido de equipos conectados.",
            metric: "8 activos",
        },
        {
            id: "alerts",
            title: "Alertas",
            description: "Eventos, anomalias y mantenimiento pendiente.",
            metric: "2 pendientes",
        },
    ];

    return (
        <section className="h-full px-4 py-3 text-white overflow-y-auto no-scrollbar">
            <article className="rounded-3xl bg-black/35 backdrop-blur-xl border border-white/10 p-3">
                <header className="pointer-events-none">
                    <h2 className="text-lg font-bold leading-tight mb-4 flex items-center gap-2">
                        <FiHome className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                        Casa
                    </h2>
                </header>

                <div className="grid grid-cols-2 grid-rows-2 gap-3">
                    {panels.map((panel) => (
                        <button
                            key={panel.id}
                            type="button"
                            className="h-35 rounded-2xl bg-black/45 border border-white/10 p-3 text-left"
                        >
                            <header className="flex items-center justify-between gap-2">
                                <h3 className="text-sm font-semibold leading-tight">{panel.title}</h3>
                                <span className="inline-flex items-center gap-0.5 text-[11px] text-emerald-200 shrink-0">
                                    <FiChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                                </span>
                            </header>

                            <p className="mt-2 text-xs text-white/80 leading-relaxed">{panel.description}</p>

                            <p className="mt-3 inline-flex rounded-full bg-emerald-500/15 border border-emerald-300/30 px-2 py-1 text-[11px] text-emerald-100">
                                {panel.metric}
                            </p>
                        </button>
                    ))}
                </div>
            </article>
        </section>
    );
}
export default ScreenRight;