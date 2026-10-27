import { site } from "../data/site";
import { Container } from "./ui/Container";
import { WhatsAppButton } from "./WhatsAppButton";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#como-trabajamos", label: "Cómo trabajamos" },
];

// En móvil el header no es sticky: el CTA fijo ya vive abajo, en la zona del pulgar,
// y dos barras fijas se comerían casi un quinto de la pantalla. Desde md, con
// pantalla de sobra, el header se queda arriba y se lleva el botón.
export function Header() {
  return (
    <header className="z-30 bg-canvas/80 backdrop-blur-xl md:sticky md:top-0">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>
      <Container className="flex h-14 items-center justify-between">
        <a href="#inicio" className="text-[21px] font-semibold tracking-[-0.03em]">
          {site.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <nav aria-label="Principal">
            <ul className="flex gap-8 text-[14px] text-muted">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <WhatsAppButton size="sm">WhatsApp</WhatsAppButton>
        </div>
      </Container>
    </header>
  );
}
