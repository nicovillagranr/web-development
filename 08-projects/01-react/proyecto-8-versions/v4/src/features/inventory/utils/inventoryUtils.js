// ================= UTILIDADES DE INVENTARIO =================
// Helpers compartidos entre InventoryMainForm e InventorySettings.
import { INVENTORY_TYPES } from "../hooks/useInventory.jsx";

// getExpiryMeta: traduce días de expiración a etiqueta y color visual.
export function getExpiryMeta(daysToExpire) {
    if (daysToExpire === null) return { label: "Sin fecha",                                tone: "text-white/30" };
    if (daysToExpire < 0)      return { label: `Vencido hace ${Math.abs(daysToExpire)}d`, tone: "text-rose-400" };
    if (daysToExpire === 0)    return { label: "Vence hoy",                               tone: "text-amber-400" };
    if (daysToExpire <= 3)     return { label: `Vence en ${daysToExpire}d`,               tone: "text-amber-400" };
    return                            { label: `Vence en ${daysToExpire}d`,               tone: "text-emerald-400" };
}

// TYPE_EMOJI: emoji representativo por cada tipo de alimento.
export const TYPE_EMOJI = {
    fruta:     "🍎",
    verdura:   "🌿",
    lacteo:    "🥛",
    carne:     "🥩",
    bebida:    "🥤",
    licor:     "🍷",
    congelado: "❄️",
    pescado:   "🐟",
    otro:      "🫙",
};

// getTypeLabel: devuelve la etiqueta legible para un valor de tipo de inventario.
export function getTypeLabel(typeValue) {
    const match = INVENTORY_TYPES.find((t) => t.value === typeValue);
    return match ? match.label : typeValue;
}
