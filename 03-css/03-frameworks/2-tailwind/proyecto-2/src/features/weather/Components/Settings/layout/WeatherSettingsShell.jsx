
// ================= COMPONENTE/FUNCION =================
// WeatherSettingsShell: punto de entrada; recibe props/parametros: { isActive, gradient, children }
export default function WeatherSettingsShell({ isActive, gradient, children }) {
    // Render/retorno del bloque actual
    return (
        <section className={`absolute inset-x-0 top-0 h-dvh min-h-svh z-20 flex flex-col text-white transition-transform duration-500 ease-out
        ${gradient} ${isActive ? "translate-x-0" : "-translate-x-full"}`}>
            {children}
        </section>
    );
}
