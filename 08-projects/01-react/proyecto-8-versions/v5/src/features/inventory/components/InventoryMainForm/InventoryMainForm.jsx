// ================= CONTEXTO MODULO =================
// Pantalla principal de inventario.
// Muestra el grid de alimentos y abre el wizard modal para agregar nuevos.
// ================= IMPORTS =================
import { useState } from "react";
import { useInventory } from "../../hooks/useInventory.jsx";
import { getExpiryMeta, NAME_EMOJI, TYPE_EMOJI, getTypeLabel } from "../../utils/inventoryUtils.js";
import WizardModal from "../WizardModal";
import s from "./InventoryMainForm.module.css";

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
    const nameKey = item.name.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const emoji = NAME_EMOJI[nameKey] ?? TYPE_EMOJI[item.type] ?? "📦";
    const dotColor = DOT_COLOR[tone] ?? "bg-white/30";

    return (
        <article className={`card-enter ${s["item-row"]}`}>
            <span className={s["item-row__emoji"]}>{emoji}</span>

            <div className={s["item-row__info"]}>
                <p className={s["item-row__name"]}>{item.name}</p>
                <span className={s["item-row__type"]}>{getTypeLabel(item.type)}</span>
            </div>

            <span className={s["item-row__quantity"]}>
                {item.quantity} {item.unit}
            </span>

            <div className={s["item-row__expiry"]}>
                <span className={`${s["item-row__dot"]} ${dotColor}`} />
                <span className={`${s["item-row__expiry-label"]} ${tone}`}>{label}</span>
            </div>

            <button
                type="button"
                onClick={() => onRemove(item.id)}
                className={s["item-row__remove"]}
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
        <section aria-label="Inventario de alimentos" className={s.inventory}>

            {/* Header */}
            <div className={s.inventory__header}>
                <span className={s["inventory__header-label"]}>Inventario</span>
                <div className={s["inventory__header-info"]}>
                    {expiringSoonCount > 0 && (
                        <span className={s["inventory__header-expiring"]}>{expiringSoonCount} por vencer</span>
                    )}
                    <span className={s["inventory__header-count"]}>{items.length} items</span>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className={s["inventory__add-btn"]}
                        aria-label="Agregar alimento"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Lista de alimentos */}
            <div className={s["inventory__list-wrap"]}>
                <div className={`${s["inventory__list-scroll"]} no-scrollbar`}>
                    {items.length === 0 ? (
                        <p className={s.inventory__empty}>Sin alimentos registrados.</p>
                    ) : (
                        <div className={s.inventory__list}>
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
                    <div className={s.inventory__fade} />
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
