// ================= COMPONENT =================
function ScreenRight() {
    const energyScore = 82;
    const consumptionToday = 2.4;
    const projectedMonth = 68;
    const estimatedSavings = 14;

    const savingsActions = [
        {
            title: "Modo ECO nocturno",
            detail: "Baja el compresor entre 00:00 y 06:00 para reducir consumo.",
            impact: "-6% estimado",
        },
        {
            title: "Ajuste de temperatura",
            detail: "Subir de 2C a 3C mantiene frescura y gasta menos energia.",
            impact: "-4% estimado",
        },
        {
            title: "Puerta abierta",
            detail: "Detecta aperturas largas y alerta para evitar perdida de frio.",
            impact: "-4% estimado",
        },
    ];

    // Render/retorno del bloque actual
    return (
        <div className="h-full px-4 py-3 text-white flex flex-col gap-3 overflow-y-auto no-scrollbar">
            <article className="rounded-2xl bg-black/20 backdrop-blur-md p-4">
                <p className="text-xs uppercase tracking-wide text-white/70">Screen 2</p>
                <h3 className="text-lg font-medium mt-1">Ahorro energetico</h3>
                <p className="text-sm text-white/75 mt-2">
                    Esta vista concentra metricas y acciones para bajar consumo sin perder rendimiento.
                </p>
            </article>

            <article className="rounded-2xl bg-black/20 backdrop-blur-md p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-white/80">Indice de eficiencia</p>
                    <p className="text-xl font-semibold">{energyScore}/100</p>
                </div>

                <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-linear-to-r from-emerald-300 via-cyan-300 to-sky-400"
                        style={{ width: `${energyScore}%` }}
                    />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-black/20 p-2">
                        <p className="text-[11px] text-white/70">Hoy</p>
                        <p className="text-sm font-semibold">{consumptionToday} kWh</p>
                    </div>
                    <div className="rounded-xl bg-black/20 p-2">
                        <p className="text-[11px] text-white/70">Mes</p>
                        <p className="text-sm font-semibold">{projectedMonth} kWh</p>
                    </div>
                    <div className="rounded-xl bg-black/20 p-2">
                        <p className="text-[11px] text-white/70">Ahorro</p>
                        <p className="text-sm font-semibold">{estimatedSavings}%</p>
                    </div>
                </div>
            </article>

            <article className="rounded-2xl bg-black/20 backdrop-blur-md p-4">
                <p className="text-sm uppercase tracking-wide text-white/70 mb-3">
                    Acciones recomendadas
                </p>

                <div className="space-y-2">
                    {savingsActions.map((action) => (
                        <div key={action.title} className="rounded-xl bg-black/20 border border-white/10 p-3">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-sm font-medium">{action.title}</p>
                                    <p className="text-xs text-white/70 mt-1">{action.detail}</p>
                                </div>
                                <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/25 text-emerald-100 shrink-0">
                                    {action.impact}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </article>
        </div>
    );
}
export default ScreenRight;
