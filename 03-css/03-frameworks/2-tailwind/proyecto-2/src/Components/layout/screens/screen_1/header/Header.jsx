// ================= CONTEXTO MODULO =================
// Header compuesto del dashboard.
// Integra TopBar y Nav usando fecha/hora derivada del hook useDateTime.
// ================= IMPORTS =================
import { useDateTime } from "@screen1/features/time/hooks/useDateTime.jsx";

import TopBar from "./TopBar";
import Nav from "./Nav.jsx";

// El componente Header es responsable de mostrar la informaciÃ³n de fecha, hora y clima en la parte superior de la interfaz del dispositivo. Utiliza el hook personalizado useDateTime para calcular la fecha y hora actuales basÃ¡ndose en las configuraciones de tiempo automÃ¡tico, fecha manual y formato de 24 horas. AdemÃ¡s, recibe los datos climÃ¡ticos a travÃ©s de props para mostrarlos junto con la fecha y hora. El Header tambiÃ©n incluye componentes hijos como TopBar, que muestra la informaciÃ³n de tiempo y clima, y Nav, que proporciona botones para acceder a los ajustes de tiempo y clima, permitiendo una navegaciÃ³n fÃ¡cil entre las diferentes pantallas de configuraciÃ³n.
function Header({
    autoTime,
    manualDate,
    is24hFormat,
    weather,
    onOpenTimeSettings,
    onOpenWeatherSettings,
    onOpenInventorySettings,
    onOpenShoppingSettings,
    showTopBar = true,
    showNav = true,
    className = "",
}) {

    // Manejar fecha y hora utilizando el hook personalizado useDateTime, que toma en cuenta las configuraciones de tiempo automÃ¡tico, fecha manual y formato de 24 horas para calcular la fecha y hora actuales que se mostrarÃ¡n en la interfaz. Esto permite que el componente Header tenga acceso a la informaciÃ³n de fecha y hora actualizada segÃºn las preferencias del usuario, y pueda pasar esta informaciÃ³n a los componentes hijos como TopBar y Nav para su visualizaciÃ³n. AdemÃ¡s, al recibir la informaciÃ³n del clima a travÃ©s de props, el Header puede mostrar datos climÃ¡ticos relevantes junto con la fecha y hora, creando una experiencia de usuario mÃ¡s completa e informativa.
    const { date, time } = useDateTime({
        autoTime,
        manualDate,
        is24hFormat,
    });


    // Render/retorno del bloque actual
    return (
        <header className={`w-full flex flex-col px-4 py-2 gap-2 ${className}`}>
            {/* Barra fina superior | No tiene interactividad */}
            {showTopBar && <TopBar time={time} date={date} weather={weather} />}
            {/* Barra de navegaciÃ³n con 3 Contenedores/Botones | Tiene interactividad | Tiene MenÃºs desplegables */}
            {showNav && (
                <Nav
                    time={time}
                    weather={weather}
                    onOpenTimeSettings={onOpenTimeSettings}
                    onOpenWeatherSettings={onOpenWeatherSettings}
                    onOpenInventorySettings={onOpenInventorySettings}
                    onOpenShoppingSettings={onOpenShoppingSettings}
                />
            )}
        </header>
    );
}
export default Header;