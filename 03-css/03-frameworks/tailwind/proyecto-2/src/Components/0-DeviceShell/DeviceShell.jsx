// DeviceShell tiene como función imitar el HardWare del dispositivo de salida, que en este caso será un refrigerador en un modelo 3D en Three.js
// Este refrigerador será uno de los varios proyecto FrontEnd de mi portafolio.
// Incluirá uso de APIs y manejo de inventario para gestionar el stock de productos.

// Importamos useState para manejar el estado de las pantallas activas
import { useState } from "react"

import fondoScreen from "../../assets/images/fondo-1.jpg"
import fondoScreen2 from "../../assets/images/fondo-2.jpg"

// Imports de Componentes
import Header from "../1-Header/Header.jsx"
import TimeSettings from "../3-ui/TimeSettings.jsx"

function DeviceShell() {
    const [activeScreen, setActiveScreen] = useState(null);

    const [autoTime, setAutoTime] = useState(true);
    const [manualDate, setManualDate] = useState(new Date());

    return (
        <section className="relative w-120 h-screen rounded-sm bg-[url('../../assets/images/fondo-1.jpg')] bg-cover bg-center overflow-hidden">

            <Header
                autoTime={autoTime}
                manualDate={manualDate}
                onOpenTimeSettings={() => setActiveScreen("time")}
            />

            <TimeSettings
                isActive={activeScreen === "time"}
                onBack={() => setActiveScreen(null)}
                autoTime={autoTime}
                setAutoTime={setAutoTime}
                manualDate={manualDate}
                setManualDate={setManualDate}
            />
        </section>
    );
}

export default DeviceShell;