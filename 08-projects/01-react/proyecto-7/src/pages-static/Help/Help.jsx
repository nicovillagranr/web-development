const Help = () => {
    const faqs = [
        {
            q: "¿Cómo realizo una compra?",
            a: "Navega por nuestro catálogo, agrega los productos que quieras a tu carrito y completa el pago con tu medio de pago preferido. Recibirás un correo con la confirmación de tu pedido."
        },
        {
            q: "¿Qué métodos de pago aceptan?",
            a: "Aceptamos tarjetas Visa, Mastercard y American Express, además de Webpay y Mach. Todos los pagos se procesan en un entorno seguro."
        },
        {
            q: "¿Puedo cambiar o devolver un producto?",
            a: "Sí. Tienes hasta 30 días desde la recepción del pedido para solicitar un cambio o devolución, siempre que el producto esté en su estado original y con sus etiquetas."
        },
        {
            q: "¿Cómo hago seguimiento a mi pedido?",
            a: "Una vez despachado, te enviaremos un correo con el número de seguimiento y un enlace para revisar el estado de tu envío en tiempo real."
        },
        {
            q: "¿Necesito crear una cuenta para comprar?",
            a: "No es obligatorio, pero crear una cuenta te permite guardar tus direcciones, ver tu historial de pedidos y agilizar futuras compras."
        },
        {
            q: "¿Cómo contacto al servicio al cliente?",
            a: "Puedes escribirnos a través de nuestra página de Contacto o enviarnos un correo a contacto@fashiongo.cl. Respondemos en un plazo máximo de 24 horas hábiles."
        },
    ]

    return (
        <section className="bg-paper min-h-[75vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-24">
                <header className="mb-16 max-w-2xl">
                    <span className="font-body text-eyebrow uppercase tracking-[0.28em] text-stone-600">Soporte</span>
                    <h1 className="font-heading font-normal text-4xl md:text-5xl text-ink mt-3">Centro de ayuda</h1>
                    <p className="font-body text-body text-stone-600 mt-4">Resolvemos tus dudas más frecuentes sobre compras, pagos y envíos.</p>
                </header>

                <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 border-t border-ink pt-10">
                    {faqs.map((item, i) => (
                        <article key={i}>
                            <h2 className="font-heading font-normal text-xl text-ink mb-3">{item.q}</h2>
                            <p className="font-body text-small text-stone-600 leading-relaxed">{item.a}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Help
