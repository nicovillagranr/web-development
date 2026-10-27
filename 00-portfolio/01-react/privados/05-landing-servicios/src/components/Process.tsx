import { site } from "../data/site";
import { Container } from "./ui/Container";

export function Process() {
  return (
    <section
      id="como-trabajamos"
      aria-labelledby="proceso-titulo"
      className="py-16 md:scroll-mt-14 md:py-24"
    >
      <Container>
        <h2
          id="proceso-titulo"
          className="text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] md:text-[48px]"
        >
          Cómo trabajamos
        </h2>

        {/* <ol> y no <ul>: el orden es el contenido. El número visible va con
            aria-hidden porque el lector de pantalla ya anuncia "1 de 3" por su cuenta. */}
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {site.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4 md:flex-col">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-[17px] font-semibold text-accent"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.5] text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
