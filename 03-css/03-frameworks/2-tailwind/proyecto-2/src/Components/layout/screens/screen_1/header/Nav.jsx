// ================= CONTEXTO MODULO =================
// Grid de tarjetas de navegacion rapida.
// Permite reordenar tarjetas movibles y persistir layout en localStorage.
// ================= IMPORTS =================
import { useEffect, useState } from "react";

// Componentes de tarjeta específicos
import CardRecipe from "../ui/cards/CardRecipe.jsx";
import CardShoppingList from "../ui/cards/CardShoppingList.jsx";
import CardTime from "../ui/cards/CardTime.jsx";
import CardWeather from "../ui/cards/CardWeather.jsx";

// Constantes para la gestión del orden de las tarjetas
const ORDER_STORAGE_KEY = "smart_cooler_nav_order_v2";
const FIXED_CARD_ID = "inventory";
const MOVABLE_CARD_IDS = ["time", "weather", "shopping"];

const DEFAULT_ORDER = ["time", "weather", "shopping"];

const SLOT_CLASSES = [
    "col-span-1 row-span-3",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
];

function normalizeMovableOrder(value) {
    const incoming = Array.isArray(value)
        ? value.filter((cardId) => cardId !== FIXED_CARD_ID)
        : [];

    const unique = [];
    incoming.forEach((cardId) => {
        if (MOVABLE_CARD_IDS.includes(cardId) && !unique.includes(cardId)) {
            unique.push(cardId);
        }
    });

    MOVABLE_CARD_IDS.forEach((cardId) => {
        if (!unique.includes(cardId)) unique.push(cardId);
    });

    return unique.slice(0, MOVABLE_CARD_IDS.length);
}

function isValidOrder(value) {
    if (!Array.isArray(value) || value.length !== MOVABLE_CARD_IDS.length) return false;
    const uniqueValues = new Set(value);
    if (uniqueValues.size !== MOVABLE_CARD_IDS.length) return false;
    return MOVABLE_CARD_IDS.every((cardId) => uniqueValues.has(cardId));
}

function loadSavedOrder() {
    if (typeof window === "undefined") return DEFAULT_ORDER;

    try {
        const parsed = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || "[]");
        const normalized = normalizeMovableOrder(parsed);
        return isValidOrder(normalized) ? normalized : DEFAULT_ORDER;
    } catch {
        return DEFAULT_ORDER;
    }
}

function swapCards(order, sourceId, targetId) {
    const sourceIndex = order.indexOf(sourceId);
    const targetIndex = order.indexOf(targetId);

    if (sourceIndex < 0 || targetIndex < 0) return order;

    const nextOrder = [...order];
    [nextOrder[sourceIndex], nextOrder[targetIndex]] = [nextOrder[targetIndex], nextOrder[sourceIndex]];
    return nextOrder;
}

// ================= FUNCION =================
// Nav: helper/componente interno; parametros: { time, weather, onOpenTimeSettings, onOpenWeatherSettings, onOpenShoppingSettings }
function Nav({ time, weather, onOpenTimeSettings, onOpenWeatherSettings, onOpenShoppingSettings }) {
    const [cardOrder, setCardOrder] = useState(() =>
        normalizeMovableOrder(loadSavedOrder()),
    );
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const normalizedOrder = normalizeMovableOrder(cardOrder);
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(normalizedOrder));
    }, [cardOrder]);

    const handleTapSwap = (cardId) => {
        if (cardId === FIXED_CARD_ID) return;

        if (!selectedId) {
            setSelectedId(cardId);
            return;
        }

        if (selectedId === cardId) {
            setSelectedId(null);
            return;
        }

        setCardOrder((prevOrder) =>
            normalizeMovableOrder(swapCards(prevOrder, selectedId, cardId)),
        );
        setSelectedId(null);
    };

    const handleCardClick = (cardId, openHandler) => () => {
        if (isEditMode) {
            if (cardId === FIXED_CARD_ID) return;
            handleTapSwap(cardId);
            return;
        }

        if (typeof openHandler === "function") {
            openHandler();
        }
    };

    const cardsById = {
        inventory: {
            Component: CardRecipe,
            props: {},
            onOpen: undefined,
        },
        shopping: {
            Component: CardShoppingList,
            props: {},
            onOpen: onOpenShoppingSettings,
        },
        time: {
            Component: CardTime,
            props: { time },
            onOpen: onOpenTimeSettings,
        },
        weather: {
            Component: CardWeather,
            props: { weather },
            onOpen: onOpenWeatherSettings,
        },
    };
    const renderOrder = [FIXED_CARD_ID, ...normalizeMovableOrder(cardOrder)];

    return (
        <nav className="w-full">
            <section className="grid grid-cols-2 grid-rows-3 gap-3 w-full h-50">
                {renderOrder.map((cardId, slotIndex) => {
                    const cardConfig = cardsById[cardId];
                    if (!cardConfig) return null;

                    const { Component, props, onOpen } = cardConfig;
                    const isSelected = selectedId === cardId && cardId !== FIXED_CARD_ID;

                    return (
                        <div key={cardId} className={SLOT_CLASSES[slotIndex]}>
                            <Component
                                {...props}
                                onClick={handleCardClick(cardId, onOpen)}
                                className={`w-full h-full ${isSelected ? "ring-2 ring-emerald-300" : ""}`}
                            />
                        </div>
                    );
                })}
            </section>

            <div className="h-6 flex items-center justify-end mt-1">

                {/* Botón para editar el orden de las tarjetas */}
                <button type="button" onClick={() =>
                    setIsEditMode((prev) => {
                        const nextIsEditMode = !prev;
                        if (!nextIsEditMode) setSelectedId(null);
                        return nextIsEditMode;
                    })} className="text-[11px] px-2 py-0.5 rounded-full bg-black/10 text-black">
                    {isEditMode ? "Listo" : "Editar"}
                </button>

            </div>
        </nav>
    );
}
export default Nav;