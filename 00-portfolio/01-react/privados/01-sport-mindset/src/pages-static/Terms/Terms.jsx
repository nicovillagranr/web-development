const Terms = () => {
    const sections = [
        {
            title: "1. Uso del sitio",
            body: "El acceso y uso de Fashion Go! implica la aceptación íntegra de los presentes términos y condiciones. Nos reservamos el derecho de modificar el contenido del sitio, sus servicios y estos términos en cualquier momento, notificando los cambios a través de esta misma página."
        },
        {
            title: "2. Productos y precios",
            body: "Los productos exhibidos están sujetos a disponibilidad de stock. Los precios incluyen IVA y están expresados en pesos chilenos (CLP). Nos reservamos el derecho de corregir errores tipográficos o de precio antes de confirmar un pedido."
        },
        {
            title: "3. Propiedad intelectual",
            body: "Todos los contenidos del sitio (textos, imágenes, logos, diseños y código) son propiedad de Fashion Go! o de sus respectivos titulares y están protegidos por la legislación vigente. Queda prohibida su reproducción total o parcial sin autorización previa."
        },
        {
            title: "4. Política de privacidad",
            body: "Tus datos personales se utilizan exclusivamente para procesar pedidos, gestionar tu cuenta y mejorar tu experiencia de compra. No los compartimos con terceros sin tu consentimiento, salvo cuando sea necesario para la entrega del pedido o por requerimiento legal."
        },
        {
            title: "5. Cambios y devoluciones",
            body: "Tienes 30 días desde la recepción del pedido para solicitar un cambio o devolución, siempre que el producto se encuentre en su estado original, sin uso y con sus etiquetas. Los gastos de devolución son de cargo del cliente, salvo en caso de productos defectuosos."
        },
        {
            title: "6. Jurisdicción",
            body: "Cualquier controversia derivada del uso del sitio se regirá por la legislación chilena y se someterá a la jurisdicción de los tribunales ordinarios de la ciudad de Santiago."
        },
    ]

    return (
        <section className="bg-paper min-h-[75vh]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-24">
                <header className="mb-16">
                    <span className="font-body text-eyebrow uppercase tracking-[0.28em] text-stone-600">Legal</span>
                    <h1 className="font-heading font-normal text-4xl md:text-5xl text-ink mt-3">Términos y condiciones</h1>
                    <p className="font-body text-eyebrow uppercase tracking-[0.22em] text-stone-400 mt-4">Última actualización · mayo 2026</p>
                </header>

                <div className="border-t border-ink pt-10 space-y-10">
                    {sections.map((s, i) => (
                        <article key={i}>
                            <h2 className="font-heading font-normal text-xl text-ink mb-3">{s.title}</h2>
                            <p className="font-body text-body text-stone-600 leading-relaxed">{s.body}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Terms
