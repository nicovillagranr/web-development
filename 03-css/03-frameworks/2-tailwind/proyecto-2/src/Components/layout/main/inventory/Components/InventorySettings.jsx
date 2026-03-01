
// ================= IMPORTS =================
// AquÃ­ van los imports necesarios para el componente, como React, hooks personalizados, y componentes UI
import SettingsHeader from "../../../../ui/settings/SettingsHeader.jsx";
import {
    INVENTORY_TYPES,
    INVENTORY_UNITS,
    useInventory,
} from "../hooks/useInventory.jsx";

// FunciÃ³n que recibe la variable "daysToExpire" y devuelve un objeto con la etiqueta y el tono correspondiente
// - Si "daysToExpire" es null, devuelve "Sin fecha" con tono blanco/60
// - Si "daysToExpire" es negativo, devuelve "Vencido hace X dia(s)" con tono rojo
// - Si "daysToExpire" es 0, devuelve "Vence hoy" con tono Ã¡mbar
// - Si "daysToExpire" es menor o igual a 3, devuelve "Vence en X dia(s)" con tono Ã¡mbar
// - Si "daysToExpire" es mayor a 3, devuelve "Vence en X dia(s)" con tono verde
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

function getTypeLabel(typeValue) {
    const match = INVENTORY_TYPES.find((type) => type.value === typeValue);
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
            className={`absolute inset-0 z-20 flex flex-col bg-[#1B1C27] text-white transition-transform duration-500 ease-out ${isActive ? "translate-x-0" : "-translate-x-full"}`}
        >
            <SettingsHeader title="Inventario" onBack={onBack} />

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pb-6 space-y-4 no-scrollbar">
                <form onSubmit={handleSubmit} className="rounded-3xl backdrop-blur-xl bg-white/10 p-4 space-y-3">
                    <p className="text-sm uppercase tracking-wide text-white/70">Nuevo alimento</p>

                    <div className="space-y-1">
                        <label htmlFor="inventory-name" className="text-xs text-white/70">
                            Alimento
                        </label>
                        <input
                            id="inventory-name"
                            value={form.name}
                            onChange={(event) => setField("name", event.target.value)}
                            placeholder="Ej: Leche descremada"
                            className="w-full rounded-xl bg-black/25 border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/40"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label htmlFor="inventory-qty" className="text-xs text-white/70">
                                Cantidad
                            </label>
                            <input
                                id="inventory-qty"
                                type="number"
                                min="1"
                                value={form.quantity}
                                onChange={(event) => setField("quantity", event.target.value)}
                                className="w-full rounded-xl bg-black/25 border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/40"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="inventory-unit" className="text-xs text-white/70">
                                Unidad
                            </label>
                            <select
                                id="inventory-unit"
                                value={form.unit}
                                onChange={(event) => setField("unit", event.target.value)}
                                className="w-full rounded-xl bg-black/25 border border-white/15 px-3 py-2 text-sm text-black outline-none focus:border-white/40"
                            >
                                {INVENTORY_UNITS.map((unit) => (
                                    <option className="bg-white text-slate-900" key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label htmlFor="inventory-type" className="text-xs text-white/70">
                                Tipo
                            </label>
                            <select
                                id="inventory-type"
                                value={form.type}
                                onChange={(event) => setField("type", event.target.value)}
                                className="w-full rounded-xl bg-black/25 border border-white/15 px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                            >
                                {INVENTORY_TYPES.map((type) => (
                                    <option className="bg-white text-slate-900" key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="inventory-expiry" className="text-xs text-white/70">
                                Vencimiento
                            </label>
                            <input
                                id="inventory-expiry"
                                type="date"
                                value={form.expiresAt}
                                onChange={(event) => setField("expiresAt", event.target.value)}
                                className="w-full rounded-xl bg-black/25 border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/40"
                            />
                        </div>
                    </div>

                    {error && <p className="text-xs text-rose-300">{error}</p>}

                    <button
                        type="submit"
                        className="w-full rounded-xl py-2.5 bg-white/20 hover:bg-white/30 transition-colors text-sm font-medium"
                    >
                        Agregar alimento
                    </button>
                </form>

                <div className="rounded-3xl backdrop-blur-xl bg-white/10 p-4">
                    <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-white/75">Total alimentos: {items.length}</span>
                        <span className="text-amber-200">Por vencer: {expiringSoonCount}</span>
                    </div>

                    <div className="space-y-2">
                        {items.length === 0 && (
                            <p className="text-sm text-white/60 py-4 text-center">
                                Aun no agregas alimentos a tu inventario.
                            </p>
                        )}

                        {items.map((item) => {
                            const daysToExpire = getDaysToExpire(item.expiresAt);
                            const expiryMeta = getExpiryMeta(daysToExpire);

                            return (
                                <article key={item.id} className="rounded-2xl bg-black/20 border border-white/10 p-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="font-medium truncate">{item.name}</p>
                                            <p className="text-xs text-white/70 mt-1">
                                                {item.quantity} {item.unit} | {getTypeLabel(item.type)}
                                            </p>
                                            <p className={`text-xs mt-1 ${expiryMeta.tone}`}>{expiryMeta.label}</p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            className="text-xs px-2.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors shrink-0"
                                        >
                                            Quitar
                                        </button>
                                    </div>
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

