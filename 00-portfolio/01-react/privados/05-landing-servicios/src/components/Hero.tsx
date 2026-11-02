import { site } from "../data/site";
import { buttonClass } from "./ui/button";
import { Container } from "./ui/Container";
import { tones } from "./ui/tones";
import { WhatsAppButton } from "./WhatsAppButton";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="bg-navy pt-8 pb-14 text-white md:pt-[72px] md:pb-24"
    >
      {/* Móvil: texto y mosaico apilados. Lado a lado desde lg, en la misma proporción
          que el flex-wrap del mockup (480 + 380px de base que crecen por igual). */}
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
        <div className="flex flex-col items-start gap-5 md:gap-6">
          <p className="rounded-full bg-badge px-3.5 py-2 text-[13px] font-bold text-ink md:text-[14px]">
            {site.hero.badge}
          </p>
          <h1
            id="hero-titulo"
            className="font-display text-[36px] leading-[1.05] font-bold text-balance sm:text-[44px] lg:text-[60px]"
          >
            {site.hero.title} <span className="text-web-light">{site.hero.titleAccent}</span>
          </h1>
          <p className="max-w-[560px] text-[17px] leading-[1.6] text-pretty text-on-dark md:text-[19px]">
            {site.hero.subtitle}
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            {/* En móvil este botón sobra: la barra fija de abajo ya es el mismo enlace,
                y verlos los dos en la primera pantalla parece un error. */}
            <div className="hidden md:block">
              <WhatsAppButton>Cotizar ahora</WhatsAppButton>
            </div>
            <a href="#servicios" className={buttonClass("ghost", "md", "w-full sm:w-auto")}>
              Ver servicios
            </a>
          </div>
        </div>

        {/* Mosaico 2×2 también en móvil, pero más bajo (124 en vez de 170px) para que
            la sección de servicios asome antes. El escalón de las pares es el del diseño. */}
        <ul className="grid grid-cols-2 gap-3 md:gap-4">
          {site.hero.tiles.map((tile) => {
            const tone = tones[tile.tone];
            return (
              <li
                key={tile.title}
                className={`flex min-h-[124px] flex-col gap-2 rounded-[20px] p-4 even:mt-6 md:min-h-[170px] md:gap-3 md:p-6 md:even:mt-8 ${tone.solid}`}
              >
                <tone.Icon className="size-7 md:size-9" />
                <span className="font-display text-[17px] leading-tight font-bold md:text-[20px]">
                  {tile.title}
                </span>
                <span className={`text-[13px] md:text-[14px] ${tone.solidMuted}`}>{tile.text}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
