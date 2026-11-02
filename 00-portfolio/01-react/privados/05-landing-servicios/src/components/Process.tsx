import { site } from "../data/site";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { tones } from "./ui/tones";

export function Process() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="proceso-titulo"
      className="bg-canvas py-14 md:scroll-mt-[76px] md:py-[88px]"
    >
      <Container className="flex flex-col gap-10 md:gap-12">
        <SectionHeading
          id="proceso-titulo"
          eyebrow="Así de fácil"
          eyebrowClassName="text-pc"
          title="Cómo funciona"
        />

        {/* <ol> y no <ul>: el orden es el contenido. El número visible va con
            aria-hidden porque el lector de pantalla ya anuncia "1 de 3" por su cuenta.

            En móvil el número va a la izquierda del texto y no encima: cada paso
            ocupa unos 70px menos, y son tres. */}
        <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
          {site.steps.map((step, index) => {
            const tone = tones[step.tone];
            return (
              <li
                key={step.title}
                className={`flex gap-4 rounded-[20px] p-5 md:flex-col md:gap-3.5 md:p-7 ${tone.soft}`}
              >
                <span
                  aria-hidden="true"
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl font-display text-[22px] font-bold md:size-14 md:text-[26px] ${tone.solid}`}
                >
                  {index + 1}
                </span>
                <div className="flex flex-col gap-1.5 md:gap-3.5">
                  <h3 className="text-[19px] font-bold md:text-[21px]">{step.title}</h3>
                  <p className="leading-[1.6] text-muted">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
