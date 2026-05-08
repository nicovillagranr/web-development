const Shipping = () => {
    const zones = [
        { zona: "Región Metropolitana", plazo: "1 a 2 días hábiles", costo: "Desde $2.990" },
        { zona: "Zona norte y sur (capitales regionales)", plazo: "3 a 5 días hábiles", costo: "Desde $4.490" },
        { zona: "Zonas extremas y rurales", plazo: "5 a 10 días hábiles", costo: "Desde $6.990" },
    ]

    return (
        <section className="bg-paper min-h-[75vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-24">
                <header className="mb-16 max-w-2xl">
                    <span className="font-body text-eyebrow uppercase tracking-[0.28em] text-stone-600">Logística</span>
                    <h1 className="font-heading font-normal text-4xl md:text-5xl text-ink mt-3">Envíos</h1>
                    <p className="font-body text-body text-stone-600 mt-4">Despachamos a todo Chile con seguimiento en línea.</p>
                </header>

                <div className="border-t border-ink overflow-hidden mb-16">
                    <table className="w-full text-left">
                        <thead className="border-b border-stone-200">
                            <tr>
                                <th className="px-2 py-5 font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink">Zona</th>
                                <th className="px-2 py-5 font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink">Plazo estimado</th>
                                <th className="px-2 py-5 font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink">Costo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                            {zones.map((z, i) => (
                                <tr key={i}>
                                    <td className="px-2 py-5 font-body text-small text-ink">{z.zona}</td>
                                    <td className="px-2 py-5 font-body text-small text-stone-600">{z.plazo}</td>
                                    <td className="px-2 py-5 font-body text-small text-stone-600">{z.costo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                    <article className="border-t border-ink pt-8">
                        <h2 className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink mb-4">Despacho gratis</h2>
                        <p className="font-body text-body text-stone-600 leading-relaxed">
                            En compras sobre $39.990 el envío es gratuito a Región Metropolitana y capitales regionales.
                        </p>
                    </article>
                    <article className="border-t border-ink pt-8">
                        <h2 className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink mb-4">Retiro en tienda</h2>
                        <p className="font-body text-body text-stone-600 leading-relaxed">
                            Puedes retirar tu pedido sin costo en nuestras tiendas asociadas dentro de 24 a 48 horas hábiles desde la confirmación.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    )
}
export default Shipping
