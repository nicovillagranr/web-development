// ================= CONTEXTO MODULO =================
// Formulario compacto de inventario para la pantalla Home.
// Permite alta/baja rapida de alimentos y muestra vencimientos prioritarios.
// ================= IMPORTS =================
import {
    INVENTORY_TYPES,
    INVENTORY_UNITS,
    useInventory,
} from "../hooks/useInventory.jsx";

// ================= HELPERS INTERNOS =================
// getExpiryMeta: traduce dias restantes a etiqueta legible + color semantico.
// Se usa para resaltar urgencia visual en cada item del listado.
function getExpiryMeta(daysToExpire) {
    if (daysToExpire === null) {
        return { label: "Sin fecha", tone: "text-white/60" };
    }

    if (daysToExpire < 0) {
        return { label: `Vencido hace ${Math.abs(daysToExpire)} dia(s)`, tone: "text-rose-300" };
    }

    if (daysToExpire === 0) {
        return { label: "Vence hoy", tone: "text-amber-300" };
    }

    if (daysToExpire <= 3) {
        return { label: `Vence en ${daysToExpire} dia(s)`, tone: "text-amber-300" };
    }

    return { label: `Vence en ${daysToExpire} dia(s)`, tone: "text-emerald-300" };
}

// getTypeLabel: convierte el valor tecnico del tipo a su label de UI.
// Ejemplo: "lacteo" -> "Lacteo".
function getTypeLabel(typeValue) {
    const match = INVENTORY_TYPES.find((type) => type.value === typeValue);
    return match ? match.label : typeValue;
}

// ================= COMPONENTE =================
// InventoryMainForm: version resumida del modulo de inventario.
// Reusa toda la logica de negocio desde useInventory.
function InventoryMainForm() {
    // Estado y acciones expuestos por el hook central de inventario.
    const {
        items,
        form,
        error,
        expiringSoonCount,
        setField,
        addItem,
        removeItem,
        getDaysToExpire,
    } = useInventory();

    // Submit del form: evita reload de pagina y delega validacion/alta al hook.
    const handleSubmit = (event) => {
        event.preventDefault();
        addItem();
    };

    return (
        <section className="min-h-[20vh] rounded-3xl backdrop-blur-xl bg-black/25 border border-white/10 text-white p-4 flex flex-col">
            {/* Bloque superior fijo: resumen y formulario de alta */}
            <div className="shrink-0">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm uppercase tracking-wide text-white/80">Inventario de alimentos</h3>
                    <span className="text-xs text-white/70">Total: {items.length}</span>
                </div>

                <p className="text-xs text-amber-200 mt-1">Por vencer pronto: {expiringSoonCount}</p>

                <form onSubmit={handleSubmit} className="mt-3 space-y-2.5">
                    {/* Campo nombre del alimento */}
                    <input
                        value={form.name}
                        onChange={(event) => setField("name", event.target.value)}
                        placeholder="Ej: Leche descremada"
                        className="w-full h-9 rounded-xl bg-black/25 border border-white/15 px-3 text-sm outline-none focus:border-white/40"
                    />

                    {/* Fila cantidad + unidad */}
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="number"
                            min="1"
                            value={form.quantity}
                            onChange={(event) => setField("quantity", event.target.value)}
                            className="h-9 rounded-xl bg-black/25 border border-white/15 px-3 text-sm outline-none focus:border-white/40"
                        />

                        <select
                            value={form.unit}
                            onChange={(event) => setField("unit", event.target.value)}
                            className="h-9 rounded-xl bg-black/25 border border-white/15 px-3 text-sm text-black outline-none focus:border-white/40"
                        >
                            {INVENTORY_UNITS.map((unit) => (
                                <option className="bg-white text-slate-900" key={unit.value} value={unit.value}>
                                    {unit.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fila tipo + fecha de vencimiento */}
                    <div className="grid grid-cols-2 gap-2">
                        <select
                            value={form.type}
                            onChange={(event) => setField("type", event.target.value)}
                            className="h-9 rounded-xl bg-black/25 border border-white/15 px-3 text-sm text-white outline-none focus:border-white/40"
                        >
                            {INVENTORY_TYPES.map((type) => (
                                <option className="bg-white text-slate-900" key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>

                        <input
                            type="date"
                            value={form.expiresAt}
                            onChange={(event) => setField("expiresAt", event.target.value)}
                            className="h-9 rounded-xl bg-black/25 border border-white/15 px-3 text-sm outline-none focus:border-white/40"
                        />
                    </div>

                    {/* Mensaje de validacion del hook */}
                    {error && <p className="text-xs text-rose-300">{error}</p>}

                    <button type="submit" className="w-full h-9 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium">
                        Agregar alimento
                    </button>
                </form>
            </div>

            {/* Bloque inferior scrollable: lista de items ya registrados */}
            <div className="mt-3 pt-3 border-t border-white/10 flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2">
                {/* Estado vacio cuando no hay alimentos cargados */}
                {items.length === 0 && (
                    <p className="text-sm text-white/60 py-3 text-center">Aun no agregas alimentos.</p>
                )}

                {/* Estado con datos: render item por item */}
                {items.map((item) => {
                    const daysToExpire = getDaysToExpire(item.expiresAt);
                    const expiryMeta = getExpiryMeta(daysToExpire);

                    return (
                        <article key={item.id} className="rounded-xl bg-black/20 border border-white/10 p-2.5">
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate">{item.name}</p>
                                    <p className="text-xs text-white/70 mt-0.5">
                                        {item.quantity} {item.unit} | {getTypeLabel(item.type)}
                                    </p>
                                    <p className={`text-xs mt-0.5 ${expiryMeta.tone}`}>{expiryMeta.label}</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeItem(item.id)}
                                    className="text-[11px] px-2 py-1 rounded-lg bg-white/15 hover:bg-white/25 transition-colors shrink-0"
                                >
                                    Quitar
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
export default InventoryMainForm;
