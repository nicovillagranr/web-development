// ================= IMPORTS =================
import s from "./WeatherSettingsShell.module.css";

// ================= COMPONENTE/FUNCION =================
// WeatherSettingsShell: punto de entrada; recibe props/parametros: { isActive, gradient, children }
// Este componente:
// - controla la transicion de entrada/salida del panel weather settings
// - aplica el gradiente de fondo segun clima actual
// - renderiza children como contenido interno del modulo
export default function WeatherSettingsShell({ isActive, gradient, children }) {
    return (
        <section className={`${s["weather-shell"]} ${gradient} ${isActive ? s["weather-shell--active"] : s["weather-shell--hidden"]}`}>
            {children}
        </section>
    );
}
