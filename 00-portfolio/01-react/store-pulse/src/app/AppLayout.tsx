import { NavLink, Outlet } from "react-router-dom";

/**
 * El armazón de la app: contenido arriba, navegación abajo.
 *
 * La barra va abajo y no arriba porque esta app se usa de pie, con una mano y a
 * veces con guantes, en el pasillo de un local. Todo lo pulsable tiene que caer
 * dentro del arco del pulgar, y cada objetivo táctil pasa de 44 px.
 *
 * Dos pestañas y no tres: el nivel de "trabajador" es el detalle de una persona
 * concreta, así que no puede ser una pestaña hasta que la app sepa quién eres (eso
 * llega con la autenticación). Hasta entonces se entra desde el ranking.
 */

const TABS = [
  { to: "/", label: "Local", end: true },
  { to: "/equipo", label: "Equipo", end: false },
] as const;

export function AppLayout() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg">
      <main className="flex flex-col gap-4 p-4">
        <Outlet />
      </main>

      <nav
        aria-label="Secciones"
        className="border-line bg-surface fixed inset-x-0 bottom-0 z-10 border-t pb-[env(safe-area-inset-bottom)]"
      >
        <ul className="mx-auto flex w-full max-w-lg">
          {TABS.map((tab) => (
            <li key={tab.to} className="flex-1">
              <NavLink
                to={tab.to}
                end={tab.end}
                className={({ isActive }) =>
                  `flex min-h-[3.25rem] items-center justify-center text-sm font-medium transition-colors ${
                    isActive ? "text-brand" : "text-ink-soft"
                  }`
                }
              >
                {/* aria-current lo pone NavLink solo cuando la ruta está activa, así
                    que el lector de pantalla sabe dónde estás sin depender del color. */}
                {tab.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
