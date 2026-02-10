import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

function TimeSettings({
    isActive,
    onBack,
    autoTime,
    setAutoTime,
}) {
    return (
        <section
            className={`
        absolute inset-0 z-20 py-4 bg-white flex flex-col
        transition-transform duration-300 ease-out
        ${isActive ? "translate-x-0" : "-translate-x-full"}
    `}
        >

            {/* Header */}
            <header className="h-14 flex items-center px-4">
                <button
                    onClick={onBack}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
                >
                    <FiChevronLeft size={20} />
                </button>
                <h2 className="ml-2 text-lg font-medium">Fecha y hora</h2>
            </header>

            {/* Content */}
            <div className="flex-1 p-4 space-y-1">

                {/* Hora automática */}
                <div className="h-14 rounded-lg bg-gray-100 flex items-center justify-between px-4">
                    <span>Fecha y Hora Automáticas</span>

                    <button
                        onClick={() => setAutoTime(prev => !prev)}
                        className={`relative w-11 h-6 rounded-full transition ${autoTime ? "bg-green-500" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${autoTime ? "translate-x-5" : ""
                                }`}
                        />
                    </button>
                </div>

                {/* Ajustes manuales */}
                <div className={`h-14 rounded-lg bg-gray-100 flex items-center px-4 ${autoTime ? "opacity-40 pointer-events-none" : "cursor-pointer hover:bg-gray-200"
                    }`}>
                    Ajustar Fecha
                </div>

                <div className={`h-14 rounded-lg bg-gray-100 flex items-center px-4 ${autoTime ? "opacity-40 pointer-events-none" : "cursor-pointer hover:bg-gray-200"
                    }`}>
                    Ajustar Hora
                </div>

                {/* Independientes */}
                <div
                    className={`
        h-14 rounded-lg bg-gray-100 flex items-center px-4
        ${autoTime
                            ? "opacity-40 pointer-events-none"
                            : "cursor-pointer hover:bg-gray-200"}
    `}
                >
                    Zona horaria
                </div>

                <div className="h-14 rounded-lg bg-gray-100 flex items-center px-4 cursor-pointer hover:bg-gray-200">
                    Formato 24 horas
                </div>

            </div>
        </section>
    );
}

export default TimeSettings;
