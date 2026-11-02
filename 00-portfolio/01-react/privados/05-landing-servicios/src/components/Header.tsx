import { site } from "../data/site";
import { Container } from "./ui/Container";
import { WhatsAppButton } from "./WhatsAppButton";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#preguntas", label: "Preguntas" },
];

// Móvil: solo el logo. El CTA ya vive abajo, en la barra fija de la zona del pulgar, y
// los tres enlaces del mockup partían el header en dos o tres filas. Una sola página
// se recorre haciendo scroll; no hace falta menú hamburguesa.
//
// md: aparece el botón y el header se queda arriba (sticky). Los enlaces esperan a lg,
// porque a 768px logo + enlaces + botón no caben en una fila.
export function Header() {
  return (
    <header className="z-30 bg-navy text-white md:sticky md:top-0">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        Saltar al contenido
      </a>
      <Container className="flex h-16 items-center justify-between gap-4 md:h-[76px]">
        <a href="#inicio" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-display text-[19px] font-bold tracking-[0.5px] md:text-[22px]">
            {site.name}
          </span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block px-3.5 py-3 font-medium text-nav transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <WhatsAppButton size="sm">Cotizar por WhatsApp</WhatsAppButton>
        </div>
      </Container>
    </header>
  );
}

// Las tres barras del logo, una por servicio. La azul es un tono más clara (#3b82f6)
// que la de las tarjetas: así la pone el mockup, para que no se hunda en el marino.
function LogoMark() {
  return (
    <span aria-hidden="true" className="flex gap-1">
      <span className="h-6 w-2.5 rounded-[4px] bg-[#3b82f6] md:h-7 md:w-3" />
      <span className="h-6 w-2.5 rounded-[4px] bg-web md:h-7 md:w-3" />
      <span className="h-6 w-2.5 rounded-[4px] bg-cad md:h-7 md:w-3" />
    </span>
  );
}
