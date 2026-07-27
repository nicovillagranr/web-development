// ================= CONTEXTO MODULO =================
// Pantalla principal de inventario.
// Muestra el grid de alimentos y abre el wizard modal para agregar nuevos.
// ================= IMPORTS =================
import { useState } from "react";
import { useInventory } from "../../hooks/useInventory.jsx";
import { getExpiryMeta, NAME_EMOJI, TYPE_EMOJI, getTypeLabel } from "../../utils/inventoryUtils.js";
import WizardModal from "../WizardModal";

// ================= ITEM ROW =================
const DOT_COLOR = {
    "text-emerald-400": "bg-emerald-400",
    "text-amber-400":   "bg-amber-400",
    "text-rose-400":    "bg-rose-400",
    "text-white/30":    "bg-white/30",
};

function ItemRow({ item, onRemove, getDaysToExpire }) {
    const days = getDaysToExpire(item.expiresAt);
    const { label, tone } = getExpiryMeta(days);
    const nameKey = item.name.toLowerCase().trim().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const emoji = NAME_EMOJI[nameKey] ?? TYPE_EMOJI[item.type] ?? "📦";
    const dotColor = DOT_COLOR[tone] ?? "bg-white/30";

    return (
        <article className="card-enter group flex items-center gap-3 px-2 py-2 border-b border-white/6 transition-colors hover:bg-white/5">
            <span className="text-lg leading-none shrink-0">{emoji}</span>

            <div className="flex flex-col min-w-0 flex-1">
                <p className="text-xs text-white font-medium truncate">{item.name}</p>
                <span className="text-[10px] text-white/35">{getTypeLabel(item.type)}</span>
            </div>

            <span className="text-[11px] text-white/50 shrink-0">
                {item.quantity} {item.unit}
            </span>

            <div className="flex items-center gap-1.5 shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
                <span className={`text-[10px] whitespace-nowrap ${tone}`}>{label}</span>
            </div>

            <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="w-5 h-5 shrink-0 rounded-md text-[10px] text-white/0 group-hover:text-white/30 hover:text-white/70 transition-colors flex items-center justify-center leading-none"
                aria-label={`Quitar ${item.name}`}
            >
                ✕
            </button>
        </article>
    );
}

// ================= COMPONENTE =================
function InventoryMainForm() {
    const {
        items,
        form,
        error,
        expiringSoonCount,
        setField,
        addItem,
        removeItem,
        resetForm,
        getDaysToExpire,
    } = useInventory();

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section aria-label="Inventario de alimentos" className="h-full rounded-2xl bg-surface border border-white/10 text-white p-4 flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between mb-3 shrink-0">
                <span className="text-[10px] uppercase tracking-[0.14em] text-white/40 font-medium">Inventario</span>
                <div className="flex items-center gap-3">
                    {expiringSoonCount > 0 && (
                        <span className="text-[11px] text-amber-400/90">{expiringSoonCount} por vencer</span>
                    )}
                    <span className="text-[11px] text-white/50">{items.length} items</span>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="w-7 h-7 rounded-lg bg-white/[0.07] border border-white/9 text-white/60 hover:text-white hover:bg-white/12 transition-colors flex items-center justify-center text-base leading-none"
                        aria-label="Agregar alimento"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Lista de alimentos */}
            <div className="flex-1 min-h-0 relative">
                <div className="h-full overflow-y-auto no-scrollbar">
                    {items.length === 0 ? (
                        <p className="text-xs text-white/50 text-center py-4">Sin alimentos registrados.</p>
                    ) : (
                        <div className="flex flex-col">
                            {items.map((item) => (
                                <ItemRow
                                    key={item.id}
                                    item={item}
                                    onRemove={removeItem}
                                    getDaysToExpire={getDaysToExpire}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {/* Fade inferior — indica que hay más contenido al hacer scroll */}
                {items.length > 0 && (
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-surface to-transparent pointer-events-none" />
                )}
            </div>

            {/* Wizard modal — se monta solo cuando está abierto */}
            {isModalOpen && (
                <WizardModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    form={form}
                    error={error}
                    setField={setField}
                    addItem={addItem}
                    resetForm={resetForm}
                />
            )}

        </section>
    );
}
export default InventoryMainForm;
