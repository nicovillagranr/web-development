import { site } from "../data/site";
import { buttonClass } from "./ui/button";
import { Container } from "./ui/Container";
import { ArrowDownIcon, CheckIcon } from "./ui/icons";
import { WhatsAppButton } from "./WhatsAppButton";

export function Hero() {
  return (
    <section id="inicio" className="pt-10 pb-16 md:pt-24 md:pb-28">
      <Container>
        <p className="text-[15px] font-semibold text-accent">{site.hero.eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-[40px] leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-[52px] md:text-[72px]">
          {site.hero.title}
        </h1>
        <p className="mt-5 max-w-xl text-[19px] leading-[1.45] text-pretty text-muted md:text-[21px]">
          {site.hero.subtitle}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {/* En móvil este botón sobra: la barra fija de abajo ya es el mismo enlace,
              y verlos los dos en la primera pantalla parece un error. */}
          <div className="hidden md:block">
            <WhatsAppButton>Escríbenos por WhatsApp</WhatsAppButton>
          </div>
          <a href="#servicios" className={buttonClass("secondary")}>
            Ver servicios
            <ArrowDownIcon className="size-4" />
          </a>
        </div>

        <ul className="mt-10 flex flex-col gap-3 text-[15px] text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
          {site.highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <CheckIcon className="size-4 shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
