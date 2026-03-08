// ================= CONTEXTO MODULO =================
// Hook de estado para inventario de alimentos.
// Gestiona CRUD, validaciones y sincronizacion localStorage + evento global.
// ================= IMPORTS =================
import { useEffect, useMemo, useState } from "react";

// ================= CONSTANTS =================
export const INVENTORY_STORAGE_KEY = "smart_cooler_inventory_v1";
export const INVENTORY_UPDATED_EVENT = "smart-cooler:inventory-updated";

export const INVENTORY_TYPES = [
    { value: "fruta", label: "Fruta" },
    { value: "verdura", label: "Verdura" },
    { value: "lacteo", label: "Lacteo" },
    { value: "carne", label: "Carne" },
    { value: "bebida", label: "Bebida" },
    { value: "congelado", label: "Congelado" },
    { value: "otro", label: "Otro" },
];

export const INVENTORY_UNITS = [
    { value: "u", label: "un" },
    { value: "kg", label: "kg" },
    { value: "g", label: "g" },
    { value: "l", label: "L" },
    { value: "ml", label: "ml" },
];

const DEFAULT_FORM = {
    name: "",
    quantity: "1",
    unit: INVENTORY_UNITS[0].value,
    type: INVENTORY_TYPES[0].value,
    expiresAt: "",
};

function getDaysToExpire(expiresAt) {
    if (!expiresAt) return null;

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const targetDate = new Date(`${expiresAt}T00:00:00`);
    if (Number.isNaN(targetDate.getTime())) return null;

    return Math.floor((targetDate.getTime() - now.getTime()) / 86400000);
}

function parseStoredItems(rawValue) {
    if (!rawValue) return [];

    try {
        const parsed = JSON.parse(rawValue);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function createItemId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// ================= HOOK =================
export function useInventory() {
    const [items, setItems] = useState(() => {
        if (typeof window === "undefined") return [];
        return parseStoredItems(localStorage.getItem(INVENTORY_STORAGE_KEY));
    });
    const [form, setForm] = useState(DEFAULT_FORM);
    const [error, setError] = useState("");

    useEffect(() => {
        localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(items));
        window.dispatchEvent(
            new CustomEvent(INVENTORY_UPDATED_EVENT, { detail: { items } }),
        );
    }, [items]);

    const expiringSoonCount = useMemo(
        () =>
            items.filter((item) => {
                const days = getDaysToExpire(item.expiresAt);
                return days !== null && days >= 0 && days <= 3;
            }).length,
        [items],
    );

    const setField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (error) setError("");
    };

    const removeItem = (itemId) => {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
    };

    const addItem = () => {
        const trimmedName = form.name.trim();
        const parsedQuantity = Number.parseInt(form.quantity, 10);

        if (!trimmedName) {
            setError("Ingresa el nombre del alimento.");
            return false;
        }

        if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
            setError("La cantidad debe ser un numero mayor a 0.");
            return false;
        }

        if (!form.expiresAt) {
            setError("Selecciona una fecha de vencimiento.");
            return false;
        }

        const nextItem = {
            id: createItemId(),
            name: trimmedName,
            quantity: parsedQuantity,
            unit: form.unit,
            type: form.type,
            expiresAt: form.expiresAt,
            createdAt: new Date().toISOString(),
        };

        setItems((prev) => [nextItem, ...prev]);
        setForm(DEFAULT_FORM);
        setError("");
        return true;
    };

    return {
        items,
        form,
        error,
        expiringSoonCount,
        setField,
        addItem,
        removeItem,
        getDaysToExpire,
    };
}
