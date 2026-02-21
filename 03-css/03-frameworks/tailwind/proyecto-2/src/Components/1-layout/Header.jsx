import { useDateTime } from "../2-time/useDateTime.jsx";

import TopBar from "./TopBar";
import Nav from "./Nav";
import WeatherPreview from "../3-weather/test/WeatherPreview.jsx"

// El componente Header es responsable de mostrar la información de fecha, hora y clima en la parte superior de la interfaz del dispositivo. Utiliza el hook personalizado useDateTime para calcular la fecha y hora actuales basándose en las configuraciones de tiempo automático, fecha manual y formato de 24 horas. Además, recibe los datos climáticos a través de props para mostrarlos junto con la fecha y hora. El Header también incluye componentes hijos como TopBar, que muestra la información de tiempo y clima, y Nav, que proporciona botones para acceder a los ajustes de tiempo y clima, permitiendo una navegación fácil entre las diferentes pantallas de configuración.
function Header({
    autoTime,
    manualDate,
    is24hFormat,
    weather,
    onOpenTimeSettings,
    onOpenWeatherSettings,
}) {

    // Manejar fecha y hora utilizando el hook personalizado useDateTime, que toma en cuenta las configuraciones de tiempo automático, fecha manual y formato de 24 horas para calcular la fecha y hora actuales que se mostrarán en la interfaz. Esto permite que el componente Header tenga acceso a la información de fecha y hora actualizada según las preferencias del usuario, y pueda pasar esta información a los componentes hijos como TopBar y Nav para su visualización. Además, al recibir la información del clima a través de props, el Header puede mostrar datos climáticos relevantes junto con la fecha y hora, creando una experiencia de usuario más completa e informativa.
    const { date, time } = useDateTime({
        autoTime,
        manualDate,
        is24hFormat,
    });


    return (
        <header className="w-full flex flex-col px-4 py-2 gap-2">
            {/* Barra fina superior | No tiene interactividad */}
            <TopBar time={time} date={date} weather={weather} />

            {/* Barra de navegación con 3 Contenedores/Botones | Tiene interactividad | Tiene Menús desplegables */}
            <Nav time={time} weather={weather} onOpenTimeSettings={onOpenTimeSettings} onOpenWeatherSettings={onOpenWeatherSettings} />
        </header>
    );
}

export default Header;
