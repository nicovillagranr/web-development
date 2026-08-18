// ================= UTILIDADES DE INVENTARIO =================
// Helpers compartidos entre InventoryMainForm e InventorySettings.
import { INVENTORY_TYPES } from "../hooks/useInventory.jsx";

// getExpiryMeta: traduce días de expiración a etiqueta y color visual.
export function getExpiryMeta(daysToExpire) {
    if (daysToExpire === null) return { label: "Sin fecha", tone: "text-white/30" };
    if (daysToExpire < 0) return { label: `Vencido hace ${Math.abs(daysToExpire)}d`, tone: "text-rose-400" };
    if (daysToExpire === 0) return { label: "Vence hoy", tone: "text-amber-400" };
    if (daysToExpire <= 3) return { label: `Vence en ${daysToExpire}d`, tone: "text-amber-400" };
    return { label: `Vence en ${daysToExpire}d`, tone: "text-emerald-400" };
}

// TYPE_EMOJI: emoji representativo por cada tipo de alimento.
export const TYPE_EMOJI = {
    fruta: "🍎",
    verdura: "🌿",
    lacteo: "🥛",
    carne: "🥩",
    bebida: "🥤",
    licor: "🍷",
    congelado: "❄️",
    pescado: "🐟",
    otro: "🫙",
};

// NAME_EMOJI: emoji específico por nombre de alimento.
// Fallback: TYPE_EMOJI[type] → "📦"
export const NAME_EMOJI = {
    // Frutas
    manzana: "🍎", platano: "🍌", naranja: "🍊", frutilla: "🍓",
    limon: "🍋", durazno: "🍑", sandia: "🍉", uva: "🍇",
    mango: "🥭", piña: "🍍", pera: "🍐", cereza: "🍒",
    kiwi: "🥝", coco: "🥥", maracuya: "🍈",
    // Verduras
    tomate: "🍅", zanahoria: "🥕", papa: "🥔", brocoli: "🥦",
    pepino: "🥒", ajo: "🧄", cebolla: "🧅", pimenton: "🫑",
    espinaca: "🥬", lechuga: "🥬", repollo: "🥬", apio: "🥬",
    coliflor: "🥦", zapallo: "🎃", champinon: "🍄", maiz: "🌽",
    palta: "🥑", perejil: "🌿",
    // Lácteos
    leche: "🥛", queso: "🧀", yogur: "🫙", mantequilla: "🧈",
    crema: "🥛", ricota: "🧀", helado: "🍦",
    // Carnes
    pollo: "🍗", carne: "🥩", jamon: "🥓", pavo: "🦃",
    cerdo: "🐷", lomo: "🥩",
    // Pescados y mariscos
    salmon: "🐟", atun: "🐟", pescado: "🐟",
    // Granos y cereales
    arroz: "🍚", pasta: "🍝", pan: "🍞", harina: "🌾",
    avena: "🌾", lenteja: "🫘", garbanzo: "🫘",
    // Bebidas
    agua: "💧", cerveza: "🍺", vino: "🍷", cafe: "☕",
    pisco: "🥃", ron: "🍹",
    // Condimentos y otros
    aceite: "🫒", azucar: "🍬", miel: "🍯", sal: "🧂",
    huevo: "🥚", tortilla: "🫓",
};

// getTypeLabel: devuelve la etiqueta legible para un valor de tipo de inventario.
export function getTypeLabel(typeValue) {
    const match = INVENTORY_TYPES.find((t) => t.value === typeValue);
    return match ? match.label : typeValue;
}
