import { Container } from "./ui/Container";
import { WhatsAppButton } from "./WhatsAppButton";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-titulo" className="pb-16 md:pb-24">
      <Container>
        <div className="rounded-[28px] bg-ink px-6 py-12 text-center text-white md:px-12 md:py-16">
          <h2
            id="cta-titulo"
            className="text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] text-balance md:text-[48px]"
          >
            ¿Lo conversamos?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[17px] leading-[1.5] text-[#a1a1a6]">
            Escríbenos y te respondemos con una cotización. Sin compromiso.
          </p>
          <WhatsAppButton variant="inverted" className="mt-8 w-full sm:w-auto">
            Escríbenos por WhatsApp
          </WhatsAppButton>
        </div>
      </Container>
    </section>
  );
}
