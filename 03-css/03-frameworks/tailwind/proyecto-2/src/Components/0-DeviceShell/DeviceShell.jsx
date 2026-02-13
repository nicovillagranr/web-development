// Hook para manejar navegación interna
import { useState } from "react";

// Hook de configuración global del sistema
import { useSettings } from "../../hooks/useSettings";

// Componentes principales del dispositivo
import Header from "../1-Header/Header.jsx";
import TimeSettings from "../3-ui/TimeSettings.jsx";

/**
 * DeviceShell representa el "dispositivo físico".
 *
 * Mentalmente:
 * - es la carcasa del refrigerador
 * - decide qué pantallas se ven
 * - NO maneja lógica de negocio
 */
function DeviceShell() {

    /**
     * Controla qué pantalla está activa.
     *
     * null   → pantalla principal
     * "time" → panel de ajustes de fecha y hora
     */
    const [activeScreen, setActiveScreen] = useState(null);

    /**
     * Configuración global del sistema.
     * Fuente única de verdad.
     */
    const settings = useSettings();

    return (
        <section className="relative w-120 h-screen rounded-sm bg-[url('../../assets/images/fondo-1.jpg')] bg-cover bg-center overflow-hidden">

            {/* Header del dispositivo (hora, fecha, clima, navegación) */}
            <Header
                autoTime={settings.autoTime}
                manualDate={settings.manualDate}
                is24hFormat={settings.is24hFormat}
                onOpenTimeSettings={() => setActiveScreen("time")}
            />

            {/* Panel deslizable de ajustes de fecha y hora */}
            <TimeSettings
                isActive={activeScreen === "time"}
                onBack={() => setActiveScreen(null)}
                autoTime={settings.autoTime}
                setAutoTime={settings.setAutoTime}
                is24hFormat={settings.is24hFormat}
                setIs24hFormat={settings.setIs24hFormat}
                manualDate={settings.manualDate}
                setManualDate={settings.setManualDate}
            />
        </section>
    );
}

export default DeviceShell;
