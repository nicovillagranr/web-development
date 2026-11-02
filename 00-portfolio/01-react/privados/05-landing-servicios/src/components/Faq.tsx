import { site } from "../data/site";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";

export function Faq() {
  return (
    <section
      id="preguntas"
      aria-labelledby="preguntas-titulo"
      className="bg-surface py-14 md:scroll-mt-[76px] md:py-[88px]"
    >
      <Container width="narrow" className="flex flex-col gap-8">
        <SectionHeading
          id="preguntas-titulo"
          eyebrow="Resolvemos tus dudas"
          eyebrowClassName="text-web-strong"
          title="Preguntas frecuentes"
        />

        {/* <details> nativo y no un <button> con useState: el navegador ya da el
            teclado, el "contraído / expandido" del lector de pantalla y el estado, sin
            aria-expanded a mano (regla 1 del cheat-sheet: HTML semántico primero).

            name="preguntas" hace que abrir una cierre la anterior, como en el mockup.
            Un navegador antiguo que no lo conozca deja abrir varias a la vez, y nada más. */}
        <div className="flex flex-col gap-3">
          {site.faqs.map((faq, index) => (
            <details
              key={faq.question}
              name="preguntas"
              open={index === 0}
              className="group rounded-2xl border border-line bg-canvas"
            >
              {/* rounded-2xl también aquí: el contorno de foco sigue el borde del
                  <summary>, y sin él saldría con esquinas rectas sobre una caja redonda. */}
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-[16px] font-semibold md:px-6 md:py-5 md:text-[17px] [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="flex size-8 flex-none items-center justify-center rounded-full bg-soporte-soft text-[22px] leading-none font-bold text-soporte-deep transition-transform group-open:rotate-45 group-open:bg-soporte group-open:text-white motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 leading-[1.6] text-muted md:px-6 md:pb-[22px]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
