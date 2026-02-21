import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import TimeEditorModal from "./TimeEditorModal";

function TimeSettings({
    isActive,
    onBack,
    autoTime,
    setAutoTime,
    is24hFormat,
    setIs24hFormat,
    manualDate,
    setManualDate,
}) {
    const [activeEditor, setActiveEditor] = useState(null);

    useEffect(() => {
        if (autoTime) {
            setActiveEditor(null);
        }
    }, [autoTime]);

    return (
        <section
            className={`absolute inset-0 z-20 py-4 flex flex-col transition-transform duration-500 ease-out ${isActive ? "translate-x-0" : "-translate-x-full"}`}
            style={{ backgroundColor: "#1B1C27", color: "#F5F5F5" }}
        >
            {/* Header del panel */}
            <header className="h-14 flex items-center px-4">
                <button
                    aria-label="Volver"
                    className="w-8 h-8 flex items-center justify-center rounded-full transition text-gray-200 hover:text-white"
                    onClick={() => {
                        if (activeEditor) {
                            setActiveEditor(null);
                        } else {
                            onBack();
                        }
                    }}
                >
                    <FiChevronLeft size={20} />
                </button>
                <h2 className="ml-2 text-lg font-medium">Fecha y hora</h2>
            </header>

            {/* Contenido principal */}
            <div className="flex-1 p-4 space-y-2">

                {/* Switch: Hora automática */}
                <div className="h-14 rounded-lg bg-gray-100 flex items-center justify-between px-4">
                    <span className="text-gray-900">Fecha y Hora Automáticas</span>
                    <button
                        onClick={() => setAutoTime(!autoTime)}
                        className={`relative w-11 h-6 rounded-full transition ${autoTime ? "bg-green-500" : "bg-gray-300"}`}
                    >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${autoTime ? "translate-x-5" : ""}`} />
                    </button>
                </div>

                {/* Ajustar Fecha */}
                <div
                    onClick={() => setActiveEditor("date")}
                    className={`h-14 rounded-lg bg-gray-100 flex items-center px-4 ${autoTime
                        ? "opacity-40 pointer-events-none"
                        : "cursor-pointer hover:bg-gray-200"}`}
                >
                    <span className="text-gray-900 font-medium">Ajustar Fecha</span>
                </div>

                {/* Ajustar Hora */}
                <div
                    onClick={() => setActiveEditor("time")}
                    className={`h-14 rounded-lg bg-gray-100 flex items-center px-4 ${autoTime
                        ? "opacity-40 pointer-events-none"
                        : "cursor-pointer hover:bg-gray-200"}`}
                >
                    <span className="text-gray-900 font-medium">Ajustar Hora</span>
                </div>

                {/* Switch: Formato 24h */}
                <div className="h-14 rounded-lg bg-gray-100 flex items-center justify-between px-4 mt-2">
                    <span className="text-gray-900">Formato 24 horas</span>
                    <button
                        onClick={() => setIs24hFormat(!is24hFormat)}
                        className={`relative w-11 h-6 rounded-full transition ${is24hFormat ? "bg-green-500" : "bg-gray-300"}`}
                    >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${is24hFormat ? "translate-x-5" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Modal flotante */}
            {activeEditor && !autoTime && (
                <TimeEditorModal
                    mode={activeEditor}
                    manualDate={manualDate}
                    setManualDate={setManualDate}
                    onClose={() => setActiveEditor(null)}
                />
            )}
        </section>
    );
}

export default TimeSettings;