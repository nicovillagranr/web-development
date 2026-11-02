import { contact, site } from "../data/site";
import { Container } from "./ui/Container";

export function Footer() {
  return (
    // El padding inferior en móvil suma la altura de MobileCtaBar (12 + 48 + 12) y el
    // inset del iPhone: sin él, la barra fija tapa el final del footer y no hay forma
    // de leerlo, porque ya no queda página por debajo a la que hacer scroll. Va aquí y
    // no en un envoltorio de toda la página para que lo que queda bajo la barra sea
    // azul marino y no una franja blanca.
    <footer className="bg-navy pb-[calc(2.5rem+4.5rem+env(safe-area-inset-bottom))] text-[14px] text-on-dark-soft md:pb-10">
      <Container>
        <div className="flex flex-col gap-2 border-t border-navy-line pt-7 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4">
          <p className="font-display text-[18px] font-bold text-white">{site.name}</p>
          <p>
            PCs · Páginas web · SolidWorks
            {contact.city && ` — ${contact.city}`}
          </p>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
        <p className="mt-6 text-[13px] leading-[1.6]">
          Sitio de demostración: datos de contacto provisionales. Diseño y desarrollo:{" "}
          <a
            href="https://nico-villagran.com"
            className="text-white underline underline-offset-2 hover:text-nav"
          >
            Nico Villagrán
          </a>
        </p>
      </Container>
    </footer>
  );
}
