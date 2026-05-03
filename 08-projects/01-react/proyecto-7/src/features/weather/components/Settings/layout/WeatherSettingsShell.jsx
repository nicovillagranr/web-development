// ================= COMPONENTE/FUNCION =================
const SHELL_BASE = "absolute inset-x-0 top-0 h-dvh min-h-svh z-20 flex flex-col text-white transition-transform duration-500 ease-out";

export default function WeatherSettingsShell({ isActive, gradient, children }) {
    return (
        <section className={`${SHELL_BASE} ${gradient} ${isActive ? "translate-x-0" : "-translate-x-full"}`}>
            {children}
        </section>
    );
}
