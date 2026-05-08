// ================= CONTEXTO MODULO =================
// Pantalla principal de inventario.
// Muestra el grid de alimentos y abre el wizard modal para agregar nuevos.
// ================= IMPORTS =================
import { useState } from "react";
import { useInventory } from "../hooks/useInventory.jsx";
import { getExpiryMeta, TYPE_EMOJI } from "../utils/inventoryUtils.js";
import WizardModal from "./WizardModal.jsx";

// ================= ITEM CARD =================
function ItemCard({ item, onRemove, getDaysToExpire }) {
    const days = getDaysToExpire(item.expiresAt);
    const { label, tone } = getExpiryMeta(days);
    const emoji = TYPE_EMOJI[item.type] ?? "📦";

    return (
        <article className="card-enter flex flex-col gap-1 px-1.5 py-2 rounded-xl bg-white/8 border border-white/10">
            {/* Emoji + nombre */}
            <div className="flex items-start gap-1 min-w-0">
                <span className="text-sm leading-none shrink-0 mt-0.5">{emoji}</span>
                <p className="text-[11px] text-white font-medium leading-tight break-words">{item.name}</p>
            </div>
            {/* Cantidad + botón quitar */}
            <div className="flex items-center justify-between gap-1">
                <p className="text-[10px] text-white/50 truncate">
                    {item.quantity} {item.unit}
                </p>
                <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="w-4 h-4 shrink-0 rounded-md bg-white/[0.07] border border-white/10 text-[9px] text-white/40 hover:text-white/70 hover:bg-white/12 transition-colors flex items-center justify-center leading-none"
                    aria-label={`Quitar ${item.name}`}
                >
                    ✕
                </button>
            </div>
            {/* Vencimiento */}
            <span className={`text-[10px] font-medium ${tone}`}>{label}</span>
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

            {/* Grid de tarjetas */}
            <div className="flex-1 min-h-0 relative">
                <div className="h-full overflow-y-auto no-scrollbar">
                    {items.length === 0 ? (
                        <p className="text-xs text-white/50 text-center py-4">Sin alimentos registrados.</p>
                    ) : (
                        <div className="grid grid-cols-3 gap-1.5">
                            {items.map((item) => (
                                <ItemCard
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