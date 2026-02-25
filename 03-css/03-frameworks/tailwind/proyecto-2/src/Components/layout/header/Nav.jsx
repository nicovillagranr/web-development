// ================= IMPORTS =================
import { useEffect, useState } from "react";

import CardRecipe from "../../ui/CardRecipe.jsx";
import CardMusic from "../../ui/CardMusic.jsx";
import CardTime from "../../ui/CardTime.jsx";
import CardWeather from "../../ui/CardWeather.jsx";

const ORDER_STORAGE_KEY = "smart_cooler_nav_order_v1";
const FIXED_CARD_ID = "inventory";
const MOVABLE_CARD_IDS = ["music", "time", "weather"];

const DEFAULT_ORDER = ["music", "time", "weather"];

const SLOT_CLASSES = [
    "col-span-1 row-span-3", // Card 1 (Recetas: larga vertical)
    "col-span-1 row-span-1", // Card 2
    "col-span-1 row-span-1", // Card 3
    "col-span-1 row-span-1", // Card 4
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
// Nav: helper/componente interno; parametros: { time, weather, onOpenTimeSettings, onOpenWeatherSettings, onOpenInventorySettings, onOpenMusicSettings }
function Nav({ time, weather, onOpenTimeSettings, onOpenWeatherSettings, onOpenInventorySettings, onOpenMusicSettings }) {
    const [cardOrder, setCardOrder] = useState(() =>
        normalizeMovableOrder(loadSavedOrder()),
    );
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const normalizedOrder = normalizeMovableOrder(cardOrder);
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(normalizedOrder));
    }, [cardOrder]);

    useEffect(() => {
        setCardOrder((prevOrder) => normalizeMovableOrder(prevOrder));
    }, []);

    useEffect(() => {
        if (!isEditMode) setSelectedId(null);
    }, [isEditMode]);

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

        openHandler();
    };

    const cardsById = {
        inventory: {
            Component: CardRecipe,
            props: {},
            onOpen: onOpenInventorySettings,
        },
        music: {
            Component: CardMusic,
            props: {},
            onOpen: onOpenMusicSettings,
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

    // Render/retorno del bloque actual
    return (
        <nav className="w-full">
            <div className="h-6 flex items-center justify-end mb-1">
                <button
                    type="button"
                    onClick={() => setIsEditMode((prev) => !prev)}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-black/10 text-black"
                >
                    {isEditMode ? "Listo" : "Editar"}
                </button>
            </div>

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
        </nav>
    );
}
export default Nav;
