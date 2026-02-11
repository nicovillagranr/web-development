import { useDateTime } from "../../hooks/useDateTime";
import { useWeather } from "../../hooks/useWeather";

import TopBar from "./TopBar";
import Nav from "./Nav";

/**
 * Header
 *
 * Componente orquestador.
 * No contiene lógica de negocio propia:
 * - No calcula la hora
 * - No decide formatos
 * - No maneja estado
 *
 * Su rol es:
 * - Consumir hooks especializados
 * - Distribuir datos ya procesados a componentes presentacionales
 */
function Header({
    autoTime,
    manualDate,
    is24hFormat,
    timeZone,
    onOpenTimeSettings,
}) {

    /**
     * Hook encargado de entregar fecha y hora final.
     *
     * Este hook decide:
     * - si la hora es automática o manual
     * - cómo se formatea (12h / 24h)
     * - qué zona horaria se utiliza
     *
     * Header sólo consume el resultado.
     */
    const { date, time } = useDateTime({
        autoTime,
        manualDate,
        is24hFormat,
        timeZone,
    });

    /**
     * Hook encargado de obtener la información del clima.
     * No depende del sistema de fecha/hora.
     */
    const weather = useWeather();

    return (
        <header className="w-full flex flex-col px-4 py-2 gap-2">
            {/* 
                TopBar es completamente presentacional.
                No sabe cómo se calcula la hora ni el clima.
            */}
            <TopBar
                time={time}
                date={date}
                weather={weather}
            />

            {/*
                Nav maneja interacciones de navegación:
                - abrir ajustes
                - cambiar pantallas
            */}
            <Nav
                time={time}
                weather={weather}
                onOpenTimeSettings={onOpenTimeSettings}
            />
        </header>
    );
}

export default Header;
