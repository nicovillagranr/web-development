// ================= CONTEXTO MODULO =================
// Pantalla completa de gestion de inventario.
// Permite alta/baja de items y monitorea vencimientos por prioridad visual.

// ================= IMPORTS =================
import SettingsHeader from "../../../ui/settings/SettingsHeader.jsx";
import {
    INVENTORY_TYPES,
    INVENTORY_UNITS,
    useInventory,
} from "../hooks/useInventory.jsx";

function getExpiryMeta(daysToExpire) {
    if (daysToExpire === null) return { label: "Sin fecha",                                tone: "text-white/30" };
    if (daysToExpire < 0)      return { label: `Vencido hace ${Math.abs(daysToExpire)}d`, tone: "text-rose-400" };
    if (daysToExpire === 0)    return { label: "Vence hoy",                               tone: "text-amber-400" };
    if (daysToExpire <= 3)     return { label: `Vence en ${daysToExpire}d`,               tone: "text-amber-400" };
    return                            { label: `Vence en ${daysToExpire}d`,               tone: "text-emerald-400" };
}

function getTypeLabel(typeValue) {
    const match = INVENTORY_TYPES.find((t) => t.value === typeValue);
    return match ? match.label : typeValue;
}

// ================= COMPONENT =================
function InventorySettings({ isActive, onBack }) {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        addItem();
    };

    return (
        <section
            className={`absolute inset-0 z-20 flex flex-col bg-[#0D0F1A] text-white transition-transform duration-500 ease-out ${isActive ? "translate-x-0" : "-translate-x-full"}`}
        >
            <SettingsHeader title="Inventario" onBack={onBack} />

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pb-6 space-y-3 no-scrollbar pt-4">

                {/* Formulario */}
                <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4 space-y-2.5">
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-white/40 font-medium">Nuevo alimento</span>

                    <div className="space-y-1">
                        <label htmlFor="inventory-name" className="text-xs text-white/40">Alimento</label>
                        <input
                            id="inventory-name"
                            value={form.name}
                            onChange={(e) => setField("name", e.target.value)}
                            placeholder="Ej: Leche descremada"
                            className="w-full h-10 rounded-xl bg-white/[0.07] border border-white/[0.08] px-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-cyan-400/35 transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label htmlFor="inventory-qty" className="text-xs text-white/40">Cantidad</label>
                            <input
                                id="inventory-qty"
                                type="number"
                                min="1"
                                value={form.quantity}
                                onChange={(e) => setField("quantity", e.target.value)}
                                className="w-full h-10 rounded-xl bg-white/[0.07] border border-white/[0.08] px-3 text-sm text-white outline-none focus:border-cyan-400/35 transition-colors"
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="inventory-unit" className="text-xs text-white/40">Unidad</label>
                            <select
                                id="inventory-unit"
                                value={form.unit}
                                onChange={(e) => setField("unit", e.target.value)}
                                className="w-full h-10 rounded-xl bg-white/[0.07] border border-white/[0.08] px-3 text-sm text-white/80 outline-none focus:border-cyan-400/35 transition-colors"
                            >
                                {INVENTORY_UNITS.map((u) => (
                                    <option className="bg-[#1A1C28] text-white" key={u.value} value={u.value}>{u.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label htmlFor="inventory-type" className="text-xs text-white/40">Tipo</label>
                            <select
                                id="inventory-type"
                                value={form.type}
                                onChange={(e) => setField("type", e.target.value)}
                                className="w-full h-10 rounded-xl bg-white/[0.07] border border-white/[0.08] px-3 text-sm text-white/80 outline-none focus:border-cyan-400/35 transition-colors"
                            >
                                {INVENTORY_TYPES.map((t) => (
                                    <option className="bg-[#1A1C28] text-white" key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="inventory-expiry" className="text-xs text-white/40">Vencimiento</label>
                            <input
                                id="inventory-expiry"
                                type="date"
                                value={form.expiresAt}
                                onChange={(e) => setField("expiresAt", e.target.value)}
                                className="w-full h-10 rounded-xl bg-white/[0.07] border border-white/[0.08] px-3 text-sm text-white/70 outline-none focus:border-cyan-400/35 transition-colors"
                            />
                        </div>
                    </div>

                    {error && <p className="text-xs text-rose-400">{error}</p>}

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full h-10 rounded-xl bg-white/[0.07] border border-white/[0.09] text-sm text-white/65 hover:text-white hover:bg-white/[0.10] transition-colors"
                    >
                        Agregar alimento
                    </button>
                </div>

                {/* Lista */}
                <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase tracking-[0.14em] text-white/40 font-medium">Alimentos</span>
                        <div className="flex items-center gap-3 text-[11px]">
                            {expiringSoonCount > 0 && <span className="text-amber-400/90">{expiringSoonCount} por vencer</span>}
                            <span className="text-white/30">{items.length} items</span>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        {items.length === 0 && (
                            <p className="text-xs text-white/30 text-center py-4">Sin alimentos registrados.</p>
                        )}

                        {items.map((item) => {
                            const daysToExpire = getDaysToExpire(item.expiresAt);
                            const { label, tone } = getExpiryMeta(daysToExpire);

                            return (
                                <article key={item.id} className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.06]">
                                    <div className="min-w-0">
                                        <p className="text-sm text-white/90 font-medium truncate">{item.name}</p>
                                        <p className="text-xs text-white/40 mt-0.5">
                                            {item.quantity} {item.unit} · {getTypeLabel(item.type)}
                                        </p>
                                        <p className={`text-[11px] mt-0.5 ${tone}`}>{label}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeItem(item.id)}
                                        className="text-[11px] px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.06] text-white/35 hover:text-white/65 hover:bg-white/[0.08] transition-colors shrink-0"
                                    >
                                        Quitar
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default InventorySettings;
