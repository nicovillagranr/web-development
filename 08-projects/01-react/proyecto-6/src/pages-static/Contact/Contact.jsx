const Contact = () => {
    return (
        <section className="bg-paper min-h-[75vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-24">
                <header className="mb-16 max-w-2xl">
                    <span className="font-body text-eyebrow uppercase tracking-[0.28em] text-stone-600">Atención al cliente</span>
                    <h1 className="font-heading font-normal text-4xl md:text-5xl text-ink mt-3">Contacto</h1>
                    <p className="font-body text-body text-stone-600 mt-4">Estamos aquí para ayudarte. Escríbenos y te responderemos a la brevedad.</p>
                </header>

                <div className="grid gap-10 md:grid-cols-2">
                    <div className="border-t border-ink pt-8">
                        <h2 className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink mb-6">Datos de contacto</h2>
                        <ul className="font-body text-small text-stone-600 space-y-4">
                            <li className="flex flex-col gap-1">
                                <span className="text-eyebrow uppercase tracking-[0.22em] text-stone-400">Email</span>
                                <span className="text-ink">contacto@fashiongo.cl</span>
                            </li>
                            <li className="flex flex-col gap-1">
                                <span className="text-eyebrow uppercase tracking-[0.22em] text-stone-400">Teléfono</span>
                                <span className="text-ink">+56 2 2345 6789</span>
                            </li>
                            <li className="flex flex-col gap-1">
                                <span className="text-eyebrow uppercase tracking-[0.22em] text-stone-400">Horario</span>
                                <span className="text-ink">Lunes a viernes, 9:00 a 18:00 hrs</span>
                            </li>
                            <li className="flex flex-col gap-1">
                                <span className="text-eyebrow uppercase tracking-[0.22em] text-stone-400">Dirección</span>
                                <span className="text-ink">Av. Providencia 1234, Santiago, Chile</span>
                            </li>
                        </ul>
                    </div>

                    <form
                        className="border-t border-ink pt-8 flex flex-col gap-6"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <h2 className="font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ink">Envíanos un mensaje</h2>

                        <label className="flex flex-col gap-2">
                            <span className="font-body text-eyebrow uppercase tracking-[0.22em] text-stone-600">Nombre</span>
                            <input
                                type="text"
                                required
                                className="border-0 border-b border-stone-300 bg-transparent px-0 py-2 font-body text-body text-ink focus:outline-none focus:border-ink transition-colors"
                            />
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="font-body text-eyebrow uppercase tracking-[0.22em] text-stone-600">Email</span>
                            <input
                                type="email"
                                required
                                className="border-0 border-b border-stone-300 bg-transparent px-0 py-2 font-body text-body text-ink focus:outline-none focus:border-ink transition-colors"
                            />
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="font-body text-eyebrow uppercase tracking-[0.22em] text-stone-600">Mensaje</span>
                            <textarea
                                rows="4"
                                required
                                className="border-0 border-b border-stone-300 bg-transparent px-0 py-2 font-body text-body text-ink focus:outline-none focus:border-ink resize-none transition-colors"
                            />
                        </label>

                        <button
                            type="submit"
                            className="self-start mt-2 bg-ink hover:bg-camel-deep text-paper font-body py-3 px-10 rounded-none transition-colors duration-300 uppercase tracking-[0.22em] text-[11px]"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Contact
